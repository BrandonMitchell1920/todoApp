This is a simple Todo app implemented using Grid's tech stack.  It uses an 
ASP.NET C# backend, GraphQL API, and a Typescript React frontend.  Data is 
persisted in a SQLite database.

To Run:
  Node.js and yarn are needed to run the app.  When Node.js is installed, it 
  should also install npm as well.  Use npm to install yarn.

  Start up the backend in Visual Studio.  It will take a little longer the 
  first time as it downloads dependencies using yarn and initializes the 
  database.  You can ignore the warnings about incorrect peer dependencies.

  Navigate to the ClientApp folder in a terminal and run "yarn start".

  When "yarn start" is ran, the app should automatically open in the browser 
  running on "http://localhost:3000".  The first time will be slower as all the 
  Typescript files will need to be compiled for the first time.  The backend 
  runs on "https://localhost:5000".  "https://localhost:5000/graphql" is the 
  endpoint for the GraphQL API.  You can visit this link in the browser to view 
  the GraphQL Playground.  This will show you the schema and allow you to make 
  queries against the backend.
  
Note:
  I've noticed an issue where the first mutation ran after start up sometimes
  fails.  I don't know why, but if your first edit, delete, or create fails, 
  just do it again.