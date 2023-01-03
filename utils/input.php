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
                    $error .= '<li>'.SHORT_PASSWORD.'</li>';
                }
                if (strlen($password) > 30) {
                    $error .= '<li>'.LONG_PASSWORD.'</li>';
                }
                if(!preg_match("#[0-9]+#",$password)) {
                    $error .= '<li>'.NUMBER_PASSWORD.'</li>';
                }
                if(!preg_match("#[A-Z]+#",$password)) {
                    $error .= '<li>'.UPPER_PASSWORD.'</li>';
                }
                if(!preg_match("#[a-z]+#",$password)) {
                    $error .= '<li>'.LOWER_PASSWORD.'</li>';
                }
                if(!preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $password)) {
                    $error .= '<li>'.SPECIAL_PASSWORD.'</li>';
                }
                if(empty($error)){
                    return [true,""];
                }
                return [false,"Your password:<ul>".$error.'</ul>'];
            } else {
                $error.="Please enter your password";
                return [false,$error];
            }
            
        }

        /**
         * Check first name and last name validity
         */
        static function validate_name(string $name) : bool{
            return !empty($name) && ctype_alpha($name);
        }

        /**
         * Check if date string is valid (YYYY-MM-DD)
         */
        static function validate_date(string $date) : bool {
            if(!empty($date)){
                $components = explode('-',$date);
                if(count($components) == 3){
                    if(checkdate($components[1],$components[2],$components[0])){
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         * Check if birth date is valid
         */
        static function validate_birth_date(string $birth_date) : bool {
            $date = DateTime::createFromFormat('Y-m-d',$birth_date);
            $minInterval = DateInterval::createFromDateString('18 years');
            $maxInterval = DateInterval::createFromDateString('120 years');
            $minDobLimit = ( new DateTime() )->sub($minInterval);
            $maxDobLimit = ( new DateTime() )->sub($maxInterval);
            if($date <= $maxDobLimit || $date >= $minDobLimit){
                return false;
            }
            return true;
        }

        /**
         * Check if phone number is valid, format +XX.XXX.XXXXXXX
         */
        static function validate_phone_number(string $phone_number) : bool {
            return preg_match('/^\+?([0-9]{2})\)?[-.]?([0-9]{3})[-.]?([0-9]{7})$/',$phone_number);
        }

        /**
         * Check if genres ID its valid and exits in database
         */
        static function validate_genresID(array $genresID) : bool {
            global $dbh;
            foreach($genresID as $id){
                if(!is_numeric($id)) {
                    return false;
                }
                if(count($dbh->getGenresByID($id)) == 0){
                    return false;
                }
            }
            return true;
        }
    }
?>