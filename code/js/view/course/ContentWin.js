Ext.define('VX.view.course.ContentWin', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'Ext.ux.form.FlexText',
		'VX.view.course.ContentTree',
		'VX.view.course.CCOItemMap',
		'VX.view.question.List'
	],
	title: 'Nội dung môn học',
	iconCls: 'course16',
	modal: false,
	width: '100%',
	height: '100%',
	course: 0,
	loadCourse: function(rec){
		var me=this, tree=me.down('contenttree'),s=VX.getSE('CCOItemMap'),
			course_id = rec.get('course_id'),qlist=me.down('question-list');
		me.course = rec;
		me.setTitle('Nội dung môn học ['+rec.get('course_name_vn')+']');
		tree.setCourseId(course_id);
		s.removeFilter('course');
		s.addFilter({
			id: 'course',
			property: 'course_id',
			value: course_id
		});
		s.removeFilter('coursecontent');
		s.addFilter({
			id: 'coursecontent',
			property: 'course_id',
			value: 0
		});
		qlist.setCourse(course_id);
	},
	layout: 'border',
	items: [{
		region: 'west',
		width: '30%',
		xtype: 'contenttree',
		title: 'Cây nội dung',
		split: true,
		collapsible: true
	},{
		region: 'center',
		xtype: 'tabpanel',
		items:[{
			title: 'Câu hỏi',
			xtype: 'question-list'
		},{
			title: 'Chuẩn đầu ra',
			xtype: 'cco-item-map'
		}]
	}],
	hide: function(){
		var me=this,t=me.down('contenttree');
		if (t.gForm)
			t.gForm.hide();
		me.callParent();
	},
	changeCourseContent: function(cc_id){
		var me=this,cclist = me.down('cco-item-map'),qlist=me.down('question-list');
		cclist.changeCourseContent(cc_id);
		qlist.setCourseContent(cc_id);
	}
});
