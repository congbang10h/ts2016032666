<?php
//ID: 7698882392e35f8fbd9512792dbeba36
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Peo extends DBObject{
	protected $_table = 'peo';
	protected $_title = '';
	protected $_fields = [
		'peo_id'         => [DBO_AUTO, 'peo_id', NULL],
		'edu_program_id' => [DBO_NUMB, 'edu_program_id', NULL],
		'peo_code'       => [DBO_STRI, 'peo_code', NULL],
		'peo_date'       => [DBO_DATE, 'peo_date', NULL],
		'peo_isused'     => [DBO_NUMB, 'peo_isused', NULL]
	];
	protected $_pkey = 'peo_id';
	protected $_fkeys = [//class=[fkey]
			'Educational_program' => ['edu_program_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Peo_item'                => ['peo_id'],
			'Peo_mission_map_version' => ['peo_version_id'],
			'Peo_so_map'              => ['peo_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'peo_code',
			'message' => 'Chưa nhập thông tin [peo_code]'],
		['type' => 'length',
			'field' => 'peo_code',
			'message' => 'Thông tin [peo_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'presence',
			'field' => 'peo_date',
			'message' => 'Chưa nhập thông tin [peo_date]'],
		['type' => 'presence',
			'field' => 'peo_isused',
			'message' => 'Chưa nhập thông tin [peo_isused]']
	];
//<ZoneC
	protected $_hasMany = ['Peo_item'];
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
		if ($params->peo_isused){
			$item = $this->findOne([
					'peo_isused'=>1,
					'edu_program_id' => $params->edu_program_id,
			]);
			if ($item && $item->peo_id!=$params->peo_id)
				throw new AException('Chỉ cho phép sử dụng một phiên bản Chuẩn đầu ra');
		}
	}
//ZoneC>
}