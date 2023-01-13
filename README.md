# DailySong 

Developed by:
- [Fabio Veroli](https://github.com/Fab-Ver)
- [Luca Bighini](https://github.com/BigoLuca)
- [Sara Cappelletti](https://github.com/SaraCappelletti)

## Introduction

DailySong is a social network based on music.
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
9. [Other](#other)

## Registration & Login

User can only use the social network functionalities if logged in. If not logged in user can either login or create a new account.  
Login page includes also the possibility to reset the user password, using a link send via mail and the possibility to remind the user when they logged in for a period of 30 days. 

## User Profile

User profile contains profile picture, username, name, surname, user favorite music genres and posts.

### Follow

Each profile contains the list of follower/followed profiles. In each list there is a button to follow a user and a link to visit their profile. 

## Home

Home contains followed users posts. By default it display the current day posts, but the user can select posts by music genres OR date. At the end of the page there is a button that brings you back to the top of the page.

## Posts

### New Post

In the new post page user can insert post by adding a Spotify URL, then the data are automatically retrieved from Spotify API. Then, user can specify their post music genres (from 1 to 3) and add a description (optional). User can decide to deactivate comments for every post. User can post only once a day.

### Post Elements

Each post contains: 
- Date and time
- Album cover
- Song title
- Artists
- Album name
- Genres of the post
- Song preview (if available)
- Like/Dislike button
- Description
- Spotify's song link
- Comments section (if active)

### Comments Section

In the comment section (if active) user can post a comment, see all comments and delete their own comments. 

## Notifications

There are two kind of notifications, inside the website or by email.  

First includes notifications sent when:
- New follower
- New reaction (like/dislike) to user posts
- New comments under user post
- New post published by follower  

The second instead includes notifications sent when:
- New follower
- New post published by follower
- New access to user account
- Blocked account due to too many failed login attempts

See below on [how to use email feature](#test-email-functionality). 

## Search

In the search page, user can search for every other user in the website, by username. 

## Settings

Settings includes:
- **Account settings**: user can change their username, name, surname, telephone, profile picture or reset their password.
- **Profile settings**: user can change their favorite music genres and manage their posts.
- **Notifications settings**: user can decide which type of notification he want to receive. All type of notifications can be disabled, except for blocked account email, that are always sent. 
- **Logout and Delete Account**

### Post Manager

In the post manager user can see all their posts status and infos. User can delete, archive and modify post. The archived post will not be displayed in home and profile. In the modify page user can change post music genres, description and comments active status. 

## Security

The following security feature were implemented:
- Secure password store
- Access database with "secure user" that can execute only certain operations 
- Secure PHP session
- Prevent brute force attack when login by blocking user after too many failed login attempts
- Identity verification to prevent session hijacking 
- Secure remember me feature
- Secure password reset
- Implement `Input` php class to filter and validate different kind of user input

## Other

- `AJAX` ([Axios](https://axios-http.com/)): used to request data to the server.
- 'PHPMailer' library: used to send email notification. 


## How to use
- [Test email functionality](#test-email-functionality)
- [Test new post functionality](#test-new-post-functionality)

### Test email functionality

We use Gmail to test the email notification functionality on our local website. By default, the [config.php](config.php) email and password are `null`, so the email functionality doesn't work, only website notifications are sent. To test the mail functionality, using your Gmail account you have to:
1. Open Google Account
2. Click on  ‘Security’ in your account settings
3. Turn ON the two-step verification for your account
4. Generate new app password
5. Insert your email and password in [config.php](config.php)
6. Now you can use the email functionality

### Test new post functionality

We use Spotify API to retrieve post tracks data. By default, the [js/config.js](js/config.js) ClientID and ClientSecret are `undefined`, so when trying to get data from spotify API, an error is thrown. In this case you can only post track that are already in our local database. To be able to test the new post functionality, using Spotify API you have to: 
1. Go to [Spotify for Developers](https://developer.spotify.com/)
2. Access with your Spotify credentials or create a Spotify account 
3. Go to your Dashboard and click to 'Create an App'
4. Enter an App Name and App Description of your choice, put a tick in the Developer Terms of Service checkbox and finally click on CREATE. Your application is now registered, and you’ll be redirected to the app overview page.
5. Insert the obtained ClientID e ClientSecret in [js/config.js](js/config.js)
6. Now you can use the new post functionality
