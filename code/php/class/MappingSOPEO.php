<?php
class MappingSOPEO extends DBObject{
	public function prepare($params){
		$params = $params->items[0];
		$edupro_id = $params->edu_program_id;

		$query = "CALL PEO_map_column(:epid)";
		$res = $this->query($query,[
			'epid' => $edupro_id
		])->fetchAll(PDO::FETCH_OBJ);
		$column = [];
		foreach($res as $it){
			$column[] = [
				'name' => $it->name,
				'peoi_id' => $it->peoi_id,
				'peoi_code' => $it->peoi_code,
				'peoi_desc_vn' => $it->peoi_desc_vn,
				'peoi_desc_en' => $it->peoi_desc_en
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
		$soCls = new Student_outcome();
		$so = $soCls->findOne([
			'edu_program_id' => $epid,
			'so_isused' => 1
		]);
		$coi = new Student_outcome_item();
		$total = $coi->countAll(['so_id'=>$so->so_id]);
		$query = "CALL SOI2PEOI_map_pivot($so->so_id,$epid)";
		$rows = $this->query($query)->fetchAll(PDO::FETCH_OBJ);
		return [
			'success' => 1,
			'total' => $total,
			'rows' => $rows
		];
	}
}