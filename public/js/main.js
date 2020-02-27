serialize = function(obj) {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }

  return str.join('&');
};

$('#senddata').click(function() {
  const login = document.getElementById('inputlogin').value;
  const email = document.getElementById('inputEmail').value;
  const confirm = document.getElementById('inputEmailConfirm').value;
  const password = document.getElementById('inputPassword').value;
  const query = {
    login: login,
    email: email,
    password: password,
  };
  $.ajax({
    url: '/usercheck',
    method: 'GET',
    dataType: 'json',
    data: {
      mail: email,
      login: login,
    },
    success: function(data) {
      if ((password == confirm) && (data.reponse == 'not')) {
        window.location = '/loginsucc?' + serialize(query);
      } else {
        alert('This User is already exist');
        // max-len
        document.getElementById('error').innerHTML = 'This User is already exist';
      }
    },
    error: function(data) {
      console.log(data);
      window.alert(data);
    },
  });
  return true;
});

$('#submitlogin').click(function() {
  const login = document.getElementById('loginbinputEmail').value;
  const mp = document.getElementById('logininputPassword').value;
  const user = {
    login: login,
    password: mp,
  };
  $.ajax({
    url: '/userchecklogin',
    method: 'GET',
    dataType: 'json',
    data: user,
    success: function(data) {
      if (data.reponse == 'found') {
        window.location = '/signformsend?' + serialize(data.data);
      } else {
        alert('This User is Not exist');
      }
    },
    error: function(data) {
      console.log(data);
      window.alert(data);
    },
  });
});

$('#sendcontcat').click(function() {
  const emaildata = document.getElementById('emaildata').value;
  const subjectdata = document.getElementById('subjectdata').value;
  const data = {
    emaildata: emaildata,
    subjectdata: subjectdata,
  };
  $.ajax({
    url: '/insertcontact',
    method: 'GET',
    dataType: 'json',
    data: data,
    success: function(data) {
      if (data.reponse == 'save') {
        window.alert('Contact Message Send it succfuly');
        location.reload();
      } else {
        window.alert('Contact Message Failed');
        location.reload();
      }
    },
    error: function(data) {
      console.log(data);
      window.alert(data);
    },
  });
});
