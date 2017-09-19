/*###########################################################################*/
/*  File: JavaScript FrameWork for thin client.                              */
/*  Date:                                                                    */
/*###########################################################################*/
var currentHash = location.hash;
var hashPrefix = "#_";
var PrevForms = [];
var selectedElements = [];
var backbuttonpress = false;
var konyappmenutimer;
var konyurltimer;
var wasSubmitted = false;

if(window.addEventListener){
    window.addEventListener('load', AddEventListeners,false);  //FF, W3C;
    window.addEventListener('load', GpsLocation,false);
    window.addEventListener('unload', RemoveEventListeners,false);  
}

else if(window.attachEvent){
    window.attachEvent('onload',AddEventListeners);  //IE
    window.attachEvent('unload', RemoveEventListeners);
}
else{
    window.onload = AddEventListeners;
    window.unload = RemoveEventListeners;
}

/*###########################################################################*/
/*	DOM RELATED FUNCTIONS                                                */
/*###########################################################################*/

function AddEventListeners()
{
    if (document.body && document.body.style && screen.height) {
      document.body.style.height = screen.height;
    }
    var e1 = document.getElementsByTagName("form");
    if(e1 == null)
        return;
if(e1.length)
    {
    if(e1[0].addEventListener) {
        e1[0].addEventListener('click',KonyClickHandler,false);  //FF, W3C;
        e1[0].addEventListener('change',KonyChangeHandler,false);
        e1[0].addEventListener('keydown',KonyGoHandler,false); //To handle ondone events
    }
    else if(e1[0].attachEvent) {
        e1[0].attachEvent('onclick',KonyClickHandler);  //IE
        e1[0].attachEvent('onkeydown',KonyGoHandler);
        // e1[0].attachEvent('change',KonyChangeHandler);
        AttachOnchangeHandlerforIE(); // Adding for Entire Elements as adding for form is not working on IE
    }
    else
        alert(typeof window.attachEvent);
    }
    var e3 = document.getElementById("imgGallary");    /*Image Gallery Id to be made generic*/
    if(e3 && e3.addEventListener) {
        e3.addEventListener("touchstart", slidestart, false);
        e3.addEventListener("touchmove", slidemove, false);

    }
 if(typeof(CheckCalendarwidget) !== 'undefined') {
                CheckCalendarwidget();
        }

	 try{
	     var onLoadJS = e1[0].getAttribute("formonloadjs");
	     if(onLoadJS && window[onLoadJS])
	         return window[onLoadJS](e1[0].getAttribute("id"));
	 }catch(e){
	     console.log(e);
	 } 


}

function AttachOnchangeHandlerforIE()
{
    var selectTags=document.getElementsByTagName("select");
    if(selectTags.length)
     {
        for(var i=0;i<selectTags.length;i++)
        {
            selectTags[i].attachEvent('onchange',KonyChangeHandler);
        }
     }
}


function StorePreviousForm(formid) {

    //  var eleform = document.getElementsByTagName("form")[0];
    //  var formid = eleform.getAttribute("id");

    bodyelem = document.getElementsByTagName("body");
    // alert(bodyelem[0].innerHTML);
    // var eletext = document.getElementsByName("txtfieldUserID")[0];
    // alert(eletext.value);
    if(bodyelem.length)
        PrevForms[formid] = bodyelem[0].innerHTML;
   // alert("ouyside store Previous Forms");
// alert("store" + formid);

}

function RemoveEventListeners()
{
    //debug("In remove Listener");
    var formid = document.getElementsByTagName("form");
	
    try{
        var unLoadJS = formid[0].getAttribute("formunloadjs");
        if(unLoadJS && window[unLoadJS])
            return window[unLoadJS](formid[0].getAttribute("id"));
    }catch(e){
        console.log(e);
    }
    
    if(formid.length)
    {
    if(formid[0].detachEvent) {
        formid[0].detachEvent('onclick',KonyClickHandler);  //IE
    }
}
    var mapelem = document.getElementById("map_canvas");

    if(mapelem) {
        GUnload();   //To avoid memory leaks in case of map widget
    }
}

function HandleFormData(req)
{
    var xmlDoc  = req.responseText;
   // alert("hi hello inside form data");
    bodyelem = document.getElementsByTagName("body");

    var eleform = document.getElementsByTagName("form");
    if(eleform.length)
    var formid = eleform[0].getAttribute("id");
    StorePreviousForm(formid);

    //Remove the event listeners to prevent possible mem leak
  //  alert("dello");
    RemoveEventListeners();
    bodyelem[0].innerHTML = xmlDoc;
    window.scrollTo(0, 0);

    //  alert("HandleFormdata" + formid);
    //  PrevForms[formid] = xmlDoc;
    //Add the listeners to the new elements
    AddEventListeners();
}

function HandleWidgetData(req)
{
    var xmlDoc  = req.responseText;
    debug("received widget data");
    bodyelem = document.getElementsByTagName("body");
    bodyelem[0].innerHTML = xmlDoc;

}

/*
 * Retrieve a DOM element by its ID.
 * @param id - The ID of the element to locate.
 */
function getDOMElementById(id) {
    if (isDefined(typeof document.getElementById)) {
        return document.getElementById(id);
    } else if (isDefined(typeof document.all)) {
        return document.all[id];
    } else {
        throw new Error("Can not find a method to locate DOM element.");
    }
}

function gettarget(e)
{
    var t = e.target || e.srcElement;
    return (t.nodeType == document.TEXT_NODE)?t.parentNode:t;
}

function findParent(node, localName)
{
    while (node && (node.nodeType != 1 || node.nodeName.toLowerCase() != localName))
        node = node.parentNode;
    return node;
}

//Murty Aug 23 2011 : Added blackberry gps support
function GpsLocation()
{
    var isgpspresent=document.getElementById("gpseventtrue");
    if(isgpspresent!=null)
    {
        var handleBBLocation = function() {
            if(blackberry.location.latitude == 0 && blackberry.location.longitude == 0) {
                domElement.addHiddenField(currentForm, "kffi_mylocation", "-1|103|Unknown location or Location not found");
            } else {
                var adresslocation1="0|"+blackberry.location.latitude+"|"+blackberry.location.longitude;
                adresslocation1=adresslocation1+"|: : : : : :" ;
                var elems=document.getElementsByTagName("form");
                var ele= document.createElement("input");
                ele.setAttribute("type","hidden");
                ele.setAttribute("name","kffi_mylocation");
                ele.setAttribute("value",adresslocation1);
                elems[elems.length - 1].appendChild(ele);
            }
            if(parseFloat(navigator.appVersion)>=4.6) {
                blackberry.location.removeLocationUpdate();
            }
        }

        if(window.blackberry && blackberry.location.GPSSupported) {
            // set to autonomous mode
            blackberry.location.setAidMode(2);

            //On BlackBerry devices running versions of BlackBerryÂ® Device Software  earlier than version 4.6,
            //this method must be passed as a string that is evaluated each time the location is refreshed. 
            //On BlackBerry devices running BlackBerry Device Software version 4.6 or later, you can pass a string, 
            //or use the method to register a callback function.
            if(parseFloat(navigator.appVersion)>=4.6) {
                blackberry.location.onLocationUpdate(handleBBLocation());
            } else {
                blackberry.location.onLocationUpdate("handleBBLocation()");
            }
            blackberry.location.refreshLocation();
        }
    }
}


/*###########################################################################*/
/*	WIDGET CLICK EVENT HANDLER FUNCTIONS  				     */
/*###########################################################################*/

