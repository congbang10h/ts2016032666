Ext.define('VX.view.test.List', {
	extend: 'Ext.ux.grid.Grid',
	requires: [
		'VX.store.Test',
		'VX.view.test.Form'
		//'VX.view.test.EditWin'
	],
	title: 'Đề thi',
	closable: true,
	iconCls: 'test16',
	store: VX.getS('Test'),
	form: Ext.create('VX.view.test.Form'),
	contentForm: 0,
	features: [{
		ftype: 'filters',
		encode: true
	}],
	columns: [{
		dataIndex: 'test_id',
		flex: 0.5,
		text: '#',
		filter:{type:'numeric'}
	}, {
		dataIndex: ':user_first_name',
		flex: 1,
		text: 'Họ',
		filter:{type:'string'}
	}, {
		dataIndex: ':user_last_name',
		flex: 1,
		text: 'Tên',
		filter:{type:'string'}
	}, {
		dataIndex: ':course_code',
		flex: 1,
		text: 'Mã môn',
		filter:{type:'string'}
	}, {
		dataIndex: ':course_name_vn',
		flex: 1,
		text: 'Tên môn',
		filter:{type:'string'}
	}, {
		dataIndex: 'test_creation_time',
		format: 'd/m/Y',
		flex: 1,
		text: 'Ngày tạo',
		filter:{type:'datetime'}
	}, {
		dataIndex: 'test_start_time',
		format: 'd/m/Y H:i',
		flex: 1,
		text: 'Giờ bắt đầu',
		filter:{type:'datetime'}
	}, {
		dataIndex: 'test_end_time',
		format: 'd/m/Y H:i',
		flex: 1,
		text: 'Giờ kết thúc',
		filter:{type:'datetime'}
	}, {
		dataIndex: 'test_duration',
		flex: 1,
		text: 'Thời gian',
		filter:{type:'numeric'}
	}, {
		dataIndex: ':test_review_code',
		renderer: function(val){
			return VX.vars.ReviewType.find(val);
		},
		flex: 1,
		text: 'Duyệt'
		//filter:{type:'numeric'}
	}],
	initComponent: function(){
		this.callParent(arguments);
		
		var tbar = this.getDockedItems('toolbar[dock="top"]')[0];
		//Tim va chen nut content ngay phia sau nut update
		tbar.add([{
			iconCls: 'review16',
			disabled: true,
			text: 'Duyệt đề',
			tooltip: 'Kiểm tra, duyệt lại nội dung đề thi',
			handler: function() {
				var g = this.up('grid'),
					sm = g.getSelectionModel();
				g.reviewContent(sm.getSelection()[0]);
			}
		},{
			iconCls: 'content16',
			disabled: true,
			text: 'Nội dung',
			tooltip: 'Soạn thảo nội dung đề thi',
			handler: function() {
				var g = this.up('grid'),
					sm = g.getSelectionModel();
				g.editContent(sm.getSelection()[0]);
			}
		},{
			iconCls: 'cc_co_r4t16',
			disabled: true,
			text: 'CC_CO_R4T',
			tooltip: 'Tỷ lệ Nội dung - Chuẩn đầu ra trong đề thi',
			handler: function() {
				var g = this.up('grid'),
						sm = g.getSelectionModel();
				g.editCC_CO_R4T(sm.getSelection()[0]);
			}
		},{
			iconCls: 'cc_co_r4tr16',
			disabled: true,
			text: 'CC_CO_R4TR',
			tooltip: 'Tỷ lệ đạt theo Nội dung - Chuẩn đầu ra trong kết quả thi',
			handler: function() {
				var g = this.up('grid'),
						sm = g.getSelectionModel();
				g.editCC_CO_R4TR(sm.getSelection()[0]);
			}
		},{
			iconCls: 'analyze16',
			disabled: true,
			text: 'ĐGCL',
			tooltip: 'Đánh giá chất lượng câu hỏi trong đề thi',
			handler: function() {
				var g = this.up('grid'),sm = g.getSelectionModel(),rec=sm.getSelection()[0];
				if (!g.analyzeForm)
					g.analyzeForm = Ext.create('VX.view.test.QuestionAnalyzeWin');
				g.analyzeForm.loadData(rec.get('test_id'),rec.get('course_id'));
				g.analyzeForm.show();
			}
		},{
			iconCls: 'rand16',
			disabled: true,
			text: 'DTRand',
			tooltip: 'Tạo nội dung đề thi ngẫu nhiên',
			handler: function() {
				var g = this.up('grid'),sm = g.getSelectionModel(),
					rec = sm.getSelection()[0];
				if (!g.randForm){
					g.randForm = Ext.create('VX.view.test.RandTest');
				}
				g.randForm.loadData(rec.get('test_id'));
			}
		}]);
		this.buttons.review = {
			enable: 1,
			bt: this.down('[iconCls=review16]'),
			selectrequire: 1
		};
		this.buttons.content = {
			enable: 1,
			bt: this.down('[iconCls=content16]'),
			selectrequire: 1
		};
		this.buttons.cc_co_r4t = {
			enable: 1,
			bt: this.down('[iconCls=cc_co_r4t16]'),
			selectrequire: 1
		};
		this.buttons.cc_co_r4tr = {
			enable: 1,
			bt: this.down('[iconCls=cc_co_r4tr16]'),
			selectrequire: 1
		};
		this.buttons.analyze = {
			enable: 1,
			bt: this.down('[iconCls=analyze16]'),
			selectrequire: 1
		};
		this.buttons.dtrand = {
			enable: 1,
			bt: this.down('[iconCls=rand16]'),
			selectrequire: 1
		};
	},
	editCC_CO_R4T: function(rec){
		var me=this;
		if (!me.cccoForm)
			me.cccoForm = Ext.create('VX.view.outcome.CC_CO_R4TWin');
		me.cccoForm.loadData(rec.get('test_id'),rec.get('course_id'));
		me.cccoForm.show();
	},
	editCC_CO_R4TR: function(rec){
		var me=this;
		if (!me.ccco2Form)
			me.ccco2Form = Ext.create('VX.view.outcome.CC_CO_R4TRWin');
		me.ccco2Form.loadData(rec.get('test_id'),rec.get('course_id'));
		me.ccco2Form.show();
	},
	editContent: function(rec){
		var me=this;
		if (!me.contentForm)
			me.contentForm = Ext.create('VX.view.test.EditWin');
		me.contentForm.loadTest(rec);
		me.contentForm.show();
	},
	reviewContent: function(rec){
		var me=this;
		if (!me.reviewForm)
			me.reviewForm = Ext.create('VX.view.test.ReviewWin');
		me.reviewForm.loadTest(rec);
		me.reviewForm.show();
	}
}); 