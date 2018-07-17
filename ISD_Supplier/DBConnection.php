<?php
/**
 * Created by IntelliJ IDEA.
 * User: Reshan Pubudu
 * Date: 16-Mar-18
 * Time: 18:14
 */

class DBConnection
{

    private $_connection;
    private static $_instance; //The single instance
    private $_host = "localhost";
    private $_port = "3306";
    private $_user = "root";
    private $_password = "Reshan";
    private $_database = "ISDSupplier";
    /*
    Get an instance of the Database
    @return Instance
    */
    public static function getInstance() {
        if(!self::$_instance) { // If no instance then make one
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    // Constructor
    private function __construct() {
        $this->_connection = new mysqli($this->_host, $this->_user,$this->_password, $this->_database, $this->_port);

        // Error handling
        if(mysqli_connect_error()) {
            trigger_error("Failed to conencto to MySQL: " . mysql_connect_error(),
                E_USER_ERROR);
        }
    }
    // Magic method clone is empty to prevent duplication of connection
    private function __clone() { }
    // Get mysqli connection
    public function getConnection() {
        return $this->_connection;
    }
}

//$DBConnection1 = DBConnection::getInstance();
//$connection = $DBConnection1->getConnection();

