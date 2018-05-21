<?php
require_once '../init.php';

try{
	if(isset($_POST['name']) && $_POST['name']){
		$ret = VXFile::upload(
			APP_DATA.'tmp/'.Authorise::getId().'/',
			$_POST['name'],
			isset($cfg['filetype'])?$cfg['filetype']:'');
		if (is_array($ret)){
			echo(json_encode(array(
				'success' => true,
				'info'  => $ret
			)));		
		}else
			throw new AException($ret,3016);
	}else
		throw new Exception('Không thấy file để tải lên máy chủ',3017);
}catch(Exception $e){
	echo(json_encode(array(
		'success' => 0,
		'msg'=>$e->getMessage()
	)));
}