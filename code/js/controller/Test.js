Ext.define('VX.controller.Test',{
	extend: 'Ext.app.Controller',
	save: function(frm){
		try{
			Ext.ux.showMask();
			var me = this,
				rec = frm.getRecord(),
				//s = VX.getS('Test'),
				update = rec.get('test_id');
			me.dlgTest = frm.up('window');
            rec.set(frm.getValues());
			Ext.ux.rpc({
				action: 'Test',
				method: update ? 'update':'create',
				params: rec.getData(),
				scope: me,
				callback: me.onSaveResponsed
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.Test::save');
		}
	},
	onSaveResponsed: function(res){
		try{
			if (!res.success)
				throw res.error || res.message;
			this.dlgTest.close();
			Ext.ux.hideMask();
			VX.getS('Test').load();
			if (VX.config.successMessage)
				Ext.ux.info('Lưu thành công!');
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.Test::onSaveResponsed');
		}
	},
	dtRand: function(frm,dlg){
		try{
			Ext.ux.showMask();
			var me = this;
			me.dlgRand = dlg;
			Ext.ux.rpc({
				action: 'Test',
				method: 'dtrand',
				params: frm.getValues(),
				scope: me,
				callback: me.dtRandResponsed
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.Test::dtRand');
		}
	},
	dtRandResponsed: function(res){
		Ext.ux.hideMask();
		if (!res.success){
			Ext.ux.info(res.message);
		}else{
			this.dlgRand.close();
		}
	},
    saveReview: function(frm,win){
        try{
            Ext.ux.showMask();
            var me = this,
                rec = frm.getRecord();
			me.reviewWin = win;
			frm.updateRecord();
			//rec.set(frm.getValues());
			me.isApproved = rec.isApproved();
            Ext.ux.rpc({
                action: 'Test_review',
                method: 'create',
                params: rec.getData(),
                scope: me,
                callback: me.onSaveReviewResponsed
            });
        }catch(e){
            Ext.ux.hideMask();
            Ext.ux.error(e,'VX.controller.Test::saveReview');
        }
    },
    onSaveReviewResponsed: function(res){
        try{
            if (!res.success)
                throw res.error || res.message;
            Ext.ux.hideMask();
			var me=this;
			if (me.isApproved){
				me.reviewWin.close();
				VX.getS('Test').load();
			}else
				VX.getS('Test_review').load();
            if (VX.config.successMessage)
                Ext.ux.info('Lưu thành công!');
        }catch(e){
            Ext.ux.hideMask();
            Ext.ux.error(e,'VX.controller.Test::onSaveReviewResponsed');
        }
    }
});