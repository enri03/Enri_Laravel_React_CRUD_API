# Laravel React CRUD Rest API

## Project Setup

### Backend Setup

1. **Start Apache and MySQL**

2. **Set up backend:**

   - CD to the `backend` folder.
   - Ensure that you have a '.env' file on the root of backend folder and that  the `.env` variables match your MySQL database configuration , below is my db config:

     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3307
     DB_DATABASE=bohemia
     DB_USERNAME=root
     DB_PASSWORD=
     ```

   - Run the following commands to install all the dependencies and to create the db tables needed for the app:

     ```bash
     composer install
     php artisan migrate
     ```

   - To run the application, execute the following command:

     ```bash
     php artisan serve
     ```

### Frontend Setup

1. **CD to frontend**

2. **Install Dependencies**

   - Run the following command to install the necessary dependencies:

     ```bash
     npm install
     ```

3. **Start the Application**

   - To start the frontend application, run:

     ```bash
     npm start
     ```

   - The app should now be up and running at [http://localhost:3000/](http://localhost:3000/). By default, a user login form will be displayed. You  need to create a user first using register form
   Note: As for this project the SPA is on production and accesable through this link for demo purpose ( https://laravelreactapi.netlify.app/ ) but since there is no server or DB on prod this app will not work 
   unless the Laravel service and MYSQL db are set up on the local env
