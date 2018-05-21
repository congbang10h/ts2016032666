<?php
class TestSourceQuestion extends Question{
	protected $_table = 'question';
//	protected $_table = '_view_question_in_course';

	public function __construct($isChild=0){
		parent::__construct($isChild);
	}
	public function verifyAuthorize($id=0,$action='read'){
		//Lớp này không giới hạn phân quyền Question ở mức 2
	}
	public function _destroy($params, $opts=null){
		//Thao tác này không destroy thực sự mà là chuyển từ TestSourceQuestion
		//sang test-section (tao 1 test-section-item moi)
		$o = new Test_question_map();
		/** @noinspection PhpUndefinedFieldInspection */
		$o->_create([
			'editmode_question_id' => $params->question_id,
			'test_section_id' => $opts->test_section_id,
			'test_question_map_score' => 1
		]);
	}
	protected function _buildJoin(){
		parent::_buildJoin();
		$j = 'LEFT JOIN test_question_map X ON (question_id=editmode_question_id)'
			.'LEFT JOIN test_section Y ON (X.test_section_id=Y.test_section_id';
		foreach($this->_aWhere as $i=>$ws){
			if (preg_match("/test_id/",$ws)){
				$j .= " AND $ws";
				$this->_aWhere[$i] = 'test_id IS NULL';
			}
		}
		$this->_aLJoin['test'] = "$j)";
	}
	public function changescore($params){
		$info = $params->items[0];
		$o = new Test_question_map();
		$item = $o->findOne([
			'editmode_question_id' => $info->question_id,
			'test_section_id' => $info->test_section_id
		]);
		if (!$item) {
			$item = $o->findOne([
				'testmode_question_id' => $info->question_id,
				'test_section_id' => $info->test_section_id
			]);
		}
		if (!$item){
			Console::log("Not found ".var_export($info,1));
			return ['success'=>0];
		}
		$o->_update([
			'test_question_map_id' => $item->test_question_map_id,
			'test_question_map_score' => $info->score
		],null,DB_CHK_NONE);
		return ['success'=>1];
	}
}