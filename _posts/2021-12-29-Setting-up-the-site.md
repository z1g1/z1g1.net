---
layout: post
title:  "Setting up the site"
tags: tech Jekyll
---

The site here is built using [Jekyll](http://jekyllrb.com/) which is a static website generator used by Github pages and other sites. It allowed for the site to hosted and stored out of an S3 bucket without having to run any webserver. To be able to serve the site via https the site has a certificate created via Amazon Certificate manager and hosted out of CloudFront. To top things off the site is routed over the Cloudflare CDN.