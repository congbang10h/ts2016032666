<?php

/**
 * Class CourseInEduPro
 * Sử dụng để liệt kê và chọn Course cho 1 chương trình đào tạo
 */
class CourseInEduPro extends Course{
	public $_jfields = [
		'Program_course_map' => ['*']
	];

	public function _update($params, $opts = null, $flag = DB_CHK_FULL)
	{
		$pcm = new Program_course_map();
		$item = $pcm->findOne([
			'course_id' => $params->course_id,
			'edu_program_id' => $params->edu_program_id
		]);
		if ($params->pcm_time_index){
			if ($item){
				$item->course_required_level_id = $params->course_required_level_id;
				$item->pcm_time_index = $params->pcm_time_index;
				$pcm->_update($item,null,DB_CHK_NONE);
			}else{
				$pcm->_create([
					'course_id' => $params->course_id,
					'edu_program_id' => $params->edu_program_id,
					'course_required_level_id' => $params->course_required_level_id,
					'pcm_time_index' => $params->pcm_time_index
				]);
			}
		}elseif ($item){
			$pcm->_destroy($item);
		}
		return ['success'=>1];
	}

	public function _buildJoin()
	{
		parent::_buildJoin(); // TODO: Change the autogenerated stub

		foreach($this->_aWhere as $i=>$cond){
			if (preg_match("/edu_program_id\\s=\\s'\\d+'/",$cond)){
				$this->_aLJoin['program_course_map'] = "LEFT JOIN `program_course_map` ON (`program_course_map`
		.`course_id`=`course`.`course_id` AND $cond)";
				unset($this->_aWhere[$i]);
				break;
			}
		}
	}
}