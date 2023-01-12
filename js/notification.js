function addNotification(not){
    let time = not["dateTime"].substr(11,5);

    let text;
    if(not["type"] === 0){
        text = " started following you."
    }else if(not["type"] === 1){
        text = " liked your post."
    }else if(not["type"] === 2){
        text = " commented your post."
    }

    let notify = `
        <li>
            <div class="grid">
                <div id="not_text">
                    <p>${not["usernameSed"]} ${text}</p>
                </div>
                <div id="not_time">
                    <span>${time}</span>
                </div>
                <button id="not${not["notificationID"]}" onclick="clearNot(this.id)"><img src="./upload/close.png" alt="clear notification"/></button>
            </div>
        </li>
    `;
    return notify;
}

function printNotification(data){
    if(data.length === 0){
        document.getElementById("notification").hidden = true;
    }else{
        document.getElementById('notification_summury').innerText = data.length + " Notification";
        let not_list = document.getElementById('notification_list');
        not_list.innerHTML = ``;
        data.forEach(element =>{
            not_list.innerHTML += addNotification(element);
        });
    }
}

axios.get("api-notification.php").then(response =>{
    //console.log(response.data);
    printNotification(response.data);
});

function clearNot(idNot){
    let id = idNot.replace("not", "");
    let form_data = new FormData();
    form_data.append("notId",id);
    axios.post("api-notification.php",form_data).then(response => {
        printNotification(response.data);
    });
}