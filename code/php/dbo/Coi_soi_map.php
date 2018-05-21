<?php
//ID: e3135376e84336fcb5e6c8f3492f4901
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Coi_soi_map extends DBObject{
	protected $_table = 'coi_soi_map';
	protected $_title = '';
	protected $_fields = [
		'csim_id'    => [DBO_AUTO, 'csim_id', NULL],
		'coi_id'     => [DBO_NUMB, 'coi_id', NULL],
		'csom_id'    => [DBO_NUMB, 'csom_id', NULL],
		'soi_id'     => [DBO_NUMB, 'soi_id', NULL],
		'csim_level' => [DBO_STRI, 'csim_level', NULL]
	];
	protected $_pkey = 'csim_id';
	protected $_fkeys = [//class=[fkey]
			'Course_outcome_item'  => ['coi_id'],
			'Student_outcome_item' => ['soi_id'],
			'Co_so_map'            => ['csom_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'csim_level',
			'message' => 'Chưa nhập thông tin [csim_level]'],
		['type' => 'length',
			'field' => 'csim_level',
			'message' => 'Thông tin [csim_level] dài hơn 1 ký tự',
			'max' => 1]
	];
//<ZoneC
	public function mapping($params)
	{
		$p = $params->items[0];
		$m = $this->findOne($item=[
			'coi_id' => $p->coi_id,
			'soi_id' => $p->soi_id,
		]);
		if ($m){
			$m->csim_level = $p->bloom;
			$this->_update($m,null,DB_CHK_NONE);
		}else{
			$item['csim_level'] = $p->bloom;
			$this->_create($item);
		}
		return ['success'=>1];
	}
//ZoneC>
}