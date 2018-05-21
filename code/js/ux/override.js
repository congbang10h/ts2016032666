Ext.Loader.setConfig({
    disableCaching: false,
    enabled: true
});

Ext.override(Ext.Window, {
    closeAction: 'hide'
});

Ext.data.Types.DATETIME = {};
Ext.apply(Ext.data.Types.DATETIME, Ext.data.Types.DATE);
Ext.data.Types.DATETIME.type = 'datetime';

Ext.override(Ext.form.Basic,{
	getFieldValues: function(dirtyOnly) {
		return this.getValues(false, dirtyOnly, false, false);
	}
});
Ext.override(Ext.data.writer.Writer,{
	write: function(request) {
		var operation = request.operation,
			records   = operation.records || [],
			len	   = records.length,
			i		 = 0,
			data	  = [];
		for (; i < len; i++) {
			data.push(this.getRecordData(records[i], operation));
		}
		//return this.writeRecords(request, data);
		//add follow lines
		this.root = 'items';
		this.writeRecords(request, data);
		if (request.jsonData && request.params){
			if (Ext.isArray(request.jsonData))
				request.jsonData.push(request.params);
			else
				request.jsonData.params=request.params;
		}
		return request;
	}
});
Ext.override(Ext.ProgressBar, {
    text: 'Đang chờ',
	updatebar: function(current,total,text){
    	if (total){
    		if (!text) text = '';
        	if (current>total)
        		current = total;
        	var i = current/total,
        		pi = Ext.util.Format.number(100*i,'0.00'),
        		c = Ext.util.Format.number(current, '0,000'),
        		t = Ext.util.Format.number(total, '0,000');
        	this.updateProgress(i, current<total ? c+' / '+t+text+' ('+pi+' %)'
        		: 'Hoàn thành!');
    	}
    }
});
Ext.Ajax.timeout = 35000;//35 seconds
Ext.override(Ext.data.Store,{
	removeFilter: function(toRemove, applyFilters) {
        var me = this;

        if (toRemove instanceof Ext.util.Filter){
            me.filters.remove(toRemove);
        } else {
            me.filters.removeAtKey(toRemove);
            if (this.filterset && this.filterset[toRemove])
            	delete this.filterset[toRemove];
        }

        if (!me.remoteFilter && applyFilters !== false) {
            if (me.filters.length) {
                me.filter();
            }else {
                me.clearFilter();
            }
        } else {
            me.fireEvent('filterchange', me, me.filters.items);
        }
	}
});
Ext.override(Ext.data.Model,{
	validate: function() {
		var errors = new Ext.data.Errors(),
			validations = this.validations,
			validators = Ext.data.validations,
			length, validation, field, valid, type, i;

		if (validations) {
			length = validations.length;

			for ( i = 0; i < length; i++) {
				validation = validations[i];
				field = validation.field || validation.name;
				type = validation.type;
				valid = validators[type](validation, this.get(field));

				if (!valid) {
					errors.add({
						field : field,
						message: validation.message||validators[type+'Message']
					});
				}
			}
		}
		//ADD FOLLOW LINE
		if (this.validationEx){
			validations = this.validationEx; 
			length = validations.length;

			for ( i = 0; i < length; i++) {
				validation = validations[i];
				field = validation.field || validation.name;
				type = validation.type;
				if (validation.validator)
					valid = validation.validator(this);
				else if (validators[type])
					valid = validators[type](validation, this.get(field));
				else{
					console.log('Warning: ValidationEx['+type+':'+field+'] '
						+'of model '+this.$className+' have no validator!');
					continue;
				}

				if (!valid) {
					errors.add({
						field: field,
						message: validation.message||validators[type+'Message']
					});
				}
			}
		}

		return errors;
	}
});
Ext.override(Ext.form.CheckboxGroup, {
	invalidCls: 'x-form-invalid-box'
});
Ext.override(Ext.form.RadioGroup, {
	invalidCls: 'x-form-invalid-box'
});
Ext.override(Ext.form.field.Number, {
	nanText : '[{0}] không phải là số',
	fieldCls : 'x-form-num-field',
	hideTrigger : true,
	keyNavEnabled : false,
	mouseWheelEnabled : false
});
Ext.override(Ext.form.field.Base, {
	clearInvalid : function() {
		var me = this,
			target = me.up('radiogroup') || me.up('checkboxgroup') || me;
		delete target.needsValidateOnEnable;
		target.unsetActiveError();
		target.setError('');
	},
	markInvalid : function(errors) {
        var me = this,
        	target = me.up('radiogroup') || me.up('checkboxgroup') || me,
            oldMsg = target.getActiveError(),
            active;
        target.setActiveErrors(Ext.Array.from(errors));
        active = target.getActiveError();
        if (oldMsg !== active) {
            target.setError(active);
        }
        //Bổ sung active tabpanel
        var frmp = me.up('form');
        if (frmp){
	        var frm = frmp.getForm(),
	        	tabs = frmp.query('tabpanel'),
	        	len = tabs.length, i, t,tl,j;
	        if (frm.activeTabOnError) return;
	        for(i=0;i<len;i++){
	        	t = tabs[i];
				tl = t.items.length;
	        	for (j=0;j<tl;j++){
	        		if (t.items.items[j].down('#'+me.id)){
	        			t.setActiveTab(j);
	        			i=len;
	        			frm.activeTabOnError = 1;
	        			break;
	        		}
	        	}
	        }
        }
    }
});
Ext.override(Ext.data.Model,{
	get: function(field) {
		if (this.data[field]!=undefined)
			return this.data[field];
		if (this.raw && this.raw[field]!=undefined)
			return this.raw[field];
		return null;
	}
});
Ext.override(Ext.data.Types.DATETIME,{
	convert: function(v){
		if (!v) return null;
		if ( v instanceof Date) return v;
		if (/^\d\d\/\d\d\/\d\d$/.test(v)){//dd/mm/yy
			return Ext.Date.parse(v,'d/m/y');
		}
		if (/^\d{4}-\d\d-\d\d\s\d\d:\d\d:\d\d/.test(v)){//yyyy-mm-dd hh:mm:ss
			return Ext.Date.parse(v,'Y-m-d H:i:s');
		}
		if (/^\d\d:\d\d\s\d\d\/\d\d\/\d{4}$/.test(v)){//hh:mm dd/mm/yyyy
			return Ext.Date.parse(v,'H:i d/m/Y');
		}
		if (/^\d\d\/\d\d\/\d{4}\s\d\d:\d\d$/.test(v)){//dd/mm/yyyy hh:mm
			return Ext.Date.parse(v,'d/m/Y H:i');
		}
		if (/^\d\d\/\d\d\/\d{4}\s\d\d:\d\d:\d\d$/.test(v)){//dd/mm/yyyy hh:mm:s
			return Ext.Date.parse(v,'d/m/Y H:i:s');
		}
		if (/^\d\d:\d\d:\d\d\s\d\d\/\d\d\/\d{4}$/.test(v)){//hh:mm:s dd/mm/yyyy
			return Ext.Date.parse(v,'H:i:s d/m/Y');
		}
		if (new Date(v).toString()==v)
			return new Date(v);
		return null;
	}
});
Ext.override(Ext.data.Types.DATE,{
	convert: function(v){
		if (!v) return null;
		if ( v instanceof Date) return v;
		if (/^\d{4}-\d\d-\d\d/.test(v)){//yyyy-mm-dd
			return Ext.Date.parse(v.substr(0,10),'Y-m-d');
		}
		if (/^\d\d\/\d\d\/\d{4}$/.test(v)){//dd/mm/yyyy
			return Ext.Date.parse(v,'d/m/Y');
		}
		if (/^\d\d\/\d\d\/\d\d$/.test(v)){//dd/mm/yyyy
			return Ext.Date.parse(v,'d/m/y');
		}
		if (new Date(v).toString()==v)
			return new Date(v);
		return null;
	}
});
Ext.override(Ext.ux, {
	__mask : [],
	showMask : function(comp,cfg) {
		var me=this,last;
		if (me.__mask.length==0 || (cfg && cfg.force)){
			cfg = Ext.apply({
				msg : "Đang xử lý..."
			},cfg);
			this.__mask.push(new Ext.LoadMask(comp ? comp : Ext.getBody(), cfg));
		}
		last = me.__mask[me.__mask.length-1];
		last.show();
	},
	hideMask : function() {
		if (this.__mask.length)
			this.__mask.pop().hide();
	},
	checkPermisson: function(action, method){
		return (VX.cc.API && VX.cc.API[action] && VX.cc.API[action][method]!=undefined);
	},
	getPermisson: function(action){
		try{
			var //role = VX.user.userrole,
				//name = VX.user.username,
				a = VX.cc.REMOTING_API.actions[action],
				i,list=[];
			for(i in a){
				list.push(a[i].name);
			}
			return list;
		}catch(e){
			if(VX.config.debug>1)
				console.log(e.message);
		}
		return [];
	},
	rpc: function(cfg){
		Ext.Ajax.request({
			url: 'php/router.php',
			headers: { 'Content-Type': 'application/json' },
			params : Ext.JSON.encode({
				action: cfg.action,
				method: cfg.method,
				data: [cfg.params]
			}),
			success: function(res){
				var msg;
				try{
					msg = Ext.decode(res.responseText);
				}catch(e){
					msg = res.responseText;
				}
				directEventCatch(msg);
				if (msg && msg.type=='exception')
					directExceptionCatch(msg);
				else if (msg && cfg.callback){
					if(msg.type=='rpc')
						cfg.callback.call(cfg.scope,msg.result);
					else
						console.log(msg);
				}
			}
		});
	}
});

