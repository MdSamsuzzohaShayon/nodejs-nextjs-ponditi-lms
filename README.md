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
   - ✅ Only digit for OTP Code 
   - Verify user profile by **admin** (Until they are verified they will be unlisted from search) 
   - ✅ Next button to the right 
   - ✅ Use bulk sms bd for sending messages 
 - **Send request**
   - ✅ Detail of teacher (Any one can see techer detail), Send request visible only if he is logged in as student 
   - ✅ After filtering by default they will select subjects and class (By default no available class and subjects) 
   - ✅ No duration or estimated bill - only hourly rate 
   - ✅ Select slot (8 to 10) 
 - **Update profile**
   1. Educational qualification
      - ✅ Exam name (SSC / HSC / )  
      - ✅ Institution 
      - ✅ Group (Science, Arts, & commerce) 
      - ✅ Result  
      - ✅ Passing Year  
   2. Personal Detail 
      - Picture (Later)
      - ✅ Name  
      - ✅ Email  
      - ✅ District  
      - Present Address (Used to search ) 
   3. Tution Detail 
      - ✅ Rate per hour  
      - ✅ Status (Currenty available to request or not ) 
      - Tution place multile selection 
   4. Subjects
      - ✅ Tution subjects 
      - ✅ Tution class types 
 - **Scheduled Class detail**
   - ✅ No bill and duration 
   - ✅ Detail location of student 
   - ✅ Institution name 
   - ✅ Scheduled time 
   - ✅ Picture, Name, Class & Subject  
 - **Top Bar**
   - ✅ Profile  
   - ✅ Request histry (Filter by pending requests, rejected requestes)  
   - ✅ Notifications  
 - **Tution process by teacher**
   - ✅ Start tution (No more request acceptable)  
   - ✅ Minutes counting   
   - ✅ Finish tution (bill depends on per minute count)  
   - ✅ Mark as paid (Student can not send request until they pay their dues)  
   - ✅ Give feedback  

  - **Modification-1**
    - ✅ Making class and subjects without reload the admin dashboard page (To make relationship it needs id of subject and classtype)  
    - ✅ User should not regester twice  
    - ✅ User will have different education level  
    - ✅ Multiple class and subjects of a teacher  
    - ✅ Start imiddeate action after start class, accept, reject, finish class, review etc  
    - ✅ select default subject and class of teacher if search has none of it  
    - ✅ select item background in Calender  
    - ✅ All class are online for now. Fix in server initiate class  
    - ✅ Show slot time  
  
  - **Modification-2**
    - ✅ Make google place api work  
    - ✅ Make navbar smaller  
    - ✅ No scrolling for searching teacher  
    - ✅ Search button on the right  
    - ✅ Logout button doesn't work on production  
    - ✅ Option for selecting multiple option for tution location - online, tl, sl  

  - **Modification-3**
    - ✅ No tution fee for student - Available status is not changing on production  
    - ✅ Show role on top bar  
    - ✅ Need to work with Calender - Select current date, add 7 days, work next and previous   
    - ✅ Align time slot  
    - ✅ Add profile picture   
    - ✅ Add address in order to initialize scheduled class   
    - ✅ Notification bar  
    - Make More responsive
    - ✅ Approve button on detail page of scheduled class  


 - **Requirement-1**
 - ✅ Work with review 
 - Generate link for scheduled class that is online only
 - Send notification for new requests via phone or mobile browser
 - Teacher per hour rate need to update (client's dashboard input fields) 
 - ✅ Send request with current time of client to initialize scheduled class 
 - ✅ List of requested students 
 - ✅ Validate with express validator in every page 
 - ✅ Add user types (ONLINE, TL(Student's Location), SL(Student's Location), ANY) 
 - ✅ Add users online, TL, SL 
 - ✅ Add hourly fees if he is teacher 
 - ✅ Student teacher relationship for send request 
 - ✅ Remove from signup - subjects, classes 
 - ✅ Create or seed some random user 
 - ✅ Profession 
 - ✅ Make sign out 
 - ✅ Create tables of classes, subjects 
 - ✅ Setup eslint for server 
 - google place api for location search
 - ✅ 1 hour session 
 - ✅ Search teachers 
 - ✅ Search category 1, online 2, offline 3, home 
 - Search by Location - google place api 
 - ✅ Remove teacher/student from login page 
 - User to feedback (many to many relationship) 
 
 - **Requirement update-3**
 - No preffered class, subjects, and tuition place
 - Different page or section for signup as student and reacher

 - User should not be able to register with same phone twice
 - Confused - 16
 - ✅ Fixing menu 
 - ✅ phone change cc - Phone country code 
 - teacher type - arabic, bangla, english in the search
 - Location api for user location in regestration,
 - Set profession by default the role
 - ✅ send id and password 
 - ✅ We should keep 2 step for regestration  
 - ✅ No age, profesion, cgpa  
 - ✅ passing year, Currently studying option  
 - Send message on first attempt
 - Check all functions of update
 - add educational qualifications not working at the time of registration
 - Reset password
 
 - **Requirement update-4**
 - ✅ OTP is not sending properly (register) -> use full code inside router callback (not from sendsms)
 - ✅ No tabs for classes and account (register)
 - ✅ Add profession and institution (register)
 - ✅ if anyone check on currently studying passing year will be disable (register)
 - ✅ Degree / education -> height education (register)
 - ✅ Search functions need to work
 - Frontend no result on search
 - Tuition style (Online, teacher's location, student's location)
 - Login redict to login page again on production
 - Rates for different subjects

 - **Requirement update-5**
 - [Page change loading](https://stackoverflow.com/questions/55624695/loading-screen-on-next-js-page-transition)
 - ✅ Add rate for teacher - calculate monthly rate
 - Profession will be student, Full Name, Email, Medium, Class, Institution, Location
 - ✅ No rate,  subject, for students
 - ✅ dashboard -> update user - no any medium
 - Setup sequelize from scretch - association and migrations
 - Rivisions
 - Change favicon.ico 
 - Custom 404 page
 - A function should run in every hour to delete unverified users - setInterval
 - Image optimizations - https://nextjs.org/docs/basic-features/image-optimization - test with lighthouse private window
 - Next.js -> start loading in one page(e.g. login) turn off loading from another page(e.g. dasboard page). if request fails then turn off loading
 - improve the initial loading performance https://nextjs.org/docs/advanced-features/dynamic-import
 - [Deployment guide](https://docs.digitalocean.com/tutorials/app-nextjs-deploy/), [Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export)
 - Show properly one by one Medium -> classes -> subjects (required field)
 - no education, no tution detail, prefered subject and classes detail for student,
 - No gmail login
 - Google place api error
 - highest education
 - Model calculating tuition fee
 - tuition style - online / offline
 - rate for tuition style -> different rates for student's location teacher's location and online
 - www.ponditi.com add in message
 - Add education freely
 - Experience below the name
 - Personal detail and tuition detail to be in one section and at top
 - Second section preffered subject
 - 3rd section education detail

Ask questions

### Advancing
 - [Update next js 13](https://www.youtube.com/watch?v=6aP9nyTcd44)
 - Dockerizing
 - Using sequelize cli properly to migrate, and undo with associations
 - Testing




### Deployment process(server)
- Disable add admin route and seed route from admin router and get all users from user route
- make `npm start` script in package.json for **heroku** deployment
- Remove `dotenv` requirement from server.js for **heroku** deployment


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
### Challenges
 - [Cross domain cookie](https://stackoverflow.com/questions/3342140/cross-domain-cookies/74231202#74231202)

### Docker
 - [Dockerize Your Full-Stack App](https://www.youtube.com/watch?v=Jo5TVUBjbIs), [Dockerizing Full Stack Web App REACTJS & NODEJS](https://www.youtube.com/watch?v=IDVUy34vlSE)
