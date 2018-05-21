Ext.define('VX.view.exam.List', {
	extend: 'Ext.ux.grid.Grid',
	requires: [
		'VX.storx.TestForExam',
		'VX.view.exam.ExamWinVertical'
	],
	title: 'Kiểm tra',
	closable: true,
	iconCls: 'exam16',
	store: VX.getSE('TestForExam'),
	//form: Ext.create('VX.view.exam.ExamWin'),
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
	}],
	initComponent: function(){
		this.callParent(arguments);
		
		var tbar = this.getDockedItems('toolbar[dock="top"]')[0];
		tbar.add([{
			iconCls: 'exam16',
			disabled: true,
			text: 'Kiểm tra',
			tooltip: 'Thực hiện bài thi',
			handler: function() {
				var g = this.up('grid'),
						sm = g.getSelectionModel();
				g.doExam(sm.getSelection()[0]);
			}
		},{
			iconCls: 'rand16',
			disabled: true,
			text: 'KQRand',
			tooltip: 'Tạo 25 bài thi có kết quả ngẫu nhiên',
			handler: function() {
				var g = this.up('grid'),sm = g.getSelectionModel(),ctrl=VX.getC('Exam'),
						rec = sm.getSelection()[0];
				ctrl.examRand(rec.get('test_id'));
			}
		}]);
		this.buttons.exam = {
			enable: 1,
			bt: this.down('[iconCls=exam16]'),
			selectrequire: 1
		};
		this.buttons.examRand = {
			enable: 1,
			bt: this.down('[iconCls=rand16]'),
			selectrequire: 1
		};
	},
	doExam: function(rec){
		var me=this, ctrl=VX.getC('Exam');
		if (!me.form){
			me.form = Ext.create('VX.view.exam.ExamWinVertical');
		}
		//me.form.show(); only show when prepare responsed
		ctrl.prepare(me.form, rec.get('test_id'));
	},
	onItemDblClick: function(dv, rec, item, index, e) {
		this.doExam(rec);
	}
}); 