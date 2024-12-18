
## Jekyll Site Setup 
1. Setup Ruby and [install Jekyll with Bundle](https://jekyllrb.com/tutorials/using-jekyll-with-bundler/)
    1. Create a local Gem install ``bundle config set --local path 'vendor/bundle' ``
    1. setup to use Bundle for local Gem development ``bundle init``
    1. Configure Bundle install path ``bundle config set --local path 'vendor/bundle'``
    1. Use Bundle to add Jekyll to Gemfile ``bundle add jekyll``
    1. Install things from the Gemfile ``bundle install``
    1. Use Force to create a Jekyll site in a directory with Gemfile already inside it ``bundle exec jekyll new --force --skip-bundle .``
1. Create self-signed TLS certs to test locally with TLS
    1. Make an ssl directory ``mkdir ssl``
    1. Change to that directory ``cd ssl``
    1. Generate a private key ``openssl genrsa -out localhost.key 2048``
    1. Generate a self-signed certificate valid for 365 days ``openssl req -new -x509 -key localhost.key -out localhost.crt -days 365``
    1. Add ``ssl/*``, ``*.key``, and ``*.cert`` to ``.Gitignore`` file
    1. Generate the self-signed cert. You can generate fake info except for Common Name (CN) which must be localhost. ``openssl req -new -x509 -key localhost.key -out localhost.crt -days 365``
1. You should now be able to serve the site locally over TLS from the root of the repository. You will have to accept the risk for the self-signed certs``bundle exec jekyll serve --host localhost --ssl-key ssl/localhost.key --ssl-cert ssl/localhost.crt``
1. Setup the site to use the [minimal-mistakes](https://github.com/mmistakes/minimal-mistakes) Jekyll theme
    1. Must be installed as a [remote theme](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/#remote-theme-method) to work with Github Pages
    1. Update ``Gemfile`` per documentations
    1. In ``_config.yml``
        1. Add ``jekyll-include-cache`` to the ``plugins`` array
        1. Remove any other ``theme: `` or ``remote_theme: `` entry
        1. Add ``remote_theme: "mmistakes/minimal-mistakes@4.26.2"``
    1. Instal remote theme via ``bundle``
1. You should now be able to serve the site and will have the default Mmistake theme ``bundle exec jekyll serve --host localhost --ssl-key ssl/localhost.key --ssl-cert ssl/localhost.crt``

## Writing Content 
1. 