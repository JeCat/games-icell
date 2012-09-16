<?php
include_once '../conn.php' ;

class User{
	private function __construct(){}

	static public function getFlyweigth($uid ,$service){
		if(!$this->uid || !$this->service){
			throw new Exception('无效的uid或service');
		}

		$flyweightKey = $this->uid.$this->service;

		if( !empty(self::$_flyweights[$flyweightKey]) ){
			return self::$_flyweights[$flyweightKey];
		}else{
			self::$_flyweights[$flyweightKey] = self::__construct();
			return self::$_flyweights[$flyweightKey];
		}
	}

	public function isExist(){
		return $this->uid && $this->service && $this->create_time;
	}

	public function save(){
		if($this->isExist()){
			$sql = sprintf(
				"UPDATE `user` SET `access_token` = '%s' , `expires_in` = '%s' ,`token_time` = '%s'
						WHERE `uid` = '%s' AND `service` = '%s'"
				, $this->access_token
				, $this->expires_in
				, $this->token_time
				, $this->uid
				, $this->service
			);
		}else{
			$sql = sprintf(
				"INSERT INTO `icell`.`user` 
					(`uid`, `service`, `access_token`, `expires_in`, `token_time`, `create_time`) 
					VALUES ('%s', '%s', '%s', '%s', '%s', '%s')"
				, $this->uid
				, $this->service
				, $this->access_token
				, $this->expires_in
				, (string)time()
				, (string)time()
			);
		}

		mysql_query($sql ,$GLOBALS['conn']);

		if( mysql_affected_rows() > 0 ){
			return $this;
		}else{
			return null;
		}
	}

	public function __get($sName){
		return $this->arrUserInfo[(string)$sName];
	}
	
	public function __set($sName , $value){
		$this->arrUserInfo[(string)$sName] = mysql_escape_string($value);
	}

	static private $_flyweights = array();
	private $arrUserInfo = array(
		"username" => null
		, "uid" => null
		, "service" => null
		, "access_token" => null
		, "expires_in" => null
		, "token_time" => null
		, "create_time" => null
	);
}