---
layout: post
title:  "Setting up the site"
tags: tech Jekyll
---

The site here is built using [Pelican](https://docs.getpelican.com/) which is a static website generator. It allowed you to write webpages in markdown, then build them along with a config file and theme to HTML files. These files are then stored in an S3 bucket without having to run any webserver. To be able to serve the site via https the site has a certificate created via Amazon Certificate manager and hosted out of CloudFront. To top things off the site is routed over the Cloudflare CDN. I got a good start on this process from a post on Aaron Asaro's blog about [Serving a static site from S3 using Cloudflare Full SSL](https://blog.anotherstarburst.com/posts/s3-static-site-cloudflare-ssl/). I had to make some tweaks to get SSL full up and working. 

1. You need a command line system to run the commands below. I will be using my [Ubuntu system]({{ site.baseurl }}{% link _posts/2022-01-01-setup-dev-system.md %})

## Creating the site
1. To install [Pelican](https://docs.getpelican.com/en/latest/quickstart.html) you will need to have Python and Pip installed.
11. On Ubuntu Python 3 is installed by default but you will not be able to use the command ```python``` to run it you would need to use ```python3```. To save yourself this you can create an alais in your .zshrc file.
11. ```sudo apt install python pip```
1. Pelican and all Pyton projects should be installed in a [virtual enviroment (venv)](https://docs.python.org/3/library/venv.html). On Ubuntu, you need to install the python3-ven package via apt
11. ```sudo apt install python3.8-venv
1. create a directory in your projects directory and change to it. Other commands will be run and files executed from here
11. ```mkdir -p ~/projects/SITE_NAME``` the -p will create the directories in the path
11. ```cd ~/projects/SITE_NAME```
1. Once within the site directory you will need to create an activate the virtual environment. The extra step of running inside a venv will allow your system to support work across multiple python projects without dependency issues.
11. ```python3.8 -m venv venv``` will run the python module venv and create a new environment called venv. You can give it a unique name but it is common to just use the same name. This also allows for command aliasses to be created (below)
11. ```source ./venv/bin/activate``` this will activate the virtual environment and any modules you install here will be limited to this project. 
1. To make this command easier to work with you can create an alias inside of .zshrc, this is optional
11. ```alias pynv="python3.8 -m venv venv" #New virtual environment```
11. ```alias pyav="source ./venv/bin/activate" # activate virtual environment```
11. ```alias pydv="deactivate" # deactivate virtual environment```
1. Now you will install Pelican along with the Markdown moduel within the venv with ```python -m pip install "pelican markdown"``` 
1. Use the ```pelican-quickstart``` commands and walk thru the wizard to fill in some information about your site.
11. Enter a value from the "TZ database name" from [this list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
11. I am planning to upload my site to S3 so I will answer yes to that question, and no to the other upload qusetions
1. 


## Uploading the files 


## Serving the site
