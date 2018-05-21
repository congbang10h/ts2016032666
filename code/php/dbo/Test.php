<?php
//ID: 638318686e480bddd32b3c33825cd465
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Test extends DBObject{
	protected $_table = 'test';
	protected $_title = '';
	protected $_fields = [
		'test_id'            => [DBO_AUTO, 'test_id', NULL],
		'course_id'          => [DBO_NUMB, 'course_id', NULL],
		'user_id'            => [DBO_NUMB, 'user_id', NULL],
		'test_code'          => [DBO_STRI, 'test_code', NULL],
		'test_header'        => [DBO_STRI, 'test_header', NULL],
		'test_footer'        => [DBO_STRI, 'test_footer', NULL],
		'test_desc'          => [DBO_STRI, 'test_desc', NULL],
		'test_creation_time' => [DBO_TIME, 'test_creation_time', NULL],
		'test_start_time'    => [DBO_TIME, 'test_start_time', NULL],
		'test_end_time'      => [DBO_TIME, 'test_end_time', NULL],
		'test_duration'      => [DBO_NUMB, 'test_duration', NULL]
	];
	protected $_pkey = 'test_id';
	protected $_fkeys = [//class=[fkey]
			'User'   => ['user_id'],
			'Course' => ['course_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Taker_test_map'   => ['test_id'],
			'Test_access_mode' => ['test_id'],
			'Test_review'      => ['test_id'],
			'Test_section'     => ['test_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'test_code',
			'message' => 'Chưa nhập thông tin [test_code]'],
		['type' => 'length',
			'field' => 'test_code',
			'message' => 'Thông tin [test_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'presence',
			'field' => 'test_header',
			'message' => 'Chưa nhập thông tin [test_header]'],
		['type' => 'length',
			'field' => 'test_header',
			'message' => 'Thông tin [test_header] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'test_footer',
			'message' => 'Chưa nhập thông tin [test_footer]'],
		['type' => 'length',
			'field' => 'test_footer',
			'message' => 'Thông tin [test_footer] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'length',
			'field' => 'test_desc',
			'message' => 'Thông tin [test_desc] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'test_start_time',
			'message' => 'Chưa nhập thông tin [test_start_time]'],
		['type' => 'presence',
			'field' => 'test_end_time',
			'message' => 'Chưa nhập thông tin [test_end_time]'],
		['type' => 'presence',
			'field' => 'test_duration',
			'message' => 'Chưa nhập thông tin [test_duration]']
	];
//<ZoneC
	protected $_jfields	= [
		'User'=>['user_first_name','user_last_name'],
		'Course' => ['course_name_vn','course_code'],
		'Test_review' => ['test_review_code:max']
	];
	public function beforeCreate($p,$opts=null){
		$p->user_id = Authorise::getId();
		if (!$p->user_id)
			throw new AException('Bạn cần đăng nhập để sử dụng được chức năng này');
		$p->test_creation_time = date('Y-m-d H:m:s');
	}
	public function dtrand($params){
		$params=$params->items[0];
		if (empty($params->test_id))
			throw new AException('Chưa xác định đề thi');
		if (empty($params->number_question))
			throw new AException('Chưa xác định số lượng câu hỏi');
		$result = DBObject::query(
				'CALL createRandTest(?,?,?)',
				$params->test_id,
				$params->number_question,
				$params->overwrite
		)->fetchObject();
		if ($result->msg==$params->number_question)
			return ['success'=>1];
		else
			return [
				'success'=>0,
				'message'=>$result->msg
			];
	}
//ZoneC>
}