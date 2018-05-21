Ext.define('Ext.ux.form.SearchField', {
    //extend: 'Ext.form.field.Text',
    extend: 'Ext.form.field.Trigger',
    
    alias: 'widget.searchfield',
    
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',
    
    hasSearch : false,
    paramName : 'query',

    initComponent: function(){
		var me = this;
        me.callParent(arguments);
        me.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, me);
    },
    
    afterRender: function(){
        this.callParent();
		if (this.triggerCell)
        	this.triggerCell.item(0).setDisplayed('none');
    },
    
    onTrigger1Click : function(){
        var me = this,
            store = me.store,
            proxy = store.getProxy();
            
        if (me.hasSearch) {
            me.setValue('');
            proxy.extraParams[me.paramName] = '';
            proxy.extraParams.start = 0;
            store.load();
            me.hasSearch = false;
			if (this.triggerCell)
            	me.triggerCell.item(0).setDisplayed('none');
            me.doComponentLayout();
        }
    },

    onTrigger2Click : function(){
        var me = this,
            store = me.store,
            proxy = store.getProxy(),
            value = me.getValue();

        if (value.length < 1) {
            me.onTrigger1Click();
            return;
        }
		if (value.length < 4){
			me.setActiveError('Nội dung tìm kiếm dài ít nhất 4 ký tự');
			return;
		}
		proxy.extraParams[me.paramName] = value;
        proxy.extraParams.start = 0;
        store.load();
        me.hasSearch = true;
		if (this.triggerCell)
        	me.triggerCell.item(0).setDisplayed('block');
        me.doComponentLayout();
    }
});
