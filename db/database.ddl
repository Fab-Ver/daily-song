
-- Database Section
-- ________________ 

create database daily_songDB;
use daily_songDB;

-- drop user 'secure_user'@'localhost';
flush privileges;
CREATE USER 'secure_user'@'localhost' IDENTIFIED BY 'p5N3RHN9fWE5QRvxxuPcpJXZ';
GRANT SELECT, INSERT, UPDATE, DELETE ON `daily_songDB`.* TO 'secure_user'@'localhost';


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
     dateTime datetime not null,
     type int not null,
     usernameRec varchar(50) not null,
     usernameSed varchar(50) not null,
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

alter table notification add constraint FKsends
     foreign key (usernameSed)
     references profile (username)
     ON DELETE CASCADE
     ON UPDATE CASCADE;

alter table notification add constraint FKreceives
     foreign key (usernameRec)
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
('fabio_veroli', 'Fabio', 'Veroli', 'fabio.veroli@studio.unibo.it', '+393665869789', '$2y$10$8QVvWkWWHYwxgksFU63s.u0nq9Zfs.d4k11qTXDr/mSuPy1WxIH8O', 'fabio_veroli_profile.png', '2001-04-02'),
('luca_bigo', 'Luca', 'Bighini', 'luca.bighini@studio.unibo.it', '+393665676122', '$2y$10$VBNFrKaLGBLtYY3QoQBw6.3XtsxLDVqCCLCGhF2WGggeY1SIh9kPS', 'BigoProfile.png', '2001-12-02'),
('sara-capp', 'Sara', 'Cappelletti', 'sara.cappelletti4@studio.unibo.it', '+393665676134', '$2y$10$GxtLJsYJ6AcWzrfxn/sS3uuMELY0gB4.c/s9XyLqaxt1CepcEumZy', 'profile.jpg', '2001-10-01'),
('test_user', 'Test', 'Test', 'test@test.it', '+393661234456', '$2y$10$6M9ldnhaLie1M69LhjSIO.P0gDKFZL7zJEuHgTmwaLYhadTBMGzjG', 'default.png', '1990-12-31');

INSERT INTO `settings` (`username`, `postNotification`, `commentNotification`, `followerNotification`, `accountNotification`) VALUES
('fabio_veroli', 1, 1, 1, 1),
('luca_bigo', 1, 1, 1, 0),
('sara-capp', 0, 1, 1, 1),
('test_user', 0, 0, 0, 0);

INSERT INTO `friend` (`followed`, `follower`) VALUES
('luca_bigo', 'fabio_veroli'),
('sara-capp', 'fabio_veroli'),
('test_user', 'fabio_veroli'),
('sara-capp', 'luca_bigo'),
('test_user', 'luca_bigo'),
('fabio_veroli', 'sara-capp'),
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
(3, 'test_user'),
(57, 'test_user'),
(67, 'test_user'),
(89, 'test_user'),
(108, 'test_user');

