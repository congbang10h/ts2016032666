<?php
//ID: fb97b8b4a6efaa2f60248111a5e80a47
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Question_topic_map extends DBObject{
	protected $_table = 'question_topic_map';
	protected $_title = '';
	protected $_fields = [
		'question_topic_map_id' => [DBO_AUTO, 'question_topic_map_id', NULL],
		'question_id'           => [DBO_NUMB, 'question_id', NULL],
		'topic_id'              => [DBO_NUMB, 'topic_id', NULL]
	];
	protected $_pkey = 'question_topic_map_id';
	protected $_fkeys = [//class=[fkey]
			'Question' => ['question_id'],
			'Topic'    => ['topic_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'question_id',
			'message' => 'Chưa nhập thông tin [question_id]'],
		['type' => 'presence',
			'field' => 'topic_id',
			'message' => 'Chưa nhập thông tin [topic_id]']
	];
//<ZoneC

//ZoneC>
}