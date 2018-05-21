//ID: 4e444a991f8cb56ee448a29813a666b0
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.So_comment', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'so_comment_id',       type: 'int', title: 'so_comment_id'},
		{name: 'program_comment_id',  type: 'int', title: 'program_comment_id'},
		{name: 'so_id',               type: 'int', title: 'so_id'},
		{name: 'program_decision_id', type: 'int', title: 'program_decision_id'},
		{name: 'so_comment_date',     type: 'date', title: 'so_comment_date'},
		{name: 'so_comment_time',     type: 'datetime', title: 'so_comment_time'},
		{name: 'so_comment_desc',     type: 'string', title: 'so_comment_desc'}
	],
	actionName: 'So_comment',
	validations: [
		{type: 'presence', field: 'so_comment_date', message: 'Chưa nhập thông tin [so_comment_date]'},
		{type: 'presence', field: 'so_comment_desc', message: 'Chưa nhập thông tin [so_comment_desc]'},
		{type: 'length', field: 'so_comment_desc', message: 'Thông tin [so_comment_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: So_comment,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});