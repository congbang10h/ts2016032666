Ext.define('VX.view.outcome.CO_Form', {
	extend: 'Ext.ux.WinForm',
    alias: 'widget.course-outcome-form',
	iconCls: 'co16',
	title: 'Chuẩn đầu ra Môn học',
	layout: 'fit',
	items:{
		xtype: 'eform',
		btt: VX.BT_SUBMIT,
		layout: 'anchor',
		defaults:{
			labelAlign: 'left',
			labelWidth: 160,
			anchor: '100%'
		},
		items: [{
			xtype: 'hidden',
			name: 'co_id'
		},{
			xtype: 'hidden',
			name: 'co_date'
		},{
			xtype: 'textfield',
			fieldLabel: 'Mã số',
			name: 'co_code'
		},{
			xtype: 'checkbox',
			fieldLabel: 'Được sử dụng',
			inputValue: 1,
			uncheckedValue: 0,
			name: 'co_isused'
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Outcome').saveCO(me);
				VX.getS('Course_outcome').load();
			}
		}
    },
	setCourseId: function(id){
		this.course_id = id;
	},
	newRecord: function() {
		var me = this,
			store = VX.getS('VX.store.Course_outcome'),
			rec = Ext.create('VX.model.Course_outcome',{
				course_id: store.filters.get('course').value,
				co_date: new Date()
			}),
			frm = me.down('form');
		frm.loadRecord(rec);
		me.show();
	},
	editRecord: function(r){
		var me=this,frm=me.down('form');
		frm.loadRecord(r);
		me.show();
	}
});
