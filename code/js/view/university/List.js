Ext.define('VX.view.university.List', {
	extend: 'Ext.ux.grid.Grid',
	requires: [],
	title: 'Trường',
	closable: true,
	iconCls: 'university16',
	store: VX.getS('University'),
	form: Ext.create('VX.view.university.Form'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	viewConfig: {
		plugins: {
			ddGroup: 'map-university-to',
			ptype: 'gridviewdragdrop',
			enableDrop: false
		}
	},
	columns: [{
		dataIndex: 'univ_id',
		flex: 0.5,
		text: '#',
		filter:{type:'numeric'}
	}, {
		dataIndex: 'univ_code',
		flex: 0.5,
		text: 'Mã số',
		filter:{type:'string'}
	}, {
		dataIndex: 'univ_name_vn',
		flex: 1,
		text: 'Tên Tiếng Việt',
		filter:{type:'string'}
	}, {
		dataIndex: 'univ_name_en',
		flex: 1,
		text: 'Tên Tiếng Anh',
		filter:{type:'string'}
	}, {
		dataIndex: 'univ_name_short',
		flex: 1,
		text: 'Tên viết tắt',
		filter:{type:'string'}
	}],
	initComponent: function(){
		var me=this,toolbar;
		me.callParent(arguments);

		//Tim va chen nut content ngay phia sau nut update
		toolbar = me.getDockedItems('toolbar[dock="top"]')[0];
		toolbar.add(['->',{
			iconCls: 'mission16',
			disabled: true,
			text: 'Sứ mệnh',
			tooltip: 'Quản lý các Sứ mệnh đào tạo',
			handler: function() {
				var g = this.up('grid'),sm = g.getSelectionModel();
				if (!g.umWin)
					g.umWin = Ext.create('VX.view.university.UM_Win');
				g.umWin.setUniversity(sm.getSelection()[0]);
			}
		}]);
		me.buttons.mission = {
			enable: 1,
			bt: toolbar.down('[iconCls=mission16]'),
			selectrequire: 1
		};
	}
}); 