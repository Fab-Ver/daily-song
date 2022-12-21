-- Database Section
-- ________________ 

create database db;
use db;
drop user 'secure_user'@'localhost';
flush privileges;
CREATE USER 'secure_user'@'localhost' IDENTIFIED BY 'p5N3RHN9fWE5QRvxxuPcpJXZ';
GRANT SELECT, INSERT, UPDATE, DELETE ON `db`.* TO 'secure_user'@'localhost';


-- Tables Section
-- _____________ 

create table belongs (
     genreID int not null,
     username varchar(50) not null,
     postID int not null,
     constraint ID_belongs primary key (genreID, username, postID));

CREATE TABLE login_attempts (
   username varchar(50) not null,
   time VARCHAR(30) NOT NULL,
   constraint ID_login_attempts primary key (username, time)); 

create table comment (
     postUsername varchar(50) not null,
     postID int not null,
     commentID int not null,
     text varchar(250) not null,
     dateTime datetime not null, 
     commentUsername varchar(50) not null,
     constraint ID_comment primary key (postUsername, postID, commentID));

create table friend (
     follower varchar(50) not null,
     followed varchar(50) not null,
     constraint ID_friend primary key (followed, follower));

create table genre (
     genreID int not null auto_increment,
     tag varchar(30) not null,
     constraint ID_genre primary key (genreID));

create table notification (
     username varchar(50) not null,
     notificationID int not null,
     text varchar(100) not null,
     readStaus varchar(5) not null,
     dateTime datetime not null,
     constraint ID_notification primary key (username, notificationID));

create table post (
     username varchar(50) not null,
     postID int not null,
     urlSpotify varchar(250) not null,
     urlImage varchar(250) not null,
     description varchar(500),
     likeNum int not null,
     dislikeNum int not null,
     activeComments varchar(5) not null,
     dateTime datetime not null,
     constraint ID_post_ID primary key (username, postID));

create table prefers (
     genreID int not null,
     username varchar(50) not null,
     constraint ID_prefers primary key (username, genreID));

create table settings (
     username varchar(50) not null,
     postNotification varchar(5) not null,
     commentNotification varchar(5) not null,
     followerNotification varchar(5) not null,
     constraint FKset_ID primary key (username));

create table profile (
     username varchar(50) not null,
     firstName varchar(50) not null,
     lastName varchar(50) not null,
     email varchar(320) not null,
     telephone varchar(20),
     passwordHash varchar(250) not null,
     profilePicture varchar(100),
     birthDate date not null,
     constraint ID_user primary key (username));


-- Constraints Section
-- ___________________ 

alter table login_attempts add constraint FKtry
	foreign key (username)
	references profile (username)
	ON DELETE CASCADE;

alter table belongs add constraint FKbel_pos
     foreign key (username, postID)
     references post (username, postID)
     ON DELETE CASCADE;

alter table belongs add constraint FKbel_gen
     foreign key (genreID)
     references genre (genreID)
     ON DELETE CASCADE;

alter table comment add constraint FKwrite
     foreign key (commentUsername)
     references profile (username)
     ON DELETE CASCADE;

alter table comment add constraint FKhas
     foreign key (postUsername, postID)
     references post (username, postID)
     ON DELETE CASCADE;

alter table friend add constraint FKfollower
     foreign key (followed)
     references profile (username)
     ON DELETE CASCADE;

alter table friend add constraint FKfollowed
     foreign key (follower)
     references profile (username)
     ON DELETE CASCADE;

alter table notification add constraint FKreceives
     foreign key (username)
     references profile (username)
     ON DELETE CASCADE;

-- Not implemented
-- alter table post add constraint ID_post_CHK
--     check(exists(select * from belongs
--                  where belongs.username = username and belongs.postID = postID)); 

alter table post add constraint FKpublish
     foreign key (username)
     references profile (username)
     ON DELETE CASCADE;

alter table prefers add constraint FKpre_use
     foreign key (username)
     references profile (username)
     ON DELETE CASCADE;

alter table prefers add constraint FKpre_gen
     foreign key (genreID)
     references genre (genreID)
     ON DELETE CASCADE;

alter table settings add constraint FKset_FK
     foreign key (username)
     references profile (username)
     ON DELETE CASCADE;

INSERT INTO `profile` (`username`, `firstName`, `lastName`, `email`, `telephone`, `passwordHash`, `profilePicture`, `birthDate`) VALUES
('fabio_veroli', 'Fabio', 'Veroli', 'fabio.veroli@studio.unibo.it', '+393664093267', '$2y$10$ron4rsdO2YDyiuFLkhRax.nynIRGBr9u6zCRTRA1BUjA9Uz9MDyD.', 'default.png', '2001-04-02'),
('luca_bigo', 'Luca', 'Bighini', 'luca.bighini@studio.unibo.it', '362726323283', '$2y$10$j.oF.Q2fLu7IS3.CNpjd7.4HKaczWC0K2dFkWw8bD2iy0SmQ9oL5u', 'default.png', '2001-12-02'),
('sara-capp', 'Sara', 'Cappelletti', 'sara.cappelletti@studio.unibo.it', '333333438333', '$2y$10$GxtLJsYJ6AcWzrfxn/sS3uuMELY0gB4.c/s9XyLqaxt1CepcEumZy', 'default.png', '2001-10-01'),
('test_user', 'test', 'test', 'test@test', '121212121212', '$2y$10$6M9ldnhaLie1M69LhjSIO.P0gDKFZL7zJEuHgTmwaLYhadTBMGzjG', 'default.png', '0000-00-00');

