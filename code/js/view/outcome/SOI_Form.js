Ext.define('VX.view.outcome.SOI_Form', {
	extend: 'Ext.ux.WinForm',
    alias: 'widget.student-outcome-item-form',
	iconCls: 'so16',
	title: 'Chuẩn đầu ra chi tiết',
	layout: 'fit',
	items:{
		xtype: 'eform',
		btt: VX.BT_SUBMIT,
		layout: 'anchor',
		width: 500,
		defaults:{
			labelAlign: 'left',
			labelWidth: 90,
			anchor: '100%'
		},
		items: [{
			xtype: 'hidden',
			name: 'soi_id'
		},{
			xtype: 'textfield',
			fieldLabel: 'Mã số',
			name: 'soi_code'
		},{
			xtype: 'flextext',
			fieldLabel: 'Mô tả (Việt)',
			name: 'soi_desc_vn',
			height: 200
		},{
			xtype: 'flextext',
			fieldLabel: 'Mô tả (Anh)',
			name: 'soi_desc_en',
			height: 200
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Outcome').saveSOI(me);
			}
		}
    },
	setCourseId: function(id){
		this.course_id = id;
	},
	newRecord: function() {
		var me = this,
			s = VX.getS('Student_outcome_item'),
			so_id = s.filters.get('version').value,rec,frm;
		if (!so_id){
			Ext.ux.error('Chọn một Phiên bản chuẩn đầu ra tại danh sách bên trái');
			return;
		}
		rec = Ext.create('VX.model.Student_outcome_item',{
			so_id: so_id
		});
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
