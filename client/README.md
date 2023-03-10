# UI | Inventorization Asset Management Platform

### Introduction

Inventoriztion Asset Management is an open source platform that enable companies to manage all their assets, users, requests and more. This is the UI for the platform.

### Project Support Features

- Admin is created by default with some credentials provided in the .env file
- Admin can create a new user account
- Users can login to their account
- Authenticated users can access all requests, assets. They can also create and delete requests.
- Authenticated admins and moderators can access all requests, assets, users. They can also create, update and delete requests, assets and users.

### Installation Guide

- Clone this repository
- The `master` branch is the most stable branch at any given time, ensure you're working from it.
- Run `npm install` to install all dependencies
- Duplicate `.env.example` and rename it to `.env`
- Update the `.env` file with your database credentials
- Run `npm start` to start the server

### Postman Documentation

- You can find exporeted JSON Postman Documentation [here](/Asset%20Inventorization%20Platform.postman_collection.json)
- Create new Environment for Variables:
  - BASE_URL
  - JWT_TOKEN
  - AUTH_LOGIN
  - AUTH_PWD

## License

This project is available for use under the MIT License.
