//ID: 70f064268957382b0759fb905a7bc9db
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Topic_access_mode', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'topic_access_mode_id',              type: 'int', title: 'topic_access_mode_id'},
		{name: 'topic_id',                          type: 'int', title: 'topic_id'},
		{name: 'accessor_id',                       type: 'int', title: 'accessor_id'},
		{name: 'role_id',                           type: 'int', title: 'role_id'},
		{name: 'previlege_id',                      type: 'int', title: 'previlege_id'},
		{name: 'grantor_id',                        type: 'int', title: 'grantor_id'},
		{name: 'topic_access_mode_granted_date',    type: 'date', title: 'topic_access_mode_granted_date'},
		{name: 'topic_access_mode_valid_startdate', type: 'date', title: 'topic_access_mode_valid_startdate'},
		{name: 'topic_access_mode_valid_enddate',   type: 'date', title: 'topic_access_mode_valid_enddate'},
		{name: 'topic_access_mode_valid_starttime', type: 'datetime', title: 'topic_access_mode_valid_starttime'},
		{name: 'topic_access_mode_valid_endtime',   type: 'datetime', title: 'topic_access_mode_valid_endtime'},
		{name: 'topic_access_mode_is_disabled',     type: 'int', title: 'topic_access_mode_is_disabled'},
		{name: 'topic_access_mode_desc',            type: 'string', title: 'topic_access_mode_desc'}
	],
	actionName: 'Topic_access_mode',
	validations: [
		{type: 'presence', field: 'topic_access_mode_granted_date', message: 'Chưa nhập thông tin [topic_access_mode_granted_date]'},
		{type: 'presence', field: 'topic_access_mode_valid_startdate', message: 'Chưa nhập thông tin [topic_access_mode_valid_startdate]'},
		{type: 'presence', field: 'topic_access_mode_valid_starttime', message: 'Chưa nhập thông tin [topic_access_mode_valid_starttime]'},
		{type: 'presence', field: 'topic_access_mode_is_disabled', message: 'Chưa nhập thông tin [topic_access_mode_is_disabled]'},
		{type: 'length', field: 'topic_access_mode_desc', message: 'Thông tin [topic_access_mode_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Topic_access_mode,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});