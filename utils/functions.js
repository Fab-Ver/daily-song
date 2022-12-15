function showError(element,msg){
    element.setCustomValidity(msg);
    element.reportValidity();
    element.focus();
}

function setValid(element,value){
    if(value){
        element.setCustomValidity("");
        element.setAttribute("aria-invalid","false");
    } else {
        element.setAttribute("aria-invalid","true");
    }
}