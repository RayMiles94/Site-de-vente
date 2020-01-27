function createuser() {
    var email = document.getElementById('inputPassword').value;
    var confirm = document.getElementById('inputEmailConfirm').value;
    if(email == confirm){
        return true;
    }
    return false;
}