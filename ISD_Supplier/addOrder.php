<?php
/**
 * Created by IntelliJ IDEA.
 * User: Reshan Pubudu
 * Date: 06-Mar-18
 * Time: 13:57
 */

//print_r($_POST);

$po = "";
$project = "";
$description = "";
$receiveddate = "";
$received = 0;
$delivereddate = "";
$rating = 0;
$supplier;

for($i = 0; $i<sizeof($_POST['form']); $i++ ){
    if($_POST['form'][$i]['name'] == 'po') $po = $_POST['form'][$i]['value'];
    else if($_POST['form'][$i]['name'] == 'project') $project = $_POST['form'][$i]['value'];
    else if($_POST['form'][$i]['name'] == 'description') $description = $_POST['form'][$i]['value'];
    else if($_POST['form'][$i]['name'] == 'receiveddate') $receiveddate = $_POST['form'][$i]['value'];
    else if($_POST['form'][$i]['name'] == 'delivereddate') $delivereddate = $_POST['form'][$i]['value'];
    else if($_POST['form'][$i]['name'] == 'rating') $rating = $_POST['form'][$i]['value'];
    else if($_POST['form'][$i]['name'] == 'supplier') $supplier = $_POST['form'][$i]['value'];
    else if($_POST['form'][$i]['name'] == 'received') $received = isset($_POST['form'][$i]['value']);
}

include "DBConnection.php";
$DBConnection = DBConnection::getInstance();
$connection = $DBConnection->getConnection();

mysqli_autocommit($connection, FALSE);

$resultsid = mysqli_query($connection, 'SELECT oid FROM Orders ORDER BY oid DESC LIMIT 1');
if(mysqli_num_rows($resultsid)>0){
    $oid = mysqli_fetch_row($resultsid)[0]+1;
    $result = mysqli_query($connection, "INSERT INTO Orders VALUES ({$oid}, '{$po}', '{$project}', '{$description}', '{$receiveddate}', {$received}, '{$delivereddate}', {$rating}, {$supplier})");
} else {
    $result = mysqli_query($connection, "INSERT INTO Orders VALUES (1, '{$po}', '{$project}', '{$description}', '{$receiveddate}', {$received}, '{$delivereddate}', {$rating}, {$supplier})");
}
if ($result){
    $cnt = 0;
    for($i = 0; $i< sizeof($_POST['array']); $i++){
        if(mysqli_query($connection, "INSERT INTO Orders_Category VALUES ({$oid}, {$_POST['array'][$i]})")){
            $cnt++;
        }
    }
    if($cnt == sizeof($_POST['array'])){
        mysqli_commit($connection);
        echo 1;
    } else {
        mysqli_rollback($connection);
        echo 0;
    }
} else {
    mysqli_rollback($connection);
    echo 0;
}

mysqli_autocommit($connection, TRUE);
mysqli_close($connection);