Ext.define('VX.view.university.UM_Form', {
	extend: 'Ext.ux.WinForm',
    alias: 'widget.um-form',
	iconCls: 'mission16',
	title: 'Sứ mệnh',
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
			name: 'um_id'
		},{
			xtype: 'hidden',
			name: 'um_date'
		},{
			xtype: 'textfield',
			fieldLabel: 'Mã số',
			name: 'um_code'
		},{
			xtype: 'checkbox',
			fieldLabel: 'Được sử dụng',
			inputValue: 1,
			uncheckedValue: 0,
			name: 'um_isused'
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Simple').save(me,'Univ_mission','um_id');
			}
		}
    },
	setCourseId: function(id){
		this.univ_id = id;
	},
	newRecord: function() {
		var me = this,
			store = VX.getS('Univ_mission'),
			rec = Ext.create('VX.model.Univ_mission',{
				univ_id: store.filters.get('univ').value,
				um_date: new Date()
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
