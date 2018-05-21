<?php
//ID: 9272d3fe1261304b9da9ffed6f2b4a79
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Question_access_mode extends DBObject{
	protected $_table = 'question_access_mode';
	protected $_title = '';
	protected $_fields = [
		'question_access_mode_id'              => [DBO_AUTO, 'question_access_mode_id', NULL],
		'question_access_mode_granted_date'    => [DBO_DATE, 'question_access_mode_granted_date', NULL],
		'question_id'                          => [DBO_NUMB, 'question_id', NULL],
		'accessor_id'                          => [DBO_NUMB, 'accessor_id', NULL],
		'role_id'                              => [DBO_NUMB, 'role_id', NULL],
		'previlege_id'                         => [DBO_NUMB, 'previlege_id', NULL],
		'grantor_id'                           => [DBO_NUMB, 'grantor_id', NULL],
		'question_access_mode_valid_startdate' => [DBO_DATE, 'question_access_mode_valid_startdate', NULL],
		'question_access_mode_valid_enddate'   => [DBO_DATE, 'question_access_mode_valid_enddate', NULL],
		'question_access_mode_valid_starttime' => [DBO_TIME, 'question_access_mode_valid_starttime', NULL],
		'question_access_mode_valid_endtime'   => [DBO_TIME, 'question_access_mode_valid_endtime', NULL],
		'question_access_mode_is_disabled'     => [DBO_NUMB, 'question_access_mode_is_disabled', NULL],
		'question_access_mode_desc'            => [DBO_STRI, 'question_access_mode_desc', NULL]
	];
	protected $_pkey = 'question_access_mode_id';
	protected $_fkeys = [//class=[fkey]
			'Previlege' => ['previlege_id'],
			'Question'  => ['question_id'],
			'Role'      => ['role_id'],
			'User'      => ['accessor_id','grantor_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'grantor_id',
			'message' => 'Chưa nhập thông tin [grantor_id]'],
		['type' => 'presence',
			'field' => 'question_access_mode_valid_startdate',
			'message' => 'Chưa nhập thông tin [question_access_mode_valid_startdate]'],
		['type' => 'presence',
			'field' => 'question_access_mode_valid_starttime',
			'message' => 'Chưa nhập thông tin [question_access_mode_valid_starttime]'],
		['type' => 'presence',
			'field' => 'question_access_mode_is_disabled',
			'message' => 'Chưa nhập thông tin [question_access_mode_is_disabled]'],
		['type' => 'length',
			'field' => 'question_access_mode_desc',
			'message' => 'Thông tin [question_access_mode_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}