Ext.define('VX.view.exam.ExamWinVertical', {
	extend: 'VX.view.exam.ExamWinBase',
	items: [{
		region: 'east',
		xtype: 'container',
		width: '25%',
        layout: 'vbox',
		items: [{
			xtype: 'test-exam-tree',
			width: '100%',
			flex: 1
		}, {
			xtype: 'box',
			cls: 'exam-static total',
			html: '<i class="title">Câu hỏi</i><i class="value">3</i>',
			width: '100%',
			height: 31
		}, {
			xtype: 'box',
			cls: 'exam-static flag',
			html: '<i class="title">Đánh dấu</i><i class="value">1</i>',
			width: '100%',
			height: 31
		}, {
			xtype: 'box',
			cls: 'exam-static answered',
			html: '<i class="title">Trả lời</i><i class="value">2</i>',
			width: '100%',
			height: 31
		},{
			xtype: 'box',
			html: '<div id="exam_timer" class="exam-static">' +
			'<i class="title">Thời gian</i>' +
			'<i class="value">00:00</i>' +
			'</div>',
			width: '100%',
			height: 31
		},{
			xtype: 'toolbar',
			style: "padding-left: 110px;",
			height: 80,
			width: '100%',
			items:[{
				iconCls: 'save16',
				text: 'Hoàn thành',
				iconAlign: 'top',
				scale: 'medium',
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
			xtype: 'test-exam-panel',
			width: 700
		}
	}]
});
