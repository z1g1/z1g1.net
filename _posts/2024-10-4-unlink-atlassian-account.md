---
layout: posts
title: How to Stop Using Microsoft Account to Login to Atlassian
category: Daily learning
header:
  image: /assets/images/learning-head-book-education-svgrepo-com.svg
  alt: Daily Learning 
---

If you are logging into Atlassian with your Microsoft/Google account and want to set a password you need to [unlink it](https://support.atlassian.com/atlassian-account/docs/manage-linked-third-party-accounts/). To do so you need to change your email address.

However, if you are the organization admin you have to follow [specific instructions](https://community.atlassian.com/t5/Confluence-questions/How-do-I-change-the-email-address-of-organization-administrator/qaq-p/1638975#:~:text=To%20change%20your%20email%20address,the%20Administration%20%3E%20User%20management%20section.) to change your email. You need to make sure that you use ```Directory > Managed Accounts``` not ```Administration > User management```.

1. Once you are in the ``Managed accounts``` screen you can change your email which will unlink your account
2. Trigger a password reset and set a password via the link sent to your email
3. Set the new password
4. On the ```Managed accounts``` screen you can change the email back 
