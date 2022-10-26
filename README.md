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

 - **Requirement update-2**
 - Reset all targeted value after making request and mounting a component
 - **Register user**
   - Only digit for OTP Code ✅
   - Verify user profile by **admin** (Until they are verified they will be unlisted from search) 
   - Next button to the right ✅
   - Use bulk sms bd for sending messages ✅
 - **Send request**
   - Detail of teacher (Any one can see techer detail), Send request visible only if he is logged in as student ✅
   - After filtering by default they will select subjects and class (By default no available class and subjects) ✅
   - No duration or estimated bill - only hourly rate ✅
   - Select slot (8 to 10) ✅
 - **Update profile**
   1. Educational qualification
      - Exam name (SSC / HSC / )  ✅
      - Institution ✅
      - Group (Science, Arts, & commerce) ✅
      - Result  ✅
      - Passing Year  ✅
   2. Personal Detail 
      - Picture (Later)
      - Name  ✅
      - Email  ✅
      - District  ✅
      - Present Address (Used to search ) 
   3. Tution Detail 
      - Rate per hour  ✅
      - Status (Currenty available to request or not ) ✅
      - Tution place multile selection 
   4. Subjects
      - Tution subjects ✅
      - Tution class types ✅
 - **Scheduled Class detail**
   - No bill and duration ✅
   - Detail location of student ✅
   - Institution name ✅
   - Scheduled time ✅
   - Picture, Name, Class & Subject ✅ 
 - **Top Bar**
   - Profile ✅ 
   - Request histry (Filter by pending requests, rejected requestes) ✅ 
   - Notifications ✅ 
 - **Tution process by teacher**
   - Start tution (No more request acceptable) ✅ 
   - Minutes counting  ✅ 
   - Finish tution (bill depends on per minute count) ✅ 
   - Mark as paid (Student can not send request until they pay their dues) ✅ 
   - Give feedback ✅ 

  - **Modification**
    - User should not regester twice
    - User will have diffrent education level
    - Multiple class and subjects of a teacher
    - Search with google place API
    - Start imiddeate action after start class, accept, reject, finish class, review etc
    - select default subject and class of teacher if search has none of it
    - select item background in Calender
    - Make responsive
    - All class are online for now. Fix in server initiate class 
    - Show slot time



 - **Requirement-1**
 - Work with review ✅
 - Generate link for scheduled class that is online only
 - Send notification for new requests via phone or mobile browser
 - Teacher per hour rate need to update (client's dashboard input fields) 
 - Send request with current time of client to initialize scheduled class ✅
 - List of requested students ✅
 - Validate with express validator in every page ✅
 - Add user types (ONLINE, TL(Student's Location), SL(Student's Location), ANY) ✅
 - Add users online, TL, SL ✅
 - Add hourly fees if he is teacher ✅
 - Student teacher relationship for send request ✅
 - Remove from signup - subjects, classes ✅
 - Create or seed some random user ✅
 - Profession ✅
 - Make sign out ✅
 - Create tables of classes, subjects ✅
 - Setup eslint for server ✅
 - google place api for location search
 - 1 hour session ✅
 - Search teachers ✅
 - Search category 1, online 2, offline 3, home ✅
 - Search by Location - google place api 
 - Remove teacher/student from login page ✅
 - User to feedback (many to many relationship) 

### Deployment process(server)
- Disable add admin route and seed route from admin router and get all users from user route
- make npm start script in package.json for **heroku** deployment
- Remove dotend requirement from server.js for **heroku** deployment


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
 npx sequelize-cli db:migrate:undo:all --to 20220215110049-migration-skeleton.js --url 'mssql://sa:Test1234@localhost/ponditi_db'
 npx sequelize-cli db:migrate --url 'mssql://sa:Test1234@localhost/ponditi_db'
 ```