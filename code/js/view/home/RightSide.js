Ext.define('VX.view.home.RightSide',{
	extend: 'Ext.Panel',
	alias: 'widget.rightside',
	id: 'rightpanel',
	title: 'Thông tin',
	header: false,
	border: 0,
	collapsible: true,
	split: true,
	splitterResize: false,
    bodyCls: 'patternbg',
    defaults:{
    	collapsible: true,
		margin: '2 2 5 2'
    },
    items:[{
    	title: 'Công việc',
    	height: 250
    },{
    	title: 'Thống kê',
    	height: 150
    }]
});