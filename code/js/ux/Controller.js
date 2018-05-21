Ext.define('Ext.ux.Controller',{
	extend: 'Ext.app.Controller',
	storelist: [],//first store for save, all store for update
	save: function(dlg,rec,values){
		Ext.ux.showMask();
		try{
			var me = this,
				s = VX.getS(this.storelist[0]);
			me.dlg = dlg;
			rec.set(values);
			s.save(rec.getData(), me, me.onSaveResponsed);
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'Ext.ux.Controller::save');
		}
	},
	onSaveResponsed: function(me,res){
		try{
			if (!res.success)
				throw res.error || res.message;
			var i,s,ls = me.storelist;
			for(i in ls){
				s = VX.getS(ls[i]);
				s.load();
			}
			me.dlg.hide();
		}catch(e){
			Ext.ux.error(e,'Ext.ux.Controller::onSaveResponsed');
		}
		Ext.ux.hideMask();
	}
});