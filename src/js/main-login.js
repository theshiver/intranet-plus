var loginData = {};
var isAutoLoginActive = "false";
var index = 0;

function next() {
    index++;
    if(index == 2 && isAutoLoginActive == "true") {
        window.location.href='http://10.0.2.1/checkpass.asp?username='+loginData.username+'&PassWord='+loginData.password
    }
}
// Set Username
chrome.extension.sendRequest({method: "getLocalStorage", key: "AutoLogin"}, function(response) {
    var resp = response.data;
    if(resp == 'true'){
        isAutoLoginActive = "true"
    }
});
// Set Username
chrome.extension.sendRequest({method: "getLocalStorage", key: "username"}, function(response) {
    loginData.username = response.data
    next();
});
// Set Password
chrome.extension.sendRequest({method: "getLocalStorage", key: "password"}, function(response) {
    loginData.password = response.data
    next();
});

