## Table of contents

1. [User Story testing](#user-story-testing)
    1. [User Story tests](#user-story-tests)
    2. [Testing summary](#testing-summary)

2. [Validator Testing](#validator-testing)
    1. [ES Lint](#es-lint)
    2. [W3C CSS](#w3c-css)
    3. [Lighthouse](#lighthouse)

3. [Responsive Testing](#responsive-testing)

***

# User Story Testing

## As a user I can view the navigation bar on every page so that I can navigate easily around the application.

Acceptance Criteria

 - Nav bar displays at the top of all Shop pages
 - Nav bar displays different links depending on whether a user is logged in or logged out
 - If user is admin or staff, add option 'CMS' in the profile options.
 - Nav bar displays greeting when a user is logged in
 - All links work and take the user to the correct url
 - Two icon buttons on the right hand side to represent profile options and cart options
 - Hamburger menu present and working on screen sizes medium and below

Logged out navigation bar: 

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677565931/readme_images/nroots-react-frontend/user_story_1a_jndfrk.png)

Logged in navigation bar: 

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677566124/readme_images/nroots-react-frontend/user_story_1b_adfd6k.png)

Hamburger menu for screensizes medium and below: 

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677565654/readme_images/nroots-react-frontend/user_story_1c_cbeccm.jpg)

<br>

## As a user I can access the Register option so that I can create an account and access all features available to registered users.

Acceptance Criteria

 - Link to Register form present in navbar
 - Once a user is registered, they are re-directed to the log in page
 - A user account is created in the DRF API

Link to Register form present in navbar:

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677566474/readme_images/nroots-react-frontend/user_story_2a_afhvrl.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677566987/readme_images/nroots-react-frontend/user_story_2b_part_1_gguz02.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677566999/readme_images/nroots-react-frontend/user_story_2b_part_2_o30bxs.png)

Upon submitting Register form, user is re-directed to log in page:

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677567215/readme_images/nroots-react-frontend/user_story_2c_x1q7xg.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677579662/readme_images/nroots-react-frontend/user_story_2e_zaje0o.png)

The newly created Profile has been sent to the DRF API: 

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677570784/readme_images/nroots-react-frontend/user_story_2d_j9u4gm.png)

<br>

## As a user I can log in with my authentication credentials so that I can access all features available to registered users.

Acceptance Criteria

 - Link to Log In form present in navigation bar
 - Upon logging in, all functionality is available to logged in user
 - A link available on the login page so the user would be able to request password reset if forgot password

Link to log in form present in navbar: 

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677565931/readme_images/nroots-react-frontend/user_story_1a_jndfrk.png)

Upon logging in, all functionality is available to logged in user:

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677567613/readme_images/nroots-react-frontend/user_story_3a_gc0ja9.png)

A link available on the login page so the user would be able to request password reset if forgot password:

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677567826/readme_images/nroots-react-frontend/user_story_3b_gzommb.png)

br>

## As a (logged in) user I can access the log out option in the navbar so that I can log out of my account.

Acceptance Criteria

 - Link to Log Out displays in navbar if user is logged in
 - Clicking link logs user out
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677568056/readme_images/nroots-react-frontend/user_story_5a_m9tfpb.png)

<br>

## As a user I can see my authentication status so that I know whether or not I need to log in.

Acceptance Criteria

- Navbar links will be displayed i.e. log in/log out depending on status
- Greeting will be displayed in navigation bar if user is logged in

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677568343/readme_images/nroots-react-frontend/user_story_4a_x95h1t.png)

<br>

## As a logged-in user, I can access "My Account" to see my account details and address/es which have been saved from my previous orders.

Acceptance Criteria

 - Account form with First Name, Last Name and Email Address (Read only Fields)
 - A button "My Addresses" - Upon click, a modal will open to display my shipping addresses which were saved from previous orders.
 - I would be able to delete any of my address/es listed.
 ** Please note: For Admin or is_staff users the 'MyAddresses' button would not be displayed (by scope)

Account form of the new user:

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677568750/readme_images/nroots-react-frontend/user_story_6a_part_1_zowgby.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677568749/readme_images/nroots-react-frontend/user_story_6a_part_2_akiz8m.png)

