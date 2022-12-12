function showError(element,msg,id){
    element.setCustomValidity(msg);
    element.reportValidity();
    element.setAttribute("aria-invalid","true");
    element.setAttribute("aria-describeby",id);
    element.focus();
}

function setValid(element){
    element.setCustomValidity("");
    element.setAttribute("aria-invalid","false");
}