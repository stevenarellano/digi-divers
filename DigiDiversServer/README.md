# REPOSITORY GUIDE

## Starting up the server for testing

run

1. `yarn`
2. `yarn run dev`

## Postgres with JS

-   library required: pg
-   see [here](https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/) for CRUD tutorial

## Testing get endpoints

1. after starting the server, navigate to [http://localhost:8080](http://localhost:8080) (or whichever port your hosting on)
2. find the url route you want to test. E.g. `app.use('/api', uploadUDRouter);` has the route `/api/uploadUD`
3. Attach the route to the end of `http://localhost:8080`, enter it into the URL, and hit enter.
4. See the value that is inserted into res.send() appear on the screen.

## Folder and File Architecture

### `*/index.ts` & `default` exports

-   the index.ts file in typescript/javascript acts as an entry point to the module of a given folder
-   default exports are used to declare the primary module export
-   when exporting default, the variable name is removed, and the export name now becomes the name of the repository that it is apart of.
-   for example, if there is a folder named `a` and a file with the path `a/index.ts`, you can declare a default export as follows `export default b`. You would then import this from another repository as `import {a} from '/a'` or `import {a as anyVariableNameYouWant} from '/a'`

### `/src/index.ts`

-   where your apps entry point is.
-   upon running `yarn run dev`, this file will be looked up
-   see the file for line by line comments

### `/src/api/`

-   where your routes are held
-   index.ts exports all of the routes of the app to `/src/index.ts`

### `/src/api/*.route.ts`

-   where the logic of your routes is held
-   requires you to declare a urlPath, router, and get/post handlers.
-   see `/src/api/uploadUD.route.ts` for line by line comments.
