Ext.define('Ext.ux.Store',{
	extend: 'Ext.data.Store',
	recycleMode: false,
	remoteSort: true,
	loaded: false,
	isLoaded: function(){
		return this.loaded;
	},
	rpcbackList: {},
	restore: function(records){
		var options = {restore: records};
    	this.proxy.batch(options, this.getBatchListeners());
    },
	duplicate: function(records){
		var options = {duplicate: records};
    	this.proxy.batch(options, this.getBatchListeners());
    },
    constructor: function(){
    	this.callParent(arguments);
    	this.configProxy();
    },
    addFilterSet: function(id,value,property,operator){
    	this.filterset = this.filterset || {};
    	this.filterset[id] = this.filterset[id] || {}; 
    	var fs = this.filterset[id],
    		set = fs.set || [];
    	if (property != undefined) fs.property = property;
    	if (operator != undefined) fs.operator = operator;
    	if (!Ext.Array.contains(set,value))
    		set.push(value);
    	fs.set = set;
    	this.removeFilter(id); 
    	this.addFilter({
    		id: id,
    		property: fs.property,
    		operator: fs.operator,
    		value: fs.set.toString()
    	});
    	this.filterset[id] = fs;
    },
    removeFilterSet: function(id,value){
    	if (!this.filterset || !this.filterset[id]
    		|| !Ext.Array.contains(this.filterset[id].set,value)) return;
    	var fs = this.filterset[id],
    		i = Ext.Array.indexOf(fs.set,value);
    	fs.set.splice(i,1);
    	this.removeFilter(id);
    	if (fs.set.length){
	    	this.addFilter({
	    		id: id,
	    		property: fs.property,
	    		operator: fs.operator,
	    		value: fs.set.toString()
	    	});
	    	this.filterset[id] = fs;
    	}
    },
    load: function(options){
    	var me = this;
    	if (!me.recycleMode)
    		return me.callParent(arguments);
        
        options = options || {};

        if (Ext.isFunction(options)) {
            options = {
                callback: options
            };
        }

        Ext.applyIf(options, {
        	action : 'recycle',
        	groupers: me.groupers.items,
            page: me.currentPage,
            start: (me.currentPage - 1) * me.pageSize,
            limit: me.pageSize,
	        filters: me.filters.items,
	        sorters: me.getSorters()
	    });
	    
	    var operation = Ext.create('Ext.data.Operation', options);
	    
	    if (me.fireEvent('beforerecycle', me, operation) !== false) {
	    	me.fakeProxy();
	        me.proxy.read(operation, me.onProxyLoad, me);
	        me.defakeProxy();
	    }
    },
    configProxy: function(fList){
    	var me = this,
    		model = me.model.getName(),
    		api = me.proxy.api,
    		bo = [],
    		rf = ['create','update','destroy','restore','recycle'],
    		bs = fList ?
    				(fList instanceof Array ? fList : fList.split(','))
    				: rf,
    		no = [],i,fn;
    	for(i in api){
    		if (i != 'read' && !Ext.Array.contains(bs,i))
    			bs.push(i);
    	}
    	for(i in bs){
    		fn = bs[i];
    		if (api[fn]){
    			if (!Ext.Array.contains(rf,fn) && me.proxy[fn])
    				Ext.ux.warning('Method '+fn+' của lớp [' + model + '] '
    						+ 'bị trùng tên với method có sẵn của proxy '
    						+ 'nên sẽ bị bỏ qua!');
    			else{
    				bo.push(fn);
	    			me.proxy[fn] = function(){
			    		return this.doRequest.apply(this, arguments);
				    };
    			}
    		}else no.push(bs[i]);
    	}
    	if (no.length && VX.config.debug>1)
			console.log('Lớp [' + model + '] không có method ' + no
    				+ '. Kiểm tra lại $API trong api.php.');

    	me.proxy.batchOrder = bo+'';
    	me.proxy.encodeFilters = function(filters) {
	        var min = [],
	            length = filters.length,
	            i = 0, fi;

	        for (; i < length; i++) {
	        	fi = filters[i];
	            min[i] = {
	                property: fi.property,
	                value   : fi.value
	            };
	            if (fi.id) min[i].id = fi.id;
	            if (fi.anyMatch) min[i].anyMatch = true;
	            if (fi.operator) min[i].operator = fi.operator;
	        }
	        return min;
	    };
    },
    addCallback: function(action,scope,funct){
    	this.rpcbackList[action] = {
    			scope : scope,
    			callback : funct
    		};
    },
    rpc: function(options){
    	if (!options || !options.action)
    		throw 'Phải thiết lập action trước khi gọi hàm Store->rpc()!';
    	if (options.scope && options.callback){
    		this.addCallback(options.action, options.scope, options.callback);
    		delete options.scope;
    		delete options.callback;
    	}
    	if (!options[options.action]){
    		options[options.action] = options.records ? options.records : {};
    	}
    	this.fakeProxy();
        this.proxy.batch(options, this.getBatchListeners());
        this.defakeProxy();
    },
	defakeProxy: function(){
		var me = this;
		if (me.fakeData){
			me.proxy.writer = me.fakeData.writer;
			me.proxy.batch  = me.fakeData.batch;
		}
	},
	fakeProxy: function(){
		var me = this;
		me.fakeData = {
			writer: me.proxy.writer,
			batch: me.proxy.batch
		};
		me.proxy.writer = {
			write: function(r){
	    		r.jsonData = r.params;
	    		return r;
	    	}
    	};
		me.proxy.batch = function(options, listeners) {
	        var me = this,
				batch,
	            records,
	            actions, aLen, action, a;

	        if (options.operations === undefined) {
	            options = {
	                operations: options,
	                listeners: listeners
	            };
	        }

	        if (options.batch) {
	            if (Ext.isDefined(options.batch.runOperation)) {
	                batch = Ext.applyIf(options.batch, {
	                    proxy: me,
	                    listeners: {}
	                });
	            }
	        } else {
	            options.batch = {
	                proxy: me,
	                listeners: options.listeners || {}
	            };
	        }

	        if (!batch) {
	            batch = new Ext.data.Batch(options.batch);
	        }

	        batch.on('complete', Ext.bind(me.onBatchComplete, me, [options], 0));

	        actions = me.batchOrder.split(',');
	        aLen    = actions.length;

	        for (a = 0; a < aLen; a++) {
	            action  = actions[a];
	            records = options.operations[action];
	            if (records)
	                batch.add(new Ext.data.Operation({
	                    action  : action,
	                    records : records,
	                    params  : options.operations.params
	                }));
	        }

	        batch.start();
	        return batch;
	    };
	},
	save: function(params, scope, callback){
		if (params.id){
			this.rpc({
					action: 'update',
					params: params,
					scope: scope,
					callback: callback
				});
		}else{
			this.addCallback('create', scope, callback);
			this.create(params);
		}
	},
    listeners:{
    	beforeload: function(me, options){
    		if (me.forceReset && me.forceReset.length)
	        	for(var i in me.forceReset){
	        		me.forceReset[i].load();
	        	}
			options.params = Ext.apply(options.params || {},{
				recycle: this.recycleMode
			});
	        return true;
	    },
	    write: function(me, operation){
	    	var c = me.rpcbackList[operation.action];
	    	if (c && c.scope && c.callback){
	    		delete me.rpcbackList[operation.action];
	    		c.callback(c.scope, operation.response.result);
	    	}
	    },
	    load: function( me, recs, success, eOpts ){
	    	if (success) me.loaded = true;
	    }
	}
});