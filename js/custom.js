var collectionData;
var current='index';

function jsonFlickrApi (data) {
	switch (current){
		case 'index':
			collectionData = data;
			$.each(data.collections.collection, function( index, value ) {
				desc = value.title.replace(" | ", "<br />");
				desc = desc.replace("｜", "<br />");
				$('#index').append('<a href="##"><figure class="collection" id="'+index+'" desc="'+desc+'"><img src="'+value.iconlarge+'" /><figcaption><br />'+desc+'</figcaption></figure></a>');
			});
		break;
		case 'index2':
			desc = data.photoset.title._content.replace(" | ", "<br />");
			desc = desc.replace("｜", "<br />");
			img='https://farm'+data.photoset.farm+'.staticflickr.com/'+data.photoset.server+'/'+data.photoset.primary+'_'+data.photoset.secret+'_q.jpg';
			$('#'+data.photoset.id).append('<img src="'+img+'" /><figcaption><br />'+desc+'</figcaption>');
			$('#'+data.photoset.id).attr("desc", desc);
			$('#'+data.photoset.id).attr("more", data.photoset.description._content);
		break;
		case 'gallery':
			if (data.sizes != undefined){
				x=data.sizes.size.length-2;
				$('a[href="'+data.sizes.size[5].source+'"]').attr('href',data.sizes.size[x].source);
			}else if (data.photoset != undefined){
				$.each(data.photoset.photo, function( index, value ) {
					img='https://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg';
					$('#gallery').append('<a href="'+img+'" data-lity><img src="'+img+'" /></a>');
					$.getJSON("https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&api_key=2ab97d85a6a2a8030b4cc4f58fc22e4e&photo_id="+value.id+"&callback=?");
				});
				if (data.photoset.page<data.photoset.pages){
					$.getJSON("https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&format=json&api_key=2ab97d85a6a2a8030b4cc4f58fc22e4e&photoset_id="+data.photoset.id+"&page="+(data.photoset.page+1)+"&callback=?");
				}
			}
		break;
	}
}

function listAlbums (a){
	$.each(a, function( index, value ) {
		$('#index2').append('<a href="###"><figure class="album" id="'+value.id+'"></figure></a>');
		$.getJSON("https://www.flickr.com/services/rest/?method=flickr.photosets.getInfo&format=json&api_key=2ab97d85a6a2a8030b4cc4f58fc22e4e&photoset_id="+value.id+"&callback=?");
	});
}

$(function() {
	$.getJSON("https://www.flickr.com/services/rest/?method=flickr.collections.getTree&format=json&api_key=2ab97d85a6a2a8030b4cc4f58fc22e4e&user_id=52032216@N00&callback=?");
	$(window).bind( 'hashchange', function(e) { 
		switch (document.location.hash){
			case '###':
			current = 'gallery';
			$('#index').css('display','none');
			$('#index2').css('display','none');
			$('#gallery').css('display','block');
			$('#gallery-title').css('display','block');
			$('.backlink').css('display','block');
			break;
			case '##':
			current = 'index2';
			$('#index').css('display','none');
			$('#index2').css('display','block');
			$('#gallery').css('display','none');
			$('#gallery-title').css('display','none');
			$('.backlink').css('display','block');
			break;
			default:
			current = 'index';
			$('#index').css('display','block');
			$('#index2').css('display','none');
			$('#gallery').css('display','none');
			$('#gallery-title').css('display','none');
		}
     });
	$(document).on('click','.collection', function(){
		if ($('#index2').attr('region')!=this.id){
			$('#index2').attr('region',this.id);
			regionData = collectionData.collections.collection[this.id];
			$('#index2').html('<h2 class="title">'+$(this).attr('desc')+'</h2>');
			if (regionData.collection!=undefined){
				$.each(regionData.collection, function( index, value ) {
					$('#index2').append('<h3>'+value.title+'</h3>');
					listAlbums(value.set);
					$('#index2').append('<hr />');
				});
			}else{
				listAlbums(regionData.set);
			}
		}
	});
	$(document).on('click','.album', function(){
		if ($('#gallery').attr('album')!=this.id){
			$('#gallery-title').html('<h2 class="title">'+$(this).attr('desc')+'</h2>');
			$('#gallery-title').append('<h3 class="desc">'+$(this).attr('more')+'</h3>');
			$('#gallery').html('');
			$.getJSON("https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&format=json&api_key=2ab97d85a6a2a8030b4cc4f58fc22e4e&photoset_id="+this.id+"&callback=?");
		}
	});
});