INSERT INTO `track` (`trackID`, `urlSpotify`, `urlImage`, `urlPreview`, `title`, `artists`, `albumName`) VALUES
('07Csushg2MUzJXSlPp6siB', 'https://open.spotify.com/track/07Csushg2MUzJXSlPp6siB', 'https://i.scdn.co/image/ab67616d00001e02e38460bea3c01bb416d51020', 'https://p.scdn.co/mp3-preview/41e7caaca543d92f3da65bbd74e39954a16d572d?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Terra', 'Klaus', 'Terra'),
('08Hacl2rWl6GD6TKUyaKIy', 'https://open.spotify.com/track/08Hacl2rWl6GD6TKUyaKIy', 'https://i.scdn.co/image/ab67616d00001e02995c371c4edb3e01b1121c31', 'https://p.scdn.co/mp3-preview/04f2259cbf36285216c62e594ddd8456a6520294?cid=4467e6ad0f484420be8e1546bc0d3a60', 'TUTTO (con te)', 'ARIETE', 'TUTTO (con te)'),
('0iGPqIcglmqPUTMv7X2VEb', 'https://open.spotify.com/track/0iGPqIcglmqPUTMv7X2VEb', 'https://i.scdn.co/image/ab67616d00001e0262a64b9388cdff21e97ccac5', 'https://p.scdn.co/mp3-preview/1b1e4267b3fae3bc5b71c70bd94b8293237911cf?cid=4467e6ad0f484420be8e1546bc0d3a60', 'The Pretender', 'Infected Mushroom', 'Army of Mushrooms'),
('0nLiqZ6A27jJri2VCalIUs', 'https://open.spotify.com/track/0nLiqZ6A27jJri2VCalIUs', 'https://i.scdn.co/image/ab67616d00001e02cf84c5b276431b473e924802', 'null', 'Nothing Else Matters', 'Metallica', 'Metallica'),
('0TI8TP4FitVPoEHPTySx48', 'https://open.spotify.com/track/0TI8TP4FitVPoEHPTySx48', 'https://i.scdn.co/image/ab67616d00001e029683e5d7361bb80bfb00f46d', 'https://p.scdn.co/mp3-preview/307c6d41d8d5f301d4ad64d212a1e1fcd60bb1de?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Iron Man', 'Black Sabbath', 'Paranoid (2009 Remastered Version)'),
('1b8tFExEyHyxTzrrlQAsu4', 'https://open.spotify.com/track/1b8tFExEyHyxTzrrlQAsu4', 'https://i.scdn.co/image/ab67616d00001e027839771341a65f97aa2c7f47', 'https://p.scdn.co/mp3-preview/ea3893bef07a255e7bfd52baa740e1b782f69401?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Marmellata #25', 'Cesare Cremonini', 'Maggese'),
('1HNE2PX70ztbEl6MLxrpNL', 'https://open.spotify.com/track/1HNE2PX70ztbEl6MLxrpNL', 'https://i.scdn.co/image/ab67616d00001e029a482180e6a306229bff49dc', 'https://p.scdn.co/mp3-preview/0aec695bf2d68f2c378d8acd640327104a6da336?cid=4467e6ad0f484420be8e1546bc0d3a60', 'In Too Deep', 'Sum 41', 'All Killer, No Filler'),
('1IBCR7sEQwU9P88AP4xcOn', 'https://open.spotify.com/track/1IBCR7sEQwU9P88AP4xcOn', 'https://i.scdn.co/image/ab67616d00001e02259d113181490d7de9141f03', 'https://p.scdn.co/mp3-preview/f1d0780f353a57e1c44f1d6994cad6b602bda426?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Saeed', 'Infected Mushroom', 'The Legend Of The Black Shawarma'),
('2Ms9rXvqIqCzn9BYkhVoYA', 'https://open.spotify.com/track/2Ms9rXvqIqCzn9BYkhVoYA', 'https://i.scdn.co/image/ab67616d00001e0237233abcff297b770d93ad8d', 'https://p.scdn.co/mp3-preview/43746f050703e4183a5412041f9588ccb68c449e?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Louna', 'Sam Shure', 'Laconia'),
('2svcZXmmAYPo1JKr7KFbK7', 'https://open.spotify.com/track/2svcZXmmAYPo1JKr7KFbK7', 'https://i.scdn.co/image/ab67616d00001e02b7b54273d8bd612c070505ef', 'https://p.scdn.co/mp3-preview/e467f542146ae1dd31251b9f651049513d29eef2?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Teorema', 'Beatrice Quinta', 'X Factor 2022 - Playlist Live #6'),
('3gVhsZtseYtY1fMuyYq06F', 'https://open.spotify.com/track/3gVhsZtseYtY1fMuyYq06F', 'https://i.scdn.co/image/ab67616d00001e028b2c42026277efc3e058855b', 'null', 'Sonne', 'Rammstein', 'Mutter'),
('3H7ihDc1dqLriiWXwsc2po', 'https://open.spotify.com/track/3H7ihDc1dqLriiWXwsc2po', 'https://i.scdn.co/image/ab67616d00001e02ca801dab96017456b9847ac2', 'null', 'Breaking Me', 'Topic,A7S', 'Breaking Me'),
('3YYnFEXCLNbaWuC0hIEnIS', 'https://open.spotify.com/track/3YYnFEXCLNbaWuC0hIEnIS', 'https://i.scdn.co/image/ab67616d00001e02b2396840a8fba4ef2785c09d', 'https://p.scdn.co/mp3-preview/3dbc675e9926c47802561b0026f882d1822030b1?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Patient Number 9 (feat. Jeff Beck)', 'Ozzy Osbourne,Jeff Beck', 'Patient Number 9'),
('49gdfYsDIgpP0lAJJnp3E4', 'https://open.spotify.com/track/49gdfYsDIgpP0lAJJnp3E4', 'https://i.scdn.co/image/ab67616d00001e02e0185989102fa989c915910d', 'null', 'lady', 'sangiovanni', 'sangiovanni'),
('4Ryw3Qv9CpkfX8NaPViEjF', 'https://open.spotify.com/track/4Ryw3Qv9CpkfX8NaPViEjF', 'https://i.scdn.co/image/ab67616d00001e026ac44a996e41a7cfb5fbad3e', 'https://p.scdn.co/mp3-preview/fe23be0aa9ae8daf1085cc6b079afc83a6b50ef8?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Chiodo Fisso', 'Eugenio In Via Di Gioia', 'Tsunami (forse vi ricorderete di noi per canzoni come)'),
('5CQ30WqJwcep0pYcV4AMNc', 'https://open.spotify.com/track/5CQ30WqJwcep0pYcV4AMNc', 'https://i.scdn.co/image/ab67616d00001e02c8a11e48c91a982d086afc69', 'https://p.scdn.co/mp3-preview/fc80a280376d5142c888475bd8fdcd00b4fc8d7d?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Stairway to Heaven - Remaster', 'Led Zeppelin', 'Led Zeppelin IV (Deluxe Edition)'),
('5gXKDmafOQ8i4lYr62wxTk', 'https://open.spotify.com/track/5gXKDmafOQ8i4lYr62wxTk', 'https://i.scdn.co/image/ab67616d00001e0231b0f8c9ee642bbb120ee3fd', 'https://p.scdn.co/mp3-preview/4e1ef619354e8cdf4c80352ebe3f77374476e2e7?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Deep Jungle Walk', 'Astrix', 'He.art'),
('5USVtbBrftHgHASbNYqtOV', 'https://open.spotify.com/track/5USVtbBrftHgHASbNYqtOV', 'https://i.scdn.co/image/ab67616d00001e022476ca70d888474fdc5f77d9', 'https://p.scdn.co/mp3-preview/1d2b45d7dfd30a83f49dec1e805a2b9fb11268fb?cid=4467e6ad0f484420be8e1546bc0d3a60', 'CRISI DI STATO', 'Fedez', 'CRISI DI STATO'),
('6OufwUcCqo81guU2jAlDVP', 'https://open.spotify.com/track/6OufwUcCqo81guU2jAlDVP', 'https://i.scdn.co/image/ab67616d00001e0281376e47003d45f6513b5657', 'https://p.scdn.co/mp3-preview/c55031c1eecbfa40204e10f160c646236c87808a?cid=4467e6ad0f484420be8e1546bc0d3a60', 'Love Tonight (Edit)', 'Shouse', 'Love Tonight'),
('6Qs4SXO9dwPj5GKvVOv8Ki', 'https://open.spotify.com/track/6Qs4SXO9dwPj5GKvVOv8Ki', 'https://i.scdn.co/image/ab67616d00001e023b52eca47232bedfbb5e9443', 'null', 'Dancing With A Stranger (with Normani)', 'Sam Smith,Normani', 'Dancing With A Stranger (with Normani)');

