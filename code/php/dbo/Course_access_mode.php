<?php
//ID: a4b9a94ff3cc852f3a4537a81bce14d7
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course_access_mode extends DBObject{
	protected $_table = 'course_access_mode';
	protected $_title = '';
	protected $_fields = [
		'course_access_mode_id'              => [DBO_AUTO, 'course_access_mode_id', NULL],
		'course_id'                          => [DBO_NUMB, 'course_id', NULL],
		'accessor_id'                        => [DBO_NUMB, 'accessor_id', NULL],
		'role_id'                            => [DBO_NUMB, 'role_id', NULL],
		'grantor_id'                         => [DBO_NUMB, 'grantor_id', NULL],
		'previlege_id'                       => [DBO_NUMB, 'previlege_id', NULL],
		'course_access_mode_granted_date'    => [DBO_DATE, 'course_access_mode_granted_date', NULL],
		'course_access_mode_valid_startdate' => [DBO_DATE, 'course_access_mode_valid_startdate', NULL],
		'course_access_mode_valid_enddate'   => [DBO_DATE, 'course_access_mode_valid_enddate', NULL],
		'course_access_mode_valid_starttime' => [DBO_TIME, 'course_access_mode_valid_starttime', NULL],
		'course_access_mode_endtime'         => [DBO_TIME, 'course_access_mode_endtime', NULL],
		'course_access_mode_is_disabled'     => [DBO_NUMB, 'course_access_mode_is_disabled', NULL],
		'course_access_mode_desc'            => [DBO_STRI, 'course_access_mode_desc', NULL]
	];
	protected $_pkey = 'course_access_mode_id';
	protected $_fkeys = [//class=[fkey]
			'User'      => ['accessor_id','grantor_id'],
			'Role'      => ['role_id'],
			'Previlege' => ['previlege_id'],
			'Course'    => ['course_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Course_comment' => ['course_access_mode_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'course_access_mode_granted_date',
			'message' => 'Chưa nhập thông tin [course_access_mode_granted_date]'],
		['type' => 'presence',
			'field' => 'course_access_mode_valid_startdate',
			'message' => 'Chưa nhập thông tin [course_access_mode_valid_startdate]'],
		['type' => 'presence',
			'field' => 'course_access_mode_valid_starttime',
			'message' => 'Chưa nhập thông tin [course_access_mode_valid_starttime]'],
		['type' => 'presence',
			'field' => 'course_access_mode_is_disabled',
			'message' => 'Chưa nhập thông tin [course_access_mode_is_disabled]'],
		['type' => 'length',
			'field' => 'course_access_mode_desc',
			'message' => 'Thông tin [course_access_mode_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}