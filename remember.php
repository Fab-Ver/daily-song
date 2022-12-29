<?php
    require_once 'bootstrap.php';
    /**
     * Generate pair of random token selector and validator.
     */
    function generate_tokens() : array {
        $selector = bin2hex(random_bytes(16));
        $validator = bin2hex(random_bytes(32));
        return [$selector,$validator,$selector.':'.$validator];
    }

    /**
     * Splits the token stored in the cookie into selector and validator
     */
    function parse_token(string $token): ?array{
        $tokens = explode(':',$token);

        if($tokens && count($tokens) == 2){
            return [$tokens[0],$tokens[1]];
        }
        return null;
    }

    /**
     * Parse the token stored in the cookie (selector:validator) and return
     * true if the token is valid and not expired
     */
    function token_is_valid(string $token): bool{
        global $dbh;
        [$selector,$validator] = parse_token($token);
        $tokens = $dbh->findUserTokenBySelector($selector);
        if(!$tokens){
            return false;
        }

        return password_verify($validator,$tokens['hashed_validator']);
    }
?>