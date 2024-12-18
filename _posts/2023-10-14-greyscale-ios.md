---
layout: posts
title: Set your iPhone into Greyscale mode on a schedule
category: Productivity
header:
  image: /assets/images/greyscale-ios-01.png
  alt: iPhone in landscape mode with the words iPhone on the screen
---
Your iPhone can be a blackhole of attention. One way to reduce the amount of screentime you spend on it is to make the screen less appealing to look at. You can accomplish this by enabling the Grayscale color filter. This is a [feature](https://support.apple.com/guide/iphone/change-color-and-brightness-iph3e2e1fb0/ios) built into iOS to make items easier to see on screen. You can pair this with iOS's [Shortcuts Automation](https://support.apple.com/guide/shortcuts/enable-or-disable-a-personal-automation-apd602971e63/ios) to flip your screen into black and white during your productivity periods.

The Grayscale Color Filter can be flipped on any time by going to ```Settings``` > ```Accessibility``` > ```Display & Text Size``` > ```Color Filters```> ```Grayscale```. This will make the screen permenatily in greyscale. There are sometimes when you want this to be enabled and sometimes when you do not, so you can toggle this feature on an off via a triple click of the power button using the [Accessibility Shortcut](https://support.apple.com/en-us/HT204390) feature of iOS. Go to ```Settings``` > ```Accessibility``` > ```Accessibility Shortcut``` (1) > ```Color Filters``` (2). This will enable the last Color Filter that you made use of

![Enable the accessibility shortcut](/assets/images/greyscale-ios-02.png)

This is good for one off toggling of this feature, but by pairing it with Shortcuts Automation you can have your phone enable this mode without you having to remember. If you have not installed the [Shortcuts app](https://apps.apple.com/us/app/shortcuts/id915249334) you will need to install it from the iOS App Store to follow these instructions. There are 4 Automations that I have setup: Turn on Grayscale at 9:45 AM on Weekdays, Turn Grayscale off at 5 PM on Weekdays, Turn on Grayscale when Bedtime mode is enabled, Turn off Grayscale when Bedtime is disabled. This pattern gives me Grayscale mode when I need to be focusing on other things, or when I should put my phone down around bedtime.

To create the time based Automations, open up the Shortcuts app and select ```Automation``` at the bottom of the screen (this will be between ```Shortcuts``` and ```Gallery```), then click the plus sign at the top right.

1. Click on the "Create Personal Automation" button
1. Choose the "Time of Day" option
1. Enter the time of day you want Grayscale to be enabled/disabled
1. Set the Repeat to "Weekly", and uncheck the circles for Saturday and Sunday.
1. Click the "Add Action" button
1. Search for "Set color filter"
1. Set the value to "On" for your Automation to enable Grayscale, and "Off" for your Automation to turn it off at the end of the day
1. On the Review screen ensure you turn off the "Ask Before Running" option to have things run unprompted.
1. Tap "Don't Ask"
1. Your screen should look like this. Then click "Done"

![Step 1 of the process](/assets/images/greyscale-ios-03.png)
![Step 2 of the process](/assets/images/greyscale-ios-04.png)
![Step 3 of the process](/assets/images/greyscale-ios-05.png)

To create the event based Automations follow the same steps as above, but on step 2 select the "Sleep" option vs "Time of Day".

1. Click on the "Create Personal Automation" button
1. Choose the "Sleep" option
1. Select "Wind down begins" for the Automation when Grayscale should be enabled, and "Waking Up" when Grayscale should be disabled.
1. Click the "Add Action" button
1. Search for "Set color filter"
1. Set the value to "On" for your Automation to enable Grayscale, and "Off" for your Automation to turn it off at the end of the day
1. On the Review screen ensure you turn off the "Ask Before Running" option to have things run unprompted.
1. Tap "Don't Ask"
1. Your screen should look like this. Then click "Done"


![Step 4 of the process](/assets/images/greyscale-ios-06.png)
![Step 5 of the process](/assets/images/greyscale-ios-07.png)
![Step 6 of the process](/assets/images/greyscale-ios-08.png)

With these four Automations in play your iPhone will enable and disable Grayscale on a schedule