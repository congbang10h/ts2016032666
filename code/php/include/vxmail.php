<?php
$pear = APP_DIR.'php/include/PEAR/';
require_once ($pear.'PEAR.php');
require_once ($pear.'Mail.php');
require_once ($pear.'Mail_Mime/mime.php');

/**
 * Send an email
 * return true if success, otherwise return error string
 */
function sendmail($to,$subject,$content,$attachs=null){
	global $cfg;
	$recipients = $to;
	$headers = array (
			'From'    => $cfg['mail']['from'],
			'To'      => $to,
			'Subject' => $subject);
	$m = new Mail();
	$smtp = $m->factory('smtp', array (
			'host' => $cfg['mail']['host'],
			'port' => $cfg['mail']['port'],
			'auth' =>true,
			'username' => $cfg['mail']['username'],
			'password' => $cfg['mail']['password']));
	$msg = new VMailMine($headers,$content,$attachs);
	//$msg = new Mail_mime();
	//$msg->_build_params['head_charset'] = 'UTF-8';
	//$msg->setTXTBody($content);

	$content = $msg->get();
	$headers = $msg->headers($headers);

	$mail = $smtp->send($recipients, $headers, $content);
	if (PEAuthorise::isError($mail))
		return $mail->getMessage();
	return true;
}

class VMailMine extends Mail_mime{
	/*
	 * $attachs = filepath
	 * $attachs = array(filepath1,filepath2,...)
	 * $attachs = array(attachname1=>filepath1,filepath2,...)
	 */
	public function VMailMine($headers,$html,$attachs=null,$images=null){
		$this->_build_params = array(
				'head_encoding' => 'quoted-printable',
				'text_encoding' => '7bit',
				'html_encoding' => 'quoted-printable',
				'7bit_wrap'     => 998,
				'html_charset'  => 'UTF-8',
				'text_charset'  => 'UTF-8',
				'head_charset'  => 'UTF-8'
		);
		$this->_headers = $headers;
		$this->setHTMLBody("$html");
		if ($attachs){
			if (is_array($attachs)){
				foreach ($attachs as $key => $f){
					if (is_numeric($key))
						$this->addAttachment($f);
					else
						$this->addAttachment($f,'application/octet-stream',$key);
				}
			}elseif (is_file($attachs))
				$this->addAttachment($attachs);
		}
		if ($images){
			if (is_file($images))
				$this->addHTMLImage($images);
			elseif (is_array($images)){
				foreach ($images as $f)
					$this->addHTMLImage($f);
			}
		}
	}
	//Dựa theo addHTMLImage của lớp mine nhưng thay đổi cách xác định
	//cid
    function addHTMLImage($file, $c_type='application/octet-stream',
                          $name = '', $isfile = true){
        $filedata = ($isfile === true) ? $this->_file2str($file)
                                           : $file;
        if ($isfile === true) {
            $filename = ($name == '' ? $file : $name);
        } else {
            $filename = $name;
        }
        if (PEAuthorise::isError($filedata)) {
            return $filedata;
        }
        $this->_html_images[] = array(
                                      'body'   => $filedata,
                                      'name'   => $filename,
                                      'c_type' => $c_type,
                                      'cid'    => $filename
                                     );
        return true;
    }
}
?>