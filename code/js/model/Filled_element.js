//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.Filled_element', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'filled_element_id',    type: 'int', title: 'filled_element_id'},
		{name: 'fillable_element_id',  type: 'int', title: 'fillable_element_id'},
		{name: 'taker_solution_id',    type: 'int', title: 'taker_solution_id'},
		{name: 'filled_element_value', type: 'string', title: 'filled_element_value'}
	],
	actionName: 'Filled_element',
	validations: [
		{type: 'presence', field: 'filled_element_value', message: 'Chưa nhập thông tin [filled_element_value]'},
		{type: 'length', field: 'filled_element_value', message: 'Thông tin [filled_element_value] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Filled_element,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});