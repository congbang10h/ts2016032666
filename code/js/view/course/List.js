Ext.define('VX.view.course.List', {
	extend: 'Ext.ux.grid.Grid',
	requires: [
		'VX.view.course.ContentWin',
		'VX.view.course.Form'
	],
	title: 'Môn học',
	closable: true,
	iconCls: 'course16',
	store: VX.getS('Course'),
	form: Ext.create('VX.view.course.Form'),
	contentForm: 0,
	features: [{
		ftype: 'filters',
		encode: true
	}],
	columns: [{
		dataIndex: 'course_id',
		text: '#',
		flex: 0.3,
		filter:{type:'numeric'}
	}, {
		dataIndex: 'course_code',
		flex: 1,
		text: 'Mã môn',
		filter:{type:'string'}
	}, {
		dataIndex: 'course_name_vn',
		flex: 1.2,
		text: 'Tên môn',
		filter:{type:'string'}
	}, {
		dataIndex: 'course_name_en',
		flex: 1.2,
		text: 'Tên môn TA',
		hidden: true,
		filter:{type:'string'}
	}, {
		dataIndex: 'course_version_code',
		flex: 0.8,
		text: 'Phiên  bản',
		filter:{type:'string'}
	}, {
		dataIndex: 'course_introduced_date',
		flex: 0.8,
		hidden: true,
		text: 'Ngày giới thiệu',
		filter:{type:'date'}
	}, {
		dataIndex: 'course_applied_year',
		flex: 0.8,
		text: 'Ngày áp dụng',
		filter:{type:'date'}
	}, {
		dataIndex: 'course_credits',
		flex: 0.3,
		text: 'Số tín chỉ',
		filter:{type:'numeric'}
	}],
	initComponent: function(){
		var me=this;
		me.callParent(arguments);
		
		var tbar = me.getDockedItems('toolbar[dock="top"]')[0];
		//Tim va chen nut content ngay phia sau nut update
		tbar.add([{
			iconCls: 'content16',
			disabled: true,
		    text: 'Nội dung',
		    tooltip: 'Soạn thảo nội dung môn học',
		    handler: function() {
				var g = this.up('grid'),
					sm = g.getSelectionModel();
				g.editContent(sm.getSelection()[0]);
		    }
		},{
			iconCls: 'co16',
			disabled: true,
			text: 'Chuẩn đầu ra',
			tooltip: 'Quản lý Chuẩn đầu ra của môn học',
			handler: function() {
				var g = this.up('grid'),
					sm = g.getSelectionModel();
				g.editOutcome(sm.getSelection()[0]);
			}
		},{
			iconCls: 'mapping16',
			disabled: true,
			text: 'Mapping CC-CO',
			tooltip: 'Ma trận Nội dung - Chuẩn đầu ra',
			handler: function() {
				var g = this.up('grid'),
					sm = g.getSelectionModel();
				g.editMapping(sm.getSelection()[0]);
			}
		},{
			iconCls: 'trcor16',
			disabled: true,
			text: 'TRCOR',
			tooltip: 'Tỷ lệ Kết quả thi - Chuẩn đầu ra',
			handler: function() {
				var g = this.up('grid'),
					sm = g.getSelectionModel();
				g.editTRCOR(sm.getSelection()[0]);
			}
		}]);
		me.buttons.content = {
			enable: 1,
			bt: this.down('[iconCls=content16]'),
			selectrequire: 1
		};
		me.buttons.outcome = {
			enable: 1,
			bt: this.down('[iconCls=co16]'),
			selectrequire: 1
		};
		me.buttons.mapping = {
			enable: 1,
			bt: this.down('[iconCls=mapping16]'),
			selectrequire: 1
		};
		me.buttons.trcor = {
			enable: 1,
			bt: this.down('[iconCls=trcor16]'),
			selectrequire: 1
		};
	},
	editContent: function(rec){
		var me=this;
		if (!me.contentForm)
			me.contentForm = Ext.create('VX.view.course.ContentWin');
		me.contentForm.loadCourse(rec);
		me.contentForm.show();
	},
	editOutcome: function(rec){
		var me=this;
		if (!me.outcomeForm)
			me.outcomeForm = Ext.create('VX.view.outcome.CO_Win');
		me.outcomeForm.show();
		me.outcomeForm.loadCourse(rec);
	},
	editMapping: function(rec){
		var me=this;
		if (!me.outcomeMap)
			me.outcomeMap = Ext.create('VX.view.outcome.MapWin_CC_COI');
		me.outcomeMap.show();
		me.outcomeMap.loadCourse(rec);
	},
	editTRCOR: function(rec){
		var me=this;
		if (!me.trcorWin)
			me.trcorWin = Ext.create('VX.view.outcome.TRCORWin');
		me.trcorWin.show();
		me.trcorWin.loadData(rec.get('course_id'));
	},
	editCC_CO_R4T: function(rec){
		var me=this;
		if (!me.cccorWin)
			me.cccorWin = Ext.create('VX.view.outcome.CC_CO_R4TWin');
		me.cccorWin.show();
		me.cccorWin.loadData(rec.get('course_id'));
	},
	newCourse: function(type){
		
	}
}); 