CREATE TABLE User (
    username varchar(255) NOT NULL,
    password varchar(255),
    firstName varchar(255),
    lastName varchar(255),
    phone varchar(255),
    email varchar(255),
    address varchar(255),
    PRIMARY KEY (username)
);

CREATE TABLE Admin (
    adminID int NOT NULL AUTO_INCREMENT,
    manager varchar(255),
    official varchar(255),
    username varchar(255),
    user varchar(255),
    PRIMARY KEY (adminID),
    FOREIGN KEY (username) REFERENCES User(username)
);


CREATE TABLE Address (
    addressID int NOT NULL AUTO_INCREMENT,
    street varchar(255),
    suburd varchar(255),
    state varchar(255),
    postcode varchar(255),
    lat double,
    lng double,
    PRIMARY KEY (addressID)
);

CREATE TABLE Hotspot (
    hotspotID int NOT NULL  AUTO_INCREMENT,
    timestart datetime,
    timefinish datetime,

    PRIMARY KEY (hotspotID)
);

CREATE TABLE business (
    checkincode varchar(255) NOT NULL,
    username varchar(255) NOT NULL ,
    password varchar(255),
    firstName varchar(255),
    lastName varchar(255),
    phone varchar(255),
    email varchar(255),
    address int,

    PRIMARY KEY (checkincode) ,
     FOREIGN KEY (address) REFERENCES Address(addressID)
);

CREATE TABLE userHistory (
    userHistoryID INT NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    checkincode varchar(255) NOT NULL,
    time datetime default NOW(),

    PRIMARY KEY (userHistoryID),
    FOREIGN KEY (username) REFERENCES User(username),
    FOREIGN KEY (checkincode) REFERENCES business(checkincode)

);

-- test users
INSERT INTO User (username, password, firstName, lastName, phone, email)
VALUES ('test','123','Tom B. Erichsen','Skagen 21','4006','xxx');
INSERT INTO User (username, password, firstName, lastName, phone, email)
VALUES ('user1',SHA2('p1',256),'Test','User1','0412345678','test.user1@student.adelaide.edu.au');
INSERT INTO User (username, password, firstName, lastName, phone, email)
VALUES ('user2',SHA2('p2',256),'Test','User2','0412345678','test.user2@student.adelaide.edu.au');

INSERT INTO Admin (mangaer, official, username, user)
VALUES ('testManger','testOffi','test','user');

INSERT INTO Address (street, suburd, state, postcode, lat, lng)
VALUES ('teststreet','testsuburd','teststate','5555', -34.919940, 138.603597);

INSERT INTO Hotspot (timestart,timefinish)
VALUES (NOW(), NOW());

-- test businesses
INSERT INTO business (username, password, firstName, lastName, phone, email,checkincode)
VALUES ('test','123','Tom B. Erichsen','Skagen 21','4006','xxx','5252');
INSERT INTO business (username, password, firstName, lastName, phone, email,checkincode)
VALUES ('business1',SHA2('p1',256),'Test','Business1','0412345678','test.business1@adelaide.edu.au','001');
INSERT INTO business (username, password, firstName, lastName, phone, email,checkincode)
VALUES ('business2',SHA2('p2',256),'Test','Business2','0412345678','test.business2@adelaide.edu.au','002');

-- test checkin histories
INSERT INTO userHistory (username, checkincode)
VALUES ('test','5252');
INSERT INTO userHistory (username, checkincode)
VALUES ('user1','001');
INSERT INTO userHistory (username, checkincode)
VALUES ('user2','001');
INSERT INTO userHistory (username, checkincode)
VALUES ('user2','002');