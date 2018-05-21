Ext.define('VX.view.university.UMI_Form', {
	extend: 'Ext.ux.WinForm',
    alias: 'widget.um-item-form',
	iconCls: 'mission16',
	title: 'Sứ mệnh chi tiết',
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
			name: 'umi_id'
		},{
			xtype: 'textfield',
			fieldLabel: 'Mã số',
			name: 'umi_code'
		},{
			xtype: 'flextext',
			fieldLabel: 'Mô tả (Việt)',
			name: 'umi_desc_vn',
			height: 200
		},{
			xtype: 'flextext',
			fieldLabel: 'Mô tả (Anh)',
			name: 'umi_desc_en',
			height: 200
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Simple').save(me,'Univ_mission_item','umi_id');
			}
		}
    },
	newRecord: function() {
		var me = this,
			s = VX.getS('Univ_mission_item'),
			um_id = s.filters.get('version').value,rec,frm;
		if (!um_id){
			Ext.ux.error('Chọn một Phiên bản Sứ mệnh tại danh sách bên trái');
			return;
		}
		rec = Ext.create('VX.model.Univ_mission_item',{
			um_id: um_id
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
