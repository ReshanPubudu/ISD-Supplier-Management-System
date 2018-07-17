<?php
/**
 * Created by IntelliJ IDEA.
 * User: Reshan Pubudu
 * Date: 03-Mar-18
 * Time: 10:24
 */

$type = $_GET['type'];

include 'DBConnection.php';
$DBConnection = DBConnection::getInstance();
$connection = $DBConnection->getConnection();

    if ($type == 'all'){
        $resultSet = mysqli_query($connection, 'SELECT * FROM orders');
    } else if ($type == 'dashboard') {
        $resultSet = mysqli_query($connection, 'SELECT * FROM orders LIMIT 10');
    } else if ($type === "searchby"){
        $po = $_GET['po'];
        $supplier = $_GET['supplier'];
        $category = $_GET['category'];
        $resultSet = mysqli_query($connection, "SELECT * FROM Orders WHERE po LIKE '%{$po}%' AND sid IN (SELECT sid FROM Supplier WHERE supplierName LIKE '%{$supplier}%') AND oid IN (SELECT oid FROM Orders_Category WHERE cid IN (SELECT cid FROM Category WHERE category LIKE '%{$category}%')) ORDER BY oid ASC LIMIT 10");
    } else if($type === "po"){
        $resultSet = mysqli_query($connection, 'SELECT oid, po FROM orders');
    }

    if(mysqli_num_rows($resultSet)>0){
            $array[] = [];
            while ($rowdata = mysqli_fetch_row($resultSet)) {
                if($type !== "po") {
                    $rowdata[8] = mysqli_fetch_row(mysqli_query($connection, "SELECT supplierName FROM Supplier WHERE sid = {$rowdata[8]}"))[0];
                    $rowdata[9] = "";
                    $categories = mysqli_query($connection, "SELECT category FROM Category WHERE cid IN (SELECT cid FROM Orders_Category WHERE oid = {$rowdata[0]})");
                    if (mysqli_num_rows($categories) > 0) {
                        while ($category = mysqli_fetch_row($categories)) {
                            $rowdata[9] .= ($category[0] . ", ");
                        }
                        $rowdata[9] = substr($rowdata[9], 0, -2);
                    } else {
                        $rowdata[9] .= "No Category  ";
                    }
                    array_push($array, $rowdata);
                } else {
                    array_push($array, $rowdata);
                }
            }
            echo json_encode($array);
    } else {
        echo null;
    }
    mysqli_free_result($resultSet);

mysqli_close($connection);