const jem = new jemHTTP;
var oldResponse;

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

/**
 * This function does not take any inputs other than the events on the html page.
 */
document.querySelector("#dropdown").addEventListener("click",(e)=>{
    console.log(`SELECTED: ${e.target.value}`);
    const selected_dropdown = e.target.value;
    let values = [];
    applyFilter(oldResponse,selected_dropdown,values);
    let html = "<ol>"
    for(const items of values){
        html+= "<li>"+items+"</li>";
    }
    html+="</ol>"
    document.querySelector("#response").innerHTML = html;

});

/**
 * 
 * @param {*} object A JSON object that will be traversed and have all its keys read
 * @param {*} listSet Where the result of the operation lands
 * 
 * @returns THE FUNCTION DOES NOT RETURN
 */
function getFilters(object,listSet){
    //check to see if the instance is iterable.
    //this checks if the object is null or not an object.
    if(typeof object !== 'object' || object === null){
        return;
    }

    for(const key in object){
        //if it can iterate, go deeper
        getFilters(object[key],listSet);
        listSet.add(key);
    }
}


/**
 * 
 * @param {*} object this is a json object which will have filters applied to it 
 * @param {*} filter this is the filter/key that will be used to determine the current value
 * @param {*} listSet this is where the result will be stored
 * 
 * @returns THE FUNCTION DOES NOT RETURN
 */
function applyFilter(object,filter,listSet){

    if(typeof object !== 'object' || object === null){
        return;
    }

    for(const key in object){
        //if it can iterate, go deeper

        //this should work?
        
        if(object[key] === object[filter]){
            if(typeof object[key] === 'object'){
                //this is quite silly for formatting
                listSet.push((JSON.stringify(object[key],null,'\t'))
                  .replaceAll('{', ' ')
                  .replaceAll('}', ' ')
                  .replaceAll('"', ' ')
                  //this creates some interesting possible problems.
                  .replaceAll(',', "<br />") +"<br><br/>"
                   );
            }else{
                listSet.push(object[key]);
            }
        }

        applyFilter(object[key],filter,listSet);  
    }
}


/**
 * 
 * @param {*} reqType The type of request being made to endpoint
 * IE: GET, POST, PUT, DELETE and PATCH.
 * 
 * @param {*} url The place where the resource should be fetched from.
 */
async function sendRequest(reqType, url) {

    //console.log("Request Sent! Type: " + reqType + " Route: " + url);

    jem.setUrl(url);

    let response = await jem.request(reqType);
    oldResponse = response;

    const listOptions = new Set();
    listOptions.clear();
    getFilters(response,listOptions);


    //reset the document every time, necessary when updating the page.
    document.querySelector("#dropdown").innerHTML = "";
    console.log(listOptions.size);
    if(listOptions.size == 1){
        document.querySelector("#response").innerHTML = `${JSON.stringify(response)}`;
    }
    for(const option of listOptions){
        if(option === 'error'){
            document.querySelector("#response").innerHTML = `${response.error} ${url}`;
        }
        document.querySelector("#dropdown").innerHTML += "<option>"+option+"</option>";
    }

}

