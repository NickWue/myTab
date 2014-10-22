function news(){
	this.headline = getmsg("topnews");
	this.content = '';
	this.showsettings = false;
	this.permission = '';
	this.origin = 'https://news.google.com/*';
	this.init = function(){
		for (var i = 0; i <= 10; i++){
			$("#news .content").css('min-height',$("#news .content").height()+40);
		}
		$.get("https://news.google.com/news/feeds?output=rss&hl="+navigator.language, function(XMLmediaArray){
			$(XMLmediaArray).find("item").each(function(){ 
				$("#news .content").append('<li><a href="'+$(this).find("link").text()+'">'+$(this).find("title").text()+'</a></li>');
			});
		});
	}
}