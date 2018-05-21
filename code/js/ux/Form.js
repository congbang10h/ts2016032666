Ext.define('Ext.ux.Form', {
	extend: 'Ext.form.Panel',
	alias: 'widget.eform',
	btt: VX.BT_CLOSE,
	bttSubmit: {
		text: 'Lưu lại',
		iconCls: 'save16'
	},
	buttons: [],
	listeners: {
		afterRender: function(/*thisForm, options*/) {
			Ext.each(this.items.items, function(it) {
				if (!/(^textarea)|(^flextext)/.test(it.id)) {
					it.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
						enter: function(ev) {
							if (!ev.ctrlKey)
								this.up().submit();
						},
						scope: this
					});
				}
			});
		}
	},
	isValid: function() {
		var me = this, frm = me.getForm(),
			r = me.getRecord(),
			rn = r? Ext.create(r.modelName):0, errors;
		if (!r) return 1;
		frm.activeTabOnError = 0;
		Ext.suspendLayouts();
		rn.set(frm.getValues());
		rn.hasMany = r.hasMany;
		errors = rn.validate();
		if (errors.length)
			frm.markInvalid(errors);
		else
			frm.clearInvalid();
		Ext.resumeLayouts(true);
		return errors.length < 1;
	},
	border: false,
	bodyPadding: 10,
	defaultType: 'textfield',
	fieldDefaults: {
		labelStyle: 'font-weight:bold',
		blankText: 'Bạn chưa nhập thông tin này'
	},
	addButtons: function(){
		var me=this, b = me.btt,
			dock = me.getDockedItems('toolbar[dock="bottom"]')[0],i;
		for(i in me.buttons) dock.add(me.buttons[i]);
		
		if (b & VX.BT_BACK)	dock.add({
			text: 'Trở về',
			iconCls: 'back16',
			handler: function() {
				var w = this.up('form').up();
				if (w)
					w.close();
			}
		});
		if (b & VX.BT_CLOSE) dock.add({
			text: 'Đóng cửa sổ',
			iconCls: 'cancel16',
			handler: function() {
				var w = this.up('form').up();
				if (w)
					w.close();
			}
		});
		if (b & VX.BT_SUBMIT) dock.add({
			itemId: 'submit',
			text: me.bttSubmit.text,
			iconCls: me.bttSubmit.iconCls,
			handler: function() {
				this.up('form').submit();
			}
		});
	},
	initComponent: function(){
		this.callParent(arguments);
		this.addButtons();
	},
	submit: function() {
	},
	setReadOnly: function(readOnly){
		var me=this,frm=me.getForm(), ls=frm.getFields(),
			dock = me.getDockedItems('toolbar[dock="bottom"]')[0];
		ls.each(function(it){
			it.setReadOnly(readOnly);
		});
		dock.items.each(function(it){
			it.setDisabled(readOnly);
		})
	}
});