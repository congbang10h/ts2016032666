Ext.define('Ext.ux.WinForm', {
	extend: 'Ext.Window',
	modal: true,
	listeners:{
		show: function(){
			var o = this.down('textfield[fieldDefault=true]');
			if (o)
				o.focus();
		}
	}
});