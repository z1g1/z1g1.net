---
layout: post
title: "Export Armies from Warroom"
date: 2014-08-31
image: privateer-logo.png
tags: warmachine, Privateer Press
---

[Privateer Press](http://privateerpress.com/) created the application Warroom to allow people who play the game to create Army Lists on their mobile devices.  One of the features that this application lacks is a way share your lists except via email.  I wanted to create a way where I could easily share my army lists.  I decided to on the service [IFTTT](https://ifttt.com) (If This Then That).  This is a free service which allows you to, as it's name implies, take action on one service when triggered by another.  IFTTT's service allows you to create "recipes" which contain these actions. 

I created two recipes:
<ul>
<li>[Save WarRoom Armies to Dropbox](https://ifttt.com/recipes/199663-save-warroom-armies-to-dropbox)</li>
<li>[Save WarRoom Armies to Google Drive Spreadsheet](https://ifttt.com/recipes/199664-save-warroom-armies-to-google-drive-spreadsheet)</li>
</ul>

Both of these recipes are triggered off of a new email matching a search for "War Room Army" in the subject line of an email.  Then append the body of the email to a text file which can then be modified and shared in a normal way.  This is a bit of a work around since WarRoom does not allow any sort of bulk exporting or and mass export.  Hopefully in the future [Privateer Press](http://privateerpress.com/) and their partner [Tinkerhouse Games](http://tinkerhousegames.com/) will update the software with these features.  

	Example of the text output
	May 07, 2014 at 03:22PM, War Room Army - 50 Drake Pirates,
	War Room Army

	Mercenaries - Highborn Covenant - 50 Drake Pirates

	56 / 56 (50+6)    Warcaster(s) : 1/1    Warjack(s) : 1    Battle Engines : 0    Solos : 8    Units : 3

	Drake MacBain - WJ: +6
	-    Galleon - PC: 18

	Anastasia di Bray - PC: 2
	Bosun Grogspar - PC: 2
	Dirty Meg - PC: 2
	Doc Killingsworth - PC: 2
	First Mate Hawk - PC: 2
	Lord Rockbottom - PC: 2
	Master Gunner Dougal MacNaile - PC: 2
	Rhupert Carvolo, Piper of Ord - PC: 2

	Alexia Ciannor & the Risen - Alexia & 9 Risen Grunts: 5
	Sea Dog Crew - Leader & 9 Grunts: 8
	-    Mr. Walls, the Quartermaster - Mr. Walls 2
	-    1 Rifleman's: 1
	Press Gangers - Lass & 9 Grunts: 6 
	May 15, 2014 at 09:47AM, War Room Army - 50 Zal,
	War Room Army

	Skorne - 50 Zal

	55 / 55 (50+5)    Warlock(s) : 1/1    Warbeast(s) : 3    Battle Engines : 0    Solos : 6    Units : 4

	Supreme Aptimus Zaal - WB: +5
	-    Kovaas
	-    Aptimus Marketh
	-    Basilisk Krea - PC: 4
	-    Cyclops Raider - PC: 5
	-    Cyclops Shaman - PC: 5

	Ancestral Guardian - PC: 3
	Ancestral Guardian - PC: 3
	Extoller Soulward - PC: 2
	Extoller Soulward - PC: 2
	Hakaar the Destroyer - PC: 4

	Nihilators - Leader & 9 Grunts: 8
	Venator Slingers - Leader & 5 Grunts: 4
	Gatorman Bokor & Bog Trog Swamp Shamblers - Bokor & 9 Shamblers: 6
	Cataphract Incindiarii - Leader & 3 Grunts: 6 

