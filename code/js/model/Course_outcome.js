//ID: 9e87f1f80450b7ba4229a2c44d3172cb
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course_outcome', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'co_id',     type: 'int', title: 'co_id'},
		{name: 'course_id', type: 'int', title: 'course_id'},
		{name: 'co_code',   type: 'string', title: 'co_code'},
		{name: 'co_date',   type: 'date', title: 'co_date'},
		{name: 'co_isused', type: 'int', title: 'co_isused'}
	],
	actionName: 'Course_outcome',
	validations: [
		{type: 'presence', field: 'co_code', message: 'Chưa nhập thông tin [co_code]'},
		{type: 'length', field: 'co_code', message: 'Thông tin [co_code] dài hơn 10 ký tự', max: 10},
		{type: 'presence', field: 'co_date', message: 'Chưa nhập thông tin [co_date]'},
		{type: 'presence', field: 'co_isused', message: 'Chưa nhập thông tin [co_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Course_outcome,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});