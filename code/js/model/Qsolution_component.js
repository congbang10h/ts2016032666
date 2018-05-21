//ID: 2622f4aca46c390d244355ddeed13a91
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Qsolution_component', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'qsolution_component_id', type: 'int', title: 'qsolution_component_id'},
		{name: 'qsolution_id',           type: 'int', title: 'qsolution_id'},
		{name: 'curr_item_id',           type: 'int', title: 'curr_item_id'},
		{name: 'next_item_id',           type: 'int', title: 'next_item_id'},
		{name: 'fill_element_id',        type: 'int', title: 'fill_element_id'}
	],
	actionName: 'Qsolution_component',
	proxy:{
		type: 'direct',
		api: Qsolution_component,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});