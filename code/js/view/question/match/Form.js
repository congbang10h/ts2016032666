Ext.define('VX.view.question.match.Form', {
	extend: 'VX.view.question.EditForm',
	requires: [
		'VX.view.question.match.ItemEdit',
		'VX.view.question.match.ItemConnect',
		'VX.view.question.match.ItemColumn',
		'VX.view.question.match.ItemPanel'
	],
	iconCls: 'question16',
	title: 'Câu hỏi liên kết nhóm',
	items: [{
		xtype: 'question-base-form',
		items: [{
			xtype: 'tabpanel',
			plain: true,
			items: [{
				title: 'Câu hỏi',
				height: 460,
				bodyPadding: 10,
				overflowY: 'scroll',
				overflowX: 'hidden',
				itemId: 'question-basic-tab',
				items: [{
					xtype: 'question-bloom'
				},{
					xtype: 'question-desc'
				},{
					xtype: 'container',
					width: '100%',
					overflowX: 'scroll',
					items:[{
						fieldLabel: 'Các mục chọn',
						xtype: 'match-item-panel'
					}]
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
					boxLabel: 'Cho phép kết nối một mục với nhiều mục',
					inputValue: 1,
					uncheckedValue: 0,
					xtype: 'checkbox',
					name: 'info_multimatch',
					listeners:{
						change: function(me){
							var q = me.up('form').question;
							q.info.multimatch = me.getValue();
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
			
			me.ctrl.qMatch.convertSolution2Link(q);
			q._needPreview = 0;
			me.question = q;
			f = frm.findField('question_desc');
			f.setValue(q.description);
			for(i in q.info){
				f = frm.findField('info_'+i);
				f.setValue(q.info[i]);
			}
			panel = me.down('match-item-panel');
			panel.loadQuestion(q);
			q._change = 0;
			q._preview = -1;
			q._needPreview = 1;
		}//loadQuestion
	}],//BaseForm
	newRecord: function(){
		var me = this, frm = me.down('form'), q,
			bloom = frm.getForm().findField('bloom_level_id');
		q = frm.ctrl.qMatch.create();
		frm.loadQuestion(q);
		bloom.setValue(null);
		me.previewWin.setQuestion(q);
		me.show();
	}
});