INSERT INTO `post` (`postID`, `description`, `activeComments`, `archived`, `dateTime`, `trackID`, `username`) VALUES
(1, 'My first post! Ready to share my music in this social. ', 1, 0, '2023-01-08 21:15:59', '0TI8TP4FitVPoEHPTySx48', 'fabio_veroli'),
(2, 'Best Metallica album', 1, 0, '2023-01-09 21:19:49', '0nLiqZ6A27jJri2VCalIUs', 'fabio_veroli'),
(3, 'Listen this song, please :)', 1, 0, '2023-01-10 21:22:43', '5CQ30WqJwcep0pYcV4AMNc', 'fabio_veroli'),
(4, 'Non vedo l\'ora di poter vedere il suo concerto!!!', 1, 0, '2023-01-11 21:25:36', '3YYnFEXCLNbaWuC0hIEnIS', 'fabio_veroli'),
(5, 'Love this album!!! ', 0, 1, '2023-01-12 15:00:00', '3gVhsZtseYtY1fMuyYq06F', 'fabio_veroli'),
(6, 'Questo è il mio primo post !!!', 1, 0, '2023-01-13 21:33:32', '5USVtbBrftHgHASbNYqtOV', 'sara-capp'),
(7, 'Questo è un brano pop...', 1, 0, '2023-01-14 21:35:47', '6Qs4SXO9dwPj5GKvVOv8Ki', 'sara-capp'),
(8, 'Che bella canzone !!!', 0, 0, '2023-01-15 15:00:00', '2svcZXmmAYPo1JKr7KFbK7', 'sara-capp'),
(9, 'Questa canzone mi piace molto ! Ascoltatela tutti.', 1, 0, '2023-01-16 09:15:00', '08Hacl2rWl6GD6TKUyaKIy', 'sara-capp'),
(10, 'Il mio primo post!', 1, 0, '2023-01-13 10:00:33', '1HNE2PX70ztbEl6MLxrpNL', 'luca_bigo'),
(11, 'Ascoltate questa canzone!!!', 1, 0, '2023-01-14 21:00:44', '4Ryw3Qv9CpkfX8NaPViEjF', 'luca_bigo'),
(12, 'Odio questa canzone!!', 1, 0, '2023-01-15 10:00:00', '49gdfYsDIgpP0lAJJnp3E4', 'luca_bigo'),
(13, 'My favorite musical duo !!! Love their music :)', 1, 0, '2023-01-13 18:00:00', '1IBCR7sEQwU9P88AP4xcOn', 'fabio_veroli'),
(14, 'Love this Foo Fighters cover !!! Which is better this or the original ?', 1, 0, '2023-01-14 11:00:00', '0iGPqIcglmqPUTMv7X2VEb', 'fabio_veroli'),
(15, 'Love this song!!!', 1, 0, '2023-01-15 10:00:00', '2Ms9rXvqIqCzn9BYkhVoYA', 'fabio_veroli'),
(16, 'Love Psychedelic Trance music!!!', 0, 0, '2023-01-16 09:00:00', '5gXKDmafOQ8i4lYr62wxTk', 'fabio_veroli'),
(18, 'My first post here on DailySong, hope you like the song :)', 1, 0, '2023-01-13 17:49:40', '6OufwUcCqo81guU2jAlDVP', 'test_user'),
(19, 'Love this Italian DJ', 1, 0, '2023-01-15 17:55:44', '07Csushg2MUzJXSlPp6siB', 'test_user'),
(20, 'Great song!!!', 1, 0, '2023-01-14 18:01:19', '3H7ihDc1dqLriiWXwsc2po', 'test_user'),
(21, 'Wow che bella :)', 1, 0, '2023-01-16 09:05:00', '1b8tFExEyHyxTzrrlQAsu4', 'luca_bigo');

