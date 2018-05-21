Ext.define('VX.controller.QGroup',{
	extend: 'Ext.app.Controller',
	save: function(frm){
		try{
			Ext.ux.showMask();
			var me = this,
				rec = frm.getRecord(),
				newR = rec.get('question_group_id')?0:1;
			me.dlgQGroup = frm.up('window');
			frm.updateRecord();
			Ext.ux.rpc({
				action: 'Question_group',
				method: newR ? 'create':'update',
				params: rec.getData(),
				scope: me,
				callback: me.onSaveResponsed
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.QGroup::save');
		}
	},
	onSaveResponsed: function(res){
		var me=this;
		try{
			if (!res.success)
				throw res.error || res.message;
			me.dlgQGroup.close();
			Ext.ux.hideMask();
			VX.getS('Question_group').load();
			if (VX.config.successMessage)
				Ext.ux.info('Lưu thành công!');
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.QGroup::onSaveResponsed');
		}
	}
});