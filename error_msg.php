<?php
    define('NO_USER','No user matches the entered email.');
    define('DISABLED_USER','Too many failed login attempts, your account has been disabled, please try later.');
    define('WRONG_PASSWORD','Wrong password');
    define('INVALID_EMAIL','Invalid email format, expected example@domain.com');
    define('UNDEFINED','An undefined error occurred while trying to process your data, try later.');
    define('MAIL_NOT_SENT','Message could not be sent, try later');
    define('INVALID_LINK','<article>
                        		<h2>Invalid Link</h2>
                           		<p>The link is invalid/expired. Either you did not copy the correct link from the email, or you have already used the token (in this case it is has been disabled).</p>
                           		<p><a href="forgot_password.php">Click here</a> to reset password.</p>
                           </article>');
    define('EXPIRED_LINK', '<article>
                                <h2>Expired Link</h2>
        						<p>The link is expired. You are trying to use an expired link, which is valid for only 24 hours (1 days after request).</p>
        						<p><a href="forgot_password.php">Click here</a> to reset password.</p>
   							 </article>');
    define('INVALID_TOKEN','Invalid token: the token does not exist or you already use the token');
    define('EXPIRED_TOKEN','Expired token: you are trying to use an expired token, which is valid for only 24 hours.');
    define('SHORT_PASSWORD',"must contain at least 8 Digits");   
    define('LONG_PASSWORD',"can contain up to 30 Digits");
    define('NUMBER_PASSWORD',"must contain at least 1 Number");
    define('UPPER_PASSWORD',"must contain at least 1 Capital Letter");
    define('LOWER_PASSWORD',"must contain at Least 1 Lowercase Letter !");
    define('SPECIAL_PASSWORD',"must contain at least 1 Special Character");
    define('PASSWORD_MISMATCH',"Passwords do not match");
    define('EMAIL_IN_USE','An account is already registered with your email.');
    define('USERNAME_REQUIRED','Username required, enter username to continue');
    define('USERNAME_IN_USE','An account is already registered with this username.');
    define('NAME','name required, enter no numeric name to continue');
    define('INVALID_DATE','Invalid date format expected YYYY-MM-DD');
    define('WRONG_DATE','You are to young or to old to subscribe to our website');
    define('INVALID_TELEPHONE','Invalid telephone format, expected +XX.XXX.XXXXXXX');
    define('GENRES_ID_NUM','Wrong number of selected genresID, please select between 1 and 5 genres');
    define('GENRES_ID_POST','Wrong number of selected genresID, please select between 1 and 3 genres');
    define('INVALID_GENRES_ID','Invalid genresID format, the selected genresID do not match any music genre');
    define('INVALID_IMAGE', 'The uploaded file is not an image.');
    define('FILE_EXTENSION','Wrong file extension, accepted: ');
    define('ERROR_UPLOAD','Error uploading the image');
    define('IMAGE_DIMENSION','The image should have equal width and height.');
    define('EMPTY_TRACK_ID','Track ID required, please enter track ID to continue');
    define('INVALID_TRACK_ID','The specified track ID is not in our system, try with another track ID');
    define('WRONG_FORMAT_TRACK_ID','Invalid trackID format, enter valid trackID to continue');
    define('EMPTY_TITLE','Title required, please enter title to continue');
    define('EMPTY_ARTIST','Artist name required, please enter artist name to continue');
    define('EMPTY_ALBUM','Album name required, please enter album name to continue');
    define('INVALID_URL','must be a valid url, enter valid url to continue');
    define('ID_MISMATCH','The trackID must be the same specified in the spotify url');
    define('TRACK_ID_IN_USE','Track ID already registered, bad request.');
    define('INVALID_POST_ID','<article>
                                <h2>Invalid postID</h2>
                                <p>The specified postID do not match any of the user posts. Try again.</p>
                            </article>')
?>