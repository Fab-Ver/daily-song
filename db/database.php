<?php
class DatabaseHelper{
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port){
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }        
    }

    public function getUser($email){
        $query = "SELECT username, email, passwordHash FROM profile WHERE email = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$email);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function checkUsername($username){
        $query = "SELECT username FROM profile WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function insertUser($email,$first_name,$last_name,$birth_date,$telephone,$username,$hash,$profile_picture){
        $query = "INSERT INTO profile (username,firstName,lastName,email,telephone,passwordHash,profilePicture,birthDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssssssss',$username, $first_name, $last_name, $email, $telephone, $hash,$profile_picture,$birth_date);
        $result = $stmt->execute();
        return $result;
    }

    public function insertSettings($username,$notification){
        $query = "INSERT INTO settings (username,postNotification,commentNotification,followerNotification) VALUES (?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssss',$username, $notification, $notification, $notification);
        $stmt->execute();
    }

    public function insertFavoriteGenres($username,$genresIDs){
        foreach($genresIDs as $id){
            $query = "INSERT INTO prefers (genreID,username) VALUES (?, ?)";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('ss',$id,$username);
            $stmt->execute();
        }   
    }

    function checkbrute($username){
        $now = time();
        $valid_attempts = $now - (3*60*60);
        $query="SELECT time FROM login_attempts WHERE username = ? AND time > '$valid_attempts'";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $stmt->store_result();
        if($stmt->num_rows() > 5){
            return true;
        }
        return false;
    }

    function insertLoginAttempts($username){
        $now = time();
        $query = "INSERT INTO login_attempts (username,time) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$username,$now);
        $stmt->execute();
    }

    public function getUserProfile($username){
        $query = "SELECT firstName, lastName, profilePicture FROM profile WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_assoc();
    }

    public function getUserFollowed($username){
        $query = "SELECT username, profilePicture FROM friend JOIN profile ON friend.followed = profile.username WHERE follower = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserFollower($username){
        $query = "SELECT username, profilePicture FROM friend, JOIN profile ON friend.follower = profile.username WHERE followed = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserPreferredGenres($username){
        $query = "SELECT tag FROM prefers JOIN genre ON prefers.genreId = genre.genreID WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result;
    }

    public function getUserPosts($username){
        $query = "SELECT urlSpotify, urlImage, description, likeNum, dislikeNum, dateTime FROM post WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostComments($username, $postID){
        $query = "SELECT text, dateTime, commentUsername FROM comment WHERE username = ? AND postID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    function getGenres(){
        $query = "SELECT genreID,tag FROM genre";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
?>