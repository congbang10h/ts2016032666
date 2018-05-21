Ext.define('VX.controller.Exam',{
	extend: 'Ext.app.Controller',
	prepare: function(dlg,testid){
		try{
			Ext.ux.showMask();
			var me = this;
			me.dlgExam = dlg;
            Ext.ux.rpc({
				action: 'Exam',
				method: 'prepare',
				params: {
					test_id: testid
				},
				scope: me,
				callback: me.onPrepareResponsed
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.Exam::prepare');
		}
	},
	onPrepareResponsed: function(res){
		try{
			Ext.ux.hideMask();
			if (!res.success){
				Ext.ux.info(res.message);
				return;
			}
			this.dlgExam.show();
			this.dlgExam.loadTest(res);
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.Exam::onPrepareResponsed');
		}
	},
	examRand: function(testid){
		try{
			Ext.ux.showMask();
			var me = this;
			Ext.ux.rpc({
				action: 'Exam',
				method: 'examRand',
				params: {
					test_id: testid
				},
				scope: me,
				callback: me.examRandResponsed
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.Exam::examRand');
		}
	},
	examRandResponsed: function(res){
		Ext.ux.hideMask();
		if (!res.success){
			Ext.ux.info(res.message);
		}
	},
	start: function(info){
		try{
			var me = this;
			Ext.ux.rpc({
				action: 'Exam',
				method: 'start',
				params: {
					exam_id: info.exam_id
				},
				scope: me,
				callback: me.onStartResponsed
			});
		}catch(e){
			console.log(e);
		}
	},
	onStartResponsed: function(res){
		try{
			if (!res.success)
				throw res.error || res.message;
		}catch(e){
			console.log(e);
		}
	},
	save: function(q){
		try{
			var me = this;
			Ext.ux.rpc({
				action: 'Exam',
				method: 'save',
				params: {
					exam_id: q.exam_id,
					question_id: q.id,
					solution: q.getSolution()
				},
				scope: me,
				callback: me.onSaveResponsed
			});
		}catch(e){
			console.log(e);
		}
	},
	onSaveResponsed: function(res){
		try{
			if (!res.success)
				throw res.error || res.message;
		}catch(e){
			console.log(e);
		}
	},
	finish: function(info){
		try{
			var me = this;
			Ext.ux.rpc({
				action: 'Exam',
				method: 'finish',
				params: {
					exam_id: info.exam_id
				},
				scope: me,
				callback: me.onFinishResponsed
			});
		}catch(e){
			console.log(e);
		}
	},
	onFinishResponsed: function(res){
		try{
			if (!res.success)
				throw res.error || res.message;
			Ext.ux.info("Điểm của bạn là "+res.mark+"/"+res.total);
		}catch(e){
			console.log(e);
		}
	}
});