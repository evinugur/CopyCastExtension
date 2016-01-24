#CopyCast
##Get Any Online Media on the Web Onto Your Chromecast
### Hack WPI 2016 - a project by Evin Ugur

CopyCast leverages APIs that the Chrome Runtime Engine exposes to sniff outgoing HTTP requests. While you're online, CopyCast will record HTTP requests to media, and allow you through a Browser Action dialog to send them to your Chromecast.

Content behind proprietary players (Adobe Flash, JWPlayer, etc) are all now castable! 

#It Does FLV Video!
There are a few extensions similar to CopyCast already on the market, but none of them are able to cast FLV because the Chromecast can not run it. CopyCast is able to play *_most_* FLV videos on popular sites to get content onto your TV ASAP.

##How Does it Cast FLV?!?!

Originally, I was toying with a client side ASM.js build of `ffmpeg` to convert FLV videos on the fly (client side via a web worker) into mp4. This is technically feasible, however it was slow and defeated the entire point of CopyCast.

***So instead***, CopyCast has an easy option to temporarilly spoof Chrome's User Agent on all outgoing HTTP requests to look like they were coming from an iPhone. For most sites that serve two primary things: television and advertisements, pretending to be a mobile user to grab the mp4 you want to cast works just fine :)

Most TV/Movie based streaming sites that serve FLV ***also*** serve mp4 if you ask them nice enough. This weird duality most likely can be attributed to the fact that mobile operating systems like iOS are much more locked down so even if a user is given an mp4 there's little the user could do short of watching it and moving along -- _not anymore!_

##What Tech Did I Use (for HackWPI) 
* Chrome APIs 
	* 	`chrome.webRequest`
	*	`chrome.webNavigation`
	* 	`chrome.tabs`
* Chromecast Library: `chrome.cast`
* Bootstrap
* jQuery

##Future Plans
This was a really fun project! In the near future I intend to further polish the UI and clean up and test more things that I didn't have the luxury to bother with during the context of a Hackathon. This includes:

* Local Storage API - leveraging `chrome.storage` to persist data between sessions and even instances of your google account across Chrome Browsers would be really nice.
	* This would also pave the way to features such as playlists, exporting, sharing, etc. 
* Ideally, I'd ditch the whole approach with the user agent spoofing. At the time, the easiest way I see to do this is to abadnon 


###Configuration
You need to add a file `appid.js` with the following
`var APP_ID = 'your id'`;

You can obtain an app ID via the ChromeCast Developer Console.
