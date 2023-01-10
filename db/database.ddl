
-- Database Section
-- ________________ 

create database progetto_web;
use progetto_web;

-- drop user 'secure_user'@'localhost';
flush privileges;
CREATE USER 'secure_user'@'localhost' IDENTIFIED BY 'p5N3RHN9fWE5QRvxxuPcpJXZ';
GRANT SELECT, INSERT, UPDATE, DELETE ON `progetto_web`.* TO 'secure_user'@'localhost';


-- Tables Section
-- _____________ 

create table comment (
     commentID int not null auto_increment,
     text varchar(250) not null,
     dateTime datetime not null,
     username varchar(50) not null,
     postID int not null,
     constraint ID_comment primary key (commentID));

create table password_reset (
     requestID int not null auto_increment,
     email varchar(250) not null,
     token varchar(250) not null unique,
     expDate datetime not null,
     constraint ID_password_reset_ID primary key (requestID));

create table track (
     trackID varchar(30) not null,
     urlSpotify varchar(250) not null,
     urlImage varchar(250) not null,
     urlPreview varchar(250) not null,
     title varchar(100) not null,
     artists varchar(150) not null,
     albumName varchar(100) not null,
     constraint ID_track primary key (trackID));

create table friend (
     followed varchar(50) not null,
     follower varchar(50) not null,
     constraint ID_friend primary key (follower, followed));

create table genre (
     genreID int not null auto_increment,
     tag varchar(30) not null,
     constraint ID_genre primary key (genreID));

create table belongs (
     genreID int not null,
     postID int not null,
     constraint ID_belongs primary key (genreID, postID));

create table login_attempts (
     username varchar(50) not null,
     time varchar(30) not null,
     constraint ID_login_attempts primary key (username, time));

create table notification (
     notificationID int not null auto_increment,
     text varchar(100) not null,
     readStatus boolean not null,
     dateTime datetime not null,
     username varchar(50) not null,
     constraint ID_notification primary key (notificationID));

create table post (
     postID int not null auto_increment,
     description varchar(500),
     activeComments boolean not null,
     archived boolean not null default 0,
     dateTime datetime not null,
     trackID varchar(30) not null,
     username varchar(50) not null,
     constraint ID_post primary key (postID));

create table prefers (
     genreID int not null,
     username varchar(50) not null,
     constraint ID_prefers primary key (username, genreID));

create table settings (
     username varchar(50) not null,
     postNotification boolean not null,
     commentNotification boolean not null,
     followerNotification boolean not null,
     accountNotification boolean not null,
     constraint FKset_ID primary key (username));

create table profile (
     username varchar(50) not null,
     firstName varchar(50) not null,
     lastName varchar(50) not null,
     email varchar(320) not null unique,
     telephone varchar(20),
     passwordHash varchar(250) not null,
     profilePicture varchar(100) DEFAULT 'default.png',
     birthDate date not null,
     constraint ID_profile primary key (username));

create table user_tokens (
     tokenID int not null auto_increment,
     selector varchar(255) not null,
     hashed_validator varchar(255) not null,
     expiry datetime not null,
     username varchar(50) not null,
     constraint ID_user_tokens_ID primary key (tokenID));

create table reaction (
     postID int not null,
     username varchar(50) not null,
     likes boolean not null,
     constraint ID_reaction_ID primary key (postID, username));

-- Constraints Section
-- ___________________ 

alter table comment add constraint FKwrite
     foreign key (username)
     references profile (username)
     ON DELETE CASCADE
     ON UPDATE CASCADE;

alter table comment add constraint FKhas
     foreign key (postID)
     references post (postID)
     ON DELETE CASCADE;

alter table password_reset add constraint FKrequest_FK
     foreign key (email)
     references profile (email)
     ON DELETE CASCADE
     ON UPDATE CASCADE;

alter table friend add constraint FKfollower
     foreign key (follower)
     references profile (username)
     ON DELETE CASCADE
     ON UPDATE CASCADE;