INSERT INTO `belongs` (`genreID`, `postID`) VALUES
(3, 11),
(4, 11),
(8, 15),
(18, 10),
(22, 10),
(23, 20),
(30, 14),
(31, 14),
(32, 18),
(32, 20),
(34, 15),
(34, 18),
(34, 19),
(34, 20),
(35, 10),
(41, 12),
(42, 3),
(48, 16),
(52, 3),
(52, 4),
(55, 2),
(55, 4),
(57, 19),
(58, 8),
(58, 21),
(63, 5),
(72, 12),
(75, 1),
(75, 2),
(75, 5),
(78, 5),
(80, 6),
(80, 7),
(80, 8),
(80, 9),
(80, 21),
(89, 19),
(90, 13),
(92, 13),
(92, 16),
(97, 13),
(97, 14),
(103, 1),
(103, 2),
(103, 3),
(108, 15),
(111, 16);

INSERT INTO `reaction` (`postID`, `username`, `likes`) VALUES
(1, 'fabio_veroli', 1),
(1, 'luca_bigo', 0),
(1, 'sara-capp', 1),
(1, 'test_user', 1),
(2, 'fabio_veroli', 1),
(2, 'luca_bigo', 1),
(2, 'sara-capp', 1),
(2, 'test_user', 1),
(3, 'fabio_veroli', 1),
(3, 'luca_bigo', 0),
(3, 'sara-capp', 1),
(3, 'test_user', 1),
(4, 'fabio_veroli', 1),
(4, 'luca_bigo', 0),
(4, 'sara-capp', 1),
(4, 'test_user', 1),
(5, 'fabio_veroli', 1),
(6, 'fabio_veroli', 0),
(6, 'luca_bigo', 0),
(6, 'sara-capp', 1),
(6, 'test_user', 1),
(7, 'fabio_veroli', 0),
(7, 'luca_bigo', 1),
(7, 'sara-capp', 1),
(7, 'test_user', 1),
(8, 'fabio_veroli', 0),
(8, 'luca_bigo', 1),
(8, 'sara-capp', 1),
(8, 'test_user', 0),
(9, 'fabio_veroli', 1),
(9, 'luca_bigo', 1),
(9, 'sara-capp', 1),
(10, 'fabio_veroli', 1),
(10, 'luca_bigo', 1),
(10, 'sara-capp', 0),
(10, 'test_user', 1),
(11, 'fabio_veroli', 0),
(11, 'luca_bigo', 1),
(11, 'sara-capp', 1),
(11, 'test_user', 1),
(12, 'fabio_veroli', 0),
(12, 'luca_bigo', 0),
(12, 'sara-capp', 0),
(12, 'test_user', 0),
(13, 'fabio_veroli', 1),
(13, 'luca_bigo', 0),
(13, 'sara-capp', 0),
(13, 'test_user', 1),
(14, 'fabio_veroli', 1),
(14, 'luca_bigo', 0),
(14, 'sara-capp', 0),
(14, 'test_user', 1),
(15, 'fabio_veroli', 1),
(15, 'luca_bigo', 1),
(15, 'sara-capp', 1),
(15, 'test_user', 1),
(16, 'fabio_veroli', 1),
(16, 'luca_bigo', 0),
(16, 'sara-capp', 0),
(16, 'test_user', 1),
(18, 'fabio_veroli', 1),
(18, 'luca_bigo', 1),
(18, 'sara-capp', 1),
(18, 'test_user', 1),
(19, 'fabio_veroli', 1),
(19, 'luca_bigo', 1),
(19, 'sara-capp', 0),
(19, 'test_user', 1),
(20, 'fabio_veroli', 1),
(20, 'luca_bigo', 1),
(20, 'sara-capp', 1),
(20, 'test_user', 1),
(21, 'fabio_veroli', 1),
(21, 'luca_bigo', 1),
(21, 'sara-capp', 1),
(21, 'test_user', 1);

