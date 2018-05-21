Ext.define('VX.view.question.choice.Form', {
	extend: 'VX.view.question.EditForm',
	requires: [
		'VX.view.question.choice.ItemEdit',
		'VX.view.question.choice.ItemView',
		'VX.view.question.choice.ItemColumn'
	],
	iconCls: 'question16',
	title: 'Câu hỏi lựa chọn',
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
					xtype: 'question-choice-column'
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
				},{
					boxLabel: 'Đáp án có thể là nhiều mục',
					inputValue: 1,
					uncheckedValue: 0,
					xtype: 'checkbox',
					name: 'info_multichoice',
					listeners:{
						change: function(me){
							var q = me.up('form').question;
							q.info.multichoice = me.getValue()?1:0;
							q._change++;
						}
					}
				},{
					boxLabel: 'Trộn ngẫu nhiên thứ tự các mục',
					xtype: 'question-rand'
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
			panel = me.down('question-choice-column');
			panel.loadQuestion(q);
			q._change = 0;
			q._preview = -1;
			q._needPreview = 1;
		}//loadQuestion
	}],
	newRecord: function(){
		var me = this, frm = me.down('form'), q,
			bloom = frm.getForm().findField('bloom_level_id');
		q = frm.ctrl.qChoice.create();
		frm.loadQuestion(q);
		bloom.setValue(null);
		me.previewWin.setQuestion(q);
		me.show();
	}
});
