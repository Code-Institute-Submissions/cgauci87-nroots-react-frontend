# Table of Contents

1. [Introduction](#introduction)

2. [UX](#ux)
    1. [The Strategy Plane](#the-strategy-plane)
    2. [Agile Methodology](#agile-methodology)
    3. [The Scope Plane](#the-scope-plane)
    4. [The Structure Plane](#the-structure-plane)
    5. [The Skeleton Plane](#the-skeleton-plane)
	6. [The Surface Plane](#the-surface-plane)

3. [Features](#features)
    1. [Components](#components)
    2. [Pages](#pages)

4. [Testing](#testing)

5. [Bugs](#bugs)
    1. [Fixed](#fixed)
    2. [Unfixed](#unfixed)

6. [Technologies Used](#technologies-used)
    1. [Modules](#modules)
    2. [Languages](#languages)
    3. [Frameworks, Libraries and Platforms](#frameworks-libraries-and-platforms-front-end)
    4. [Services](#services)
    5. [Resources](#resources)

7. [Project Setup and Initial Deployment](#project-setup-and-initial-deployment)

8. [Final Deployment](#final-deployment)

9. [Credits](#credits)
    1. [Media](#media)
    2. [Acknowledgements](#acknowledgements)

***

# Introduction

nRoots is a Shop for house plant lovers with CMS pages (Content Management System) inclusive and restricted for Admin or is_staff. Admin/is_staff can add, edit products and view orders.
Users (shoppers) can register for an account - Either by sign up through the standard registration form or during the checkout process; registration on the fly.
By having an account - registered users would have their shipping address/es being saved automatically upon order submission. This is a time saving feature for registered returning customers.
No duplicate addresses would be saved. Registered user can find their saved addresses either from their account section or in the checkout page. 
Guest users would still be able to add/remove items to shopping cart and proceed with checkout. However shipping address won't be saved upon order submission.

This repository holds the Django Rest Framework (DRF) API database for the ReactJS frontend part of the project. 

[Deployed DRF API (via Heroku)](https://nroots-drf-api.herokuapp.com/)

[Deployed Front End (via Heroku)](https://nroots-react-frontend.herokuapp.com/)

[Back End README.md](https://github.com/cgauci87/nroots-drf-api/blob/main/README.md)

[Back End TESTS.md](https://github.com/cgauci87/nroots-drf-api/blob/main/TESTS.md)

![Am I Responsive](https://res.cloudinary.com/dgroams94/image/upload/v1677775519/readme_images/nroots-react-frontend/am_i_responsive_evojgh.png)

***

# UX

## The Strategy Plane

This application has been produced for Portfolio Project 5, as part of the Code Institute Diploma in Full-Stack Software Development. 
The project aims to demonstrate skills learnt in HTML, CSS, JavaScript, React.js, Bootstrap.js and Django REST Framework.

## Agile Methodology

The development of this project was managed and implemented using GitHub Projects Kanban Board. Available here:
<a href="https://github.com/users/cgauci87/projects/5" target="_blank" rel="noopener" 
aria-label="Link to GitHub Projects">nRoots - User Stories</a>

<br>

## The Scope Plane

Features planned:

- Visually appealing design with a calming color scheme.
- Intuitive and easy to use navigation.
- Guest Shoppers - can add or remove items to cart, proceed to submit order via checkout.
- Guest Shoppers - can register and login on-the-fly during the checkout process.
- Logged-in Shoppers - would have their shipping address saved for their next order 
and can delete previous addresses which were saved from their previous orders
- CMS - Content Management System designed and accessible for admin and staff users.
- CMS - Features view all products, view and edit product details, view orders.
- Users can sign up, log in and log out.
- Form validation errors will be communicated to user.

## The Structure Plane

![The Structure Plane](https://res.cloudinary.com/dgroams94/image/upload/v1677583905/readme_images/nroots-react-frontend/nroots-react-frontend-structure_awf151.png)

Database Schema can be found in the README for the DRF API <a href="https://github.com/cgauci87/nroots-drf-api/#database-schema---entity-relationship-diagram" target="_blank" rel="noopener" aria-label="Link to database schema">here</a>

## The Skeleton Plane

All wireframes for the project can be found [here](src/assets/wireframes/)

These wireframes were drafted at the very early planning stages of the project and may not show an exhaustive list of pages and features.

## The Surface Plane

**Color Scheme**

![The Surface Plane](https://res.cloudinary.com/dgroams94/image/upload/v1677750824/readme_images/nroots-react-frontend/palette_mxycq7.png)

Main colours of the site are calming and neutral with a natural feel.

# Features

## Components

Global:

- Navigation Bar
- Logo
- Forms
- Page Title
- Loading Spinner

Shop:

- Hero
- Footer
- Cart
- Ordering
- Pagination
- Featured Products
- Product Categories Widget
- Product Search Widget
- Produdct Tags Widget

CMS:

- Forms


## Pages

Global:

- 404 Not Found
- Register
- Login
- My Account
- Forgot Password
- Email Verification

Shop:

- Home
- About
- Contact
- Shop
- Cart
- Checkout


CMS:

- Product List
- Edit Product
- Add Product
- Orders
- Order Details



***

# Testing

- All testing documentation can be found [here](/TESTS.md)

***

# Bugs

## Fixed

1. When trying to make an axios get request to render product data, results were returned on the backend API, however,
 on the frontend were not returned.
Upon debugging, it transpired that response handling on the axios call was missing .results.
The bug was fixed by adding .results with response.data (response.data.results), performed a Git add, 
commit and push and product data has returned on the front-end as expected.

2. When setting up event handlers for the options in the navigation bar;  I've passed an object, options, as an argument to the function, 
however event handler was not opening the options menu when user clicks the button. Upon debugging, I noticed that the options was missing
 curly braces.
 The bug was fixed by wrapping up options in curly braces for destructuring to work. Destructuring uses only the named properties of the object, 
 performed a Git add, commit and push. Options event handler opened menu as expected.

## Unfixed

No notable bugs have been found to remain.

***


# Technologies Used

## Modules
Modules used in this project can be found in the README for the DRF API <a href="https://github.com/cgauci87/nroots-drf-api#modules" target="_blank" rel="noopener" aria-label="Link to modules used">here</a>

## Languages
- HTML
- JSX
- CSS
- JavaScript

## Frameworks, Libraries and Platforms (Front End)
- Django REST Framework - Backend API.
- React.js - Components and pages to form the frontend of the application.
- Balsamiq - Creation of wireframes. 
- GitPod - Workspace.
- GitHub - Repository.
- Heroku - Deployment.
- axios - Promise based HTTP client.
- antd - An enterprise-class UI design language and React components implementation.
- ant-design/icons - Ant Design Icons for React.
- eslint - An AST-based pattern checker for JavaScript.
- prettier - Opinionated code formatter.
- qs - A querystring parser that supports nesting and arrays, with a depth limit.
- react-lazy-load - Simple lazy loading component built with react.
- react-number-format - React component to format number in an input or as a text.
- react-slick - React port of slick carousel.
- react-toastify - React toast notifications.

## Services
- [AmIResponsive](https://ui.dev/amiresponsive) - Check responsiveness on all screen sizes
- [Favicon](https://favicon.io/) - Generation of favicon
- [Themify Icons](https://themify.me/themify-icons) - Icons used for UX purposes
- [Icomoon Font & SVG Icons](https://icomoon.io/) - Font and Icons used for UX purposes
- [colors.muz.li](https://colors.muz.li/) - Generation of color palettes

## Resources

- The Code Institute's Moments walkthrough project was used in the beginning stages of the project to help get me started. I then customised and added further functionality as my confidence and knowledge grew.
- W3C Schools and Stack Overflow for general enquiries relating to React.js.

***

# Project Setup and Initial Deployment

1. Create a new repository in GitHub (do not use CI Template).

2. Create new workspace by clicking 'Gitpod' button. 

3. Once workspace has loaded, run terminal command **npx create-react-app . --use-npm** to create React app. 

4. Once the app is installed, run terminal command **npm start** to check app is working. Browser should open with the spinning React logo on a dark blue background. 

5. Remove logo import from the top of App.js, and replace the React Header element with a custom h1 element containing 'Hello World!'. 

6. Confirm the changes have rendered in the browser preview then add, commit and push changes. 

7. Create a new app in Heroku. 

8. Go to 'Settings' and ensure that **heroku/nodejs** buildpack is present. If it is not, click on 'Add Buildpack', select 'nodejs' and save changes.

9. Click on the 'Deploy' tab and go to 'Deployment Method'. Click on GitHub. 

10. Go to 'App connected to GitHub' and search for the relevant repository. Select that repository and click 'Connect'.

11. Go to 'Manual Deploy' section and click 'Deploy Branch'. Click on 'build logs' to monitor build and ensure deployment is successful. Build is complete when log states 'Build succeeded!'. 

12. Click 'Open App' button to view newly deployed app. 

***

# Final Deployment

1. Ensure all finalised code is commited and pushed to Github. 

2. Log into Heroku and open the dashboard for your frontend react application.

3. Select the “Deploy” tab in the dashboard and select "Deploy Branch".

4. Wait for the build to complete (you can click “view build log” to watch the process in a larger window).

5. When you see the message “deployed to Heroku” in the build log, click the “open app” button at the top of the page.

6. Test the deployed application to ensure it matches the development version. 

***

# Credits

- The Code Institute DRF-API walkthrough was used as an invaluable guide on how to build a DRF-API. 
- Team at Tutor Support and Student Care for their assistance. 
- Fellow students for peer support and chats.
- Slack Community for an invaluable archive of help! 

***

# Media 

- All media images from [Pexels](https://www.pexels.com/) - free stock images.
