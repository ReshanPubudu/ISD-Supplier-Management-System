<?php
/**
 * Created by IntelliJ IDEA.
 * User: Reshan Pubudu
 * Date: 04-Mar-18
 * Time: 22:07
 */

$type = $_GET['type'];

$connection =mysqli_connect("localhost","root","Reshan","ISDSupplier","3306");

include "DBConnection.php";
$DBConnection = DBConnection::getInstance();
$connection = $DBConnection->getConnection();

    if($type=='all'){
        $resultset = mysqli_query($connection, "SELECT sid, supplierName, addressForcorrCountry, telephone, email, fax FROM Supplier");
    } else if($type == 'supplierNames'){
        $resultset = mysqli_query($connection, "SELECT sid, supplierName FROM Supplier");
    }
    if (mysqli_num_rows($resultset) > 0){
        $array[] = [];
        while ($rowdata = mysqli_fetch_row($resultset)){
            array_push($array, $rowdata);
        }
        echo json_encode($array);
    } else{
        echo null;
    }
    mysqli_free_result($resultset);

mysqli_close($connection);
