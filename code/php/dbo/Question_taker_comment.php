<?php
//ID: 56f8c598f20846454ddfd6b19785015c
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Question_taker_comment extends DBObject{
	protected $_table = 'question_taker_comment';
	protected $_title = '';
	protected $_fields = [
		'question_taker_comment_id'   => [DBO_AUTO, 'question_taker_comment_id', NULL],
		'test_taker_comment_id'       => [DBO_NUMB, 'test_taker_comment_id', NULL],
		'question_id'                 => [DBO_NUMB, 'question_id', NULL],
		'question_taker_comment_date' => [DBO_DATE, 'question_taker_comment_date', NULL],
		'question_taker_comment_time' => [DBO_TIME, 'question_taker_comment_time', NULL],
		'question_taker_comment_desc' => [DBO_STRI, 'question_taker_comment_desc', NULL]
	];
	protected $_pkey = 'question_taker_comment_id';
	protected $_fkeys = [//class=[fkey]
			'Question'           => ['question_id'],
			'Test_taker_comment' => ['test_taker_comment_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Question_taker_comment_relationship' => ['child_question_taker_comment_id','parent_question_taker_comment_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'question_taker_comment_desc',
			'message' => 'Chưa nhập thông tin [question_taker_comment_desc]'],
		['type' => 'length',
			'field' => 'question_taker_comment_desc',
			'message' => 'Thông tin [question_taker_comment_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}