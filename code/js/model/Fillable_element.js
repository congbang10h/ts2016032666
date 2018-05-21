//ID: d9fd8311ca2cc6440478e0994448970b
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Fillable_element', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'fillable_element_id',       type: 'int', title: 'fillable_element_id'},
		{name: 'item_id',                   type: 'int', title: 'item_id'},
		{name: 'fillable_element_code',     type: 'string', title: 'fillable_element_code'},
		{name: 'fillable_element_hint',     type: 'string', title: 'fillable_element_hint'},
		{name: 'fillable_element_solution', type: 'string', title: 'fillable_element_solution'},
		{name: 'fillable_element_answer',   type: 'string', title: 'fillable_element_answer'},
		{name: 'fillable_element_order',    type: 'int', title: 'fillable_element_order'}
	],
	actionName: 'Fillable_element',
	validations: [
		{type: 'length', field: 'fillable_element_code', message: 'Thông tin [fillable_element_code] dài hơn 10 ký tự', max: 10},
		{type: 'length', field: 'fillable_element_hint', message: 'Thông tin [fillable_element_hint] dài hơn 65535 ký tự', max: 65535},
		{type: 'length', field: 'fillable_element_solution', message: 'Thông tin [fillable_element_solution] dài hơn 65535 ký tự', max: 65535},
		{type: 'length', field: 'fillable_element_answer', message: 'Thông tin [fillable_element_answer] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Fillable_element,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});