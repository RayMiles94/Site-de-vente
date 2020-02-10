function createuser() {
    var login = document.getElementById('inputlogin').value;

    var email = document.getElementById('inputPassword').value;
    var confirm = document.getElementById('inputEmailConfirm').value;
    $.ajax({
        url: "/usercheck",
        method: "GET",
        dataType: 'json',
        data: {
            mail: email,
            login: login
        },
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    })
    if (email == confirm) {
        return true;
    }
    return false;
}