function KonyClickHandler(event)
{
    // Get the event source type given the event target id.
    //debug("KonyClickHandler")
    event = event || window.event;  //For IE where window.event is global object
    var target = gettarget(event);

    var type = target.getAttribute("konywidgettype");
    if (type == null)
    {
        //For Appmenu stop event propagation.
        if(event.target) {
            var link = findParent(event.target, "a");
        }
        else if(event.srcElement)
        {
            var link = findParent(event.srcElement, "a");
        }
        if(link) {
        	jsevents(link, event);
            if(link.getAttribute("konywidgettype") == 'Kappmenu')
            {
                type = undefined;
                if (event.stopPropagation) event.stopPropagation();
                if (event.preventDefault) event.preventDefault();
                return false;
            } else if(link.getAttribute("konywidgettype") == "Kbox" || link.getAttribute("konywidgettype") == "Kdatagrid"
                        || link.getAttribute("konywidgettype") == "Kmap")
            {
                 type = link.getAttribute("konywidgettype");
            }
        }
    }
    else{
    	jsevents(target, event);
    	
    	if( type.indexOf("seg_") != -1) {    
    		type = type.split("_")[1];
    	}
    }
    if(type && (type == "Kbutton" || type == "Klink" || type == "Ksegment"
        || type == "Kappmenu") || type == "Kcheckboxgroup" || type == "Kbox" || type == "Kdatagrid" || type == "Ktab" || type == "Kmap" ||
    type == "Kradiobuttongroup" || type == "Ktextfile" || type == "Kimggal" || type == "Khstrip" || type == "Kcalenbut" || type=="Kcalendar" || type == "Krichtext") {
//    if(type == "Ksegment")
//        return;
        window[type + "Click"](event);
    }

    if(type && !(type == "Kcheckboxgroup" || type == "Kradiobuttongroup" || type == "Kphone")) {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
        if(event.target)
        event.preventDefault();
        return false;
    }

}

function KmapClick(event)
{
    event = event || window.event;   //For IE where window.event is global object

    if(event.target)
    {
        link = findParent(event.target, "a");
        //alert(link);
    }
    else if(event.srcElement)
    {
         link=findParent(event.srcElement, "a");
    }
    if(link) {

        var href = link.getAttribute("href");

        if(href && href.indexOf("event=") != -1)   {
                var params = href.split("&");
                var eventno;var index;var mapid;
                for(var i=0; i<params.length; i++) {
                    if(params[i].indexOf("event=") != -1) {
                        eventno = params[i].replace("event=", "");
                        index = i+1;
                    }
                }

                mapid = params[index];
                var indexOfEqualTo = mapid.indexOf("=")
                var mapcomponentid = mapid.substring(0, indexOfEqualTo);
                var mapcount = mapid.substring(indexOfEqualTo+1);

                var elems=document.getElementsByTagName("form");
                //Adding event in a hidden field
                var ele= document.createElement("input");
                ele.setAttribute("type","hidden");
                ele.setAttribute("name","event");
                ele.setAttribute("value",eventno);
                elems[0].appendChild(ele);

                var ele2= document.createElement("input");
                ele2.setAttribute("type","hidden");
                ele2.setAttribute("name",mapcomponentid);
                ele2.setAttribute("value",mapcount);
                elems[0].appendChild(ele2);

                elems[0].submit();
        }

    }
}
function jsevents(target, event){
	var prejs = target.getAttribute("prejsevent");
	if(prejs && window[prejs]){
		var targetid = target.getAttribute("id");
		var iscontinue =  window[prejs](event, targetid);
		if(!iscontinue) //when js function return false stop next sequence of steps
		{	
			if (eventSource.stopPropagation)
                eventSource.stopPropagation();
            if (eventSource.preventDefault)
            	eventSource.preventDefault();
			return;
		
		}
	}
}

function KmapClick(event)
{
    event = event || window.event;   //For IE where window.event is global object

    if(event.target)
    {
        link = findParent(event.target, "a");
        //alert(link);
    }
    else if(event.srcElement)
    {
         link=findParent(event.srcElement, "a");
    }
    if(link) {

        var href = link.getAttribute("href");

        if(href && href.indexOf("event=") != -1)   {
            if(!wasSubmitted) {
                wasSubmitted = true;
                var params = href.split("&");
                var eventno;var index;var mapid;
                for(var i=0; i<params.length; i++) {
                    if(params[i].indexOf("event=") != -1) {
                        eventno = params[i].replace("event=", "");
                        index = i+1;
                    }
                }

                mapid = params[index];
                var indexOfEqualTo = mapid.indexOf("=")
                var mapcomponentid = mapid.substring(0, indexOfEqualTo);
                var mapcount = mapid.substring(indexOfEqualTo+1);

                var elems=document.getElementsByTagName("form");
                //Adding event in a hidden field
                var ele= document.createElement("input");
                ele.setAttribute("type","hidden");
                ele.setAttribute("name","event");
                ele.setAttribute("value",eventno);
                elems[0].appendChild(ele);

                var ele2= document.createElement("input");
                ele2.setAttribute("type","hidden");
                ele2.setAttribute("name",mapcomponentid);
                ele2.setAttribute("value",mapcount);
                elems[0].appendChild(ele2);

                elems[0].submit();
            }
        }

    }
}

function KtabClick(event)
{
     event = event || window.event;   //For IE where window.event is global object

    if(event.target)
    {
        link = findParent(event.target, "a");
        //alert(link);
    }
    else if(event.srcElement)
    {
         link=event.srcElement;
    }
    if(link) {

        var href = link.getAttribute("href");

        if(href && href.indexOf("event=") != -1)   {

            if(!wasSubmitted) {
                wasSubmitted = true;
                var params = href.split("&");
                var eventname; var tabcount;
                for(i in params) {
                    if(params[i].indexOf("tabevent=") != -1) {
                        eventname = params[i].replace("tabevent=", "");
                    } else if(params[i].indexOf("tabctr=") != -1) {
                        tabcount = params[i].replace("tabctr=", "");
                    }
                }

                var elems=document.getElementsByTagName("form");
                //Adding event in a hidden field
                var ele= document.createElement("input");
                ele.setAttribute("type","hidden");
                ele.setAttribute("name",eventname+"event_");
                ele.setAttribute("value",tabcount);
                elems[0].appendChild(ele);

                elems[0].submit();
            }
        }

    }
}

function KboxClick(event)
{
    event = event || window.event;   //For IE where window.event is global object

    if(event.target)
    {
        link = findParent(event.target, "a");
        //alert(link);
    }
    else if(event.srcElement)
    {
         link=findParent(event.srcElement, "a");
    }
    if(link) {

        var href = link.getAttribute("href");

        if(href && href.indexOf("event=") != -1)   {
            if(!wasSubmitted) {
                wasSubmitted = true;
                var eventname = link.getAttribute("eventname");

                var elems=document.getElementsByTagName("form");
                //Adding event in a hidden field
                var ele= document.createElement("input");
                ele.setAttribute("type","hidden");
                ele.setAttribute("name",eventname);
                ele.setAttribute("value","x");
                elems[0].appendChild(ele);

                elems[0].submit();
            }
        }

    }
}

