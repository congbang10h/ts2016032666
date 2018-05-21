Ext.define('VX.view.question.fill.Form', {
	extend: 'VX.view.question.EditForm',
	requires: [
		'VX.view.question.fill.ItemEdit',
		'VX.view.question.fill.ItemColumn'
	],
	iconCls: 'question16',
	title: 'Câu hỏi điền chỗ trống',
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
					xtype: 'button',
					iconCls: 'refresh16',
					text: 'Cập nhật các vị trí cần điền',
					handler: function() {
						this.up('form').changeDescription();
					}
				},{
					fieldLabel: 'Tên - Nội dung cần điền  - Chú thích',
					xtype: 'question-fill-column'
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
					boxLabel: 'Trộn ngẫu nhiên thứ tự các từ',
					xtype: 'question-rand'
				}, {
					xtype: 'question-tags'
				}]
			}]//items Cau hoi+Tham so
		}],//items BaseForm
		loadQuestion: function(q){
			var me=this,frm=me.getForm(),f,i;
			
			q._needPreview = 0;
			me.question = q;
			f = frm.findField('question_desc');
			f.setValue(q.description);
			for(i in q.info){
				f = frm.findField('info_'+i);
				f.setValue(q.info[i]);
			}
			me.changeDescription();
			q._change = 0;
			q._preview = -1;
			q._needPreview = 1;
		},//loadQuestion
		changeDescription: function(){
			var me=this,q=me.question,i,
				col = me.down('question-fill-column');
			col.removeAll();
			q.syncItem();
			for (i=0;i<q.item.length;i++)
				col.insertItem(i,q.item[i]);
				
			q._map={};
			VX.createMap(q._map,q.item,'id');
			q._change++;
		}
	}],//BaseForm
	newRecord: function(){
		var me = this, frm = me.down('form'), q,
			bloom = frm.getForm().findField('bloom_level_id');
		q = frm.ctrl.qFill.create();
		frm.loadQuestion(q);
		bloom.setValue(null);
		me.previewWin.setQuestion(q);
		me.show();
	}
});
