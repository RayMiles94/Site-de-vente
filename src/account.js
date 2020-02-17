const whenonline = [
    { 
        link:"/myaccount", 
        string:"My Account<img src='/asset/login-icon.png' alt='login' width='50' height='50'>" 
    },
    { 
        link:"/logout", 
        string:'Logout <img src="/asset/logout-icon.png" alt="home" width="50" height="50">' 
    }
];

const whenoffline = [
    { 
        link:"/login", 
        string:'Login <img src="/asset/login-icon.png" alt="home" width="50" height="50">' 
    }, 
    { 
        link:"/signup", 
        string:"Create Account <img src='/asset/account-icon.png' alt='login' width='50' height='50'>" 
    }
];

module.exports = {
    whenonline : whenonline,
    whenoffline : whenoffline
}