function facebook(){
	this.headline = 'Facebook Newsstream';
	this.content = getmsg("karte_muss_eingestellt_werden");
	this.showsettings = true;
	this.permission = '';
	this.origin = 'https://www.facebook.com/*';
	this.init = function(){
		if (typeof(localStorage['facebooknumbershow']) == 'undefined'){
			localStorage['facebooknumbershow'] = 10;
			localStorage['facebookrss'] = '';
		}
		notifcounter = 0;
		if (localStorage['facebookrss'] != ''){
			$("#facebook .content").html('');
			for (var i = 0; i <= localStorage['facebooknumbershow']; i++){
				$("#facebook .content").css('min-height',$("#facebook .content").height()+33);
			}
			$.get(localStorage['facebookrss'], function(XMLmediaArray){
				$(XMLmediaArray).find("item").each(function(){	
					if (notifcounter < localStorage['facebooknumbershow']){
						var $myMedia = $(this);
				 
						var title = $(this).find("title").text();
						var link = $(this).find("link").text();
			 
						$("#facebook .content").append('<li><a href="'+link+'">'+title+'</a></li>');
					}
					notifcounter++;
				});
			}).fail(function() {
				$("#facebook .content").html(getmsg("falscher_link"));
			});
		}	
	}
	this.settings = function(){
		return '<span> '+getmsg("link_zu_benachrichtiung")+' </span><input class="facebookrssinput" type="text" value="'+localStorage['facebookrss']+'"/><a target="_blank" href="https://www.facebook.com/help/212445198787494"> '+getmsg("link_source")+' </a><br/><span> Anzahl Benachrichtigungen</span><input type="text" class="facebooknumbershowinput" value="'+localStorage['facebooknumbershow']+'"/>';
	}
	this.apply = function(){
		localStorage['facebookrss'] = $('.facebookrssinput').val();
		localStorage['facebooknumbershow'] = $('.facebooknumbershowinput').val();	
	}
}