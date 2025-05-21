const routeIn = document.querySelector("#route");
const endpointIn = document.querySelector("#endpoint");
const queryIn = document.querySelector("#query");
const bodyIn = document.querySelector("#body");

const sendIn = document.querySelector("#sendReq");

const responseOut = document.querySelector("#response");

const jem = new jemHTTP(routeIn.value);

/**
 * Adds an event listener to send a request when the submit
 * button is clicked.
 */
sendIn.addEventListener("click", (e) => {
    const radioButtons = document.querySelectorAll('input[name="HTTPtype"');

    let reqType;
    for (const button of radioButtons) {
        if (button.checked) {
            reqType = button.value;
            break;
        }
    }

    sendRequest(reqType);
    e.preventDefault();
});

/**
 * Adds an event listener to update jem's base url given a time
 * has past since the last input to the route.
 */
routeIn.addEventListener("input", function() {
    if (routeIn.handle)
        clearTimeout(routeIn.handle);

    handle = setTimeout(() => {
        jem.setURL(routeIn.value);

        routeIn.handle = null;
    }, 100);

    input.data("handle", handle);
});

/**
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
 * @param { string } reqType The type of request being made to endpoint
 * IE: GET, POST, PUT, DELETE and PATCH.
 */
async function sendRequest(reqType) {
    let query = { };
    try {
        query = queryIn.value ? JSON.parse(queryIn.value) : { };
    } catch (e) {
        responseOut.innerHTML = 'Invalid JSON in Query Parameters!';

        return;
    }

    let data = { };
    try {
        data = bodyIn.value ? JSON.parse(bodyIn.value) : { };
    } catch (e) {
        responseOut.innerHTML = 'Invalid JSON in Request Body!';

        return;
    }

    const method = reqType.toLowerCase();
    const route = {
        path: endpointIn.value,
        query: query
    };

    responseOut.innerHTML = "";

    try {
        let response;

        if (["patch", "post", "put"].includes(method))
            response = await jem[method](route, data);
        else
            response = await jem[method](route);

        responseOut.innerHTML = `${JSON.stringify(response, null, 2)}`;
    } catch (e) {
        responseOut.innerHTML = `Error: ${error}`;
    }
}
