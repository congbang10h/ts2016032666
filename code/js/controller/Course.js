Ext.define('VX.controller.Course',{
	extend: 'Ext.app.Controller',
	saveCourse: function(frm){
		try{
			Ext.ux.showMask();
			var me = this,
				rec = frm.getRecord(),
				update = rec.get('course_id');
			me.dlgCourse = frm.up('window');
			frm.updateRecord();
			Ext.ux.rpc({
				action: 'Course',
				method: update ? 'update':'create',
				params: rec.getData(),
				scope: me,
				callback: me.saveCourseRes
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	saveCourseRes: function(res){
		var me=this;
		try{
			if (!res.success)
				throw res.error || res.message;
			me.dlgCourse.close();
			Ext.ux.hideMask();
			VX.getS('Course').load();
			if (VX.config.successMessage)
				Ext.ux.info('Lưu thành công!');
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	saveContent: function(frm){
		try{
			//Ext.ux.showMask();
			var me = this,
				rec = frm.getRecord(),s=VX.getSE('CourseContentTree');
			me.frmContent = frm;
			frm.updateRecord();
			if (!rec.get('course_content_id')){
				frm.pnode.set('leaf',false);
				frm.pnode.appendChild(rec);
				frm.pnode.expandChildren();
			}
			s.sync({
				callback: me.saveContentRes,
				scope: me
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	saveContentRes: function(){
		try{
			var me=this,frm=me.frmContent;
			frm.up('window').close();
			Ext.ux.hideMask();
			if (VX.config.successMessage)
				Ext.ux.info('Lưu thành công!');
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	mappingCC2Q: function(cc_id,q_id, el){
		try{
			if (!cc_id) return;
			el = Ext.get(el);
			if (el.hasCls('fa-check-square-o')) {
				el.removeCls('fa-check-square-o');
				el.addCls('fa-square-o');
			}else {
				el.addCls('fa-check-square-o');
				el.removeCls('fa-square-o');
			}
			Ext.ux.rpc({
				action: 'Question_content_map',
				method: 'mapping_cc_q',
				params: {course_content_id:cc_id,question_id:q_id}
			});
		}catch(e){
			Ext.ux.error(e);
		}
	},
	saveCourseInEduPro: function(frm){
		try{
			Ext.ux.showMask();
			var me = this,
				rec = frm.getRecord(),s=VX.getSE('CourseInEduPro');
			me.frmCIEP = frm;
			frm.updateRecord();
			rec.set('edu_program_id',frm.edu_program_id);
			//rec.dirty = true;
			s.sync({
				callback: me.saveCourseInEduProRes,
				scope: me
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e);
		}
	},
	saveCourseInEduProRes: function(batch){
		Ext.ux.hideMask();
		try{
			var me=this,frm=me.frmCIEP, res=batch.operations[0];
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
	}
});