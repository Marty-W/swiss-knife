# Swiss Knife

Swiss knife is a productivity app created with React, Typescript, and Firebase. It has three main modules: 
  1. Pomodoro tracker
  2. Habit tracker
  3. Todo list
  
## Table of Contents

* [Motivation](#motivation)
* [Features](#features)
* [Technologies](#technologies)
* [Launch](launch) 
  

## Motivation

I created this app to show off my skills but also because I've always been finding ways to be more productive. So I've tried pretty much every productivity app there is. This project is a merge of all the tactics I've found useful.

## Features

This app is built with React (the one with hooks). I've used modern react features i.e. Context, Reducers, Portals, Error Boundarries. At the beginning I've used Javascript and then slowly migrated to Typescript for additional type-safety. 

All user data is stored in Firebase Firestore and is accesible throgh user authentication with Firebase Auth. Users can sign up with their email and password OR they can use their Google account. All modules also work without authentication thanks to Firebase anonymous login. 

For styling purposes I've used Styled Components. They allow me to encapsule styles to their respective components and provide easier reusability of those components. I can also use Sass syntax with them, which is very nice. They also play well with Typescript and especially React Context. Thanks to Context I can reference once-defined CSS properties in any component and also to easily switch the app's theme. 

## Technologies

 - React
 - Typescript
 - Styled Components
 - React Router
 - Firebase
 - Date-fns
 - Luxon
 - Framer motion

## Launch

You can find the app on https://swissknife.tech.

For a local development setup

````
  git clone https://github.com/Marty-W/swiss-knife.git
  cd swiss-knife
  yarn OR npm -i
  yarn start OR npm start
````


After that you can open your browser and go to localhost:3000. 
 
