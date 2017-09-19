/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


kony.widgets.Map = {
    currentShowCallOut: "false",
    currentMarker:null,
    curIndex:0,
    /**
     * Set Up the Canvas Map when the user has selected interactive non-native map as the options.
     *
     */
    setUpInteractiveCanvasMap : function()
    {

        var domElement = new kony.dom.Element();
        var mapCanvasElement = domElement.getElementByNameNS("map_canvas");
        // There can not be more than 2map widgets in the form.
        var mapjsondata = mapCanvasElement.getAttribute("konywidgetdata");
        var mapview = mapCanvasElement.getAttribute("mapview");
        var index = mapCanvasElement.getAttribute("index");
		var mapType;
		if(mapview == "terrain")
                    mapType = google.maps.MapTypeId.TERRAIN;
		else if(mapview == "hybrid")
                    mapType = google.maps.MapTypeId.HYBRID;
		else if(mapview == "satellite")
                    mapType = google.maps.MapTypeId.SATELLITE;
		else
                    mapType = google.maps.MapTypeId.ROADMAP;
        var mapdata = eval(mapjsondata);
        //added greater than or equal to since should be valid for single lat long to
        if (mapdata.length >= 1)
        {
            var centrallat = mapdata[index].lat;
            var centrallon = mapdata[index].lon;
            var centralzoom = mapdata[index].zoom;
            var points = [];
            var geocoder = new google.maps.Geocoder();
            var myLatlng;
            var myOptions;
            if(!(mapjsondata.indexOf("location")>-1))
            {
                myLatlng = new google.maps.LatLng(centrallat,centrallon);
                myOptions = {
                    zoom: centralzoom,
                    center: myLatlng,
                    disableDefaultUI: true,
                    navigationControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    mapTypeId: mapType
                }
            }
            else
            {
                myLatlng = new google.maps.LatLng(centrallat,centrallon);
                myOptions = {
                    zoom: centralzoom,
                    disableDefaultUI: true,
                    navigationControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    mapTypeId: mapType
                }
            }

           /* Name : R.venkat Rajeshwar Rao
             * Date: 1/06/2011
             * Reason: for the map in order to center the map to the view port using the below code
           */
            myLatlng = new google.maps.LatLng(centrallat,centrallon);
            myOptions = {
                    zoom: centralzoom,
                    disableDefaultUI: true,
                    navigationControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
		    center: myLatlng,
                    mapTypeId: mapType
                }
            var map = new google.maps.Map(mapCanvasElement, myOptions);
            if(mapjsondata.indexOf("location")>-1)
            {
                var marker;
                var addr=mapdata[index].location;
                var address = addr;
                geocoder.geocode( {
                    'address': address
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map = new google.maps.Map(mapCanvasElement, myOptions);
                        map.setCenter(results[0].geometry.location);
                        marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    }else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }

                });

            }
            else
            {
                if(mapview==null || mapview!="polygon")
                {
                    // Starting to read marker postiions from position 1
                    var infowindow = null;
                    infowindow = new google.maps.InfoWindow({
                        content: "holding..."
                    });
                    var content=[];

                    var mapid = mapCanvasElement.getAttribute("id");
                    var contentString = '<div konywidgettype="Kinfowindow" kinfoid="'+mapid+'"';
                    var contentStringEnd='</div>';
                    var domElement = new kony.dom.Element();
                    var currentForm = domElement.getCurrentForm();
                    var imageBaseURL = domElement.getAttributeValueNS(currentForm, "imgbaseurl");
                    var dropPin = mapCanvasElement.getAttribute("droppin");
                    var apiShowCallOut = mapCanvasElement.getAttribute("apishowcallout");
                    var fromOnSelection = mapCanvasElement.getAttribute("fromonselection");
                    
                    var indexMarker;
                    var onpinselect = mapCanvasElement.getAttribute("onpinselect");

                    for (var i = 0; i < mapdata.length; i++)
                    {
                        var urlt=  imageBaseURL;
                        if(dropPin == "true")
                            urlt=urlt+mapdata[i].marker;
                        var myLatlng1 = new google.maps.LatLng(mapdata[i].lat,mapdata[i].lon);
                        //Not showing marker if dropPin is set to false at particular index with navigateTo api.
                       // if(dropPin == "true" || i != index) {
                            var marker1 = new google.maps.Marker({
                                position: myLatlng1,
                                map: map,
                                icon: urlt,
                                html:mapdata[i].description,
                                hdrdescp:mapdata[i].hdrdscp,
                                indexpoint:i,
                                showcallout:mapdata[i].showcallout
                            });
                            new google.maps.event.addListener(marker1, "click", function() {
                                var showCallOut =  this.showcallout;
                                kony.widgets.Map.curIndex = this.indexpoint;
                                if(showCallOut == "true") {
                                    kony.widgets.Map.currentShowCallOut = showCallOut;
                                    infowindow.setContent(contentString+' mappointno="'+this.indexpoint+'">'+"<b konywidgettype=\"Kinfowindow\" kinfoid=\""+mapid+"\" mappointno=\""+this.indexpoint+"\">"+this.hdrdescp+"</b> <br />"+this.html+contentStringEnd);
                                    infowindow.open(map,this);
                                }                           
                                
                                if(onpinselect == "true") {
                                    //Executing onpinselect asynchronously on click of droppin..
                                    var postData = kony.data.encodeFormData();
                                    postData.push(mapid+"event_"+"=onpin"+this.indexpoint);

                                    var currentForm = domElement.getCurrentForm();
                                    var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)

                                    var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                                    kony.net.ajax.openReq(ajaxConfig, postData, null, null,this);
                                }
                            });

                            marker1.setMap(map);
                            
                            if(i == index)
                                indexMarker = marker1;
                            if(kony.widgets.Map.curIndex == i)
                                kony.widgets.Map.currentMarker = marker1;
                      //  }

                    }
                    if(apiShowCallOut == "true") {
                         infowindow.setContent(contentString+' mappointno="'+indexMarker.indexpoint+'">'+"<b>"+indexMarker.hdrdescp+"</b> <br />"+indexMarker.html+contentStringEnd);
                         infowindow.open(map,indexMarker);
                         mapCanvasElement.setAttribute("apishowcallout", "false");
                    }
  
                   var curMarker = kony.widgets.Map.currentMarker;
		    if(kony.widgets.Map.currentShowCallOut == "true" && onpinselect == "true" && fromOnSelection == "false") {
                         infowindow.setContent(contentString+' mappointno="'+curMarker.indexpoint+'">'+"<b>"+curMarker.hdrdescp+"</b> <br />"+curMarker.html+contentStringEnd);
                         infowindow.open(map,curMarker);
                    }

                }
                else if(mapview == "polygon")
                {
                    for(var i=0;i<mapdata.length;i++)
                    {
                        var polyPoint =new google.maps.LatLng(mapdata[i].lat,mapdata[i].lon) ;
                        points.push(polyPoint);
                    }
                    var  bermudaTriangle = new google.maps.Polygon({
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

        }
    },

    
    loadHandler: function(){
        
        var domElement = new kony.dom.Element();
        var mapElement = domElement.getElementByNameNS("map_canvas");

        if(mapElement){
            //this.setUpInteractiveCanvasMap(mapElement);
            this.loadMapAsynchrounsly(mapElement);
        }
    },
    /**
     * callback function in URL will call the maps dynamically
     */
    loadMapAsynchrounsly: function(mapElement){
        var script = document.createElement("script");
        script.type = "text/javascript";
        var clientId = mapElement && mapElement.getAttribute("mapclientid");
        var url = "maps-api-ssl.google.com/maps/api/js?v=3&sensor=false&callback=kony.widgets.Map.setUpInteractiveCanvasMap";
        if(clientId){
            url= url + "&client="+clientId;
        }
        if (location.protocol === 'https:') {
        script.src = "https://" +url;
        }
        else
        {
         script.src = "http://" + url;
        }
       document.body.appendChild(script);
    },
    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the Menu widget.
     */
    registerWidget: function()
    {
         var mapEvent = new kony.events.KEvent("click", "Kmap", this.mapEventHandler);
         //kony.print("Inside Map widget Initilaization");
         kony.events.KEventManager.registerEvent(mapEvent);
    },

    mapEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var link =  domElement.getParent(target, "a");
        var mapid = domElement.getAttributeValueNS(link, "namet");

        var eventnumber= domElement.getAttributeValueNS(link,"eventnumber");
        var namet=domElement.getAttributeValueNS(link,"namet");
        var postData = kony.data.encodeFormData();
        postData.push(namet+"="+eventnumber);
        postData.push("event=10");

       var currentForm = domElement.getCurrentForm();
       var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)

        // Before making the AJAX call to handle the appmenu event, register for the button unload event
        var mapUnloadEvent = new kony.events.KUnloadEvent(mapid, "Kmap", kony.widgets.Map.unloadEventHandler);
        kony.addGlobal(kony.constants.SELECTED_ITEM, mapUnloadEvent);

        var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
        kony.net.ajax.openReq(ajaxConfig, postData, null, null,eventSource);

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
    }

}

