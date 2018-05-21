//ID: 4259bad9d972e4f48fb669e18d8c4285
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question_group', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'question_group_id',   type: 'int', title: 'question_group_id'},
		{name: 'user_id',             type: 'int', title: 'user_id'},
		{name: 'question_group_desc', type: 'string', title: 'question_group_desc'}
	],
	actionName: 'Question_group',
	validations: [
		{type: 'presence', field: 'question_group_desc', message: 'Chưa nhập thông tin [question_group_desc]'},
		{type: 'length', field: 'question_group_desc', message: 'Thông tin [question_group_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Question_group,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC
	,toHTML: function(){
		var r = this;
		return '(<i>Nhóm #'+r.get('question_group_id')+' - '
			+ r.get('user_first_name')+' '+ r.get('user_last_name')+'</i>)<br/>'
			+ r.get('question_group_desc');
	}
	,getKey: function(){
		return this.data.question_group_id;
	}
//ZoneC>
});