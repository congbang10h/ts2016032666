Ext.Loader = new function() {
	var Loader = this,
		Manager = Ext.ClassManager,
		Class = Ext.Class,
		flexSetter = Ext.Function.flexSetter,
		alias = Ext.Function.alias,
		pass = Ext.Function.pass,
		defer = Ext.Function.defer,
		arrayErase = Ext.Array.erase,
		dependencyProperties = ['extend', 'mixins', 'requires'],
		isInHistory = {},
		history = [],
		slashDotSlashRe = /\/\.\//g,
		dotRe = /\./g,
		setPathCount = 0;
	Ext.apply(Loader, {
		isInHistory: isInHistory,
		history: history,
		config: {
			enabled: false,
			scriptChainDelay : false,
			disableCaching: true,
			disableCachingParam: '_dc',
			garbageCollect : false,
			paths: {
				'Ext': '.'
			},
			preserveScripts : true,
			scriptCharset : undefined
		},
		setConfig: function(name, value) {
			if (Ext.isObject(name) && arguments.length === 1) {
				Ext.merge(Loader.config, name);
				if ('paths' in name) {
					Ext.app.collectNamespaces(name.paths);
				}
			}
			else {
				Loader.config[name] = (Ext.isObject(value)) ? Ext.merge(Loader.config[name], value) : value;
				if (name === 'paths') {
					Ext.app.collectNamespaces(value);
				}
			}
			return Loader;
		},
		getConfig: function(name) {
			if (name) {
				return Loader.config[name];
			}
			return Loader.config;
		},
		setPath: flexSetter(function(name, path) {
			Loader.config.paths[name] = path;
			Ext.app.namespaces[name] = true;
			setPathCount++;
			return Loader;
		}),
		addClassPathMappings: function(paths) {
			var name;
			if(setPathCount == 0){
				Loader.config.paths = paths;
			} else {
				for(name in paths){
					Loader.config.paths[name] = paths[name];
				}
			}
			setPathCount++;
			return Loader;
		},
		getPath: function(className) {
			var path = '',
				paths = Loader.config.paths,
				prefix = Loader.getPrefix(className);
			if (prefix.length > 0) {
				if (prefix === className) {
					return paths[prefix];
				}
				path = paths[prefix];
				className = className.substring(prefix.length + 1);
			}
			if (path.length > 0) {
				path += '/';
			}
			return path.replace(slashDotSlashRe, '/') + className.replace(dotRe, "/") + '.js';
		},
		getPrefix: function(className) {
			var paths = Loader.config.paths,
				prefix, deepestPrefix = '';
			if (paths.hasOwnProperty(className)) {
				return className;
			}
			for (prefix in paths) {
				if (paths.hasOwnProperty(prefix) && prefix + '.' === className.substring(0, prefix.length + 1)) {
					if (prefix.length > deepestPrefix.length) {
						deepestPrefix = prefix;
					}
				}
			}
			return deepestPrefix;
		},
		isAClassNameWithAKnownPrefix: function(className) {
			var prefix = Loader.getPrefix(className);
			return prefix !== '' && prefix !== className;
		},
		require: function(expressions, fn, scope, excludes) {
			if (fn) {
				fn.call(scope);
			}
		},
		syncRequire: function() {},
		exclude: function(excludes) {
			return {
				require: function(expressions, fn, scope) {
					return Loader.require(expressions, fn, scope, excludes);
				},
				syncRequire: function(expressions, fn, scope) {
					return Loader.syncRequire(expressions, fn, scope, excludes);
				}
			};
		},
		onReady: function(fn, scope, withDomReady, options) {
			var oldFn;
			if (withDomReady !== false && Ext.onDocumentReady) {
				oldFn = fn;
				fn = function() {
					Ext.onDocumentReady(oldFn, scope, options);
				};
			}
			fn.call(scope);
		}
	});
	var queue = [],
		isClassFileLoaded = {},
		isFileLoaded = {},
		classNameToFilePathMap = {},
		scriptElements = {},
		readyListeners = [],
		usedClasses = [],
		requiresMap = {},
		comparePriority = function(listenerA, listenerB) {
			return listenerB.priority - listenerA.priority;
		};
	Ext.apply(Loader, {
		documentHead: typeof document != 'undefined' && (document.head || document.getElementsByTagName('head')[0]),
		isLoading: false,
		queue: queue,
		isClassFileLoaded: isClassFileLoaded,
		isFileLoaded: isFileLoaded,
		readyListeners: readyListeners,
		optionalRequires: usedClasses,
		requiresMap: requiresMap,
		numPendingFiles: 0,
		numLoadedFiles: 0,
		hasFileLoadError: false,
		classNameToFilePathMap: classNameToFilePathMap,
		scriptsLoading: 0,
		syncModeEnabled: false,
		scriptElements: scriptElements,
		refreshQueue: function() {
			var ln = queue.length,
				i, item, j, requires;
			if (!ln && !Loader.scriptsLoading) {
				return Loader.triggerReady();
			}
			for (i = 0; i < ln; i++) {
				item = queue[i];
				if (item) {
					requires = item.requires;
					if (requires.length > Loader.numLoadedFiles) {
						continue;
					}
					for (j = 0; j < requires.length; ) {
						if (Manager.isCreated(requires[j])) {
							arrayErase(requires, j, 1);
						}
						else {
							j++;
						}
					}
					if (item.requires.length === 0) {
						arrayErase(queue, i, 1);
						item.callback.call(item.scope);
						Loader.refreshQueue();
						break;
					}
				}
			}
			return Loader;
		},
		injectScriptElement: function(url, onLoad, onError, scope, charset) {
			var script = document.createElement('script'),
				dispatched = false,
				config = Loader.config,
				onLoadFn = function() {
					if(!dispatched) {
						dispatched = true;
						script.onload = script.onreadystatechange = script.onerror = null;
						if (typeof config.scriptChainDelay == 'number') {
							defer(onLoad, config.scriptChainDelay, scope);
						} else {
							onLoad.call(scope);
						}
						Loader.cleanupScriptElement(script, config.preserveScripts === false, config.garbageCollect);
					}
				},
				onErrorFn = function(arg) {
					defer(onError, 1, scope);
					Loader.cleanupScriptElement(script, config.preserveScripts === false, config.garbageCollect);
				};
			script.type = 'text/javascript';
			script.onerror = onErrorFn;
			charset = charset || config.scriptCharset;
			if (charset) {
				script.charset = charset;
			}
			if ('addEventListener' in script ) {
				script.onload = onLoadFn;
			} else if ('readyState' in script) {
				script.onreadystatechange = function() {
					if ( this.readyState == 'loaded' || this.readyState == 'complete' ) {
						onLoadFn();
					}
				};
			} else {
				 script.onload = onLoadFn;
			}
			script.src = url;
			(Loader.documentHead || document.getElementsByTagName('head')[0]).appendChild(script);
			return script;
		},
		removeScriptElement: function(url) {
			if (scriptElements[url]) {
				Loader.cleanupScriptElement(scriptElements[url], true, !!Loader.getConfig('garbageCollect'));
				delete scriptElements[url];
			}
			return Loader;
		},
		cleanupScriptElement: function(script, remove, collect) {
			var prop;
			script.onload = script.onreadystatechange = script.onerror = null;
			if (remove) {
				Ext.removeNode(script);
				if (collect) {
					for (prop in script) {
						try {
							if (prop != 'src') {
								script[prop] = null;
							}
							delete script[prop];
						} catch (cleanEx) {
						}
					}
				}
			}
			return Loader;
		},
		loadScript: function (options) {
			var config = Loader.getConfig(),
				isString = typeof options == 'string',
				url = isString ? options : options.url,
				onError = !isString && options.onError,
				onLoad = !isString && options.onLoad,
				scope = !isString && options.scope,
				onScriptError = function() {
					Loader.numPendingFiles--;
					Loader.scriptsLoading--;
					if (onError) {
						onError.call(scope, "Failed loading '" + url + "', please verify that the file exists");
					}
					if (Loader.numPendingFiles + Loader.scriptsLoading === 0) {
						Loader.refreshQueue();
					}
				},
				onScriptLoad = function () {
					Loader.numPendingFiles--;
					Loader.scriptsLoading--;
					if (onLoad) {
						onLoad.call(scope);
					}
					if (Loader.numPendingFiles + Loader.scriptsLoading === 0) {
						Loader.refreshQueue();
					}
				},
				src;
			Loader.isLoading = true;
			Loader.numPendingFiles++;
			Loader.scriptsLoading++;
			src = config.disableCaching ?
				(url + '?' + config.disableCachingParam + '=' + Ext.Date.now()) : url;
			scriptElements[url] = Loader.injectScriptElement(src, onScriptLoad, onScriptError);
		},
		loadScriptFile: function(url, onLoad, onError, scope, synchronous) {
			if (isFileLoaded[url]) {
				return Loader;
			}
			var config = Loader.getConfig(),
				noCacheUrl = url + (config.disableCaching ? ('?' + config.disableCachingParam + '=' + Ext.Date.now()) : ''),
				isCrossOriginRestricted = false,
				xhr, status, onScriptError,
				debugSourceURL = "";
			scope = scope || Loader;
			Loader.isLoading = true;
			if (!synchronous) {
				onScriptError = function() {
				};
				scriptElements[url] = Loader.injectScriptElement(noCacheUrl, onLoad, onScriptError, scope);
			} else {
				if (typeof XMLHttpRequest != 'undefined') {
					xhr = new XMLHttpRequest();
				} else {
					xhr = new ActiveXObject('Microsoft.XMLHTTP');
				}
				try {
					xhr.open('GET', noCacheUrl, false);
					xhr.send(null);
				} catch (e) {
					isCrossOriginRestricted = true;
				}
				status = (xhr.status === 1223) ? 204 :
					(xhr.status === 0 && ((self.location || {}).protocol == 'file:' || (self.location || {}).protocol == 'ionp:')) ? 200 : xhr.status;
				isCrossOriginRestricted = isCrossOriginRestricted || (status === 0);
				if (isCrossOriginRestricted
				) {
				}
				else if ((status >= 200 && status < 300) || (status === 304)
				) {
					if (!Ext.isIE) {
						debugSourceURL = "\n//@ sourceURL=" + location.origin+'/'+url;
					}
					Ext.globalEval(xhr.responseText + debugSourceURL);
					onLoad.call(scope);
				}
				else {
				}
				xhr = null;
			}
		},
		syncRequire: function() {
			var syncModeEnabled = Loader.syncModeEnabled;
			if (!syncModeEnabled) {
				Loader.syncModeEnabled = true;
			}
			Loader.require.apply(Loader, arguments);
			if (!syncModeEnabled) {
				Loader.syncModeEnabled = false;
			}
			Loader.refreshQueue();
		},
		require: function(expressions, fn, scope, excludes) {
			var excluded = {},
				included = {},
				excludedClassNames = [],
				possibleClassNames = [],
				classNames = [],
				references = [],
				callback,
				syncModeEnabled,
				filePath, expression, exclude, className,
				possibleClassName, i, j, ln, subLn;
			if (excludes) {
				excludes = (typeof excludes === 'string') ? [ excludes ] : excludes;
				for (i = 0,ln = excludes.length; i < ln; i++) {
					exclude = excludes[i];
					if (typeof exclude == 'string' && exclude.length > 0) {
						excludedClassNames = Manager.getNamesByExpression(exclude);
						for (j = 0,subLn = excludedClassNames.length; j < subLn; j++) {
							excluded[excludedClassNames[j]] = true;
						}
					}
				}
			}
			expressions = (typeof expressions === 'string') ? [ expressions ] : (expressions ? expressions : []);
			if (fn) {
				if (fn.length > 0) {
					callback = function() {
						var classes = [],
							i, ln;
						for (i = 0,ln = references.length; i < ln; i++) {
							classes.push(Manager.get(references[i]));
						}
						return fn.apply(this, classes);
					};
				}
				else {
					callback = fn;
				}
			}
			else {
				callback = Ext.emptyFn;
			}
			scope = scope || Ext.global;
			for (i = 0,ln = expressions.length; i < ln; i++) {
				expression = expressions[i];
				if (typeof expression == 'string' && expression.length > 0) {
					possibleClassNames = Manager.getNamesByExpression(expression);
					subLn = possibleClassNames.length;
					for (j = 0; j < subLn; j++) {
						possibleClassName = possibleClassNames[j];
						if (excluded[possibleClassName] !== true) {
							references.push(possibleClassName);
							if (!Manager.isCreated(possibleClassName) && !included[possibleClassName]) {
								included[possibleClassName] = true;
								classNames.push(possibleClassName);
							}
						}
					}
				}
			}
			if (classNames.length > 0) {
				if (!Loader.config.enabled) {
					throw new Error("Ext.Loader is not enabled, so dependencies cannot be resolved dynamically. " +
							 "Missing required class" + ((classNames.length > 1) ? "es" : "") + ": " + classNames.join(', '));
				}
			}
			else {
				callback.call(scope);
				return Loader;
			}
			syncModeEnabled = Loader.syncModeEnabled;
			if (!syncModeEnabled) {
				queue.push({
					requires: classNames.slice(),
					callback: callback,
					scope: scope
				});
			}
			ln = classNames.length;
			for (i = 0; i < ln; i++) {
				className = classNames[i];
				filePath = Loader.getPath(className);
				if (syncModeEnabled && isClassFileLoaded.hasOwnProperty(className)) {
					if (!isClassFileLoaded[className]) {
						Loader.numPendingFiles--;
						Loader.removeScriptElement(filePath);
						delete isClassFileLoaded[className];
					}
				}
				if (!isClassFileLoaded.hasOwnProperty(className)) {
					isClassFileLoaded[className] = false;
					classNameToFilePathMap[className] = filePath;
					Loader.numPendingFiles++;
					Loader.loadScriptFile(
						filePath,
						pass(Loader.onFileLoaded, [className, filePath], Loader),
						pass(Loader.onFileLoadError, [className, filePath], Loader),
						Loader,
						syncModeEnabled
					);
				}
			}
			if (syncModeEnabled) {
				callback.call(scope);
				if (ln === 1) {
					return Manager.get(className);
				}
			}
			return Loader;
		},
		onFileLoaded: function(className, filePath) {
			var loaded = isClassFileLoaded[className];
			Loader.numLoadedFiles++;
			isClassFileLoaded[className] = true;
			isFileLoaded[filePath] = true;
			if (!loaded) {
				Loader.numPendingFiles--;
			}
			if (Loader.numPendingFiles === 0) {
				Loader.refreshQueue();
			}
		},
		onFileLoadError: function(className, filePath, errorMessage, isSynchronous) {
			Loader.numPendingFiles--;
			Loader.hasFileLoadError = true;
		},
		addUsedClasses: function (classes) {
			var cls, i, ln;
			if (classes) {
				classes = (typeof classes == 'string') ? [classes] : classes;
				for (i = 0, ln = classes.length; i < ln; i++) {
					cls = classes[i];
					if (typeof cls == 'string' && !Ext.Array.contains(usedClasses, cls)) {
						usedClasses.push(cls);
					}
				}
			}
			return Loader;
		},
		triggerReady: function() {
			var listener,
				refClasses = usedClasses;
			if (Loader.isLoading) {
				Loader.isLoading = false;
				if (refClasses.length !== 0) {
					refClasses = refClasses.slice();
					usedClasses.length = 0;
					Loader.require(refClasses, Loader.triggerReady, Loader);
					return Loader;
				}
			}
			Ext.Array.sort(readyListeners, comparePriority);
			while (readyListeners.length && !Loader.isLoading) {
				listener = readyListeners.shift();
				listener.fn.call(listener.scope);
			}
			return Loader;
		},
		onReady: function(fn, scope, withDomReady, options) {
			var oldFn;
			if (withDomReady !== false && Ext.onDocumentReady) {
				oldFn = fn;
				fn = function() {
					Ext.onDocumentReady(oldFn, scope, options);
				};
			}
			if (!Loader.isLoading) {
				fn.call(scope);
			}
			else {
				readyListeners.push({
					fn: fn,
					scope: scope,
					priority: (options && options.priority) || 0
				});
			}
		},
		historyPush: function(className) {
			if (className && isClassFileLoaded.hasOwnProperty(className) && !isInHistory[className]) {
				isInHistory[className] = true;
				history.push(className);
			}
			return Loader;
		}
	});
	Ext.disableCacheBuster = function (disable, path) {
		var date = new Date();
		date.setTime(date.getTime() + (disable ? 10*365 : -1) * 24*60*60*1000);
		date = date.toGMTString();
		document.cookie = 'ext-cache=1; expires=' + date + '; path='+(path || '/');
	};
	Ext.require = alias(Loader, 'require');
	Ext.syncRequire = alias(Loader, 'syncRequire');
	Ext.exclude = alias(Loader, 'exclude');
	Ext.onReady = function(fn, scope, options) {
		Loader.onReady(fn, scope, true, options);
	};
	Class.registerPreprocessor('loader', function(cls, data, hooks, continueFn) {
		var me = this,
			dependencies = [],
			i, j, ln, subLn, value, propertyName, propertyValue;
		for (i = 0,ln = dependencyProperties.length; i < ln; i++) {
			propertyName = dependencyProperties[i];
			if (data.hasOwnProperty(propertyName)) {
				propertyValue = data[propertyName];
				if (typeof propertyValue == 'string') {
					dependencies.push(propertyValue);
				}
				else if (propertyValue instanceof Array) {
					for (j = 0, subLn = propertyValue.length; j < subLn; j++) {
						value = propertyValue[j];
						if (typeof value == 'string') {
							dependencies.push(value);
						}
					}
				}
				else if (typeof propertyValue != 'function') {
					for (j in propertyValue) {
						if (propertyValue.hasOwnProperty(j)) {
							value = propertyValue[j];
							if (typeof value == 'string') {
								dependencies.push(value);
							}
						}
					}
				}
			}
		}
		if (dependencies.length === 0) {
			return;
		}
		Loader.require(dependencies, function() {
			for (i = 0,ln = dependencyProperties.length; i < ln; i++) {
				propertyName = dependencyProperties[i];
				if (data.hasOwnProperty(propertyName)) {
					propertyValue = data[propertyName];
					if (typeof propertyValue == 'string') {
						data[propertyName] = Manager.get(propertyValue);
					}
					else if (propertyValue instanceof Array) {
						for (j = 0, subLn = propertyValue.length; j < subLn; j++) {
							value = propertyValue[j];
							if (typeof value == 'string') {
								data[propertyName][j] = Manager.get(value);
							}
						}
					}
					else if (typeof propertyValue != 'function') {
						for (var k in propertyValue) {
							if (propertyValue.hasOwnProperty(k)) {
								value = propertyValue[k];
								if (typeof value == 'string') {
									data[propertyName][k] = Manager.get(value);
								}
							}
						}
					}
				}
			}
			continueFn.call(me, cls, data, hooks);
		});
		return false;
	}, true, 'after', 'className');
	Manager.registerPostprocessor('uses', function(name, cls, data) {
		var uses = data.uses;
		if (uses) {
			Loader.addUsedClasses(uses);
		}
	});
	Manager.onCreated(Loader.historyPush);
};
