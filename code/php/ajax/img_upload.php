<?php
require_once '../init.php';

try{
	if(isset($_POST['name']) && $_POST['name']){
		$ret = VXFile::upload(
			APP_DATA.'tmp/'.Authorise::getId().'/',
			$_POST['name'],
			isset($cfg['imgtype'])?$cfg['imgtype']:'');
		if (is_array($ret)){
			if (isset($_POST['limitwidth']) && isset($_POST['limitheight'])){
				VXImage::resize(
					$ret['path'],
					$_POST['limitwidth'],
					$_POST['limitheight'],0);
			}
			list($ret['width'],$ret['height'],) = getimagesize($ret['path']);
			echo(json_encode(array(
				'success' => true,
				'info'  => $ret
			)));
			die();		
		}else
			throw new Exception(var_export($ret,1), 3018);
	}else
		throw new Exception('Không thấy hình để tải lên máy chủ',3019);
}catch(Exception $e){
	echo(json_encode(array(
		'success' => 0,
		'msg'=>$e->getMessage()
	)));
}