<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Question_courseoutcome_map extends DBObject{
	protected $_table = 'question_courseoutcome_map';
	protected $_title = '';
	protected $_fields = [
		'question_courseoutcome_map_id'     => [DBO_AUTO, 'question_courseoutcome_map_id', NULL],
		'co_id'                             => [DBO_NUMB, 'co_id', NULL],
		'question_id'                       => [DBO_NUMB, 'question_id', NULL],
		'question_courseoutcome_map_factor' => [DBO_NUMB, 'question_courseoutcome_map_factor', NULL]
	];
	protected $_pkey = 'question_courseoutcome_map_id';
	protected $_fkeys = [//class=[fkey]
			'Course_outcome' => ['co_id'],
			'Question'       => ['question_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'question_courseoutcome_map_factor',
			'message' => 'Chưa nhập thông tin [question_courseoutcome_map_factor]']
	];
//<ZoneC

//ZoneC>
}