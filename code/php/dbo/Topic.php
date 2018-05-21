<?php
//ID: cad68868daf3ee43b3dcc88e71a910ac
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Topic extends DBObject{
	protected $_table = 'topic';
	protected $_title = '';
	protected $_fields = [
		'topic_id'        => [DBO_AUTO, 'topic_id', NULL],
		'user_id'         => [DBO_NUMB, 'user_id', NULL],
		'parent_topic_id' => [DBO_NUMB, 'parent_topic_id', NULL],
		'topic_code'      => [DBO_STRI, 'topic_code', NULL],
		'topic_name'      => [DBO_STRI, 'topic_name', NULL],
		'topic_desc'      => [DBO_STRI, 'topic_desc', NULL]
	];
	protected $_pkey = 'topic_id';
	protected $_fkeys = [//class=[fkey]
			'User'  => ['user_id'],
			'Topic' => ['parent_topic_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Course_topic_map'   => ['topic_id'],
			'Qgroup_topic_map'   => ['topic_id'],
			'Question_topic_map' => ['topic_id'],
			'Topic'              => ['parent_topic_id'],
			'Topic_access_mode'  => ['topic_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'user_id',
			'message' => 'Chưa nhập thông tin [user_id]'],
		['type' => 'presence',
			'field' => 'topic_code',
			'message' => 'Chưa nhập thông tin [topic_code]'],
		['type' => 'length',
			'field' => 'topic_code',
			'message' => 'Thông tin [topic_code] dài hơn 20 ký tự',
			'max' => 20],
		['type' => 'presence',
			'field' => 'topic_name',
			'message' => 'Chưa nhập thông tin [topic_name]'],
		['type' => 'length',
			'field' => 'topic_name',
			'message' => 'Thông tin [topic_name] dài hơn 200 ký tự',
			'max' => 200],
		['type' => 'length',
			'field' => 'topic_desc',
			'message' => 'Thông tin [topic_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	protected $_jfields	= array(
		'User'=>['user_first_name','user_last_name']
	);
	protected function beforeCreate($params,$opts=null){
		$params->user_id = Authorise::getId();
		if (empty($params->parent_topic_id))
			$params->parent_topic_id = null;
	}
//ZoneC>
}