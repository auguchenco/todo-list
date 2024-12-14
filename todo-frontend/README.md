# Procedure for running the app

For running the app, we'll need two terminals running on the project direction, and type the following commands in each one:

**Terminal 1**

```bash
$ npm run set-env
```
This command will install all the dependencies that the app needs to works.

Then run:

```bash
$ npm run database
```
This command will run the database.

On this first terminal we'll have running our pseudo-database. That is a JSON file called "db.json" on "./backend" folder on our project.

After that this terminal will be busy running our pseudo-database. So, we'll need another one.

**Terminal 2**

```bash
$ npm run app
```

Finally, with this command we can run the application and start using that on our browser with the next URL:

> http://127.0.0.1:5173/

# About the project

This project is about a To-Do List on which you can:
 - Create tasks
 - Mark as checked a task previusously created
 - Delete tasks

Was developed using:
 - Node.js (as the default engine)
 - Vite (for start to create te project and set the first things)
 - React (the framework for developer purposes)
 - Json Server (for run a JSON file as pseudo-database)
 - React Router Dom (for manage the routing)
 - Axios (for api management)
 - Sass (for styles)
 - UUID (for create a unique identifier for every task)
 - Git & Git Hub (as a version management)