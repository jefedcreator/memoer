# KeepNotes

## Context

Memoer is a express and node js that helps users capture their minds and allows them to add notes and lists.​

Memoer application allows only the registered users to add notes and access them. To persist user details and notes information, it is stored in a MSQL database that is highly secure and reliable. ​

MySQL database server is open-source database software that is faster, secured, reliable and cheaper because of its unique storage engine architecture. ​

## API Documentation

This is the documentation for the REST API built using Express.js. The API is used for a note-keeping application that requires users to sign up and log in to access the service.

### Instructions

Getting Started
To get started with the API, follow these steps:

1. Clone the repository onto your local machine using git clone <repository-url>.

2. Run `npm install` to install all the required dependencies.

3. Run `npm start` to start the server.

The server will be available at http://localhost:8000/api/v1/

## Endpoints

The following endpoint is available:

`GET /`

This endpoint is used to check if the user is authenticated. The endpoint checks for the presence of a username cookie. If the cookie is present, a welcome message is returned. If the cookie is not present, an error message is returned.

Response:

```json
Status: 200 OK
{
"STATUS": "OK",
"message": "hello <username>, welcome to keep notes!!! 😉"
}
```

OR:

```json
Status: 400 Bad Request
{
  "STATUS": "ERROR",
  "message": "Signup and login to get authenticated"
}
```

The response body contains the following fields:

STATUS: A string indicating the status of the response, either "OK" or "ERROR".
message: A message explaining the result of the request.
The HTTP status codes used by the endpoint are:

200 OK: The request was successful and the user is authenticated.
400 Bad Request: The request was unsuccessful because the user is not authenticated.
The endpoint takes no request parameters.

The endpoint can throw the following errors:

500 Internal Server Error: An internal server error occurred.

`POST /signup`

This endpoint is used to sign up a new user by submitting their details in the request body. The user's details include:

user_name (required) - The username of the user
user_mobile (required) - The mobile number of the user
user_password (required) - The password of the user

Request:

```json
POST /signup
Content-Type: application/json

{
  "user_name": "jane",
  "user_password": "password123",
  "user_mobile": "123344555"
}
```

Response:

```json
Status: 200 OK
{
    "STATUS": "OK",
    "data": {
        "user_id": 2,
        "user_name": "jane",
        "user_added_date": "2023-02-17T12:01:33.000Z",
        "user_password": "password123",
        "user_mobile": "12345678912"
    }
}
```

If the request is successful, the API will respond with a status code of 201 (Created) and the data property will contain the newly created user object.

If the request is unsuccessful, the API will respond with a status code of 400 (Bad Request) and the message property will contain an error message describing the issue.

If an unexpected error occurs, the API will respond with a status code of 500 (Internal Server Error) and the message property will contain an error message describing the issue.

`POST /login`

This endpoint is used to authenticate a user by logging them in.

Request:

```json
POST /login
Content-Type: application/json

{
  "user_name": "jane",
  "user_password": "password123"
}
```

The request body contains the following fields:

user_email: The email address of the user.
user_password: The password of the user.

Response:

```json
Status: 200 OK
{
  "STATUS": "OK",
  "data": [
    {
      "user_id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  ]
}
```

The response body contains the following fields:

STATUS: A string indicating the status of the response, either "OK" or "ERROR".
data: An array containing a single user object with the following fields:
user_id: A unique identifier for the user.
name: The name of the user.
email: The email address of the user.
The HTTP status codes used by the endpoint are:

200 OK: The request was successful and the user is authenticated.
400 Bad Request: The request was unsuccessful due to an error, and an error message is returned.
The endpoint takes no request parameters.

The endpoint can throw the following errors:

500 Internal Server Error: An internal server error occurred.
Cookies
This endpoint sets a cookie named "id" on the response. This cookie contains the user ID of the authenticated user, which is used to authenticate subsequent requests.

`POST /notes`

