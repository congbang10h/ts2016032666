Ext.define('VX.modex.CourseContentTree', {
	requires: [
		'VX.model.Course_content'
	],
	extend: 'Ext.data.TreeModel',
	fields: [
		{name: 'text', type: 'string'},
		//Add from Course_content
		{name: 'course_content_id',         type: 'int', title: 'course_content_id'},
		{name: 'course_id',                 type: 'int', title: 'course_id'},
		{name: 'course_parentcontent_id',   type: 'int', title: 'course_parentcontent_id'},
		{name: 'course_content_code',       type: 'string', title: 'course_content_code'},
		{name: 'course_content_name',       type: 'string', title: 'course_content_name'},
		{name: 'course_content_desc',       type: 'string', title: 'course_content_desc'},
		{name: 'course_content_percentage', type: 'int', title: 'course_content_percentage'},
		{name: 'course_content_order',      type: 'int', title: 'course_content_order'}
	],
	actionName: 'CourseContentTree',
	proxy:{
		type: 'direct',
		api: CourseContentTree,
		reader:{
			type: 'json',
			root: 'children'
		}
	},
	toHTML: function(){
		var r=this;
		return '#'+r.get('course_content_id')+': '
			+ '<b>'+ r.get('course_content_name')+'</b><br/>'
			+ r.get('course_content_desc');
	},
	getKey: function(){
		return this.data.course_content_id;
	}
});