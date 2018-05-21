//ID: 638318686e480bddd32b3c33825cd465
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Test', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'test_id',            type: 'int', title: 'test_id'},
		{name: 'course_id',          type: 'int', title: 'course_id'},
		{name: 'user_id',            type: 'int', title: 'user_id'},
		{name: 'test_code',          type: 'string', title: 'test_code'},
		{name: 'test_header',        type: 'string', title: 'test_header'},
		{name: 'test_footer',        type: 'string', title: 'test_footer'},
		{name: 'test_desc',          type: 'string', title: 'test_desc'},
		{name: 'test_creation_time', type: 'datetime', title: 'test_creation_time'},
		{name: 'test_start_time',    type: 'datetime', title: 'test_start_time'},
		{name: 'test_end_time',      type: 'datetime', title: 'test_end_time'},
		{name: 'test_duration',      type: 'int', title: 'test_duration'}
	],
	actionName: 'Test',
	validations: [
		{type: 'presence', field: 'test_code', message: 'Chưa nhập thông tin [test_code]'},
		{type: 'length', field: 'test_code', message: 'Thông tin [test_code] dài hơn 10 ký tự', max: 10},
		{type: 'presence', field: 'test_header', message: 'Chưa nhập thông tin [test_header]'},
		{type: 'length', field: 'test_header', message: 'Thông tin [test_header] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'test_footer', message: 'Chưa nhập thông tin [test_footer]'},
		{type: 'length', field: 'test_footer', message: 'Thông tin [test_footer] dài hơn 65535 ký tự', max: 65535},
		{type: 'length', field: 'test_desc', message: 'Thông tin [test_desc] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'test_start_time', message: 'Chưa nhập thông tin [test_start_time]'},
		{type: 'presence', field: 'test_end_time', message: 'Chưa nhập thông tin [test_end_time]'},
		{type: 'presence', field: 'test_duration', message: 'Chưa nhập thông tin [test_duration]'}
	],
	proxy:{
		type: 'direct',
		api: Test,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC
	, isFix: function(){
		return this.get('test_review_code')==3;
	}
//ZoneC>
});