INSERT INTO `comment` (`commentID`, `text`, `dateTime`, `username`, `postID`) VALUES
(10, 'Bellissima questa canzone!!!', '2023-01-12 18:47:18', 'fabio_veroli', 21),
(11, 'I love that DJ, too !!! What do you think about his first single?', '2023-01-12 18:49:32', 'fabio_veroli', 19),
(12, 'Anche a me non piace per niente :(', '2023-01-12 18:49:59', 'fabio_veroli', 12),
(13, 'Concordo! Bellissima canzone :)', '2023-01-12 18:50:39', 'fabio_veroli', 20),
(14, 'Bella questa nuova canzone di Fedez', '2023-01-12 18:51:20', 'fabio_veroli', 6),
(15, 'I totally love this song !!!', '2023-01-12 18:51:44', 'fabio_veroli', 18),
(16, 'I listen to Sum 41 too :)', '2023-01-12 18:52:08', 'fabio_veroli', 10),
(17, 'Anche io la ascolto sempre !!!', '2023-01-12 18:53:22', 'test_user', 9),
(18, 'Sei stato al suo concerto ? A me è piaciuto tantissimo', '2023-01-12 18:53:50', 'test_user', 21),
(19, 'Che brutta canzona, non la sopporto più!', '2023-01-12 18:54:29', 'test_user', 12),
(20, 'Wow Sam Shure is one of my favorite DJs!', '2023-01-12 18:55:02', 'test_user', 15),
(21, 'Non mi piacciono molto le canzoni pop :(', '2023-01-12 18:55:42', 'test_user', 7),
(22, 'Bellissima, grazie del consiglio !!!', '2023-01-12 18:56:03', 'test_user', 11),
(23, 'I prefer the original one !!!', '2023-01-12 18:56:29', 'test_user', 14),
(24, 'Their best song!!!', '2023-01-12 18:57:31', 'test_user', 13),
(25, 'What a strange album cover HAHAHA', '2023-01-12 18:58:08', 'test_user', 10),
(26, 'Anche io spero di poter vedere in concerto di nuovo', '2023-01-12 18:58:36', 'test_user', 4),
(27, 'I love Led Zeppelin !!!', '2023-01-12 18:58:55', 'test_user', 3),
(28, 'I prefer their first album !!! What do you think about their new song?', '2023-01-12 19:00:28', 'test_user', 2),
(29, 'Metal legend!!!', '2023-01-12 19:00:45', 'test_user', 1),
(30, 'Non mi piace proprio questa canzone', '2023-01-12 19:01:51', 'luca_bigo', 9),
(31, 'No purtroppo no, spero di riuscire ad andare quest&#039;estate', '2023-01-12 19:03:07', 'luca_bigo', 21),
(32, 'Bella questa canzone!!!', '2023-01-12 19:03:55', 'luca_bigo', 19),
(33, 'Non mi piacciono le canzoni di Fedez :(', '2023-01-12 19:05:32', 'luca_bigo', 6),
(35, 'I don&#039;t like electronic music', '2023-01-12 19:07:19', 'luca_bigo', 15),
(36, 'Usually I don&#039;t listen to metal music, but this song is really good!!!', '2023-01-12 19:08:04', 'luca_bigo', 2),
(37, 'I love this song too!!!', '2023-01-12 19:10:42', 'sara-capp', 20),
(38, 'How can you listen this type of music ? HAHAHAHA', '2023-01-12 19:11:31', 'sara-capp', 14),
(39, 'Beautiful song!!!', '2023-01-12 19:12:25', 'sara-capp', 3),
(40, 'Welcome to DailySong !!! I&#039;m also new to this social.', '2023-01-12 19:13:12', 'sara-capp', 1);