This endpoint is used to create a new note for the authenticated user by submitting the note details in the request body. The note details include:

note_title (required) - The title of the note
note_content (required) - The content of the note
note_status (required) - The note status, active or inactive

Request body:

```json
{
  "note_title": "Demo",
  "note_content": "This is a demo note",
  "note_status": "active"
}
```

Response body:

```json
{
  "STATUS": "OK",
  "data": {
    "note_id": 4,
    "note_title": "Demo",
    "note_content": "This is a demo note",
    "note_status": "active",
    "note_creation_date": "2023-02-17T17:00:19.000Z",
    "note_creator": 2
  }
}
```

If the request is successful, the API will respond with a status code of 200 (OK) and the data property will contain the newly created note object.

If the request is unsuccessful, the API will respond with a status code of 400 (Bad Request) and the message property will contain an error message describing the issue. Possible issues include:

Invalid note details
User not logged in
If an unexpected error occurs, the API will respond with a status code of 500 (Internal Server Error) and the message property will contain an error message describing the issue.

`GET /notes`

This endpoint is responsible for retrieving all the notes associated with the authenticated user. It returns a JSON response with a list of notes.

Response
Status Code: 200 OK
Content-Type: application/json
Body:
If successful, the response body will be a JSON object containing a STATUS key with value "OK" and a data key containing an array of notes.

```json
{
  "STATUS": "OK",
  "data": [
    {
      "note_id": 1,
      "title": "Note 1",
      "content": "This is the first note",
      "note_status": "inactive",
      "note_creator": 1,
      "created_at": "2022-02-15T15:00:00.000Z"
    },
    {
      "note_id": 2,
      "title": "Note 2",
      "content": "This is the second note",
      "note_status": "active",
      "note_creator": 1,
      "note_creation_time": "2022-02-15T16:00:00.000Z"
    }
  ]
}
```

If the user is not authenticated, the endpoint will return an error message with a status code of 400 Bad Request.

```json
{
  "STATUS": "ERROR",
  "message": "login to view your notes"
}
```

If an error occurs on the server, the endpoint will return an error message with a status code of 500 Internal Server Error.

```json
{
  "STATUS": "ERROR",
  "message": "Internal Server Error"
}
```

`PUT /notes/:id`

This API endpoint allows authenticated users to update their notes by providing the note id and note details.

Request Parameters
Path Parameter: `id` The id of the note to update. (Required).

Request body:

```json
{
  "note_title": "Demo",
  "note_content": "This is a demo note",
  "note_status": "active"
}
```

Request Headers
This endpoint expects a cookie with the `id` parameter to be present in the request header to authenticate the user. The user `id` is obtained during the login process. Required.

Response:

```json
{
  "STATUS": "OK",
  "data": {
    "note_id": 4,
    "note_title": "Demo",
    "note_content": "This is a demo note",
    "note_status": "active",
    "note_creation_date": "2023-02-17T17:00:19.000Z",
    "note_creator": 2
  }
}
```

`DELETE /notes/:id`

This endpoint allows an authenticated user to delete a specific note by its id.

Request Parameters
`id` The unique identifier of the note to delete.

Request Headers
The request must contain a cookie `id` that identifies the authenticated user.

Response
If successful, the endpoint will return a 200 OK status code and a JSON response with the following format:

```json
{
  "STATUS": "OK",
  "data": {
    "note_id": 4,
    "note_title": "Demo",
    "note_content": "This is a demo note",
    "note_status": "active",
    "note_creation_date": "2023-02-17T17:00:19.000Z",
    "note_creator": 2
  }
}
```

If the specified note id does not exist or if the user is not authorized to delete the note, the endpoint will return a 400 Bad Request status code and a JSON response with an error message in the following format:

```json
{
  "STATUS": "ERROR",
  "message": "string"
}
```

### Test Code

1. Run the test scripts available under `test` by giving the `npm run test` command in the terminal to test locally.
