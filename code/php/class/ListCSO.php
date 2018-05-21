<?php
class ListCSO extends DBObject{
	public function prepare($params){
		$params = $params->items[0];
		$edupro_id = $params->edu_program_id;

		$query = "CALL SO_map_column(:epid)";
		$res = $this->query($query,[
			'epid' => $edupro_id
		])->fetchAll(PDO::FETCH_OBJ);
		$column = [];
		foreach($res as $it){
			$column[] = [
				'name' => $it->name,
				'soi_id' => $it->soi_id,
				'soi_code' => $it->soi_code,
				'soi_desc_vn' => $it->soi_desc_vn,
				'soi_desc_en' => $it->soi_desc_en
			];
		}
		return [
			'success' => 1,
			'column' => $column
		];
	}
	public function read($params){
		$epid = 0;
		foreach($params->filter as $filter){
			if($filter->property=='edu_program_id')
				$epid = $filter->value;
		}
		if (!$epid)
			throw new AException('Thiếu filter edu_program_id');
		$c = new Program_course_map();
		$total = $c->countAll(['edu_program_id'=>$epid]);
		$query = "CALL C2SOI_map_pivot($epid)";
		$rows = $this->query($query)->fetchAll(PDO::FETCH_OBJ);
		return [
			'success' => 1,
			'total' => $total,
			'rows' => $rows
		];
	}
}