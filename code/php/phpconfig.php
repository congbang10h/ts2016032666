<?php
$cfg['debug'] = 1;
$cfg['checkpass'] = 1;
$cfg['registeractive'] = 0;

//Cấu hình các vấn đề về user
$cfg['user'] = array(
	'log' => 0//[0,1] Kiem soat login/logout/agent cua user
);

//Cấu hình các kiểu báo lỗi của hệ thống
$cfg['error'] = array(
	//Có thông báo lỗi ra ngoài client
	'msg' => E_ALL & ~E_STRICT & ~E_WARNING & ~E_NOTICE & ~E_DEPRECATED,
	//Ghi chú lỗi ra file log
	'log' => E_ALL
);

//Cấu hình DBObject
$cfg['dbo'] = array(
	'join' => array(
		'fullname' => 0,//0=simple field name, 1=field name with table name prefix
		'deep' => 1
	)
);

//Cấu hình việc log các query
$cfg['sqllog'] = array(
	'target' => L_CONSOLE,//L_DISABLE L_CONSOLE L_FILE,
	'type'	 => LT_ALL,//LT_QUERY LT_CHANGE LT_ALL
	'filter' => array(
		'have' => '/xdebug/',
		'nohave' => '/(_userlog)|(DISTINCT)/'
	),
	'trace' => 0
);

//Cấu hình các loại file chấp nhận khi upload hình/file
$cfg['imgtype'] = 'jpg bmp png gif';
$cfg['filetype'] = 'txt rid';
