serialize = function (obj) {
    var str = [];
    for (var p in obj) 
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    
    return str.join("&");
}

$('#senddata').click(function () {
    var login = document.getElementById('inputlogin').value;
    var email = document.getElementById('inputEmail').value;
    var confirm = document.getElementById('inputEmailConfirm').value;
    var password = document.getElementById('inputPassword').value;
    const query = {
        login: login,
        email: email,
        password: password
    }
    var mx = $.ajax({
        url: "/usercheck",
        method: "GET",
        dataType: 'json',
        data: {
            mail: email,
            login: login
        },
        success: function (data) {
            if ((password == confirm) && (data.reponse == "not")) {
                window.location = "/loginsucc?" + serialize(query);
            } else {
                alert("This User is already exist");
                document.getElementById('error').innerHTML = "This User is already exist";
            }
        },
        error: function (data) {
            console.log(data);
            window.alert(data);
        }
    });
    return true;
});

$("#submitlogin").click(function () {
    var login = document.getElementById('loginbinputEmail').value;
    var mp = document.getElementById('logininputPassword').value;
    const user = {
        login: login,
        password: mp
    };
    $.ajax({
        url: "/userchecklogin",
        method: "GET",
        dataType: 'json',
        data: user,
        success: function (data) {
            if (data.reponse == "found") {
                window.location = "/signformsend?" + serialize(data.data);
            } else {
                alert("This User is Not exist");
            }
        },
        error: function (data) {
            console.log(data);
            window.alert(data);
        }
    })
});
