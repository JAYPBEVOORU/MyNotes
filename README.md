MyNotes

Exposes CRUD(Currently create and read only) APIs to
a) User
b) Notes

How to build ?
`npm run build`

How to run ?
`npm run start`

What are the APIs available ? How to use APIs ?
`http://localhost:8080/docs/#/default/`

User APIs
a) Create user using POST /users/register
b) Login user using POST /users/login which will give the accessToken

Note APIs
c) Create Note using POST /notes with accessToken from from login API (b)
d) Get all notes of a user using GET /notes with accessToken from login API (b)
e) Get a particular note of a user using GET/notes/{noteId} with accessToken from login API (b) and noteId from Get All notes API (d)