function KdatagridClick(event)
{
    event = event || window.event;   //For IE where window.event is global object

    if(event.target)
    {
        link = findParent(event.target, "a");
        //alert(link);
    }
    else if(event.srcElement)
    {
         link=findParent(event.srcElement, "a");
    }
    if(link) {

        var href = link.getAttribute("href");

        if(href && href.indexOf("event_") != -1)   {
            if(!wasSubmitted) {
                wasSubmitted = true;
                var params = href.split("&");
                var eventname;
                for(i in params) {
                    if(params[i].indexOf("event_") != -1) {
                        eventname = params[i].replace("=x", "");
                    }
                }

                var elems=document.getElementsByTagName("form");
                //Adding event in a hidden field
                var ele= document.createElement("input");
                ele.setAttribute("type","hidden");
                ele.setAttribute("name",eventname);
                ele.setAttribute("value","x");
                elems[0].appendChild(ele);

                elems[0].submit();
            }
        }

    }
}

function delayedImageLoading(event,img){
    setTimeout(function(){KImageLoad(img);},1000);
    return;
}


function KImageLoad(domImg)
{
        var imageModel = {};
        imageModel.width=domImg.width;
        imageModel.height=domImg.height;

        var reference = {};
        reference.width = domImg.getAttribute("refwidth");
        reference.height = domImg.getAttribute("refheight");

        var cwt = domImg.getAttribute("cwt")/100;
        var imageWidget = {};
        imageWidget.height = 0;

        var viewmode =  domImg.getAttribute("view");
        if(viewmode == "maintainaspectratio"){
            imageWidget.width = domImg.parentNode.parentNode.offsetWidth*cwt;
        }else{
            imageWidget.width = domImg.parentNode.offsetWidth;        
        }
                        var isPercent = domImg.getAttribute("ispercent");
        var dimensions=[]; //only new image works as old image psp generation to be considered

        if(reference.width != "0" && viewmode == "fittodimensions") //as reference width is mandatory property
        {
            imageWidget.width = (((screen.width*cwt)> reference.width)?reference.width: (screen.width*cwt));
            if(isPercent == "false")
                    imageWidget.width = reference.width;
            imageWidget.height = reference.height;
            if(imageModel.width != "0")
                domImg.style.width=imageWidget.width+"px";
            if(reference.height)
                domImg.style.height=reference.height+"px";
        }
        else if (viewmode == "maintainaspectratio")
        {            
            var aspectRatio=(imageModel.width/imageModel.height);
            if(isPercent == "false")
            {
                    if(reference.width > "0" )
                            imageWidget.width = reference.width;
                    else
                            imageWidget.width = imageModel.width;
            }
            if(reference.height > "0")
                imageWidget.height = reference.height;
            else
                imageWidget.height = imageModel.height;

            if(imageModel.width < imageWidget.width)
            {
                    dimensions[1]=imageModel.width;
                    dimensions[0]=imageModel.height;
            }
            else
            {
                    dimensions[1]=imageWidget.width;
                    dimensions[0]=dimensions[1]/aspectRatio;
            }
            domImg.parentNode.style.width=dimensions[1]+"px";
            domImg.parentNode.style.height=dimensions[0]+"px";
            domImg.style.width = dimensions[1]+"px";
            domImg.style.height = dimensions[0]+"px";
            domImg.style.display = "";
            domImg.style.visibility = "visible";
            domImg.style.opacity = 1;
        }

}

function galleryLoadHandler2(domImg)
{
    //var id = domImg.id;
    //if(id == "image21040749853285179")
    //{
    
       var imageModel = {};
            imageModel.width=domImg.width;
            imageModel.height=domImg.height;

            var reference = {};
            imageModel.referencewidth = domImg.getAttribute("refwidth");
            imageModel.referenceheight = domImg.getAttribute("refheight");
            
            var imageWidget = {};
            imageWidget.width = imageModel.referencewidth;
            imageWidget.height = imageModel.referenceheight;

            var viewmode =  domImg.getAttribute("view");
            if(imageModel.referencewidth && viewmode == "fittodimensions") //as reference width is mandatory property
            {
                    domImg.style.width=imageWidget.width+"px";               
                    domImg.style.height=imageWidget.height+"px";
            }
            else 
            {                
                var nWidth = domImg.width;
                var nHeight = domImg.height;
				function getNatural (DOMelement) {
                     var img = new Image();
                     img.src = DOMelement.src;
                     return {width: img.width, height: img.height};
                }
                var borderWidth=0;
                var marginRight=0;
                var marginLeft=0;
                if(document.querySelector) 
				{
	                imgQuery="#"+domImg.id;
					var imgEle=document.querySelector(imgQuery);
					imgQuery1=imgQuery+" img";
					var imgEle1=document.querySelector(imgQuery1);
					if(domImg.id!=imgEle1.id)
					imgEle1=document.querySelectorAll(imgQuery1)[1];
				}
                else
                {
					var imgEle = document.getElementById(domImg.id);
					var imgEle1 = imgEle.getElementsByTagName("img"); 
					if(domImg.id != imgEle1.id)
						imgEle1 = imgEle.getElementsByTagName("img")[1];
				}
                var cmpStyle;
                if(imgEle1 && imgEle1.className!=""){
                    if(window.getComputedStyle){ 
                         cmpStyle = document.defaultView.getComputedStyle(imgEle1,null); 
                    }
                    else if(imgEle1.currentStyle)
                    {
                       cmpStyle = imgEle1.currentStyle ;
                    }
                }
				if(typeof cmpStyle!='undefined')
				{
					var borderWidth=cmpStyle.borderWidth;
					var marginRight=cmpStyle.marginRight;
					var marginLeft=cmpStyle.marginLeft;
					marginLeft=marginLeft.substring(0,marginLeft.indexOf("px"));
					marginRight=marginRight.substring(0,marginRight.indexOf("px"));
					borderWidth=borderWidth.substring(0,borderWidth.indexOf("px"));
				}

                var natural = getNatural(domImg);
                nWidth = natural.width,
                nHeight = natural.height
				var aspectRatio = nWidth / nHeight;
                var imgspace=domImg.style.marginRight;
                imgspace=imgspace.substring(0,imgspace.indexOf("px"));
				
                if(domImg.getAttribute("konywidgettype")=="Kimggal")
				{
				var recperpage=parseInt(domImg.getAttribute("recperpage"));
				cwt=1/recperpage;
				}
				else
				{
                var recPerPageEle = document.getElementById(domImg.getAttribute("id")+"recperpage")
                var recperpage=parseInt(recPerPageEle.getAttribute("value"));
                var cwt = 1/(recperpage);
                }
				if(domImg.parentNode.nodeName=="A")
                	{
					if(domImg.getAttribute("konywidgettype")=="Kimggal")
					{
					var offSet=domImg.parentNode.parentNode.parentNode.parentNode.offsetWidth-(recperpage+1)*imgspace;
					}
					else
					{
                      var offSet=imgEle.offsetWidth-(recperpage+1)*imgspace-2*recperpage*borderWidth-(marginRight+marginLeft)*recperpage;  
                            offSet=offSet*0.7                   	
                        }
					}
                	else
                		{
						if(domImg.getAttribute("konywidgettype")=="Kimggal")
					{
					 var offSet =domImg.parentNode.parentNode.parentNode.offsetWidth-(recperpage+1)*imgspace;
					}
					else{
                     var offSet=imgEle.offsetWidth-(recperpage+1)*imgspace-2*recperpage*borderWidth-(marginRight+marginLeft)*recperpage;
                        offSet=offSet*0.7               
                    }
                		}//offSet = offSet - 21;
                var imgwidth = offSet*cwt;
                imageModel.isPercent = domImg.getAttribute("ispercent");
                
                if(imageModel.referencewidth === "0")
                 {
                    var dimensions=[];
                    if(imageModel.isPercent == "false")
                    {
                        dimensions[1]=nWidth;
                        dimensions[0]=nHeight;
                    }
                    else
                    {
                        if(nWidth<=imgwidth)
                        {
                            if(imageModel.referenceheight!== "0" && nHeight>imageModel.referenceheight)
                            {
                                dimensions[0]=imageModel.referenceheight;
                                dimensions[1]=dimensions[0]*aspectRatio;
                            }
                            else
                            {
                            dimensions[1]=nWidth;
                            dimensions[0]=nHeight;
                            }
                        }
                        else
                        {
                            dimensions[1]=imgwidth;
                            if(imageModel.referenceheight === "0")
                                dimensions[0]=dimensions[1]/aspectRatio;
                            else
                            {
                                dimensions[0]=dimensions[1]/aspectRatio;
                                if(dimensions[0]>imageModel.referenceheight)
                                {
                                    dimensions[0]=imageModel.referenceheight;
                                    dimensions[1]=dimensions[0]*aspectRatio;
                                }  
                            }
                        }   
                    }
                     
                    domImg.style.width=dimensions[1]+"px";
                    domImg.style.height=dimensions[0]+"px";
                    domImg.style.display = "";
                    domImg.style.visibility = "visible";
                    domImg.style.opacity = 1;
                } 
                else if (!isNaN(aspectRatio) && (imageModel.referencewidth|| imageModel.referenceheight))
                {
                    if (nWidth > imageModel.referencewidth|| nHeight > imageModel.referenceheight) 
                    {
                        var width  = (imageModel.referencewidth&& (nWidth > imageModel.referencewidth)) ? imageModel.referencewidth: nWidth;
                        var height = imageModel.referenceheight;
                        var imgdim = ((width / aspectRatio) < height || !height) ? (width / aspectRatio) : false;
                        if (imgdim == false) 
                            width = (height * aspectRatio <= imageModel.referencewidth|| !imageModel.referencewidth) ? height * aspectRatio : width;
                        else 
                            height = imgdim;
                        domImg.style.height = height + "px";
                        domImg.style.width = width + "px";
                    }else{
                        domImg.style.height = imageModel.referenceheight + "px";
                        domImg.style.width = imageModel.referencewidth + "px";
                    }
                }                
            }
    //}
    
}

