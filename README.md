# Redwitter

## Features

- [x] Submit a tweet link which is shown on the home page
- [x] Up/down vote submitted tweets
- [x] Comment on submitted tweets
- [x] Calculate user karma score for their submissions
- [x] Friends (Anyone who has up voted a users post)
- [x] Frenemies (Anyone who has down voted a users post)

## Stack

#### [Adonis](https://adonisjs.com/)

> AdonisJs is a true MVC Framework for Node.js

Adonis provides the backend used for Tweddit. Its primary purpose is to respond to various API calls used within the single page application built in ReactJS.

I use a MySQL database and Adonis's active record ORM (lucid) to interact with the data.



#### [ReactJS](https://facebook.github.io/react/)

> React is a declarative, efficient, and flexible JavaScript library for building user interfaces.

ReactJS gets used on the client side for Tweddit. I used Redux to manage the application's state (containers). I trigger several different API requests that fetch data from the server and provides state to numerous "dumb" components.



## Getting Started

> You may optionally use the provided dockerfile I created to fire up the application quickly.

1. Setup a MySQL database
2. Create a `.env` file and edit the variables to use your database
3. Migrate the database using `./ace migration:run`
4. Fire up the application `yarn run serve:dev`
