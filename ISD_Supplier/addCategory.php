<?php
/**
 * Created by IntelliJ IDEA.
 * User: Reshan Pubudu
 * Date: 05-Mar-18
 * Time: 20:42
 */

$category = $_POST['category'];
$addeddate = $_POST['addeddate'];

include "DBConnection.php";
$DBConnection = DBConnection::getInstance();
$connection = $DBConnection->getConnection();

    $resultcid = mysqli_query($connection, 'SELECT cid FROM Category ORDER BY cid DESC LIMIT 1');
    if(mysqli_num_rows($resultcid)>0) {
        $cid = mysqli_fetch_row($resultcid)[0]+1;
        $result = mysqli_query($connection, "INSERT INTO Category VALUES({$cid}, '{$category}', '{$addeddate}')");
    } else {
        $result = mysqli_query($connection, "INSERT INTO Category VALUES(1, '{$category}', '{$addeddate}')");
    }
    if ($result){
        echo 1;
    }else{
        echo 0;
    }

mysqli_close($connection);