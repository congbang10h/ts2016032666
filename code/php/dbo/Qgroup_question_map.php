<?php
//ID: bfccf8733e54004815de0df39a02ff50
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Qgroup_question_map extends DBObject{
	protected $_table = 'qgroup_question_map';
	protected $_title = '';
	protected $_fields = [
		'qgroup_question_map_id' => [DBO_AUTO, 'qgroup_question_map_id', NULL],
		'question_group_id'      => [DBO_NUMB, 'question_group_id', NULL],
		'question_id'            => [DBO_NUMB, 'question_id', NULL]
	];
	protected $_pkey = 'qgroup_question_map_id';
	protected $_fkeys = [//class=[fkey]
			'Question_group' => ['question_group_id'],
			'Question'       => ['question_id']
		];
//<ZoneC

//ZoneC>
}