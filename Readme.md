## Job Board

Uses MongoDB for collections, Express for a server, and AngularJS as the client side framework.

###Structure

The express routes reside in `app/routes.js`, and the models in `app/models`

The entire client application is in `public`

Bower is used for asset management, and its components reside in `public/bower`

The actual JS code is in `public/js`, and the HTML views are in `public/views`

### Execution:
- `git clone` this repo
- run `npm install` and `bower install`
- Launch with `node app.js`
- Visit `localhost:4000`