kony.widgets.Map.InfoWindow = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the Menu widget.
     */
    registerWidget: function()
    {
         var mapEvent = new kony.events.KEvent("click", "Kinfowindow", this.mapInfoWindowEventHandler);
         //kony.print("Inside Map widget Initilaization");
         kony.events.KEventManager.registerEvent(mapEvent);
    },

    mapInfoWindowEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var postData = kony.data.encodeFormData();

         var mapinfoid=  domElement.getAttributeValueNS(target, "kinfoid");
         var mappointinfo=  domElement.getAttributeValueNS(target, "mappointno");

         postData.push(mapinfoid+"event_"+"=temp"+mappointinfo);

       var currentForm = domElement.getCurrentForm();
       var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)

        // Before making the AJAX call to handle the appmenu event, register for the button unload event
        var mapUnloadEvent = new kony.events.KUnloadEvent(mapinfoid, "Kinfowindow", kony.widgets.Map.InfoWindow.unloadEventHandler);
        kony.addGlobal(kony.constants.SELECTED_ITEM, mapUnloadEvent);

        var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
        kony.net.ajax.openReq(ajaxConfig, postData, null, null,eventSource);

    },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
    }
}

if(kony.widgets.Map){
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Map);
    if(kony.widgets.Map.InfoWindow)
        kony.widgets.KWidgetManager.supportWidget(kony.widgets.Map.InfoWindow);
}