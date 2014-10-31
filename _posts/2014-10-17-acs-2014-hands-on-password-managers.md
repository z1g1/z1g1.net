---
layout: post
title: "ACS 2014 Social Media for Surgeons (#SM4S) Hand Out: Password Manger"
date: 2014-10-18
image: ACS2014.png
tags: ACS 2014, Social Media, Twitter
---

## Summary
Password reuse is a security problem since it allows for passwords compromised in previous breaches to be used to access accounts on other services where the same password is used.  Another flaw with passwords that humans can easily remember is that they usually are made from a small key space.  This can result in passwords which are vulnerable to brute force guessing attacks.  Mitigations for these threats are a unique password high entropy passwords for each site.  However, these types of passwords are not easy for people to use in the real world.  Employing a password manager allows for a unique computer generated high entropy passwords can be used for each site and the user only has to remember one strong password which protects all of their passwords.                                                                                                              

## ACS Learning Objective
* Posts have Consequences

## Solution 
* Utilize a secure password manager. The password manager I use for my personal accounts is [lastpass.com](https://lastpass.com/)

## Pros vs. Cons of Lastpass
<table class="table">
    <tr>
        <th>Pros</th>
        <th>Cons</th>
    </tr>
    <tr>
        <td>
            <ul>
                <li>Generated passwords are high entropy </li>
                <li>Unique Password for each site</li>
                <li>Cross platform (Windows, Mac, iOS, Android, Blackberry, Windows Phone)</li>
                <li>Built in password generator </li>
                <li>Passwords are stored at rest with AES 256-bit encryption</li>
                <li>All passwords synced to all devices</li>
                <li>Solid response to potential security issues</li>
                <li>Low cost, but has a cost $12/year</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>Lastpass cannot recover your passwords if you lose your key</li>
                <li>Centralized storage, though you can backup to a local copy</li>
                <li>Using a computer without Lastpass installed can be a hassle </li>
                <li>Some trust into the Lastpass infrastructure, though they are using industry standard practices</li>
            </ul>
        </td>
    </tr>
</table>    

## Conclusion 

Using a password manager like Lastpass can help you use a unique high entropy password for each site.  Though using a password manager does expose you to some risks due to reliance on a centralized infrastructure and the syncing of your encrypted passwords across devices.  

These are mitigated within the Lastpass design and utilizing industry standard encryption.  These risks are outweighed by isolating each account from another with unique passwords.  Even if my Twitter password is captured, the compromise is contained there.  

More handouts, slides and information about Social Media for Surgeons (#SM4S) which was presented at the ACS 2014 conference in San Francisco, CA Par information and links at the [session homepage](http://z1g1.net/projects/acs2014.html)

## Additional links & Resources

* Evaluation of Lastpass by security expert Steve Gibson of GRC on SecurityNow!  [Episode transcript](https://www.grc.com/sn/sn-256.htm), [Episode Audio](http://twit.tv/show/security-now/256)
* [Write up of Lastpass by Lifehacker](http://lifehacker.com/is-lastpass-secure-what-happens-if-it-gets-hacked-1555511389)
* Lastpass is very aggressive with reporting any potenial issues.  Their responses to previous events give insight into their security posture. [CyberVor](blog.lastpass.com/2014/08/the-cybervor-data-breach-what-you-need.html), [security researcher reports potential attack](http://blog.lastpass.com/2014/07/a-note-from-lastpass.html), [Response to NSA mass data collection](http://blog.lastpass.com/2013/09/lastpass-and-nsa-controversy.html)