Ext.Loader.setConfig({
	enabled: true,
	paths: {
	'Ext.ux': VX.uxPath,
	'VX' : VX.appPath
}});
Ext.apply(Ext.ClassManager,{
	instantiateByAlias: function() {
		var alias = arguments[0],
			args = Array.prototype.slice.call(arguments),
			className = this.getNameByAlias(alias);
		if (!className) {
			className = this.maps.aliasToName[alias];
			Ext.syncRequire(className);
		}
		args[0] = className;
		//VXadd follow lines
		if (!className){
			var n=Ext.loadDebug(alias,0,0), msg = 'Không tìm được '+alias;
			msg+=' khi định nghĩa '+(n?n:VX.lastInstantName);
			VX.alert(msg);
		}
		try{
			return this.instantiate.apply(this, args);
		}catch(e){
			return null;
		}
		//End VXadd
		//return this.instantiate.apply(this, args);
	},
	instantiate: function() {
		var name = arguments[0],
			nameType = typeof name,
			args = Array.prototype.slice.call(arguments, 1),
			//alias = name,
			possibleName, cls;
		if (nameType != 'function') {
			if (nameType != 'string' && args.length === 0) {
				args = [name];
				name = name.xclass;
			}
			cls = this.get(name);
		}
		else {
			cls = name;
		}
		if (!cls) {
			possibleName = this.getNameByAlias(name);
			if (possibleName) {
				name = possibleName;
				cls = this.get(name);
			}
		}
		if (!cls) {
			possibleName = this.getNameByAlternate(name);
			if (possibleName) {
				name = possibleName;
				cls = this.get(name);
			}
		}
		if (!cls) {
			Ext.syncRequire(name);
			cls = this.get(name);
		}
		//VXadd follow lines
		if (!cls){
			var n=Ext.loadDebug(name,0,0), msg = 'Không tìm được '+name;
			if (n) msg+=' khi định nghĩa '+n;
			VX.alert(msg);
		}else{
			VX.lastInstantName = name;
		}
		try{
			return this.getInstantiator(args.length)(cls, args);
		}catch(e){
			VX.alert(e);
			return null;
		}
		//End VXadd
		//return this.getInstantiator(args.length)(cls, args);
	}
});
window.onerror = function (msg, url, line, col) {
	if (/VX.model/.test(VX.url2name(url)) && 
		/ReferenceError: \w+ is not defined/.test(msg)){
		VX.alert('Model '+VX.url2name(url)+' chưa có trong API');
		return true;
	}
    console.log(msg + ' at ' + url + ':' + line + ':' + col);
    return true;
};
Ext.apply(Ext.Loader,{
	injectScriptElement: function(url, onLoad, onError, scope, charset) {
		var Loader=Ext.Loader,//VXadd
			defer = Ext.Function.defer,//VXadd
			script = document.createElement('script'),
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
				VX.alert('Không tải được lớp '+VX.url2name(arg.path[0].src));//VXadd
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
	}
});
Ext.loadDebug = function(){
	var e, s, cname;
	e = (new Error()).stack
		.replace(/[^\n]+\n/, '')
		.replace(/[^\n]+jslib[^\n]+(\n|$)/gm, '')
		.replace(/[^\n]+override[^\n]+(\n|$)/gm, '')
		.replace(/\n$/m, '')
		.replace(/:\d+/g, '');
	s = e ? e.match(/http[^\?\)]+/i)[0] : '';
	cname = s ? VX.url2name(s) : 0;
	return cname;
};
Ext.Loader.loadScriptFileOld = Ext.Loader.loadScriptFile;
Ext.Loader.loadScriptFile = function(url, onLoad, onError, scope, sync){
	if (sync){
		Ext.loadDebug(0,url,1);
	}
	Ext.Loader.loadScriptFileOld(url, onLoad, onError, scope, sync);
};
/*
console.log2 = console.log;
console.log = function(a) {
	if (typeof a == 'string' && VX.config.debug) {
		var d = document.getElementById('pageheader');
		if (d){
			d.innerHTML = a.replace(/\n/g,'<br>') + '<hr>' + d.innerHTML;
		}
	}
	console.log2(a);
};*/
