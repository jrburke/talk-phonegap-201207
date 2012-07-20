A talk and an experiment in a "one www" codebase for phonegap/web deployment
that uses RequireJS.

File structure:

* slides: the slides for the RequireJS+PhoneGap talk
* code: a way to do www development

## Code

The `code` directory structure:

* **android**: The phonegap project for android, created via Phonegap's command line 'create' command for android.
* **ios**: The phonegap project for iOS, created via Phonegap's command line 'create' command for iOS.
* **tools**: tools for managing the code, currently the requirejs optimizer and build profile.
* **www**: The web code that works for iOS, android, or the web.

## Env switching

By using the RequireJS loader plugin capability, there is a www/js/lib/env.js
file that is a loader plugin that loads the appropriate cordova.js based
on the environment.

A set of volo commands are used so that local development can be done by
hot reloading the index.html in the cordova web view. Example:

    volo ios http://10.0.1.200:1337/index.html

will build and deploy the ios app, but wired so that the URL passed is used
for the WebView in the app.

There is a www/js/lib/cordovaReload.js that will reload the web view
in Phonegap for dev when the developer taps and holds the tap for a bit over
a second.

For final deployment, the goal is to do a `volo deploy` that does a build of
the code with almond and tells the env plugin to only include the env for
the target deployment command, and then map the 'cordovaReload' module to
an empty stub that does not have the "tap to reload" functionality.

That part is not done yet, due to the next section...

## NOT DONE YET

This does not work yet because cordova.js wants to be in the page before the
page finishes loading. So there is a hack in index.html to load cordova.js
instead of having www/js/app/main.js do a `require('env!phonegap')`.

The hope is to use this project as a test bed to work out the kinks so that
a later cordova.js version will be loadable in this matter.