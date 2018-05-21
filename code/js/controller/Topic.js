Ext.define('VX.controller.Topic',{
	extend: 'Ext.app.Controller',
	save: function(frm){
		try{
			Ext.ux.showMask();
			var me = this,
				rec = frm.getRecord(),
				newR = rec.get('topic_id')?0:1;
			me.dlgTopic = frm.up('window');
			frm.updateRecord();
			Ext.ux.rpc({
				action: 'Topic',
				method: newR ? 'create':'update',
				params: rec.getData(),
				scope: me,
				callback: me.onSaveResponsed
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.Topic::save');
		}
	},
	onSaveResponsed: function(res){
		var me=this;
		try{
			if (!res.success)
				throw res.error || res.message;
			me.dlgTopic.close();
			Ext.ux.hideMask();
			VX.getS('Topic').load();
			if (VX.config.successMessage)
				Ext.ux.info('Lưu thành công!');
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.Topic::onSaveResponsed');
		}
	}
});