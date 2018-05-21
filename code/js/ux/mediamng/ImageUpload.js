Ext.define('Ext.ux.mediamng.ImageUpload',{
	extend: 'Ext.container.Container',
	alias: 'widget.imageupload',
	//target:string là ID của input sẽ nhận được đường dẫn của hình
	target: null,
	//onsuccess:function là hàm sẽ nhận được thông tin của hình
	onsuccess: null,
	//demo:bool(true) là có hiển thị hình minh họa sau khi upload không
	demo: true,
	//Hình gửi lên máy chủ sẽ bị resize còn (limitwidth,limitheight)
	//limitwidth: 210,
	//limitheight: 400,
	//Hình hiển thị trên client resize còn (iwidth,iheight)
	iwidth: 300, 
	iheight: 130,
	//Hình mặc định khi chưa có upload hình
	defaultImage: 'rsc/noimage.png',
	layout: 'hbox',
	items:[{
		margin: '0 10 0 0',
		xtype: 'filefield',
		buttonOnly: true,
		buttonText: 'Chọn hình...',
		buttonConfig: {
			iconCls: 'image-upload'
		},
		listeners: {
			change: function(me) {
				var form = me.up('form').getForm(),
					p = me.up();
				form.iucontainer = p;
				form.submit({
					url: 'php/ajax/img_upload.php',
					params:{
						name: me.name,
						limitwidth: p.limitwidth,
						limitheight: p.limitheight
					},
					success: function(form, action) {
						var iuc = form.iucontainer,
							ic = iuc.down('image'),
							im = ic.el.down('img'),
							o = action.result.info,
							ns = VX.resize(o.width,o.height,iuc.iwidth,iuc.iheight),
							target = form.findField(iuc.target);
						ic.setSrc(o.url);
						im.setSize(ns);
						if (target)
							target.setValue(o.path);
						if (iuc.onsuccess)
							iuc.onsuccess(o);
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
					waitMsg: 'Đang gửi hình lên máy chủ...'
				});
			}
		}
	},{
		xtype: 'image',
		autoEl: 'div'
	}],
	initComponent: function(){
		var me = this;
		me.callParent(arguments);
		var	file = me.down('filefield'),
			img  = me.down('image');
		if (me.fieldLabel) file.setFieldLabel(me.fieldLabel);
		img.setSrc(me.defaultImage);
		img.setHeight(me.iheight);
		img.setVisible(me.demo);
	},
	setPreview: function(src){
		var	img  = this.down('image');
		img.setSrc(src?src:'rsc/noimage.png');
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
			var me=this, frm=me.up('form').getForm(),f;
			if (me.target){
				f = frm.findField(me.target);
				f.imageupload = me;
				f.markInvalid = function(msg){
					this.imageupload.markInvalid(msg);
				};
				f.clearInvalid = function(msg){
					this.imageupload.clearInvalid(msg);
				};
			}
		}
	}
});