Ext.define('VX.model.CourseContent', {
	extend: 'Ext.data.TreeModel',
	fields: [
		{name: 'text',     type: 'string'},
		{name: 'course_id',type: 'string'},
		{name: 'course_factor',type: 'float'},
		
		{name: 'content_id',     type: 'string', title: 'content_id'},
		{name: 'parent_content_id', type: 'string', title: 'parent_content_id'},
		{name: 'content_name',   type: 'string', title: 'content_name'},
		{name: 'content_desc',   type: 'string', title: 'content_desc'},
		{name: 'content_order',   type: 'int', title: 'content_order'}
	],
	actionName: 'CourseContent',
	proxy:{
		type: 'direct',
		api: CourseContent,
		reader:{
			type: 'json',
			root: 'children'
		}
	}
});