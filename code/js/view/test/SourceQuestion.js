Ext.define('VX.view.test.SourceQuestion', {
	extend: 'Ext.ux.grid.Grid',
	alias: 'widget.test-src-question',
	toolbar: false,
	store: VX.getSE('TestSourceQuestion'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	multiSelect: true,
	viewConfig: {
		plugins: {
			ptype: 'gridviewdragdrop',
			ddGroup: 'test-add-question',
			enableDrop: false
		}
	},
	columns: [{
		dataIndex: 'question_id',
		hidden: true,
		flex: 0.5,
		text: '#',
		filter:{type:'numeric'}
	}, {
		dataIndex: ':user_first_name',
		hidden: true,
		flex: 1,
		text: 'Họ',
		filter:{type:'string'}
	}, {
		dataIndex: ':user_last_name',
		hidden: true,
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
		xtype: 'actioncolumn',
		width: 50,
		items: [{
			iconCls: 'add16',
			tooltip: 'Thêm câu hỏi vào vị trí đã chọn',
			handler: function(grid, rowIndex, colIndex) {
				var s = grid.getStore(), rec = s.getAt(rowIndex),
					btt=grid.up('test-edit-win').currentAddBtt;
				if (btt){
					btt.addQuestion([rec]);
				}else{
					Ext.ux.message('Chọn vùng cần thêm câu hỏi ở cửa sổ bên trái');
				}
			}
		},{
			iconCls: 'preview16',
			tooltip: 'Xem câu hỏi',
			handler: function(grid, rowIndex, colIndex) {
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