title: Setting up DNS, TLS, and a CDN for a Pelican Static Website
status: published 
category: Pelican
image: ![diagram of s3 bucket to laptop over tls via cloudfront and cloudflare]({static}/images/dns-and-cloudflare.png)

![diagram of s3 bucket to laptop over tls via cloudfront and cloudflare]({static}/images/dns-and-cloudflare.png)

The first post in this series covered [creating a site with Pelican]({filename}2022-01-15-Setting-up-the-site.md) the second covered [S3 hosting and Github Actions]({filename}2022-01-22-Hosting-site-via-s3-and-github-actions.md). The series will conclude with configuration of DNS, TLS, and a CDN. You will need a domain name, AWS Account, and Cloudflare account to complete this step. 

## Create a TLS certificate

1. To enable your distribution to serve over TLS you will [request a public certificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) from Amazon Certificate Manager (ACM)
	11. For the "Fully qualified domain name" enter the domain name that you will eventually want the Pelican generated site to be accessed by 
	11. Select "Use DNS validation"
	11. Click Create
1. At this point the certificate will be created but not valid, you need to prove ownership via DNS. Click on the Certificate ID. In the "Domains" section note the "CNAME name" and "CNAME value". 
1. In CloudFlare console for your domain [create a CNAME](https://support.cloudflare.com/hc/en-us/articles/360019093151-Managing-DNS-records-in-Cloudflare#h_60566325041543261564371) using the values AWS provided above
	11. The AWS "CNAME name" corresponds to "Name" in CloudFlare console
	11. The AWS "CNAM value" corresponds to "Content" in CloudFlare console
	11. Disable the CloudFlare Proxy Toggle 
1. Wait until the certificate's status is "Issued" in the AWS console.

## Create a CloudFront Distribution 

1. Following [AWS' guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-creating-console.html) configure a Cloudfront Web Distribution
	11. Select your bucket created as the "Origin domain"
	11. For "S3 Bucket Access" select "Yes use OAI", select create a new one, and have AWS update the bucket policy. An Origin Access Identity is another type of identity within AWS which will allow your bucket to be locked down to just access via CloudFront vs being made public.
	11. In the "Alternate domain name" section enter the domain you wish to use 
	11. In the "Custom SSL certificate" dropdown select the ACM certificate you created above
	11. In the "Default root object" enter ```index.html```. [docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html)
	11. Leave other options at their default and click Create. You will need to wait to move on until the distribution is deployed until you can test 
1. Once the Distribution is no longer showing as "Deploying" you should be able to see your site being served over TLS via the "Distribution domain name"/index.html

## Configuring DNS

With a static site in the S3 bucket configured for static website hosting, and the CloudFront distribution configured via the "Distribution domain name". Setting up DNS allows visitors to access this via your purchased domain name.

1. Within your [CloudFlare dashboard](https://dash.cloudflare.com), under the "Website" menu click on the "Add Site" button. Enter your domain name and click "Add site". Select the free plan and contiune.
1. You will be provided with a review of the DNS records currently setup for the domain. If this is a fesh purchase you will likely see DNS records created by your registrar. Click Contiune.
1. You will be prompted to update the domain's existing nameservers and point them to CloudFlare. This will allow CloudFlare to provide answers when browsers ask for information about your domain. These instructions will be unique for your domain registrar of choice. 
1. Once you have updated your Name Servers click the "Done, check nameservers" button. If this fails after updating at your registrar give it some time and retry. 
1. Within the CloudFlare "Quick Start Guide" accept the defaults and click "Finish". Wait until CloudFlare confirms that your domain is congirued
1. Within CloudFlare create a CNAME record with a value of ```@```, and the "Target" as your CloudFront Distribution Domain Name. Ensure you delete the ```https://``` or you will get an error 
1. Within CloudFlare select the "SSL/TLS" menu and set the encryption mode to "Full".

Your site should now load at the domain name that you requested
