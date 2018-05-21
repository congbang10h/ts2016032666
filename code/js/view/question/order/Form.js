Ext.define('VX.view.question.order.Form', {
	extend: 'VX.view.question.EditForm',
	requires: [
		'VX.view.question.order.ItemEdit',
		'VX.view.question.order.ItemColumn'
	],
	iconCls: 'question16',
	title: 'Câu hỏi xếp thứ tự',
	items: [{
		xtype: 'question-base-form',
		items: [{
			xtype: 'tabpanel',
			plain: true,
			items: [{
				title: 'Câu hỏi',
				height: 450,
				bodyPadding: 10,
				overflowY: 'scroll',
				overflowX: 'hidden',
				itemId: 'question-basic-tab',
				items: [{
					xtype: 'question-bloom'
				},{
					xtype: 'question-desc'
				},{
					fieldLabel: 'Các mục chọn',
					xtype: 'question-order-column'
				}]
			},{
				title: 'Tham số',
				height: 420,
				bodyPadding: 10,
				autoScroll: true,
				defaults:{
					width: '100%'
				},
				items:[{
					xtype: 'question-name'
				}, {
					xtype: 'question-tags'
				}]
			}]//items Cau hoi+Tham so
		}],//items BaseForm
		loadQuestion: function(q){
			var me=this,frm=me.getForm(),f,i,panel;
			
			q._needPreview = 0;
			me.question = q;
			f = frm.findField('question_desc');
			f.setValue(q.description);
			for(i in q.info){
				f = frm.findField('info_'+i);
				f.setValue(q.info[i]);
			}
			panel = me.down('question-order-column');
			panel.loadQuestion(q);
			q._change = 0;
			q._preview = -1;
			q._needPreview = 1;
		}//loadQuestion
	}],//BaseForm
	newRecord: function(){
		var me = this, frm = me.down('form'), q,
			bloom = frm.getForm().findField('bloom_level_id');
		q = frm.ctrl.qOrder.create();
		frm.loadQuestion(q);
		bloom.setValue(null);
		me.previewWin.setQuestion(q);
		me.show();
	}
});
