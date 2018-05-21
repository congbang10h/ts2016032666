<?php
//ID: a985681e1fe5320ade82309661fc64ad
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Peoi_soi_map extends DBObject{
	protected $_table = 'peoi_soi_map';
	protected $_title = '';
	protected $_fields = [
		'psmi_id' => [DBO_AUTO, 'psmi_id', NULL],
		'soi_id'  => [DBO_NUMB, 'soi_id', NULL],
		'psm_id'  => [DBO_NUMB, 'psm_id', NULL],
		'peoi_id' => [DBO_NUMB, 'peoi_id', NULL]
	];
	protected $_pkey = 'psmi_id';
	protected $_fkeys = [//class=[fkey]
			'Peo_item'             => ['peoi_id'],
			'Student_outcome_item' => ['soi_id'],
			'Peo_so_map'           => ['psm_id']
		];
//<ZoneC
	public function mapping($params)
	{
		$p = $params->items[0];
		$m = $this->findOne($item=[
				'peoi_id' => $p->peoi_id,
				'soi_id' => $p->soi_id,
		]);
		if ($m){
			$this->_destroy($m,(object)['direct'=>1]);
		}else{
			$this->_create($item);
		}
		return ['success'=>1];
	}
//ZoneC>
}