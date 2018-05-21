<?php
class QuestionLibrary extends DBObject{
	protected $_table = '_question_library';
	
	//Copy from php/dbo/Question.php
	protected $_fields = [
		'question_id'      => [DBO_AUTO, 'question_id', NULL],
		'question_type_id' => [DBO_NUMB, 'question_type_id', NULL],
		'user_id'          => [DBO_NUMB, 'user_id', NULL],
		'bloom_level_id'   => [DBO_NUMB, 'bloom_level_id', NULL],
		'question_desc'    => [DBO_STRI, 'question_desc', NULL],
		'question_in_test' => [DBO_NUMB, 'question_in_test', NULL]
	];
	protected $_pkey = 'question_id';
	protected $_fkeys = [//class=[fkey]
		'User'               => ['user_id'],
		'Bloom_level'        => ['bloom_level_id'],
		'Question_type_dict' => ['question_type_id']
	];
	protected $_hasRef = [//class=[fkey]
		'Qgroup_question_map'        => ['question_id'],
		'Qsolution'                  => ['question_id'],
		'Question_access_mode'       => ['question_id'],
		'Question_comment'           => ['question_id'],
		'Question_content_map'       => ['question_id'],
		'Question_courseoutcome_map' => ['question_id'],
		'Question_info'              => ['question_id'],
		'Question_item'              => ['question_id'],
		'Question_taker_comment'     => ['question_id'],
		'Question_topic_map'         => ['question_id'],
		'Taker_solution'             => ['question_id'],
		'Test_question_map'          => ['editmode_question_id','testmode_question_id']
	];
	protected $_hasMany = ['Qsolution','Question_info','Question_item'];
	protected $_jfields	= [
		'User'=>['user_first_name','user_last_name'],
		'Question_type_dict'=>['question_type_code'],
		'Bloom_level'        => ['bloom_level_desc'],
	];
	public function verifyAuthorize($id=0,$action='read'){
		//Lớp này không giới hạn phân quyền Question ở mức 2
	}
	public function _destroy($params,$opts=null){
		//Thao tác này không destroy thực sự mà là chuyển từ library sang
		//ContentQuestion
		if (!isset($_SESSION[APP_ID]['lastContentId']))
			throw new AException('Chưa xác định Nội dung mặc định');
		if (!isset($params->question_id) || !$params->question_id)
			throw new AException('Chưa xác định Câu hỏi');
		$this->query(
			"CALL mapQuestionContent(?,?)",
			$params->question_id,
			$_SESSION[APP_ID]['lastContentId']
		);
	}
}