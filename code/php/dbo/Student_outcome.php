<?php
//ID: 88610d8d9daba3448ccf9e766c76a2f8
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Student_outcome extends DBObject{
	protected $_table = 'student_outcome';
	protected $_title = '';
	protected $_fields = [
		'so_id'          => [DBO_AUTO, 'so_id', NULL],
		'edu_program_id' => [DBO_NUMB, 'edu_program_id', NULL],
		'so_code'        => [DBO_STRI, 'so_code', NULL],
		'so_date'        => [DBO_DATE, 'so_date', NULL],
		'so_isused'      => [DBO_NUMB, 'so_isused', NULL]
	];
	protected $_pkey = 'so_id';
	protected $_fkeys = [//class=[fkey]
			'Educational_program' => ['edu_program_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Co_so_map'            => ['so_id'],
			'Peo_so_map'           => ['sov_id'],
			'Student_outcome_item' => ['so_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'so_code',
			'message' => 'Chưa nhập thông tin [so_code]'],
		['type' => 'length',
			'field' => 'so_code',
			'message' => 'Thông tin [so_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'presence',
			'field' => 'so_date',
			'message' => 'Chưa nhập thông tin [so_date]'],
		['type' => 'presence',
			'field' => 'so_isused',
			'message' => 'Chưa nhập thông tin [so_isused]']
	];
//<ZoneC
	protected $_hasMany = ['Student_outcome_item'];
	public function beforeCreate($params, $opts = null)
	{
		$this->checkIsUsed($params);
	}

	public function beforeUpdate($params, $opts = null)
	{
		$this->checkIsUsed($params);
	}
	protected function checkIsUsed($params)
	{
		if ($params->so_isused){
			$item = $this->findOne([
					'so_isused'=>1,
					'edu_program_id' => $params->edu_program_id,
			]);
			if ($item && $item->so_id!=$params->so_id)
				throw new AException('Chỉ cho phép sử dụng một phiên bản Chuẩn đầu ra');
		}
	}
//ZoneC>
}