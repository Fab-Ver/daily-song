-- Database Section
-- ________________ 

create database db;
use db;


-- Tables Section
-- _____________ 

create table belongs (
     genreID int not null,
     username varchar(50) not null,
     postID int not null,
     constraint ID_belongs primary key (genreID, username, postID));

create table comment (
     postUsername varchar(50) not null,
     postID int not null,
     commentID int not null,
     text varchar(250) not null,
     dateTime date not null,
     commentUsername varchar(50) not null,
     constraint ID_comment primary key (postUsername, postID, commentID));

create table friend (
     follower varchar(50) not null,
     followed varchar(50) not null,
     constraint ID_friend primary key (followed, follower));

create table genre (
     genreID int not null auto_increment,
     tag varchar(20) not null,
     constraint ID_genre primary key (genreID));

create table notification (
     username varchar(50) not null,
     notificationID int not null,
     text varchar(100) not null,
     readStaus char not null,
     dateTime date not null,
     constraint ID_notification primary key (username, notificationID));

create table post (
     username varchar(50) not null,
     postID int not null,
     urlSpotify varchar(250) not null,
     urlImage varchar(250) not null,
     description varchar(500),
     likeNum int not null,
     dislikeNum int not null,
     activeComments char not null,
     dateTime date not null,
     constraint ID_post_ID primary key (username, postID));

create table prefers (
     genreID int not null,
     username varchar(50) not null,
     constraint ID_prefers primary key (username, genreID));

create table settings (
     username varchar(50) not null,
     postNotification char not null,
     commentNotification char not null,
     followerNotification char not null,
     constraint FKset_ID primary key (username));

create table profile (
     username varchar(50) not null,
     firstName varchar(50) not null,
     lastName varchar(50) not null,
     email varchar(320) not null,
     telephone varchar(12),
     passwordHash varchar(250) not null,
     profilePicture varchar(100),
     birthDate date not null,
     constraint ID_user primary key (username));


-- Constraints Section
-- ___________________ 

alter table belongs add constraint FKbel_pos
     foreign key (username, postID)
     references post (username, postID);

alter table belongs add constraint FKbel_gen
     foreign key (genreID)
     references genre (genreID);

alter table comment add constraint FKwrite
     foreign key (commentUsername)
     references profile (username);

alter table comment add constraint FKhas
     foreign key (postUsername, postID)
     references post (username, postID);

alter table friend add constraint FKfollower
     foreign key (followed)
     references profile (username);

alter table friend add constraint FKfollowed
     foreign key (follower)
     references profile (username);

alter table notification add constraint FKreceives
     foreign key (username)
     references profile (username);

-- Not implemented
-- alter table post add constraint ID_post_CHK
--     check(exists(select * from belongs
--                  where belongs.username = username and belongs.postID = postID)); 

alter table post add constraint FKpublish
     foreign key (username)
     references profile (username);

alter table prefers add constraint FKpre_use
     foreign key (username)
     references profile (username);

alter table prefers add constraint FKpre_gen
     foreign key (genreID)
     references genre (genreID);

alter table settings add constraint FKset_FK
     foreign key (username)
     references profile (username);


-- Index Section
-- _____________ 

