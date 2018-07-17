<?php
/**
 * Created by IntelliJ IDEA.
 * User: Reshan Pubudu
 * Date: 05-Mar-18
 * Time: 13:17
 */

$oid = $_GET['oid'];

include "DBConnection.php";
$DBConnection = DBConnection::getInstance();
$connection = $DBConnection->getConnection();

    $result = mysqli_query($connection, "SELECT * FROM Orders WHERE oid='{$oid}'");
    if (mysqli_num_rows($result) > 0){
        $rowData = mysqli_fetch_assoc($result);
        $rowData['sid'] = mysqli_fetch_row(mysqli_query($connection, "SELECT supplierName FROM Supplier WHERE sid='{$rowData['sid']}'"))[0];
        $categories = mysqli_query($connection, "SELECT * FROM Category WHERE cid IN (SELECT cid FROM Orders_Category WHERE oid = {$oid})");
        $categoryArr[] = [];
        if(mysqli_num_rows($categories)>0){
            while ($category = mysqli_fetch_row($categories)){
                array_push($categoryArr, [$category[0], $category[1]]);
            }
        }
        $rowData['categorys'] = $categoryArr;
        echo json_encode($rowData);
    }else{
        echo null;
    }
    mysqli_free_result($result);

mysqli_close($connection);