<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
class Test_reviewer_decision extends DBObject{
	protected $_table = 'test_reviewer_decision';
	protected $_title = '';
	protected $_fields = [
		'test_reviewer_decision_id'      => [DBO_AUTO, 'test_reviewer_decision_id', NULL],
		'test_reviewer_decision_code'    => [DBO_NUMB, 'test_reviewer_decision_code', NULL],
		'test_reviewer_decision_desc'    => [DBO_STRI, 'test_reviewer_decision_desc', NULL],
		'test_reviewer_decision_fortest' => [DBO_NUMB, 'test_reviewer_decision_fortest', NULL]
	];
	protected $_pkey = 'test_reviewer_decision_id';
	protected $_hasRef = [//class=[fkey]
			'Question_comment' => ['test_reviewer_decision_id'],
			'Test_comment'     => ['test_reviewer_decision_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'test_reviewer_decision_code',
			'message' => 'Chưa nhập thông tin [test_reviewer_decision_code]'],
		['type' => 'presence',
			'field' => 'test_reviewer_decision_desc',
			'message' => 'Chưa nhập thông tin [test_reviewer_decision_desc]'],
		['type' => 'length',
			'field' => 'test_reviewer_decision_desc',
			'message' => 'Thông tin [test_reviewer_decision_desc] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'test_reviewer_decision_fortest',
			'message' => 'Chưa nhập thông tin [test_reviewer_decision_fortest]']
	];
//<ZoneC

//ZoneC>
}