Ext.define('VX.view.exam.ExamWinHorizontal', {
	extend: 'VX.view.exam.ExamWinBase',
	items: [{
		region: 'north',
		xtype: 'container',
		height: 30,
        layout: 'hbox',
		items: [{
			xtype: 'test-exam-tree',
			height: '100%',
			width: 0
		}, {
			xtype: 'toolbar',
			style: 'background:#3892d3;padding:0;border:0',
			flex: 1,
			items:[{
				xtype: 'box',
				cls: 'exam-static total',
				html: '<i class="title">Câu hỏi</i><i class="value">3</i>'
			}, {
				xtype: 'box',
				cls: 'exam-static flag',
				html: '<i class="title">Đánh dấu</i><i class="value">1</i>'
			}, {
				xtype: 'box',
				cls: 'exam-static answered',
				html: '<i class="title">Trả lời</i><i class="value">2</i>'
			},'->',{
				xtype: 'box',
				html: '<div id="exam_timer" class="exam-static">' +
				'<i class="title">Thời gian</i>' +
				'<i class="value">00:00</i>' +
				'</div>'
			},{
				iconCls: 'save16',
				text: 'Hoàn thành',
				handler: function() {
					this.up('window').saveAndQuit();
				}
			}]
		}]
	}, {
		region: 'center',
		overflowX: 'auto',
		overflowY: 'auto',
		items: {
			xtype: 'test-exam-panel'
		}
	}]
});
