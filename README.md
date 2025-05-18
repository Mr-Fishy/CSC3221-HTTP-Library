# CSC3221-HTTP-Library

## Progress

- [x] Create library API as a Class.
- [x] Use `async` and `await` syntax for all request functions.
- [x] Use JavaScript Fetch.
- [ ] Implement error handling.
- [x] Implement GET, POST, PUT, DELETE, and PATCH
  - [x] GET
  - [x] POST
  - [x] PUT
  - [x] DELETE
  - [x] PATCH
- [ ] Routes, Parameters, and Queries support
  - [x] Routes
  - [ ] Parameters
  - [ ] Queries
- [ ] Implement app.js to enable API use from the webpage.
- [ ] Prettify the webpage.

## TODO

- Implement `sendRequest` function in app.js.
- Add `Process` functions to app.js for handling requests.
- Finish UI mvp to support parameter and query inputs.
- CSS
- Figure out what "error handling" means, currently errors are simply reported.

## Netcentric Computing Lab

Create a front-end library that accepts HTTP requests types GET, POST, PUT, DELETE any route including parameters and queries. If applicable, return the response as a JSON object and show the contents of the object. You will use this library in subsequent projects.

Create a UI to test the library against the remote API: [https://jsonplaceholder.typicode.com/users]

Requirements:

1. Create the library as a Class.
2. Implement the GET, POST, PUT, and DELETE requests types.
3. Support Routes, Parameters, and Queries.
4. Create all request functions as asynchronous using the “async” and “await” syntax.
5. Use the JavaScript Fetch library.
6. Implement error handling in the library.

To meet expectations, your system must:

- Run without throwing any unhandled errors.
- Use the required technology to implement all required functionality.
- Contain no blocking code.
- Include a UI that allows for testing of all library functionality.

To exceed expectations, your system must:

- Meet expectations.
- Support the PATCH request type.
- Implement an intuitive UI that allows interactive switching between request types and displays the result in a structured format.
