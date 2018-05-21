//ID: 6ac59aebccb1e30a5049341313fac652
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Faculty', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'faculty_id',      type: 'int', title: 'faculty_id'},
		{name: 'univ_id',         type: 'int', title: 'univ_id'},
		{name: 'faculty_code',    type: 'string', title: 'faculty_code'},
		{name: 'faculty_name_vn', type: 'string', title: 'faculty_name_vn'},
		{name: 'faculty_name_en', type: 'string', title: 'faculty_name_en'}
	],
	actionName: 'Faculty',
	validations: [
		{type: 'presence', field: 'faculty_code', message: 'Chưa nhập thông tin [faculty_code]'},
		{type: 'length', field: 'faculty_code', message: 'Thông tin [faculty_code] dài hơn 5 ký tự', max: 5},
		{type: 'presence', field: 'faculty_name_vn', message: 'Chưa nhập thông tin [faculty_name_vn]'},
		{type: 'length', field: 'faculty_name_vn', message: 'Thông tin [faculty_name_vn] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'faculty_name_en', message: 'Chưa nhập thông tin [faculty_name_en]'},
		{type: 'length', field: 'faculty_name_en', message: 'Thông tin [faculty_name_en] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Faculty,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});