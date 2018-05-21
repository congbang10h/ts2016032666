<?php
class VXImage{	
	public static function size($path,$maxw,$maxh){
		list($width, $height,) = getimagesize($path);
		$wr = $maxw/$width;
		$hr = $maxh/$height;
		$ratio = $wr<$hr?$wr:$hr;
		$nw = floor($width*$ratio);
		$nh = floor($height*$ratio);
		return array($nw,$nh);
	}
	/**
	 * Tao ra hinh anh thumbnail cua 1 file hinh (gif, jpg, png, bmp)
	 *
	 * @param string $src
	 * @param int $maxw
	 * @param int $maxh
	 * @param bool $full Hình đích có kích thước chính xác ($maxw,$maxh), các
	 * 					chiều không đủ kích thước được điền màu trắng
	 * @return false/string
	 */
	public static function resize($src,$maxw,$maxh,$full=1,$dst=null){
		list($width, $height,$type) = getimagesize($src);
		$wr = $maxw/$width;
		$hr = $maxh/$height;
		$ratio = $wr<$hr?$wr:$hr;
		$nw = floor($width*$ratio);
		$nh = floor($height*$ratio);
		if ($full){
			$nx = floor(($maxw-$nw)/2);
			$ny = floor(($maxh-$nh)/2);
			$rw = $maxw;
			$rh = $maxh;
		}else{
			$nx = $ny = 0;
			$rw = $nw;
			$rh = $nh;
		}
		if ($nw>$width) {
			$nw = $rw = $width;
			$nx = 0;
		}
		if ($nh>$height) {
			$nh = $rh = $height;
			$ny = 0;
		}
		$thumb = imagecreatetruecolor($rw,$rh);
		$im = false;
		switch ($type){
			case IMAGETYPE_GIF:
				$im = @imagecreatefromgif($src);
				break;
			case IMAGETYPE_JPEG:
			case IMAGETYPE_JPEG2000:
				$im = @imagecreatefromjpeg($src);
				break;
			case IMAGETYPE_PNG:
				$im = @imagecreatefrompng($src);
				break;
		}
		if (!$im)
			return false;
		if ($nx || $ny){
			$white = imagecolorallocate($thumb, 255, 255, 255);
			imagefilledrectangle($thumb, 0, 0, $nw, $nh, $white);
		}
		imagecopyresized($thumb,$im,$nx,$ny,0,0,$nw,$nh,$width,$height);
		if (!$dst)
			$dst = $src;
		$ret = false;
		switch ($type){
			case IMAGETYPE_GIF:
				$ret = @imagegif($thumb,$dst);
				break;
			case IMAGETYPE_JPEG:
			case IMAGETYPE_JPEG2000:
				$ret = @imagejpeg($thumb,$dst);
				break;
			case IMAGETYPE_PNG:
				$ret = @imagepng($thumb,$dst);
				break;
		}
		return $ret ? $dst : false;
	}
}