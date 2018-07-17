DROP DATABASE IF EXISTS ISDSupplier;
CREATE DATABASE ISDSupplier;
USE ISDSupplier;

CREATE TABLE Category(
	cid int,
	category VARCHAR(100),
	addedDate VARCHAR(20),
  CONSTRAINT PRIMARY KEY (cid)
);

CREATE TABLE Supplier(
	sid int,
	supplierName VARCHAR (255),
	addressForcorrStreetAndNum VARCHAR (255),
	addressForcorrCity VARCHAR (255),
	addressForcorrCountry VARCHAR (255),
	addressForcorrPostalCode VARCHAR (255),
	telephone VARCHAR (100),
	fax VARCHAR (100),
	email VARCHAR (255),
	contactPersonForPaymentTel VARCHAR (100),
	contactPersonForPaymentEmail VARCHAR (255),
	contactPersonForOrderPlacementTel VARCHAR (100),
	contactPersonForOrderPlacementEmail VARCHAR (255),
	nominatedBy VARCHAR (255),
  payeName VARCHAR (255),
  addressForPayStreetAndNum VARCHAR (255),
  addressForPayCity VARCHAR (255),
  addressForPayCountry VARCHAR (255),
  addressForPayPostalCode VARCHAR (255),

  creaditPeriodDays int,
  creaditPeriodIfOther VARCHAR (255),
  settlementCurrency VARCHAR (255),
  settlementCurrencyIfOther VARCHAR (255),
  SVATNo VARCHAR (255),
  bankName VARCHAR (255),
  bankAccNo VARCHAR (255),
  bankAddressStreetAndNum VARCHAR (255),
  bankAddressCity VARCHAR (255),
  bankAddressCountry VARCHAR (255),
  bankAddressBranch VARCHAR (255),
  sortCode VARCHAR (255),
  completedByName VARCHAR (255),
  completedByDate VARCHAR (255),
  CONSTRAINT PRIMARY KEY(sid)
 );

CREATE TABLE Orders(
	oid int,
	po VARCHAR(255),
	project VARCHAR(255),
	description VARCHAR(255),
	receivedDate VARCHAR(50),
	received BOOLEAN,
	deliveredDate VARCHAR(50),
	rating DOUBLE (2,1),
	sid int,
	CONSTRAINT PRIMARY KEY(oid),
	CONSTRAINT FOREIGN KEY(sid) REFERENCES Supplier(sid)
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Orders_Category(
  oid int,
  cid int,
  CONSTRAINT PRIMARY KEY (oid, cid),
  CONSTRAINT FOREIGN KEY (oid) REFERENCES Orders(oid),
  CONSTRAINT FOREIGN KEY (cid) REFERENCES Category(cid)
);

-- INSERT INTO Category VALUES(1, 'Mettal', '2017.02.04');
-- INSERT INTO Category VALUES(2, 'Plastic', '2017.04.11');
-- INSERT INTO Category VALUES(3, 'Aluminium', '2016.06.28');
-- INSERT INTO Category VALUES(4, 'Iron', '2011.12.15');
-- INSERT INTO Category VALUES(5, 'Mettal', '2017.02.03');
--
-- INSERT INTO Supplier VALUES(1, 'Supplier01', 'Address01', 'America', '0714287655', '0914287655', 'reshanpubudu@gmail.com');
-- INSERT INTO Supplier VALUES(2, 'Supplier02', 'Address02', 'America', '0714287655', '0914287655', 'reshanpubudu@gmail.com');
-- INSERT INTO Supplier VALUES(3, 'Supplier03', 'Address03', 'America', '0714287655', '0914287655', 'reshanpubudu@gmail.com');
-- INSERT INTO Supplier VALUES(4, 'Supplier04', 'Address04', 'America', '0714287655', '0914287655', 'reshanpubudu@gmail.com');
-- INSERT INTO Supplier VALUES(5, 'Supplier05', 'Address05', 'America', '0714287655', '0914287655', 'reshanpubudu@gmail.com');
-- INSERT INTO Supplier VALUES(6, 'Supplier06', 'Address06', 'America', '0714287655', '0914287655', 'reshanpubudu@gmail.com');
-- INSERT INTO Supplier VALUES(7, 'Supplier07', 'Address07', 'America', '0714287655', '0914287655', 'reshanpubudu@gmail.com');
-- INSERT INTO Supplier VALUES(8, 'Supplier08', 'Address08', 'America', '0714287655', '0914287655', 'reshanpubudu@gmail.com');
-- INSERT INTO Supplier VALUES(9, 'Supplier09', 'Address09', 'America', '0714287655', '0914287655', 'reshanpubudu@gmail.com');
--
-- INSERT INTO Orders VALUES(01, 'PO01', 'Project01', 'Description', '2018.02.12', true, '2018.03.23', 2, 1 );
-- INSERT INTO Orders VALUES(02, 'PO02', 'Project02', 'Description', '2018.02.12', true, '2018.03.23', 2, 2 );
-- INSERT INTO Orders VALUES(03, 'PO03', 'Project03', 'Description', '2018.02.12', true, '2018.03.23', 2, 3 );
-- INSERT INTO Orders VALUES(04, 'PO04', 'Project04', 'Description', '2018.02.12', true, '2018.03.23', 2, 4 );
-- INSERT INTO Orders VALUES(05, 'PO05', 'Project05', 'Description', '2018.02.12', true, '2018.03.23', 2, 5 );
-- INSERT INTO Orders VALUES(06, 'PO06', 'Project06', 'Description', '2018.02.12', true, '2018.03.23', 2, 6 );
-- INSERT INTO Orders VALUES(07, 'PO07', 'Project07', 'Description', '2018.02.12', true, '2018.03.23', 2, 7 );
-- INSERT INTO Orders VALUES(08, 'PO08', 'Project08', 'Description', '2018.02.12', true, '2018.03.23', 2, 8 );
-- INSERT INTO Orders VALUES(09, 'PO09', 'Project09', 'Description', '2018.02.12', true, '2018.03.23', 2, 9 );
-- INSERT INTO Orders VALUES(10, 'PO10', 'Project10', 'Description', '2018.02.12', true, '2018.03.23', 2, 1 );
-- INSERT INTO Orders VALUES(11, 'PO11', 'Project11', 'Description', '2018.02.12', true, '2018.03.23', 2, 2 );
-- INSERT INTO Orders VALUES(12, 'PO12', 'Project12', 'Description', '2018.02.12', true, '2018.03.23', 2, 3 );
-- INSERT INTO Orders VALUES(13, 'PO13', 'Project13', 'Description', '2018.02.12', true, '2018.03.23', 2, 4 );
-- INSERT INTO Orders VALUES(14, 'PO14', 'Project14', 'Description', '2018.02.12', true, '2018.03.23', 2, 5 );
--
