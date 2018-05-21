//ID: d088b691fc786915f6bc6cb1e58623ca
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Test_review', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'test_review_id',        type: 'int', title: 'test_review_id'},
		{name: 'test_review_parent_id', type: 'int', title: 'test_review_parent_id'},
		{name: 'user_id',               type: 'int', title: 'user_id'},
		{name: 'test_id',               type: 'int', title: 'test_id'},
		{name: 'test_review_code',      type: 'int', title: 'test_review_code'},
		{name: 'test_review_desc',      type: 'string', title: 'test_review_desc'},
		{name: 'test_review_time',      type: 'datetime', title: 'test_review_time'}
	],
	actionName: 'Test_review',
	validations: [
		{type: 'presence', field: 'user_id', message: 'Chưa nhập thông tin [user_id]'},
		{type: 'presence', field: 'test_id', message: 'Chưa nhập thông tin [test_id]'},
		{type: 'length', field: 'test_review_desc', message: 'Thông tin [test_review_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Test_review,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC
	, isApproved: function(){
		return this.get('test_review_code')==3;
	}
//ZoneC>
});