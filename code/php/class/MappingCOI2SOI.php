<?php
class MappingCOI2SOI extends DBObject{
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
		$co_id = 0;
		$epid = 0;
		foreach($params->filter as $filter){
			if ($filter->property=='co_id')
				$co_id = $filter->value;
			elseif($filter->property=='edu_program_id')
				$epid = $filter->value;
		}
		if (!$co_id||!$epid)
			throw new AException('Thiếu filter co_id hoặc edu_program_id');
		$coi = new Course_outcome_item();
		$total = $coi->countAll(['co_id'=>$co_id]);
		$query = "CALL COI2SOI_map_pivot($co_id,$epid)";
		$rows = $this->query($query)->fetchAll(PDO::FETCH_OBJ);
		return [
			'success' => 1,
			'total' => $total,
			'rows' => $rows
		];
	}
}