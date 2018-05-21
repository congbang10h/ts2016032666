Ext.define('VX.view.home.MainContent', {
	extend: 'Ext.tab.Panel',
	id: 'main-content',
    alias: 'widget.maincontent',
	requires: [
		'VX.view.home.Welcome'
	],
    bodyCls: 'patternbg',
    tabCache: [],
    autoDestroy: false,
	items:[{
		xtype: 'welcome'
	}],
    constructor: function(){
		this.callParent(arguments);
		VX.cc.Home = this;
	},
	active: function(clsName, params){
		var me = this,c=me.tabCache,
			o=0,i=0,len=c.length;
		for(;i<len;i++){
			if (c[i].$className==clsName){
				o = c[i];
				break;
			}
		}
		if (!o){
			o = Ext.create(clsName);
			if (o)
				c.push(o);
		}
		if (o){
			if (o.setParams && params!=undefined)
				o.setParams(params);
			if (!me.getComponent(o))
				me.add(o);
			me.setActiveTab(o);
			return o;
		}else console.log('Không thể tạo lớp '+clsName);
	},
	reset: function(){
		this.removeAll();
	    this.add({
			xtype: 'welcome'
		});
	}
});