---
layout: posts
title:  Setting up a site with Pelican
category: Pelican
header:
  image: /assets/images/site-with-pelican.png
  alt: Diagram of a laptop connecting to server over ssh
---

The site here is built using [Pelican](https://docs.getpelican.com/) which is a static website generator. It allowed you to write webpages in markdown, then build them along with a config file and theme to HTML files. These files are then stored in an S3 bucket without having to run any webserver. To be able to serve the site via https the site has a certificate created via Amazon Certificate manager and hosted out of CloudFront. To top things off the site is routed over the Cloudflare CDN. I got a good start on this process from a post on Aaron Asaro's blog about [Serving a static site from S3 using Cloudflare Full SSL](https://blog.anotherstarburst.com/posts/s3-static-site-cloudflare-ssl/). I had to make some tweaks to get SSL full up and working. 

You need a command line system to run the commands below. I will be using my [Ubuntu system]({filename}2022-01-01-setup-dev-system.md)

## Creating the site
1. To install [Pelican](https://docs.getpelican.com/en/latest/quickstart.html) you will need to have Python and Pip installed.
	11. On Ubuntu Python 3 is installed by default but you will not be able to use the command ```python``` to run it you would need to use ```python3```. To save yourself this you can create an alais in your .zshrc file.
	11. ```sudo apt install python pip```
1. Pelican and all Pyton projects should be installed in a [virtual enviroment (venv)](https://docs.python.org/3/library/venv.html). On Ubuntu, you need to install the python3-ven package via apt
	11. ```sudo apt install python3.8-venv```
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
1. Now you will install Pelican along with the Markdown moduel within the venv with ```python -m pip install pelican markdown``` 
1. Use the ```pelican-quickstart``` commands and walk thru the wizard to fill in some information about your site.
	11. Enter a value from the "TZ database name" from [this list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
	11. I am planning to upload my site to S3 so I will answer yes to that question, and no to the other upload qusetions
1. There is now the basics of a site which you can see by using the ```pelican --listen``` command. This will show a version of the site that you can access locally at ```http://127.0.0.1:8000```.
	11. If you are building the site on a remote host you will need to setup an ssh tunnel to access this site running on local host. I am building on windows so in a **Poweshell** terminal I will run ```ssh -L 8080:127.0.0.1:8000 User@Remote_Host -i User_Key_at_Remote_host```. This command breaks down as take any trafic on port 8080 for 127.0.0.1 (aka localhost) and send it to port 8000 on the remote machine.
	11. To get my webbrowser to use this tunnel I am using [FoxyProxy](https://chrome.google.com/webstore/detail/foxyproxy-standard/gcknhkkoolaabfmlnjonogaaifnjlfnp) to send all Chrome traffic thru this tunnel. In Proxy Details I set the "Host or IP Address" to localhost and the port to ```8080```, and checked the ```SOCKS proxy``` box.
1. While developing your site you might want to run pelican with the auto reload feature. Anytime you make a change to the site's files the site will be regenerated ```pelican --listen -r --ignore-cache```. If you are working on a custom theme you can append ````-t path/to/theme``` on the command 
1. I will be using the default Pelican theme for now, but you can create [custom themes](https://docs.getpelican.com/en/latest/themes.html) using this sytem.
1. The ```pelicanconf.py``` files contains some values which were set during the ```pelican-quickstart``` process. However, I make some additional changes to further configrue the site
	11. Remove all the entries from the ```LINKS``` blog roll. This will hide this item from the footer
	11. Update the ```SOCIAL``` item with links to social providles
	11. Add a line of ```DISPLAY_CATEGORIES_ON_MENU = False``` this will prevent the site from adding all categories to the menu bar
	11. Add a line of ```DISPLAY_PAGES_ON_MENU = True``` to add all items created under ```content/pages/``` to the menu bar
	11. Add a line of ```INDEX_SAVE_AS = 'blog_index.html'``` this moves the default list of items from ```content/``` from the front page of the site to a differnt location at ```blog_index.html```.
	11. Use a tupple within ```MENUITEMS = (('Posts', 'blog_index.html'),)``` to add the blog index to the menu bar. You can add additional arbitraty menu items with additional tupples in the ```MENUITEMS``` setting option
	 11. To ensure that the articles have a url structure that maps to post/yyyy/mm/d/title include two of the lines. ``` 43 ARTICLE_URL = 'posts/{date.year}/{date.month}/{date.day}/{slug}.html'``` and ```ARTICLE_SAVE_AS = 'posts/{date.year}/{date.month}/{date.day}/{slug}.html'``` 
1. To create a page to act as the front page create a file in ```content/pages/index.md```. To ensure it shows as the front page set the following metadata at the top of the page. ```URL: ```, ```save_as: index.html```, ```status: hidden```


At this point you will have the skelton of a site, which as you add content will be written to HTML files in the ```output``` directory when you run the ```pelican``` command. These files can be uploaded to your object store of choice to act as your website. This site is hosted in Amazon S3. The [next post in the series]({filename}2022-01-22-Hosting-site-via-s3-and-github-actions.md) covers setting up [GitHub Actions](https://docs.github.com/en/actions) for continuous Deployment/ Continuous Intergration (CI/CD).  
