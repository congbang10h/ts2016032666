<?php
class VXFile{
	public static function createTrail($path){
		if (substr($path,-1)!='/' && substr($path,-1)!='\\')
			$path .= '/';
		return $path;
	}
	public static function cleanDir($dir){
		$files = glob($dir.'*');
		foreach($files as $file){
			if(is_file($file))
				@unlink($file);
		}
	}
	public static function copyDir($from,$to){
		$from = self::createTrail($from);
		$to = self::createTrail($to);
		$files = glob($from.'*');
		$length = strlen($from);
		foreach($files as $file){
			if(is_file($file)){
				if (@copy($file,$to.substr($file,$length))===false)
					throw new AException("Lỗi khi chép thư mục $from", 1);
			}
		}
	}
	public static function moveDir($from,$to){
		$files = glob($from.'*');
		$length = strlen($from);
		foreach($files as $file){
			if(is_file($file)){
				@rename($file,$to.substr($file,$length));
			}
		}
	}
	public static function tempdir($base,$prefix){
		$fpath = tempnam($base,$prefix);
		if (file_exists($fpath))
			unlink($fpath);
		@mkdir($fpath,0700);
		if (DIRECTORY_SEPARATOR=='\\')
			$fpath = str_replace('\\', '/', $fpath);
		if (is_dir($fpath) && strpos($fpath, $base)===0)
			return $fpath;
		return false;
	}
	public static function tempname($base,$ext){
		$fname = $base.time();
		if (is_file("$fname.$ext")){
			for ($i=2;is_file("$fname$i.$ext");$i++);
			return "$fname$i.$ext";
		}
		return "$fname.$ext";
	}
	public static function getext($filename){
		$s = pathinfo($filename,PATHINFO_EXTENSION);
		return $s ? $s: '';
	}
	public static function getnamenoext($filename){
		$a = explode('.', $filename);
		$len = count($a)-1;
		if ($len && $a[0]!=''){
			unset($a[$len]);
			return implode('.', $a);
		}
		return $filename;
	}
	/**
	 * return bool
	 * Check if file type is in $support list (return true) or not (return false)
	 * $support is a list in lower case, each file type seperate by a space
	 */
	public static function validtype($ext,$support){
		return strpos($support,$ext)===false?false:true;
	}
	public static function getname($filepath){
		$r = explode('/',$filepath);
		return $r[count($r)-1];
	}
	private static function handleUploadError($errcode){
		$PMSIZE = ini_get('post_max_size');
		$mul = substr($PMSIZE, -1);
		$mul = ($mul == 'M' ? 1048576 
			: ($mul == 'K' ? 1024 : ($mul == 'G' ? 1073741824 : 1)));
		if ($_SERVER['CONTENT_LENGTH'] > $mul*(int)$PMSIZE && $PMSIZE){
			$realsize = VXFile::formatSize($_SERVER['CONTENT_LENGTH']);
			throw new Exception("Bạn upload nội dung có độ lớn là $realsize.".
				' Website không hỗ trợ file lớn hơn '.$PMSIZE.'B', 3022);
		}
		$UE = array(
			-1=>'Lỗi không xác định',
		    0=>'Không có lỗi gì hết',
		    1=>'Website không hỗ trợ file lớn hơn '.ini_get('upload_max_filesize').'B',
		    2=>'Website không hỗ trợ file lớn hơn MAX_FILE_SIZE thiết lập trong HTML form' ,
		    3=>'File chỉ upload được một phần.\\nCó thể do nội dung upload quá lớn so với bộ nhớ khả dụng',
		    4=>'Không có file nào được upload',
		    6=>'Không có thư mục tạm để upload'
		);
		return isset($UE[$errcode])?$UE[$errcode]:$UE[-1];
	}
	public static function clearTmp($nday=3){
		$cdir = getcwd();
		chdir(APP_DATA.'tmp/'.Authorise::getId());
		$t = time() - $nday * 24 * 60 * 60;
		foreach (glob("*") as $filename) {
			if (filemtime($filename) < $t)
				@unlink($filename);
		}
		chdir($cdir);
	}

	/**
	 * Save a file uploaded from an input file type
	 *
	 * @param string $basedir
	 * @param string $inputname
	 * @param string $support
	 * @return string /array('path','name','size','type')
	 * @throws Exception
	 */
	public static function upload($basedir, $inputname, $support=''){
		VXFile::clearTmp();
		$of = &$_FILES[$inputname];
		if(empty($of) || empty($of["name"])
			|| empty($of["size"]) || $of["tmp_name"]=="none"){
		}else{
			$name = $of['name'];
			$ext  = VXFile::getext($name);
			if ($support && !VXFile::validtype($ext, $support)){
				throw new Exception('Chỉ hỗ trợ các loại file sau: '.$support,
					3023);
			}
			$tmp  = $of['tmp_name'];
			$name = VXFile::tempname($basedir."tmp",$ext);
			if (@move_uploaded_file($tmp, $name)){
				return array(
					'path'=>$name,
					'name'=>$of['name'],
					'url'=>'data/'.substr($name, strlen(APP_DATA)),
					'size'=>$of["size"],
					'type'=>$ext
				);
			}
		}
		return VXFile::handleUploadError($of['error']);
	}
	public static function formatSize($size){
		$units = array(' B', ' KB', ' MB', ' GB', ' TB');
		for ($i = 0; $size > 1024; $i++) { $size /= 1024; }
		return round($size, 2).$units[$i];
	}
}
