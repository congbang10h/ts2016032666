<?php
//ID: 97565416ca709b6ef607c9394b8331a2
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Student_outcome_version extends DBObject{
	protected $_table = 'student_outcome_version';
	protected $_title = '';
	protected $_fields = [
		'sov_id'         => [DBO_AUTO, 'sov_id', NULL],
		'edu_program_id' => [DBO_NUMB, 'edu_program_id', NULL],
		'sov_code'       => [DBO_STRI, 'sov_code', NULL],
		'sov_date'       => [DBO_DATE, 'sov_date', NULL],
		'sov_isused'     => [DBO_NUMB, 'sov_isused', NULL]
	];
	protected $_pkey = 'sov_id';
	protected $_fkeys = [//class=[fkey]
			'Educational_program' => ['edu_program_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Co_so_map_version'  => ['student_outcome_version_id'],
			'Peo_so_map_version' => ['sov_id'],
			'Student_outcome'    => ['sov_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'sov_code',
			'message' => 'Chưa nhập thông tin [sov_code]'],
		['type' => 'length',
			'field' => 'sov_code',
			'message' => 'Thông tin [sov_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'presence',
			'field' => 'sov_date',
			'message' => 'Chưa nhập thông tin [sov_date]'],
		['type' => 'presence',
			'field' => 'sov_isused',
			'message' => 'Chưa nhập thông tin [sov_isused]']
	];
//<ZoneC

//ZoneC>
}