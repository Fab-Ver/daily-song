<?php
class DatabaseHelper{
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port){
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }        
    }

    public function findUsernameByEmail($email){
        $query = "SELECT username FROM profile WHERE email = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$email);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function findUserByUsername($username){
        $query = "SELECT username, passwordHash, email FROM profile WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function insertUser(string $email, string $first_name, string $last_name, string $birth_date, string $telephone, string $username, string $hash, string $profile_picture) : bool{
        $query = "INSERT INTO profile (username,firstName,lastName,email,telephone,passwordHash,profilePicture,birthDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssssssss',$username, $first_name, $last_name, $email, $telephone, $hash,$profile_picture,$birth_date);
        return $stmt->execute();
    }

    public function insertSettings(string $username, bool $post, bool $comment, bool $follower, bool $account) : bool{
        $post = (int) $post;
        $comment = (int) $comment;
        $follower = (int) $follower;
        $account = (int) $account;
        $query = "INSERT INTO settings (username,postNotification,commentNotification,followerNotification,accountNotification) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('siiii',$username, $post,$comment,$follower,$account);
        return $stmt->execute();
    }

    public function getSettingsByUsername(string $username) {
        $query = "SELECT postNotification,commentNotification,followerNotification,accountNotification FROM settings WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function updateSettings(string $username, bool $post, bool $comment, bool $follower, bool $account) : bool{
        $post = (int) $post;
        $comment = (int) $comment;
        $follower = (int) $follower;
        $account = (int) $account;
        $query = "UPDATE settings SET postNotification = ?,commentNotification = ?,followerNotification = ?,accountNotification = ? WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('iiiis',$post,$comment,$follower,$account,$username);
        return $stmt->execute();
    }

    public function insertFavoriteGenres($username,$genresIDs){
        foreach($genresIDs as $id){
            $query = "INSERT INTO prefers (genreID,username) VALUES (?, ?)";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('ss',$id,$username);
            $stmt->execute();
        }   
    }

    public function removeAllFavoriteGenres(string $username){
        $query = "DELETE FROM prefers WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
    }

    function isUserActive(string $username) : bool{
        $now = time();
        $valid_attempts = $now - (3*60*60);
        $query="SELECT time FROM login_attempts WHERE username = ? AND time > '$valid_attempts'";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $stmt->store_result();
        if($stmt->num_rows() > 5){
            return false;
        }
        return true;
    }

    function insertFailedLoginAttempts(string $username){
        $now = time();
        $query = "INSERT INTO login_attempts (username,time) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$username,$now);
        $stmt->execute();
    }

    public function getUserProfile(string $username){
        $query = "SELECT username, firstName, lastName, profilePicture, telephone FROM profile WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_assoc();
    }

    public function getUserFollowed($username){
        $query = "SELECT username, profilePicture FROM friend JOIN profile ON friend.followed = profile.username WHERE follower = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserFollower($username){
        $query = "SELECT username, profilePicture FROM friend JOIN profile ON friend.follower = profile.username WHERE followed = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserPreferredGenres($username){
        $query = "SELECT prefers.genreID,tag FROM prefers JOIN genre ON prefers.genreID = genre.genreID WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserPostsDate(string $username){
        $query="SELECT DATE(dateTime) as postDate FROM post WHERE username = ? AND archived = 0";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserByPost(int $postID){
        $query="SELECT username FROM post WHERE postID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $postID);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostGenres(string $postID){
        $postID = intval($postID);
        $query = "SELECT genre.genreID,tag FROM belongs JOIN genre ON belongs.genreID = genre.genreID WHERE belongs.postID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $postID);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostOfDay(string $username, string $day){
        $query="SELECT DISTINCT post.* FROM post JOIN friend ON post.username = friend.followed OR post.username = ? WHERE DATE(post.dateTime) = ? AND friend.follower = ? AND post.archived = 0 ORDER BY post.dateTime DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sss', $username, $day, $username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostByIdGenre(string $username, $idGenre){
        $query="SELECT DISTINCT post.* FROM post JOIN belongs ON post.postID = belongs.postID JOIN friend ON post.username = friend.followed OR post.username = ? WHERE friend.follower = ? AND post.archived = 0";
        
        if(count($idGenre) !== 0){
            $it = 0;
            foreach($idGenre as $genre){
                if($it === 0){
                    $query .= " AND ( ";
                    $it = 1;
                }else{
                    $query .= " OR ";
                }
                $query .= "belongs.genreID = '$genre' ";
            }
        }
        $query .= " ) ORDER BY post.dateTime DESC";
        
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $username, $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getTimePost(int $postID){
        $query="SELECT DATE(dateTime) as day, HOUR(dateTime) as hour, MINUTE(dateTime) as minute FROM post WHERE post.postID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $postID);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return mysqli_fetch_array($result, MYSQLI_ASSOC);
    }

    public function getUserPosts(string $username){
        $query = "SELECT  postID, description, activeComments, dateTime, urlSpotify, urlImage, urlPreview, title, artists, albumName FROM post JOIN track ON post.trackID = track.trackID WHERE username = ? AND post.archived = 0";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Get all the user post even the archived ones.
     */
    public function getAllUserPosts(string $username){
        $query = "SELECT  postID, description, activeComments, DATE(dateTime) AS `date`, urlImage, title, artists, albumName,archived FROM post JOIN track ON post.trackID = track.trackID WHERE username = ? ORDER BY `date` DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function insertPostComment(string $text, string $dateTime, string $username, int $postID) : bool{
        $query = "INSERT INTO comment (text, dateTime, username, postID) VALUES (?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sssi',$text, $dateTime, $username, $postID);
        $result=$stmt->execute();
        return $result;
    }

    public function deletePostComment(int $commentID){
        $query = "DELETE FROM comment WHERE commentID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$commentID);
        $result=$stmt->execute();
        return $result;
    }

    public function getPostComments(int $postID){
        $query = "SELECT comment.*, profilePicture FROM comment JOIN profile ON profile.username = comment.username WHERE postID = ? ORDER BY comment.dateTime DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $postID);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getReactions(int $postID){
        $query = "SELECT username, likes FROM reaction WHERE postID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $postID);
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

    function checkTrack(string $trackID) : bool{
        $query = "SELECT trackID FROM track WHERE trackID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$trackID);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        return count($result) > 0;
    }

    function getTrack(string $trackID) {
        $query = "SELECT * FROM track WHERE trackID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$trackID);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    function insertTrack(string $trackID, string $urlSpotify, string $urlImage, string $urlPreview, string $title, string $artists, string $albumName) : bool{
        $query = "INSERT INTO track (trackID, urlSpotify, urlImage, urlPreview, title, artists, albumName) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sssssss',$trackID, $urlSpotify, $urlImage, $urlPreview, $title, $artists, $albumName);
        $result=$stmt->execute();
        return $result;
    }

    function getMaxPostID() : int{
        $stmt = $this->db->prepare("SELECT MAX(postID) AS max FROM post");
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        if(count($result) == 0){
            return 1;
        }
        return $result["0"]["max"]+1;
    }

    function insertPost(string $username, string $trackID, string $description, bool $activeComments, string $datetime) : array{
        $postID = $this->getMaxPostID();
        $active = (int) $activeComments;
        $archived = 0;
        $query = "INSERT INTO post (postID,description,activeComments,dateTime,trackID,username,archived) VALUES (?,?,?,?,?,?,?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('isisssi',$postID,$description,$active,$datetime,$trackID,$username,$archived);
        $result = $stmt->execute();
        return [$result,$postID];
    }

    function updatePost(int $postID, string $description, bool $activeComments) : bool{
        $active = (int) $activeComments;
        $query = "UPDATE post SET description = ?, activeComments = ? WHERE postID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sii',$description,$active,$postID);
        return $stmt->execute();
    }

    function insertPostGenres($postID,$genresIDs){
        foreach($genresIDs as $id){
            $query = "INSERT INTO belongs (genreID,postID) VALUES (?, ?)";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('ss',$id,$postID);
            $stmt->execute();
        }   
    }

    function deletePostGenres(int $postID): bool{
        $query = "DELETE FROM belongs WHERE postID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$postID);
        return $stmt->execute();    
    }

    function insertResetRequest(string $email, string $token, string $expDate) : bool{
        $query = "INSERT INTO password_reset (email,token,expDate) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sss',$email, $token, $expDate);
        return $stmt->execute();
    }

    function insertFollowed(string $followed, string $me){
        $query = "INSERT INTO friend (followed, follower) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $followed, $me);
        $result=$stmt->execute();
        return $result;
    }

    function removeFollowed(string $followed, string $me){
        $query = "DELETE FROM friend WHERE followed = ? AND follower = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $followed, $me);
        $result=$stmt->execute();
        return $result;
    }

    function getResetRequest(string $token){
        $query = "SELECT email,token,expDate FROM password_reset WHERE token = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $token);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    function resetPassword(string $email, string $password) : bool{
        $query = "UPDATE profile SET passwordHash = ? WHERE profile.email = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $password, $email);
        return $stmt->execute();
    }

    function removeTokens(string $email){
        $query = "DELETE FROM password_reset WHERE password_reset.email = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $email);
        $stmt->execute();
    }

    function insertUserToken(string $username, string $selector, string $hashed_validator, string $expiry) : bool {
        $query = "INSERT INTO user_tokens (selector,hashed_validator,username,expiry) VALUES (?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssss',$selector, $hashed_validator, $username, $expiry);
        return $stmt->execute();
    }

    public function findUserTokenBySelector(string $selector){
        $query = "SELECT tokenID, selector, hashed_validator, username, expiry FROM user_tokens WHERE selector = ? AND expiry >= now() LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $selector);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    function deleteUserToken(string $username) : bool {
        $query = "DELETE FROM user_tokens WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        return $stmt->execute();
    }

    function findUserByToken(string $token){
        $tokens = parse_token($token);
        if(!$tokens){
            return null;
        }
        $query = "SELECT username FROM user_tokens WHERE selector = ? AND expiry > now() LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $tokens[0]);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    function getGenresByID(int $genreID){
        $query = "SELECT genreID, tag FROM genre WHERE genreID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $genreID);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    function checkReaction(int $postID, string $username){
        $query = "SELECT likes FROM reaction WHERE postID = ? AND username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('is', $postID, $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    function updateLike(int $likeValue, int $postID, string $username){
        $query = "UPDATE reaction SET likes = ? WHERE postID = ? AND username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('iis', $likeValue, $postID, $username);
        $result = $stmt->execute();
        return $result;
    }

    function insertLike(int $postID, string $username, int $likeValue){
        $query = "INSERT INTO reaction (postID, username, likes) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('isi', $postID, $username, $likeValue);
        $result = $stmt->execute();
        return $result;
    }

    function removeLike(int $postID, string $username){
        $query = "DELETE FROM reaction WHERE postID = ? AND username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('is', $postID, $username);
        $result = $stmt->execute();
        return $result;
    }

    function getAllUsers(){
        $query = "SELECT username, profilePicture FROM profile";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);   
    }
    
    function deleteUser(string $username){
        $query = "DELETE FROM profile WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        return $stmt->execute();
    } 

    function updateUserData(string $first_name, string $last_name, string $telephone, string $username, string $profile_picture,string $current_username) : bool{
        $query = "UPDATE profile SET firstName = ?, lastName = ?, telephone = ?, username = ?, profilePicture = ? WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssssss', $first_name, $last_name, $telephone, $username, $profile_picture,$current_username);
        $result = $stmt->execute();
        return $result;
    }
    
    function checkAccountNotification(string $username){
        $query = "SELECT username FROM settings WHERE username = ? AND accountNotification = 1";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        if(count($result) != 0){
            return true;
        }
        return false;
    }

    public function selectPostNotification(string $username){
        $query = "SELECT profile.email,profile.username FROM profile join settings on settings.username = profile.username where settings.postNotification = 1 AND profile.username IN (SELECT follower from friend where followed = ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function checkCommentNotification(string $username_post_author){
        $query = "SELECT profile.email,profile.username FROM profile join settings on settings.username = profile.username where settings.commentNotification = 1 AND profile.username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username_post_author);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function checkFollowerNotification(string $followed){
        $query = "SELECT profile.email,profile.username FROM profile join settings on settings.username = profile.username where settings.followerNotification = 1 AND profile.username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$followed);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function deletePost(int $postID) : bool{
        $query = "DELETE FROM post WHERE postID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $postID);
        return $stmt->execute();
    }

    public function updatePostStatus(int $postID, bool $archived) : bool {
        $archived = (int) $archived;
        $query = "UPDATE post SET archived = ? WHERE postID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii',$archived,$postID);
        return $stmt->execute();
    }

    public function getSinglePost(string $username, int $postID){
        $query = "SELECT  postID, description, activeComments, DATE(dateTime) as `date`, urlSpotify, urlImage, title, artists, albumName FROM post JOIN track ON post.trackID = track.trackID WHERE post.username = ? AND post.postID = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('si', $username,$postID);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getNotification(string $username){
        $query = "SELECT * FROM notification WHERE usernameRec = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
?>