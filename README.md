# Ponditi
 
 - Compititors - __https://bdtutors.com/__

 - [Tuotial](https://www.youtube.com/watch?v=BiN-xzNkH_0)
### Technologies
 - Testing (jest)
 - Database
 - Backend (Node.js nest.js)
 - Eslint (Clean coding)
 - Typescript

### Development
 - Teacher per hour rate need to update
 - Send request with current time of client to initialize scheduled class
 - To delete a scheduled class the class status must be completed or rejected
 - List of requested students
 - Validate with express validator in every page
 - Add user types (ONLINE, TL(Student's Location), SL(Student's Location), ANY)
 - Add users online, TL, SL
 - Add hourly fees if he is teacher
 - Student teacher relationship for send request
 - Remove from signup - subjects, classes
 - Create or seed some random user 
 - Profession
 - Make sign out
 - Create tables of classes, subjects
 - Setup eslint for server
 - google place api for location search
 - 1 hour session
 - Search teachers
 - Search category 1, online 2, offline 3, home
 - Search by Location - google place api 
 - Remove teacher/student from login page
 - User to feedback (many to many relationship)

### Deployment process(server)
- Disable add admin route and seed route from admin router and get all users from user route


### Nest.js entities
 - Controller - Creating endpoints
 - Module
 - Services
 - Guards
 - Data transform objects
 - Pipe - transform and validate
 - Type orm [tutorial](https://www.youtube.com/watch?v=W1gvIw0GNl8) - https://docs.nestjs.com/recipes/sql-typeorm
 - [Tutorial 1](https://www.makeuseof.com/nestjs-typeorm-sql-databases/) - [tutorial 2](https://lagliam.medium.com/how-to-integrate-an-existing-mssql-database-using-nestjs-and-sequelize-21ff62c4c5ff)
 - Create module, controller, service 
    ```
    nest g module report
    nest g controller report
    nest g service report
    ```
 - [mssql Installation on linux](https://www.youtube.com/watch?v=tT9UlXwBarw&t=50s)
### MsSQL queries
 - Delete all rows
 ```
 truncate table TableName
 ```

 - Foreign key check
 ```
 SET foreign_key_checks = 0;
 SET foreign_key_checks = 1;
 ```
 - Migrations
 ```
 npx sequelize-cli db:migrate --url 'mssql://sa:Test1234@localhost/ponditi_db'
 ```