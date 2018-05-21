<?php
//ID: 4259bad9d972e4f48fb669e18d8c4285
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Question_group extends DBObject{
	protected $_table = 'question_group';
	protected $_title = 'contains many questions that share the same description and ';
	protected $_fields = [
		'question_group_id'   => [DBO_AUTO, 'question_group_id', NULL],
		'user_id'             => [DBO_NUMB, 'user_id', NULL],
		'question_group_desc' => [DBO_STRI, 'question_group_desc', NULL]
	];
	protected $_pkey = 'question_group_id';
	protected $_fkeys = [//class=[fkey]
			'User' => ['user_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Qgroup_content_map'  => ['question_group_id'],
			'Qgroup_question_map' => ['question_group_id'],
			'Qgroup_topic_map'    => ['question_group_id'],
			'Question'            => ['qgroup_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'question_group_desc',
			'message' => 'Chưa nhập thông tin [question_group_desc]'],
		['type' => 'length',
			'field' => 'question_group_desc',
			'message' => 'Thông tin [question_group_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	protected $_jfields	= array(
		'User'=>['user_first_name','user_last_name']
	);
	protected function beforeCreate($params,$opts=null){
		$params->user_id = Authorise::getId();
	}
//ZoneC>
}