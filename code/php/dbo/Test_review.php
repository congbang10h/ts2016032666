<?php
//ID: d088b691fc786915f6bc6cb1e58623ca
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Test_review extends DBObject{
	protected $_table = 'test_review';
	protected $_title = '';
	protected $_fields = [
		'test_review_id'        => [DBO_AUTO, 'test_review_id', NULL],
		'test_review_parent_id' => [DBO_NUMB, 'test_review_parent_id', NULL],
		'user_id'               => [DBO_NUMB, 'user_id', NULL],
		'test_id'               => [DBO_NUMB, 'test_id', NULL],
		'test_review_code'      => [DBO_NUMB, 'test_review_code', '0'],
		'test_review_desc'      => [DBO_STRI, 'test_review_desc', NULL],
		'test_review_time'      => [DBO_TIME, 'test_review_time', NULL]
	];
	protected $_pkey = 'test_review_id';
	protected $_fkeys = [//class=[fkey]
			'Test_review' => ['test_review_parent_id'],
			'User'        => ['user_id'],
			'Test'        => ['test_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Test_review' => ['test_review_parent_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'user_id',
			'message' => 'Chưa nhập thông tin [user_id]'],
		['type' => 'presence',
			'field' => 'test_id',
			'message' => 'Chưa nhập thông tin [test_id]'],
		['type' => 'length',
			'field' => 'test_review_desc',
			'message' => 'Thông tin [test_review_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	protected $_jfields	= array(
		'User'=>array('user_first_name','user_last_name')
	);
	public function verifyAuthorize($id=0,$action='read'){}
	public function beforeCreate($params,$opts=null){
		if (empty($params->test_review_parent_id))
			$params->test_review_parent_id = null;
		$params->user_id = Authorise::getId();
		$params->test_review_time = date('Y-m-d H:i:s');
	}
	protected function afterCreate($params,$opts=null){
		if ($params->test_review_code != RV_APPROVED)
			return;
		$sObj = new Test_section();
		$qObj = new Question();
		$mObj = new Test_question_map();
		$sList = $sObj->findAll(['test_id'=>$params->test_id]);
		foreach($sList as $sItem){
			$mList = $mObj->findAll(['test_section_id'=>$sItem->test_section_id]);
			foreach($mList as $mItem){
				$id = $qObj->_duplicate([
					'question_id' => $mItem->editmode_question_id,
					'question_in_test' => 1
				]);
				$mObj->_update([
					'test_question_map_id' => $mItem->test_question_map_id,
					'testmode_question_id' => $id,
					'editmode_question_id' => null
				], null, DB_CHK_NONE);
			}
		}
	}
//ZoneC>
}