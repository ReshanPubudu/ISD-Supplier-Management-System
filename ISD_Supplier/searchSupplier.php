<?php
/**
 * Created by IntelliJ IDEA.
 * User: Reshan Pubudu
 * Date: 23-Mar-18
 * Time: 13:58
 */

$sid = $_GET['sid'];

include "DBConnection.php";
$DBConnection = DBConnection::getInstance();
$connection = $DBConnection->getConnection();

$result = mysqli_query($connection, "SELECT * FROM Supplier WHERE sid='{$sid}'");
if (mysqli_num_rows($result) > 0){
    echo json_encode(mysqli_fetch_assoc($result));
}else{
    echo null;
}
mysqli_free_result($result);

mysqli_close($connection);