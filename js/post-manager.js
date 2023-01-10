window.addEventListener('load',function(){
    let main = document.querySelector('main');
    createPostManager().then(response => main.innerHTML = response );
});

function createPostManager(){
    let manager = `<article id="post_manager"><hgroup>
                    <h1>Post Manager</h1>
                    <h2>Delete, archive or modify your posts</h2>
                   </hgroup>
                   <div id="error_manager"class="error_form" tabindex="-1" hidden></div>`;
    return axios.get('./post_manager.php?action=getPost').then(response => {
        if(response.data.post.length !== undefined){
            if(response.data.post.length === 0){
                manager += `<h2>No published posts</h2><p>Post something to use the post manager</p>`
            } else {
                response.data.post.forEach(element => {
                    manager += createSinglePost(element);
                });
            }
        } else {
            manager += `<h2>Something went wrong, try later</h2>`
        }
        manager += `</article>`
        return manager;
    });
    
}

function createSinglePost(post){
    let result = `<article class="single_post">
        <div class="info_post">
            <table>   
                <tr><td><b>Title:</b> ${post["title"]}</td></tr>
                <tr><td><b>Artists:</b> ${post['artists']}</td></tr>
                <tr><td><b>Created:</b> ${post['date']}</td></tr>
                <tr><td><b>Reaction:</b> ${post['reactions']}</td></tr>
                <tr><td><b>Comments:</b> ${post['comments']}</td></tr>
                <tr><td><b>STATUS:</b> ${getStatus(post['archived'])}</td></tr>
            </table>
            <img src="${post['urlImage']}" alt="album_covert_art">
        </div>
        <div class="buttons_post">
        <button id="modify${post['postID']}" class="contrast outline" onclick="modifyPost(this.id)">Modify</button>
        ${setButton(post['postID'],post['archived'])}
        <button class="delete_post_button outline" data-target="delete_post_modal${post['postID']}" onclick="toggleModal(event)">Delete</button>
            <dialog id="delete_post_modal${post['postID']}">
                <article>
                    <a href="#" aria-label="Close" class="close" data-target="delete_post_modal${post['postID']}" onClick="toggleModal(event)"></a>
                    <h3>Confirm your action</h3>
                    <p>Are you sure you want to permanently delete this post?</p>
                    <footer>
                        <a href="#" role="button" class="secondary" data-target="delete_post_modal${post['postID']}" onClick="toggleModal(event)">Cancel</a>
                        <a href="#" role="button" data-target="delete_post_modal${post['postID']}" onclick=deletePost(event)>Confirm</a>
                    </footer>
                </article>
                </dialog>
        </div>
    </article>`;
    return result;
}

function deletePost(event){
    event.preventDefault();
    let postID = event.currentTarget.getAttribute('data-target').replace("delete_post_modal","");
    let formData = new FormData();
    formData.append('postID',postID);
    formData.append('action','delete');
    axios.post('post_manager.php',formData).then(response => {
        let error_div = document.getElementById('error_manager');
        if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
            error_div.innerHTML = response.data.errorMsg;
            error_div.removeAttribute('hidden');
            error_div.focus();
        } else if (response.data.done === true){
            window.location.reload();
        }
    });
}

function getStatus(archived){
    if(archived == 1){
        return 'archived';
    }
    return 'visible';
}

function archivePost(id,archived){
    let postID = id.replace("archive","");
    let formData = new FormData();
    formData.append('postID',postID);
    formData.append('archived',archived);
    formData.append('action','archive');
    axios.post('post_manager.php',formData).then(response => {
        console.log(response.data);
        let error_div = document.getElementById('error_manager');
        if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
            error_div.innerHTML = response.data.errorMsg;
            error_div.removeAttribute('hidden');
            error_div.focus();
        } else if (response.data.done === true){
            window.location.reload();
        }
    });
}

function modifyPost(id){
    let postID = id.replace("modify","");
    window.location.href = `./modify-post.php?postID=${postID}`;
}

function setButton(postID,archived){
    if(archived == 0){
        return `<button id="archive${postID}" class="secondary outline" onclick="archivePost(this.id,true)">Archive</button>`;
    } 
    return `<button id="archive${postID}" class="outline" onclick="archivePost(this.id,false)">Publish</button>`;
}