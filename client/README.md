# How To Run Client // Front-End

cd client
run npm run dev

# How To Run Server// Back-End

cd Server
npm run dev

# Front-End Development

## Code Breakdown

✳️api.js file contains the logic for the API to be broken down for the CRUD to be implmented. This files purpose is to only fetch exaclty what we need. In this file, we have the ability to get all, create/edit and delete.

✳️CarForm.jsx is the form being created that is working with the api.js. Contains basic inline styling for the components in the field form.

✳️CarBlogDashboard is a component built with the CarForm compnent and pulling data from the api. We started by setting our use states for several of our variables. We create a Form Field State with what our fields for the user will be to fill out. This component completes the API data structure by then finishing the fetch function with a .then and .catch method. We then create two functions that will have a form field with user to fill information, and a state where the field clears itself after a submit. The different fields also recieve a inline styling for the appearance.

# Back-End Development

## Code Breakdown

✳️The Server is connected to client and is able to recieve any crud method to the database. Postman and mongo Compass display and work with client for any data to reflect on changes/updates, getall functions, and the capabilities to delete.
