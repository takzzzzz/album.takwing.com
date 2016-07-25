/*
	Programmer: Lukasz Czerwinski
	CodeCanyon: http://codecanyon.net/user/Lukasz_Czerwinski
	 
	If this script you like, please put a comment on codecanyon.
	
*/

$(document).ready(function (){ 
  //Usage 
  $("#gallery").flickrGallery({
            //FLICKR API KEY
            Key: '2ab97d85a6a2a8030b4cc4f58fc22e4e',
//            //Secret
            Secret: '6ae130f18babdaef',
//            //FLICKR user ID
            User: '52032216@N00',
//            //Flickr PhotoSet ID
            PhotoSet: window.$vars.pID
  });
}); 
