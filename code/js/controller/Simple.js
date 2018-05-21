Ext.define('VX.controller.Simple',{
	extend: 'Ext.app.Controller',
	save: function (frm,storeName,keyField) {
		try {
			Ext.ux.showMask();
			var me = this,
				rec = frm.getRecord(),
				store = VX.getS(storeName),
				isNew = !rec.get(keyField);
			me.dlg = me.dlg || {};
			me.dlg[storeName] = frm.up('window');
			frm.updateRecord();
			if (isNew)
				store.add(rec);
			store.sync({
				category: storeName,
				callback: me.onSaveResponsed,
				scope: me
			});
			if (isNew)
				store.load();
		} catch (e) {
			Ext.ux.hideMask();
			Ext.ux.error(e, 'ctrl.Category::save');
		}
	},
	onSaveResponsed: function (batch, opts) {
		try {
			var me = opts.scope, res = batch.operations[0].response.result;
			if (!res.success)
				throw res.error || res.message;
			me.dlg[opts.category].close();
			Ext.ux.hideMask();
			if (VX.config.successMessage)
				Ext.ux.info('Lưu thành công!');
		} catch (e) {
			Ext.ux.hideMask();
			Ext.ux.error(e, 'ctrl.Category:onSaveResponsed');
		}
	},
	mission:{
		save: function (frm) {
			try {
				Ext.ux.showMask();
				var me = this,
					rec = frm.getRecord(), data,
					isNew = !rec.get('um_id'),
					store = VX.getS('Univ_mission');
				me.dlg = frm.up('window');
				frm.updateRecord();
				data = rec.getData();
				data._hasChild = {
					Univ_mission_item: rec.raw.hasMany.Univ_mission_item
				};
				Ext.ux.rpc({
					action: 'Univ_mission',
					method: isNew ? 'create':'update',
					params: data,
					scope: me,
					callback: me.onSaveResponsed
				});
				store.load();
			} catch (e) {
				Ext.ux.hideMask();
				Ext.ux.error(e, 'ctrl.mission::save');
			}
		},
		onSaveResponsed: function (res) {
			try {
				var me = this;
				if (!res.success)
					throw res.error || res.message;
				me.dlg.close();
				Ext.ux.hideMask();
				if (VX.config.successMessage)
					Ext.ux.info('Lưu thành công!');
			} catch (e) {
				Ext.ux.hideMask();
				Ext.ux.error(e, 'ctrl.mission:onSaveResponsed');
			}
		}
	}
});