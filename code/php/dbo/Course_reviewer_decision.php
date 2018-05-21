<?php
//ID: c1e35ea2fe255a276681b294717dd7ea
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course_reviewer_decision extends DBObject{
	protected $_table = 'course_reviewer_decision';
	protected $_title = '';
	protected $_fields = [
		'course_reviewer_decision_id'   => [DBO_AUTO, 'course_reviewer_decision_id', NULL],
		'course_reviewer_decision_code' => [DBO_STRI, 'course_reviewer_decision_code', NULL],
		'course_reviewer_decision_desc' => [DBO_STRI, 'course_reviewer_decision_desc', NULL]
	];
	protected $_pkey = 'course_reviewer_decision_id';
	protected $_hasRef = [//class=[fkey]
			'Content_comment' => ['course_reviewer_decision_id'],
			'Course_comment'  => ['course_reviewer_decision_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'course_reviewer_decision_code',
			'message' => 'Chưa nhập thông tin [course_reviewer_decision_code]'],
		['type' => 'length',
			'field' => 'course_reviewer_decision_code',
			'message' => 'Thông tin [course_reviewer_decision_code] dài hơn 100 ký tự',
			'max' => 100],
		['type' => 'presence',
			'field' => 'course_reviewer_decision_desc',
			'message' => 'Chưa nhập thông tin [course_reviewer_decision_desc]'],
		['type' => 'length',
			'field' => 'course_reviewer_decision_desc',
			'message' => 'Thông tin [course_reviewer_decision_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}