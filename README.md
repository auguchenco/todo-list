# START APP

## DOWNLOAD

To get started with the application, you must download the repository from <https://github.com/auguchenco/todo-list>

## BACKEND

The first time you start the backend, you should follow these steps. However, if you have done this before, you only need to run the Docker container named `todo-backend-app-1`.

Start by going to the file `/todo-list/todo-backend/.env.example`, renaming it to `.env`, and, if you want, setting your own values, such as the secret key JWT_SECRET.

Then, open a terminal in the "`/todo-list/todo-backend`" directory and run the following commands:

```bash
npm install # this is not required, but recommended

docker-compose up
```

*Make sure you have Docker installed.*

Sometimes it may not work, so you may need to stop the container and restart it until it works. It should take no more than 2 or 3 attempts.

Now your backend should be running.

## FRONTEND

For the frontend, execute the following commands in the terminal from the "`/todo-list/todo-backend`" directory:

```bash
npm run set-env
```

This command will install all the dependencies needed for the app to work.

Then run:

```bash
npm run app
```

Finally, with this command, you can run the application and access it in your browser using the following URL:

<http://127.0.0.1:5173/>

## START USING

To start a session, you need to create a new user and then log in. Registering does not automatically log you in.
