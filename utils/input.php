<?php
    class Input{

        /**
         * Filter string to remove white spaces at the end or beginning of the string and also remove html special chars.
         */
        static public function filter_string(string $data) : string {
            return htmlspecialchars(stripslashes(trim($data)));
        }

        /**
        * Check if email is valid and not empty.
        */
        static function validate_email(string $email) : bool {
            return !empty($email) && filter_var($email,FILTER_VALIDATE_EMAIL);
        }

        /**
         * Convert string to boolean.
         */
        static function validate_boolean(string $boolean) : bool {
            return filter_var($boolean, FILTER_VALIDATE_BOOLEAN);
        }

        /**
         * Check if string contains all hexadecimal digit
        */
        static function is_hex(string $hex_string) : bool {
            return ctype_xdigit($hex_string);
        }

        /**
         * Check if password is secure
         */
        static function is_secure_password(string $password) : array{
            $error = "";
            if(!empty($password)){
                if (strlen($password) < 8) {
                    $error .= SHORT_PASSWORD;
                }
                if (strlen($password) > 30) {
                    $error .= LONG_PASSWORD;
                }
                if(!preg_match("#[0-9]+#",$password)) {
                    $error .= NUMBER_PASSWORD;
                }
                if(!preg_match("#[A-Z]+#",$password)) {
                    $error .= UPPER_PASSWORD;
                }
                if(!preg_match("#[a-z]+#",$password)) {
                    $error .= LOWER_PASSWORD;
                }
                if(!preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $password)) {
                    $error .= SPECIAL_PASSWORD;
                }
                if(empty($error)){
                    return [true,""];
                }
                return [false,"Your password:<br>".$error];
            } else {
                $error.="Please enter your password";
                return [false,$error];
            }
            
        }
    }
?>