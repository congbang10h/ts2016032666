<?php
//ID: 33c742250dde4e668b8818ec1ed407ba
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Qgroup_topic_map extends DBObject{
	protected $_table = 'qgroup_topic_map';
	protected $_title = '';
	protected $_fields = [
		'qgroup_topic_map_id' => [DBO_AUTO, 'qgroup_topic_map_id', NULL],
		'question_group_id'   => [DBO_NUMB, 'question_group_id', NULL],
		'topic_id'            => [DBO_NUMB, 'topic_id', NULL]
	];
	protected $_pkey = 'qgroup_topic_map_id';
	protected $_fkeys = [//class=[fkey]
			'Question_group' => ['question_group_id'],
			'Topic'          => ['topic_id']
		];
//<ZoneC

//ZoneC>
}