<?php
//ID: 3fb1a30b77c2e5a52afeee7d5cea38d4
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class User extends DBObject{
	protected $_table = 'user';
	protected $_title = '';
	protected $_fields = [
		'user_id'         => [DBO_AUTO, 'user_id', NULL],
		'user_code'       => [DBO_STRI, 'user_code', NULL],
		'user_first_name' => [DBO_STRI, 'user_first_name', NULL],
		'user_last_name'  => [DBO_STRI, 'user_last_name', NULL],
		'user_email'      => [DBO_STRI, 'user_email', NULL],
		'user_mobile'     => [DBO_STRI, 'user_mobile', NULL],
		'user_birthdate'  => [DBO_DATE, 'user_birthdate', NULL],
		'user_address'    => [DBO_STRI, 'user_address', NULL]
	];
	protected $_pkey = 'user_id';
	protected $_hasRef = [//class=[fkey]
			'Course_access_mode'    => ['accessor_id','grantor_id'],
			'Course_assignment'     => ['user_id'],
			'Program_access_mode'   => ['grantor_id','accessor_id'],
			'Question'              => ['user_id'],
			'Question_access_mode'  => ['accessor_id','grantor_id'],
			'Question_group'        => ['user_id'],
			'Taker_test_map'        => ['user_id'],
			'Test'                  => ['user_id'],
			'Test_access_mode'      => ['accessor_id','grantor_id'],
			'Test_review'           => ['user_id'],
			'Topic'                 => ['user_id'],
			'Topic_access_mode'     => ['grantor_id','accessor_id'],
			'User_account'          => ['user_id'],
			'User_account_role_map' => ['user_id'],
			'User_course_devmap'    => ['user_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'user_code',
			'message' => 'Thông tin [user_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'presence',
			'field' => 'user_first_name',
			'message' => 'Chưa nhập thông tin [user_first_name]'],
		['type' => 'length',
			'field' => 'user_first_name',
			'message' => 'Thông tin [user_first_name] dài hơn 100 ký tự',
			'max' => 100],
		['type' => 'length',
			'field' => 'user_last_name',
			'message' => 'Thông tin [user_last_name] dài hơn 100 ký tự',
			'max' => 100],
		['type' => 'length',
			'field' => 'user_email',
			'message' => 'Thông tin [user_email] dài hơn 100 ký tự',
			'max' => 100],
		['type' => 'email',
			'field' => 'user_email',
			'message' => '[user_email] không đúng dạng địa chỉ email (abc@xyz.com)'],
		['type' => 'length',
			'field' => 'user_mobile',
			'message' => 'Thông tin [user_mobile] dài hơn 12 ký tự',
			'max' => 12],
		['type' => 'length',
			'field' => 'user_address',
			'message' => 'Thông tin [user_address] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	public function logout(){
		UserLog::end();
		DBObject::query('CALL clearPrevilege(?)',session_id());
		unset($_SESSION[APP_ID]);
		Authorise::initUser();
		return array(
			'success'=>1
		);
	}
	
	public function register($params){
		if (isset($params->items))
			$params = $params->items[0];
		$oAcc = new User_account();
		$acc = $oAcc->findOne(['account_id'=>$params->account_id]);
		if ($acc)
			throw new AException("Tài khoản [{$params->account_id}] "
				."đã tồn tại!<br>Vui lòng chọn tài khoản khác!");
		try{
			$this->begin();

			$params->user_id = $this->_create([
				'user_first_name' => $params->user_first_name,
				'user_last_name' => $params->user_last_name,
				'user_email' => $params->user_email,
				'user_mobile' => $params->user_mobile,
				'user_birthdate' =>	$params->user_birthdate,
				'user_address' =>$params->user_address
			]);
			$accObj = new User_account();
			$accObj->_create([
				'account_id'       => $params->account_id,
				'user_id'               => $params->user_id,
				'account_password' => $params->password
			]);
			$roleObj = new User_account_role_map();
			$roleObj->_create([
				'account_id'   => $params->account_id,
				'role_id'      => $params->role_id,
				'granted_date' => date(FORMAT_SQL_DATE)
			]);
			$this->commit();
			unset($params->password);
			unset($params->role_id);
		}catch(Exception $e){
			$this->rollback();
			throw new AException($e->getMessage());
		}

		Authorise::setUser($params);
		return array(
			'success' => 1,
			'user' => $params
		);
	}
	public function changeInfo($params){
		$item = $params->items[0];
		if (Authorise::getId() != $item->user_id)
			throw new AException(Authorise::$msg);
		$this->_update($item);
		Authorise::setUser($item);
		return array(
			'success' => 1,
			'user' => $item
		);
	}
	
	public function loginOAuth2($params){
		$params = $params->items[0];
		$url = array(
			'google' => 'https://www.googleapis.com/plus/v1/people/me',
			'facebook' => 'https://graph.facebook.com/me'
		);

		/** @noinspection PhpIncludeInspection */
		require_once 'Curl.php';
		$rq = new Curl();
		$rq->setOpt(CURLOPT_SSL_VERIFYPEER, false);
		$rq->get($url[$params->network],array(
			'access_token' => $params->token
		));
		$user = new stdClass;
		if ($rq->error) {
		    throw new AException("Error {$rq->errorCode}: {$rq->errorMessage}");
		}else{
			$res = $rq->response;
			$name = '';
			switch($params->network){
				case 'google':
					if (isset($res->id)) {
						$user->account_id = 'google.'.$res->id;
					}
					if (isset($res->displayName)) {
						$name = $res->displayName;
					}
					break;
				case 'facebook':
					if (isset($res->id)) {
						$user->account_id = 'facebook.'.$res->id;
					}
					if (isset($res->name)) {
						$name = $res->name;
					}
					break;
			}
		}

		if (preg_match("/[^\\s]+$/", $name, $aname)){
			$lname = $aname[0];
			$fname = trim(substr($name,0,strlen($name)-strlen($lname)));
		}else{
			$lname = $name;
			$fname = '';
		}
		
		$user->user_first_name = $fname;
		$user->user_last_name  = $lname;
		//Kiem tra account, neu chua co thi y/c dang ky
		//Neu co roi thi xac nhan dang nhap OK
		$oAcc = new User_account();
		$acc = $oAcc->findOne(['account_id'=>$user->account_id]);
		if (!$acc){
			if ($params->role_id != 3 && $params->role_id!=6)
				throw new AException('Chỉ có quyền đăng ký với vai trò Sinh viên hoặc Giảng viên');
				
			try{
				$this->begin();

				$user->user_id = $this->_create([
					'user_first_name' => $fname,
					'user_last_name' => $lname
				]);
				$oAcc->_create([
					'account_id' => $user->account_id,
					'user_id' => $user->user_id,
					'account_password' => 1
				]);
				$ro = new User_account_role_map();
				$ro->_create([
					'account_id' => $user->account_id,
					'user_id' => $user->user_id,
					'role_id' => $params->role_id
				]);
				$this->commit();
			}catch(Exception $e){
				$this->rollback();
				throw new AException($e->getMessage());
			}
		}else{
			$user = $this->findOne(['user_id'=>$acc->user_id]);
			$user->account_id = $acc->account_id;
		}
		Authorise::setUser($user);
		return array(
			'success'	=> 1,
			'user'		=> $user
		);
	}
	public function login($params){
		global $cfg;
		$p = isset($params->items) ? $params->items[0] : $params;
		$oAcc = new User_account();
		$acc = $oAcc->findOne([
			'account_id' => $p->account_id
		]);
		if (!$acc)
			throw new AException("Tài khoản không tồn tại",1005);

		if ($cfg['debug'] && !$cfg['checkpass']){//Bo qua password khi login
		}elseif (md5(session_id().$acc->account_password)!=$p->account_password){
			throw new AException('Mật khẩu không chính xác',1016);
		}
		$user = $this->findOne([
			'user_id' => $acc->user_id
		]);
		$user->account_id = $p->account_id;
		Authorise::setUser($user);
		return array(
			'success'	=> 1,
			'user'		=> $user
		);
	}
//ZoneC>
}