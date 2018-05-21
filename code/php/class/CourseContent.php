<?php
class CourseContent extends DBObject{
	private function __get($id){
 		$stmt = $this->query(
 			"SELECT *\n".
 			"FROM `content`\n".
 			"WHERE content_id=?",
 			$id
		);
		return $stmt->fetchObject();
	}
	private function __createMap($rec){
		$this->query(
			"INSERT INTO course_content_map\n".
			"SET course_id=?, content_id=?, course_content_map_factor=?",
			$rec->course_id,
			$rec->content_id,
			$rec->course_factor
		);
	}
	private function __removeMap($rec){
		$this->query(
			"DELETE FROM course_content_map\n".
			"WHERE content_id=?",
			$rec->content_id
		);
	}
	protected function _remove(stdClass $rec){
		$old = $this->__get($rec->content_id);
		if ($old){
			if (!$old->parent_content_id)
				$this->__removeMap($old);
			$this->query(
				"DELETE FROM content\n".
				"WHERE content_id=?",
				$old->content_id
			);
		}
	}
	protected function _update(stdClass $rec){
		$old = $this->__get($rec->content_id);
		if (!$old){
			$this->_create($rec);
			return;
		}
		$this->query(
			"UPDATE `content`\n".
			"SET parent_content_id=?, content_name=?, ".
			"content_desc=?, content_order=?\n".
			"WHERE content_id=?",
			$rec->parent_content_id,
			$rec->content_name,
			$rec->content_desc,
			$rec->content_order,
			$rec->content_id
		);
		if ($old->parent_content_id && !$rec->parent_content_id){
			$this->__createMap($rec);
		}elseif (!$old->parent_content_id && $rec->parent_content_id){
			$this->__removeMap($rec);
		}
	}
	protected function _create(stdClass $rec){
		if ($this->__get($rec->content_id))
			throw new AException("Mã {$rec->content_id} đã tồn tại");
		if (strlen($rec->content_id)>20)
			throw new AException("Mã {$rec->content_id} dài quá 20 ký tự");
		
		$this->query(
			"INSERT INTO `content`\n".
			"SET content_id=?, parent_content_id=?, content_name=?, ".
			"content_desc=?, content_order=?",
			$rec->content_id,
			$rec->parent_content_id,
			$rec->content_name,
			$rec->content_desc,
			$rec->content_order
		);
		if (!$rec->parent_content_id){
			$this->__createMap($rec);
		}
	}
	public function read(stdClass $params){
		return array(
			'success'=>1,
			'children'=>$this->_read($params)
		);
	}
	protected function _read(stdClass $params){
		if (!isset($params->filter) || count($params->filter)==0
			|| $params->filter[0]->property!='course_id')
			throw new AException('CourseContent cần có filter đầu tiên là '.
				'course_id');
		$course_id = $params->filter[0]->value;
		$stmt = $this->query(
			"SELECT content_name as `text`, `content`.*, ".
				"course_content_map_factor as course_factor, course_id\n".
			"FROM `content` JOIN course_content_map USING(content_id)\n".
			"WHERE course_id=?\n".
			'ORDER BY content_order',
			$course_id
		);

		$contents = $stmt->fetchAll(PDO::FETCH_OBJ);
		foreach ($contents as &$ic) {
			$childs = $this->__getChild($ic->content_id,$course_id);
			if (count($childs)){
				$ic->leaf = false;
				$ic->children = $childs;
			}else{
				$ic->leaf = true;
			}
		}
		return $contents;
	}
	private function __getChild($content_id,$course_id){
		$stmt = $this->query(
			"SELECT content_name as `text`, `content`.*\n".
			"FROM `content`\n".
			"WHERE parent_content_id=?\n".
			'ORDER BY content_order',
			$content_id
		);
		$contents = $stmt->fetchAll(PDO::FETCH_OBJ);
		foreach ($contents as &$ic) {
			$ic->course_id = $course_id;
			$childs = $this->__getChild($ic->content_id);
			if (count($childs)){
				$ic->leaf = false;
				$ic->children = $childs;
			}else{
				$ic->leaf = true;
			}
		}
		return $contents;
	}
}