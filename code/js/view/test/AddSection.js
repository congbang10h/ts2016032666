Ext.define('VX.view.test.AddSection',{
	extend: 'Ext.container.Container',
	alias: 'widget.test-add-section',
	width: '100%',
	style: 'margin-top:5px;margin-bottom:5px;',
	layout: 'hbox',
	items: [{
		flex: 1,
		xtype: 'container',
		height: 24,
		style: 'border:1px dashed silver;margin-right:3px;',
		html: 'Tạo vùng mới'
	},{
		xtype: 'container',
		items: [{
			xtype: 'button',
			iconCls: 'add16',
			handler: function(){
				var me=this,s=me.up('test-add-section'),p=s.up('test-edit-panel');
				p.addSection(s);
			}
		}]
	}]
});
