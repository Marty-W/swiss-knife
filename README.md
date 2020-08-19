# Swiss Knife

Swiss knife is a productivity app created with React, Typescript, and Firebase. It has three main modules: 
  1. Pomodoro tracker
  2. Habit tracker
  3. Todo list
  
## Table of Contents

* [Motivation](#motivation)
* [App Features](#app-features)
* [About the project](#about-the-project)
* [Technologies](#technologies)
* [Usage](#usage) 
  

## Motivation

I created this app to show off my skills but also because I've always been finding ways to be more productive. So I've tried pretty much every productivity app there is. This project is a merge of all the tactics I've found useful.

## App features

### Pomodoro tracker
* Use it to measure the time you spend studying, working etc.
* Set a daily goal and try to achieve it on a given day.
* See your past focused session in the History tab.

### Habit Tracker
* Set a habit that you want to work on daily. 
* See a bird's eye view of your accomplishment rate in a Habit Detail tab (you go there by clicking on a habit name).
* You can see if you've completed a habit in a calendar view of the whole year.
* The app is counting your streaks and displaying your best ones at the top.

### Todo List
* Write down your todos daily. After completion, check them off.
* Hide your completed todos and focus on the ones that are still left.
* Move your uncompleted todos from past and schedule them to today. 

## About the project

This app is built with React (the one with hooks). It's using modern react features, i.e. Context, Reducers, Portals, Error Boundaries. In the beginning, I've used Javascript and then slowly migrated to Typescript for additional type-safety. 

Context is essential mainly for the Pomodoro module and is working in hand with a reducer to operate the state of a current session. This way, I can dispatch actions from all components bellow the Context.Provider and also consume its state.

Portals are used to display modals which you can find in every module of the app. 

Error boundaries are taking care of handling errors (even the async ones) and are logging the error to Sentry.io. 

Firebase Firestore powers cloud database with real-time sync. User data is accessible through user authentication with Firebase Auth. Users can sign up with their email and password, OR they can use their Google account. All modules also work without authentication thanks to Firebase anonymous login. 

For styling purposes, I've used Styled Components. They allow me to encapsulate styles to their respective components and provide easier reusability of those components. I can also use Sass syntax with them, which is very nice. They play well with Typescript and especially React Context. Thanks to Context, I can reference once-defined CSS properties in any component and also easily switch the app's theme. The app is fully responsive.

Animations are created with Framer Motion.

## Technologies

 * React
 * Typescript
 * Styled Components
 * React Router
 * Firebase
 * Date-fns
 * Luxon
 * Framer motion

## Usage

You can find the app on https://swissknife.tech.

For a local development setup

````
  git clone https://github.com/Marty-W/swiss-knife.git
  cd swiss-knife
  yarn OR npm install
  yarn start OR npm start
````


After that, you can open your browser and go to localhost:3000. 
 
