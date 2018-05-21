<?php
//ID: c6ccc93e432df2bb79f0759b305203ae
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Qco_map extends DBObject{
	protected $_table = 'qco_map';
	protected $_title = '';
	protected $_fields = [
		'qco_id'      => [DBO_AUTO, 'qco_id', NULL],
		'coi_id'      => [DBO_NUMB, 'coi_id', NULL],
		'question_id' => [DBO_NUMB, 'question_id', NULL],
		'qco_factor'  => [DBO_NUMB, 'qco_factor', NULL]
	];
	protected $_pkey = 'qco_id';
	protected $_fkeys = [//class=[fkey]
			'Course_outcome_item' => ['coi_id'],
			'Question'            => ['question_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'qco_factor',
			'message' => 'Chưa nhập thông tin [qco_factor]']
	];
//<ZoneC
	public function mapping_coi_q($params){
		$p = $params->items[0];
		$map = $this->findOne($item = [
			'question_id' => $p->question_id,
			'coi_id'	=> $p->coi_id
		]);
		if ($map){
			$this->_destroy(['qco_id' => $map->qco_id],(object)['direct'=>1]);
		}else{
			$item['qco_factor'] = 1;
			$this->_create($item);
		}
		return ['success'=>1];
	}
//ZoneC>
}