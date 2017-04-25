// Login to system
heroku login

// Push your changes to Heroku server
git push heroku master

// Create an instance of your server (basically the equvalent of turning it on):
heroku ps:scale web=1

// Open browser with your page
heroku open

// Open bash, to see your files on server
heroku run bash

// Set server environment
heroku config:set DB=...