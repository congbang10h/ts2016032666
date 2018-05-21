Ext.define('VX.view.question.PreviewForm', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'Ext.ux.Form',
		'VX.view.question.match.ItemPanel',
		'VX.view.question.order.ItemColumn',
		'VX.view.question.fill.ItemColumn',
		'VX.view.question.choice.ItemColumn'
	],
	title: 'Kiểm tra',
	modal: false,
	livePreview: 1,
	items: [{
		xtype: 'eform',
		minWidth: 500,
		minHeight: 500,
		ctrl: VX.getC('Question'),
		btt: 0,
		buttons:[{
			/*text: 'Tạm thời bỏ qua',
			iconCls: 'skip16',
			handler: function() {
				Ext.ux.info('Chức năng này chưa được cài đặt');
			}
		},{*/
			text: 'Làm lại',
			iconCls: 'reset16',
			handler: function() {
				var me = this.up('form').up(), q = me.orgQuestion;
				if (me.livePreview)
					q._preview = q._change-1;
				else
					me.makeForm();
			}
		},{
			text: 'Xác nhận',
			iconCls: 'verify16',
			handler: function() {
				var frm = this.up('form'), q = frm.question;
				Ext.ux.info(q.verify(q)?'Đúng rồi':'Chưa chính xác');
			}
		}],
		items: []
	}],
	show: function(cfg){
		var me=this;
		me.callParent();
		if (cfg!='active'){
			var view = Ext.getBody().getViewSize(),frm = me.down('form'),
				dw = 12,
				fw = (view.width/2)-dw;
			frm.setWidth(fw-40);
			me.setXY([fw+30,10]);
			frm.removeAll();
		}
	},
	viewTimer: 0,
	setQuestion: function (q){
		var me=this;
		me.orgQuestion = q;
		if (!me.livePreview){
			if (q.syncItem)
				q.syncItem();
			me.makeForm();
		}
	},
	stop: function(){
		var me=this;
		if (me.viewTimer){
			clearInterval(me.viewTimer);
			me.viewTimer=0;
		}
	},
	start: function(){
		var me=this;
		if (!me.livePreview)
			return;
		me.stop();
		me.viewTimer = setInterval(function(){
			me.preview();
		},1000);
	},
	_prepare: 0,
	makeForm: function(){
		var me=this,frm=me.down('form'),q=me.orgQuestion;
		frm.removeAll();
		
		frm.question = q.clone().rand();
		frm.question.render(0,frm);
	},
	preview: function(){
		var me=this,q=me.orgQuestion;
		if (!VX.config.questionEditLivePreview)
			return;
		if (me._prepare || !q._needPreview || q._preview==q._change)
			return;
		
		me._prepare = 1;
		me.makeForm();
		q._preview = q._change;
		me._prepare = 0;
	}
});
