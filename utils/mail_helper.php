<?php
use PHPMailer\PHPMailer\PHPMailer;
//use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once 'utils/functions.php';
require_once 'config.php';
require 'vendor/autoload.php';

    class MailHelper{
        private $mail;

        /**
         * Create a new PHPMailer object, if USERNAME and PASSWORD == null an exception is thrown.
         */
        public function __construct(){
            if(USERNAME !== null && PASSWORD !== null){
                $this->mail = new PHPMailer(true);
                //$mail->SMTPDebug = SMTP::DEBUG_SERVER;       //Enable verbose debug output
                $this->mail->isSMTP();                         //Send using SMTP
                $this->mail->Host       = 'smtp.gmail.com';    //Set the SMTP server to send through
                $this->mail->SMTPAuth   = true;                //Enable SMTP authentication
                $this->mail->Username   = USERNAME;            //SMTP username
                $this->mail->Password   = PASSWORD;            //SMTP password
                $this->mail->SMTPSecure = 'tls';               //Enable implicit TLS encryption
                $this->mail->Port       = 587; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
                $this->mail->setFrom('from@example.com', 'DailySong'); 
                $this->mail->isHTML(true); //Set email format to HTML
            } else {
                throw new Exception('Invalid email or password');
            }
        }

        /**
         * Send email to reset password
         */
        public function sendResetPasswordEmail(string $recipient, string $token) : bool {
            $this->mail->Subject = 'Reset Password';
            $body='<p>Please click on the following link to reset your password.</p>';
            $body.='<p>-------------------------------------------------------------</p>';
            $body.='<p><a href="'.dir_name().'/reset_password.php?token='.$token.'">"'.dir_name().'/reset_password.php?token='.$token.'"</a></p>';		
            $body.='<p>-------------------------------------------------------------</p>';
            $body.='<p>The link will expire after 1 day for security reason.</p>';
            $body.='<p>If you did not request this forgotten password email, no action is needed, your password will not be reset.</p>';   	
            $body.='<p>by DailySong</p>';
            $this->mail->Body = $body;
            $this->mail->addAddress($recipient);
            try{
                if($this->mail->send()){
                    return true;
                }
            } catch (Exception $e) {
                return false;
            }
        }

        /**
         * Send a new email containing a new notification
         */
        public function sendEmailNotification(string $recipient, string $message, string $subject) : bool{
            $this->mail->Subject = $subject;
            $this->mail->addAddress($recipient);
            $this->mail->Body = $message;
            try{
                if($this->mail->send()){
                    return true;
                }
            } catch (Exception $e){
                return false;
            }
        }

        /**
         * Send notification when account blocked due to too many failed login attempts 
         */
        public function sendBlockedAccountEmail(string $recipient){
            $this->mail->Subject = 'Blocked Account';
            $body='<p>Your account has been blocked due to too many failed login attempts.</p>';
            $body.='<p>-------------------------------------------------------------</p>';
            $body.='<p>Was it you? Then try to <a href="'.dir_name().'/forgot_password.php">reset the password</a>.</p>';	
            $body.='<p>Wasn\'t it you? Make sure you reset your password as soon as your account is unlocked (about 3 hours)</p>';	
            $body.='<p>-------------------------------------------------------------</p>';  	
            $body.='<p>DailySong</p>';
            $this->mail->Body = $body;
            $this->mail->addAddress($recipient);
            try{
                if($this->mail->send()){
                    return true;
                }
            } catch (Exception $e) {
                return false;
            }
        }
    }
?>