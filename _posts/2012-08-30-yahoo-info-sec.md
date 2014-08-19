---
layout: post
title:  Yahoo's Information Security Tips Leave Something Desired
date: 2012-08-30 15:00:00
categories: Blog
tags: Info Sec
author: Zack Glick
summary:  Review of Yahoo Info Sec Article
slug: blog/yahoo-info-sec
image: Yahoo-not-for-Info-Sec.JPG
---

I read <a href="http://twitter.com/bworley">Becky Worley's</a> piece this afternoon <a href="http://news.yahoo.com/blogs/upgrade-your-life/being-monitored-114944170.html">Are You Being Monitored At Work?</a> wanted to flesh out some of the ideas put forth in the piece. 

The article begins by notifying the audience, "there are two main ways employers track computer usage — with monitoring software on your desktop, and by watching the traffic on the corporate network." Host and network monitoring can both be used and an effective network security policy will utilize both since each one provides the IT or Security Department with specific information and benefits.  

Host based monitoring can be used to capture keystrokes, screenshots and activity streams on a user's machine.  Since the agent installed on the employees computer is running inside the machine it can capture this information.  These products are placed on behalf of the employer and the mitigation and investigations that Becky recommends might not be possible for a user without administrative permissions to perform.  Her recommendations of: look in the system tray/start up folder, task bar for installed agents or search for firewall rules will be unlikely to bear fruit due to the way a system is configured.  A monitoring agent is designed to be surreptitious installed upon a system and if installed by an admin the processes will not be exposed to a user without these rights.  Also access to the Windows Firewall will be denied or greatly reduced for a user acting without admin rights on their own machine.  When a user sits at their employers computer they are not the owner and if the employee has an adversarial relationship with the employer about their activities, weather they want to play poker at work or exfiltrate sensitive data, they cannot consider this a machine that they can trust.  Cory Doctorow's talk <a href="http://boingboing.net/2012/08/23/civilwar.html">"The Coming War on General Purpose Computing"</a> goes into this concept in great detail.  Host based monitoring can be very detailed and if an employer <b>has a written policy</b> indicating that users will be monitored they have every right to control their systems.  

In the United States ensuring that the HR department has a written policy on monitoring technology is critical to protect the company from violating privacy and wiretapping statues. In a <a href="http://www.sans.org/reading_room/whitepapers/legal/big-brother-office-friend-foe_42">SANS.org whitepaper</a> the goals of a policy are described, "Your policies should state in clear terms what you will monitor, what is considered inappropriate usage and what corrective actions will be taken. Do not take the approach of ‘…we’re going to get you… so  keep your noses clean…”. Your policies will be better received if they are presented in a manner that explains how the employee  can benefit and how the company (and therefore the source of their livelihood) can benefit."  The "Are You Being Monitored At Work?" article is written for employees who feel they are being monitored, but if they are having these feelings it is unlikely that they have been told about why monitoring is being performed and feel someone is in fact out to get them.  For an organization to be secure it must have buy in for its security policy.

I agree with Becky about what to do if an end user is able to find the software (emphasis is mine).  "If you do find any monitoring software on your work computer, do NOT try to remove it. Two reasons: first, doing so may make it look like you have something to hide, raising suspicions; second, your employer has a right to have this software installed on the computer. After all <i>it's their machine.</i>" Attempting to remove this software could be grounds for disciplinary action on its own so repeating this cannot be overstated.

Based on the design of the employer's network, monitoring at this level can be more effective and would not require that any software be placed on an end user's machine.  The company is acting as an ISP and trust in the ISP must be assumed and <a href="https://www.eff.org/cases/jewel/">we know what trusting as ISP looks like</a>.  The suggestions at the end of this section could result in the employee getting into trouble based on a false sense of security.  

Since so many employers have the power to monitor their employees, it's safest to assume that you are being watched. But what if you really need to do something privately?

<div style="padding-left: 15px;">EMAIL: If you are hunting for a new job or your employer is strict about use of corporate accounts for personal email, use web-based email. Most of the major providers encrypt webmail so it can't be intercepted on the network.

SMARTPHONE: As long as you are connected over your cellular data connection (and not the company Wi-Fi), you can surf the web and send private email (on your non-corporate account) without detection.

ANONYMIZERS:  There are services (usually for a fee — for example, anonymizer.com for $70) that will create a VPN or secure tunnel that hides all your traffic from the corporate network. These are handy tools to have if you need secure access to the Internet in unsecured locations like Wi-Fi cafes or public computers; they create a cloak around all IP addresses and data sent on the network. But an anonymizer may not hide your activity from a desktop monitoring program that grabs screen-shots, and many corporate IT departments forbid them and seek them out for removal from corporate machines.</div>

If you are attempting to avoid monitoring by a corporation only this second point will truly protect a user, since they are not using technology that they employer has any right to monitor.  Utilizing webmail, even over an encrypted (SSL/TLS) connections, might not keep a company from intercepting messages due to misplaced trust in the certificate authority model.  Moxie Marlinspike's <a href="http://www.youtube.com/watch?v=Z7Wl2FW2TcA">Blackhat 2011 talk</a> on the subject describes how anyone with a trusted certificate in a browser's certificate storage will be trusted implicitly and can transparently <a href="http://en.wikipedia.org/wiki/Man-in-the-middle_attack">Man in the Middle</a> any traffic they desire.  An employer deploying monitoring technology can issue itself a certificate for a webmail provider allowing them to view all traffic if they want.  Utilizing webmail over a network you do not control on a machine you do not own/control opens yourself to this flaw and could bring consequences onto an employee looking to keep a secret.

Utilizing common web based Anonomizer could also run into issues based on the same attack.  If the VPN attempts to use SSL to encrypt traffic this same man in the middle vulnerability could be exploited to allow the monitoring agent access to the traffic in the clear.  Also a host based monitoring system would mitigate any attempt to use a VPN since the traffic is unencrypted on the end user's system and this agent would be able to log all of this traffic.

I enjoy Becky's work but I wanted to expand on some of her concepts.  In the current legal status if an employer wants to monitor your activities on their systems they do have that right.  However, whether they should be monitoring is a different case of worms.  In exposing a large audience to this possibility I hope that Becy could introduce people to concepts about what is being done to them.  In the end if you want to screw around at work, do it on a phone/tablet that you bought that does not connects to the corporate network.