<?php
//ID: 9e87f1f80450b7ba4229a2c44d3172cb
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course_outcome extends DBObject{
	protected $_table = 'course_outcome';
	protected $_title = '';
	protected $_fields = [
		'co_id'     => [DBO_AUTO, 'co_id', NULL],
		'course_id' => [DBO_NUMB, 'course_id', NULL],
		'co_code'   => [DBO_STRI, 'co_code', NULL],
		'co_date'   => [DBO_DATE, 'co_date', NULL],
		'co_isused' => [DBO_NUMB, 'co_isused', NULL]
	];
	protected $_pkey = 'co_id';
	protected $_fkeys = [//class=[fkey]
			'Course' => ['course_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Co_so_map'           => ['co_id'],
			'Course_outcome_item' => ['co_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'co_code',
			'message' => 'Chưa nhập thông tin [co_code]'],
		['type' => 'length',
			'field' => 'co_code',
			'message' => 'Thông tin [co_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'presence',
			'field' => 'co_date',
			'message' => 'Chưa nhập thông tin [co_date]'],
		['type' => 'presence',
			'field' => 'co_isused',
			'message' => 'Chưa nhập thông tin [co_isused]']
	];
//<ZoneC
	protected $_hasMany = ['Course_outcome_item'];
	public function beforeCreate($params, $opts = null)
	{
		$this->checkIsUsed($params);
	}

	public function beforeUpdate($params, $opts = null)
	{
		$this->checkIsUsed($params);
	}
	protected function checkIsUsed($params)
	{
		if ($params->co_isused){
			$item = $this->findOne([
				'co_isused'=>1,
				'course_id'=>$params->course_id
			]);
			if ($item && $item->co_id!=$params->co_id)
				throw new AException('Chỉ cho phép sử dụng một phiên bản Chuẩn đầu ra');
		}
	}
//ZoneC>
}