<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once 'bootstrap.php';
require_once 'config.php';
require 'vendor/autoload.php';
secure_session_start();
$result["serverError"] = false;
$result["sent"] = false;

if(!isUserLoggedIn()){
    if(isset($_POST['email'])){
        if(count($dbh->getUser($_POST['email'])) != 0){
            $mail = new PHPMailer(true);
            $key = bin2hex(random_bytes(50));
            $email = $_POST['email'];
            $expDate = date("Y-m-d H:i:s");
            $result["serverError"]=$dbh->insertResetRequest($email,$key,$expDate);
            if(!$result["serverError"]){
                $body='<p>Please click on the following link to reset your password.</p>';
                $body.='<p>-------------------------------------------------------------</p>';
                $body.='<p><a href="http://localhost/progetto_web/reset_password.php?key='.$key.'&email='.$email.'">"http://localhost/progetto_web/reset_password.php?key='.$key.'&email='.$email.'"</a></p>';		
                $body.='<p>-------------------------------------------------------------</p>';
                $body.='<p>The link will expire after 1 day for security reason.</p>';
                $body.='<p>If you did not request this forgotten password email, no action 
                is needed, your password will not be reset.</p>';   	
                $body.='<p>Progetto Web</p>';
                try {
                    //Server settings
                    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
                    $mail->isSMTP();                                            //Send using SMTP
                    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
                    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                    $mail->Username   = USERNAME;                     //SMTP username
                    $mail->Password   = PASSWORD;                               //SMTP password
                    $mail->SMTPSecure = 'tls';                                  //Enable implicit TLS encryption
                    $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
                    //Recipients
                    $mail->setFrom('from@example.com', 'Progetto Web'); //Cambiare nome mailer
                    $mail->addAddress($_POST['email']);     //Add a recipient
                    //$mail->addReplyTo('info@example.com', 'Information');
    
                    //Content
                    $mail->isHTML(true);                                  //Set email format to HTML
                    $mail->Subject = 'Reset Password';
                    $mail->Body    = $body;
                    //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
                    if($mail->send()){
                        $result["sent"]= true;
                    }
                } catch (Exception $e) {
                    $result["sent"]= false;
                }
            }    
        }
    }
} else {
    header('Location: homepage.php');
}

header('Content-Type: application/json');
echo json_encode($result);


?>