Account form of the admin or staff users:

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677568980/readme_images/nroots-react-frontend/user_story_6b_part_1_ccnqje.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677568983/readme_images/nroots-react-frontend/user_story_6b_part_2_ocupxx.png)

<br>

## As a user I can input my registered email in order to receive password token to reset the password.

Acceptance Criteria

- A form with a single input - email address 

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677570792/readme_images/nroots-react-frontend/user_story_7a_mxnhst.png)

<br>

## As a user I can see a hero slider as soon as I enter the homepage so that I would be able to understand two things within the first three seconds:

Who they are
What they do/offer

In addition, the visual imagery added to the hero should convey or evoke an emotion that supports the message being sent.

Acceptance Criteria

- User can see hero images and different headings per image on slider
- A button to navigate to Shop
 
 ![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677570464/readme_images/nroots-react-frontend/user_story_8a_kql2ki.png)
 
## As a user I can view a section in the homepage, which will display all featured products which are currently available.

Acceptance Criteria

- User can see all featured products
- A button to navigate to see it's details on each product
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677570541/readme_images/nroots-react-frontend/user_story_9a_idnkia.png)
 
## As a user I can view a section in the homepage, which will display all categories.

Acceptance Criteria

- User can view categories section by scrolling at the bottom of the homepage, below the featured products section
- Each category is displayed nicely on a large icon, icon must be associated with the category name so user can relate.
- The icon image must have a link which on click will navigate to the respective category
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677571141/readme_images/nroots-react-frontend/user_story_10a_ff5frq.png)

- Upon the icon image is clicked, it will navigate to the respective category:

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677571378/readme_images/nroots-react-frontend/user_story_10b_cbts6e.png)

## As a user I can view the footer on every page in Shop

Acceptance Criteria

- Footer displays at the bottom of all Shop pages
- Footer displays social media links as icons i.e. Facebook and Instagram
- All links work and take the user to the correct url, open in a separate tab
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677571862/readme_images/nroots-react-frontend/user_story_11a_zbehhm.png)

- Links open in a separate new tab:

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677572506/readme_images/nroots-react-frontend/user_story_11b_djxb1p.png)

## As a user I can view shop page, which will display all products along with Search, Filter and Sort Widgets.

Acceptance Criteria

- User can view page title and breadcrumbs upon entering the page
- User can view all products in Shop - 12 products per page.
- Each product has an image which is displayed nicely in grid.
- Each product must have 2 icon buttons with tooltip title - 'See Product Details' and 'Add to Cart'.
- Each product must have product name, Price and (old price - if it is present)
- Product name, image and icon button - 'See Product Details' must be linked to the respective product details page for easy navigation.
- User can search by Product, Category or Tag
- User can filter by Product Categories
- User can filter by Product Tags
- User can sort; Default sort by newness, Sort by price low to high, Sort by price high to low
- User can re-order products in grid
- User can navigate to next and previous pages easily

- User can search by Product, Category or Tag showing the See Product Details and Add to Cart icon on each product:
 
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677572976/readme_images/nroots-react-frontend/user_story_12a_sqzsqk.png)
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677572976/readme_images/nroots-react-frontend/user_story_12c_crefds.png)
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677572976/readme_images/nroots-react-frontend/user_story_12b_pivswg.png)

- User can sort and re-order the products:
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677573483/readme_images/nroots-react-frontend/user_story_12d_ejqi3g.png)

- User can navigate to next and previous pages easily:

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677573652/readme_images/nroots-react-frontend/user_story_12e_jf7det.png)

## As a user I can view product details page, which will display product details of a specific product.

Acceptance Criteria

- User can view page title and breadcrumbs upon entering the page
- User can view product details of that specific product
- Product details will consists of; Product image, title, price, old price(if present), description.
- Add to Cart button - when clicked; quantity selector will be displayed and button title will change to 'Remove from Cart'
- User can select quantity - default is 1.
- Upon user clicks Add to Cart; the product will be added to Cart.
- Upon user clicks 'Remove from Cart'; the product will be removed from Cart.
- Category and Tag - of that specific product - will be displayed (if any).
- Category - if clicked - navigate to that specific category (i.e. Tiny Plants) so to display more products listed in that category
- Tag - if clicked - navigate to that specific tag (i.e. Featured) so to display more products listed in that tag.
 
