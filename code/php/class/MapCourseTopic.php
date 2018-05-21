<?php
class MapCourseTopic extends Course{
	public function __construct(){
		parent::__construct();
		$this->_jfields['Course_topic_map']	= ['topic_id:max=_has_link'];
	}
	public function verifyAuthorize($id=0,$action='read'){
		//Lớp này không giới hạn phân quyền Question ở mức 2
	}
	public function _update($params,$opts=null){
		$mapObj = new Course_topic_map();
		$row = [
			'topic_id' => $params->itemid,
			'course_id' => $params->groupid
		];
		if ($mapObj->findOne($row))
			$mapObj->_destroy($row);
		else
			$mapObj->_create($row);
	}
	public function _create($params,$opts=null){
		$mapObj = new Course_topic_map();
		foreach($params->itemid as $iid){
			$row = [
				'topic_id' => $iid,
				'course_id' => $params->groupid
			];
			if (!$mapObj->findOne($row))
				$mapObj->_create($row);
		}
	}
	protected function _buildJoin(){
		parent::_buildJoin();
		$j = 'LEFT JOIN `course_topic_map` ON (`course_topic_map`.'.
			'`course_id`=`course`.`course_id`';
		foreach($this->_aWhere as $i=>$ws){
			if (preg_match("/inside/",$ws)){
				$j .= ' AND '.str_replace('inside','topic_id',$ws);
				$this->_aWhere[$i] = 'topic_id IS NOT NULL';
			}elseif (preg_match("/outside/",$ws)){
				$j .= ' AND '.str_replace('outside','topic_id',$ws);
				$this->_aWhere[$i] = 'topic_id IS NULL';
			}elseif (preg_match("/hasitem/",$ws)){
				$j .= ' AND '.str_replace('hasitem','topic_id',$ws);
				unset($this->_aWhere[$i]);
			}
		}
		$this->_aLJoin['course_topic_map'] = "$j)";
	}
}