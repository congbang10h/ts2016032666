Ext.define('VX.view.course.QuestionLibrary', {
	extend: 'Ext.ux.grid.Grid',
	requires: [
		'VX.store.QuestionLibrary',
		'VX.store.ContentQuestion',
		'VX.view.question.PreviewForm'
	],
	alias: 'widget.questionlib',
	toolbar: false,
	store: VX.getS('QuestionLibrary'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	multiSelect: true,
	viewConfig: {
		plugins: {
			ptype: 'gridviewdragdrop',
			dragGroup: 'question-library',
			dropGroup: 'content-question'
		},
		listeners: {
			drop: function(/*node, data, dropRec, dropPosition*/){
				VX.getSE('QuestionLibrary').sync();
				VX.getSE('ContentQuestion').sync();
			}
		}
	},
	columns: [{
		dataIndex: 'question_id',
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
		dataIndex: 'question_level',
		text: 'Cấp độ',
		flex: 1,
		filter:{type:'string'}
	}, {
		xtype: 'actioncolumn',
		width: 50,
		items: [{
			iconCls: 'up16',
			tooltip: 'Đưa câu hỏi vào danh sách ở trên',
			handler: function(grid, rowIndex/*, colIndex*/) {
				var lib=VX.getSE('QuestionLibrary'),
					store=VX.getSE('ContentQuestion'),
					rec = lib.getAt(rowIndex);
				console.log('Up question '+rec.get('question_id'));
				store.add(rec);
				lib.remove(rec);
				store.sync();
				lib.sync();
			}
		},{
			//icon: 'extjs/examples/restful/images/delete.png',
			iconCls: 'preview16',
			tooltip: 'Xem câu hỏi',
			handler: function(grid, rowIndex/*, colIndex*/) {
				var rec = grid.getStore().getAt(rowIndex),
					c = VX.getC('Question'),
					question = c.fromRecord(rec),
					frm = grid.frmPreview;
				if (!frm){
					frm = Ext.create('VX.view.question.PreviewForm');
					frm.livePreview = 0;
					grid.frmPreview = frm;
				}
				frm.show('active');
				frm.setQuestion(question);
			}
		}]
	}]
}); 