//ID: cad68868daf3ee43b3dcc88e71a910ac
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Topic', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'topic_id',        type: 'int', title: 'topic_id'},
		{name: 'user_id',         type: 'int', title: 'user_id'},
		{name: 'parent_topic_id', type: 'int', title: 'parent_topic_id'},
		{name: 'topic_code',      type: 'string', title: 'topic_code'},
		{name: 'topic_name',      type: 'string', title: 'topic_name'},
		{name: 'topic_desc',      type: 'string', title: 'topic_desc'}
	],
	actionName: 'Topic',
	validations: [
		{type: 'presence', field: 'user_id', message: 'Chưa nhập thông tin [user_id]'},
		{type: 'presence', field: 'topic_code', message: 'Chưa nhập thông tin [topic_code]'},
		{type: 'length', field: 'topic_code', message: 'Thông tin [topic_code] dài hơn 20 ký tự', max: 20},
		{type: 'presence', field: 'topic_name', message: 'Chưa nhập thông tin [topic_name]'},
		{type: 'length', field: 'topic_name', message: 'Thông tin [topic_name] dài hơn 200 ký tự', max: 200},
		{type: 'length', field: 'topic_desc', message: 'Thông tin [topic_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Topic,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC
	,toHTML: function(){
		var r = this;
		return '(<i>Chủ đề #'+r.get('topic_id')+' - '
			+ r.get('user_first_name')+' '+ r.get('user_last_name')+'</i>)<br/>'
			+ '<b>'+r.get('topic_code') + ' - ' + r.get('topic_name') + '</b><br/>'
			+ r.get('topic_desc');
	}
	,getKey: function(){
		return this.data.topic_id;
	}
//ZoneC>
});