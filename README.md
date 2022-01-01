# z1g1.net README

## Jekyll
1. If you need to run Jekyll on a new computer you need to [install](http://jekyllrb.com/docs/installation/ubuntu/) it

## Website 
1. Website is created via [Jekyll](http://jekyllrb.com/)
1. You can write an ```.html```` page and host it in the root
1. You can write a blog post into the ```_posts``` folder with the filename ```YEAR-MONTH-DAY-title.md```
    1. Posts start with
    ```---
        layout: post
        title:  "TITLE"
        tags: list of tags
        ---
        body text in md
        ```
1. Use the command ```jekyll build``` in the terminal to build the site then upload the contents of the ```_site``` folder

## Hosting / DNS / TLS
1. All Assets are hosted in AWS Account ```125180430749```
1. Website is hosted in the S3 bucket ```arn:aws:s3:::www.z1g1.net```
1. There's a redirect bucket ```arn:aws:s3:::z1g1.net```  which is empty on purpose
1. A Certificate is created via ACM to serve the site via TLS ```arn:aws:acm:us-east-1:125180430749:certificate/d083acc5-6536-4385-9c6e-736da2e4643d```
1. Cloudfront is used to serve the site via TLS. There's a distribution ```arn:aws:cloudfront::125180430749:distribution/E2ZR8P1U16LKD1``` 
   1. Uses [Origin Access Identity](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html) ```E2DSX98BD873QM``` to restrict access to the site to just CloudFront.
    1. When setting up that system you will see a behavior where there z1g1.net will get an AccessDenied Issue, but a specific object will work. Get around this by specifying a [default root object](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html) you can get around that 
    1. Use the certificate from ACM with this distribution
    1. Since it's using OAI, you want the Origin type to be the S3 bucket itself **not** the S3 static website endpoint
1. Once the Cloudfront distribution is working then the site is behind Cloudflare to try and help with any crazy bills. When following the [ Configuring an Amazon Web Services static site to use Cloudflare ](https://support.cloudflare.com/hc/en-us/articles/360037983412-Configuring-an-Amazon-Web-Services-static-site-to-use-Cloudflare) 
    1. **do not** use the bucket policy provided by Cloudflare, keep the policy put in place by Origin Acess Identity
    1. **do** use the Cloudfront Distribution domain name as the value for the CNAME DNS entries 
1. Once the DNS Entries are setup for CloudFlare on the SSL/TLS > Overview page set the Protection mode to Full. This will force all visitors to the site over TLS

