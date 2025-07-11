### SSO

The project uses "Single Sign-On - UK Government Security" for authentication. The parameters can be grabbed from AWS parameter store if required locally. If you dont need to SSO locally, just put dummy strings into the ENV variables.

Authorisation is handled in the api repo and allows for users and granular control over access.

#

Is basic project with functionality to allow you to run it locally and save form data.
It has two sub folders api and ui. Each of them are Nodejs/Express projects.

Clone the project. Navigate to api and ui folders respectively and run npm i to install necessary packages locally.

Running via docker
While you are in root folder, type
docker compose up --build
This will build docker containers and run them locally.

Running apps in dev mode
Dev mode allow you to have hot reload which is handy when you are actively developing.
You will need to have 2 tabs on your terminal.
Api
cd api
npm run dev

Ui
cd ui
npm run dev

Api project is equipped with capability to inject DB service which will allow you to switch between different DB providers (Postgres, Dynamo) without needing to modify the rest of the code.

UI project is using GDS govuk-frontend, and nunjuck which allows you to implement any GDS best practices and components and extend them.

Data validation
Form data is validated via express-validator functions. This functions allows you to chain rules for given fields in form of arrays.

function getProjectAimsValidation() {
return [
body("aims")
.trim()
.not()
.isEmpty({ ignore_whitespace: true })
.withMessage("Enter aim of your project"),

    body("explanation")
      .not()
      .isEmpty()
      .withMessage("Enter how the data will help you achieve your aims"),

];
}
