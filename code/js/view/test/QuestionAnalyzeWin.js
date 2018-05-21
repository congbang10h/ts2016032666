Ext.define('VX.view.test.QuestionAnalyzeList', {
	extend: 'Ext.ux.grid.Grid',
	alias: 'widget.question-analyze-list',
	store: VX.getSE('QuestionAnalyze'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	columns: [{
		dataIndex: 'question_id',
		flex: 0.5,
		hidden: true,
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
		dataIndex: 'question_desc',
		text: 'Mô tả',
		flex: 3,
		filter:{type:'string'}
	}, {
		dataIndex: ':question_type_code',
		text: 'Loại',
		flex: 1,
		filter:{type:'string'}
	}, {
		dataIndex: ':bloom_level_desc',
		text: 'Cấp độ',
		flex: 1,
		filter:{type:'string'}
	}, {
		dataIndex: 'difficulty',
		align: 'right',
		renderer: function(val){
			return (val*100).toFixed(2)+'%';
			//return val<0.25?'Khó':(val>0.75?'Dễ':'Trung bình');
		},
		text: 'Độ khó',
		flex: 1,
		filter:{type:'numeric'}
	}, {
		dataIndex: 'difficulty',
		align: 'right',
		renderer: function(val){
			//return (val*100).toFixed(2)+'%';
			return val<0.25?'Khó':(val>0.75?'Dễ':'Trung bình');
		},
		text: 'Độ khó',
		flex: 1,
		filter:{type:'numeric'}
	}, {
		dataIndex: 'discrimination',
		align: 'right',
		renderer: function(val){
			return val.toFixed(2);
			//return val<0.2?'Kém':(val<=0.29?'Trung bình':val<=0.39?'Khá':'Tốt');
		},
		text: 'Độ phân cách',
		flex: 1,
		filter:{type:'numeric'}
	}, {
		dataIndex: 'discrimination',
		align: 'right',
		renderer: function(val){
			//return val.toFixed(2);
			return val<0.2?'Kém':(val<=0.29?'Trung bình':val<=0.39?'Khá':'Tốt');
		},
		text: 'Độ phân cách',
		flex: 1,
		filter:{type:'numeric'}
	}]
});
Ext.define('VX.view.test.QuestionAnalyzeWin', {
	extend: 'Ext.ux.WinForm',
	title: 'Đánh giá chất lượng câu hỏi trong đề thi',
	iconCls: 'analyze16',
	width: '100%',
	height: '100%',
	layout: 'fit',
	items:[{
		xtype: 'question-analyze-list'
	}],
	ready2Load: function(res){
		VX.getSE('QuestionAnalyze').load();
	},
	loadData: function(test_id,course_id) {
		var me = this;
		if (!me.grid) {
			me.grid = me.down('grid');
		}
		Ext.ux.rpc({
			action: 'QuestionAnalyze',
			method: 'prepare',
			params: {
				test_id: test_id,
				course_id: course_id
			},
			scope: me,
			callback: me.ready2Load
		});
	}
});
