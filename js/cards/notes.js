
function notes(){
	this.headline = getmsg("notes");
	this.content = getmsg("notes_content");
	this.showsettings = 'plus';
	this.permission = '';
	this.origin = '';
	this.init = function(){
		if (typeof(localStorage['allnotes']) == 'undefined') localStorage['allnotes'] = '';
		$('#notes').height(70);
		allnotes = localStorage['allnotes'].split(",");
		if (allnotes.length > 1){
			anzahlapplynotes = 0;
			$('#notes .content').html('');
			for (z=0;z<=allnotes.length;z++){
				if (typeof(allnotes[z]) != 'undefined' && allnotes[z] != ''){
					$('#notes .content').append('<p class="class'+z+'" id="notes'+z+'"><span class="realcontent">'+allnotes[z]+'</span><span class="deleat" title="notiz löschen">x</span></p>');
					anzahlapplynotes++;
					if (anzahlapplynotes > 4 && anzahlapplynotes < 7){
						$('#notes').height($('#notes').height()+29);
					}
				}
			}
			if (anzahlapplynotes == 0) $('#notes .content').html(this.content);
		}
		else{
			$('#notes .content').html(getmsg("notes_content"));
		}
		$('#notes .content .deleat').click( function() {
			console.log($(this).parent().attr('id'));
			thiscard['notes'].deleat($(this).parent().attr('id'));
			thiscard['notes'].init();
		});	
	}
	this.settings = function(){
		return '<input type="text" class="newnoteinput" placeholder="'+getmsg("new_note")+'"/><p>'+getmsg("new_note_explain")+'</p>';
		$('.avgrund-popin .buttons a').first().click(function(){
			thiscard['notes'].apply();
			thiscard['notes'].init();
		});
		
	}
	this.apply = function(){
		localStorage['allnotes'] = $('.newnoteinput').val()+','+localStorage['allnotes'];
	}
	this.deleat = function(classname){
		localStorage['allnotes'] = localStorage['allnotes'].replace($('#'+classname+' .realcontent').html()+',',"");
	}
}