function KbuttonClick(event)
{
    event = event || window.event;   //For IE where window.event is global object

    var target = gettarget(event);
    
    //Murty Jan 23, 2012: Added external submit support
    var externalAction = target.getAttribute("externalSubmitAction");
    if(externalAction) {
        document.forms[0].action = externalAction;
        document.forms[0].submit();
        return;
    }
    
    var isevent = target.getAttribute("event");
    

    if(isevent && isevent.indexOf("yes") != -1)   {

        var buttonid = target.getAttribute("name");
        var elems=document.getElementsByTagName("form");
        var submiturl = target.getAttribute("submiturl");
        if(submiturl)
        {
        	document.forms[0].action = submiturl;
            document.forms[0].submit();
            return;
        }
        if(!wasSubmitted) {
            wasSubmitted = true;
            var ele= document.createElement("input");
            ele.setAttribute("type","hidden");
            ele.setAttribute("name",buttonid);
            ele.setAttribute("value","");
            elems[0].appendChild(ele);
        
        elems[0].submit();
        }
        
    }
}

function KimagebuttonClick(event)
{
// alert("in kimagebutton");

}

function KlinkClick(event)
{
    event = event || window.event;

    var target = gettarget(event);
    
    //Maruthi Sep 04, 2012: Added external submit support
    var externalAction = target.getAttribute("externalSubmitAction");
    if(externalAction) {
        document.forms[0].action = externalAction;
        document.forms[0].submit();
        return;
    }    

    var isevent = target.getAttribute("event");

    if(isevent && (isevent.indexOf("yes") != -1)) {

        var buttonid = target.getAttribute("name");
        var elems=document.getElementsByTagName("form");
        if(!wasSubmitted) {
            wasSubmitted = true;
            var ele= document.createElement("input");
            ele.setAttribute("type","hidden");
            //Checking if the name contains event_ (instead of changing in the codegen)
            if(buttonid.indexOf("event_") != -1)
                ele.setAttribute("name",buttonid);
            else
                ele.setAttribute("name",buttonid+"event_");
            ele.setAttribute("value","");
            elems[0].appendChild(ele);

        elems[0].submit();
        }

    }
}

function KrichtextClick(event){
    var target = gettarget(event);
    var isevent = target.getAttribute("event");
    if(target.getAttribute("kdisabled") != null || 
    		(target.parentNode && target.parentNode.getAttribute("kdisabled") != null))
    {
        return;
    }
    if (isevent)
    {
        if(!wasSubmitted) {
            wasSubmitted = true;
            var href = target.getAttribute("href");
            var elems=document.getElementsByTagName("form");
            if(href != null) {
                var params = href.split("&");
                for(var i=1;i<params.length;i++)
                {
                	var ele= document.createElement("input");
                	ele.setAttribute("type","hidden");
                	var rparam = params[i].split("=");
                	ele.setAttribute("name", rparam[0]);
                	ele.setAttribute("value", rparam[1]);
                    elems[0].appendChild(ele);
                }                
            }else{
                var ele= document.createElement("input");
                ele.setAttribute("type","hidden");
                ele.setAttribute("name", target.getAttribute("id") + "event_=");
                ele.setAttribute("value", "");
                elems[0].appendChild(ele);

                //row id
                var ele1= document.createElement("input");
                ele1.setAttribute("type","hidden");
                ele1.setAttribute("name", "rowId");
                ele1.setAttribute("value", target.getAttribute("rowid"));
                elems[0].appendChild(ele1);
                //segment id
                var ele2= document.createElement("input");
                ele2.setAttribute("type","hidden");
                ele2.setAttribute("name", "segmentId");
                ele2.setAttribute("value",  target.getAttribute("segmentid"));
                elems[0].appendChild(ele2);
            }

            elems[0].submit();
        }
    }
}

function KlistboxClick(event)
{
    event = event || window.event; //For IE where window.event is global object
    var target = gettarget(event);
    var isevent = target.getAttribute("event");
    var  radioGroupid = target.getAttribute("name");
    var rid=radioGroupid+"event_=";

    if(isevent && isevent.indexOf("yes") != -1)   {
        if(!wasSubmitted) {
            wasSubmitted = true;
            var elems=document.getElementsByTagName("form");
            var ele= document.createElement("input");
            ele.setAttribute("type","hidden");
            ele.setAttribute("name",rid);
            ele.setAttribute("value","");
            elems[0].appendChild(ele);
            elems[0].submit();
        }
}
}

function KradiobuttongroupClick(event)
{
    event = event || window.event; //For IE where window.event is global object
    var target = gettarget(event);
    var isevent = target.getAttribute("event");
    var  radioGroupid = target.getAttribute("name");
    var radioValue=target.getAttribute("value");
    var rid=radioGroupid+"event_=";
    if(isevent && isevent.indexOf("yes") != -1)   {
        if(!wasSubmitted) {
            wasSubmitted = true;
            var elems=document.getElementsByTagName("form");
            var ele= document.createElement("input");
            ele.setAttribute("type","hidden");
            ele.setAttribute("name",rid);
            ele.setAttribute("value",radioValue);
            elems[0].appendChild(ele);
            elems[0].submit();
        }
    }
}

