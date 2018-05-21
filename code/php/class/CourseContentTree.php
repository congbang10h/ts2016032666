<?php
class CourseContentTree extends Course_content{
	protected function beforeCreate($params,$opts=null){
		if (empty($params->course_parentcontent_id))
			$params->course_parentcontent_id = null;
	}
	protected function beforeUpdate($params,$opts=null){
		if (empty($params->course_parentcontent_id))
			$params->course_parentcontent_id = null;
	}
	public function _destroy($rec, $opts=null){
		$list = $this->findAll([
			'course_parentcontent_id' => $rec->course_content_id
		]);
		foreach($list as $cItem)
			$this->_destroy($cItem);
		parent::_destroy([
			'course_content_id' => $rec->course_content_id
		]);
	}
	public function read($params){
		return array(
			'success'=>1,
			'children'=>$this->_read($params)
		);
	}
	public function _read($params){
		if (!isset($params->filter) || count($params->filter)==0
			|| $params->filter[0]->property!='course_id')
			throw new AException('CourseContentTree cần có filter đầu tiên là '.
				'course_id');
		$course_id = $params->filter[0]->value;

		return $this->__getChild(null,$course_id);
	}
	private function __getChild($content_id,$course_id){
		$contents = $this->findAll([
			'course_id' => $course_id,
			'course_parentcontent_id' => $content_id
		],'course_content_order ASC');
		foreach ($contents as &$cItem) {
			$cItem->text = $cItem->course_content_name;
			$childs = $this->__getChild($cItem->course_content_id,$course_id);
			if (count($childs)){
				$cItem->leaf = false;
				$cItem->children = $childs;
			}else{
				$cItem->leaf = true;
			}
		}
		return $contents;
	}
}