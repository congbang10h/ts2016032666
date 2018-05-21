//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
Ext.define('VX.model.Testreview', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'test_review_id',       type: 'int', title: 'test_review_id'},
		{name: 'user_id',              type: 'int', title: 'user_id'},
		{name: 'test_id',              type: 'int', title: 'test_id'},
		{name: 'test_review_comment',  type: 'string', title: 'test_review_comment'},
		{name: 'test_review_date',     type: 'date', title: 'test_review_date'},
		{name: 'test_review_approved', type: 'int', title: 'test_review_approved'},
		{name: 'test_review_type',     type: 'string', title: 'test_review_type'}
	],
	actionName: 'Testreview',
	validations: [
		{type: 'length', field: 'test_review_comment', message: 'Thông tin [test_review_comment] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'test_review_type', message: 'Chưa nhập thông tin [test_review_type]'},
		{type: 'length', field: 'test_review_type', message: 'Thông tin [test_review_type] dài hơn 20 ký tự', max: 20}
	],
	proxy:{
		type: 'direct',
		api: Testreview,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
});