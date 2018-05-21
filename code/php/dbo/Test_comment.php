<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Test_comment extends DBObject{
	protected $_table = '';
	protected $_title = '';
	protected $_fields = [
	];
	protected $_hasRef = [//class=[fkey]
			'Test_comment_relationship' => ['child_test_comment_id','parent_test_comment_id']
		];
//<ZoneC

//ZoneC>
}