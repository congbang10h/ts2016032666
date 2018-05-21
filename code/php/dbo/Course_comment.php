<?php
//ID: 7adb05a99096ebbd8f95c226d5ea474a
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course_comment extends DBObject{
	protected $_table = 'course_comment';
	protected $_title = '';
	protected $_fields = [
		'course_comment_id'           => [DBO_AUTO, 'course_comment_id', NULL],
		'course_access_mode_id'       => [DBO_NUMB, 'course_access_mode_id', NULL],
		'course_reviewer_decision_id' => [DBO_NUMB, 'course_reviewer_decision_id', NULL],
		'course_comment_date'         => [DBO_DATE, 'course_comment_date', NULL],
		'course_comment_time'         => [DBO_TIME, 'course_comment_time', NULL],
		'course_comment_desc'         => [DBO_STRI, 'course_comment_desc', NULL]
	];
	protected $_pkey = 'course_comment_id';
	protected $_fkeys = [//class=[fkey]
			'Course_access_mode'       => ['course_access_mode_id'],
			'Course_reviewer_decision' => ['course_reviewer_decision_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Content_comment'             => ['course_comment_id'],
			'Course_comment_relationship' => ['child_course_comment_id','parent_course_comment_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'course_comment_date',
			'message' => 'Chưa nhập thông tin [course_comment_date]'],
		['type' => 'presence',
			'field' => 'course_comment_time',
			'message' => 'Chưa nhập thông tin [course_comment_time]'],
		['type' => 'presence',
			'field' => 'course_comment_desc',
			'message' => 'Chưa nhập thông tin [course_comment_desc]'],
		['type' => 'length',
			'field' => 'course_comment_desc',
			'message' => 'Thông tin [course_comment_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}