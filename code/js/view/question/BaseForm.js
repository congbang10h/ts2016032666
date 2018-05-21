Ext.define('VX.view.question.BaseForm', {
	extend: 'Ext.ux.Form',
	alias: 'widget.question-base-form',
	minWidth: 500,
	minHeight: 500,
	question: {},
	ctrl: VX.getC('Question'),
	btt: VX.BT_CLOSE | VX.BT_SUBMIT,
	buttons:[{
		xtype: 'checkbox',
		inputValue: 1,
		uncheckedValue: 0,
		cls: 'questionEditLivePreview',
		boxLabel: 'Tự động kiểm tra thử',
		onChange: function(newVal) {
			VX.config.questionEditLivePreview = newVal;
	        this.up('window').setPreview();
	    }
	}],
	fieldDefaults: {
		labelStyle: 'font-weight:bold',
		labelAlign: 'top',
		anchor: '100%'
	},
	submit: function() {
		var me=this,win=me.up('window');
		if (!me.question.bloom_level_id){
			me.getForm().markInvalid({
				bloom_level_id: 'Chưa xác định Bloom level'
			});
		}
		else{
			me.ctrl.saveQuestion(win, me.question);
		}
	}
});