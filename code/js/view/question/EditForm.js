Ext.define('VX.view.question.BloomLevel', {
	extend: 'Ext.form.ComboBox',
	fieldLabel: 'Cấp độ Bloom',
	alias: 'widget.question-bloom',
	name: 'bloom_level_id',
	width: '100%',
	displayField: 'bloom_level_desc',
	emptyText: '[Cấp độ Bloom]',
	valueField: 'bloom_level_id',
	editable: false,
	queryMode: 'local',
	store: VX.getS('Bloom_level'),
	initComponent: function(){
		var me=this;
		me.callParent(arguments);
		me.store.load();
	},
	onChange: function(){
		var me=this,q = me.up('form').question;
		q.bloom_level_id = me.getValue();
	}
});
Ext.define('VX.view.question.Description', {
	extend: 'Ext.ux.form.FlexText',
	fieldLabel: 'Mô tả',
	alias: 'widget.question-desc',
	name: 'question_desc',
	width: '100%',
	height: 150,
	onChange: function(){
		var me=this,q = me.up('form').question;
		q.description = me.getValue();
		q._change++;
	}
});
Ext.define('VX.view.question.InfoName',{
	extend: 'Ext.form.TextField',
	alias: 'widget.question-name',
	fieldLabel: 'Tên câu hỏi',
	name: 'info_name',
	onChange: function(){
		var me=this,q = me.up('form').question;
		q.info.name = me.getValue();
		q._change++;
	}
});
Ext.define('VX.view.question.InfoRand',{
	extend: 'Ext.form.Checkbox',
	alias: 'widget.question-rand',
	inputValue: 1,
	uncheckedValue: 0,
	name: 'info_random',
	onChange: function(){
		var me=this,q = me.up('form').question;
		q.info.random = me.getValue()?1:0;
		q._change++;
	}
});
Ext.define('VX.view.question.InfoTags', {
	extend: 'Ext.form.TextArea',
	//Xem vi du DataView de ung dung soan thao Tags
	//http://js.com/examples/view/data-view.js
	fieldLabel: 'Nhãn',
	alias: 'widget.question-tags',
	name: 'info_tags',
	width: '100%',
	onChange: function(){
		var me=this,q = me.up('form').question;
		q.info.tags = me.getValue();
		q._change++;
	}
});
Ext.define('VX.view.question.EditForm', {
	extend: 'Ext.ux.WinForm',
	modal: false,
	setPreview: function(){
		var me = this, frm = me.down('form'), q = frm.question;
		if (VX.config.questionEditLivePreview){
			q._change++;
			me.previewWin.show();
		}else{
			me.previewWin.hide();
		}
		me.arrangeWindow();
	},
	previewWin: Ext.create('VX.view.question.PreviewForm'),
	hide: function(){
		var me = this;
		me.callParent();
		
		me.previewWin.stop();
		me.previewWin.hide();
	},
	arrangeWindow: function(){
		var me = this,
			view = Ext.getBody().getViewSize(),frm = me.down('form'),
			dw = 12,
			fw = (view.width/2)-dw;
		frm.setWidth(fw);
		if (VX.config.questionEditLivePreview){
			me.setXY([10,10]);
		
			me.down('checkbox[cls=questionEditLivePreview]').setValue(1);
			me.previewWin.show();
			me.previewWin.start();
		}else{
			me.setXY([fw/2,10]);
		}
	},
	show: function(){
		var me = this;
		me.callParent();
		me.arrangeWindow();
	},
	editQuestion: function(rec){
		var me=this,ctrl=VX.getC('Question'), q, frm = me.down('form'),
			bloom = frm.getForm().findField('bloom_level_id');
		q = ctrl.fromRecord(rec);
		frm.loadQuestion(q);
		bloom.setValue(q.bloom_level_id);
		me.previewWin.setQuestion(q);
		me.show();
	}
});
