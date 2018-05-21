<?php
class ContentQuestion extends Question{
	protected $_table = '_question_content';
	
	public function verifyAuthorize($id=0,$action='read'){
		//Lớp này không giới hạn phân quyền Question ở mức 2
	}
	public function _destroy($params,$opts=null){
		//Thao tác này không destroy thực sự mà là chuyển từ ContentQuestion
		//sang Library (xóa liên kết question-content)
		if (!isset($_SESSION[APP_ID]['lastContentId']))
			throw new AException('Chưa xác định Nội dung mặc định');
		if (!isset($params->question_id) || !$params->question_id)
			throw new AException('Chưa xác định Câu hỏi');
		$this->query(
			"CALL unmapQuestionContent(?,?)",
			$params->question_id,
			$_SESSION[APP_ID]['lastContentId']
		);
	}
}