function KcheckboxgroupClick(event)
{
    event = event || window.event; //For IE where window.event is global object
    var target = gettarget(event);
    var isevent = target.getAttribute("event");
    var  radioGroupid = target.getAttribute("name");

    var checked = new Array();
        var tempVal = "";
        var checkboxArray = document.getElementsByName(radioGroupid);
        var checkbox = null;
        for(var i=0, size =  checkboxArray.length; i < size; i++){
            checkbox = checkboxArray[i];
            if(checkbox.checked){
                tempVal = checkbox.getAttribute("value");
               checked.push(tempVal);
            checkbox.setAttribute("checked","checked");
            }else{
                checkbox.removeAttribute("checked");
            }
        }
    var rid=radioGroupid+"event_";
    if(isevent && isevent.indexOf("yes") != -1)   {
        if(!wasSubmitted) {
            wasSubmitted = true;
            var elems=document.getElementsByTagName("form");
            var ele= document.createElement("input");
            ele.setAttribute("type","hidden");
            ele.setAttribute("name",rid);
            ele.setAttribute("value",checked.toString());
            elems[0].appendChild(ele);
            elems[0].submit();
        }
    }

}

function KsegmentClick(event)
{
    event = event || window.event;
    var link;
   // alert("inside Ksegment Click");
    if(event.target)
    {
        link = findParent(event.target, "a");
        //alert(link);
    }
    else if(event.srcElement)
    {
         link=findParent(event.srcElement, "a");
    }
    if(link) {

    	if(link.getAttribute("disabled") != null)
            return;
        var href = link.getAttribute("href");

        if(href && href.indexOf("event_") != -1)   {
            if(!wasSubmitted) {
                wasSubmitted = true;
                var params = href.split("&");
                var eventname; var rowid,sectionid;
                for(i in params) {
                    if(params[i].indexOf("event_") != -1) {
                        eventname = params[i].replace("=x", "");
                    }
                    if(params[i].indexOf("rowid") != -1) {
                        rowid = params[i].replace("rowid=", "");
                    }
                    if(params[i].indexOf("sectionid") != -1){
                        sectionid = params[i].replace("sectionid=", "");
                    }
                }

                var elems=document.getElementsByTagName("form");
                //Adding event in a hidden field 
                var ele= document.createElement("input");
                ele.setAttribute("type","hidden");
                if(eventname.indexOf("event_.Ksegment") == -1)
                	eventname = eventname.replace("event_", "")+"."+rowid+".event_.Ksegment";
                ele.setAttribute("name",eventname);
                ele.setAttribute("value",rowid);
                elems[0].appendChild(ele);
                //Adding rowid in a hidden field
                var ele2= document.createElement("input");
                ele2.setAttribute("type","hidden");
                ele2.setAttribute("name","rowid");
                ele2.setAttribute("value",rowid);
                elems[0].appendChild(ele2);
                if(sectionid != null && typeof sectionid != "undefined"){
                    var ele2= document.createElement("input");
                    ele2.setAttribute("type","hidden");
                    ele2.setAttribute("name","sectionid");
                    ele2.setAttribute("value",sectionid);
                    elems[0].appendChild(ele2);
                }
                elems[0].submit();
            }
        }

    }
}

function KappmenuClick(event)
{
    event = event || window.event;   //For IE where window.event is global object

    if(event.target)
    {
        link = findParent(event.target, "a");
    }
    else if(event.srcElement)
    {
        link = findParent(event.srcElement, "a");
    }

    if(link) {

        var href = link.getAttribute("href");

        if(href) {

            var elems=document.getElementsByTagName("form");

            //Creating a hidden field to indicate if appmenumore is true
            if(href.indexOf("appmenumore=true") != -1) {
                    var elemore= document.createElement("input");
                    elemore.setAttribute("type","hidden");
                    elemore.setAttribute("name","appmenumore");
                    elemore.setAttribute("value", "true");
                    elems[0].appendChild(elemore);
            }
            //Adding the appmenu eventname and doing a form submit
            if(href.indexOf("event_") != -1)   {
                if(!wasSubmitted) {
                    wasSubmitted = true;
                    var params = href.split("&");
                    var eventname;
                    for(i in params) {
                        if(params[i].indexOf("event_") != -1) {
                            eventname = params[i].replace("=x", "");
                        }
                    }
                    var ele= document.createElement("input");
                    ele.setAttribute("type","hidden");
                    ele.setAttribute("name",eventname);
                    ele.setAttribute("value","");
                    elems[0].appendChild(ele);

                    elems[0].submit();
                }
            }

        }
    }
}

function KhstripClick(event)
{
    event = event || window.event;   //For IE where window.event is global object

    if(event.target)
    {
        link = findParent(event.target, "a");
    }
    else if(event.srcElement)
    {
        link = findParent(event.srcElement, "a");
    }

    if(link) {

        var href = link.getAttribute("href");

        if(href) {

            var elems=document.getElementsByTagName("form");

            //Adding the imagestrip eventname and doing a form submit
            if(href.indexOf("event_") != -1 && event.target.getAttribute("disabled" )== null)   {
                if(!wasSubmitted) {
                    wasSubmitted = true;
                    var params = href.split("&");
                    var eventname;
                    for(i in params) {
                        if(params[i].indexOf("event_") != -1) {
                            eventname = params[i].replace("=x", "");
                        }
                    }
                    var ele= document.createElement("input");
                    ele.setAttribute("type","hidden");
                    ele.setAttribute("name",eventname);
                    ele.setAttribute("value","");
                    elems[0].appendChild(ele);

                    elems[0].submit();
                }
            }

        }
    }
}

function KimggalClick(event)
{
    event = event || window.event;   //For IE where window.event is global object

    if(event.target)
    {
        link = findParent(event.target, "a");
    }
    else if(event.srcElement)
    {
        link = findParent(event.srcElement, "a");
    }

    if(link) {

        var href = link.getAttribute("href");

        if(href) {

            var elems=document.getElementsByTagName("form");

            if(href.indexOf("event=") != -1 && event.target.getAttribute("disabled" )== null)   {

                if(!wasSubmitted) {
                    wasSubmitted = true;
                    var params = href.split("&");
                    var galleryid; var rowid;
                    for(i in params) {
                        if(params[i].indexOf("event=") != -1) {
                            galleryid = params[i].replace("event=", "");
                            var indexofdot = galleryid.indexOf(".");
                            galleryid = galleryid.substr(indexofdot+1);
                        }
                        if(params[i].indexOf("rowid") != -1) {
                            rowid = params[i].replace("rowid=", "");
                        }
                    }
                    //Adding eventname in the hidden input field
                    var ele= document.createElement("input");
                    ele.setAttribute("type","hidden");
                    ele.setAttribute("name",galleryid+"event_");
                    ele.setAttribute("value",rowid);
                    elems[0].appendChild(ele);

                    //Adding rowid in a hidden field
                    var ele2= document.createElement("input");
                    ele2.setAttribute("type","hidden");
                    ele2.setAttribute("name","rowid");
                    ele2.setAttribute("value",rowid);
                    elems[0].appendChild(ele2);

                    elems[0].submit();
                }
            }

        }
    }
}


function KtextfieldClick(event)
{
    clearInterval(konyappmenutimer);
}

