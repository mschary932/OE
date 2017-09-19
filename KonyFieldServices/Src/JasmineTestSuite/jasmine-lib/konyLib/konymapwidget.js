/*
 * Widget : Map
 */
$KW.Map =
{
    formID:null,
    mapID:null,
    map:null,
    navigateToArgs:null,
    navigateToLocationArgs:null,
    mapScriptRequested:false,
    mapScriptLoaded:false,
    currentLatitude:null,
    currentLongitude:null,
    currentZoom:15,
    routeToLocationArgs:null,
    
    initialize: function(){
        /* Commented for change in event model
         var mapEvent = new kony.events.KEvent("click", "Kinfowindow", this.mapInfoWindowEventHandler);
         kony.events.registerEvent(mapEvent); */
        kony.events.addEvent("click", "Kinfowindow", this.mapInfoWindowEventHandler);
        kony.events.addEvent("click",'Kstaticmap', this.mapEventHandler); 
		kony.events.addEvent("onorientationchange", "Map", this.setMapsHeight);
    },
    
    initializeView: function(formId){
		//load scripts if map-canvas element is present, initialize view is always called after render
		if(document.querySelectorAll("div[name=map_canvas]").length > 0){
		    $KW.Map.loadMapScripts();
		}
		//set map height should be called after loading of map scripts - added Sirisha
		$KW.Map.setMapsHeight(formId);
	},
	
    updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue){
        switch (propertyName) {
            case "address":
            case "locationdata":
                if ((widgetModel.mapsrc === "static") || $KU.isBlackBerryNTH || ($KU.isWindowsPhone && $KU.isIE9)) {
                    var mapElem=document.getElementById(widgetModel.pf+"_static_map");
                    if(!mapElem)
                        return;
                    var imgsrc=mapElem.getAttribute("src");
                    if(propertyName=="locationdata")
                    {                            
                        var markers=this.getMarkerDataforStaticMaps(widgetModel);
                        if(imgsrc.indexOf("&markers")!=-1)
                        {
                            mapElem.src  = imgsrc;
                            mapElem.src  = mapElem.src.replace(/center=(.*)$/,"");
                            var center   = "center=" + (!!propertyValue.length && propertyValue[0].lat || 0) + "," + (!!propertyValue.length && propertyValue[0].lon || 0) + "&";
                            mapElem.src += center;
                            mapElem.src += imgsrc.match(/markers=(.*)$/)[0] + markers;
                        }
                        else
                            mapElem.src=imgsrc+"&markers="+markers;
                    }
                    else
                    {
                        if(imgsrc.indexOf("&markers")!=-1)
                        {
                            imgsrc=imgsrc.replace(/markers=(.*)$/,"").replace("&markers=",""); 
                        }
                        mapElem.src=imgsrc.replace(/center=(.*)&/,"center="+propertyValue.location+"&markers=color:red%7C"+propertyValue.location);
                    }
                         
                }else
                {
                    var mapNode = $KU.getNodeByModel(widgetModel);
                    if(!mapNode)
                        return;
                    if($KW.Map.mapScriptLoaded) {
                        var main = $KU.getElementById("__MainContainer"); // Need this wrapper div to support form transition
                        if (!main) {
                            $KW.Map.isMainContaineraVailable = false;
                        }else{
                            this.setUpInteractiveCanvasMap();
                        }
                    }
                    else {
                        $KW.Map.loadMapScripts();
                    }     
                }
                break;
            
            case "zoom" :
            case "zoomlevel" :
            case "mode" :
                if($KU.isBlackBerryNTH || ($KU.isWindowsPhone && $KU.isIE9))
                {
                    var mapElem=document.getElementById(widgetModel.pf+"_static_map");
                    if(!mapElem)
                        return;
                    var imgsrc=mapElem.getAttribute("src");
                    var mapMode="";

                    switch(parseInt(widgetModel.mode, 10))
                    {
                        case 2:
                        mapMode = "satellite";
                        break;

                        case 3:
                        mapMode = "hybrid";
                        break;

                        case 5:
                        mapMode = "polygon";
                        break;

                        case 7:
                        mapMode = "terrain";
                        break;

                        default:
                        mapMode = "normal";
                    }
                    if(propertyName=="mode")
                        mapElem.src=imgsrc.replace(/maptype=(.*)&mobile/,("maptype="+mapMode+"&mobile"));
                    else if(propertyName=="zoom" || propertyName=="zoomlevel" )		 
                        mapElem.src=imgsrc.replace(/zoom(.*)&size/,"zoom="+parseInt(propertyValue)+"&size");
                }
                else
                {
                    var mapCanvasElement = document.querySelectorAll('[name=map_canvas]')[0];
                    mapCanvasElement && this.setUpInteractiveCanvasMap();
                }
                break;
            
            case "defaultpinimage":
	            var mapCanvasElement = document.querySelectorAll('[name=map_canvas]')[0];
	            if ((widgetModel && widgetModel.mapsrc === "static") || $KU.isBlackBerryNTH || ($KU.isWindowsPhone && $KU.isIE9))
	            {
	                var pinimageurl = $KU.getImageURL(propertyValue);
	                pinimageurl     = widgetModel.newPinimage = location.origin + "/" + pinimageurl;
	                this.setUpInteractiveCanvasMap();
	            }
	            else {
	                widgetModel.defaultpinimage = propertyValue;
	                mapCanvasElement && this.setUpInteractiveCanvasMap();
	            }
	            break;
        }
        
    },
	loadMapScripts : function()
	{
        //if google object doesn't exist and mapScript has not been requested
        if("undefined" === typeof google && !$KW.Map.mapScriptRequested)
        {
            $KW.Map.mapScriptRequested = true;
            var mapCanvasElement = document.querySelectorAll('[name=map_canvas]')[0];
            $KW.Map.mapID = mapCanvasElement && mapCanvasElement.id.split("_")[1] || "";
            var mapModel  = kony.model.getWidgetModel($KW.Map.formID, $KW.Map.mapID);
            var clientId  = mapModel && mapModel.mapClientId;
            var script    = document.createElement("script");
            script.type   = "text/javascript";
            //the protocol relative URL, the short-circuit evaluation of clientId
            script.src    = "//maps-api-ssl.google.com/maps/api/js?sensor=false"+ ( !!clientId && ("&client=" + clientId) || "") +"&callback=$KW.Map.setUpInteractiveCanvasMap";
            document.body.appendChild(script);
        }
		else {
			return;
		}
        // Need this wrapper div to support form transition
        var main = $KU.getElementById("__MainContainer");
        if (!main) {
            $KW.Map.isMainContaineraVailable = false;
        }else{
            $KW.Map.isMainContaineraVailable = true;
        }
	},
    mapEventHandler : function(eventObject, target)
    {
        var id=target.id;
        var mapElem=document.getElementById(target.getAttribute("kformname")+"_static_map");
        var imgsrc=mapElem.getAttribute("src");
        var arr = imgsrc.match(/center=(.*)&/);
        var arr2=arr[1].split(",");		
        if(id.indexOf("_left")!=-1)
        {
            arr2[1]=parseFloat(arr2[1])-0.002;
            mapElem.src=imgsrc.replace(/center=(.*)&/,"center="+arr2[0]+","+arr2[1]+"&");
        }else if(id.indexOf("_right")!=-1)
        {
            arr2[1]=parseFloat(arr2[1])+0.002;
            mapElem.src=imgsrc.replace(/center=(.*)&/,"center="+arr2[0]+","+arr2[1]+"&");
        }else if(id.indexOf("_up")!=-1)
        {
            arr2[0]=parseFloat(arr2[0])-0.002;
            mapElem.src=imgsrc.replace(/center=(.*)&/,"center="+arr2[0]+","+arr2[1]+"&");
        }else if(id.indexOf("_down")!=-1)
        {
            arr2[0]=parseFloat(arr2[0])+0.002;
            mapElem.src=imgsrc.replace(/center=(.*)&/,"center="+arr2[0]+","+arr2[1]+"&");
        }else if(id.indexOf("_zoomin")!=-1)
        {
            var zoomarr=imgsrc.match(/zoom=(.*)&size/);
            zoomarr=parseInt(zoomarr[1])+1;		 
            mapElem.src=imgsrc.replace(/zoom(.*)&size/,"zoom="+zoomarr+"&size");
        }else if(id.indexOf("_zoomout")!=-1)
        {
            var zoomarr=imgsrc.match(/zoom=(.*)&size/);
            zoomarr=parseInt(zoomarr[1])-1;		 
            mapElem.src=imgsrc.replace(/zoom(.*)&size/,"zoom="+zoomarr+"&size");
        }

    },
    mapInfoWindowEventHandler: function(eventObject, target){
	
        while(!target.getAttribute("kwidgettype"))
            target = target.parentNode;
        var targetWidgetInfo = target.getAttribute("kinfoid");
        var targetWidgetID = $KU.getElementID(targetWidgetInfo); //$KU.getModelByNode(target); 	
        var mapPointNo = target.getAttribute("mappointno");
        var mapModel = kony.model.getWidgetModel($KW.Map.formID, targetWidgetID);
        var selectEvent = $KU.returnEventReference(mapModel.onselection);
        if(isNaN(parseInt(mapPointNo, 10)))
        {
            selectEvent && selectEvent.call(mapModel,mapModel,mapModel[mapModel.id+"navigatetoloc"]);
        }
        else
            selectEvent && selectEvent.call(mapModel,mapModel,mapModel.locationdata[parseInt(mapPointNo, 10)]);        
    },
    
    render: function(mapModel, context){
		mapModel.needScroller = true;
        this.formID = mapModel.pf;
        this.mapID = mapModel.id;
        var computedSkin = $KW.skins.getWidgetSkinList(mapModel, context);
        var htmlString = "", controls = "";
        var mapsrc = mapModel.mapsrc || mapModel.mapsource;
    
        if ((mapsrc === "static") || $KU.isBlackBerryNTH || ($KU.isWindowsPhone && $KU.isIE9)) {
			var visibility = $KW.skins.getVisibilitySkin(mapModel);
            var mapMode = "";
            switch(parseInt(mapModel.mode, 10))
            {
                case 2:
                mapMode = "satellite";
                break;

                case 3:
                mapMode = "hybrid";
                break;

                case 5:
                mapMode = "polygon";
                break;

                case 7:
                mapMode = "terrain";
                break;

                default:
                mapMode = "normal";
            }
            var mapdata = mapModel.locationdata || mapModel.address;
            var centrallat = 0;
            var centrallon = 0;
            var markers="";
            //var ismap=(mapdata[IndexJL].lat == undefined) ? false :true;
            if(mapdata && mapdata[IndexJL])
            {
                centrallat= (mapdata[IndexJL].lat == undefined) ? mapdata[IndexJL][IndexJL] : mapdata[IndexJL].lat;
                centrallon= (mapdata[IndexJL].lat == undefined) ? mapdata[IndexJL][1+IndexJL] : mapdata[IndexJL].lon;
                markers=this.getMarkerDataforStaticMaps(mapModel);
            }
            
            var upimage = $KU.getImageURL(mapModel.upimg?mapModel.upimg:"tupF.png");
            var downimage = $KU.getImageURL(mapModel.downimg?mapModel.downimg:"tdownF.png");
            var rightimage = $KU.getImageURL(mapModel.rightimg?mapModel.rightimg:"trightF.png");
            var leftimage = $KU.getImageURL(mapModel.leftimg?mapModel.leftimg:"tleftF.png");
            var zoominimage = $KU.getImageURL(mapModel.zoomin?mapModel.zoomin:"zoomin.png");
            var zoomoutimage = $KU.getImageURL(mapModel.zoomout?mapModel.zoomout:"zoomout.png");

            controls = "<table>"
            + "<tr><td><img kwidgettype ='Kstaticmap' kformname='" + mapModel.pf +"' id='"+mapModel.id+"_up_event' src = '"+ upimage+"'/></td>"+
            "<td><img kwidgettype ='Kstaticmap' kformname='" +mapModel.pf +"' id='"+mapModel.id+"_down_event' src = '"+downimage+"'/></td>"+
            "<td><img kwidgettype ='Kstaticmap' kformname='" +mapModel.pf +"' id='"+mapModel.id+"_right_event' src = '"+rightimage+"'/></td>"+
            "<td><img kwidgettype ='Kstaticmap' kformname='" +mapModel.pf +"' id='"+mapModel.id+"_left_event' src = '"+leftimage+"'/></td>"+
            "<td><img kwidgettype ='Kstaticmap' kformname='" +mapModel.pf +"' id='"+mapModel.id+"_zoomin_event' src = '"+zoominimage+"'/></td>"+
            "<td><img kwidgettype ='Kstaticmap' kformname='" +mapModel.pf +"' id='"+mapModel.id+"_zoomout_event' src = '"+zoomoutimage+"'/></td></tr></table>" ;

            if(mapModel.disabled) {
                controls = "<table style='position:relative;'>"
                + "<tr><td>" +
                "<div style='background:#fff;bottom:0;left:0;opacity:0.5;filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);filter:alpha(opacity=50);position:absolute;right:0;top:0;z-index:2147483647' class='google_map_mask'></div>" +
                "<img kwidgettype ='Kstaticmap' kformname='" + mapModel.pf +"' id='"+mapModel.id+"_up_event' src = '"+ upimage+"'/></td>"+
                "<td><img kwidgettype ='Kstaticmap' kformname='" +mapModel.pf +"' id='"+mapModel.id+"_down_event' src = '"+downimage+"'/></td>"+
                "<td><img kwidgettype ='Kstaticmap' kformname='" +mapModel.pf +"' id='"+mapModel.id+"_right_event' src = '"+rightimage+"'/></td>"+
                "<td><img kwidgettype ='Kstaticmap' kformname='" +mapModel.pf +"' id='"+mapModel.id+"_left_event' src = '"+leftimage+"'/></td>"+
                "<td><img kwidgettype ='Kstaticmap' kformname='" +mapModel.pf +"' id='"+mapModel.id+"_zoomin_event' src = '"+zoominimage+"'/></td>"+
                "<td><img kwidgettype ='Kstaticmap' kformname='" +mapModel.pf +"' id='"+mapModel.id+"_zoomout_event' src = '"+zoomoutimage+"'/></td></tr>"
                + "</table>";
		//appending div.google-map-mask to <table> creates problems in chrome
		//therefore, appended to <td> instead
            }

            //DOM Change: Added kwidgettype attribute for static maps
            htmlString="<div id='"+ mapModel.pf + "_" + mapModel.id + "'class='" + visibility+ "' style='"+$KW.skins.getMarginSkin(mapModel, context) + $KW.skins.getPaddingSkin(mapModel) +"' kwidgettype='Map' >" + controls;
            htmlString+="<img id='"+mapModel.pf+"_static_map' alt='Map Widget' style='width:100%;' src='http://maps.google.com/maps/api/staticmap?sensor=false&zoom=15&size=400x400&format=png32&maptype="+ mapMode+"&mobile=true&center="+centrallat+","+centrallon+
            "&markers="+markers+"'/></div>";
            
        }else if(mapsrc=="native") {
            mapModel.widgetdata = "http://maps.google.com/maps?q=17.447326,78.371358";
            htmlString = "<a style='text-decoration:none;' href='" + mapModel.widgetdata + "'>Google Map Name</a>"
        }else {
            var isPolygonview = "";
            if (mapModel.mapview === "5" || mapModel.mode == "5" ) {
                isPolygonview = " mapview='polygon' ";
            }


            htmlString = "<div tpwidgettype='googlemap' kformname= '" + mapModel.pf + "' id='" + mapModel.pf + '_' + mapModel.id + "' name='map_canvas'" + isPolygonview + " style='height:500px;" + $KW.skins.getMarginSkin(mapModel, context) + $KW.skins.getPaddingSkin(mapModel) +"' class='" + computedSkin +
            "' konywidgetdata='" + mapModel.widgetdata +"'></div>";           
        }
        return htmlString;
    },
    
    getMarkerDataforStaticMaps: function(mapModel){
        var mapdata = mapModel.locationdata || mapModel.address;
        var markers = "";
        for(var i=IndexJL;i<mapdata.length;i++)
        {
            var lat = (mapdata[IndexJL].lat == undefined) ? mapdata[i][IndexJL] : mapdata[i].lat;
            var lon = (mapdata[IndexJL].lat == undefined) ? mapdata[i][1+IndexJL] : mapdata[i].lon;
            (typeof mapModel.newPinimage != undefined) && (markers += "icon:" + mapModel.newPinimage + "%7C");
            /*test: (typeof mapModel.newPinimage != undefined) && (markers += "icon:" + "http://simpleicon.com/wp-content/uploads/map-marker-16-64x64.png" + "%7C");*/
            markers+= lat + "," + lon;
            if(i != mapdata.length)
                markers += "&markers=";                    
        }
        return markers;
    },
    setUpInteractiveCanvasMap: function(){
        if("undefined" === typeof google)
        {
            // $KG["mapScriptLoaded"] = "false";
            $KG["mapScriptLoaded"]  = false;
            $KW.Map.mapScriptLoaded = false;
            return;
        }
		var mapModel = kony.model.getWidgetModel($KW.Map.formID, $KW.Map.mapID);
		if(!mapModel)
			return;
        $KG["mapScriptLoaded"]  = true;
        $KW.Map.mapScriptLoaded = true;
		mapModel.markers = []; //clear the markers array before loading
        //condition check for mapModel updated
        if (mapModel && mapModel.mapsrc === "static" && ($KU.isBlackBerryNTH || ($KU.isWindowsPhone && $KU.isIE9))) {
            var mapElem = document.getElementById(mapModel.pf+"_static_map");
            var imgsrc  = mapElem.getAttribute("src");
            var markers = this.getMarkerDataforStaticMaps(mapModel);
            imgsrc      = imgsrc.replace(/markers=(.*)$/,"");
            mapElem.src = imgsrc + "&markers=" + markers;
                         
        }else{
            var mapCanvasElement = document.querySelectorAll('[name=map_canvas]')[0];
				
            $KG["mapScriptLoaded"] = "false";                
            if (mapCanvasElement) {
                try
				{
                    var mapModel = kony.model.getWidgetModel($KW.Map.formID, $KW.Map.mapID);
                    switch(parseInt(mapModel.mode, 10))
                    {
                        case 2:
                        var mapMode = google.maps.MapTypeId.SATELLITE;
                        break;

                        case 3:
                        var mapMode = google.maps.MapTypeId.HYBRID;
                        break;

                        case 7:
                        var mapMode = google.maps.MapTypeId.TERRAIN;
                        break;

                        default:
                        var mapMode = google.maps.MapTypeId.ROADMAP;
                    }
                } catch(e) {
                    window.console && console.log("google : map script has not loaded yet");
                    return;
                }
                // There can not be more than 2map widgets in the form.
                var mapview = mapCanvasElement.getAttribute("mapview");
            
                var mapdata = mapModel.locationdata || mapModel.address;
                var mapjsondata = mapdata;
                var centralzoom = mapModel.zoomlevel || 15;
                var myOptions = {
                    zoom: centralzoom,
                    disableDefaultUI: true,
                    zoomControl: true,
                    navigationControl: true,
                    mapTypeControl: mapModel.displaymaptypecontrols,
                    scaleControl: true,
                    mapTypeId: mapMode
                };
                var map;
		//map, myOptions taken up in scope level
                if(mapdata) {
                    var geocoder = new google.maps.Geocoder();
                    if (mapdata.location) {
                        map = new google.maps.Map(mapCanvasElement, myOptions)
                        geocoder.geocode({
                            'address': mapdata.location
                        }, function(results, status){
                            if (status == google.maps.GeocoderStatus.OK) {
                                map.setCenter(results[0].geometry.location);
                                var marker = new google.maps.Marker({
                                    map: map,
                                    position: results[0].geometry.location
                                });
                            }
                        });
                    }
                    else if (mapdata.length >= 1+IndexJL) {
                        var centrallat = mapdata[IndexJL].lat,centrallon = mapdata[IndexJL].lon;
                        var points = [],myLatlng,myOptions;
                    
                        if (mapdata[IndexJL].lat == undefined) {
                            centrallat = mapdata[IndexJL][IndexJL];
                            centrallon = mapdata[IndexJL][1+IndexJL];
                        }
                        /* Name : R.venkat Rajeshwar Rao
                 * Date: 1/06/2011
                 * Reason: for the map in order to center the map to the view port using the below code
                 */
                        myLatlng = new google.maps.LatLng(centrallat, centrallon);
                        myOptions.center = myLatlng,myOptions.zoomControl = undefined;
                        map = new google.maps.Map(mapCanvasElement, myOptions);
                        $KW.Map.map = map;
						
                       if(typeof InfoBox === "undefined") {
                            var script = document.createElement("script");
                            script.type = "text/javascript";
                            script.src = "//google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js";
                            document.body.appendChild(script);
							//When custom template for callout is added in IE8 infobox is coming as undefined.the below snippet is added as script.onload is not supported for IE8 (Fix for #29399).
							var callback = function(){
								infobox = new InfoBox();
							}
							if(!script.addEventListener){
								script.onreadystatechange = function(){
									(this.readyState == 'complete' || this.readyState == 'loaded') && callback();
								};
							}
							else
								script.onload = callback;
                        }

                        if (mapview == null  && mapModel.mode!="5") {
                            // Starting to read marker postiions from position 1
                            var infowindow = null;
                            infowindow = new google.maps.InfoWindow({
                                content: "holding..."
                            });
                            var mapid = mapCanvasElement.getAttribute("id");                            
                            var contentStringEnd = '</div>';
                            for (var i = IndexJL; i < (mapdata.length); i++) {
                                var contentString = '<div kwidgettype="Kinfowindow" kinfoid="' + mapid + '"';
                                var urlt = '';
                                var imageURL = '';
                                if (mapdata[IndexJL].lat == undefined) {
                                    imageURL = (mapdata[i][4+IndexJL] || mapModel.defaultpinimage);
                                }
                                else {
                                    imageURL = (mapdata[i].image|| mapModel.defaultpinimage);
                                }
                                urlt = $KU.getImageURL(imageURL);
                            
                                var myLatlng1 = new google.maps.LatLng(mapdata[i].lat, mapdata[i].lon);
                                if (mapdata[IndexJL].lat == undefined) {
                                    urlt = $KU.getImageURL(mapdata[i][4+IndexJL]);
                                    myLatlng1 = new google.maps.LatLng(mapdata[i][IndexJL], mapdata[i][1+IndexJL]);                                
                                }
                                var coData = mapdata[i].calloutData || mapdata[i].calloutdata;
                                var mapInfoTemplateData= (coData && coData.template)||mapModel.callouttemplate;
                                if(mapInfoTemplateData){
                                    this.setParentForTemplateChildren(mapInfoTemplateData,mapInfoTemplateData.children,mapInfoTemplateData);
                                    //mapInfoTemplateData.widgetdatamap=mapModel.widgetDataMapForCallout; 
                                    var data="";
                                    coData && (data=this.ConvertDataMaptoData(mapModel,coData));
                                    data && $KW.Utils.updateLayoutData(mapModel,mapInfoTemplateData,data);
                                    contentString=$KW.HBox.render(mapInfoTemplateData,{
                                        topLevelBox:true
                                    });	
                                }							
                            
                                var marker1 = new google.maps.Marker({
                                    position: myLatlng1,
                                    map: map,
                                    icon: urlt,
                                    html: (mapdata[IndexJL].lat == undefined) ? mapdata[i][3+IndexJL] : mapdata[i].desc,
                                    hdrdescp: (mapdata[IndexJL].lat == undefined) ? mapdata[i][2+IndexJL] : mapdata[i].name,
                                    indexpoint: i,
                                    template:mapInfoTemplateData,
                                    contentString:contentString,
                                    showcallout:(mapdata[IndexJL].lat == undefined) ? mapdata[i][5+IndexJL] : mapdata[i].showcallout
                                });
                                mapModel.markers.push(marker1);
                                new google.maps.event.addListener(marker1, "click", function(){
                                    if(!this.eventFromNavigateTo) {
                                        var pinClickEvent = $KU.returnEventReference(mapModel.onpinclick);
                                        pinClickEvent && pinClickEvent.call(mapModel,mapModel, mapModel.locationdata[parseInt(this.indexpoint)]);
                                    }//eventFromNavigateTo-prevent model-pinclick events
                                    if(this.showcallout||this.showcallout==undefined||this.forceShowcallout)
                                    {
                                        if(this.template){
                                            var docwidth      = (window && window.innerWidth) || document.width;
                                            if(this.template.containerWeight<1 || this.template.containerWeight>100)
                                                this.template.containerWeight = 80;
                                            var infobox_width = this.template.containerWeight && (( docwidth * this.template.containerWeight * 0.01 ) + "px") || "280px";	
                                            var infobox_left  = parseInt(infobox_width, 10)/-2;
                                            infobox.content_ = this.contentString, //String of the box which we recieved
                                            infobox.disableAutoPan_ = false,
                                            infobox.position_= this.position,
                                            infobox.maxWidth_ = 450,
                                            infobox.pixelOffset_ = new google.maps.Size(infobox_left, 0),
                                            infobox.zIndex_ = 10,
                                            infobox.boxStyle_ = {
                                                opacity    : 1,
                                                width      : infobox_width,
                                                background :"none"
                                            },
                                            infobox.enableEventPropagation_= true,
                                            infobox.closeBoxURL_="",                               
                                            infobox.infoBoxClearance_ = new google.maps.Size(0,0)
                                            infobox.open(this.map, this);
                                        }
                                        else{
                                            infowindow.setContent(this.contentString + ' mappointno="' + this.indexpoint + '">' + '<b kwidgettype="Kinfowindow" kinfoid="' + mapid + '" mappointno="' + this.indexpoint + '">' + this.hdrdescp + "</b> <br />" + this.html + contentStringEnd);
                                            infowindow.open(this.map,this);
                                        }    
                                    }
                                    this.forceShowcallout = false;      //reset to prevent overriding in case of pin-clicks
                                    this.eventFromNavigateTo = false;   //reset to prevent misleading calls which are not from navigateTo
                                });
                                marker1.setMap(map);
                            }
                        }
                        else {
                            var polyPoint = '';
                            for (var i = IndexJL; i < (mapdata.length); i++) {
                        
                                if (mapdata[IndexJL].lat == undefined) {
                                    polyPoint = new google.maps.LatLng(mapdata[i][IndexJL], mapdata[i][IndexJL]);
                                }
                                else {
                                    polyPoint = new google.maps.LatLng(mapdata[i].lat, mapdata[i].lon);
                                }
                                points.push(polyPoint);
                            }
                            var bermudaTriangle = new google.maps.Polygon({
                                paths: points,
                                strokeColor: "#FF0000",
                                strokeOpacity: 0.8,
                                strokeWeight: 3,
                                fillColor: "#FF0000",
                                fillOpacity: 0.35
                            });
                            bermudaTriangle.setMap(map);
                        }
                    
                    }
                    else if(mapdata.length ==0 ) {
                        //added this if condition because, if location data set to empty or null we have to load a map at 0,0 with zoom: 15
                        myOptions.center = new google.maps.LatLng(0, 0);
                        map = new google.maps.Map(mapCanvasElement, myOptions);
                        $KW.Map.map = map;
                    }
                } else {
                    myOptions.center = new google.maps.LatLng(0, 0);
                    map = new google.maps.Map(mapCanvasElement, myOptions);
                    $KW.Map.map = map;
		    //accepts myOptions overrides and sets map object ref to $KW.Map
                }
                $KW.Map.setEnabledMap(mapModel, mapCanvasElement);
                if ($KW.Map.navigateToArgs) {
                    $KW.Map.navigateTo($KW.Map.navigateToArgs.mapModel, $KW.Map.navigateToArgs.index, $KW.Map.navigateToArgs.showCallOut);
                }
                if ($KW.Map.navigateToLocationArgs) {
                    $KW.Map.navigateToLocation($KW.Map.navigateToLocationArgs.mapModel, $KW.Map.navigateToLocationArgs.locationData, $KW.Map.navigateToLocationArgs.showCallOut, $KW.Map.navigateToLocationArgs.dropPin);
                }
                if ($KW.Map.routeToLocationArgs) {
                    $KW.Map.navigateToLocation($KW.Map.routeToLocationArgs.mapModel, $KW.Map.routeToLocationArgs.startlocationData, $KW.Map.routeToLocationArgs.endlocationData, $KW.Map.routeToLocationArgs.waypointslocation,$KW.Map.routeToLocationArgs.routeConfig);
                }
                new google.maps.event.addListener(this.map,'click', this.mapClickEventHandler);
            }
        }
    },
    // Fix for 23609: onClick implementation for map 
	mapClickEventHandler: function(event) { 
		 var mapModel = kony.model.getWidgetModel($KW.Map.formID, $KW.Map.mapID);
		 if(mapModel.onclick) {
			var maphandler = $KU.returnEventReference(mapModel.onclick);				
			var lat = event.latLng && event.latLng.lat();
			var lng = event.latLng && event.latLng.lng(); ;
            maphandler && maphandler.call(mapModel, mapModel, [{ "lat": lat, "lon": lng }]);
        }
		//prevent defaults and also twice trigger events from google map API
		event.preventDefault && event.preventDefault();
		event.stopPropagation && event.stopPropagation();
	},	
    
    navigateTo: function(mapWidget, index, showcallout){
        if (!this.navigateToArgs) {
            this.navigateToArgs = {
                'mapModel': mapWidget,
                'index': index,
                'showCallOut': showcallout
            };
        }
        if (!this.map) {
            return;
        }
        var index = parseInt(index);
        var map = this.map;
        var centrallat = '';
        var centrallon = '';
        var mapdata = mapWidget.locationdata;
        
        // If not a valid index then return
        if (index < 1 && index >= mapdata.length) {
            return;
        }
        if (mapdata[index]) {
            centrallat = mapdata[index].lat;
            centrallon = mapdata[index].lon;
            if (mapdata[index].lat == undefined) {
                centrallat = mapdata[index][IndexJL];
                centrallon = mapdata[index][1+IndexJL];
            }
        }
        
        map.setCenter(new google.maps.LatLng(centrallat, centrallon));
        
        if (showcallout) {
             // Modified the invocation signature based on the changes made to the function signature. 31/Aug/2013
            var marker = this.getMarkerByIndex(index, mapdata, mapWidget);
            marker.forceShowcallout = true;     //forceShowcallout - flag to override locationdata's settings for showcallout
            marker.eventFromNavigateTo = true;  //eventFromNavigateTo - flag to prevent triggering model's pinclick event
            google.maps.event.trigger(marker, "click");
        }
        this.navigateToArgs = null;
    },
    
    navigateToLocation: function(mapWidget, locationData, showcallout, dropPin){
        if (!this.navigateToLocationArgs) {
            this.navigateToLocationArgs = {
                'mapModel': mapWidget,
                'locationData': locationData,
                'showCallOut': showcallout,
                'dropPin': dropPin
            };
        }
        if (!this.map) {
            return;
        }
        var mapdata = mapWidget.locationdata;
        var index = "navigatetoloc";
        var map = this.map;
        /* for (var i = 1; i < mapdata.length; i++) {
            var lat = (mapdata[i].lat) ? mapdata[i].lat : mapdata[i][1];
            var lon = (mapdata[i].lon) ? mapdata[i].lon : mapdata[i][2];
            if (locationData[1] == lat && locationData[2] == lon) {
                index = i;
                break;
            }
        }
        
        // If not a valid locationData then return
        if (index === 0) {
            return;
        } */
        var lat = (locationData.lat) ? locationData.lat : locationData[IndexJL];
        var lon = (locationData.lon) ? locationData.lon : locationData[1+IndexJL];
        var desc = (locationData.lat == undefined) ? locationData[3+IndexJL] : locationData.desc;
        var name = (locationData.lat == undefined) ? locationData[2+IndexJL] : locationData.name;
        var imageURL = (locationData.lat == undefined) ? locationData[4+IndexJL] : (locationData.image || mapWidget.defaultpinimage);
        var urlt = (dropPin) ? $KU.getImageURL(imageURL) : null;
        var urlt = "";
        if(dropPin) {
            dropPin = true;
            urlt = $KU.getImageURL(imageURL);
        } else {
            if(typeof(marker) != 'undefined')
                marker.setMap(null);
        }
        if(typeof(infowindow) != 'undefined') {
            infowindow.close();
        }
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: map,
            icon: urlt,
            html: desc,
            hdrdescp: name,
            visible: dropPin
        });
        if(!dropPin) marker.setMap(null);
        map.setCenter(new google.maps.LatLng(lat, lon));
        mapWidget[mapWidget.id+"navigatetoloc"]=locationData;
        var contentString = '<div kwidgettype="Kinfowindow" kinfoid="'+mapWidget.id+'"';
        var contentStringEnd='</div>';

        if(showcallout) {
            infowindow = new google.maps.InfoWindow({
                content: contentString+' mappointno="'+index+'">'+"<b>"+name+"</b> <br />"+desc+contentStringEnd
                });
            if(locationData && locationData.showcallout) {
                new google.maps.event.addListener(marker, "click", function(){
                    //var infowindow = new google.maps.InfoWindow({content: contentString+' mappointno="'+this.indexpoint+'">'+"<b>"+this.hdrdescp+"</b> <br />"+this.html+contentStringEnd});
                    infowindow.open(this.map, this);
                });
            }
            infowindow.open(map, marker);
        }

        this.navigateToLocationArgs = null;
    },
    
    dismissCallout: function(mapid, location)
    {
       if(typeof infobox != "undefined") infobox.close();
       //condition check to prevent errors while InfoBox script hasn't finished loading
    },
    
	 /*
    *  Changing the signature of this function from
    *    function(index, locationDataList, dropPin) to function(index, locationDataList, mapWidget) 31st Aug 2013
    */
	
    getMarkerByIndex: function(index, locationDataList, mapWidget){
        if (!this.map) {
            return;
        }
        //added - references to markers have been pushed during their creation in setUpInteractiveCanvasMap
        if(mapWidget.markers.length){
            marker = mapWidget.markers[index];
            return marker;
        }
        if (!locationDataList) {
           // var mapWidget = kony.model.getWidgetModel(this.formID, this.mapID);
            var locationDataList = mapWidget.locationdata;
        }
        
        var map = this.map;
        var urlt = null;        
            var imageURL = (locationDataList[index].lat == undefined) ? locationDataList[index][4+IndexJL] : (locationDataList[index].image || mapWidget.defaultpinimage );
            urlt = $KU.getImageURL(imageURL);
        
        var lat = (locationDataList[index].lat == undefined) ? locationDataList[index][IndexJL] : locationDataList[index].lat;
        var lon = (locationDataList[index].lat == undefined) ? locationDataList[index][1+IndexJL] : locationDataList[index].lon;
        var desc = (locationDataList[index].lat == undefined) ? locationDataList[index][3+IndexJL] : locationDataList[index].desc;
        var name = (locationDataList[index].lat == undefined) ? locationDataList[index][2+IndexJL] : locationDataList[index].name;
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: map,
            icon: urlt,
            html: desc,
            hdrdescp: name,
            indexpoint: index
        });
        //marker.setMap(map);
        return marker;
    },
    routeLocations :function(mapWidget,startLocation,endLocation,locations,routeConfig ){
        if (!this.map) {
            return;
        }
        markers = {};
        //locations = null;
        var rendererOptions ={
            draggable: true, 
            suppressMarkers: true,
            polylineOptions:{ 
                strokeColor: routeConfig.lineColor, 
                strokeOpacity: 1, 
                strokeWeight: routeConfig.lineWidth 
            } 
        };
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
        geocoder = new google.maps.Geocoder();
        var startlocation = new google.maps.LatLng(startLocation.lat, startLocation.lon);
        var endlocation = new google.maps.LatLng(endLocation.lat, endLocation.lon);
        var mapCanvasElement = document.querySelectorAll('[name=map_canvas]')[0];
        var myOptions = {
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: startlocation
        };    

       
        map = new google.maps.Map(mapCanvasElement, myOptions);
        directionsDisplay.setMap(map);
        this.map = map;

        this.RenderTheDirection(startlocation,endlocation,locations);
        var markerObject = [startLocation,endLocation,locations];  
        this.CreateMarker(markerObject);
        
    },

    ConvertDataMaptoData: function(Model,data){
        var map = Model.widgetdatamapforcallout || {}; // Fix for 26488, JSPFQA11350: Check for widgetDataMapForCallout mapping else passing empty object
        var masterdata = {};
        var keys = $KU.getkeys(map);
        var newmap = {};
        for(var i = 0; i < keys.length; i++) {
            newmap[map[keys[i]]] = keys[i];
        }
        var newkeys = $KU.getkeys(newmap); 
        for(var j = 0; j < newkeys.length; j++) 
        {
            //newdata[i][newmap[newkeys[j]]] = data[i][newkeys[j]];
            var value = data[newkeys[j]];
            if(value && typeof value != "object" &&  typeof value !== "number" && value.toLowerCase().indexOf("i18n.getlocalizedstring") != -1)
                masterdata[newkeys[j]] = $KU.getI18NValue(value);
            else
                masterdata[keys[j]] = value;
        }       
        return masterdata;
    },



    CreateMarker:function(markerobj){
        $KG.__markers = {};
        var mapModel = kony.model.getWidgetModel(this.formID, this.mapID);
        var index = 0;
        var mapCanvasElement = document.querySelectorAll('[name=map_canvas]')[0];
        var mapid = mapCanvasElement.getAttribute("id");
        var contentString = '<div kwidgettype="Kinfowindow" kinfoid="' + mapid + '"';
        var contentStringEnd = '</div>';
        for (var i = IndexJL; i < (markerobj.length-1); i++) {
            var id =i;
            imageURL = markerobj[i].image;
            urlt = $KU.getImageURL(imageURL);
            var myLatlng1 = new google.maps.LatLng(markerobj[i].lat, markerobj[i].lon);
            var cmarker = new google.maps.Marker({
                id: id,
                position: myLatlng1,
                map: map,
                icon: urlt,
                html:  markerobj[i].desc,
                hdrdescp:  markerobj[i].name,
                indexpoint: i,
                                
                draggable:true    
            });
            $KG.__markers[id] = cmarker;

            google.maps.event.addListener(cmarker, 'dragend', function(marker) {
                return function () {

                    geocoder.geocode({
                        'latLng': cmarker.getPosition()
                        }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            $KW.Map.RenderTheDirection($KG.__markers[0].getPosition(),$KG.__markers[1].getPosition(),markerobj[2]);
                        }
                    });
     
                }
            }(cmarker));
        new google.maps.event.addListener(cmarker, "click", function(){

            mapModel.onpinselect && mapModel.onpinselect(mapModel.locationdata[parseInt(this.indexpoint)]);
    
   
            if(this.showcallout || this.showcallout==undefined)                                                                
            {
                var infowindow = new google.maps.InfoWindow({
                    content: contentString+' mappointno="'+index+'">'+"<b>"+name+"</b> <br />"+desc+contentStringEnd
                    });
                infowindow.setContent(contentString + ' mappointno="' + this.indexpoint + '">' + "<b>" + this.hdrdescp + "</b> <br />" + this.html + contentStringEnd);
                infowindow.open(map, this);
            }
        }); 
        cmarker.setMap(map);
                            
        }
    
},
	RenderTheDirection:function(startLocation,endLocation,locations){
		var  waypointslocation = [];
		if(locations && locations != undefined){
			for(var i = 0; i< locations.length;i++){
				waypointslocation[i] =  new google.maps.LatLng(locations[i].lat, locations[i].lon);
				waypointslocation[i] =  {
					location:waypointslocation[i]+""
					};
			}  
		}   
		var request = {
			origin: startLocation,
			destination: endLocation,
			waypoints: waypointslocation,
			travelMode: google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(result);
			}
		});
	 
	},    
	getInfoWindowByIndex: function(index, locationDataList){
		if (!this.map) {
			return;
		}
		if (!locationDataList) {
			var mapWidget = kony.model.getWidgetModel(this.formID, this.mapID);
			var locationDataList = mapWidget.locationdata;
		}
			
		//var domElement = new kony.dom.Element();
		//var mapCanvasElement = domElement.getElementByNameNS("map_canvas");
		var mapCanvasElement = document.querySelectorAll('[name=map_canvas]')[0];
		var mapid = mapCanvasElement.getAttribute("id");
		var contentString = '<div kwidgettype="Kinfowindow" kinfoid="' + mapid + '"';
		var contentStringEnd = '</div>';
		var desc = (locationDataList[index].lat == undefined) ? locationDataList[index][3+IndexJL] : locationDataList[index].desc;
		var name = (locationDataList[index].lat == undefined) ? locationDataList[index][2+IndexJL] : locationDataList[index].name;
		return new google.maps.InfoWindow({
			content: contentString + ' mappointno="' + index + '">' + "<b>" + name + "</b> <br />" + desc + contentStringEnd
		});
	},
		
	setParentForTemplateChildren:function(boxModel,children,parentModel){
		boxModel.pf=parentModel.id;
		if (children && children.length > 0) {
			for (var i = 0; i < children.length; i++) {
				boxModel[children[i]].pf = parentModel.id;
				this.setParentForTemplateChildren(boxModel[children[i]],boxModel[children[i]].children,parentModel);
			}
		}       
		kony.ui.Form2.prototype.createFormLevelHierarchy.call(parentModel,parentModel.ownchildrenref);   
	},
		
	setMapsHeight: function(formId){
		var mapElementsBody = document.querySelectorAll("#" + formId + " div[tpwidgettype='googlemap']");

		if(mapElementsBody){
			for(var i=0; i<mapElementsBody.length; i++ ){
				 var mapElement = mapElementsBody[i];
				 var targetWidgetID = mapElement.getAttribute("id").split('_')[1];
				 var sourceFormID = mapElement.getAttribute("id").split('_')[0];
				 var tabPaneID = mapElement.getAttribute("ktabpaneid");	
				 var mapModel = kony.model.getWidgetModel(sourceFormID, targetWidgetID, tabPaneID);
				 $KU.setScrollHeight(mapModel);
			}
		}
	},
	
    setEnabledMap : function(widgetModel, node){
		var targetEl = node;

		if (widgetModel && (widgetModel.mapsrc === "static"|| $KU.isBlackBerryNTH || ($KU.isWindowsPhone && $KU.isIE9))) {
			targetEl = node.getElementsByTagName("table")[0];
		}

		if(!targetEl) return;

		if(widgetModel.disabled=== true || node.getAttribute("kdisabled") === "true"){
			var mask              = document.createElement("div");
			mask.style.background = "#fff";
			mask.style.bottom     = "0";
			mask.style.left       = "0";
			mask.style.opacity    = "0.5";
			mask.style.filter     = "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)"; //ie8
			mask.style.filter     = "alpha(opacity=50)"; //ie7
			mask.style.position   = "absolute";
			mask.style.right      = "0";
			mask.style.top        = "0";
			mask.style.zIndex     = "2147483647";
			mask.className        = "google_map_mask";

			if(!!targetEl && !targetEl.querySelectorAll(".google_map_mask")[0])
			{
				widgetModel.oldPosition = targetEl.style.position;
				targetEl.style.position = "relative";
				targetEl.appendChild(mask);
			}
		}
		if(widgetModel.disabled=== false || node.getAttribute("kdisabled") === "false" && targetEl)
		{
			var mask                = targetEl.querySelectorAll(".google_map_mask")[0];
			targetEl.style.position = !!widgetModel.oldPosition && widgetModel.oldPosition;
			!!mask  && mask.parentNode.removeChild(mask);
		}
    }
};