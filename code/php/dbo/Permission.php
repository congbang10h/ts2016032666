<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class Permission extends DBObject{
	protected $_table = 'permission';
	protected $_title = '';
	protected $_fields = array(
		'permission_id'    => array(DBO_AUTO, 'permission_id', NULL),
		'permission_name'  => array(DBO_STRI, 'permission_name', NULL),
		'permission_value' => array(DBO_NUMB, 'permission_value', NULL),
		'permission_desc'  => array(DBO_STRI, 'permission_desc', NULL)
	);
	protected $_keys = array('permission_id');
	protected $_hasRef = array(//class=array(fkey,pkey)
			'Role_permission_map' => array('permission_id', 'permission_id')
		);
	protected $_validations = array(
		array('type' => 'presence',
			'field' => 'permission_name',
			'message' => 'Chưa nhập thông tin [permission_name]'),
		array('type' => 'length',
			'field' => 'permission_name',
			'message' => 'Thông tin [permission_name] dài hơn 255 ký tự',
			'max' => 255),
		array('type' => 'presence',
			'field' => 'permission_value',
			'message' => 'Chưa nhập thông tin [permission_value]'),
		array('type' => 'length',
			'field' => 'permission_desc',
			'message' => 'Thông tin [permission_desc] dài hơn 65535 ký tự',
			'max' => 65535)
	);
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
}
?>