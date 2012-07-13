CFMwebapp
=========

A HTML5/jquerymobile web app frontend for campfiremanager, a php based unconference scheduling system. 

So far, it achieves these things quite well:

 - Pulls JSON data from CFM
 - Forces user to enter a CFM location if one isn't stored in (HTML5(!))localStorage
 - Renders the timetable

These things are going to be added in due course:

 - Some mechanism for checking if the timetable is out of date - maybe an md5 of the JSON from CFM backend, I haven't decided yet. If you have an idea please share :)
 - Login/out
 - Purge localStorage of data

These things are known issues:

 - If attendee numbers for talks aren't set it writes "undefined" instead of 0
 - Opening + closing events show up in all rooms, instead of one particular room (This is really a backend thing, but oh well!)
 - The room name isn't displayed
 - The system doesn't do anything useful...

People throw the term HTML5 around a lot. I am making specific use of features in the HTML5 spec - localStorage is the main one at this stage, but Offline data will also be used to improve loading times of the system (for people on flaky connections) and reduce the load on the server (for people with flaky servers). What's more, messaging & workers will be used to poll the server in the background.

The plan looks something like this:

 1 Get the webapp working fully (IE offline support & all that fancy stuff)
 2 Use PhoneGap (http://phonegap.com) to port the webapp to native apps
 3 Win!

You need to have JQueryMobile in the folder Media/JQM/ or things will be sad :( The system is built on JQM 1.10, so use that unless you're confident or have a lot of Javascript-fu

Also, there is one CSS file which isn't in the JQM archive, you can get it from 
http://jquerymobile.com/demos/1.1.0/docs/_assets/css/jqm-docs.css
and save it to Media/JQM/docs/_assets/css/jqm-docs.css
