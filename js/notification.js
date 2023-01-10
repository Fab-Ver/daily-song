function addNotification(not){
    let notify = `
        <li>${not["text"]}</li>
    `;
    return notify;
}

axios.get("api-notification.php").then(response =>{
    console.log(response.data);
    document.getElementById('notification_summury').innerText = response.data.length + " Notification";
    let not_list = document.getElementById('notification_list');
    response.data.forEach(element =>{
        not_list.innerHTML += addNotification(element);
    });
});