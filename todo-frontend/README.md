# ToDo - Frontend 
The frontend application of the todo app is developed with ReactJS which is a popular javascript library for UI develop. The initial project setup was generated using Facebook's create-react-app tool.

```sh
$ npx create-react-app my-app
$ cd my-app
$ npm start
```

Important factors regarding the frontend development can be listed down as follows.

# Key Factors

- #### State Management
State management of the project was done using react hooks (by maintaining root state). For larger scale applications Context API and Redux would be more suitable. For this application, browser's local storage was used for storing tokens. And all the routes are protected so that unregisrered users cannot access.

- #### Backend Communication
Axios, A promise based http client was used to communicate with backend. (Node Js APIs). Better alternatives such as Fatch API, Redux-Saga and GraphQL can be used for large scale projects.

- #### UI Design
Material UI was used as major source of react components for the UI. Those components were modified according to the requirements.

- #### Code Structure
An attempts was taken to maintain best coding practices throughout the project. Components were decentralized as much as possible and component reusability was established. As a feedback was received in the first interview to learn about `Solid Principals`, an attempt was made to implement `Dependency Inversion Principle` in the project. (Please refer services directory). `ESLint` with `Prettier` were used to maintain airbnb coding style.

# Suggestions for Further Improvements
- Using better state management machanisms such as Context API or Redux.
- The current application doesn't consist of proper notification mechanism to user. `react-notify-toast` would be an ideal module to implement this functionality. 
- Further UI and UX improvements.