alter table friend add constraint FKfollowed
     foreign key (followed)
     references profile (username)
     ON DELETE CASCADE
     ON UPDATE CASCADE;

alter table belongs add constraint FKbel_pos
     foreign key (postID)
     references post (postID)
     ON DELETE CASCADE;

alter table belongs add constraint FKbel_gen
     foreign key (genreID)
     references genre (genreID)
     ON DELETE CASCADE;

alter table login_attempts add constraint FKmake
     foreign key (username)
     references profile (username)
     ON DELETE CASCADE
     ON UPDATE CASCADE;

alter table notification add constraint FKreceives
     foreign key (username)
     references profile (username)
     ON DELETE CASCADE
     ON UPDATE CASCADE;

alter table post add constraint FKrefers
     foreign key (trackID)
     references track (trackID)
     ON DELETE CASCADE;

alter table post add constraint FKpublish
     foreign key (username)
     references profile (username)
     ON DELETE CASCADE
     ON UPDATE CASCADE;

alter table prefers add constraint FKpre_use
     foreign key (username)
     references profile (username)
     ON DELETE CASCADE
     ON UPDATE CASCADE;

alter table prefers add constraint FKpre_gen
     foreign key (genreID)
     references genre (genreID)
     ON DELETE CASCADE;

alter table settings add constraint FKset_FK
     foreign key (username)
     references profile (username)
     ON DELETE CASCADE
     ON UPDATE CASCADE;

alter table user_tokens add constraint FKhave_FK
     foreign key (username)
     references profile (username)
     ON DELETE CASCADE
     ON UPDATE CASCADE;

alter table reaction add constraint FKmake_reaction_FK
     foreign key (username)
     references profile (username)
     ON DELETE CASCADE
     ON UPDATE CASCADE;

alter table reaction add constraint FKhas_reaction
     foreign key (postID)
     references post (postID)
     ON DELETE CASCADE;

INSERT INTO `profile` (`username`, `firstName`, `lastName`, `email`, `telephone`, `passwordHash`, `profilePicture`, `birthDate`) VALUES
('fabio_veroli', 'Fabio', 'Veroli', 'fabio.veroli@studio.unibo.it', '+393665869789', '$2y$10$ron4rsdO2YDyiuFLkhRax.nynIRGBr9u6zCRTRA1BUjA9Uz9MDyD.', 'default.png', '2001-04-02'),
('luca_bigo', 'Luca', 'Bighini', 'luca.bighini@studio.unibo.it', '362726323283', '$2y$10$j.oF.Q2fLu7IS3.CNpjd7.4HKaczWC0K2dFkWw8bD2iy0SmQ9oL5u', 'profile.jpg', '2001-12-02'),
('sara-capp', 'Sara', 'Cappelletti', 'sara.cappelletti@studio.unibo.it', '333333438333', '$2y$10$GxtLJsYJ6AcWzrfxn/sS3uuMELY0gB4.c/s9XyLqaxt1CepcEumZy', 'default.png', '2001-10-01'),
('test_user', 'test', 'test', 'test@test.it', '121212121212', '$2y$10$6M9ldnhaLie1M69LhjSIO.P0gDKFZL7zJEuHgTmwaLYhadTBMGzjG', 'default.png', '1990-12-31');

INSERT INTO `settings` (`username`, `postNotification`, `commentNotification`, `followerNotification`, `accountNotification`) VALUES
('fabio_veroli', 1, 0, 1, 0),
('luca_bigo', 1, 1, 1, 0),
('sara-capp', 1, 1, 1, 1),
('test_user', 0, 0, 0, 0);

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

