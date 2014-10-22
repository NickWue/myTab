
function recentlyclosed(){
	this.headline = getmsg("recentlyclosed");
	this.content = '';
	this.showsettings = false;
	this.permission = 'history';
	this.origin = '';
	this.init = function(){
		
		chrome.history.search({text:'',maxResults:100}, function(callback){
			for (i=0;i<=callback.length-1;i++){
				if (callback[i].url.indexOf('www') != -1){
					title = callback[i].url.substring(callback[i].url.indexOf('www.')+4,callback[i].url.length);
				}
				else{
					if (callback[i].url.indexOf('://') == -1) title = callback[i].url;
					else title = callback[i].url.substring(callback[i].url.indexOf('://')+3,callback[i].url.length);	
				}	
				if(title.length > 34) title = title.substring(0,30)+'...';
				$('#recentlyclosed .content').append("<li><a href='"+callback[i].url+"'><img src='chrome://favicon/"+callback[i].url+"'/>"+title+"</a></li>");		
			}	
		});
		$('#recentlyclosed').height(382);
		/*$('#recentlyclosed .content').prepend("<li><a id='showhistory' href='#'>Gesamten Verlauf anzeigen</a></li>");
		$('#showhistory').click(function(){
			chrome.tabs.create({url:'chrome://history/'});
		});	*/
	}
}