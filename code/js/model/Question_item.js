//ID: b8a88a77da1fe66c942e25610b070867
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question_item', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'item_id',               type: 'int', title: 'item_id'},
		{name: 'question_id',           type: 'int', title: 'question_id'},
		{name: 'item_code',             type: 'string', title: 'item_code'},
		{name: 'item_desc',             type: 'string', title: 'item_desc'},
		{name: 'item_order',            type: 'int', title: 'item_order'},
		{name: 'item_reviewer_comment', type: 'string', title: 'item_reviewer_comment'},
		{name: 'item_taker_comment',    type: 'string', title: 'item_taker_comment'}
	],
	actionName: 'Question_item',
	validations: [
		{type: 'length', field: 'item_code', message: 'Thông tin [item_code] dài hơn 10 ký tự', max: 10},
		{type: 'length', field: 'item_desc', message: 'Thông tin [item_desc] dài hơn 65535 ký tự', max: 65535},
		{type: 'length', field: 'item_reviewer_comment', message: 'Thông tin [item_reviewer_comment] dài hơn 65535 ký tự', max: 65535},
		{type: 'length', field: 'item_taker_comment', message: 'Thông tin [item_taker_comment] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Question_item,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});