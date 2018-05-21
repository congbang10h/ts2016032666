//ID: bc9721873644a20ef2614ae5b07e0202
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Peo_comment', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'peo_comment_id',      type: 'int', title: 'peo_comment_id'},
		{name: 'program_comment_id',  type: 'int', title: 'program_comment_id'},
		{name: 'peo_id',              type: 'int', title: 'peo_id'},
		{name: 'program_decision_id', type: 'int', title: 'program_decision_id'},
		{name: 'peo_comment_date',    type: 'date', title: 'peo_comment_date'},
		{name: 'peo_comment_time',    type: 'datetime', title: 'peo_comment_time'},
		{name: 'peo_comment_desc',    type: 'string', title: 'peo_comment_desc'}
	],
	actionName: 'Peo_comment',
	validations: [
		{type: 'presence', field: 'peo_comment_date', message: 'Chưa nhập thông tin [peo_comment_date]'},
		{type: 'presence', field: 'peo_comment_desc', message: 'Chưa nhập thông tin [peo_comment_desc]'},
		{type: 'length', field: 'peo_comment_desc', message: 'Thông tin [peo_comment_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Peo_comment,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});