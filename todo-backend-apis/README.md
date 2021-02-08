# ToDo - Backend APIs 
Backend APIs for the Todo application were developed using Node.Js (JS Runtime Environment) and Express.Js(Node.JS web framework). 

Important factors regarding the backend API development can be listed down as follows.

# Key Factors

- #### Database 
MongoDB Atlas database was used as the database layer of the system. MongoDB Atlas is a cloud document oriented database service. The database consists of two collections, `Users` and `Todos`. `Mongoose`, an Object Data Modeling (ODM) library was used to interact with the database.

- #### Authentication
JWT authentication mechanism was implemented from scratch using `jsonwebtoken` module in Node.js. When a registered user login using email and password, a jwt token is returned and it is stored in the local storage of the browser. The token is attached with every API call and a middleware was developed to authorize the users to APIs. And password hashing is also implemented using `bcrypt`.

> Note: In the above mechanism, there is no way to make the issued token expire. Therefore anyone with a token can access APIs.  It would be better to implement token expiration mechanism to the process or there are various modules which can be used to implement complete jwt authentication mechanism such as `google-auth-library`. And there are more comprehensive user authentication and authorization services like `AWS Cognito` when it comes to cloud services.

- #### Data Validation
`Joi` is used for data validation purpose. Data validation is done in two phases. Joi validates the requests and then pass to mongoose. mongoose schema again validates the data before performing operations.

# Suggestions for Further Improvements:

- Better authentication mechanism can be implemented.
- Unit testings should be written for APIs using Jest, Mocha or Storybook. 
- API documentation using swagger. 


