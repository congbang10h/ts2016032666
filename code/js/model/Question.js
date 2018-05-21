//ID: 8e09522173d4ef9bd712d0d88ce2c7a5
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'question_id',       type: 'int', title: 'question_id'},
		{name: 'question_type_id',  type: 'int', title: 'question_type_id'},
		{name: 'user_id',           type: 'int', title: 'user_id'},
		{name: 'bloom_level_id',    type: 'int', title: 'bloom_level_id'},
		{name: 'question_desc',     type: 'string', title: 'question_desc'},
		{name: 'question_in_test',  type: 'int', title: 'question_in_test'},
		{name: 'course_id',         type: 'int', title: 'course_id'},
		{name: 'course_content_id', type: 'int', title: 'course_content_id'},
		{name: 'qgroup_id',         type: 'int', title: 'qgroup_id'},
		{name: 'difficulty',        type: 'float', title: 'difficulty'},
		{name: 'discrimination',    type: 'float', title: 'discrimination'}
	],
	actionName: 'Question',
	validations: [
		{type: 'presence', field: 'question_type_id', message: 'Chưa nhập thông tin [question_type_id]'},
		{type: 'presence', field: 'bloom_level_id', message: 'Chưa nhập thông tin [bloom_level_id]'},
		{type: 'length', field: 'question_desc', message: 'Thông tin [question_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Question,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC
	,toHTML: function(){
		var r=this;
		return '(<i>Câu hỏi #'+r.get('question_id')+' - '
			+ r.get('user_first_name')+' '+r.get('user_last_name')+'</i>)<br/>'
			+ r.get('question_desc');
	}
	,getKey: function(){
		return this.data.question_id;
	}
//ZoneC>
});