//Widget ondone(on press of enter key) event handler
function KonyGoHandler(event)
{
    event = event || window.event;
    if(event.keyCode == 10 || event.keyCode == 13){
            var target = gettarget(event);
            var konywidgettype = target.getAttribute("konywidgettype")
            if (konywidgettype && (konywidgettype == "Ktextfield" || konywidgettype == "Kcalendar")){
                if (event.stopPropagation)
                        event.stopPropagation();
                if (event.preventDefault)
                    event.preventDefault();
                else
                    event.returnValue = false;
            }

            var isevent = target.getAttribute("event");

            if(isevent && isevent.indexOf("yes") != -1) {
                if(!wasSubmitted) {
                    wasSubmitted = true;

                    var textfieldid = target.getAttribute("name");
                    var elems=document.getElementsByTagName("form");

                    var ele= document.createElement("input");
                    ele.setAttribute("type","hidden");
                    ele.setAttribute("name",textfieldid+"event_");
                    ele.setAttribute("value","konygoevent");
                    elems[0].appendChild(ele);

                    elems[0].submit();
                }
            }
    }
}
/*###########################################################################*/
/*	WIDGET CHANGE EVENT HANDLER FUNCTIONS    		             */
/*###########################################################################*/
function KonyChangeHandler(event)
{
    event = event || window.event;

    var target = gettarget(event);

    var type = target.getAttribute("konywidgettype");
    if( type.indexOf("seg_") != -1) {
        type = type.split("_")[1];
    }

    if(type && (type == "Kcombobox"|| (type == "Ktextfield") || (type == "Klistbox") || (type=="KcalendarInline")))
    {
        window[type + "Change"](event);
    }
    else
    {
    //  alert("handle change " + type);
    }
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
    if (event.preventDefault) event.preventDefault();
    else event.returnValue = false; //for Handling IE prevent Default

}

function KcomboboxChange(event)
{
   /* event = event || window.event; //For IE where window.event is global object
        var target = gettarget(event);
        var isevent = target.getAttribute("event");
        var  radioGroupid = target.getAttribute("name");
        var rid=radioGroupid+"event_=";
        if(isevent && isevent.indexOf("yes") != -1)
        {
            var elems=document.getElementsByTagName("form");
            var ele= document.createElement("input");
            ele.setAttribute("type","hidden");
            ele.setAttribute("name",rid);
            ele.setAttribute("value","");
            elems[0].appendChild(ele);
            elems[0].submit();
       } */

        event = event || window.event; //For IE where window.event is global object
        var target = gettarget(event);
        var isevent = target.getAttribute("event");
        var  comboBoxGroupid = target.getAttribute("name");
        if(isevent && isevent.indexOf("yes") != -1)
        {
            if(!wasSubmitted) {
                wasSubmitted = true;
                var formList=document.getElementsByTagName("form");
                var comboBoxNode=document.getElementById(comboBoxGroupid);
                comboBoxNode.setAttribute("name",comboBoxGroupid+"event_=");
                formList[0].submit();
            }
       }


}

function KtextfieldChange(event)
{
   // konyappmenutimer = setInterval(JSFX_FloatDiv("konyappmenudiv",0,-40).floatIt(), 300);
}


function KlistboxChange(event)
{
   /* event = event || window.event; //For IE where window.event is global object
        var target = gettarget(event);
        var isevent = target.getAttribute("event");
        var  radioGroupid = target.getAttribute("name");
        var rid=radioGroupid+"event_=";
        if(isevent && isevent.indexOf("yes") != -1)
        {
            var elems=document.getElementsByTagName("form");
            var ele= document.createElement("input");
            ele.setAttribute("type","hidden");
            ele.setAttribute("name",rid);
            ele.setAttribute("value","");
            elems[0].appendChild(ele);
            elems[0].submit();
       } */

        event = event || window.event; //For IE where window.event is global object
        var target = gettarget(event);
        var isevent = target.getAttribute("event");
        var  listBoxGroupid = target.getAttribute("name");
        if(isevent && isevent.indexOf("yes") != -1)
        {
            if(!wasSubmitted) {
                wasSubmitted = true;
                var formList=document.getElementsByTagName("form");
                var listBoxNode=document.getElementById(listBoxGroupid);
                listBoxNode.setAttribute("name",listBoxGroupid+"event_=");
                formList[0].submit();
            }
       }
}

 function KcalenbutClick(event)
 {
     event = event || window.event;
     var target = gettarget(event);
     var id= target.getAttribute("id");
     var crid= id.split("_")[0];
      if(id.indexOf("updatecalen")>-1)
         Calendar.Inlineview.updateCalendar(crid);
          else if(id.indexOf("hidecalen")>-1)
      	  Calendar.Inlineview.HideCalendar(crid);
         else if(id.indexOf("showCalen")>-1)
      	 Calendar.Inlineview.showCalendar(crid);

}




function KcalendarClick(event)
 {
     event = event || window.event;
     var target = gettarget(event);
     var id= target.getAttribute("id");
     var cid= id.substr(4);
}

function KcalendarInlineChange(event)
{
    var target = gettarget(event);
	var calid = target.getAttribute("id");
    var cid = calid.substr(0,calid.indexOf("_"));

    updateDaysforInlineMode(cid);

}


/*###########################################################################*/
/*	TOUCH EVENT HANDLER FUNCTIONS  				             */
/*###########################################################################*/

function slidestart(e)
{
    //alert("tapped")
    if(e.touches.length == 1){ // Only deal with one finger
        var touch = e.touches[0]; // Get the information for finger #1
        var node = touch.target; // Find the node the drag started from
        // node.style.position = "absolute";
        this.startX = e.targetTouches[0].clientX;

        this.startY = e.targetTouches[0].clientY;
    // node.style.top = touch.pageY + "px";
    }
}

function slidemove(e)
{

    if(e.touches.length == 1) { // Only deal with one finger
        var touch = e.touches[0]; // Get the information for finger #1
        var parnode = touch.target.parentNode; // Find the node the drag started from
        var leftDelta = e.touches[0].clientX - this.startX;

        if(leftDelta < 0) {
            e.preventDefault();
            if(parnode.Selindx + parnode.Cols < parnode.img.length)
                parnode.Selindx += parnode.Cols;
            //alert(parnode.Selindx)
            CreateImage(parnode);
        //curX = e.targetTouches[0].pageX - startX;
        //curY = e.targetTouches[0].pageY - startY;
        //e.targetTouches[0].target.style.webkitTransform = 'translate(' + curX + 'px, ' + curY + 'px)';
        //nextclick();
        }
        else {
            e.preventDefault();
            if(parnode.Selindx - parnode.Cols >= 0 )
                parnode.Selindx -= parnode.Cols;

            // alert(parnode.Selindx)
            CreateImage(parnode);
        }
    }
}

/*###########################################################################*/
/*	NETWORK & AJAX STUFF                                                 */
/*###########################################################################*/

