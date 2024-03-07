# Routes

- GET
  / - home page
  /about - about page

### Users

- GET
  /register - form to create new user
  /login - form to login
  /:id/profile - form to edit user profile

- POST
  /register - create new user
  /login - authenticate and login user
  /logout - logout user

- PUT
  /:id/profile - update user profile

### Applications

- GET
  /new - form to create new application
  /:id - view application details, including dog matches
  /:id/contract - view adoption contract
  /:id/schedule/interview - view availabilities for interview
  /:id/schedule/meet-greet - view availabilities for meet and greet
  /:id/schedule/adoption - view availabilities for adoption date

- POST
  /new - create new application
  /:id/cancel - cancel application
  /:id/select-match - select dog from matches
  /:id/schedule/interview - schedule an interview
  /:id/schedule/meet-greet - schedule meet and greet
  /:id/schedule/adoption - schedule adoption date
  /:id/contract - sign adoption contract

### Dogs

- GET
  / - view available dogs
  /:id - view dog details
  /favourites - view user favourites

- POST
  /favourites - toggle favourite status of dog

## Admin

### Applications

- GET
  / - view applications

- POST
  /:id/status - update application status

### Dogs

- GET
  /new - form to add new dog
  /:id/edit - form to update dog details

- POST
  /new - add new dog

- PUT
  /:id/edit - update dog details

### Users

- GET
  / - view all users
  /:id - view user details

- POST
  /:id - update user_type