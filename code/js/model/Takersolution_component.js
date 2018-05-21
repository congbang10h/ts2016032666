//ID: 6d1979a59da0da27e227dea326787064
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Takersolution_component', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'takersolution_component_id', type: 'int', title: 'takersolution_component_id'},
		{name: 'curr_item_id',               type: 'int', title: 'curr_item_id'},
		{name: 'next_item_id',               type: 'int', title: 'next_item_id'},
		{name: 'fill_value',                 type: 'string', title: 'fill_value'},
		{name: 'taker_solution_id',          type: 'int', title: 'taker_solution_id'}
	],
	actionName: 'Takersolution_component',
	validations: [
		{type: 'length', field: 'fill_value', message: 'Thông tin [fill_value] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Takersolution_component,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});