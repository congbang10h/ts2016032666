//ID: fb97b8b4a6efaa2f60248111a5e80a47
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question_topic_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'question_topic_map_id', type: 'int', title: 'question_topic_map_id'},
		{name: 'question_id',           type: 'int', title: 'question_id'},
		{name: 'topic_id',              type: 'int', title: 'topic_id'}
	],
	actionName: 'Question_topic_map',
	validations: [
		{type: 'presence', field: 'question_id', message: 'Chưa nhập thông tin [question_id]'},
		{type: 'presence', field: 'topic_id', message: 'Chưa nhập thông tin [topic_id]'}
	],
	proxy:{
		type: 'direct',
		api: Question_topic_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});