//ID: 7fa8cdd084cf2ce6f7d65ac493244947
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question_item_info', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'question_item_info_id',    type: 'int', title: 'question_item_info_id'},
		{name: 'item_id',                  type: 'int', title: 'item_id'},
		{name: 'question_item_info_prop',  type: 'string', title: 'question_item_info_prop'},
		{name: 'question_item_info_value', type: 'string', title: 'question_item_info_value'},
		{name: 'question_item_info_desc',  type: 'string', title: 'question_item_info_desc'}
	],
	actionName: 'Question_item_info',
	validations: [
		{type: 'presence', field: 'question_item_info_prop', message: 'Chưa nhập thông tin [question_item_info_prop]'},
		{type: 'length', field: 'question_item_info_prop', message: 'Thông tin [question_item_info_prop] dài hơn 20 ký tự', max: 20},
		{type: 'presence', field: 'question_item_info_value', message: 'Chưa nhập thông tin [question_item_info_value]'},
		{type: 'length', field: 'question_item_info_value', message: 'Thông tin [question_item_info_value] dài hơn 65535 ký tự', max: 65535},
		{type: 'length', field: 'question_item_info_desc', message: 'Thông tin [question_item_info_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Question_item_info,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});