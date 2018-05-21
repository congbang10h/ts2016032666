Ext.define('VX.view.outcome.COI_Form', {
	extend: 'Ext.ux.WinForm',
    alias: 'widget.course-outcome-item-form',
	iconCls: 'co16',
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
			name: 'coi_id'
		},{
			xtype: 'textfield',
			fieldLabel: 'Mã số',
			name: 'coi_code'
		},{
			xtype: 'flextext',
			fieldLabel: 'Mô tả (Việt)',
			name: 'coi_desc_vn',
			height: 200
		},{
			xtype: 'flextext',
			fieldLabel: 'Mô tả (Anh)',
			name: 'coi_desc_en',
			height: 200
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Outcome').saveCOI(me);
			}
		}
    },
	setCourseId: function(id){
		this.course_id = id;
	},
	newRecord: function() {
		var me = this,
			s = VX.getS('Course_outcome_item'),
			co_id = s.filters.get('version').value,rec,frm;
		if (!co_id){
			Ext.ux.error('Chọn một Phiên bản chuẩn đầu ra tại danh sách bên trái');
			return;
		}
		rec = Ext.create('VX.model.Course_outcome_item',{
			co_id: co_id
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
