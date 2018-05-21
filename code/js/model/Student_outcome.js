//ID: 88610d8d9daba3448ccf9e766c76a2f8
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Student_outcome', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'so_id',          type: 'int', title: 'so_id'},
		{name: 'edu_program_id', type: 'int', title: 'edu_program_id'},
		{name: 'so_code',        type: 'string', title: 'so_code'},
		{name: 'so_date',        type: 'date', title: 'so_date'},
		{name: 'so_isused',      type: 'int', title: 'so_isused'}
	],
	actionName: 'Student_outcome',
	validations: [
		{type: 'presence', field: 'so_code', message: 'Chưa nhập thông tin [so_code]'},
		{type: 'length', field: 'so_code', message: 'Thông tin [so_code] dài hơn 10 ký tự', max: 10},
		{type: 'presence', field: 'so_date', message: 'Chưa nhập thông tin [so_date]'},
		{type: 'presence', field: 'so_isused', message: 'Chưa nhập thông tin [so_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Student_outcome,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});