- As a user I can view the product details of the product such as the product image, title, price (old price, if any), description and category of the product selected:
 
 ![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677573955/readme_images/nroots-react-frontend/user_story_13a_u2hnsp.png)
 
- As a user I can Add to Cart or Remove from Cart:
 
 ![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677574031/readme_images/nroots-react-frontend/user_story_13b_rrlz63.png)
 
## As a user I can view and navigate to the cart icon button which is located in the navbar (right side) - to get an overview of products which I have added to cart.
 
Acceptance Criteria

- User can see the count of products added to the cart. This count will be visible on the icon itself.
- If Count is 0 - Cart would not be clickable.
- If Count is 1 or above - User can click to get an overview of the products added to cart.
- The overview of each product displayed in mini cart consists of; thumbnail of the product image, product name, quantity and price.
- At the bottom of the mini cart; User will find the subtotal along with two buttons; 'View Cart' and 'Checkout'
- 'View Cart' button is linked to the Cart page where user can see full breakdown of the contents in Cart.
- 'Checkout' button is linked to the Checkout page where user can proceed with checkout to submit order.
 
- As a user I can view the number of product added in the cart, product image, quantity, price and the View Cart and Checkout button:
 
 ![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677574338/readme_images/nroots-react-frontend/user_story_14a_lw0pdz.png)
 
 ![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677574428/readme_images/nroots-react-frontend/user_story_14b_bqkay9.png)
 
## As a user I can view cart, which will display full breakdown of the contents in Cart.

Acceptance Criteria

- User can view page title and breadcrumbs upon entering the page.
- User can view table displaying cart items.
- Table headers would be Product, Price, Qty and Total.
- On the left hand side - user can find an icon button - delete symbol - on click item will be removed from cart.
- On the left hand side - user can see a thumbnail image of each item(product).
- Product name contains a link. If clicked, navigate to the product details of the product itself.
- User can change qty of each product by selecting a number from the drop down.
- User can view Cart Totals Table which will display Subtotal, Shipping and Total.
- User can find a button "Proceed to Checkout" at the bottom of the page. Upon click, it will navigate to Checkout Page.
 
- After clicking the View Cart button, the user will see all the details he/she ordered such as the price, product, shipping details, qty and the checkout button:
 
 ![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677575980/readme_images/nroots-react-frontend/user_story_15a_szift2.png)
 
## As a user I can proceed with checkout process by heading to the checkout page, input shipping address and submit order. The checkout page features would render depends on the user state.
 
Acceptance Criteria for Guest shopper/ logged-out user

- Guest customer can view page title and breadcrumbs upon entering the page.
- On the left hand side - User can input shipping address in the shipping details section.
- On the left hand side - User can input notes about the order, e.g. special notes for delivery.
- On the right hand side - User can view order details; table headers would be Product, Price, Qty and Total, along with Subtotal, Shipping and Grand Total.
- Guest customer can have the option to save their shipping details for next time, button displayed as 'Register'.
- If user clicks button 'Register' - A modal will open and user can input registration details in order to register and login on the fly.
- If user proceed with register and login on the fly, once user clicks on the modal bottom button "Register & Login" - the modal will close and authentication status with a success message will be displayed "You have successfully registered and logged in as email@example.com. You may now proceed to submit order."
- User can find a payment method and a description on what happens once an order is submitted.
- User can find a button "Submit Order" at the bottom of the page. Upon click, it will navigate to a landing page and an order summary will be send to the customer inbox (using the same email entered in the shipping details).

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677576287/readme_images/nroots-react-frontend/user_story_16c_ehwc6c.png)

- An order summary form will be received once the Submit order button clicked:

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677576799/readme_images/nroots-react-frontend/user_story_16d_coz47b.png)

Acceptance Criteria for a logged-in user

