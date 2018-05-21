<?php
//ID: a6840e47102770f356d4382485a9eebc
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Question_content_map extends DBObject{
	protected $_table = 'question_content_map';
	protected $_title = '';
	protected $_fields = [
		'question_content_map' => [DBO_AUTO, 'question_content_map', NULL],
		'question_id'          => [DBO_NUMB, 'question_id', NULL],
		'course_content_id'    => [DBO_NUMB, 'course_content_id', NULL]
	];
	protected $_pkey = 'question_content_map';
	protected $_fkeys = [//class=[fkey]
			'Course_content' => ['course_content_id'],
			'Question'       => ['question_id']
		];
//<ZoneC
	public function mapping_cc_q($params){
		$p = $params->items[0];
		$item = [
			'question_id' => $p->question_id,
			'course_content_id' => $p->course_content_id
		];

		//Đây là trường hợp 1 câu hỏi có thể thuộc nhiều nội dung
		if (0) {
			$o = $this->findOne($item);

			if ($o)
				$this->_destroy($o);
			else
				$this->_create($o);
		}
		//Đây là trường hợp 1 câu hỏi chỉ thuộc một nội dung
		$o  = new Question();
		$o->_updateMapping($item);

		return ['success'=>1];
	}
//ZoneC>
}