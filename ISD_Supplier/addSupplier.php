<?php
/**
 * Created by IntelliJ IDEA.
 * User: Reshan Pubudu
 * Date: 04-Mar-18
 * Time: 20:38
 */

$supplierName = $_POST['supplierName'];
$addressForcorrStreetAndNum = $_POST['addressForcorrStreetAndNum'];
$addressForcorrCity = $_POST['addressForcorrCity'];
$addressForcorrCountry = $_POST['addressForcorrCountry'];
$addressForcorrPostalCode = $_POST['addressForcorrPostalCode'];
$telephone = $_POST['telephone'];
$fax = $_POST['fax'];
$email = $_POST['email'];
$contactPersonForPaymentTel = $_POST['contactPersonForPaymentTel'];
$contactPersonForPaymentEmail = $_POST['contactPersonForPaymentEmail'];
$contactPersonForOrderPlacementTel = $_POST['contactPersonForOrderPlacementTel'];
$contactPersonForOrderPlacementEmail = $_POST['contactPersonForOrderPlacementEmail'];
$nominatedBy = $_POST['nominatedBy'];
$payeName = $_POST['payeName'];
$addressForPayStreetAndNum = $_POST['addressForPayStreetAndNum'];
$addressForPayCity = $_POST['addressForPayCity'];
$addressForPayCountry = $_POST['addressForPayCountry'];
$addressForPayPostalCode = $_POST['addressForPayPostalCode'];

$creaditPeriodDays = $_POST['creaditPeriodDays']==""?0:$_POST['creaditPeriodDays'];
$creaditPeriodIfOther = $_POST['creaditPeriodIfOther'];
$settlementCurrency = $_POST['settlementCurrency'];
$settlementCurrencyIfOther = $_POST['settlementCurrencyIfOther'];
$SVATNo = $_POST['SVATNo'];
$bankName = $_POST['bankName'];
$bankAccNo = $_POST['bankAccNo'];
$bankAddressStreetAndNum = $_POST['bankAddressStreetAndNum'];
$bankAddressCity = $_POST['bankAddressCity'];
$bankAddressCountry = $_POST['bankAddressCountry'];
$bankAddressBranch = $_POST['bankAddressBranch'];
$sortCode = $_POST['sortCode'];
$completedByName = $_POST['completedByName'];
$completedByDate = $_POST['completedByDate'];

include "DBConnection.php";
$DBConnection = DBConnection::getInstance();
$connection = $DBConnection->getConnection();

    $resultsid = mysqli_query($connection, 'SELECT sid FROM Supplier ORDER BY sid DESC LIMIT 1');
    if(mysqli_num_rows($resultsid)>0) {
        $sid = mysqli_fetch_row($resultsid)[0]+1;
        $result = mysqli_query($connection, "INSERT INTO Supplier VALUES({$sid}, '{$supplierName}', '{$addressForcorrStreetAndNum}', '{$addressForcorrCity}', '{$addressForcorrCountry}', '{$addressForcorrPostalCode}', '{$telephone}', '{$fax}', '{$email}', '{$contactPersonForPaymentTel}', '{$contactPersonForPaymentEmail}', '{$contactPersonForOrderPlacementTel}', '{$contactPersonForOrderPlacementEmail}', '{$nominatedBy}', '{$payeName}', '{$addressForPayStreetAndNum}', '{$addressForPayCity}', '{$addressForPayCountry}', '{$addressForPayPostalCode}', {$creaditPeriodDays}, '{$creaditPeriodIfOther}', '{$settlementCurrency}', '{$settlementCurrencyIfOther}', '{$SVATNo}', '{$bankName}', '{$bankAccNo }', '{$bankAddressStreetAndNum}', '{$bankAddressCity}', '{$bankAddressCountry}', '{$bankAddressBranch}', '{$sortCode}', '{$completedByName}', '{$completedByDate}')");
    } else {
        $result = mysqli_query($connection, "INSERT INTO Supplier VALUES(1, '{$supplierName}', '{$addressForcorrStreetAndNum}', '{$addressForcorrCity}', '{$addressForcorrCountry}', '{$addressForcorrPostalCode}', '{$telephone}', '{$fax}', '{$email}', '{$contactPersonForPaymentTel}', '{$contactPersonForPaymentEmail}', '{$contactPersonForOrderPlacementTel}', '{$contactPersonForOrderPlacementEmail}', '{$nominatedBy}', '{$payeName}', '{$addressForPayStreetAndNum}', '{$addressForPayCity}', '{$addressForPayCountry}', '{$addressForPayPostalCode}', {$creaditPeriodDays}, '{$creaditPeriodIfOther}', '{$settlementCurrency}', '{$settlementCurrencyIfOther}', '{$SVATNo}', '{$bankName}', '{$bankAccNo }', '{$bankAddressStreetAndNum}', '{$bankAddressCity}', '{$bankAddressCountry}', '{$bankAddressBranch}', '{$sortCode}', '{$completedByName}', '{$completedByDate}')");
    }
    if ($result) {
        echo 1;
    } else {
        echo 0;
    }

mysqli_close($connection);

//echo 'form working';

