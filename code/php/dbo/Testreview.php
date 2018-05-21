<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class Testreview extends DBObject{
	protected $_table = 'testreview';
	protected $_title = '';
	protected $_fields = array(
		'test_review_id'       => array(DBO_AUTO, 'test_review_id', NULL),
		'user_id'              => array(DBO_NUMB, 'user_id', '0'),
		'test_id'              => array(DBO_NUMB, 'test_id', NULL),
		'test_review_comment'  => array(DBO_STRI, 'test_review_comment', NULL),
		'test_review_date'     => array(DBO_DATE, 'test_review_date', NULL),
		'test_review_approved' => array(DBO_NUMB, 'test_review_approved', NULL),
		'test_review_type'     => array(DBO_STRI, 'test_review_type', NULL)
	);
	protected $_keys = array('test_review_id');
	protected $_fkeys = array(//class=array(fkey,pkey)
			'Test' => array('test_id', 'test_id'),
			'User' => array('user_id', 'user_id')
		);
	protected $_validations = array(
		array('type' => 'length',
			'field' => 'test_review_comment',
			'message' => 'Thông tin [test_review_comment] dài hơn 65535 ký tự',
			'max' => 65535),
		array('type' => 'presence',
			'field' => 'test_review_type',
			'message' => 'Chưa nhập thông tin [test_review_type]'),
		array('type' => 'length',
			'field' => 'test_review_type',
			'message' => 'Thông tin [test_review_type] dài hơn 20 ký tự',
			'max' => 20)
	);
//BEGIN EDITABLE ZONE
    protected $_jfields	= array(
        'User'=>array('user_first_name','user_last_name')
    );
    public function verifyAuthorize($id=0,$action='read'){}
	public function beforeCreate($params,$opts=null){
		$params->user_id = Authorise::getId();
		$params->test_review_date = date('Y-m-d');
	}
//END EDITABLE ZONE
}