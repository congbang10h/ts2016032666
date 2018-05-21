Ext.define('VX.view.outcome.PEO_Form', {
	extend: 'Ext.ux.WinForm',
    alias: 'widget.peo-form',
	iconCls: 'peo16',
	title: 'Chuẩn đầu ra Chương trình',
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
			name: 'peo_id'
		},{
			xtype: 'hidden',
			name: 'peo_date'
		},{
			xtype: 'textfield',
			fieldLabel: 'Mã số',
			name: 'peo_code'
		},{
			xtype: 'checkbox',
			fieldLabel: 'Được sử dụng',
			inputValue: 1,
			uncheckedValue: 0,
			name: 'peo_isused'
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Outcome').savePEO(me);
				VX.getS('Peo').load();
			}
		}
    },
	setEduProId: function(id){
		this.edu_program_id = id;
	},
	newRecord: function() {
		var me = this,
			store = VX.getS('Peo'),
			rec = Ext.create('VX.model.Peo',{
				edu_program_id: store.filters.get('edupro').value,
				peo_date: new Date()
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
