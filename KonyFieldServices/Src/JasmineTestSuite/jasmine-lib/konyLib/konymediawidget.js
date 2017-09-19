/* 
 * Widget : Audio / Video
 */
 
$KW.Video = $KW.Audio = $KW.Media =
{
	initializeView: function(formId)
	{
		if(!$KU.isAndroid)
			return;
		var videos = document.querySelectorAll("#" + formId + " video");
		for(var i=0; i<videos.length; i++) 
		{
			var video = videos[i];
			kony.events.addEventListener(video, 'click', function(event){
				event = event || window.event;
				if(event.srcElement.getAttribute("kdisabled") == "true"){
				    kony.events.stopPropagation(event);
				    kony.events.preventDefault(event);
				    return;
				} else
				event.srcElement.play();
			},false);
			kony.events.addEventListener(video, 'playing', function(event){
			    event = event || window.event;
			    event.srcElement.playing = true;
			},false);
		}
	},

    updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue){
        var element = $KU.getNodeByModel(widgetModel);
		if(!element)
			return;
			
		switch (propertyName) {
            case "source":
				element.parentNode.innerHTML = this.render(widgetModel, {formID :widgetModel.pf});
            break;
        }
    },
   
    render: function(mediaModel, context){
    
        var computedSkin = $KW.skins.getWidgetSkinList(mediaModel, context);
        var html = $KW.Utils.getBaseHtml(mediaModel, context)
		var tabpane = context.tabpaneID ? (" ktabpaneid=" + context.tabpaneID) : "";
        var autoplay = mediaModel.autoplay ? " autoplay='autoplay'" : "";
        var poster = mediaModel.poster ? (" poster=" + $KU.getImageURL(mediaModel.poster)) : "";
        var style=" style='"+$KW.skins.getMarginSkin(mediaModel, context) +";"+ $KW.skins.getPaddingSkin(mediaModel)+"'";
		var loop = mediaModel.loop ? " loop='loop'" : "";
		// Set always to true for desktop
		var controls = (mediaModel.controls || mediaModel.controls == undefined) ? " controls='controls'" : "";
		var heightwidth = mediaModel.heightwidth; // "286,300"
		if(heightwidth) // mandate on droid
		{
			heightwidth = heightwidth.split(",");
			heightwidth = (heightwidth[1] != "0" ? (" width=" + heightwidth[1] + "px ") : "") + (heightwidth[0] != "0" ? ("height=" + heightwidth[0] + "px ") : "");
		}

		var htmlString = "";
		
		if(mediaModel.wType == "Video")
			htmlString = "<video" + html + controls + heightwidth + autoplay + poster + loop + tabpane; 
		else
			htmlString = "<audio" + html + " controls='controls'" + autoplay + loop + tabpane; 
		
        htmlString+=style;
		var src = this.getSrc(mediaModel);
        htmlString += " class = '" + computedSkin + src[1] + "'>";
		
		if(mediaModel.wType == "Video")
			htmlString += src[0] + (mediaModel.text || "") + "</video>";
		else
			htmlString += src[0] + (mediaModel.text || "") + "</audio>";
		
        return htmlString;
    },
	
	/*
	 * source : {mp4:"http://www.w3schools.com/html5/movie.mp4",webm:"http://www.w3schools.com/html5/movie.webm",ogv:"http://www.w3schools.com/html5/movie.ogv"} //src in appmodel
	 * 			or
	 * kony.model.update($KG.form1["video10408421061786"], "source", [ null, [ null, "mp4", "http://broken-links.com/tests/media/BigBuck.m4v" ], [ null, "webm", "http://broken-links.com/tests/media/BigBuck.webm" ]]) // lua
	 */
	 
	/*
	 * source : {ogg:"http://www.w3schools.com/html5/song.ogg",  
				 mp3:"http://www.w3schools.com/html5/song.mp3",
				}
	 * 			or
	 * kony.model.update($KG.form1["audio10408421061786"], "source", [ null, 
		[ null, "ogg", "http://playground.html5rocks.com/samples/html5_misc/rushus-modal_blues.ogg" ], 
		[ null, "mp3", "http://playground.html5rocks.com/samples/html5_misc/rushus-modal_blues.mp3" ]]) // lua
	 */
	getSrc: function(mediaModel){
		
		var notype = false;
		var platform = $KU.getPlatform();
		if(platform.name == "android" && platform.version <= 2.2)
			notype = true;
		
		var wType = mediaModel.wType.toLowerCase();
        var srcString = skin = "";
        var total = count = 0;
        var source = mediaModel.source;
        if ($KU.isArray(source)) { 
            for (var i = 1; i < source.length; i++) {
                total++;
                if (source[i][2]) {
                    var type = wType + "/" + source[i][1];
                    srcString += "<source src='" + source[i][2] + "'" + (source[i][1]=="mp4" && notype ? "" : " type='" + type + "'") + "/>";
                }
                else 
                    count++;
            }
            
        }
        else {
            for (var key in source) {
                total++;
                if (source[key]) {
                    var type = wType + "/" + key;
                    srcString += "<source src='" + source[key] + "'" + (key=="mp4" && notype ? "" : " type='" + type + "'") + "/>";
                }
                else 
                    count++;
            }
        }
			
        if(total == count && mediaModel.isvisible) 
            skin = " hide";
		return [srcString, skin];
	},
		
	eventHandler: function(eventObject, target){
		
       
    }
}