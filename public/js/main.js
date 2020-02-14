function createuser() {
    var login = document.getElementById('inputlogin').value;
    var email = document.getElementById('inputPassword').value;
    var confirm = document.getElementById('inputEmailConfirm').value;
    var mx = $.ajax({
        url: "/usercheck",
        method: "GET",
        dataType: 'json',
        data: {
            mail: email,
            login: login
        },
        success: function (data) {
            return data.reponse;
        },
        error: function (data) {
            console.log(data);
            window.alert(data);
        }
    });
    console.log(JSON.stringify(mx));
    // if ((email == confirm) && (mx=="not")  ){
    //      return true;
    // }
    // else {
    //     return false;
    // }
    return false;
}


