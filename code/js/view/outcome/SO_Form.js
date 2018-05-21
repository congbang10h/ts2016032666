Ext.define('VX.view.outcome.SO_Form', {
	extend: 'Ext.ux.WinForm',
    alias: 'widget.student-outcome-form',
	iconCls: 'co16',
	title: 'Chuẩn đầu ra Sinh viên',
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
			name: 'so_id'
		},{
			xtype: 'hidden',
			name: 'so_date'
		},{
			xtype: 'textfield',
			fieldLabel: 'Mã số',
			name: 'so_code'
		},{
			xtype: 'checkbox',
			fieldLabel: 'Được sử dụng',
			inputValue: 1,
			uncheckedValue: 0,
			name: 'so_isused'
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Outcome').saveSO(me);
				VX.getS('Student_outcome').load();
			}
		}
    },
	setEduProId: function(id){
		this.edu_program_id = id;
	},
	newRecord: function() {
		var me = this,
			store = VX.getS('Student_outcome'),
			rec = Ext.create('VX.model.Student_outcome',{
				edu_program_id: store.filters.get('edupro').value,
				so_date: new Date()
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
