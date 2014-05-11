## Job Board

Uses MongoDB for collections, Express for a server, and AngularJS as the client side framework.

###Structure

The express routes reside in `app/routes.js`, and the models in `app/models`

To run the server, simply execute `node app.js`, in the root directory. It will load the routes and configuration.

The entire client application is in `public`

Bower is used for asset management, and its components reside in `public/bower`

The actual JS code is in `public/js`, and the HTML views are in `public/views`

The JS code is split into an invoker, routes, services, controllers and utils (directives). The app uses HTML5 routing to link to controllers which use services to communicate with the server. The views are then used to display that data to the user. All of the controllers have a straightforward CRUD model, which can also be reflected in the services.

### Execution:
- `git clone` this repo
- run `npm install` and `bower install`
- Launch with `node app.js`
- Visit `localhost:4000`
