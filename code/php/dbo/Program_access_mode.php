<?php
//ID: cd0c1310f8ae2db7aa2ad4a9d37d5c56
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Program_access_mode extends DBObject{
	protected $_table = 'program_access_mode';
	protected $_title = '';
	protected $_fields = [
		'program_access_mode_id'              => [DBO_AUTO, 'program_access_mode_id', NULL],
		'edu_program_id'                      => [DBO_NUMB, 'edu_program_id', NULL],
		'role_id'                             => [DBO_NUMB, 'role_id', NULL],
		'grantor_id'                          => [DBO_NUMB, 'grantor_id', NULL],
		'previlege_id'                        => [DBO_NUMB, 'previlege_id', NULL],
		'accessor_id'                         => [DBO_NUMB, 'accessor_id', NULL],
		'program_access_mode_granted_date'    => [DBO_DATE, 'program_access_mode_granted_date', NULL],
		'program_access_mode_valid_startdate' => [DBO_DATE, 'program_access_mode_valid_startdate', NULL],
		'program_access_mode_valid_enddate'   => [DBO_DATE, 'program_access_mode_valid_enddate', NULL],
		'program_access_mode_valid_starttime' => [DBO_TIME, 'program_access_mode_valid_starttime', NULL],
		'program_access_mode_valid_endtime'   => [DBO_TIME, 'program_access_mode_valid_endtime', NULL],
		'program_access_mode_is_disabled'     => [DBO_NUMB, 'program_access_mode_is_disabled', NULL],
		'program_access_mode_desc'            => [DBO_STRI, 'program_access_mode_desc', NULL]
	];
	protected $_pkey = 'program_access_mode_id';
	protected $_fkeys = [//class=[fkey]
			'Role'                => ['role_id'],
			'User'                => ['grantor_id','accessor_id'],
			'Previlege'           => ['previlege_id'],
			'Educational_program' => ['edu_program_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Program_comment' => ['program_access_mode_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'program_access_mode_granted_date',
			'message' => 'Chưa nhập thông tin [program_access_mode_granted_date]'],
		['type' => 'presence',
			'field' => 'program_access_mode_valid_startdate',
			'message' => 'Chưa nhập thông tin [program_access_mode_valid_startdate]'],
		['type' => 'presence',
			'field' => 'program_access_mode_is_disabled',
			'message' => 'Chưa nhập thông tin [program_access_mode_is_disabled]'],
		['type' => 'length',
			'field' => 'program_access_mode_desc',
			'message' => 'Thông tin [program_access_mode_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}