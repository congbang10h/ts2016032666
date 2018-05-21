<?php
//ID: e1c517da89fe2b4c273866c9872402f7
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Umi_peoi_map extends DBObject{
	protected $_table = 'umi_peoi_map';
	protected $_title = '';
	protected $_fields = [
		'upm_id'  => [DBO_AUTO, 'upm_id', NULL],
		'peoi_id' => [DBO_NUMB, 'peoi_id', NULL],
		'umi_id'  => [DBO_NUMB, 'umi_id', NULL],
		'pmv_id'  => [DBO_NUMB, 'pmv_id', NULL]
	];
	protected $_pkey = 'upm_id';
	protected $_fkeys = [//class=[fkey]
			'Univ_mission_item'       => ['umi_id'],
			'Peo_item'                => ['peoi_id'],
			'Peo_mission_map_version' => ['pmv_id']
		];
//<ZoneC
	public function mapping($params){
		$p = $params->items[0];
		$map = $this->findOne($item = [
				'peoi_id' => $p->peoi_id,
				'umi_id'  => $p->umi_id
		]);
		if ($map){
			$this->_destroy(['upm_id' => $map->upm_id],(object)['direct'=>1]);
		}else{
			$this->_create($item);
		}
		return ['success'=>1];
	}
//ZoneC>
}