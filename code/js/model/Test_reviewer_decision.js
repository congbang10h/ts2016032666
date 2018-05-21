//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
Ext.define('VX.model.Test_reviewer_decision', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'test_reviewer_decision_id',      type: 'int', title: 'test_reviewer_decision_id'},
		{name: 'test_reviewer_decision_code',    type: 'int', title: 'test_reviewer_decision_code'},
		{name: 'test_reviewer_decision_desc',    type: 'string', title: 'test_reviewer_decision_desc'},
		{name: 'test_reviewer_decision_fortest', type: 'int', title: 'test_reviewer_decision_fortest'}
	],
	actionName: 'Test_reviewer_decision',
	validations: [
		{type: 'presence', field: 'test_reviewer_decision_code', message: 'Chưa nhập thông tin [test_reviewer_decision_code]'},
		{type: 'presence', field: 'test_reviewer_decision_desc', message: 'Chưa nhập thông tin [test_reviewer_decision_desc]'},
		{type: 'length', field: 'test_reviewer_decision_desc', message: 'Thông tin [test_reviewer_decision_desc] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'test_reviewer_decision_fortest', message: 'Chưa nhập thông tin [test_reviewer_decision_fortest]'}
	],
	proxy:{
		type: 'direct',
		api: Test_reviewer_decision,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
});