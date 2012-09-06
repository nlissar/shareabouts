From 0 to Shareabouts in about an hour
======================================

Shareabouts requires python2.6 or greater.

If you are converting from Shareabouts 1.0, note that
we have switched platforms. See [the upgrade docs](UPGRADE.md).

What's here
------------

This package contains the Shareabouts web map application,
which consists of JavaScript, some configuration files that you use to
tailor the app to your needs, and a small glue layer that talks to the
underlying Shareabouts API server.

The Shareabouts API is *not* part of this package. You'll need to
install that separately, or its authors (OpenPlans) would be happy to
host your API for you - details to come.

For more about the parts of Shareabouts,
see [the architecture documentation](ARCHITECTURE.md).

Local Setup
------------

Install `pip` and `virtualenv`, if not already installed.  These will keep your
python code isolated from the rest of your machine and ensure you have
the correct versions.

    easy_install pip
    pip install virtualenv

You may need to use `sudo` to install these tools.

    sudo easy_install pip
    sudo pip install virtualenv

Create a new virtual environment inside of the repository folder, and install
the project requirements:

    virtualenv env
    source env/bin/activate
    pip install -r requirements.txt

NOTE: If you run into trouble with gevent, you can safely comment it out of
the requirements.txt file.  It is not needed for local development.  To comment
it out, just add a hash "#" to the beginning of the line for `gevent`.

To run the development server:

    src/manage.py runserver

The server will, by default, be started at http://localhost:8000/.
But note that it won't be very useful till you complete configuration
below.

NOTE: If you're new to programming with virtualenv, be sure to remember
to activate your virtual environment every time you start a new terminal session:

    source env/bin/activate


Running the Shareabouts API Service
------------------------------------

For local development, you will also want to install and run the
back-end API service.  To do so, you will want a separate clone
of the shareabouts repository, with the sa-service branch checked out.
(This is as of 2012-09-05; will likely move to a separate repository
in the future.)

For example, in another terminal session, do this:

  git clone https://github.com/openplans/shareabouts/ sa-service
  cd sa-service
  git checkout sa-service

Then read its own install documentation, in doc/README.md.


Configuration
--------------

Next you need to configure the SA web app.
See [the config docs](CONFIG.md).


Static assets
-------------

Static assets for the web map interface should be placed in the
`src/sa_web/static/sa/` folder.  Included libraries and dependencies can be
placed in `src/sa_web/static/libs/`.  These files will be available on the
server at:

    http://localhost:8000/static/sa/...
    http://localhost:8000/static/libs/...


Deployment
-------------

See [the deployment docs](DEPLOY.md).


Testing
--------

To run the tests, see [the testing docs](TESTING.md).