INSERT INTO `track` (`trackID`, `urlSpotify`, `urlImage`, `urlPreview`, `title`, `artists`, `albumName`) VALUES
('08Hacl2rWl6GD6TKUyaKIy', 'https://open.spotify.com/track/08Hacl2rWl6GD6TKUyaKIy', 'https://i.scdn.co/image/ab67616d00001e02995c371c4edb3e01b1121c31', 'https://p.scdn.co/mp3-preview/04f2259cbf36285216c62e594ddd8456a6520294?cid=4467e6ad0f484420be8e1546bc0d3a60', 'TUTTO (con te)', 'ARIETE', 'TUTTO (con te)'),
('0nLiqZ6A27jJri2VCalIUs', 'https://open.spotify.com/track/0nLiqZ6A27jJri2VCalIUs', 'https://i.scdn.co/image/ab67616d00001e02cf84c5b276431b473e924802', 'null', 'Nothing Else Matters', 'Metallica', 'Metallica'),
('0TI8TP4FitVPoEHPTySx48', 'https://open.spotify.com/track/0TI8TP4FitVPoEHPTySx48', 'https://i.scdn.co/image/ab67616d00001e029683e5d7361bb80bfb00f46d', 'https://p.scdn.co/mp3-preview/307c6d41d8d5f301d4ad64d212a1e1fcd60bb1de?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Iron Man', 'Black Sabbath', 'Paranoid (2009 Remastered Version)'),
('2svcZXmmAYPo1JKr7KFbK7', 'https://open.spotify.com/track/2svcZXmmAYPo1JKr7KFbK7', 'https://i.scdn.co/image/ab67616d00001e02b7b54273d8bd612c070505ef', 'https://p.scdn.co/mp3-preview/e467f542146ae1dd31251b9f651049513d29eef2?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Teorema', 'Beatrice Quinta', 'X Factor 2022 - Playlist Live #6'),
('3gVhsZtseYtY1fMuyYq06F', 'https://open.spotify.com/track/3gVhsZtseYtY1fMuyYq06F', 'https://i.scdn.co/image/ab67616d00001e028b2c42026277efc3e058855b', 'null', 'Sonne', 'Rammstein', 'Mutter'),
('3YYnFEXCLNbaWuC0hIEnIS', 'https://open.spotify.com/track/3YYnFEXCLNbaWuC0hIEnIS', 'https://i.scdn.co/image/ab67616d00001e02b2396840a8fba4ef2785c09d', 'https://p.scdn.co/mp3-preview/3dbc675e9926c47802561b0026f882d1822030b1?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Patient Number 9 (feat. Jeff Beck)', 'Ozzy Osbourne,Jeff Beck', 'Patient Number 9'),
('5CQ30WqJwcep0pYcV4AMNc', 'https://open.spotify.com/track/5CQ30WqJwcep0pYcV4AMNc', 'https://i.scdn.co/image/ab67616d00001e02c8a11e48c91a982d086afc69', 'https://p.scdn.co/mp3-preview/fc80a280376d5142c888475bd8fdcd00b4fc8d7d?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Stairway to Heaven - Remaster', 'Led Zeppelin', 'Led Zeppelin IV (Deluxe Edition)'),
('5USVtbBrftHgHASbNYqtOV', 'https://open.spotify.com/track/5USVtbBrftHgHASbNYqtOV', 'https://i.scdn.co/image/ab67616d00001e022476ca70d888474fdc5f77d9', 'https://p.scdn.co/mp3-preview/1d2b45d7dfd30a83f49dec1e805a2b9fb11268fb?cid=4467e6ad0f484420be8e1546bc0d3a60', 'CRISI DI STATO', 'Fedez', 'CRISI DI STATO'),
('6Qs4SXO9dwPj5GKvVOv8Ki', 'https://open.spotify.com/track/6Qs4SXO9dwPj5GKvVOv8Ki', 'https://i.scdn.co/image/ab67616d00001e023b52eca47232bedfbb5e9443', 'null', 'Dancing With A Stranger (with Normani)', 'Sam Smith,Normani', 'Dancing With A Stranger (with Normani)'),
('1HNE2PX70ztbEl6MLxrpNL', 'https://open.spotify.com/track/1HNE2PX70ztbEl6MLxrpNL', 'https://i.scdn.co/image/ab67616d00001e029a482180e6a306229bff49dc', 'https://p.scdn.co/mp3-preview/0aec695bf2d68f2c378d8acd640327104a6da336?cid=4467e6ad0f484420be8e1546bc0d3a60', 'In Too Deep', 'Sum 41', 'All Killer, No Filler'),
('4Ryw3Qv9CpkfX8NaPViEjF', 'https://open.spotify.com/track/4Ryw3Qv9CpkfX8NaPViEjF', 'https://i.scdn.co/image/ab67616d00001e026ac44a996e41a7cfb5fbad3e', 'https://p.scdn.co/mp3-preview/fe23be0aa9ae8daf1085cc6b079afc83a6b50ef8?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Chiodo Fisso', 'Eugenio In Via Di Gioia', 'Tsunami (forse vi ricorderete di noi per canzoni come)'),
('49gdfYsDIgpP0lAJJnp3E4', 'https://open.spotify.com/track/49gdfYsDIgpP0lAJJnp3E4', 'https://i.scdn.co/image/ab67616d00001e02e0185989102fa989c915910d', 'null', 'lady', 'sangiovanni', 'sangiovanni'),
('5gXKDmafOQ8i4lYr62wxTk', 'https://open.spotify.com/track/5gXKDmafOQ8i4lYr62wxTk', 'https://i.scdn.co/image/ab67616d00001e0231b0f8c9ee642bbb120ee3fd', 'https://p.scdn.co/mp3-preview/4e1ef619354e8cdf4c80352ebe3f77374476e2e7?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Deep Jungle Walk', 'Astrix', 'He.art'),
('0iGPqIcglmqPUTMv7X2VEb', 'https://open.spotify.com/track/0iGPqIcglmqPUTMv7X2VEb', 'https://i.scdn.co/image/ab67616d00001e0262a64b9388cdff21e97ccac5', 'https://p.scdn.co/mp3-preview/1b1e4267b3fae3bc5b71c70bd94b8293237911cf?cid=4467e6ad0f484420be8e1546bc0d3a60', 'The Pretender', 'Infected Mushroom', 'Army of Mushrooms'),
('1IBCR7sEQwU9P88AP4xcOn', 'https://open.spotify.com/track/1IBCR7sEQwU9P88AP4xcOn', 'https://i.scdn.co/image/ab67616d00001e02259d113181490d7de9141f03', 'https://p.scdn.co/mp3-preview/f1d0780f353a57e1c44f1d6994cad6b602bda426?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Saeed', 'Infected Mushroom', 'The Legend Of The Black Shawarma'),
('2Ms9rXvqIqCzn9BYkhVoYA', 'https://open.spotify.com/track/2Ms9rXvqIqCzn9BYkhVoYA', 'https://i.scdn.co/image/ab67616d00001e0237233abcff297b770d93ad8d', 'https://p.scdn.co/mp3-preview/43746f050703e4183a5412041f9588ccb68c449e?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Louna', 'Sam Shure', 'Laconia');




