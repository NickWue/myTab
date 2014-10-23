function bookmarks(){
	this.headline = getmsg("bookmarks");
	this.content = getmsg("no_bookmarks");
	this.showsettings = false;
	this.permission = 'bookmarks';
	this.origin = '';
	this.init = function(){
		$('#bookmarks .content').html('');
		chrome.bookmarks.getTree(function(list){	
	
			
			for (a=0;a<=list[0].children.length-1;a++){
				if (typeof(list[0].children[a].children) != 'undefined'){
					for (b=0;b<=list[0].children[a].children.length;b++){
						if (typeof(list[0].children[a].children[b]) != 'undefined'){
							if (typeof(list[0].children[a].children[b].children) == 'undefined'){
								$('#bookmarks .content').append('<li><a href="'+list[0].children[a].children[b].url+'"><img src="chrome://favicon/'+list[0].children[a].children[b].url+'" width="25"/>&nbsp;'+ list[0].children[a].children[b].title+'&nbsp;</a></li>');
							}
						}	
					}
				}	
			}
		});
	}
}