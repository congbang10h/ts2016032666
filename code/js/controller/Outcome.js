Ext.define('VX.controller.Outcome', {
	extend: 'Ext.app.Controller',
	saveCO: function(frm){
		try{
			Ext.ux.showMask();
			var me = this,
				rec = frm.getRecord(),s=VX.getS('Course_outcome');
			me.frmCO = frm;
			frm.updateRecord();
			if (!rec.get('co_id')){
				s.add(rec);
			}
			s.sync({
				callback: me.saveCORes,
				scope: me
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	saveCORes: function(batch){
		try{
			var me=this,frm=me.frmCO,res=batch.operations[0].response.result;
			if (!res.success)
				throw res.error;
			frm.up('window').close();
			Ext.ux.hideMask();
			if (VX.config.successMessage)
				Ext.ux.info('Lưu thành công!');
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	saveSO: function(frm){
		try{
			Ext.ux.showMask();
			var me = this,
				rec = frm.getRecord(),s=VX.getS('Student_outcome');
			me.frmSO = frm;
			frm.updateRecord();
			if (!rec.get('so_id')){
				s.add(rec);
			}
			s.sync({
				callback: me.saveSORes,
				scope: me
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	saveSORes: function(){
		try{
			var me=this,frm=me.frmSO,res=batch.operations[0].response.result;
			if (!res.success)
				throw res.error;
			frm.up('window').close();
			Ext.ux.hideMask();
			if (VX.config.successMessage)
				Ext.ux.info('Lưu thành công!');
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	savePEO: function(frm){
		try{
			Ext.ux.showMask();
			var me = this,
				rec = frm.getRecord(),s=VX.getS('Peo');
			me.frmPEO = frm;
			frm.updateRecord();
			if (!rec.get('peo_id')){
				s.add(rec);
			}
			s.sync({
				callback: me.savePEORes,
				scope: me
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	savePEORes: function(){
		try{
			var me=this,frm=me.frmPEO,res=batch.operations[0].response.result;
			if (!res.success)
				throw res.error;
			frm.up('window').close();
			Ext.ux.hideMask();
			if (VX.config.successMessage)
				Ext.ux.info('Lưu thành công!');
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	saveCOI: function(frm){
		try{
			Ext.ux.showMask();
			var me = this,
				rec = frm.getRecord(),s=VX.getS('Course_outcome_item');
			me.frmCOI = frm;
			frm.updateRecord();
			if (!rec.get('coi_id')){
				s.add(rec);
			}
			s.sync({
				callback: me.saveCOIRes,
				scope: me
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	saveCOIRes: function(batch){
		Ext.ux.hideMask();
		try{
			var me=this,frm=me.frmCOI, res=batch.operations[0];
			if (res.success){
				frm.up('window').close();
				if (VX.config.successMessage)
					Ext.ux.info('Lưu thành công!');
			}else{
				Ext.ux.error(res.error);
			}
		}catch(e){
			Ext.ux.error(e);
		}
	},
	saveSOI: function(frm){
		try{
			Ext.ux.showMask();
			var me = this,
				rec = frm.getRecord(),s=VX.getS('Student_outcome_item');
			me.frmSOI = frm;
			frm.updateRecord();
			if (!rec.get('soi_id')){
				s.add(rec);
			}
			s.sync({
				callback: me.saveSOIRes,
				scope: me
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	saveSOIRes: function(batch){
		Ext.ux.hideMask();
		try{
			var me=this,frm=me.frmSOI, res=batch.operations[0];
			if (res.success){
				frm.up('window').close();
				if (VX.config.successMessage)
					Ext.ux.info('Lưu thành công!');
			}else{
				Ext.ux.error(res.error);
			}
		}catch(e){
			Ext.ux.error(e);
		}
	},
	savePEOI: function(frm){
		try{
			Ext.ux.showMask();
			var me = this,
				rec = frm.getRecord(),s=VX.getS('Peo_item');
			me.frmPEOI = frm;
			frm.updateRecord();
			if (!rec.get('peoi_id')){
				s.add(rec);
			}
			s.sync({
				callback: me.savePEOIRes,
				scope: me
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	savePEOIRes: function(batch){
		Ext.ux.hideMask();
		try{
			var me=this,frm=me.frmPEOI, res=batch.operations[0];
			if (res.success){
				frm.up('window').close();
				if (VX.config.successMessage)
					Ext.ux.info('Lưu thành công!');
			}else{
				Ext.ux.error(res.error);
			}
		}catch(e){
			Ext.ux.error(e);
		}
	},
	saveCCOItemMap: function(frm){
		try{
			var s=VX.getSE('CCOItemMap'),p= s.getProxy(),
				cc_id=s.filters.get('coursecontent').value;
			frm.updateRecord();
			p.setExtraParam('cc_id',cc_id);
			s.sync();
		}catch(e){
			Ext.ux.error(e);
		}
	},
	mappingCOI2CC: function(coi_id,cc_id, el){
		try{
			el = Ext.get(el);
			if (el.hasCls('fa-check-square-o')) {
				el.removeCls('fa-check-square-o');
				el.addCls('fa-square-o');
			}else {
				el.addCls('fa-check-square-o');
				el.removeCls('fa-square-o');
			}
			Ext.ux.rpc({
				action: 'CCOItemMap',
				method: 'mapping_coi_cc',
				params: {cc_id:cc_id,coi_id:coi_id}
			});
		}catch(e){
			Ext.ux.error(e);
		}
	},
	mappingCOI2SOI: function(coi_id,soi_id, bloom){
		try{
			Ext.ux.rpc({
				action: 'Coi_soi_map',
				method: 'mapping',
				params: {coi_id:coi_id,soi_id:soi_id,bloom:bloom}
			});
		}catch(e){
			Ext.ux.error(e);
		}
	},
	mappingSOI2PEOI: function(soi_id,peoi_id){
		try{
			Ext.ux.rpc({
				action: 'Peoi_soi_map',
				method: 'mapping',
				params: {soi_id:soi_id,peoi_id:peoi_id}
			});
			var store = this.storeSOI2PEOI,idx,rec, i,reg=new RegExp('PEOI_'+peoi_id+'_.*');
			idx = store.find('soi_id',soi_id);
			if (idx>=0){
				rec = store.getAt(idx);
				for(i in rec.data){
					if (rec.data.hasOwnProperty(i) && reg.test(i)){
						rec.set(i,rec.get(i)?0:1);
						break;
					}
				}
			}
		}catch(e){
			Ext.ux.error(e);
		}
	},
	mappingPEOI2UMI: function(peoi_id,umi_id, el){
		try{
			el = Ext.get(el);
			if (el.hasCls('fa-check-square-o')) {
				el.removeCls('fa-check-square-o');
				el.addCls('fa-square-o');
			}else {
				el.addCls('fa-check-square-o');
				el.removeCls('fa-square-o');
			}
			Ext.ux.rpc({
				action: 'Umi_peoi_map',
				method: 'mapping',
				params: {peoi_id:peoi_id,umi_id:umi_id}
			});
		}catch(e){
			Ext.ux.error(e);
		}
	},
	mappingCOI2Q: function(coi_id,q_id, el){
		try{
			el = Ext.get(el);
			if (el.hasCls('fa-check-square-o')) {
				el.removeCls('fa-check-square-o');
				el.addCls('fa-square-o');
			}else {
				el.addCls('fa-check-square-o');
				el.removeCls('fa-square-o');
			}
			Ext.ux.rpc({
				action: 'Qco_map',
				method: 'mapping_coi_q',
				params: {question_id:q_id,coi_id:coi_id}
			});
		}catch(e){
			Ext.ux.error(e);
		}
	}

});