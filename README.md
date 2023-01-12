# DailySong 
Developed by:
- [Fabio Veroli](https://github.com/Fab-Ver)
- [Luca Bighini](https://github.com/BigoLuca)
- [Sara Cappelletti](https://github.com/SaraCappelletti)

## Introduction
DailySong is a social based on music.
You can share your favorite song of the day with your friends and interact with their posts. 

## Features

1. [Registration & Login](#registration--login)
2. [User Profile](#user-profile)
   - [Follow](#follow)
3. [Home](#home)
4. [Posts](#posts)
   - [New Post](#new-post)
   - [Post Elements](#post-elements)
   - [Comments Section](#comments-section)
5. [Notifications](#notifications)
6. [Search](#search)
7. [Settings](#settings)
   - [Post Manager](#post-manager)
8. [Security](#security)

### Registration & Login

### User Profile
User profile contains profile picture, username, name, surname, user favorite music genres and posts.
#### Follow
Each profile have the count of follower/followed and link to list of follower/followed profiles. In the list there is a button to follow a user and a link to visit its profile. 
### Home
Home is a list of followed users posts. By default it display the current day post, but the user can select them by music genres or date. At the end of the page there is a button that brings you back to the top of the page.
### Posts
#### New Post
In the new post page user can insert post by adding a Spotify URL, then the data are automatically retrived from Spotify API. User can then decide is post music genres and add a description. User can decide to deactive comments for every post. User can only post once a day.
#### Post Elements
Each post contains: post date and time, album cover, song title, artist and album name, genres of the song, song preview (if available), like/dislike button, description, song link to spotify and comments section.
#### Comments Section
In the comment section (if active) user can post a comments, see all comments and delete their own comments. 
#### Notifications
There two kind of notifications, inside the site or by email. First includes, new follower, reaction and comments to your post and new follower post notifications. The second instead includes new follower, new post, access to your account and blocked account notifications. See below on how to use email notifications. 
#### Search
In the search page, user can search for every other user in the website, by username. 
#### Settings
Settings includes
- Account settings: where user can change his username, name, surname, telephone, profile picture or reset his password.
- Profile settings: where user can change his favorite music genres and the post manager.
- Notifications settings: the user can decide which notification he want to recieve. 
- Logout and Delete Account
##### Post Manager
In the post manager user can see all his posts status and infos. User can delete, archive and modify post. The archived post will not be dispalyed in home and profile.

 





















## Test email functionality
We use Gamil to test the email notification functionality on our local website. By default, the [config.php](config.php) email and password are null, so the email functionality doesn't work. To test the mail functionality, using your Gmail account you have to:
1. Open Google Account
2. Click on  ‘Security’ in your account settings
3. Turn ON the two-step verification for your account
4. Generate new app password
5. Insert your email and password in [config.php](config.php)
6. Now you can use the email functionality

## Test new post functionality
We use Spotify API to retrive our post tracks data. By default, the js/config.js ClientID and ClientSecret are null, so when try to get data from spotify API, an error is thrown. To be able to test the new post functionality you have to: 
1. Go to [Spotify for Developers](https://developer.spotify.com/)
2. Access with your Spotify credentials or create a Spotify account 
3. Go to your Dashboard and click to 'Create an App'
4. Enter an App Name and App Description of your choice, put a tick in the Developer Terms of Service checkbox and finally click on CREATE. Your application is now registered, and you’ll be redirected to the app overview page.
5. Insert the obtained ClientID e CliendSecret in js/config.js
6. Now you can use the new post functionality
