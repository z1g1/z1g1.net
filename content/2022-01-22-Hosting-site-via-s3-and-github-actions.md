title: Hosting a Static Pelican Site in S3 with GitHub Actions
status: published
category: Pelican
image: ![Diagram of laptop to GitHub to S3 bucket via GitHub actions]({static}/images/github-actions-to-s3-bucket.png)

![Diagram of laptop to GitHub to S3 bucket via GitHub actions]({static}/images/github-actions-to-s3-bucket.png)
With the [static site already created]({filename}2022-01-15-Setting-up-the-site.md) you could manually copy these files to S3 via the AWS console, or via the S3 CLI. However, this adds friction to the writing process. When the files are sent to GitHub via the ```git push``` command they can be automatically be sent to Amazon S3 using [GitHub Actions](https://docs.github.com/en/actions) for continuous Deployment/ Continuous Integrations (CI/CD). 

When working with any type of system like this ensure you review the [security](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions) and [pricing](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration). I got a good start using GitHub Actions based on a great post by [johnkevinlosito@](https://johnkevinlosito.com/posts/deploy-static-website-to-s3-using-github-actions).

## Setting up AWS Assets

If you do not already have an S3 Bucket [configured for static website hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html) complete these steps first. Please note that S3 is a [paid service](https://aws.amazon.com/s3/pricing/). There is a free tier but by using AWS assets you can incur charges. 

1. In the Amazon S3 console locate the ARN of the bucket where you will store the files. It will look something like ```arn:aws:s3:::www.z1g1.net```
1. In the [AWS IAM Console](https://console.aws.amazon.com/iamv2/home#/policies) Create a new IAM policy which only has the PutObject permission to the specific bucket ARN you captured above. Sample policy below.
	11. ![Screenshot of json file with bucket policy]({static}/images/github-actions-z1g1-net-write-only-policy.png)
	11. Note that the ```Resource``` entry on line 8 ends with a ```*```. This is key because if you don't inclue this your user will not be able to actually overwrite any existing objects
1. To allow Github Action to make authenticated calls to Amazon S3 an AWS IAM user with limited permissions will be created. 
	11. In the [AWS IAM console](https://console.aws.amazon.com/iam/home#/users) create a new user, select the "Access Key - Programatic Access" option.
	11. Attach the policy that you created above to this user.
	11. Once you complete this wizard you will be prompted to download credetnaisl for the user. The Access Key ID (AKID) is not sensitive alone. However, the "Secret Access Key" **needs to be kept secret**. Capture this secret for future steps but do not put it in a source code file, or any file which might get uploaded to GitHub. Once you leave this page you will not be able to retreive this information again. 


At this point you will have a bucket which can serve static HTML content. A future hardening step for this infrastrcuture would be to move away from [IAM users to IAM roles](https://github.com/aws-actions/configure-aws-credentials).

## Configuring GitHub

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
	11. Lines 22-23 declare that we will run the [S3 Sync command](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/sync.html) to upload the ```output``` directory to the s3 bucket used to host the site. The ```--delete``` at the end of the command will remove files that exist in the destination but not in the source are deleted during sync
1. When you run a ```git push``` to this repository your output folder will be written to the specified S3 bucket.


## Debugging Deployment 

There are a lot of moving parts to the setup which is created here. Capturing some debugging info if you run into errors. 

1. You need to ensure that your IAM User has permssions to:
	11. The ```PutObject``` and ```ListObject``` permissions. Both of these are required to run the [S3 Sync command](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/sync.html). In addtion as you want to be able to remove posts from the site, the GitHub action used in this example includes the ```--delete``` option. To acomplish this your IAM user needs to have the ```s3:DeleteObject``` permission as well.
	11. Has access to both the bucket ```"arn:aws:s3:::www.z1g1.net"```, and the objects inside it ```"arn:aws:s3:::www.z1g1.net/*",```
1. You might not be able to run ```git push``` after createing the workflow
	11. Ensure that your GitHub user / [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) has permissions to create Workflows.
1. You might get an error saying "actions/checkout@v2 and aws-actions/configure-aws-credentials@v1 are not allowed to be used in ..."
	11. Items listed is Steps of a Github Actions (lines 13, and 16) are code that your runner is executing. It's convenient to use code that other wrote so you don't have to rewrite it. However, this does introduce some level of risk as you're running code others wrote on a system you own. GitHub Actions has 4 levels of permissions to control what can run. These are defined in the repo settings and range (from most to least restrctive): no actions at all, actions owned by the current org/user, actions written by GitHub or orgs they have [verified](https://github.com/marketplace?type=actions&verification=verified_creator), any action.
	11. ![Screenshot of github actions permissions]({static}/images/github-actions-permissions.png)
	11. My repo is set to use GitHub and their verified plugins. I am trusting GitHub to write files to my S3 bucket so if they wanted to modify them they could, so this is an acceptable level of risk for me. 

## Example files 

### Sample IAM policy for GitHub Actions
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:ListBucket",
                "s3:DeleteObject"
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
