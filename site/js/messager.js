var login = prompt("Podaj Login: ");
while (!login) login = prompt("Podaj Login: ");
function handlemessage() {
    const Http = new XMLHttpRequest();
    const url = `http://${window.location.hostname}/handlemessage`;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = (e) => {
        let response = Http.responseText;
        if (response) {
            console.log(response);
            let main = document.getElementById("main");
            main.innerHTML = "";
            var endString = "";
            for (let element of response) {
                endString += element;
            }
            console.log(endString);
            el = JSON.parse(endString);
            for (const element of el) {
                let wiad = document.createElement("p");
                wiad.innerHTML = "(" + new Date(element.time).toLocaleTimeString() + ") " + element.login + ": " + element.message;
                main.appendChild(wiad);
            }
            window.scrollTo(0, document.body.scrollHeight);
        }
    };
}
setInterval(handlemessage, 100);
function send() {
    let inputField = document.getElementById("wiad");
    const Http = new XMLHttpRequest();
    const url = `/message?login=` + login + "&" + "message=" + inputField.value;
    Http.open("GET", url, true);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.onreadystatechange = function () {
        if (Http.readyState === 4 && Http.status === 200) {
            console.log("sent sucesfult");
        }
    };
    console.log(JSON.stringify({login: login, message: inputField.value}));
    Http.send(JSON.stringify({login: login, message: inputField.value}));
    inputField.value = "";
}
console.log(window.location.hostname);
