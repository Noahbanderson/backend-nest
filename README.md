<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Running the app (with Docker)

```bash
# development
$ npm run start:dev:docker

# production mode
$ npm run start:prod:docker
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Features

1) Two processes managed in one command communicating over redis.
  The worker process handles long processes and scheduler events so the api process can focus on requests and enqueueing jobs for the worker to handle.

2) Firebase integration to manage authentication, sign-up, login, etc.

3) Typeorm integration to make use of Data Mapper pattern, Active Record pattern, Query Builder, AND raw SQL execution.

4) Role-based and Claims-based authorization

## Notes

providers are to import a file inside the same directory as the module

imports are to import a file from outside the scope of the module directory, but the file as to be exported from the module it belongs to. and on the import side, you import the module, not the file itself. 

## Creating new resources

### CLI

```bash
# Worker / Jobs
$ nest g pr worker/jobs/handler/<name-of-your-job-handler>
# Then add the job handler class to the `exports` of jobs.module.ts
# Then register the job handler in queue.processor.ts in similar to fashion to others

# New Table
$ nest g resource api/<name-of-your-resource>
```

## Setup

firebase.config.json#cert can be found while setting up firebase web app

firebase.config.json#params can be found on in your project settings under your web app.


create firebase.config.json from the example file

create dev.env and prod.env from the example file

## Api

To authenticate and use the Api via Postman or some other request service, you will need to run a front-end app with the firebase client installed with your firebase configs. This is how to get an idToken from an email and password.

```javascript
// index.tsx
import { initializeApp } from 'firebase/app'

initializeApp({
  apiKey: ...,
  authDomain: ...,
  databaseURL: ...,
  ...
})

// LoginForm.tsx - onSubmit
import firebaseAuth from 'firebase/auth'

const auth = firebaseAuth.getAuth()
const { user } = await firebaseAuth.signInWithEmailAndPassword(auth, email, password)
const idToken = await user.getIdToken()

const headers = {
  Authorization: `Bearer ${idToken}`
}
```
Once obtained, use this idToken to create the Authorization header in the bearer token schema. 

