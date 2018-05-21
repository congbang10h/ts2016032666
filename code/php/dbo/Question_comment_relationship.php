<?php
//ID: dd72a43f7ae8abcf6e430906fc9705df
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Question_comment_relationship extends DBObject{
	protected $_table = 'question_comment_relationship';
	protected $_title = '';
	protected $_fields = [
		'question_comment_relationship_id'   => [DBO_AUTO, 'question_comment_relationship_id', NULL],
		'parent_question_comment_id'         => [DBO_NUMB, 'parent_question_comment_id', NULL],
		'child_question_comment_id'          => [DBO_NUMB, 'child_question_comment_id', NULL],
		'question_comment_relationship_desc' => [DBO_STRI, 'question_comment_relationship_desc', NULL]
	];
	protected $_pkey = 'question_comment_relationship_id';
	protected $_fkeys = [//class=[fkey]
			'Question_comment' => ['child_question_comment_id','parent_question_comment_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'question_comment_relationship_desc',
			'message' => 'Thông tin [question_comment_relationship_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}