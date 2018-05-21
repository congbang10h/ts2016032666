Ext.define('VX.view.course.Content', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'Ext.ux.form.FlexText',
		'VX.view.course.ContentTree'
	],
	title: 'Nội dung môn học',
	iconCls: 'course16',
	modal: false,
	width: 450,
	height: '100%',
	course: 0,
	loadCourse: function(rec){
		var me=this, tree=me.down('contenttree');
		me.course = rec;
		me.setTitle('Nội dung môn học ['+rec.get('course_name_vn')+']');
		tree.setCourseId(rec.get('course_id'));
	},
	layout: 'fit',
	items: [{
		//width: '50%',
		//height: '100%',
		//region: 'center',
		xtype: 'contenttree',
		//title: 'Cây nội dung',
		bodyPadding: 10
	}],
	hide: function(){
		var me=this,t=me.down('contenttree');
		if (t.gForm)
			t.gForm.hide();
		me.callParent();
	}
});
