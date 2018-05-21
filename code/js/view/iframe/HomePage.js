Ext.define('VX.view.iframe.HomePage', {
    extend: 'Ext.Container',
    layout: 'fit',
    items: [{
    	xtype: 'maincontent'
    }],
    listeners:{
    	boxready: function (me){
    		var d=Ext.get('startloading');
    		if (d) d.remove();
    	}
    }
});