# START APP

## DOWNLOAD

To get start the application you must download te repository from <https://github.com/auguchenco/todo-list>.

## BACKEND

Then go to the file `/todo-list/todo-backend/.env.example` and change the name to `.env` and if you want you can set your own values, just like the secret key `JWT_SECRET`.

Then, open a bash terminal on the directory `/todo-list/todo-backend` and run the following commands:

```bash
npm install # this is not required, but recommended

docker-compose up
```

*Remember get docker installed.*

Somethimes doesn't work so you need to stop running the container and restart again.

Now you have your backend running.

## FRONTEND

For the frontend you need to execute the following commands on bash terminal at `/todo-list/todo-backend` directory.

```bash
npm run set-env
```

This command will install all the dependencies that the app needs to works.

Then run:

```bash
npm run app
```

Finally, with this command we can run the application and start using that on our browser with the next URL:

> <http://127.0.0.1:5173/>

## START USING

To initialize session you need to creat a new user and then login session. Register do not login session.