//ID: 726ac440f5e46698aaeb3aa94636e44a
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Program_comment_relationship', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'program_comment_relationship_id',   type: 'int', title: 'program_comment_relationship_id'},
		{name: 'program_comment_id',                type: 'int', title: 'program_comment_id'},
		{name: 'pro_program_comment_id',            type: 'int', title: 'pro_program_comment_id'},
		{name: 'program_comment_relationship_desc', type: 'string', title: 'program_comment_relationship_desc'}
	],
	actionName: 'Program_comment_relationship',
	validations: [
		{type: 'length', field: 'program_comment_relationship_desc', message: 'Thông tin [program_comment_relationship_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Program_comment_relationship,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});