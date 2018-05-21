Ext.define('Ext.ux.mediamng.FileUpload',{
	extend: 'Ext.container.Container',
	alias: 'widget.fileupload',
	layout: 'hbox',
	items:[{
		margin: '0 10 0 0',
		xtype: 'filefield',
		buttonOnly: true,
		buttonText: 'Chọn file...',
		buttonConfig: {
			iconCls: 'data16'
		},
		listeners:{
			change:function(me) {
				var form = me.up('form').getForm();
				form.iucontainer = me.up();
				form.submit({
					url: 'php/ajax/file_upload.php',
					params:{
						name: me.name
					},
					success: function(frm, action) {
						var o = action.result.info,
							p = frm.findField('path'),
							s = frm.findField('size'),
							n = frm.findField('name');
						n.setValue(o.name);
						s.setValue(VX.formatSize(o.size));
						p.setValue(o.path);
					},
					failure: function(form, action) {
						switch (action.failureType) {
							case Ext.form.action.Action.CLIENT_INVALID:
								Ext.ux.error('Biểu mẫu có vài thông tin không chính xác');
								break;
							case Ext.form.action.Action.CONNECT_FAILURE:
								Ext.ux.error('Không thể kết nối với máy chủ');
								break;
							case Ext.form.action.Action.SERVER_INVALID:
								Ext.ux.error(action.result.msg);
						}
					},
					waitMsg: 'Đang gửi dữ liệu lên máy chủ...'
				});
			}
		}
	}],
	initComponent: function(){
		var me = this;
		me.callParent(arguments);
		var	file = me.down('filefield');
		if (me.fieldLabel) file.setFieldLabel(me.fieldLabel);
	},
	markInvalid: function(msg){
		this.addCls('x-form-invalid-box');
		var me = this.down('filefield'),
        	oldMsg = me.getActiveError(),
            active;
        me.setActiveErrors(Ext.Array.from(msg));
        active = me.getActiveError();
        if (oldMsg !== active) {
            me.setError(active);
        }
	},
	clearInvalid: function(){
		this.removeCls('x-form-invalid-box');
		var me = this.down('filefield');
		me.unsetActiveError();
		me.setError('');
	},
	listeners:{
		afterrender:function(){
			var frm=this.up('form').getForm(),
				n = frm.findField('name');
			n.fileupload = this;
			n.markInvalid = function(msg){
				this.fileupload.markInvalid(msg);
			};
			n.clearInvalid = function(msg){
				this.fileupload.clearInvalid(msg);
			};
		}
	}
});