Ext.define('Ext.ux.form.FlexText', {
    extend: 'Ext.form.field.TextArea',
    alias: 'widget.flextext',
    tinyMCEConfig: tinyMCEPreInit.config,
    mceEnable: true,
    mceInit: function(){
		var me=this;
    	if (!me.mceEnable || me.mcediv) return;
    	
    	var e = me.el.down('textarea').dom,
			d = document.createElement('div');
		me.mcediv = d;
		me.mcesrc = e;
		d.id = me.getId()+'-tinymce';

		if (!me.tinyMCEConfig) {
			me.tinyMCEConfig = {};
        } else {
			var tmp_cfg = me.tinyMCEConfig;
			me.tinyMCEConfig = {};
			Ext.Object.merge(me.tinyMCEConfig, tmp_cfg);
        }
        Ext.Object.merge(me.tinyMCEConfig,{
        	resize: false,
        	inline: 'true',
        	target: d
        });
		
		d.className = e.className;
		d.innerHTML = me.getValue();
		e.parentNode.insertBefore(d,e);
		
		tinymce.init(me.tinyMCEConfig);
    },
    mceResize: function(){
    	if (!this.mceEnable) return;
    	var me = this, d = me.mcediv, e = me.el.down('textarea'),
    		s = e.getSize();
    	if (d && s.height){
	    	d.style.height = s.height+'px';
	    	e.dom.style.display = 'none';
    	}
    },
    markInvalid: function(){
    	var me=this;
    	me.callParent(arguments);
    	if (me.mcediv){
    		me.mcediv.className = me.mcesrc.className;
    	}
    },
    clearInvalid: function(){
    	var me=this;
    	me.callParent(arguments);
    	if (me.mcediv){
    		me.mcediv.className = me.mcesrc.className;
    	}
    },
	setDisabled: function(disabled){
		var me=this;
		me.callParent(arguments);
		me.mceSetDisabled();
	},
	setReadOnly: function(readOnly){
		var me=this;
		me.callParent(arguments);
		me.mceSetDisabled();
	},
	mceSetDisabled: function(){
		try{
			var me = this, e = me.el.down('textarea'),
				disabled = me.readOnly || me.disabled;
			me.mcediv.innerHTML = e.dom.value;
			tinyMCE.get(me.mcediv.id).getBody().setAttribute('contenteditable', !disabled);
		}catch(e){}
	},
    setValue: function(value){
    	this.callParent(arguments);
    	if (this.mcediv)
    		this.mcediv.innerHTML = value;
    },
	mceChange: function(){
    	var me = this,
    		e = me.el.down('textarea');
		e.dom.value = (me.mcediv.innerHTML);
    	me.clearInvalid();
    	me.onChange();
    },
    onFocus: function (selectText, delay) {
		var me = this;
		
		if (me.isDisabled()) { return me; }
		
		if (delay) {
			if (isNaN(delay)) { delay = 10; }
			
			setTimeout(function () {
				me.onFocus.call(me, selectText, false);
			}, delay);
			return me;
		}
		
		if (me.mcediv){
			var ed = tinymce.get(me.mcediv.id);
		
			if (ed && !ed.isHidden()) {
		    	me.callParent(arguments);
			    ed.focus();
			    return me;
			}
		}
	    return me.callParent(arguments);
    },
    initComponent: function(){
    	var me=this;
    	me.callParent(arguments);
		me.on({
			boxready: me.mceInit,
			resize: me.mceResize,
			scope: me
		});
    }
});