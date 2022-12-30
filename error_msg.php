<?php
    define('NO_USER','No user matches the entered email.');
    define('DISABLED_USER','Too many failed login attempts, your account has been disabled, please try later.');
    define('WRONG_PASSWORD','Wrong password');
    define('INVALID_EMAIL','Invalid email format expected example@domain.com');
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
    define('SHORT_PASSWORD',"must contain at least 8 Digits"."<br>");   
    define('LONG_PASSWORD',"can contain up to 30 Digits"."<br>");
    define('NUMBER_PASSWORD',"must contain at least 1 Number"."<br>");
    define('UPPER_PASSWORD',"must contain at least 1 Capital Letter"."<br>");
    define('LOWER_PASSWORD',"must contain at Least 1 Lowercase Letter !"."<br>");
    define('SPECIAL_PASSWORD',"must contain at least 1 Special Character"."<br>");
    define('PASSWORD_MISMATCH',"Passwords do not match");
?>