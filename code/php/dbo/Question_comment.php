<?php
//ID: 0e51961a58cb425f2c25cd9a9091332e
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Question_comment extends DBObject{
	protected $_table = 'question_comment';
	protected $_title = '';
	protected $_fields = [
		'question_comment_id'       => [DBO_AUTO, 'question_comment_id', NULL],
		'test_reviewer_decision_id' => [DBO_NUMB, 'test_reviewer_decision_id', NULL],
		'test_comment_id'           => [DBO_NUMB, 'test_comment_id', NULL],
		'question_id'               => [DBO_NUMB, 'question_id', NULL],
		'question_comment_date'     => [DBO_DATE, 'question_comment_date', NULL],
		'question_comment_time'     => [DBO_TIME, 'question_comment_time', NULL],
		'question_comment_desc'     => [DBO_STRI, 'question_comment_desc', NULL]
	];
	protected $_pkey = 'question_comment_id';
	protected $_fkeys = [//class=[fkey]
			'Question' => ['question_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Question_comment_relationship' => ['child_question_comment_id','parent_question_comment_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'question_id',
			'message' => 'Chưa nhập thông tin [question_id]'],
		['type' => 'presence',
			'field' => 'question_comment_date',
			'message' => 'Chưa nhập thông tin [question_comment_date]'],
		['type' => 'presence',
			'field' => 'question_comment_time',
			'message' => 'Chưa nhập thông tin [question_comment_time]'],
		['type' => 'presence',
			'field' => 'question_comment_desc',
			'message' => 'Chưa nhập thông tin [question_comment_desc]'],
		['type' => 'length',
			'field' => 'question_comment_desc',
			'message' => 'Thông tin [question_comment_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}