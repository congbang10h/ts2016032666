<?php
//ID: fe11b90db3ae49633e9bb4ee4fe2adb4
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Content_comment extends DBObject{
	protected $_table = 'content_comment';
	protected $_title = '';
	protected $_fields = [
		'content_comment_id'          => [DBO_AUTO, 'content_comment_id', NULL],
		'course_comment_id'           => [DBO_NUMB, 'course_comment_id', NULL],
		'course_content_id'           => [DBO_NUMB, 'course_content_id', NULL],
		'course_reviewer_decision_id' => [DBO_NUMB, 'course_reviewer_decision_id', NULL],
		'content_comment_date'        => [DBO_DATE, 'content_comment_date', NULL],
		'content_comment_time'        => [DBO_TIME, 'content_comment_time', NULL],
		'content_comment_desc'        => [DBO_STRI, 'content_comment_desc', NULL]
	];
	protected $_pkey = 'content_comment_id';
	protected $_fkeys = [//class=[fkey]
			'Course_comment'           => ['course_comment_id'],
			'Course_content'           => ['course_content_id'],
			'Course_reviewer_decision' => ['course_reviewer_decision_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Content_comment_relationship' => ['child_content_comment_id','parent_content_comment_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'content_comment_date',
			'message' => 'Chưa nhập thông tin [content_comment_date]'],
		['type' => 'presence',
			'field' => 'content_comment_time',
			'message' => 'Chưa nhập thông tin [content_comment_time]'],
		['type' => 'presence',
			'field' => 'content_comment_desc',
			'message' => 'Chưa nhập thông tin [content_comment_desc]'],
		['type' => 'length',
			'field' => 'content_comment_desc',
			'message' => 'Thông tin [content_comment_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}