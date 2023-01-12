# DailySong 
## Test email functionality
We use Gamil to test the email notification functionality on our local website. By default, the [config.php](config.php) email and password are null, so the email functionality doesn't work. To test the mail functionality, using your Gmail account you have to:
1. Open Google Account
2. Click on  ‘Security’ in your account settings
3. Turn ON the two-step verification for your account
4. Generate new app password
5. Insert your email and password in [config.php](config.php)
6. Now you can use the email functionality

##Test new post functionality
We use Spotify API to retrive our post tracks data. By default, the js/config.js ClientID and ClientSecret are null, so when try to get data from spotify API, an error is thrown. To be able to test the new post functionality you have to: 
1. Go to [Spotify for Developers](https://developer.spotify.com/)
2. Access with your Spotify credentials or create a Spotify account 
3. Go to your Dashboard and click to 'Create an App'
4. Enter an App Name and App Description of your choice, put a tick in the Developer Terms of Service checkbox and finally click on CREATE. Your application is now registered, and you’ll be redirected to the app overview page.
5. Insert the obtained ClientID e CliendSecret in js/config.js
6. Now you can use the new post functionality
