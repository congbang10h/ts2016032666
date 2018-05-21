Ext.define('VX.view.eduprogram.List', {
	extend: 'Ext.ux.grid.Grid',
	requires: [],
	title: 'Chương trình đào tạo',
	closable: true,
	iconCls: 'eduprogram16',
	store: VX.getS('Educational_program'),
	form: Ext.create('VX.view.eduprogram.Form'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	viewConfig: {
		plugins: {
			ddGroup: 'map-eduprogram-to',
			ptype: 'gridviewdragdrop',
			enableDrop: false
		}
	},
	columns: [{
		dataIndex: 'edu_program_id',
		flex: 0.5,
		text: '#',
		filter:{type:'numeric'}
	}, {
		dataIndex: 'edu_program_code',
		flex: 0.5,
		text: 'Mã số',
		filter:{type:'string'}
	}, {
		dataIndex: 'edu_program_name_short',
		flex: 0.5,
		text: 'Viết tắt',
		filter:{type:'string'}
	}, {
		dataIndex: 'edu_program_start_year',
		flex: 0.5,
		text: 'Ngày bắt đầu',
		filter:{type:'date'}
	}, {
		dataIndex: 'edu_program_end_year',
		flex: 0.5,
		text: 'Ngày kết thúc',
		filter:{type:'date'}
	}, {
		dataIndex: 'edu_program_name_vn',
		flex: 1,
		text: 'Tên Tiếng Việt',
		filter:{type:'string'}
	}, {
		dataIndex: 'edu_program_name_en',
		flex: 1,
		hidden: true,
		text: 'Tên Tiếng Anh',
		filter:{type:'string'}
	}, {
		dataIndex: ':faculty_name_vn',
		flex: 1,
		text: 'Khoa',
		filter:{type:'string'}
	}, {
		dataIndex: ':univ_name_vn',
		flex: 1,
		text: 'Trường',
		filter:{type:'string'}
	}],
	initComponent: function(){
		var me=this,toolbar;
		me.callParent(arguments);

		//Tim va chen nut content ngay phia sau nut update
		toolbar = me.getDockedItems('toolbar[dock="top"]')[0];
		toolbar.add(['->',{
			iconCls: 'course16',
			disabled: true,
			text: 'Môn học',
			tooltip: 'Quản lý các môn học trong Chương trình đào tạo',
			handler: function() {
				var g = this.up('grid'),sm = g.getSelectionModel();
				if (!g.courseWin)
					g.courseWin = Ext.create('VX.view.eduprogram.CourseWin');
				g.courseWin.setEduPro(sm.getSelection()[0]);
			}
		},{
			iconCls: 'so16',
			disabled: true,
			text: 'SO',
			tooltip: 'Quản lý Chuẩn đầu ra Sinh viên',
			handler: function() {
				var g = this.up('grid'),sm = g.getSelectionModel();
				if (!g.soWin)
					g.soWin = Ext.create('VX.view.outcome.SO_Win');
				g.soWin.loadEduPro(sm.getSelection()[0]);
			}
		},{
			iconCls: 'peo16',
			disabled: true,
			text: 'PEO',
			tooltip: 'Quản lý Chuẩn đầu ra Chương trình đào tạo',
			handler: function() {
				var g = this.up('grid'),sm = g.getSelectionModel();
				if (!g.peoWin)
					g.peoWin = Ext.create('VX.view.outcome.PEO_Win');
				g.peoWin.loadEduPro(sm.getSelection()[0]);
			}
		},{
			iconCls: 'mapping16',
			disabled: true,
			text: 'CO-SO',
			tooltip: 'Ma trận Chuẩn đầu ra: Môn học - Sinh viên',
			handler: function() {
				var g = this.up('grid'),
					sm = g.getSelectionModel();
				if (!g.mapCOSOWin)
					g.mapCOSOWin = Ext.create('VX.view.outcome.MapWin_CO_SO');
				g.mapCOSOWin.loadEduPro(sm.getSelection()[0]);
			}
		},{
			iconCls: 'so-peo16',
			disabled: true,
			text: 'SO-PEO',
			tooltip: 'Ma trận Chuẩn đầu ra: Sinh viên - Chương trình',
			handler: function() {
				var g = this.up('grid'),
					sm = g.getSelectionModel();
				if (!g.mapSOPEOWin)
					g.mapSOPEOWin = Ext.create('VX.view.outcome.MapWin_SO_PEO');
				g.mapSOPEOWin.loadEduPro(sm.getSelection()[0]);
			}
		},{
			iconCls: 'peo-um16',
			disabled: true,
			text: 'PEO-UM',
			tooltip: 'Ma trận Chuẩn đầu ra: Chương trình - Sứ mệnh',
			handler: function() {
				var g = this.up('grid'),
					sm = g.getSelectionModel();
				if (!g.mapPEOUMWin)
					g.mapPEOUMWin = Ext.create('VX.view.outcome.MapWin_PEO_UM');
				g.mapPEOUMWin.loadEduPro(sm.getSelection()[0]);
			}
		},{
			iconCls: 'listcso16',
			disabled: true,
			text: 'CSO',
			tooltip: 'Ma trận giữa Môn học với Chuẩn đầu ra của Sinh viên',
			handler: function() {
				var g = this.up('grid'),
					sm = g.getSelectionModel();
				if (!g.mapCSOWin)
					g.mapCSOWin = Ext.create('VX.view.outcome.MapWin_CSO');
				g.mapCSOWin.loadEduPro(sm.getSelection()[0]);
			}
		},{
			iconCls: 'co_so_r4tr16',
			disabled: true,
			text: 'CO_SO_R4TR',
			tooltip: 'Tỷ lệ đạt theo Chuẩn đầu ra Môn học - Chuẩn đầu ra Sinh viên trong kết quả thi',
			handler: function() {
				var g = this.up('grid'),
					sm = g.getSelectionModel();
				if (!g.co_so_r4tr)
					g.co_so_r4tr = Ext.create('VX.view.outcome.CO_SO_R4TRWin');
				g.co_so_r4tr.loadEduPro(sm.getSelection()[0]);
			}
		},{
			iconCls: 'course_so_r4tr16',
			disabled: true,
			text: 'Course_SO_R4TR',
			tooltip: 'Chất lượng chương trình đào tạo',
			handler: function() {
				var g = this.up('grid'),
					sm = g.getSelectionModel();
				if (!g.course_so_r4tr)
					g.course_so_r4tr = Ext.create('VX.view.outcome.Course_SO_R4TRWin');
				g.course_so_r4tr.loadEduPro(sm.getSelection()[0]);
			}
		}]);
		me.buttons.course = {
			enable: 1,
			bt: toolbar.down('[iconCls=course16]'),
			selectrequire: 1
		};
		me.buttons.so = {
			enable: 1,
			bt: toolbar.down('[iconCls=so16]'),
			selectrequire: 1
		};
		me.buttons.peo = {
			enable: 1,
			bt: toolbar.down('[iconCls=peo16]'),
			selectrequire: 1
		};
		me.buttons.mapcoso = {
			enable: 1,
			bt: toolbar.down('[iconCls=mapping16]'),
			selectrequire: 1
		};
		me.buttons.mapsopeo = {
			enable: 1,
			bt: toolbar.down('[iconCls=so-peo16]'),
			selectrequire: 1
		};
		me.buttons.mappeoum = {
			enable: 1,
			bt: toolbar.down('[iconCls=peo-um16]'),
			selectrequire: 1
		};
		me.buttons.listcso = {
			enable: 1,
			bt: toolbar.down('[iconCls=listcso16]'),
			selectrequire: 1
		};
		me.buttons.co_so_r4tr = {
			enable: 1,
			bt: toolbar.down('[iconCls=co_so_r4tr16]'),
			selectrequire: 1
		};
		me.buttons.course_so_r4tr = {
			enable: 1,
			bt: toolbar.down('[iconCls=course_so_r4tr16]'),
			selectrequire: 1
		};
	}
}); 