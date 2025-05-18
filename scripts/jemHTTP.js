/**
 * A HTTP library that utilizes asyncronous Fetch API.
 */
class jemHTTP {
    /**
     * Constructs an instance of jemHTTP.
     * 
     * @param { string } [url=""] The base URL for all HTTP requests. 
     */
    constructor(url = "") {
        this.url = url;
    }

    /**
     * Sets a new base url to the jem instance.
     * 
     * @param { string } url The new base url to use.
     */
    setUrl(url)
        { this.url = url; }
    /**
     * Gets the jem instance's base url.
     * 
     * @returns { string }
     */
    getUrl()
        { return this.url; }

    /**
     * Makes an HTTP request to the specified endpoint using Fetch.
     * 
     * @param { string } method The HTTP method to request (GET, POST, PUT, PATCH, DELETE).
     * @param { Object } [route] An object containing the endpoint data to route from the base url.
     * @param { string } [route.path] The endpoint path, e.g., "/users/:id".
     * @param { Object.<string, string | number> } [route.params={ }] Route parameters to replace in the path.
     * @param { Object.<string, string | number | boolean> } [route.query={ }] Query parameters to append to the path.
     * @param { Object | null } [data=null] JSON data for methods like POST, PUT, and PATCH.
     * 
     * @returns { Promise<Object> } The JSON response object or error.
     */
    async request(method, route = { path: "", params: { }, query:{ } }, data = null) {
        let url = this.url + this.constructEndpoint(route.path, route.params, route.query);

        const options = {
            method: method.toUpperCase()
        };

        if (data && ["POST", "PUT", "PATCH"].includes(options.method))
            options.body = JSON.stringify(data);

        try {
            const response = await fetch(url, options);

            if (!response.ok)
                throw new Error("HTTP error ${response.status}: ${response.statusText}");

            return await response.json();
        }
        catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Converts the given parameters and queries into a formatted url endpoint.
     * 
     * @param { string } endpoint The tailing endpoint of the url.
     * @param { Object.<string, string | number> } params A list of parameters for the url endpoint.
     * @param { Object.<string, string | number | boolean> } query A list of queries for the url endpoint.
     * 
     * @returns { string } A formatted endpoint for the url.
     */
    constructEndpoint(endpoint, params, query) {
        let path = endpoint;

        for (const key in params)
            path = path.replace(":${key}", params[key]);

        // URLSearchParams is a standard API function to convert a list of queries into a formatted string "safely".
        //
        const queryString = URLSearchParams(query).toString();

        return queryString ? "${path}?${queryString}" : path;
    }
};

/**
 * Sends a GET request.
 * 
 * @param { Object } [route] An object containing the endpoint data to route from the base url.
 * @param { string } [route.path] The endpoint path, e.g., "/users/:id".
 * @param { Object.<string, string | number> } [route.params={ }] Route parameters to replace in the path.
 * @param { Object.<string, string | number | boolean> } [route.query={ }] Query parameters to append to the path.
 * 
 * @returns { Promise<Object> } JSON response object or error.
 */
jemHTTP.prototype.get = function (route = { path: "", params: { }, query:{ } })
    { return this.request("GET", route); }

/**
 * Sends a POST request with JSON data.
 * 
 * @param { Object } [route] An object containing the endpoint data to route from the base url.
 * @param { string } [route.path] The endpoint path, e.g., "/users/:id".
 * @param { Object.<string, string | number> } [route.params={ }] Route parameters to replace in the path.
 * @param { Object.<string, string | number | boolean> } [route.query={ }] Query parameters to append to the path.
 * @param { Object } data The JSON data to send.
 * 
 * @returns { Promise<Object> } JSON response object or error.
 */
jemHTTP.prototype.post = function (route = { path: "", params: { }, query:{ } }, data)
    { return this.request("POST", route, data); }

/**
 * Sends a PUT request with JSON data.
 * 
 * @param { Object } [route] An object containing the endpoint data to route from the base url.
 * @param { string } [route.path] The endpoint path, e.g., "/users/:id".
 * @param { Object.<string, string | number> } [route.params={ }] Route parameters to replace in the path.
 * @param { Object.<string, string | number | boolean> } [route.query={ }] Query parameters to append to the path.
 * @param { Object } data The JSON data to send.
 * 
 * @returns { Promise<Object> } JSON response object or error.
 */
jemHTTP.prototype.put = function (route = { path: "", params: { }, query:{ } }, data)
    { return this.request("PUT", route, data); }

/**
 * Sends a PATCH request with JSON data.
 * 
 * @param { Object } [route] An object containing the endpoint data to route from the base url.
 * @param { string } [route.path] The endpoint path, e.g., "/users/:id".
 * @param { Object.<string, string | number> } [route.params={ }] Route parameters to replace in the path.
 * @param { Object.<string, string | number | boolean> } [route.query={ }] Query parameters to append to the path.
 * @param { Object } data The JSON data to send.
 * 
 * @returns { Promise<Object> } JSON response object or error.
 */
jemHTTP.prototype.patch = function (route = { path: "", params: { }, query:{ } }, data)
    { return this.request("PATCH", route, data); }

/**
 * Sends a DELETE request.
 * 
 * @param { Object } [route] An object containing the endpoint data to route from the base url.
 * @param { string } [route.path] The endpoint path, e.g., "/users/:id".
 * @param { Object.<string, string | number> } [route.params={ }] Route parameters to replace in the path.
 * @param { Object.<string, string | number | boolean> } [route.query={ }] Query parameters to append to the path.
 * 
 * @returns { Promise<Object> } JSON response object or error.
 */
jemHTTP.prototype.delete = function (route = { path: "", params: { }, query:{ } })
    { return this.request("DELETE", route); }

