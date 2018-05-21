<?php
class UserForShare extends DBObject{
	protected $_table = '_user_for_share';
	protected $_title = '';
	protected $_fields = array(
		'uid'  => array(DBO_STRI, 'user_id', NULL),
		'fullname' => array(DBO_STRI, 'fullname', NULL),
		'roles'    => array(DBO_STRI, 'roles', NULL)
	);
	protected $_keys = array('uid');
}