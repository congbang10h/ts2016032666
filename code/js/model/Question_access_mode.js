//ID: 9272d3fe1261304b9da9ffed6f2b4a79
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question_access_mode', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'question_access_mode_id',              type: 'int', title: 'question_access_mode_id'},
		{name: 'question_access_mode_granted_date',    type: 'date', title: 'question_access_mode_granted_date'},
		{name: 'question_id',                          type: 'int', title: 'question_id'},
		{name: 'accessor_id',                          type: 'int', title: 'accessor_id'},
		{name: 'role_id',                              type: 'int', title: 'role_id'},
		{name: 'previlege_id',                         type: 'int', title: 'previlege_id'},
		{name: 'grantor_id',                           type: 'int', title: 'grantor_id'},
		{name: 'question_access_mode_valid_startdate', type: 'date', title: 'question_access_mode_valid_startdate'},
		{name: 'question_access_mode_valid_enddate',   type: 'date', title: 'question_access_mode_valid_enddate'},
		{name: 'question_access_mode_valid_starttime', type: 'datetime', title: 'question_access_mode_valid_starttime'},
		{name: 'question_access_mode_valid_endtime',   type: 'datetime', title: 'question_access_mode_valid_endtime'},
		{name: 'question_access_mode_is_disabled',     type: 'int', title: 'question_access_mode_is_disabled'},
		{name: 'question_access_mode_desc',            type: 'string', title: 'question_access_mode_desc'}
	],
	actionName: 'Question_access_mode',
	validations: [
		{type: 'presence', field: 'grantor_id', message: 'Chưa nhập thông tin [grantor_id]'},
		{type: 'presence', field: 'question_access_mode_valid_startdate', message: 'Chưa nhập thông tin [question_access_mode_valid_startdate]'},
		{type: 'presence', field: 'question_access_mode_valid_starttime', message: 'Chưa nhập thông tin [question_access_mode_valid_starttime]'},
		{type: 'presence', field: 'question_access_mode_is_disabled', message: 'Chưa nhập thông tin [question_access_mode_is_disabled]'},
		{type: 'length', field: 'question_access_mode_desc', message: 'Thông tin [question_access_mode_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Question_access_mode,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});