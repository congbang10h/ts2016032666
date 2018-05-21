<?php
//ID: 70f064268957382b0759fb905a7bc9db
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Topic_access_mode extends DBObject{
	protected $_table = 'topic_access_mode';
	protected $_title = '';
	protected $_fields = [
		'topic_access_mode_id'              => [DBO_AUTO, 'topic_access_mode_id', NULL],
		'topic_id'                          => [DBO_NUMB, 'topic_id', NULL],
		'accessor_id'                       => [DBO_NUMB, 'accessor_id', NULL],
		'role_id'                           => [DBO_NUMB, 'role_id', NULL],
		'previlege_id'                      => [DBO_NUMB, 'previlege_id', NULL],
		'grantor_id'                        => [DBO_NUMB, 'grantor_id', NULL],
		'topic_access_mode_granted_date'    => [DBO_DATE, 'topic_access_mode_granted_date', NULL],
		'topic_access_mode_valid_startdate' => [DBO_DATE, 'topic_access_mode_valid_startdate', NULL],
		'topic_access_mode_valid_enddate'   => [DBO_DATE, 'topic_access_mode_valid_enddate', NULL],
		'topic_access_mode_valid_starttime' => [DBO_TIME, 'topic_access_mode_valid_starttime', NULL],
		'topic_access_mode_valid_endtime'   => [DBO_TIME, 'topic_access_mode_valid_endtime', NULL],
		'topic_access_mode_is_disabled'     => [DBO_NUMB, 'topic_access_mode_is_disabled', NULL],
		'topic_access_mode_desc'            => [DBO_STRI, 'topic_access_mode_desc', NULL]
	];
	protected $_pkey = 'topic_access_mode_id';
	protected $_fkeys = [//class=[fkey]
			'Previlege' => ['previlege_id'],
			'Role'      => ['role_id'],
			'Topic'     => ['topic_id'],
			'User'      => ['grantor_id','accessor_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'topic_access_mode_granted_date',
			'message' => 'Chưa nhập thông tin [topic_access_mode_granted_date]'],
		['type' => 'presence',
			'field' => 'topic_access_mode_valid_startdate',
			'message' => 'Chưa nhập thông tin [topic_access_mode_valid_startdate]'],
		['type' => 'presence',
			'field' => 'topic_access_mode_valid_starttime',
			'message' => 'Chưa nhập thông tin [topic_access_mode_valid_starttime]'],
		['type' => 'presence',
			'field' => 'topic_access_mode_is_disabled',
			'message' => 'Chưa nhập thông tin [topic_access_mode_is_disabled]'],
		['type' => 'length',
			'field' => 'topic_access_mode_desc',
			'message' => 'Thông tin [topic_access_mode_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}