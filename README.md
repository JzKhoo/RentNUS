# IS3106 Mern Full Stack Development

## MERN Stack Application Development for IS3106 Enterprise System Design

A web application item rental/renting service catered towards NUS Students, to allow students to rent out under utilised resources and venues.

## Technology Stack

- _Frontend_: React.JS
- _Styling_: Bootsrap CSS
- _State-Management_: Redux
- _Server Environment & API_: Node.JS & Express.JS
- _Database & Management_: Atlas CloudDB & Mongoose
- _Deployment_: Vercel MERN deployment

## Installation

1. `npm install` in the root & frontend directory
2. create a `.env` folder in the root with your own cluster URI
3. `npm run data:import` to import data
4. `npm run dev`
5. go to `localhost:3000` to view the frontend page
6. go to `localhost:4000` to view the API

## Features

### Profile Management

- Login
- Register
- View User Profile
- Update User Profile
- Logout

### Main Page Component

- View Items
- Toggle to Next Page
- Search Items
- View Item Details
- Go back to Previous Page

### Item Management

- Add an Item
- Delete an Item
- Update Item
- Add a Review

### Transaction Component

- Add to Cart
- Place Order
- Make Paypal Payment
- View Order
- Rent an Item
- Confirm Item Borrowed
- Return an Item
- Confirm Item Returned

### Admin Managment

- View Rental Orders
- View User Profiles
- Delete User Profiles
- Update User Profile
- View all Items
- Delete Items
- Promote User to Admin

## Additional Information

This MERN Application was deployed on Vercel: Frontend & Backend. Made for a Group Project in NUS, with the focus on learning new technologies and fundamentals of collaborative development.
