<?php
/**
 * Created by IntelliJ IDEA.
 * User: Reshan Pubudu
 * Date: 05-Mar-18
 * Time: 19:36
 */

include "DBConnection.php";
$DBConnection = DBConnection::getInstance();
$connection = $DBConnection->getConnection();

    $resultSet = mysqli_query($connection, 'SELECT * FROM Category');
    if(mysqli_num_rows($resultSet)>0){
        $array[] = [];
        while ($rowdata = mysqli_fetch_row($resultSet)){
            array_push($array, $rowdata);
        }
        echo json_encode($array);
    } else {
        echo null;
    }
    mysqli_free_result($resultSet);

mysqli_close($connection);