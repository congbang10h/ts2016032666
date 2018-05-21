<?php
class CCOItemMap extends Course_outcome_item{
	protected function _buildJoin(){
		parent::_buildJoin();
		$cc_id = 0;
		foreach($this->_aWhere as $i=>$it){
			if (preg_match("/cc_id/",$it)){
				unset($this->_aWhere[$i]);
				preg_match("/\\d+/",$it,$matches);
				$cc_id = $matches[0];
				$this->_aSelect[] = "IF(cc_id IS NULL,0,1) AS link";
				break;
			}
		}

		$this->_aLJoin['cco_map'] = "LEFT JOIN cco_map ON (cco_map.coi_id=course_outcome_item.coi_id AND cc_id=$cc_id)";
		$this->_aJoin['course_outcome'] = 'JOIN course_outcome ON (course_outcome.co_id=course_outcome_item.co_id AND co_isused)';

		$this->_aSelect[] = 'cco_desc';
	}
	public function _update($params, $opts=null, $flag=DB_CHK_FULL){
		if (empty($opts->cc_id))
			throw new AException('Thiếu tham số cc_id');
		if (empty($params->coi_id))
			throw new AException('Thiếu tham số coi_id');
		$mObj = new Cco_map();
		$map = $mObj->findOne([
			'cc_id'		=> $opts->cc_id,
			'coi_id'	=> $params->coi_id
		]);
		if ($params->link){
			if ($map){
				$mObj->_update([
					'cco_id'	=> $map->cco_id,
					'cco_desc'	=> $params->cco_desc
				],null,DB_CHK_NONE);
			}else{
				$mObj->_create([
					'cc_id'		=> $opts->cc_id,
					'coi_id'	=> $params->coi_id,
					'cco_desc'	=> $params->cco_desc
				]);
			}
		}elseif ($map){
			$mObj->_destroy(['cco_id'	=> $map->cco_id],(object)['direct'=>1]);
		}
	}
	public function mapping_coi_cc($params){
		$p = $params->items[0];
		$this->changeMapping($p->cc_id,$p->coi_id);
		return ['success'=>1];
	}
	public function changeMapping($cc_id,$coi_id,$cco_desc=''){
		$mObj = new Cco_map();
		$map = $mObj->findOne([
			'cc_id'		=> $cc_id,
			'coi_id'	=> $coi_id
		]);
		if ($map){
			$mObj->_destroy(['cco_id' => $map->cco_id],(object)['direct'=>1]);
		}else{
			$mObj->_create([
				'cc_id'		=> $cc_id,
				'coi_id'	=> $coi_id,
				'cco_desc'	=> $cco_desc
			]);
		}
	}
}