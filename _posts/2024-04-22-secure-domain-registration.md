---
layout: posts
title:  Secure Domain Registration for Startup Companies
category: Zatik
header:
  image: /assets/images/Zatik-text.png
  alt: Zatik Security Logo
---

Original post on [Zatik Blog](https://www.zatik.io/blog/secure-domain-registration)

>> As an entrepreneur with an idea, one of the first things you will buy for your business is a domain name. This name is the root of your company’s identity. If you lose control, the company could see its website defaced, customer funds stolen/diverted, suffer downtime on websites and APIs, or see a further compromise of corporate assets as emails are redirected. 
>> When we started Zatik Security we wanted to register our domain in the most secure way possible. However, we couldn’t find any step-by-step, vendor neutral, free guidance, so we’re sharing our research in line with our Company Values to pay it forward to the next founder.
>> None of the companies evaluated sponsored Zatik’s assessment or influenced our recommendations. These are our preferences, based on our research of publicly available feature documentation and professional experience as of March 2024. Gentlepersons can disagree, and your experience might be different.

> As a startup or small business, a full-fledged enterprise domain registry solution probably isn’t necessary or cost effective for your business yet. From a security standpoint, an ideal registrar would support the following six features: 
a table of security features that a domain registrar should have

> With these requirements in mind, I reviewed five domain Registrars frequently recommended in startup communities. Since our focus is enabling startups and small businesses, any features locked behind an “enterprise” tier have been excluded. The vendors we reviewed, in alphabetical order, were: Cloudflare, GoDaddy, Hover, Namecheap, and Squarespace. 
A table describing the results of Zatik Securit's review of domain registrars

> Cloudflare meets five of the six criteria that Zatik recommends.  

> 1. 2FA: Requires anyone you invite use Two Factor Authentication (2FA). It is great to see a vendor offer this control on a non-enterprise plan with a simple checkbox. 
> 1. Forbid SMS 2FA: Since Cloudflare only supports security key or app based second factors, you can have confidence that staff are not using SMS as second factor. 
> 1. RBAC: Invite multiple users to your account with custom user access controls.
> 1. Audit Trail: The audit trail feature is very detailed and includes login information, but customers need to manually script notifications. 
> 1. Forced Logout: Sessions can be destroyed using the Revoke Session feature. This allows you to log out an account which may be compromised.

> What criteria was not met?  Security Alerts: Cloudflare email notifications do not allow you to set up alerts for other members of your Cloudflare organization. They are only sent to the account’s email itself, so are not a reliable option to monitor for strange logins for other accounts

> The full notes of my review can be found in the “Show Your Work” section at the end of this blog post. 
> But I already have a domain purchased…

> After conducting our review and identifying an ideal registrar, we only had one problem…we had bought zatik.io using Namecheap. Since domain owners are allowed to move their domains between registrars, we started the process of moving our DNS, and domain registration into a hardened Cloudflare account. 

> The first part of moving a domain name is to ensure the destination registrar supports the Top Level Domain (TLD) of the domain you want to move. Since we’re moving to Cloudflare, we confirmed that .io was one of their supported TLDs. Moving a domain has some restrictions which can prevent transferring registrars. The most common is that a domain cannot transfer if its WHOIS registration information has been modified within 60 days. Cloudflare provides a full list of reasons why a domain could be restricted from transfer into their system; you should review these materials before starting a domain name transfer. 

> When you plan to move a domain, you must ensure that any existing DNS entries at the source registrar are copied to the destination registrar. If they don’t match, you'll end up causing an outage for your existing customers/users. I recommend having a second person compare the records at the source and destination registrars after you create them. The DNS records at the destination registrar will not have any impact until you change the nameservers at the source registrar to point to the destination. Once you make this change, DNS records will begin to update. Zatik makes use of several SaaS products for our employees, so I created a checklist before making any changes so I could verify the transfer process was completed.  

> Once the DNS change was completed, I began the process of transferring the registrar of Zatik.io. This process updates the business relationship to your domain and controls the company you will be renewing the domain with. To begin, you must unlock the domain at the source registrar, which will provide you with a verification code. Enter the code in the destination registrar to complete the transaction. When planning a move, you should budget 10 days into your timeline: your source registrar has up to 5 days to provide you the code, and another 5 to send it to your destination registrar. (It doesn’t usually take 10 days, but it can per the ICANN rules, so it’s good to set the time aside just in case.) The task to move to Cloudflare allowed Zatik to take advantage of their additional account security features. Now you can, too! 
