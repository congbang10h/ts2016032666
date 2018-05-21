<?php
//ID: e3becec665fd50fb91c5ed2943527cd9
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Performance_indicator_version extends DBObject{
	protected $_table = 'performance_indicator_version';
	protected $_title = '';
	protected $_fields = [
		'performance_indicator_version_id'     => [DBO_AUTO, 'performance_indicator_version_id', NULL],
		'so_id'                                => [DBO_NUMB, 'so_id', NULL],
		'performance_indicator_version_code'   => [DBO_STRI, 'performance_indicator_version_code', NULL],
		'performance_indicator_version_date'   => [DBO_DATE, 'performance_indicator_version_date', NULL],
		'performance_indicator_version_isused' => [DBO_NUMB, 'performance_indicator_version_isused', NULL]
	];
	protected $_pkey = 'performance_indicator_version_id';
	protected $_fkeys = [//class=[fkey]
			'Student_outcome_item' => ['so_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Performance_indicator' => ['performance_indicator_version_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'performance_indicator_version_code',
			'message' => 'Chưa nhập thông tin [performance_indicator_version_code]'],
		['type' => 'length',
			'field' => 'performance_indicator_version_code',
			'message' => 'Thông tin [performance_indicator_version_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'presence',
			'field' => 'performance_indicator_version_date',
			'message' => 'Chưa nhập thông tin [performance_indicator_version_date]'],
		['type' => 'presence',
			'field' => 'performance_indicator_version_isused',
			'message' => 'Chưa nhập thông tin [performance_indicator_version_isused]']
	];
//<ZoneC

//ZoneC>
}