- User can view page title and breadcrumbs upon entering the page.
- On the left hand side - User can input shipping address in the shipping details section or pick one by clicking on a button named "My Addresses".
- If user clicks My Addresses - A modal will open. Any saved address/es from previous orders of the current user will get displayed.
- If user selects an address from the modal - The selected address will be displayed in Shipping Details fields.
- On the left hand side - User can input notes about the order, e.g. special notes for delivery.
- On the right hand side - User can view order details; table headers would be Product, Price, Qty and Total, along with Subtotal, Shipping and Grand Total.
- User can find a payment method and a description on what happens once an order is submitted.
- User can find a button "Submit Order" at the bottom of the page. Upon click, it will navigate to a landing page and an order summary will be send to the customer inbox (using the same email entered in the shipping details).

** Please note: For Admin or is_staff users the 'MyAddresses' button would not be displayed (by scope)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677576099/readme_images/nroots-react-frontend/user_story_16a_z8vnji.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677576203/readme_images/nroots-react-frontend/user_story_16b_mp3wgu.png)

## As a user, on Submit Order, I expect to be redirected to a landing page which provide information on what will happen next.
Furthermore, I would like the cart to be cleared upon order submission.

Acceptance Criteria

- A Landing Page which includes a thank you message with information on what happens next.
- Count on the cart icon (right hand side of nav bar) is set to zero.
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677576983/readme_images/nroots-react-frontend/user_story_17a_ehsyxj.png)

## As a user I can view about us page so that I can find our more about the company mission and goal of their business.

Acceptance Criteria

- User can view page title and breadcrumbs upon entering the page.
- User can view an image along with two sections named; "Our Mission" and "Goal of Our Business"
- User can find a button "Go to Shop". Upon click, it will navigate to Shop.
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677577111/readme_images/nroots-react-frontend/user_story_18a_gxlaff.png)

## As a user I can access the contact page so that I can find our more about the company contact information and submit a message.

Acceptance Criteria

- User can view page title and breadcrumbs upon entering the page.
- On the left hand side, user can find company contact information
- On the right hand side, user can input his name, email, subject and message to submit via a form.
- At the bottom, user can find company location via google maps.
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677577276/readme_images/nroots-react-frontend/user_story_19a_part_1_dkrf8t.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677577275/readme_images/nroots-react-frontend/user_story_19a_part_2_ducbn4.png)

## As a user I can view a Promo bar on every page in Shop so that I can see any perks/offers currently available.

Acceptance Criteria

- Promo bar with a message visible at the top of all Shop pages
- On screen sizes medium and below, promo bar will be displayed below the navigation bar
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677577657/readme_images/nroots-react-frontend/user_story_20a_bddqha.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677565654/readme_images/nroots-react-frontend/user_story_1c_cbeccm.jpg)

## As an admin/is_staff, I can view the navigation bar on every page in Shop so that I can navigate easily around the application.

Acceptance Criteria

- Nav bar displays at the top of all CMS pages
- Nav bar displays links related to CMS; Product List, Add Product, Orders and Shop (The latter will redirect to Shop)
- Nav bar displays greeting when a user is logged in and Profile icon is changed
- All links work and take the user to the correct url
- Hamburger menu present and working on screen sizes medium and below
 
Logged in navigation bar: 

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677566124/readme_images/nroots-react-frontend/user_story_1b_adfd6k.png)

Hamburger menu for screensizes medium and below: 

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677565654/readme_images/nroots-react-frontend/user_story_1c_cbeccm.jpg)

## As an admin/is_staff, I can view products in a data table, navigate to view/edit details of a specific products or delete one or multiple products at once. Furthermore, I can search by Product/Category or Tag and sort datatable columns.
 
Acceptance Criteria

- Data table headers would be: Date Created, Product(thumbnail image with product title), Category, Tag, Price, Action
- Inside the 'Action' column, user can find two options; 'View Details/Edit' and 'Delete'.
- If user clicks 'View Details/Edit' option; the product details page of that specific product will open.
- If user clicks 'Delete' option; the selected product will be deleted.
- If user select one or more checkbox; 'Deleted Selected' button will be displayed on top.
- User can navigate to next and previous pages easily.
- Search functionality is returning expected results upon querying Product/Category or Tag
- Datatable sorting functionality is working as expected.
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677578420/readme_images/nroots-react-frontend/user_story_22a_iammqp.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677578420/readme_images/nroots-react-frontend/user_story_22b_htpfpc.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677578420/readme_images/nroots-react-frontend/user_story_22c_ckajru.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677578420/readme_images/nroots-react-frontend/user_story_22d_qpamxc.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677578420/readme_images/nroots-react-frontend/user_story_22e_aqcu9i.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677578671/readme_images/nroots-react-frontend/user_story_22f_do8urc.png)

