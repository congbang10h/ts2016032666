Ext.define('VX.view.home.Welcome',{
	extend: 'Ext.Panel',
	title: 'Giới thiệu',
    iconCls: 'home16',
	alias: 'widget.welcome',
	autoScroll: true,
	
    initComponent: function(){
		var store = Ext.create('Ext.data.Store', {
			fields:['text'],
		     proxy: {
		        type: 'ajax',
		        url: 'php/api/welcome.php'
		     }
		 });
		store.load({scope:this,callback:this.onStoreLoad});
		
		this.callParent(arguments);
	},
	onStoreLoad: function(records, operation, success){
		if (records && records.length){
			this.add([{
				xtype: 'component',
				autoEl: {
					tag: 'div',
					padding: 5,
					html: records[0].data.text
				}
			}]);
		}
	}

});