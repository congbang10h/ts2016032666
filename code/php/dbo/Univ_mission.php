<?php
//ID: 74f3d0ea05706c1b3658e03ad3abe201
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Univ_mission extends DBObject{
	protected $_table = 'univ_mission';
	protected $_title = '';
	protected $_fields = [
		'um_id'     => [DBO_AUTO, 'um_id', NULL],
		'univ_id'   => [DBO_NUMB, 'univ_id', NULL],
		'um_code'   => [DBO_STRI, 'um_code', NULL],
		'um_date'   => [DBO_DATE, 'um_date', NULL],
		'um_isused' => [DBO_NUMB, 'um_isused', NULL]
	];
	protected $_pkey = 'um_id';
	protected $_fkeys = [//class=[fkey]
			'University' => ['univ_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Peo_mission_map_version' => ['umv_id'],
			'Univ_mission_item'       => ['um_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'um_code',
			'message' => 'Chưa nhập thông tin [um_code]'],
		['type' => 'length',
			'field' => 'um_code',
			'message' => 'Thông tin [um_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'presence',
			'field' => 'um_date',
			'message' => 'Chưa nhập thông tin [um_date]'],
		['type' => 'presence',
			'field' => 'um_isused',
			'message' => 'Chưa nhập thông tin [um_isused]']
	];
//<ZoneC
	protected $_jfields	= ['University'=>['univ_name_vn']];
	protected $_hasMany = ['Univ_mission_item'];
	protected function _updateChild($params){
		$pkey = $params->{$this->_pkey};
		$items = $params->_hasChild->Univ_mission_item;
		$obj = new Univ_mission_item();
		$obj->_destroy([
				'um_id' => $pkey
		]);
		foreach($items as $item){
			$item->um_id = $pkey;
			$obj->_create($item);
		}
	}
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
		if ($params->um_isused){
			$item = $this->findOne([
					'um_isused'=>1,
					'univ_id' => $params->univ_id,
			]);
			if ($item && $item->um_id!=$params->um_id)
				throw new AException('Chỉ cho phép sử dụng một phiên bản Sứ mệnh');
		}
	}
//ZoneC>
}