INSERT INTO `post` (`postID`, `description`, `activeComments`, `dateTime`, `trackID`, `username`,`archived`) VALUES
(1, 'Il mio primo post :)', 0, '2023-01-04 21:15:59', '0TI8TP4FitVPoEHPTySx48', 'fabio_veroli',0),
(2, 'Il mio secondo post', 1, '2023-01-03 21:19:49', '0nLiqZ6A27jJri2VCalIUs', 'fabio_veroli',0),
(3, '', 0, '2023-01-02 21:22:43', '5CQ30WqJwcep0pYcV4AMNc', 'fabio_veroli',0),
(4, 'Ciao\r\nQuesto è un post\r\n:)', 0, '2023-01-01 21:25:36', '3YYnFEXCLNbaWuC0hIEnIS', 'fabio_veroli',0),
(5, '', 0, '2022-12-31 21:28:23', '3gVhsZtseYtY1fMuyYq06F', 'fabio_veroli',0),
(6, 'Questo è il mio primo post !!!', 1, '2023-01-04 21:33:32', '5USVtbBrftHgHASbNYqtOV', 'sara-capp',0),
(7, 'Questo è un brano pop...', 1, '2023-01-03 21:35:47', '6Qs4SXO9dwPj5GKvVOv8Ki', 'sara-capp',0),
(8, 'Che bella canzone !!!', 0, '2023-01-02 21:38:44', '2svcZXmmAYPo1JKr7KFbK7', 'sara-capp',0),
(9, 'Questa canzone mi piace molto ! Ascoltatela tutti.', 1, '2023-01-01 21:40:31', '08Hacl2rWl6GD6TKUyaKIy', 'sara-capp',0),
(10, 'Questa è la prima prova !!', 1, '2023-01-06 10:00:33', '1HNE2PX70ztbEl6MLxrpNL', 'luca_bigo',0),
(11, 'Prova la mia numero 2', 0, '2023-01-02 21:00:44', '4Ryw3Qv9CpkfX8NaPViEjF', 'luca_bigo',0),
(12, 'Odio questa canzone!!', 0, '2023-01-05 10:00:34', '49gdfYsDIgpP0lAJJnp3E4', 'luca_bigo',0),
(13, 'My favorite musical duo !!! Love their music :)', 1, '2023-01-05 23:57:21', '1IBCR7sEQwU9P88AP4xcOn', 'fabio_veroli',0),
(14, 'Love this Foo Fighters cover !!! Which is better this or the original ?', 1, '2023-01-06 00:03:33', '0iGPqIcglmqPUTMv7X2VEb', 'fabio_veroli',0),
(15, 'Love this song!!!', 1, '2023-01-07 00:12:13', '2Ms9rXvqIqCzn9BYkhVoYA', 'fabio_veroli',0),
(16, '', 0, '2023-01-08 00:17:20', '5gXKDmafOQ8i4lYr62wxTk', 'fabio_veroli',0);

