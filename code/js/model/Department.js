//ID: 3c2a8c0a33ac4b2f34a27bbefff2f054
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Department', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
		{name: 'univ_id',   type: 'int', title: 'univ_id'},
//ZoneF>
		{name: 'dept_id',      type: 'int', title: 'dept_id'},
		{name: 'faculty_id',   type: 'int', title: 'faculty_id'},
		{name: 'dept_code',    type: 'string', title: 'dept_code'},
		{name: 'dept_name_vn', type: 'string', title: 'dept_name_vn'},
		{name: 'dept_name_en', type: 'string', title: 'dept_name_en'}
	],
	actionName: 'Department',
	validations: [
		{type: 'presence', field: 'dept_code', message: 'Chưa nhập thông tin [dept_code]'},
		{type: 'length', field: 'dept_code', message: 'Thông tin [dept_code] dài hơn 5 ký tự', max: 5},
		{type: 'presence', field: 'dept_name_vn', message: 'Chưa nhập thông tin [dept_name_vn]'},
		{type: 'length', field: 'dept_name_vn', message: 'Thông tin [dept_name_vn] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'dept_name_en', message: 'Chưa nhập thông tin [dept_name_en]'},
		{type: 'length', field: 'dept_name_en', message: 'Thông tin [dept_name_en] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Department,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});