## As an admin/is_staff user, I can view product details page of a specific product and can edit, save changes.

Acceptance Criteria

- Product details are displayed in a form
- User can edit values in all fields and/or upload image to replace the current one.
- Required fields are indicated and form validation is working as expected.
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677578765/readme_images/nroots-react-frontend/user_story_23a_cv2yr2.png)

## As an admin/is_staff user, I can add a product.

Acceptance Criteria

- Form consists of the following fields: Product Title, Product Description, Additional Details, New Price, Old Price
- Form has a drag and drop feature to upload an image
- Form has two drop down menus: Category and Tag
- Required fields are indicated and form validation is working as expected.
- Button "Add" is located at the bottom of the form
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677579154/readme_images/nroots-react-frontend/user_story_24a_shctce.png)
 
 ## As an admin/is_staff, I can view orders in a data table, navigate to view details of a specific order. Furthermore, I can search by Order ID and sort datatable columns.
 
 Acceptance Criteria

- Data table headers would be: Date Ordered, Order ID, Checkout Type, Total Amount, Action
- Inside the 'Action' column, user can an option; 'View Details'.
- If user clicks 'View Details' option; the order details page of that specific order will open.
- User can navigate to next and previous pages easily.
- Search functionality is returning expected results upon querying an Order ID.
- Datatable sorting functionality is working as expected.
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677579154/readme_images/nroots-react-frontend/user_story_25a_kfr0xc.png)

![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677579154/readme_images/nroots-react-frontend/user_story_25b_bdhigq.png)
 
 
 ## As an admin/is_staff user, I can view order details page of a specific order to prepare order for the delivery.
 
 Acceptance Criteria

- Order details consists of shipping details form, order details table and order notes.
 
![User Story testing](https://res.cloudinary.com/dgroams94/image/upload/v1677579154/readme_images/nroots-react-frontend/user_story_26a_gz8k6p.png)




# Testing summary 

- All tests have been carried out in development and deployed version of application. 

- All authentication functionality has been tested and behaves as expected. 

- The navigation bar contains all required icons and overlay/tooltips which link to the correct pages. 

- The hamburger menu for screen sizes medium and below contains all required icons and overlay/tooltips which link to the correct pages. 

- CRUD functionality behaves as expected for both Shop and CMS.

- All Shop and CMS pages display data as expected. 

- All products and orders display in order of recently created first - by default.

- All search bars return the correctly filtered data.

- All forms sends data to the DRF API as expected.

- All URLS have been tested. Logged in users cannot access CMS pages unless they are admin or is_staff.

***

# Validator testing

## ES Lint

All code passed through the validator with no issues.

## W3C CSS

All CSS code passed through the validator with no issues: 

![Validator testing](https://res.cloudinary.com/dgroams94/image/upload/v1677771422/readme_images/nroots-react-frontend/w3c_css_validator_results_x1t6wh.png)

## Lighthouse

The site scored highly on Accessibility, Best Practices & SEO: 

![Validator testing](https://res.cloudinary.com/dgroams94/image/upload/v1677771422/readme_images/nroots-react-frontend/lighthouse_results_f5cny7.png)

***

# Responsive Testing

The website has been tested using the following browsers:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

The website has been tested on the following devices: 

- MSI Modern MD241PW Monitor - 23.8"
- HP Pavilion Laptop - 15"
- OnePlus 6T Phone -  6.41"
- Samsung Galaxy S9+ - 6.2"


The following emulated devices have been tested in Dev Tools:

- iPhone 12/13+ Pro
- Pixel 5
- Samsung Galaxy S20 Ultra
- iPad Air
- iPad Mini