INSERT INTO `belongs` (`genreID`, `postID`) VALUES
(42, 3),
(52, 3),
(52, 4),
(55, 2),
(55, 4),
(58, 8),
(63, 5),
(75, 1),
(75, 2),
(75, 5),
(78, 5),
(80, 6),
(80, 7),
(80, 8),
(80, 9),
(103, 1),
(103, 2),
(103, 3),
(3, 11),
(4, 11),
(18, 10),
(22, 10),
(35, 10),
(41, 12),
(72, 12),
(8, 15),
(30, 14),
(31, 14),
(34, 15),
(48, 16),
(90, 13),
(92, 13),
(92, 16),
(97, 13),
(97, 14),
(108, 15),
(111, 16);

INSERT INTO `user_tokens` (`tokenID`, `selector`, `hashed_validator`, `expiry`, `username`) VALUES
(5, 'd84a6480a02da00e7c4c0840b88872e7', '$2y$10$TVUbD5B8zOb.9NPgDp2nFuDQuVYuBNTP/IZ06L5BGPkVhg6Bimnpi', '2023-02-06 23:46:32', 'fabio_veroli');

INSERT INTO `reaction` (`postID`, `username`, `likes`) VALUES
(1, 'fabio_veroli', 1),
(2, 'fabio_veroli', 1),
(3, 'fabio_veroli', 1),
(4, 'fabio_veroli', 1),
(5, 'fabio_veroli', 1),
(7, 'fabio_veroli', 0),
(9, 'fabio_veroli', 0),
(13, 'fabio_veroli', 1),
(14, 'fabio_veroli', 1),
(15, 'fabio_veroli', 1),
(16, 'fabio_veroli', 1);