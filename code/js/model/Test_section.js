//ID: eae7606b11453de020cc2aaeb868a542
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Test_section', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'test_section_id',    type: 'int', title: 'test_section_id'},
		{name: 'test_id',            type: 'int', title: 'test_id'},
		{name: 'test_section_code',  type: 'string', title: 'test_section_code'},
		{name: 'test_section_desc',  type: 'string', title: 'test_section_desc'},
		{name: 'test_section_order', type: 'int', title: 'test_section_order'}
	],
	actionName: 'Test_section',
	validations: [
		{type: 'length', field: 'test_section_code', message: 'Thông tin [test_section_code] dài hơn 10 ký tự', max: 10},
		{type: 'length', field: 'test_section_desc', message: 'Thông tin [test_section_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Test_section,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});