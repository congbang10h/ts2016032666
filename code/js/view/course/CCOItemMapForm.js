Ext.define('VX.view.course.CCOItemMapForm', {
	extend: 'Ext.ux.Form',
	alias: 'widget.cco-item-map-form',
	btt: VX.BT_SUBMIT,
	layout: 'anchor',
	defaults:{
		labelAlign: 'left',
		labelWidth: 60,
		anchor: '100%'
	},
	items: [{
		xtype: 'checkbox',
		fieldLabel: 'Sử dụng',
		inputValue: 1,
		uncheckedValue: 0,
		name: 'link'
	},{
		xtype: 'flextext',
		fieldLabel: 'Mô tả',
		name: 'cco_desc',
		height: 100
	}],
	submit: function(){
		var me=this;
		if (me.isValid()){
			VX.getC('Outcome').saveCCOItemMap(me);
		}
	}
});
