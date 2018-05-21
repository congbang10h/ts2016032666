Ext.define('VX.view.outcome.PEOI_Form', {
	extend: 'Ext.ux.WinForm',
    alias: 'widget.peo-item-form',
	iconCls: 'peo16',
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
			name: 'peoi_id'
		},{
			xtype: 'textfield',
			fieldLabel: 'Mã số',
			name: 'peoi_code'
		},{
			xtype: 'flextext',
			fieldLabel: 'Mô tả (Việt)',
			name: 'peoi_desc_vn',
			height: 200
		},{
			xtype: 'flextext',
			fieldLabel: 'Mô tả (Anh)',
			name: 'peoi_desc_en',
			height: 200
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Outcome').savePEOI(me);
			}
		}
    },
	newRecord: function() {
		var me = this,
			s = VX.getS('Peo_item'),
			peo_id = s.filters.get('version').value,rec,frm;
		if (!peo_id){
			Ext.ux.error('Chọn một Phiên bản chuẩn đầu ra tại danh sách bên trái');
			return;
		}
		rec = Ext.create('VX.model.Peo_item',{
			peo_id: peo_id
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