INSERT INTO `settings` (`username`, `postNotification`, `commentNotification`, `followerNotification`) VALUES
('fabio_veroli', 'false', 'false', 'false'),
('luca_bigo', 'true', 'true', 'true'),
('sara-capp', 'false', 'false', 'false'),
('test_user', 'false', 'false', 'false');

INSERT INTO `friend` (`follower`, `followed`) VALUES
('sara-capp', 'fabio_veroli'),
('test_user', 'fabio_veroli'),
('fabio_veroli', 'luca_bigo'),
('test_user', 'luca_bigo'),
('fabio_veroli', 'sara-capp'),
('luca_bigo', 'sara-capp'),
('test_user', 'sara-capp'),
('fabio_veroli', 'test_user'),
('luca_bigo', 'test_user'),
('sara-capp', 'test_user');

INSERT INTO `genre` (`genreID`, `tag`) VALUES
(1, 'Alternative R&B'),
(2, 'Alternative country'),
(3, 'Alternative dance'),
(4, 'Alternative hip hop'),
(5, 'Alternative metal'),
(6, 'Alternative rock'),
(7, 'Ambient'),
(8, 'Ambient techno'),
(9, 'Background music'),
(10, 'Bass house'),
(11, 'Bass music'),
(12, 'Big room house'),
(13, 'Black metal'),
(14, 'Blues'),
(15, 'Boogie-woogie'),
(16, 'Celtic metal'),
(17, 'Celtic rock'),
(18, 'Comedy rock'),
(19, 'Contemporary R&B'),
(20, 'Contemporary folk'),
(21, 'Country'),
(22, 'Country rock'),
(23, 'Dance-pop'),
(24, 'Deep house'),
(25, 'Disco'),
(26, 'Disco house'),
(27, 'Drill'),
(28, 'Drum and bass'),
(29, 'Drumstep'),
(30, 'Dubstep'),
(31, 'Electro-house'),
(32, 'Electro-disco'),
(33, 'Electro-industrial'),
(34, 'Electronic'),
(35, 'Electronic rock'),
(36, 'Emo'),
(37, 'Eurodance'),
(38, 'Eurodisco'),
(39, 'Experimental rock'),
(40, 'Folk metal'),
(41, 'Folk pop'),
(42, 'Folk rock'),
(43, 'Freestyle'),
(44, 'Funk'),
(45, 'Funk rock'),
(46, 'Glam metal'),
(47, 'Glam rock'),
(48, 'Goa'),
(49, 'Gospel music'),
(50, 'Gothic metal'),
(51, 'Gothic rock'),
(52, 'Hard rock'),
(53, 'Hardstep'),
(54, 'Hardstyle'),
(55, 'Heavy metal'),
(56, 'Hip hop'),
(57, 'House music'),
(58, 'Indie'),
(59, 'Indie pop'),
(60, 'Indie rock'),
(61, 'Industrial folk'),
(62, 'Industrial hip hop'),
(63, 'Industrial metal'),
(64, 'Industrial rock'),
(65, 'Industrial techno'),
(66, 'Instrumental hip hop'),
(67, 'Italo dance'),
(68, 'Italo disco'),
(69, 'Italo house'),
(70, 'Jazz'),
(71, 'K-pop'),
(72, 'Lofi hip hop'),
(73, 'Medieval metal'),
(74, 'Melodic house'),
(75, 'Metal'),
(76, 'Metalcore'),
(77, 'Minimal techno'),
(78, 'Neue Deutsche HÃrte'),
(79, 'Nu metal'),
(80, 'Pop'),
(81, 'Rap'),
(82, 'Pop rock'),
(83, 'Post-metal'),
(84, 'Post-punk'),
(85, 'Post-rock'),
(86, 'Power metal'),
(87, 'Progressive electronic'),
(88, 'Progressive folk'),
(89, 'Progressive house'),
(90, 'Progressive metal'),
(91, 'Progressive pop'),
(92, 'Progressive psytrance'),
(93, 'Progressive rap'),
(94, 'Progressive trance'),
(95, 'Psychedelic pop'),
(96, 'Psychedelic rock'),
(97, 'Psychedelic trance'),
(98, 'Punk'),
(99, 'Punk rap'),
(100, 'R&B'),
(101, 'Rap metal'),
(102, 'Rap rock'),
(103, 'Rock'),
(104, 'Rock and roll'),
(105, 'Soul'),
(106, 'Speed metal'),
(107, 'Swing'),
(108, 'Techno'),
(109, 'Thrash metal'),
(110, 'Traditional country music'),
(111, 'Trance music'),
(112, 'Trap'),
(113, 'Trap (EDM)'),
(114, 'Vaporwave');

INSERT INTO `prefers` (`genreID`, `username`) VALUES
(48, 'fabio_veroli'),
(63, 'fabio_veroli'),
(78, 'fabio_veroli'),
(79, 'fabio_veroli'),
(108, 'fabio_veroli'),
(23, 'luca_bigo'),
(80, 'luca_bigo'),
(81, 'luca_bigo'),
(9, 'sara-capp'),
(59, 'sara-capp'),
(80, 'sara-capp'),
(2, 'test_user'),
(9, 'test_user'),
(11, 'test_user'),
(23, 'test_user'),
(67, 'test_user');