function sendRequest(callback, args, postData, srcHolder) {

    var req = createXMLHTTPObject();
   // alert("in request Ready form");
    if(req === null) {
     //   alert("no browser support for xmlhttp");
        return;
    }

    var method = (postData) ? "POST" : "GET";
   // var event = srcHolder || window.event;


    req.onreadystatechange = function () {
        if(req.readyState == 4)
        {
          //UnselectSegment(srcHolder);
//alert("insde reauwqest ready");
            if(httpSuccess(req))
            {

                if (req.responseText.indexOf("konyalert", 0) != -1)
                {

                    parsealert(req.responseText);
                }
                else if (req.responseText.indexOf("konysecurecall", 0) != -1)
                {
                    konysecurecall(req.responseText);
                }
                else
                {
                  // alert("second double href");
                    callback(req,srcHolder);
                }
                req = null;  //To avoid any memory leaks
            }
            else
            {
                alert('HTTP error ' + req.status);
                return;
            }
        }
    }
    var href = FindURL();

    if (args)
    {
        //alert("inside args folder");
        req.open(method || "GET", href, true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // req.setRequestHeader("Content-Length", args.length);
        //alert(href);
        //  alert(args);
        req.send(args.join("&"));
       // alert("double href");
    }
    else
    {
        req.open(method || "GET", href, true);
        req.send(null);


    }

}

function EncodeKonyForm()
{
    function encode(inputs)
    {
        for (var i = 0; i < inputs.length; ++i)
        {
            if(inputs[i].name && (inputs[i].type == "radio" || inputs[i].type == "checkbox")
                && inputs[i].checked) {
                args.push(inputs[i].name + "=" + escape(inputs[i].value));
            }
            else if (inputs[i].name && inputs[i].type != "submit" && inputs[i].type != "radio"
                && inputs[i].type != "checkbox")
                args.push(inputs[i].name + "=" + escape(inputs[i].value));
        }
    }

    var args=[];
    encode(document.getElementsByTagName("input"));
    encode(document.getElementsByTagName("select"));

    return args;
}

var XMLHttpFactories = [
function () {return new XMLHttpRequest();},
function () {return new ActiveXObject("Msxml2.XMLHTTP");},
function () {return new ActiveXObject("Msxml3.XMLHTTP");},
function () {return new ActiveXObject("Microsoft.XMLHTTP");}
];

function createXMLHTTPObject() {

    var xmlhttp = false;
    for (var i=0;i<XMLHttpFactories.length;i++) {
        try {
            xmlhttp = XMLHttpFactories[i]();
        }
        catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}

function httpSuccess(r) {
    try {
        // If no server status is provided, and we're actually
        // requesting a local file, then it was successful

        return !r.status && location.protocol == "file:" ||
        // Any status in the 200 range is good
        ( r.status >= 200 && r.status < 300 ) ||
        // Successful if the document has not been modified
        r.status == 304 ||
        // Safari returns an empty status if the file has not been modified
        navigator.userAgent.indexOf("Safari") >= 0 &&
        typeof r.status == "undefined";
    }
    catch(e){}
    // If checking the status failed, then assume that the request failed too
    return false;
}

function FindURL()
{

    var formelem = document.getElementsByTagName("form");
    // alert(formelem[0].getAttribute("action"));
    return (formelem[0].getAttribute("action"));
}

function konysecurecall(response)
{
    //alert("In KonySecureCall " + response);
    var url = response.substring(response.indexOf("url")+5,response.length - 4);
    window.location.href = url;
}

/*###########################################################################*/
/*	GLOBAL FUNCTIONS        				             */
/*###########################################################################*/

function isDefined(type) {
    return type != 'undefined' && type != 'unknown';
}

function IsValidNumber(ipNum)
{
    if(isNaN(ipNum))
    {
        alert("Invalid Number!");
        return false;
    }
    else if(ipNum < 1)
    {
        alert("Number should be greater than 0!");
        return false;
    }
    else
    {
        return true;
    }
}

/*###########################################################################*/
/*	KONYWIDGET FUNCTIONS        				             */
/*###########################################################################*/
/*konyalert msg="" title="" type=""*/
function parsealert(jsptext)
{
    // alert("in parse alert" + jsptext);
    var type = jsptext.substring(jsptext.indexOf("type")+5,jsptext.indexOf("msg"));
    var msg = jsptext.substring(jsptext.indexOf("msg")+5,jsptext.indexOf("title") - 1);
    //var title = jsptext.substring(jsptext.indexOf("title")+6,jsptext.length - 3);

    if(type.indexOf("confirmation") != -1)
    {
        //alert(formid+cacheid+node);
        konyconfirm(msg);
    }
    else if(type.indexOf("error") != -1 || type.indexOf("info") != -1)
    {
        //alert("In error Message");
        alert(msg);
        var elems=document.getElementsByTagName("form");
        var ele= document.createElement("input");
        ele.setAttribute("type","hidden");
        ele.setAttribute("name","alert_confirm_yes");
        ele.setAttribute("value","Yes");
        elems[0].appendChild(ele);
        var action = elems[0].getAttribute("action");
        elems[0].setAttribute("action", action+'/alert');
        elems[0].submit();
    }
/*
    else
    {
        alert(msg);
    }
*/

}

function konyconfirm(msg)
{

    var answer=confirm(msg);
    var elems=document.getElementsByTagName("form");
    var ele= document.createElement("input");
    ele.setAttribute("type","hidden");
    if (answer)
    {
        ele.setAttribute("name","alert_confirm_yes");
        ele.setAttribute("value","Yes");
    }
    else
    {
        ele.setAttribute("name","alert_confirm_no");
        ele.setAttribute("value","No");
    }
    elems[0].appendChild(ele);
    var action = elems[0].getAttribute("action");
    elems[0].setAttribute("action", action+'/alert');
    elems[0].submit();

}



//Image Category for Basic JS. 480, 320, 240.
function findImageCat(){
    var devicewidth = screen.width;
    var imagewidth = 480;
    if(devicewidth > 300 && devicewidth < 480)
        imagewidth = 320;
    else if(devicewidth <= 300){
        imagewidth = 240;
    }
    var args = EncodeWidgetdata('',false);
    args.push("imagecat=" + imagewidth);

    HandleImageData(imagewidth);

    sendRequest(DummyCallback, args, "POST");
    return true;
}

function DummyCallback(req){

    }
function HandleImageData(imagewidth){


    //Update CSS links to image width specific.
    var links = document.getElementsByTagName("link");
    var link;
    var href;
    for(j=0; j < links.length; j++){
        link = links[j];
        href = link.getAttribute("href");
        if(href.indexOf("konybasicxhtml") >= 0){
            href = href.replace("konybasicxhtml", "konybasicxhtml"+imagewidth);
            link.setAttribute("href",href);
            break;
        }
    }

    //Update images in document to image wisth specific.
    var images = document.getElementsByTagName('img');
    for(var j=0; j < images.length; j++){
        images[j].src = images[j].src.replace("images","images/"+imagewidth);
    }

    //Update images buttons in document to image wisth specific.
    var buttons = document.getElementsByTagName('input');
    for(var j=0; (j < buttons.length ); j++){
        if(buttons[j].type == "image"){
            buttons[j].src = buttons[j].src.replace("images","images/"+imagewidth);
        }
    }
}

function EncodeWidgetdata(parentobj,addType)
{
    var args=[];

    var formid =  document.getElementsByName("formid");
    if(formid){
    args.push("formid=" +  formid[0].getAttribute("value"));
    }

    var category = document.getElementsByName("cat");
    if(category && category.length > 0 ){
    args.push("cat=" +  category[0].getAttribute("value"));
    }

    var cacheid = document.getElementsByName("cacheid");
    if(cacheid && cacheid.length > 0){
    args.push("cacheid=" +  cacheid[0].getAttribute("value"));
    }

    var node = document.getElementsByName("node");
    if(node && node.length > 0){
    args.push("node=" +  node[0].getAttribute("value"));
    }
    
    //SUMA,Aug26,2011 Added the CSRF changes 
    var krfid = document.getElementsByName("krfid");
    if(krfid != null && krfid.length > 0){
    args.push("krfid=" +  krfid[0].getAttribute("value"));
    }

    if(addType){
    var wttype = parentobj.getAttribute("konywidgettype");
    args.push("wttype=" + wttype);

    var imggalid = parentobj.getAttribute("id");
    args.push("wid=" + imggalid);

    args.push("rtype=" + "01");
    args.push("kws=" + "true");
    }
    return args;
}


function UnselectSegment(segment)
{
    segment = segment || window.event;
    if(segment) {
        var target = gettarget(segment);
        var type = target.getAttribute("konywidgettype");
        if(type == "Ksegment")  {
            var link;
            if(segment.target)
            {
                link = findParent(segment.target, "a");
            }
            else if(segment.srcElement)
            {
                link=segment.srcElement;
            }
            link.removeAttribute("selected");
        }
        if(type == "Kbutton") {
            var butt = findParent(segment.target, "input");

            if(segment.target)
            {
                link = findParent(segment.target, "input");
            }
            else if(segment.srcElement)
            {
                link=segment.srcElement;
            }
            butt.removeAttribute("selected");
            butt.removeAttribute("disabled");

        }
    }
}


/*
Added inline calendar widget fucntions from konybasiccalendar.js 
*/

 function hideCalendar (calendarID){
            slideup(calendarID+"_calendar_widget");
            var caldrs=calendarID+"_calendar";
            var calbut=calendarID+"_but";
            var cal = document.getElementById(caldrs);
            var but = document.getElementById(calbut);
            cal.style.display="none";
            but.style.display="none";
        }
  function  updateCalendar (calendarID){

        slideup(calendarID+"_calendar_widget");
        var caldrs=calendarID+"_calendar";
        var calbut=calendarID+"_but";
        var calmnt=calendarID+"_inline_month";
        var calday=calendarID+"_inline_day";
        var calyer=calendarID+"_inline_year";
        var caltxtfld=calendarID+"_caltxtfld";
        var cal = document.getElementById(caldrs);
        var but = document.getElementById(calbut);
        cal.style.display="none";
        but.style.display="none";
        var tmpmn = document.getElementById(calmnt);
        var tmpyr = document.getElementById(calyer);
        var tmpdy = document.getElementById(calday);
        var tmphl = document.getElementById(caltxtfld);
        var mn = tmpmn.selectedIndex+1;
        var Year = tmpyr[tmpyr.selectedIndex].text;
        var day= tmpdy[tmpdy.selectedIndex].text
        var format=tmphl.getAttribute("format");
        var frmt=format.split("/",2);
        if(frmt[0]=="mm")
        tmphl.value=mn+"/"+day +"/"  +Year;
        else
        tmphl.value=day+"/"+mn +"/"  +Year;
    }

    function showCalendar(crid){

             slidedown(crid+"_calendar_widget");
           	var caldtxtfld=crid+"_caltxtfld";
                var calmnt=crid+"_inline_month";
                var calday=crid+"_inline_day";
                var calyer=crid+"_inline_year";
                var caltxtfldnode = document.getElementById(caldtxtfld);
                var tmpmn = document.getElementById(calmnt);
                var tmpyr = document.getElementById(calyer);
                var tmpdy = document.getElementById(calday);

                var format=caltxtfldnode.getAttribute("format");
                var frmt=format.split("/",2);
                var valuer = caltxtfldnode.value;
                var value=valuer.split("/",3);
                if(frmt[0]=="mm")
                {
                    tmpdy.selectedIndex=parseInt(value[1],10)-1;
                    tmpyr.selectedIndex=parseInt(value[2],10)-1900;
                    tmpmn.selectedIndex=parseInt(value[0],10)-1;
                }
                else
                {
                    tmpdy.selectedIndex=parseInt(value[0],10)-1;
                    tmpyr.selectedIndex=parseInt(value[2],10)-1900;
                    tmpmn.selectedIndex=parseInt(value[1],10)-1;
                }
                updateDaysforInlineMode(crid);

            var caldrs=crid+"_calendar";
            var calbut=crid+"_but";
            var cal = document.getElementById(caldrs);
            var but = document.getElementById(calbut);

            cal.style.display="block";
            but.style.display="block";
        }

    /**
	 * Verifies if the calendar widget has been placed in the page and if it is
	 * an inline calendar perform the initialization of the calendar widget.
	 */
    function checkCalendarwidget() {


        var inlineCalendarViewElement=document.getElementsByName("calendar_inline");

        // Verify if the inline view is
        if(inlineCalendarViewElement)
        {
            for(var i=0;i<inlineCalendarViewElement.length;i++)
            {
                var id= inlineCalendarViewElement[i].getAttribute( "id");

                var crid= id.split("_")[0];
                var caldtxtfld=crid+"_inlinemode";
                var calmnt=crid+"_inline_month";
                var calday=crid+"_inline_day";
                var calyer=crid+"_inline_year";
                var caltxtfldnode = document.getElementById(caldtxtfld);
                var tmpmn = document.getElementById(calmnt);
                var tmpyr = document.getElementById(calyer);
                var tmpdy = document.getElementById(calday);

                var format=caltxtfldnode.getAttribute("format");
                var frmt=format.split("/",2);
                var valuer = caltxtfldnode.value;
                var value=valuer.split("/",3);
                if(frmt[0]=="mm")
                {
                    tmpdy.selectedIndex=parseInt(value[1],10)-1;
                    tmpyr.selectedIndex=parseInt(value[2],10)-1900;
                    tmpmn.selectedIndex=parseInt(value[0],10)-1;
                }
                else
                {
                    tmpdy.selectedIndex=parseInt(value[0],10)-1;
                    tmpyr.selectedIndex=parseInt(value[2],10)-1900;
                    tmpmn.selectedIndex=parseInt(value[1],10)-1;
                }
                updateDaysforInlineMode(crid);
            }
        }

    }

    function updateDaysforInlineMode(crid){
        //var types = "inline_day,inline_month,inline_year";
        var calmnt=crid+"_inline_month";
        var calday=crid+"_inline_day";
        var calyer=crid+"_inline_year";

        var selection = document.getElementById(calyer);
        var year =  selection.options[selection.selectedIndex].value ;
        selection = document.getElementById(calmnt);
        var month = selection.selectedIndex;
        month = parseInt(month);
        selection = document.getElementById(calday);
        var day =  selection.options[selection.selectedIndex].value ;

        if(!isValidDate(day, month, year)){
            selection = document.getElementById(calday);
            selection.selectedIndex = 0;
            day=1;
        }
        updatedDaysInMonth(selection,daysInMonth(month+1, year));
        updateHiddenField  (crid,day,month,year);
    }

    function updatedDaysInMonth  (selection , days){
        if(!selection)
            return;
        var noofDays = selection.length;
        var i = 0;
        if(noofDays < days){
            i = noofDays +1;
            for(;i<=days;i++){
                var elOptNew = document.createElement('option');
                elOptNew.value =i ;
                elOptNew.text =i ;
                try
                {
                    selection.add(elOptNew,null);
                }
                catch(ex) {
                    selection.add(elOptNew); // IE only
                }
            }
        }else{
            for(i=noofDays-1;i >= days;i--)
            {
                selection.remove(i);
            }
        }

    }

    function updateHiddenField  (crid,day,month,year){
    	var caldtxtfld=crid+"_inlinemode";
        var caltxtfldnode = document.getElementById(caldtxtfld);
        if(caltxtfldnode){
        	month++;
        	if(month < 10){
        		month="0"+month;
        	}
  			 var format=caltxtfldnode.getAttribute("format");
  			var frmt=format.split("/",2);
  			if(frmt[0]=="mm")
  				caltxtfldnode.value = month+"/"+day +"/"  +year;
  			else
  	        	caltxtfldnode.value = day+"/"+month +"/"  +year;  	        
  		}
    }


