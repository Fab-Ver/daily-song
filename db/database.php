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

    public function insertUser($email,$first_name,$last_name,$birth_date,$telephone,$username,$hash,$profile_picture,$notification){
        $query = "INSERT INTO profile (username,firstName,lastName,email,telephone,passwordHash,profilePicture,birthDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssssssss',$username, $first_name, $last_name, $email, $telephone, $hash,$profile_picture,$birth_date);
        $result = $stmt->execute();
        if($result){
            $query = "INSERT INTO settings (username,postNotification,commentNotification,followerNotification) VALUES (?, ?, ?, ?)";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('ssss',$username, $notification, $notification, $notification);
            $stmt->execute();
        }
        return $result;
    }

    public function getUserProfile($username){
        $query = "SELECT firstName, lastName, profilePicture FROM profile WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserFollowed($username){
        $query = "SELECT username, profilePicture FROM friend, profile WHERE follower = ? AND followed = profile.username";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserFollower($username){
        $query = "SELECT username, profilePicture FROM friend, profile WHERE followed = ? AND follower = profile.username";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserPreferredGenres($username){
        $query = "SELECT tag FROM prefers, genre WHERE username = ? AND prefers.genreId = genre.genreID";
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
}
?>