<?php
class MappingPEO2UM extends DBObject{
	public function prepare($params){
		$params = $params->items[0];
		$edupro_id = $params->edu_program_id;

		$query = "CALL pivotUMColumn(:epid)";
		$res = $this->query($query,[
			'epid' => $edupro_id
		])->fetchAll(PDO::FETCH_OBJ);
		$column = [];
		foreach($res as $it){
			$column[] = [
				'name' => $it->name,
				'umi_id' => $it->umi_id,
				'umi_code' => $it->umi_code,
				'umi_desc_vn' => $it->umi_desc_vn,
				'umi_desc_en' => $it->umi_desc_en
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
		$peoCls = new Peo();
		$peo = $peoCls->findOne([
			'edu_program_id' => $epid,
			'peo_isused' => 1
		]);
		$peoi = new Peo_item();
		$total = $peoi->countAll(['peo_id'=>$peo->peo_id]);
		$query = "CALL pivotUMTableByPEO($peo->peo_id,$epid)";
		$rows = $this->query($query)->fetchAll(PDO::FETCH_OBJ);
		return [
			'success' => 1,
			'total' => $total,
			'rows' => $rows
		];
	}
}