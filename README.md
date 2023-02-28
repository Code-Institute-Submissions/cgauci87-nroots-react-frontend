# Table of Contents

1. [Introduction](#introduction)

2. [UX](#ux)
    1. [The Strategy Plane](#the-strategy-plane)
    2. [Agile Methodology](#agile-methodology)
    3. [The Scope Plane](#the-scope-plane)
    4. [The Structure Plane](#the-structure-plane)
    5. [The Skeleton Plane](#the-skeleton-plane)

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
