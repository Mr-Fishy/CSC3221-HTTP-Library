const jem = new jemHTTP;

document.querySelector("#sendReq").addEventListener("click", (e) => {
    const radioButtons = document.querySelectorAll('input[name="HTTPtype"');
    const route = document.querySelector("#route").value;

    let reqType;
    for (const button of radioButtons) {
        if (button.checked) {
            reqType = button.value;

            break;
        }
    }
    sendRequest(reqType, route);

    e.preventDefault();
});

function sendRequest(reqType, url) {
    console.log("Request Sent! Type: " + reqType + " Route: " + url);
}
