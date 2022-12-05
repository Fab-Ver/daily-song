-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 14 2021              
-- * Generation date: Mon Dec  5 11:20:19 2022 
-- * LUN file:  
-- * Schema: web 
-- ********************************************* 


-- Database Section
-- ________________ 

create database web;
use web;


-- Tables Section
-- _____________ 

create table POST (
     Username varchar(50) not null,
     IDPost int not null,
     LinkCanzone varchar(250) not null,
     CoverLink varchar(250) not null,
     Descrizione varchar(500),
     NumLike int not null,
     NumDislike int not null,
     CommentiAttivi boolean not null,
     constraint ID_POST_ID primary key (Username, IDPost));

create table COMMENTO (
     PostUsername varchar(50) not null,
     IDPost int not null,
     IDCommento int not null,
     Testo varchar(250) not null,
     CommentUsername varchar(50) not null,
     constraint ID_COMMENTO_ID primary key (PostUsername, IDPost, IDCommento));

create table GENERE (
     IDGenere int not null,
     Nome varchar(20) not null,
     constraint ID_GENERE primary key (IDGenere));

create table IMPOSTAZIONI (
     Username varchar(50) not null,
     NotifichePost boolean not null,
     NotificheCommenti boolean not null,
     NotificheFollower boolean not null,
     constraint FKIMPOSTA_ID primary key (Username));

create table NOTIFICA (
     Username varchar(50) not null,
     IDNotifica int not null,
     Testo varchar(100) not null,
     Lettura boolean not null,
     constraint ID_NOTIFICA primary key (Username, IDNotifica));

create table FRIEND (
     Follower varchar(50) not null,
     Followed varchar(50) not null,
     constraint ID_FRIEND primary key (Follower, Followed));

create table POSSIEDE (
     Username varchar(50) not null,
     IDPost int not null,
     IDGenere int not null,
     constraint ID_POSSIEDE_ primary key (IDGenere, Username, IDPost));

create table PREFERISCE (
     IDGenere int not null,
     Username varchar(50) not null,
     constraint ID_PREFERISCE_ID primary key (Username, IDGenere));

create table UTENTE (
     Username varchar(50) not null,
     Nome varchar(50) not null,
     Cognome varchar(50) not null,
     Mail varchar(320) not null,
     Telefono varchar(12),
     Password varchar(50) not null,
     FotoProfilo varchar(100),
     constraint ID_UTENTE primary key (Username));


-- Constraints Section
-- ___________________ 

alter table POST add constraint FKPUBBLICA
     foreign key (Username)
     references UTENTE (Username);

alter table COMMENTO add constraint FKSCRIVE_FK
     foreign key (CommentUsername)
     references UTENTE (Username);

alter table COMMENTO add constraint FKHA
     foreign key (PostUsername, IDPost)
     references POST (Username, IDPost);

alter table IMPOSTAZIONI add constraint FKIMPOSTA_FK
     foreign key (Username)
     references UTENTE (Username);

alter table NOTIFICA add constraint FKRICEVE
     foreign key (Username)
     references UTENTE (Username);

alter table FRIEND add constraint FKFOLLOWED
     foreign key (Followed)
     references UTENTE (Username);

alter table FRIEND add constraint FKFOLLOWER
     foreign key (Follower)
     references UTENTE (Username);

alter table POSSIEDE add constraint FKPOS_GEN
     foreign key (IDGenere)
     references GENERE (IDGenere);

alter table POSSIEDE add constraint FKPOS_POS
     foreign key (Username, IDPost)
     references POST (Username, IDPost);

alter table PREFERISCE add constraint FKPRE_UTE
     foreign key (Username)
     references UTENTE (Username);

alter table PREFERISCE add constraint FKPRE_GEN_FK
     foreign key (IDGenere)
     references GENERE (IDGenere);


-- Index Section
-- _____________ 