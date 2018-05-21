<?php
//ID: efb59e9e95da61d9ed0b21e14bfdb70d
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Co_so_map_version extends DBObject{
	protected $_table = 'co_so_map_version';
	protected $_title = '';
	protected $_fields = [
		'co_so_map_version_id'       => [DBO_AUTO, 'co_so_map_version_id', NULL],
		'student_outcome_version_id' => [DBO_NUMB, 'student_outcome_version_id', NULL],
		'course_outcome_version_id'  => [DBO_NUMB, 'course_outcome_version_id', NULL],
		'co_so_map_version_code'     => [DBO_NUMB, 'co_so_map_version_code', NULL],
		'co_so_map_version_date'     => [DBO_DATE, 'co_so_map_version_date', NULL],
		'co_so_map_version_isused'   => [DBO_NUMB, 'co_so_map_version_isused', NULL]
	];
	protected $_pkey = 'co_so_map_version_id';
	protected $_fkeys = [//class=[fkey]
			'Course_outcome'  => ['course_outcome_version_id'],
			'Student_outcome' => ['student_outcome_version_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Co_so_map' => ['co_so_map_version_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'co_so_map_version_code',
			'message' => 'Chưa nhập thông tin [co_so_map_version_code]'],
		['type' => 'presence',
			'field' => 'co_so_map_version_date',
			'message' => 'Chưa nhập thông tin [co_so_map_version_date]'],
		['type' => 'presence',
			'field' => 'co_so_map_version_isused',
			'message' => 'Chưa nhập thông tin [co_so_map_version_isused]']
	];
//<ZoneC

//ZoneC>
}