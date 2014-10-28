#myTab
=====

#####"You have to feel it"  - a users opinion about myTab. This extension provides you with a great productivity increment and a lot of useful information in your new tab. Download: https://goo.gl/VRsFZ2

###The first open source Newtab-Page for Google Chrome! 

<ul>
	<li>Add your own lanugage! </li>
	<li>Add a card which is helpful for everyone </li>
	<li>Upload an awesome (free licensed) image </li>
	<li>Help with finding all the bugs</li>
</ul>

####What you are allowed to do, and what not: 
<p> You can download myTab and make it better. Please load it up in this repository again, because your update should help every user. Thank you very much. </p>

###Comming Cards:
<ul>
	<li>Google Search Box with Mic -> maby voice assistant api?</li>
	<li>Google+ Feed</li>
	<li>Google Calendar </li>
	<li>YouTube</li>
	<li>Digg</li>
	<li>Custom RSS Feed -> where does myTab get the permission to access all sites?</li>
	<li>Google Keep Notes</li>
	<li>Spotify Card</li>
</ul>

###How to Create a new Card: (You don't need to be a pro)
Open the file: js/cards.js 
A new Card Object need these attributes: 
<ul> 
<li> headline: string</li>
<li> content: string (-> Content of card)</li>
<li> showsettings: (true:if the card has settings, 'plus' if it need a plus to add sth. and false if nothing of the two. </li>
<li> permission: string (if the card needs extra permission -> declare it in manifest!)</li>
<li> origin: string (if the card needs extra origin -> declare it in manifest!)</li>
<li> init: function: this function happens everytime the page get loads and the card is init.</li>
<li> optional if the card has settings or plus: you need the both functions settings (this will happen if the user click on the gear or plus, and the function apply will run if the user apply.</li>
</ul>
Here is an example. It's the "apps" card
<code>
function apps(){
	this.headline = 'Apps';
	this.content = '';
	this.showsettings = false;
	this.permission = 'management';
	this.origin = '';
	this.init = function(){
		chrome.management.getAll(function(data){
			for (i=1;i<=data.length-1;i++){
				if (data[i].type == 'hosted_app'){
					$('#apps .content').append("<li><a href='"+data[i].appLaunchUrl+"'><img width='16' src='"+data[i].icons[0].url+"'/>"+data[i].name+"</a></li>");
				}
			}
		});
	}
}
</code>
