<?php
require_once '../init.php';
$result = array(
	'success'=>0,
	'items'=>array()
);
if (Authorise::getId()==0){
	echo json_encode($result);
	die();
}

$basedir = 'tmp/'.Authorise::getId();
if (!is_dir(APP_DATA.$basedir))
	@mkdir(APP_DATA.$basedir,0700,1);
if (chdir(APP_DATA.$basedir)){
	foreach(glob('*.*') as $filename){
		$result['items'][] = array(
	       'name'=>$filename,
	       'url'=>"data/$basedir/$filename",
	       'size'=>filesize($filename),
	       'lastmod'=>filemtime($filename)
		);
	}
	$result['success'] = 1;
}else{
	$result['error'] = "Không tìm được folder DATA/$basedir";
}
echo json_encode($result);