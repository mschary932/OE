$KI.phone = {

	dial: function(phoneno){
		$KW.unLoadWidget();
		var href;
		var platform = $KU.getPlatform();
		if (platform.name == "iphone" && platform.version >= "5" && platform.version < "8")
			href = "tel://" + phoneno;
		else
			href = "tel:" + phoneno;
		
		window.location.href = href;
	},
	myLocation : function()
	{
		console.warn("DEPRECATED API. Instead use geolocation.");
	},
	openmediagallery : function(onselectioncallback, querycontext,widgetref){
     
		if(!window.File || !window.FileReader || !window.FileList){  // proceed only if file apis are supported.
			kony.print("openMediaGallery error:: 2103, Cannot open media gallery. Not supported."); //error code mentioned in documentation
			return;
		}
		
        var input = document.createElement('input');
        input.type = 'file';
        input.setAttribute('style','display:none;');
        input.setAttribute('id','openmediagallery');
        if(querycontext && querycontext.mimetype){ //add mime type
            input.setAttribute('accept',querycontext.mimetype);
		} 
        var form = document.getElementsByTagName('form')[0];
		form.appendChild(input); // created a temp file input in dom
        kony.events.addEventListener(input,'change',handleFiles);
        input.click();
        
        function handleFiles() {
            kony.events.removeEventListener(input,'change',handleFiles);
            form.removeChild(input);  // removed temp file input
            
            if(onselectioncallback && onselectioncallback instanceof Function){
				var reader = new FileReader(); 
				reader.onload = function(evt) { // upon successful file read
					  var chars  = new Uint8Array(evt.target.result);
					  var CHUNK_SIZE = 0x8000, index = 0, result = '', slice;
					  while (index < chars.length) {
							slice = chars.subarray(index, Math.min(index + CHUNK_SIZE, chars.length)); 
							result += String.fromCharCode.apply(null, slice);
							index += CHUNK_SIZE;
					  }
					  onselectioncallback(result); // call callback with final file binary string
				};
				reader.onerror = function(evt) {  // error handler
					if(evt.target.error instanceof FileError){  // Read error code in case of error is of FileError type
						switch(evt.target.error.code){
							case FileError.NOT_FOUND_ERR: kony.print("openMediaGallery error:: The file resource couldn't be found at the time the read was processed."); 
							break;
							case FileError.NOT_READABLE_ERR: kony.print("openMediaGallery error:: 2101, The resource couldn't be read. Insufficient Permissions."); 
							break;
							case FileError.ENCODING_ERR: kony.print("openMediaGallery error:: The resource couldn't be encoded."); 
							break;
							case FileError.SECURITY_ERR: 
							default: kony.print("openMediaGallery error:: The file resource is unsafe/changed/other unspecified security error.");
						}
					}else  // read error name & message in case error is of DomError type
						kony.print("openMediaGallery error:: "+evt.target.error.name+", "+evt.target.error.message);
				};
				reader.readAsArrayBuffer(this.files[0]); // read single file, readAsBinaryString deprecated
            }
			else{
				kony.print("openMediaGallery error:: callback function not provided.");
			}
		}
    }
}