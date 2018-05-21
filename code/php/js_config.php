<?php
require_once 'init.php';
header('Content-Type: application/javascript');
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

/** @noinspection PhpUndefinedVariableInspection */
$js = array(
	'debug' => $cfg['debug'],
	'succesMessage' => 0,//Hiển thị thông báo mỗi khi thêm/sửa thành công
	'uploadSize'=>ini_get('upload_max_filesize'),
	'postSize'=>ini_get('post_max_size')
);
?>
VX.config = <?php echo json_encode($js); ?>;
VX.user = <?php echo json_encode($_SESSION[APP_ID]['user'])?>;