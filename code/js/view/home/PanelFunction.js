Ext.define('VX.view.home.PanelFunction', {
	extend: 'Ext.Panel',
	alias: 'widget.panelfunction',
	defaultExpand: false,
	defaults: {
		xtype: 'button',
		margin: '3 0 0 3',
		width: 184,
		textAlign: 'left'
	},
	initComponent: function(){
		this.callParent(arguments);
		var btts = this.query('button'),i=0,len=btts.length;
		for(;i<len;i++){
			btts[i].on('click',this.onAction,this);
		}
		this.reset();
	},
	onAction: function(button, event){
		VX.cc.Action.fire(button.action);
	},
	reset: function(){
	}
});