INSERT INTO `notification` (`notificationID`, `dateTime`, `type`, `usernameRec`, `usernameSed`) VALUES
(2, '2023-01-15 08:00:00', 0, 'sara-capp', 'luca_bigo'),
(3, '2023-01-15 08:30:00', 0, 'luca_bigo', 'sara-capp'),
(4, '2023-01-15 09:00:00', 1, 'luca_bigo', 'sara-capp'),
(6, '2023-01-15 09:30:00', 0, 'sara-capp', 'fabio_veroli'),
(7, '2023-01-15 10:00:00', 0, 'fabio_veroli', 'sara-capp'),
(8, '2023-01-15 10:30:00', 3, 'fabio_veroli', 'test_user'),
(10, '2023-01-15 11:00:00', 3, 'sara-capp', 'test_user'),
(14, '2023-01-15 11:30:00', 3, 'luca_bigo', 'test_user'),
(15, '2023-01-15 12:00:00', 1, 'sara-capp', 'test_user'),
(16, '2023-01-15 12:30:00', 3, 'fabio_veroli', 'luca_bigo'),
(20, '2023-01-15 13:00:00', 1, 'luca_bigo', 'fabio_veroli'),
(21, '2023-01-15 13:30:00', 1, 'sara-capp', 'fabio_veroli'),
(28, '2023-01-15 14:00:00', 1, 'luca_bigo', 'sara-capp'),
(36, '2023-01-15 14:30:00', 1, 'fabio_veroli', 'sara-capp'),
(40, '2023-01-15 15:00:00', 1, 'sara-capp', 'luca_bigo'),
(47, '2023-01-15 15:30:00', 1, 'fabio_veroli', 'luca_bigo'),
(49, '2023-01-12 16:00:00', 1, 'fabio_veroli', 'test_user'),
(56, '2023-01-15 16:30:00', 1, 'fabio_veroli', 'test_user'),
(59, '2023-01-15 17:00:00', 1, 'sara-capp', 'test_user'),
(62, '2023-01-15 17:30:00', 1, 'luca_bigo', 'test_user'),
(64, '2023-01-15 18:00:00', 1, 'luca_bigo', 'test_user'),
(65, '2023-01-15 18:30:00', 2, 'sara-capp', 'fabio_veroli'),
(69, '2023-01-15 19:00:00', 2, 'luca_bigo', 'fabio_veroli'),
(72, '2023-01-15 20:00:00', 2, 'luca_bigo', 'test_user'),
(73, '2023-01-15 20:30:00', 2, 'fabio_veroli', 'test_user'),
(74, '2023-01-12 18:55:42', 2, 'sara-capp', 'test_user'),
(78, '2023-01-12 18:58:08', 2, 'luca_bigo', 'test_user'),
(84, '2023-01-12 19:05:32', 2, 'sara-capp', 'luca_bigo'),
(87, '2023-01-12 19:08:04', 2, 'fabio_veroli', 'luca_bigo'),
(90, '2023-01-12 19:13:12', 2, 'fabio_veroli', 'sara-capp');
