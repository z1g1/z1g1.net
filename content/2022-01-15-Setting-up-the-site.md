title:  Setting up a site with Pelican
category: Pelican 

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
1. At this point you will have the skelton of a site, which as you add content will be written to HTML files in the ```output``` directory when you run the ```pelican``` command. These files can be uploaded to your object store of choice to act as your website. This site is hosted in Amazon S3. 

## Uploading the site

These files could be manauly uploaded to S3, or sent via the S3 CLI. However, this adds friction to the writting process. When the files are sent to Github via the ```git push``` command they should be automatically be sent to Amazon S3. This will be setup using [GitHub Actions](https://docs.github.com/en/actions) for continuous Deployment/ Continuous Intergration (CI/CD). When working with any type of system like this ensure you review the [security](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions) and [pricing](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration). I got a good start using GitHub Actions based on a great post by [johnkevinlosito@](https://johnkevinlosito.com/posts/deploy-static-website-to-s3-using-github-actions). 

1. In the Amazon S3 console locate the ARN of the bucket where you will store the files. It will look something like ```arn:aws:s3:::www.z1g1.net```
1. In the [AWS IAM Console](https://console.aws.amazon.com/iamv2/home#/policies) Create a new IAM policy which only has the PutObject permission to the specific bucket ARN you captured above. Sample policy below.
	11. ![Screenshot of json file with bucket policy]({static}/images/github-actions-z1g1-net-write-only-policy.png)
	11. Note that the ```Resource``` entry on line 8 ends with a ```*```. This is key because if you don't inclue this your user will not be able to actually overwrite any existing objects
1. To allow Github Action to make authenticated calls to Amazon S3 an AWS IAM user with limited permissions will be created. 
	11. In the [AWS IAM console](https://console.aws.amazon.com/iam/home#/users) create a new user, select the "Access Key - Programatic Access" option.
	11. Attach the policy that you created above to this user.
	11. Once you complete this wizard you will be prompted to download credetnaisl for the user. The Access Key ID (AKID) is not sensitive alone. However, the "Secret Access Key" **needs to be kept secret**. Capture this secret for future steps but do not put it in a source code file, or any file which might get uploaded to GitHub. Once you leave this page you will not be able to retreive this information again. 
	11. A future hardening step for this infrastrcuture would be to move away from [IAM users to IAM roles](https://github.com/aws-actions/configure-aws-credentials).
1. Following the GitHub [Creating encrypted secrets for a repository](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) documentation store the access key's secret in the Github Repository for your static site. 
1. In the root of the static site project create a folder called ```.github``` which will store the .yml file which defines our GitHub Action ```mkdir -p .github/workflows```. Within this folder create a file called ```main.yml```
	11. ![Screenshot of main.yml file]({static}/images/github-actions-main-yml.png) 
	11. Lines 3-6 are the trigger for this GitHub Action. Reads as "When there's a push to the master branch"
	11. Lines 8-9 starts the deployment job. If there were other actions defined in this file they would be at the same level of indention as line 9
	11. Line 10 declares what OS will run our deployment action. This files uses the latest Ubuntu image but there are [other options](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idruns-on)
	11. Line 11 starts the steps which will be run on the OS image selected above. [GitHub action's purpose](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) is to reduce repettive deployment actions.
	11. Lines 12 - 13 says to use the second version of the [checkout action](https://github.com/actions/checkout). This action checks-out your repository under $GITHUB_WORKSPACE, so your workflow can access it. If you want to learn what an ```action/*``` does you can look it up under the ```https://github.com/ACTION_NAME``` path. 
	11. Lines 15-20 setup the use of the AWS CLI for use by our worker. These are setup via [configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials)
	11. Line 18 includes the AKID to be used for the upload process. An AKID alone should not be considered a secret. However, this does introduces an Avaliblity issue as this workflow is now tied directly to this AKID. If it's ever disabled/loses permissions the job will fail.
	11. Line 19 makes use of the [GitHub Actions Secrets API]() to get the value of the ```Z1G1_NEW_WRITE_ONLY``` secret created above. You never want to include the Secret Key for an AWS IAM user within a GitHub repo, or any source code
	11. Lines 22-23 declare that we will run the [S3 Sync command](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/sync.html) to upload the ```output``` directory to the s3 bucket used to host the site
1. When you run a ```git push``` to this repository your output folder will be written to the specified S3 bucket.


### Debugging Deployment 
1. You need to ensure that your IAM User has permssions to:
	11. Both the ```PutObject`` and ```ListObject``` permissions. Both of these are required to run the [S3 Sync command](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/sync.html) 
	11. Has access to both the bucket ```"arn:aws:s3:::www.z1g1.net"```, and the objects inside it ```"arn:aws:s3:::www.z1g1.net/*",```
1. You might not be able to run ```git push``` after createing the workflow
	11. Ensure that your GitHub user / [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) has permissions to create Workflows.
1. You might get an error saying "actions/checkout@v2 and aws-actions/configure-aws-credentials@v1 are not allowed to be used in ..."
	11. Items listed is Steps of a Github Actions (lines 13, and 16) are code that your runner is executing. It's convenient to use code that other wrote so you don't have to rewrite it. However, this does introduce some level of risk as you're running code others wrote on a system you own. GitHub Actions has 4 levels of permissions to control what can run. These are defined in the repo settings and range (from most to least restrctive): no actions at all, actions owned by the current org/user, actions written by GitHub or orgs they have [verified](https://github.com/marketplace?type=actions&verification=verified_creator), any action.
	11. ![Screenshot of github actions permissions]({static}/images/github-actions-permissions.png)
	11. My repo is set to use GitHub and their verified plugins. I am trusting GitHub to write files to my S3 bucket so if they wanted to modify them they could, so this is an acceptable level of risk for me. 

### Sample IAM policy for Github Actions
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::www.z1g1.net/*",
                "arn:aws:s3:::www.z1g1.net"
            ]
        }
    ]
}
```

### Sample main.yml for GitHub Actions 
```
name: Upload Website via GitHub Actions

on:
  push:
    branches:
    - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Configure AWS Credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: AKIAR2JKVZGO665RVFMT
        aws-secret-access-key: ${{ secrets.Z1G1_NET_WRITE_ONLY }}
        aws-region: us-east-1

    - name: Deploy static site to S3 bucket
      run: aws s3 sync ./output/ s3://www.z1g1.net --delete
```
## Serving the site
