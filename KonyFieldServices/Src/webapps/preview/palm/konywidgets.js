/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

kony.widgets.Utils =
{

    /**
     * Calculates the page height scrolled by the user with respect to the current view port.
     */
    getScrolledHeight : function()
    {
        var isNetScape = (navigator.appName.indexOf("Netscape") != -1);
        var scrolledHeight  = isNetScape ? pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        return scrolledHeight;
    },

    /**
     * Retrieve the current view port height.
     */
    getViewPortHeight : function()
    {
        var isNetScape = (navigator.appName.indexOf("Netscape") != -1);
        var viewportHeight=isNetScape ? innerHeight : document.documentElement && document.documentElement.clientHeight ?document.documentElement.clientHeight : document.body.clientHeight;
        return viewportHeight;
    },

    /**
     *  Retrieve the current view port width.
     */
    getViewPortWidth : function()
    {
        var isNetScape = (navigator.appName.indexOf("Netscape") != -1);
        var viewportWidth = isNetScape ? innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
        return viewportWidth;
    },

    /**
     *  This function creates a Blocking UI using the skins specified against the selected element. i.e. the User clicked/selected
     *  widget ID.
     *
     */
    applyBlockUISkin:function(selectedElementID)
    {
        var domElement = new kony.dom.Element();

        var scrolledHeight = this.getScrolledHeight();

        var viewPortHeight = this.getViewPortHeight();

        var currentViewPortPosition = viewPortHeight + scrolledHeight-15;
        viewPortHeight = viewPortHeight/2 + scrolledHeight;

        var viewPortWidth = this.getViewPortWidth();

        viewPortWidth=viewPortWidth/2;

        // Retrieve the selected element
        var selectedElementNode =domElement.getElementByIDNS(selectedElementID);

        // Retrieve the Block UI skin associated with the selected Element.
        var blockuiskin=domElement.getAttributeValueNS(selectedElementNode, kony.constants.KONY_BLOCK_UI_SKIN);

        // Creating the block Div Placeholder. This will be added to the Body element so that the user can not perform
        // Any other action.

        var blockUIDivElement = document.createElement("div");
        blockUIDivElement.id = "blurDiv";
        blockUIDivElement.className=blockuiskin;

        var currentHiddenField =  domElement.getHiddenField("formid");
        var formId = domElement.getAttributeValueNS(currentHiddenField, "value");
        var height=domElement.getElementByIDNS(formId).offsetHeight;
        var tempHeight=Math.max(document.body.scrollHeight , document.body.offsetHeight);//window.innerHeight;//screen.availHeight;
        /* Name : Venkat
          * Date: 23/05/2011
          * Reason:Commented Since getting width and height of the image before actually changing the width to
          * an offset width and height
          * /

        /*if(height>tempHeight) // Covering the entire screen for appmenu if the form height is less than view port height
        {
            blockUIDivElement.style.height=height+"px";
        }
        else
        {
           blockUIDivElement.style.height=tempHeight+"px";
        } */
        blockUIDivElement.style.backgroundImage="none";

        var bodyElement = domElement.getBody();

        // Adding the blocking UI Div placeholder as a child to the body element.
        bodyElement.appendChild(blockUIDivElement);

        var el=domElement.getElementByIDNS("blurDiv");

        blockUIDivElement.style.backgroundImage="";
        var progressindicatorposition=document.defaultView.getComputedStyle(el, '').getPropertyValue("font-family");
        /* Name : Venkat
          * Date: 23/05/2011
          * Reason: Getting height and width of the blockui Image
        */
        var heightofimage=document.defaultView.getComputedStyle(el, '').getPropertyValue("height");
        var widthofimage=document.defaultView.getComputedStyle(el, '').getPropertyValue("width");
        heightofimage=heightofimage.replace("px","");
        widthofimage=widthofimage.replace("px","");
        blockUIDivElement.style.width="100%";
       //alert("progressindicator"+progressindicatorposition);
         if(height>tempHeight) // Covering the entire screen for appmenu if the form height is less than view port height
        {
            blockUIDivElement.style.height=height+"px";
        }
        else
        {
           blockUIDivElement.style.height=tempHeight+"px";
        }
        if(progressindicatorposition=="Helvetica") //For Centering the BlockUI image on top... top center
        {
            el.style.backgroundImage="";
            var ycoordofimg=0;
         /*   if(scrolledHeight>heightofimage)
            {
                ycoordofimg=scrolledHeight-heightofimage;
            }
            else
            {
                ycoordofimg=scrolledHeight;
            } */
            el.style.backgroundPosition="50% "+(scrolledHeight)+"px";
        }
        else if(progressindicatorposition=="Verdana") //For Centering the BlockUI image on middle... middle center
        {
            el.style.backgroundPosition="50% "+(viewPortHeight-(heightofimage/2))+"px";
        }
        else   //For Centering the BlockUI image on bottom... bottom center
        {
           // viewPortHeight=viewPortHeight*2;
             var yoffsetforbottom=this.getViewPortHeight()+scrolledHeight;
            el.style.backgroundPosition="50% "+(yoffsetforbottom-heightofimage)+"px";
        }

    },

    /**
     * Remove the Block UI Skin element if it is placed on the form.
     */
    removeBlockUISkin:function()
    {
         var domElement = new kony.dom.Element();

         var blockingPlaceHolder = domElement.getElementByIDNS("blurDiv");

         if(blockingPlaceHolder !=null)
            {
                    blockingPlaceHolder.parentNode.removeChild(blockingPlaceHolder);
            }

    },



    convertPhoneAlphabetToNumber:function(input){
        var inputlength = input.length;
        input = input.toLowerCase();
        var phonenumber = "";
        for (var i = 0; i < inputlength; i++) {
            var character = input.charAt(i);
            if(phonenumber.length > 10)
                break;
            switch(character) {
                case '0':
                    phonenumber+="0";
                    break;
                case '1':
                    phonenumber+="1";
                    break;
                case '2':
                    phonenumber+="2";
                    break;
                case '3':
                    phonenumber+="3";
                    break;
                case '4':
                    phonenumber+="4";
                    break;
                case '5':
                    phonenumber+="5";
                    break;
                case '6':
                    phonenumber+="6";
                    break;
                case '7':
                    phonenumber+="7";
                    break;
                case '8':
                    phonenumber+="8";
                    break;
                case '9':
                    phonenumber+="9";
                    break;
                /*case '-':
                    phonenumber+="-";
                    break;*/
                case  'a': case 'b': case 'c':
                    phonenumber+="2";
                    break;
                case  'd': case 'e': case 'f':
                    phonenumber+="3";
                    break;
                case  'g': case 'h': case 'i':
                    phonenumber+="4";
                    break;
                case  'j': case 'k': case 'l':
                    phonenumber+="5";
                    break;
                case  'm': case 'n': case 'o':
                    phonenumber+="6";
                    break;
                case  'p': case 'q': case 'r': case 's':
                    phonenumber+="7";
                    break;
                case  't': case 'u': case 'v':
                    phonenumber+="8";
                    break;
                case  'w': case 'x': case 'y': case 'z':
                    phonenumber+="9";
                    break;
            }
        }
        return phonenumber;
    },

    scrollInterface : (function(){
        var global = this;
        var notSetUp = true;
        var readScroll = {
            scrollLeft:NaN,
            scrollTop:NaN,
            clientHeight:NaN,
            clientWidth:NaN
        };
        var readScrollX = 'scrollLeft';
        var readScrollY = 'scrollTop';
        var readClientH = 'clientHeight';
        var readClientW = 'clientWidth';

        var itrface = {
            getScrollX:function(){
                return readScroll[readScrollX];
            },
            getScrollY:function(){
                return readScroll[readScrollY];
            },
            getClientH:function(){
                return readScroll[readClientH];
            },
            getClientW:function(){
                return readScroll[readClientW];
            }
        };

        function setUp(){
            if(typeof global.pageXOffset == 'number'){
                readScroll = global;
                readScrollY = 'pageYOffset';
                readScrollX = 'pageXOffset';
                readClientH = 'innerHeight';
                readClientW = 'innerWidth';
            }else{
                if((typeof document.compatMode == 'string')&&
                    (document.compatMode.indexOf('CSS') >= 0)&&
                    (document.documentElement)&&
                    (typeof document.documentElement.scrollLeft=='number')){
                    readScroll =  document.documentElement;
                }else if((document.body)&&
                    (typeof document.body.scrollLeft == 'number')){
                    readScroll =  document.body;
                }
            }
            notSetUp = false; //No need to repeat configuration.
        }
        return (function(){
            if(notSetUp){ //If the - notSetUp - variable is still true.
                setUp();  //Execute the - setUp - function.
            }
            return itrface; //returns a reference to - itrface
        });
    })()()

}

kony.widgets.Utils.TouchHandlers = {
    getTouchParent : function(node){
        while (node && ((node.getAttribute("konywidgettype")
            && node.getAttribute("konywidgettype").indexOf("Touch") == -1 )
            || !node.getAttribute("konywidgettype")) ){
            node = node.parentNode;
            if(node && node.nodeName=='FORM')
                return null;
        }
        return node;
    },

    eventNames : {
        touchstart : "touchstart",
        touchmove : "touchmove",
        touchend : "touchend"
    },

    init : function (){
        if (!kony.supports.Touch) {
             kony.widgets.Utils.TouchHandlers.eventNames = {
                touchstart : "mousedown",
                touchmove : "mousemove",
                touchend : "mouseup"
             }
        }
    }
}
kony.widgets.Utils.TouchHandlers.init();

kony.widgets.Utils.TouchHandlers.Swipe = {

    startXCoordinate : null,
    startYCoordinate : null,
    distanceMovedInXDirection : null,
    distanceMovedInYDirection : null,
    horizontalDirectionMoved : null,
    widgetTouchHandler : null,
    swipeTime : 1000,
    startTime : null,

    cancelTouch: function(target)
    {
        var swipe = kony.widgets.Utils.TouchHandlers.Swipe;
        target = kony.widgets.Utils.TouchHandlers.getTouchParent(target);
        if(target){
            kony.events.KEventManager.removeEventListener(target,kony.widgets.Utils.TouchHandlers.eventNames.touchmove,swipe.onTouchMove);
        }
        swipe.startXCoordinate = null;
        swipe.startYCoordinate = null;
        swipe.horizontalDirectionMoved = null;
    },

    onTouchMove: function(eventSource)
    {

        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object
        var swipe = kony.widgets.Utils.TouchHandlers.Swipe;

        var targetElement = domElement.getEventTarget(eventSource);

        var target = kony.widgets.Utils.TouchHandlers.getTouchParent(targetElement);

        if(target){
            var touch = eventSource;
            if(eventSource.touches){
                touch = eventSource.touches[0];
            }

            swipe.distanceMovedInXDirection = touch.pageX - swipe.startXCoordinate;
            swipe.distanceMovedInYDirection = touch.pageY - swipe.startYCoordinate;

            var timeLag = Date.now() - swipe.startTime;

            var absdistanceMovedInXDirection = Math.abs(swipe.distanceMovedInXDirection);
            var absdistanceMovedInYDirection = Math.abs(swipe.distanceMovedInYDirection);
            if (absdistanceMovedInYDirection - absdistanceMovedInXDirection > 3
                || timeLag > swipe.swipeTime) {
                return false;
            }else{
                if (absdistanceMovedInXDirection > 30 && absdistanceMovedInXDirection > absdistanceMovedInYDirection) {
                    swipe.cancelTouch(targetElement);
                    swipe.widgetTouchHandler({
                        "target": targetElement,
                        "direction": swipe.distanceMovedInXDirection > 0 ? 'right' : 'left',
                        "eventType": "swipe",
                        "eventSource": eventSource
                    });

                    if(eventSource.preventDefault)
                        eventSource.preventDefault();
                    return true;
                }
            }
        }else{
            swipe.cancelTouch(targetElement);
        }
    },

    onTouchStart : function(eventSource, widgetTouchHandler)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;
        var target = domElement.getEventTarget(eventSource);
        target = kony.widgets.Utils.TouchHandlers.getTouchParent(target);
        if(target){
            //For IE where window.event is global object
            var swipe = kony.widgets.Utils.TouchHandlers.Swipe;

            swipe.widgetTouchHandler = widgetTouchHandler;

            swipe.startTime = Date.now();
            swipe.distanceMovedInXDirection = 0;
            var touch = eventSource;
            if(eventSource.touches){
                touch = eventSource.touches[0];
            }
            swipe.startXCoordinate = touch.pageX;
            swipe.startYCoordinate = touch.pageY;

            kony.events.KEventManager.addEventListener(target,kony.widgets.Utils.TouchHandlers.eventNames.touchmove,swipe.onTouchMove);
             //target.addEventListener('touchend', swipe.onTouchEnd, false);
            if(eventSource.stopImmediatePropagation)
                eventSource.stopImmediatePropagation();
        }
    }
}

kony.widgets.Form = {

    loadHandler: function()
    {
        /**
         * Set the Body skin using the skin attribute provided in the form
         */
        var domElement = new kony.dom.Element();
        /**
         *Update skin of body with first form skin.
         */
        var currentForm = domElement.getForm(1);
        if (currentForm){

            // Retrieve the form skin and set the same to the body
            var formSkin = domElement.getAttributeValueNS(currentForm, "formskin");
            if (formSkin){
                 domElement.getBody().className = formSkin;
            }else{
                domElement.getBody().className = 'konyform';
            }
        }


        /**
         * Set the Title of the TitleBar element  for IPhone
         */
        var titlebar = domElement.getElementByIDNS("konytitlebar");

        if(!titlebar){
            var title = domElement.getElementByNameNS("konyformtitle");
            if(title && title.value != 'null'){
            document.title = title.value;
          }
    }


    },

    registerWidget: function()
    {
       /* var formEvent = new kony.events.KEvent("touchmove", "Kform", this.formEventHandler);
        //kony.print("Inside form widget Initilaization");
        kony.events.KEventManager.registerEvent(formEvent);*/
    },

    formEventHandler : function(eventSource)
    {
        //alert('imran move');
        var e1 = document.getElementsByTagName("form");
        var appmenudivid=e1[e1.length-1].getAttribute("id");
        appmenudivid=appmenudivid+"konyappmenudiv";
        var ele=document.getElementById(appmenudivid)
        ele.style.display="none";
    }

}


kony.widgets.Button = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the button widget.
     */
    registerWidget: function()
    {
         var buttEvent = new kony.events.KEvent("click", "Kbutton", this.buttonEventHandler);
         //kony.print("Inside button widget Initilaization");
         kony.events.KEventManager.registerEvent(buttEvent);
    },



    buttonEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);

        if (target)
        {
            var buttonid = domElement.getAttributeValueNS(target, "id");
            //Murty Jan 23, 2012: Added external submit support
            var externalAction = target.getAttribute("externalSubmitAction");
            if(externalAction) {
                document.forms[0].action = externalAction;
                document.forms[0].submit();
                return;
            }

            var isEvent = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);
            if (isEvent && isEvent.indexOf("yes") != -1 && target.disabled != true)
            {   
                var blockinskin = domElement.getAttributeValueNS(target,kony.constants.KONY_BLOCK_UI_SKIN);

                // Setting the progress indicator.
                target.setAttribute("selected", "progress");

                if(blockinskin && blockinskin.length>0)
            {
                    kony.widgets.Utils.applyBlockUISkin(buttonid);
                }

                var postData = kony.data.encodeFormData();
               // //kony.print(postData);
                postData.push(buttonid + "event_=x");

                var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)


                // Before making the AJAX call to handle the button event, register for the button unload event
                var buttUnloadEvent = new kony.events.KUnloadEvent(buttonid, "Kbutton", kony.widgets.Button.unloadEventHandler);
                kony.addGlobal(kony.constants.SELECTED_ITEM, buttUnloadEvent);

                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                
                kony.net.ajax.openReq(ajaxConfig, postData, null, null, eventSource);

            }

        }

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");

        kony.widgets.Utils.removeBlockUISkin();
    }

}

kony.widgets.Link = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the Link widget.
     */
    registerWidget: function()
    {
         var linkEvent = new kony.events.KEvent("click", "Klink", this.linkEventHandler);
         //kony.print("Inside link widget Initilaization");
         kony.events.KEventManager.registerEvent(linkEvent);
    },



    linkEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        if(target.getAttribute("kdisabled") != null)
        {
            return;
        }
        if (target)
        {            
            var linkid = domElement.getAttributeValueNS(target, "id");
            var externalAction = target.getAttribute("externalSubmitAction");
            if(externalAction) {
                document.forms[0].action = externalAction;
                document.forms[0].submit();
                return;
            }            

            var isEvent = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);
            if (isEvent && isEvent.indexOf("yes") != -1)
            {                   
                var blockinskin = domElement.getAttributeValueNS(target,kony.constants.KONY_BLOCK_UI_SKIN);


                if(blockinskin && blockinskin.length>0)
                {
                   kony.widgets.Utils.applyBlockUISkin(linkid);
                }
                
                var progressskin=domElement.getAttributeValueNS(target, "kprogressskin");
                if(progressskin &&  progressskin.length>0 ){
                    target.setAttribute("selected", "progress");
                }		                

                var postData = kony.data.encodeFormData();
               // //kony.print(postData);
                postData.push(linkid + "event_=x");

                var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)


                // Before making the AJAX call to handle the link event, register for the button unload event
                var linkUnloadEvent = new kony.events.KUnloadEvent(linkid, "Klink", kony.widgets.Link.unloadEventHandler);
                kony.addGlobal(kony.constants.SELECTED_ITEM, linkUnloadEvent);

                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
               
                kony.net.ajax.openReq(ajaxConfig, postData, null, null, eventSource);
            }

        }

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");


        kony.widgets.Utils.removeBlockUISkin();
    }

}

kony.widgets.Appmenu = {

    KONY_APP_MENU : "konyappmenudiv",

    loadHandler: function()
    {
        if(this.checkForAppMenu())
        {
        	 var domElement = new kony.dom.Element();
             var currentForm = domElement.getCurrentForm();

             // Retrieve the app menu associated with the form.
             var appMenuNode = domElement.getElementByIDNS(currentForm.id + this.KONY_APP_MENU);

             this.floatAppMenu(this.KONY_APP_MENU,0,-(appMenuNode.offsetHeight)).floatIt();
        }
    },

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the Appmenu widget.
     */
    registerWidget: function()
    {
         var appmenuEvent = new kony.events.KEvent("click", "Kappmenu", this.appmenuEventHandler);
         //kony.print("Inside Appmenu widget Initilaization");
         kony.events.KEventManager.registerEvent(appmenuEvent);
         /*
         var appmenuTouchmoveEvent = new kony.events.KEvent("touchstart", "Kappmenu", this.appmenuTouchmoveEventHandler);
         //kony.print("Inside Appmenu widget Initilaization ( Touch move )");
         kony.events.KEventManager.registerEvent(appmenuTouchmoveEvent);
        */
    },



    appmenuEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var link =  domElement.getParent(target, "a");
        if(link)
        {
            var isEvent = domElement.getAttributeValueNS(link, kony.constants.KONY_EVENT);
            if (isEvent && isEvent.indexOf("yes") != -1)
            {
                var  menuid = link.getAttribute("id");
                var  index = link.getAttribute("index");

                var postData = kony.data.encodeFormData();
                 /* Name : R.venkat Rajeshwar Rao
                    Date:29/06/2011
                    Reason: Added =x as it is not appearing in request attributes...
                 */
                postData.push(menuid + "." + index + ".event_.kappmenu=x");
                var  menumore = link.getAttribute("appmenumore");

                if(menumore && menumore.indexOf("true") != -1) {
                    postData.push("appmenumore=true");
                }

                var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION);

                // Before making the AJAX call to handle the appmenu event, register for the button unload event
                var appmenuUnloadEvent = new kony.events.KUnloadEvent(menuid, "Kappmenu", kony.widgets.Appmenu.unloadEventHandler);
                if(appmenuUnloadEvent.kWidgetID !=null)
                kony.addGlobal(kony.constants.SELECTED_ITEM, appmenuUnloadEvent);

                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                kony.net.ajax.openReq(ajaxConfig, postData, null, null);
            }
        }


  },

   appmenuTouchmoveEventHandler : function(eventSource)
   {
        /*
        alert('imran move');
        var e1 = document.getElementsByTagName("form");
        var appmenudivid=e1[e1.length-1].getAttribute("id");
        appmenudivid=appmenudivid+"konyappmenudiv";
        var ele=document.getElementById(appmenudivid)
        ele.style.display="none";
       */
   },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");


        kony.widgets.Utils.removeBlockUISkin();
    },

    /**
     * Verifies if appmenu is part of the form or not.
     */
    checkForAppMenu:function()
    {

        var domElement = new kony.dom.Element();
        var currentForm = domElement.getCurrentForm();

        // Retrieve the app menu associated with the form.
        var appMenuNode = domElement.getElementByIDNS(currentForm.id + this.KONY_APP_MENU);

        //Presence of appmenu has childNodes more than 1
        if(appMenuNode && appMenuNode.childNodes.length > 1)
            return true;
        else
            return false;
    },

    floatAppMenu:function(id, sx, sy)
    {
        var d = document;
        var targetFormID;
        var formEleArray = d.getElementsByTagName("form");
        for(var fe=0; fe < formEleArray.length; fe++)
         {
               var formEle = formEleArray[fe];
               if (formEle.getAttribute("selected") && formEle.getAttribute("selected") == "true")
               {
                   targetFormID = formEle.getAttribute("id");

               }
         }


        id = targetFormID + id;

        var ns = (navigator.appName.indexOf("Netscape") != -1);
        var el=d.getElementById?d.getElementById(id):d.all?d.all[id]:d.layers[id];
        var px = document.layers ? "" : "px";


        window[id + "_obj"] = el;
        if(d.layers)
        {
            el.style=el;
        }

        el.cx = el.sx = sx;
        el.cy = el.sy = sy;
        var ctr = 0;

        el.sP=function(x,y)
        {
        this.setAttribute("style",'');
        this.style.position = "absolute";
        this.style.left=x+px;
        this.style.top=y+px;
        this.style.width = "100%";
        };


        el.floatIt=function()
        {
        var pX, pY;

        pX = (this.sx >= 0) ? 0 : ns ? innerWidth :
        document.documentElement && document.documentElement.clientWidth ?
        document.documentElement.clientWidth : document.body.clientWidth;


        pY = ns ? pageYOffset : document.documentElement &&
        document.documentElement.scrollTop ?
        document.documentElement.scrollTop : document.body.scrollTop;



        if(this.sy<0)
        pY += ns ? innerHeight : document.documentElement &&
        document.documentElement.clientHeight ?
        document.documentElement.clientHeight : document.body.clientHeight;

        this.cx += (pX + this.sx - this.cx);
        this.cy += (pY + this.sy - this.cy);
        var backbuttonpress = false;
        if(!backbuttonpress)
        this.sP(this.cx, this.cy);
        else
        this.sP(0,-35);

        setTimeout(this.id + "_obj.floatIt()", 300);

        }


       // alert("exit jsfx_floatdiv");
        return el;
    }

}




kony.widgets.CheckBoxGroup = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the CheckBoxGroup widget.
     */
    registerWidget: function()
    {
         var checkboxgroupEvent = new kony.events.KEvent("click", "Kcheckboxgroup", this.checkboxgroupEventHandler);
         //kony.print("Inside CheckBoxGroup widget Initilaization");
         kony.events.KEventManager.registerEvent(checkboxgroupEvent);
    },



    checkboxgroupEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);

        if (target)
        {
            // alert("in checkbox");
            var  checkboxid = target.getAttribute("id");
            var checked = new Array();
            var tempVal = "";
            var checkboxArray = document.getElementsByName(checkboxid);
            var checkbox = null;
            for(var i=0, size =  checkboxArray.length; i < size; i++){
                    checkbox = checkboxArray[i];
                    if(checkbox.checked){
                            tempVal = checkbox.getAttribute("value");
                       checked.push(tempVal);
                    checkbox.setAttribute("checked","");
                    }else{
                            checkbox.removeAttribute("checked");
                    }
            }
            
            var isEvent = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);
            if (isEvent && isEvent.indexOf("yes") != -1)
            {

                var postData = kony.data.encodeFormData();
               // //kony.print(postData);
                postData.push(checkboxid + "event_="+checked.toString());

                var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)


                // Before making the AJAX call to handle the check box group event, register for the button unload event
                var checkboxgroupUnloadEvent = new kony.events.KUnloadEvent(checkboxid, "Kcheckboxgroup", kony.widgets.CheckBoxGroup.unloadEventHandler);
                kony.addGlobal(kony.constants.SELECTED_ITEM, checkboxgroupUnloadEvent);

                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);

                kony.net.ajax.openReq(ajaxConfig, postData, null, null, eventSource);


            }

        }

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");


        kony.widgets.Utils.removeBlockUISkin();
    }

}

kony.widgets.RadioButtonGroup = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the RadioButtonGroup widget.
     */
    registerWidget: function()
    {
         var radiobuttongroupEvent = new kony.events.KEvent("click", "Kradiobuttongroup", this.radiobuttongroupEventHandler);
         //kony.print("Inside RadioButtonGroup widget Initilaization");
         kony.events.KEventManager.registerEvent(radiobuttongroupEvent);
    },



    radiobuttongroupEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);

        if (target)
        {
            var  radioGroupid = target.getAttribute("id");
            var checked = new Array();
            var tempVal = "";
            var radioGroupArray = document.getElementsByName(radioGroupid);
            var radioButton = null;
            for(var i=0, size =  radioGroupArray.length; i < size; i++){
                radioButton = radioGroupArray[i];
                if(radioButton.checked){
                        tempVal = radioButton.getAttribute("value");
                        radioButton.setAttribute("checked","");
                        checked.push(tempVal);
                }else{
                        radioButton.removeAttribute("checked");
                }
            }

            var isEvent = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);
            if (isEvent && isEvent.indexOf("yes") != -1)
            {

                var postData = kony.data.encodeFormData();
               // //kony.print(postData);
                postData.push(radioGroupid + "event_="+checked.toString());

                var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)


                // Before making the AJAX call to handle the radio button group event, register for the button unload event
                var radiobuttongroupUnloadEvent = new kony.events.KUnloadEvent(radioGroupid, "Kradiobuttongroup", kony.widgets.CheckBoxGroup.unloadEventHandler);
                kony.addGlobal(kony.constants.SELECTED_ITEM, radiobuttongroupUnloadEvent);

                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);

                kony.net.ajax.openReq(ajaxConfig, postData, null, null, eventSource);
            }

        }

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");


        kony.widgets.Utils.removeBlockUISkin();
    }

}



kony.widgets.ListBox = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the ListBox widget.
     */
    registerWidget: function()
    {
         var listboxEvent = new kony.events.KEvent("change", "Klistbox", this.listboxEventHandler);
         //kony.print("Inside ListBox widget Initilaization");
         kony.events.KEventManager.registerEvent(listboxEvent);
    },



    listboxEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);

        if (target)
        {
            var  listboxid = target.getAttribute("id");

            var selected = new Array();
            var optionsArray = target.options;
            var option = null;
            for(var j=0, size =  optionsArray.length; j < size; j++){
                    option = optionsArray[j];
                    if(option.selected){
                            selected.push(j);
                    }
            }

            var isEvent = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);
            if (isEvent && isEvent.indexOf("yes") != -1)
            {
                var blockinskin = domElement.getAttributeValueNS(target,kony.constants.KONY_BLOCK_UI_SKIN);

                if(blockinskin && blockinskin.length>0)
            {
                    kony.widgets.Utils.applyBlockUISkin(listboxid);
                }


                var postData = kony.data.encodeFormData();
               // //kony.print(postData);
                postData.push(listboxid + "event_="+selected.toString());

                var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)


                // Before making the AJAX call to handle the radio button group event, register for the button unload event
                var listboxUnloadEvent = new kony.events.KUnloadEvent(listboxid, "listbox", kony.widgets.CheckBoxGroup.unloadEventHandler);
                kony.addGlobal(kony.constants.SELECTED_ITEM, listboxUnloadEvent);

                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);

                kony.net.ajax.openReq(ajaxConfig, postData, null, null, eventSource);



            }

        }

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");


        kony.widgets.Utils.removeBlockUISkin();
    }

}

kony.widgets.ComboBox = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the ComboBox widget.
     */
    registerWidget: function()
    {
         var comboboxEvent = new kony.events.KEvent("change", "Kcombobox", this.comboboxEventHandler);
         //kony.print("Inside ComboBox widget Initilaization");
         kony.events.KEventManager.registerEvent(comboboxEvent);
    },



    comboboxEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);

        if (target)
        {
            var  comboboxid = target.getAttribute("id");
            
            var isEvent = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);
            if (isEvent && isEvent.indexOf("yes") != -1)
            {

                var postData = kony.data.encodeFormData();
                var val = target.value;

                var blockinskin = domElement.getAttributeValueNS(target,kony.constants.KONY_BLOCK_UI_SKIN);

                if(blockinskin && blockinskin.length>0)
            {
                    kony.widgets.Utils.applyBlockUISkin(comboboxid);
                }

                postData.push(comboboxid + "event_="+val);

                var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)

                // Before making the AJAX call to handle the radio button group event, register for the button unload event
                var comboboxUnloadEvent = new kony.events.KUnloadEvent(comboboxid, "combobox", kony.widgets.CheckBoxGroup.unloadEventHandler);
                kony.addGlobal(kony.constants.SELECTED_ITEM, comboboxUnloadEvent);

                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
         
                kony.net.ajax.openReq(ajaxConfig, postData, null, null, eventSource);


            }

        }

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");


        kony.widgets.Utils.removeBlockUISkin();
    }

}

kony.widgets.ClearButton = {
    registerWidget: function()
    {
        var textfieldClearButtonEvent = new kony.events.KEvent("click", "Kclearbutton", this.textfieldClearButtonEventHandler);
         //kony.print("Inside TextField Clear button initialization Initilaization");
         kony.events.KEventManager.registerEvent(textfieldClearButtonEvent);
    },

    textfieldClearButtonEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var searchbuttonid=target.getAttribute("id");
        var searchboxid=searchbuttonid.replace("searchbutton","searchbox");
        var tb = document.getElementById(searchboxid);
        tb.value="";
        target.style.display ="none";
    }
}

kony.widgets.TextField = {


    goeventTriggerd:null,  // This value holds the information if the go has been clicked by the user. This is prevent double submission when go is clicked twice
    focusedTextfieldId:null,


    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the TextField widget.
     */
    registerWidget: function()
    {
         /*
         var textfieldEvent = new kony.events.KEvent("click", "Ktextfield", this.textfieldClickEventHandler);
         //kony.print("Inside TextField widget Initilaization");
         kony.events.KEventManager.registerEvent(textfieldEvent);
        */

         var textfieldGoButtonEvent = new kony.events.KEvent("keydown", "Ktextfield", this.textfieldGoButtonEventHandler);
         //kony.print("Inside TextField widget go button initialization Initilaization");
         kony.events.KEventManager.registerEvent(textfieldGoButtonEvent);

         var textfieldKeyUpEvent = new kony.events.KEvent("keyup", "Ktextfield", this.textfieldKeyUpEventHandler);
         //kony.print("Inside TextField textfield Key Up initialization Initilaization");
         kony.events.KEventManager.registerEvent(textfieldKeyUpEvent);
         
         var textfieldFocusEvent = new kony.events.KEvent("focus", "Ktextfield", this.textfieldFocusEventHandler);         
         kony.events.KEventManager.registerEvent(textfieldFocusEvent);
         
         var textfieldBlurEvent = new kony.events.KEvent("blur", "Ktextfield", this.textfieldBlurEventHandler);
         kony.events.KEventManager.registerEvent(textfieldBlurEvent);
         
         this.computeTextFieldEvents();    

       
    },
    
    computeTextFieldEvents : function()
    {
        var konyElement = new kony.dom.Element();
        var textfieldElements = document.getElementsByTagName("input");
        if(textfieldElements)
        {
            for(var i=0; i<textfieldElements.length; i++ )
            {
            var widgetType = konyElement.getAttributeValueNS(textfieldElements[i], kony.constants.KONY_WIDGET_TYPE);
                if(widgetType == "Ktextfield")
                {
                    var isblur = konyElement.getAttributeValueNS(textfieldElements[i], "onendediting");
                    if(isblur)
                    {
                        kony.events.KEventManager.addEventListener(textfieldElements[i],'blur',this.textfieldBlurEventHandler);
                    }
                    var isfocus = konyElement.getAttributeValueNS(textfieldElements[i], "onbeginediting");
                    if(isfocus)
                    {
                        kony.events.KEventManager.addEventListener(textfieldElements[i],'focus',this.textfieldFocusEventHandler);
                    }
                }
            }
        }
    },
                
    textfieldFocusEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object
        var target = domElement.getEventTarget(eventSource);
        var value = target.value;
        value = value.ltrim();
        var eventid = target.getAttribute("id");
        var onbeginediting = domElement.getAttributeValueNS(target, "onbeginediting");
        if(onbeginediting && window[onbeginediting])
            window[onbeginediting](eventSource);                                    
    },
    textfieldBlurEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object
        var target = domElement.getEventTarget(eventSource);
        var onendediting = domElement.getAttributeValueNS(target, "onendediting");
        if(onendediting && window[onendediting])
                        window[onendediting](eventSource); 
    },	
            
    textfieldClickEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);

        if (target)
        {
            var placeholder = target.getAttribute("placeholder");
                        //alert(placeholder);
            if(placeholder && (placeholder == target.value) ) {
                this.focusedTextfieldId = target.getAttribute("id");
                target.value = "";
            }

        }

  },
  textfieldGoButtonEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object
        if(eventSource.keyCode == 10 || eventSource.keyCode == 13){
            var target = domElement.getEventTarget(eventSource);
            var konywidgettype = target.getAttribute("konywidgettype")
            if (konywidgettype && (konywidgettype == "Ktextfield")){
                if (eventSource.stopPropagation)
                        eventSource.stopPropagation();
                if (eventSource.preventDefault)
                    eventSource.preventDefault();
                else
                    eventSource.returnValue = false;
               var blockinskin=target.getAttribute(kony.constants.KONY_BLOCK_UI_SKIN);
               var eventName =  domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);
               if(eventName && (eventName !== null))
                {
                    if(this.goeventTriggerd != target) {
                        var eventid = target.getAttribute("id");
                        var postData = kony.data.encodeFormData();
                        postData.push("goeventsrc="+eventid);
                        postData.push(eventid + "event_=x");
                        if(blockinskin && blockinskin.length>0)
                        {
                            kony.widgets.Utils.applyBlockUISkin(eventid);
                        }

                        document.getElementById(eventid).blur();

                        var currentForm = domElement.getCurrentForm();
                        var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION);


                        var textfieldUnloadEvent = new kony.events.KUnloadEvent(eventid, "Ktextfield", kony.widgets.TextField.unloadEventHandler);
                        kony.addGlobal(kony.constants.SELECTED_ITEM, textfieldUnloadEvent);

                        var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                        kony.net.ajax.openReq(ajaxConfig, postData, null, null,eventSource);
                    }
                }
                else {
                    return false;
                }
            }
            if(this.goeventTriggerd != target){
               this.goeventTriggerd = target;
            }
            return false;
        }else{
             this.goeventTriggerd = null;
        }
        return true;
    },
    textfieldKeyUpEventHandler : function(eventSource)
    {

        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        //Added code to display clear button for search box
        var target = domElement.getEventTarget(eventSource);

        var searchboxid=target.getAttribute("id");
        var searchattr=target.getAttribute("search");
        if(searchattr) {
            var searchbuttonid="Ksearchbutton"+searchboxid;
            var subbut = document.getElementById(searchbuttonid);

            var val = target.value;

            if(val.length ==0)
            {
                subbut.style.display ="none";
            }
            else
                subbut.style.display ="inline-block";
        }
        
        var ischangeeventjs =  domElement.getAttributeValueNS(target, "ontextchangejs");
        if(window[ischangeeventjs]) {
           window[ischangeeventjs](eventSource);
           return;
        }


        var ischangeevent =  domElement.getAttributeValueNS(target, "onchangeevent");
        var textfieldid = domElement.getAttributeValueNS(target, "id");

        if(ischangeevent && (ischangeevent.indexOf("yes") != -1)) {
            var value = target.value;
            value = value.ltrim();
            if(value.length == 3){
                //this.textchanged = value;
                var postData = kony.data.encodeWidgetData(target,true);
                var eventName =  domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT_NAME);
                postData.push(eventName + "="+value);
                postData.push("event="+value);
                var progressskin=domElement.getAttributeValueNS(target, "kprogressskin");
                if(progressskin &&  progressskin.length>0 ){
                    target.setAttribute("selected", "progress");
                }

                 var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION);


                var textfieldUnloadEvent = new kony.events.KUnloadEvent(textfieldid, "Ktextfield", kony.widgets.TextField.unloadEventHandler);
                kony.addGlobal(kony.constants.SELECTED_ITEM, textfieldUnloadEvent);

                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                kony.net.ajax.openReq(ajaxConfig, postData, null, kony.widgets.TextField.HandleTextFieldFilterData,eventSource);

                //sendRequest(HandleTextFieldFilterData, postData, "POST", eventSource);

            }else if(value.length < 3){
                kony.widgets.TextField.AutoComplete.AutoComplete_RemoveDivs(textfieldid);
            }
        }
    },
    HandleTextFieldFilterData: function(response, eventSource){
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var textfieldId = target.getAttribute("id");
        var kprgskin = target.getAttribute("kprogressskin");
        if(kprgskin && kprgskin.length > 0){
            target.removeAttribute("selected");
        }
        var value = target.value;
        value = value.ltrim();
        if(value.length <3 )
         return;

        if(response.responseText.length > 0) {
            var filterlist = eval('(' + response.responseText + ')');
            var data = filterlist.data;

            kony.widgets.TextField.AutoComplete.AutoComplete_Create(textfieldId, data,8);
            kony.widgets.TextField.AutoComplete.AutoComplete_ShowDropdown(textfieldId);
        }
    },
    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {

        this.goeventTriggerd = null;

        kony.widgets.Utils.removeBlockUISkin();
    }

}

kony.widgets.Tab = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the Tab widget.
     */
    registerWidget: function()
    {
         var tabEvent = new kony.events.KEvent("click", "Ktab", this.tabEventHandler);
         //kony.print("Inside Tab widget Initilaization");
         kony.events.KEventManager.registerEvent(tabEvent);
    },

    tabEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        
        if (target)
        {
            var isEvent = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);
            if (isEvent && isEvent.indexOf("yes") != -1)
            {
                var  linkid = target.getAttribute("id");
                var tabpaneid = target.getAttribute("tabpane");
                var tabctr = target.getAttribute("tabctr");


               // var args = EncodeWidgetdata(target,false,true);

                var postData = kony.data.encodeGenericData();

                postData.push("tabevent="+tabpaneid);
                postData.push("tabview="+linkid);
                postData.push("tabctr="+tabctr);


                var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)


                // Before making the AJAX call to handle the radio button group event, register for the button unload event
                var tabUnloadEvent = new kony.events.KUnloadEvent(linkid, "tab", kony.widgets.Tab.unloadEventHandler);
                kony.addGlobal(kony.constants.SELECTED_ITEM, tabUnloadEvent);
                
                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                kony.net.ajax.openReq(ajaxConfig, postData, null, null, eventSource);
            }
        }
  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        //widget.removeAttribute("selected");
        //widget.removeAttribute("disabled");
    }

}

kony.widgets.CollapsibleTab = {

    /**
     * Variables
     */

    PANEL_ANIMATION_DELAY : 2,
    PANEL_ANIMATION_STEPS : 1,
    panelsStatus:{},
    /**
     * Pre register checks
     */
    loadHandler: function(){

    var headingTags = document.getElementsByTagName("div");
    for (var i=0; i<headingTags.length; i++)
    {
        var el = headingTags[i];
        if (!el.getAttribute("tabheader"))
            continue;
        var name = el.firstChild.nodeValue;
        if (this.panelsStatus[name] == "false")
                    el.parentNode.className = "panelcollapsed";
        else
        if (this.panelsStatus[name] == "true")
            el.parentNode.className = "panel";
        el.onclick = function(event)
        {
            var target    = this.parentNode;
            var name      = this.firstChild.nodeValue;
            var collapsed = (target.className == "panelcollapsed");
            var panelsData = [];
            var toggletabs = document.getElementById("toggletabs");
            if(toggletabs && toggletabs.value == "true")
                setTimeout(function(){kony.widgets.CollapsibleTab.mutualExclusive(target, collapsed)}, this.PANEL_ANIMATION_DELAY);
            kony.widgets.CollapsibleTab.animateTogglePanel(target, collapsed);
        };
    }
    },
    animateTogglePanel: function(panel, expanding){
        var elements = panel.getElementsByTagName("div");
    var panelContent = null;
        var imgElement = null;
        var imgid = panel.id + "img";
    for (var i=0; i<elements.length; i++)
    {
            if(elements[i].firstElementChild != null
                        && elements[i].firstElementChild.id == imgid)
                {
                    imgElement = elements[i].firstElementChild;
                }
        if (elements[i].className == "panelcontent")
        {
            panelContent = elements[i];
            break;
        }
    }
    panelContent.style.display = "block";
    var contentHeight = panelContent.offsetHeight;
    if (expanding)
        panelContent.style.height = "0px";

    var stepHeight = contentHeight / this.PANEL_ANIMATION_STEPS;
    var direction = (!expanding ? -1 : 1);

    setTimeout(function(){kony.widgets.CollapsibleTab.animateStep(panelContent,1,stepHeight,direction, imgElement)}, this.PANEL_ANIMATION_DELAY);
    },
    mutualExclusive : function(panel, expanding){
       var domElement = new kony.dom.Element();
       var parentDiv =  domElement.getParent(panel, "form");
       var panelContent = null;
       var imgid = panel.id + "img";
           for( i = 0 ; i< parentDiv.childNodes.length;i++)
           {
               var elements = parentDiv.children[i];
               if(elements && elements.className == "panel")
               {
                   elements.className = "panelcollapsed";
                   var contentHeight = elements.offsetHeight;
                   var stepHeight = contentHeight / this.PANEL_ANIMATION_STEPS;
                   var temptabid= elements.getAttribute("id")
                   var tabid=temptabid+"row";
                   var node=domElement.getElementByIDNS(tabid);
                   var actskin=node.getAttribute("actskin");
                   var inactskin=node.getAttribute("inactskin");
                   var clsName = node.className;
                  clsName =  clsName.replace(actskin, inactskin) ;
                   node.className = clsName;					
               }
       }
   },
    animateStep: function(panelContent,iteration,stepHeight,direction,imgElement){
        var domElement = new kony.dom.Element();
        if (iteration<this.PANEL_ANIMATION_STEPS)
    {
        panelContent.style.height = Math.round(((direction>0) ? iteration : 10 - iteration) * stepHeight) +"px";
        iteration++;
        setTimeout(function(){animateStep(panelContent,iteration,stepHeight,direction, imgElement)}, this.PANEL_ANIMATION_DELAY);
    }
    else
    {
                panelContent.parentNode.className = (direction<0) ? "panelcollapsed" : "panel";
                if(imgElement != null) {
                    var colpimg = domElement.getElementByIDNS("tabcollapseimg");
                    var expimg = domElement.getElementByIDNS("tabexpandimg");
                    if(colpimg != null && expimg != null)
                    imgElement.src = (direction<0) ? imgElement.src.replace(expimg.value, colpimg.value) :
                                                            imgElement.src.replace(colpimg.value, expimg.value);
                }
        panelContent.style.display = panelContent.style.height = "";
                var temptabid= panelContent.parentNode.getAttribute("id")
                var tabid=temptabid+"row";
                var node=domElement.getElementByIDNS(tabid);
                var actskin=node.getAttribute("actskin");
                var inactskin=node.getAttribute("inactskin");
                var clsName = node.className;
                clsName = (direction<0) ? clsName.replace(actskin, inactskin) : clsName.replace(inactskin, actskin);
                node.className = clsName;
    }
    },
    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the CollapsibleTab widget.
     */
    registerWidget: function()
    {
         var collapsibleEvent = new kony.events.KEvent("click", "Kcollapsible", this.collapsibleEventHandler);
         //kony.print("Inside CollapsibleTab widget Initilaization");
         kony.events.KEventManager.registerEvent(collapsibleEvent);
    },

    collapsibleEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var  divid = target.getAttribute("id");
        var tabdiv = document.getElementById(divid.substring(0, divid.length -3));
        
        if (target)
        {
            var isEvent = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);
            if (!isEvent)
            {
               var eventName =  domElement.getAttributeValueNS(tabdiv, kony.constants.KONY_EVENT_NAME);
               if(eventName && (eventName !== null))
                {
                    var postData = kony.data.encodeWidgetData(target,true);

                    postData.push("tabview="+divid);
                    postData.splice(postData.indexOf("kws=true"), 1);
                    postData.splice(postData.indexOf("rtype=00"), 1);
                    postData.push("rtype=01");
                    postData.push("wid="+divid);
                    postData.push(eventName + "=x");

                    var currentForm = domElement.getCurrentForm();
                    var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)


                    // Before making the AJAX call to handle the radio button group event, register for the button unload event
                    var tabUnloadEvent = new kony.events.KUnloadEvent(divid, "collapsible", kony.widgets.CollapsibleTab.unloadEventHandler);
                    kony.addGlobal(kony.constants.SELECTED_ITEM, tabUnloadEvent);

                    var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                    kony.net.ajax.openReq(ajaxConfig, postData, null, null, eventSource);
                }
            }
        }
  },
  encodeCollapsableWidgetData:function(parentobj){
            var genericArgs=[];

            genericArgs = kony.data.encodeGenericData();

            var wttype = parentobj.getAttribute("konywidgettype");
            genericArgs.push("wttype=" + wttype);

            var imggalid = parentobj.getAttribute("id");
            genericArgs.push("wid=" + imggalid);

            genericArgs.push("rtype=" + "01");
            genericArgs.push("kws=" + "true");

            return genericArgs;
  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        //widget.removeAttribute("selected");
        //widget.removeAttribute("disabled");
    },

     /**
     * Separate response handler
     */
    reponseHandler: function(response, eventSource, konyNetAjax)
    {
           /* This case can come in future to handle only tab data. currently whole form is coming */
    }

}


kony.widgets.Segment = {

    loadHandler: function(){

    },

    registerWidget: function(){
        var segmentEvent = new kony.events.KEvent("click", "Ksegment", this.segmentEventHandler);
        kony.events.KEventManager.registerEvent(segmentEvent);
    },

    segmentEventHandler : function(eventSource){
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        if(target.getAttribute("disabled") != null)
            return;
        /* Name : R.Venkat Rajeshwar Rao
         * Date: 2/06/2011
         * Reason: After Changing the structure by removing the anchor tag to div the following is used to
         * get the parent
         */
       // var link =  domElement.getParent(target, "a");
        var link =  kony.widgets.Segment.segmentParent(target);
        if(link) {
            var eventName =  domElement.getAttributeValueNS(link, kony.constants.KONY_EVENT_NAME);
            var rowid = domElement.getAttributeValueNS(link,"rowid");
            var sectionId = domElement.getAttributeValueNS(link,"sectionid");
            if(eventName && (eventName !== null))
            {
                /*
                 * Sumanth, Oct 16, 2011: Added below if condition for palm devices which doesn't have touch devices.
                 */
                if(eventName.indexOf("next") > 0 || eventName.indexOf("prev") > 0 ){
                    var direction = 'left';
                    if(eventName.indexOf("prev") > 0)
                    {
                        direction = 'right';
                    }
                    var swipeTarget = kony.widgets.Utils.TouchHandlers.getTouchParent(target);
                    if(swipeTarget){                        
                        kony.widgets.Segment.PageView.handleSegmentSwipe(swipeTarget,direction);
                    }
                }else
                {
                var linkid = eventName + rowid;
                link.setAttribute("id", linkid);
                //link.setAttribute("selected", "progress");
    
                var blockinskin=link.getAttribute(kony.constants.KONY_BLOCK_UI_SKIN);
                var progressskin=link.getAttribute("kprogressskin");
                    kony.addGlobal("selected_item", linkid);
                    kony.widgets.Segment.setProgressIndicator(link);
                                
                if(blockinskin && blockinskin.length>0)
                {
                    kony.widgets.Utils.applyBlockUISkin(linkid);
                }
    
                var postData = kony.data.encodeWidgetData(link,false);
    
    
    
                postData.push("rowid=" + rowid);
    			if(sectionId)
    				postData.push("sectionid=" + sectionId);
                postData.push(eventName + "=x");
    
                var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)
    
    
                // Before making the AJAX call to handle the button event, register for the button unload event
                var segmentUnloadEvent = new kony.events.KUnloadEvent(linkid, "Ksegment", kony.widgets.Segment.unloadEventHandler);
                kony.addGlobal(kony.constants.SELECTED_ITEM, segmentUnloadEvent);
    
                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                kony.net.ajax.openReq(ajaxConfig, postData, null, null, eventSource);
                }
            }
        }
    },

    setProgressIndicator : function(link){

    var konyElement = new kony.dom.Element();

    // Retrieve the parent touch container - Div with ID hstripID_touchContainer
    var progressdivcontainer = konyElement.getElementByIDNS("progressdiv");

            if(progressdivcontainer)
            progressdivcontainer.parentNode.removeChild(progressdivcontainer);

            var progressdiv = document.createElement('div');
            var progressskin=link.getAttribute("kprogressskin");
            progressdiv.setAttribute('id', 'progressdiv');
            progressdiv.setAttribute("selected", "progressindtr");
            progressdiv.setAttribute("kprogressskin", progressskin);
            var viewportwidth=kony.widgets.Utils.getViewPortWidth();
            var veiwportheight=kony.widgets.Utils.getViewPortHeight();
            var absolutewidthofdiv=(link.clientWidth/viewportwidth)*100;
            var absoluteheightofdiv=(link.clientHeight/veiwportheight)*100;
           // progressdiv.style.width = absolutewidthofdiv+"%";
           // progressdiv.style.height=  absoluteheightofdiv+"%";

            progressdiv.style.width = link.clientWidth+"px";
            progressdiv.style.height=  link.clientHeight+"px";

                            //alert("height is "+link.clientHeight+"  width is"+link.clientWidth);
            //progressdiv.style.backgroundColor="blue";
            progressdiv.style.position ="absolute";
            progressdiv.style.opacity="0.6";
            link.parentNode.insertBefore( progressdiv,link );
            //link.parentNode.parentNode.parentNode.appendChild(progressdiv);

    },
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
        var domElement = new kony.dom.Element();
        var selectedElementNode =domElement.getElementByIDNS('progressdiv');
        if(selectedElementNode !=null)
        {
           selectedElementNode.parentNode.removeChild(selectedElementNode);
        }
        kony.widgets.Utils.removeBlockUISkin();
    },

     /* Name : R.Venkat Rajeshwar Rao
         * Date: 2/06/2011
         * Reason: After Changing the structure by removing the anchor tag to div the following is used to
         * get the parent
     */
    segmentParent: function(node){
        while (node && (( node.parentNode.getAttribute("konywidgettype")!=null )) ){
            if((node.parentNode.getAttribute("konywidgettype")=== "KTouchsegment") )
             {
                    return node;
             }
             else if((node.getAttribute("konywidgettype")=== "Kbox") &&  (node.getAttribute("eventname") != null))
             {
                    return node;
             }
             node = node.parentNode;
        }
        return node;
    }
}


kony.widgets.Segment.PageView = {
        speedOfSlide : 500,
        /**
         * Image Strip Widget Context
         */
        SegmentWidgetContext : function(id)
        {
            this.id = id;
            this.currentPage = 0;
            this.widthRatio = 0;
            this.imageWidth = 0;
        },


        loadHandler: function(){},

        registerWidget: function(){
             var segmentOrientationEvent = new kony.events.KEvent("onorientationchange", "SegmentPageView", this.segmentOrentationHandler);
             kony.events.KEventManager.registerEvent(segmentOrientationEvent);          
        },
        
        registerTouchWidget: function(){

             var segmentTouchEvent = new kony.events.KEvent("swipe", "Ksegment", this.segmentSwipeHandler);
             kony.events.KEventManager.registerTouchEvent(segmentTouchEvent);

             this.computeImageStripWidths();
        },

        /**
          * As different image strips in the application might have different events for which they might have registered
          * besides the normal swipe. The event information for which the strip might have registered should be part of the
          * widget itself.
          *
          * Also for each of the strip widget there is a state associated which is needed when the swipe event happens.
          * Based on the direction of the movement of the swipe, the strip should move either left or right.
          *
          * This state is maintained for the image strip in a WidgetContext
          */
        computeImageStripWidths : function()
        {
            var konyElement = new kony.dom.Element();
            var hStripElements = document.getElementsByName("touchcontainer_Ksegment");
            if(hStripElements)
            {
                for(var i=0; i<hStripElements.length; i++ )
                {
                    var hStripElement = hStripElements[i];

                    var imgsElement = hStripElement.children[0];
                    var individualImages = imgsElement.children;
                    var noOfSwipePages = individualImages.length;
                    imgsElement.style.width = noOfSwipePages*100+"%";
                     var widthRatio=0;
                    var IMG_WIDTH=0;

                    for(var j=0;j<individualImages.length;j++)
                    {
                        individualImages[j].style.display = "inline";
                        individualImages[j].style.width = "100%";

                        individualImages[j].style.width = individualImages[j].clientWidth/noOfSwipePages+'px';

                    }
                    IMG_WIDTH = individualImages[0].clientWidth;

                    if(window.orientation===90 || window.orientation===-90) // portrait
                        widthRatio = IMG_WIDTH/screen.height;
                    else if(window.orientation===0 || window.orientation===180) // landscape
                        widthRatio = IMG_WIDTH/screen.width;

                    individualImages[0].style.display = "block";

                    hStripElement.setAttribute("imageWidth", IMG_WIDTH);
                    hStripElement.setAttribute("ratio", widthRatio);

                    //footer.innerHTML += " Image strip widget not found";
                    var imageStripWidgetContext = new kony.widgets.Segment.PageView.SegmentWidgetContext(hStripElement.id);
                    imageStripWidgetContext.imageWidth = IMG_WIDTH;
                    imageStripWidgetContext.widthRatio = widthRatio;

                    var index = parseInt(konyElement.getAttributeValueNS(imgsElement, "index"))-1;
                    imageStripWidgetContext.currentPage = index;

                    kony.addGlobal(hStripElement.id, imageStripWidgetContext);

                    kony.widgets.Segment.PageView.scrollImages(imgsElement, imageStripWidgetContext.imageWidth * index, this.speedOfSlide,true);
                    kony.widgets.Segment.PageView.updatePageIndicator(hStripElement, imageStripWidgetContext);

                }
            }
        },


        segmentSwipeHandler : function(eventSource, touchContext)
        {

            var konyElement = new kony.dom.Element();

            // Retrieve the parent touch container - Div with ID hstripID_touchContainer
            var touchContainerWidget = konyElement.getElementByIDNS(touchContext.targetWidgetID);

            var imgsElement = touchContainerWidget.children[0];
            //var footer = konyElement.getElementByIDNS("footer");

            //footer.innerHTML += " <br/> I am in Swipe Handler and my touch Context Info is as follows <br/>" + touchContext.printContext();
            var imageStripWidgetContext = kony.getGlobal(touchContext.targetWidgetID);

            if (!imageStripWidgetContext)
            {
                //footer.innerHTML += " Image strip widget not found";
                imageStripWidgetContext = new kony.widgets.Segment.PageView.SegmentWidgetContext(touchContext.targetWidgetID);
                imageStripWidgetContext.imageWidth = konyElement.getAttributeValueNS(touchContainerWidget, "imageWidth");
                imageStripWidgetContext.widthRatio = konyElement.getAttributeValueNS(touchContainerWidget, "ratio");

                kony.addGlobal(touchContext.targetWidgetID, imageStripWidgetContext);
            }


            //If we are moving before swipe, and we are going Lor R in X mode, or U or D in Y mode then drag.
            if( touchContext.currentTouchPhase == kony.widgets.touch.TouchContext.STATE_MOVE &&
                (touchContext.direction==kony.widgets.touch.TouchContext.LEFT || touchContext.direction==kony.widgets.touch.TouchContext.RIGHT) )
            {
                var duration=0;

                if (touchContext.direction == kony.widgets.touch.TouchContext.LEFT)
                    kony.widgets.Segment.PageView.scrollImages(imgsElement,(imageStripWidgetContext.imageWidth * imageStripWidgetContext.currentPage) + touchContext.distance, duration);

                else if (touchContext.direction == kony.widgets.touch.TouchContext.RIGHT)
                    kony.widgets.Segment.PageView.scrollImages(imgsElement,(imageStripWidgetContext.imageWidth * imageStripWidgetContext.currentPage) - touchContext.distance, duration);
            }
            else if ( touchContext.currentTouchPhase  == kony.widgets.touch.TouchContext.STATE_CANCEL)
            {
                kony.widgets.Segment.PageView.scrollImages(imgsElement,imageStripWidgetContext.imageWidth * imageStripWidgetContext.currentPage, this.speedOfSlide);
            }
            else if ( touchContext.currentTouchPhase  ==kony.widgets.touch.TouchContext.STATE_END )
            {

                 //footer.innerHTML += " Iin end. Current Page No is" + imageStripWidgetContext.currentPage;

                if (touchContext.direction == kony.widgets.touch.TouchContext.RIGHT){
                    kony.widgets.Segment.PageView.previousImage(touchContainerWidget, imageStripWidgetContext, false);
                    kony.widgets.Segment.PageView.updatePageIndicator(touchContainerWidget, imageStripWidgetContext);
                }
                else if (touchContext.direction == kony.widgets.touch.TouchContext.LEFT){
                    kony.widgets.Segment.PageView.nextImage(touchContainerWidget,imageStripWidgetContext, false);
                    kony.widgets.Segment.PageView.updatePageIndicator(touchContainerWidget, imageStripWidgetContext);
                }else if (touchContext.direction == kony.widgets.touch.TouchContext.UP)
                {
                    window.scrollTo(0, 50);
                }
                else if (touchContext.direction == kony.widgets.touch.TouchContext.DOWN)
                {
                    window.scrollTo(0, -50);
                }
                //kony.removeGlobal(touchContext.targetWidgetID);
            }

        },

        updateImageStripWidgetContext : function() {
            var hStripElements = document.getElementsByName("touchcontainer_Ksegment");
            if(hStripElements)
            {
                for(var i=0; i<hStripElements.length; i++ )
                {
                    var hStripElement = hStripElements[i];
                    var imageStripWidgetContext = kony.getGlobal(hStripElement.id);
                    var imgsElement = hStripElement.children[0];
                    var individualImages = imgsElement.children;
                    imageStripWidgetContext.imageWidth = individualImages[0].parentNode.clientWidth/individualImages.length;
                    hStripElement.setAttribute("imageWidth", imageStripWidgetContext.imageWidth);
                    if( ( navigator.userAgent.match(/android/i) ) || ( navigator.userAgent.match(/BlackBerry/i) ) )
                    {
                    kony.widgets.Segment.PageView.scrollImages(imgsElement,imageStripWidgetContext.imageWidth * imageStripWidgetContext.currentPage, 0);
                    }
                }
            }
     	},

        /**
         * Event raised during orientation change.
         *
         */
        segmentOrentationHandler : function(orientation)
		 {
					 
             var hStripElements = document.getElementsByName("touchcontainer_Ksegment");
             if(hStripElements)
             {
                 for(var i=0; i<hStripElements.length; i++ )
                 {
                     
                     var hStripElement = hStripElements[i];
 
                     var imageStripWidgetContext = kony.getGlobal(hStripElement.id);
                     if (!imageStripWidgetContext)
                     {
                         continue;
                     }
                     var imgsElement = hStripElement.children[0];
                     // Retrieve the Individual Images pages of the imagestripe
                     var individualImages = imgsElement.children;
                     var noOfSwipePages = individualImages.length;
 
                     imgsElement.style.width = noOfSwipePages*100+"%";
 
                     var IMG_WIDTH=0;
                     var percent = 100 / noOfSwipePages;
                     /**
                      * First set all the images to display none except the current Image /Page. This is done
                      * to avoid flickering while performing the width calculations on change in the orientation.
                      */
                    if (noOfSwipePages > 0) {
                        for (var j = 0; j < individualImages.length; j++) {
                            individualImages[j].style.display = "inline";
                            individualImages[j].style.width = percent + "%"; //"100%";
                        }
                        individualImages[0].style.display = "block";
                        IMG_WIDTH = individualImages[0].clientWidth;
                    }
                        
                     var pageWidthInLandScape = screen.height*imageStripWidgetContext.widthRatio+'px';
                     var pageWidthInPortrait  = screen.width*imageStripWidgetContext.widthRatio+'px';
 
                     /**
                      * Iterate thru the invidiual images and calculate their width and height.
                      */
                     if(orientation === "landscape"){
                         IMG_WIDTH = screen.height*imageStripWidgetContext.widthRatio;
                     }
                     else if(orientation === "portrait"){
                         IMG_WIDTH = screen.width*imageStripWidgetContext.widthRatio;
                     }
                     
                     imageStripWidgetContext.imageWidth = individualImages[0].parentNode.clientWidth/noOfSwipePages;
                     
                     hStripElement.setAttribute("imageWidth", IMG_WIDTH);
                     
                        if(orientation === "portrait"){
                             imageStripWidgetContext.widthRatio = IMG_WIDTH / screen.height;
                        }else{
                              imageStripWidgetContext.widthRatio = IMG_WIDTH / screen.width;
                        }
 
 
                     if (imageStripWidgetContext.currentPage  === (noOfSwipePages - 1))
                     {
                          kony.widgets.Segment.PageView.previousImage(hStripElement,imageStripWidgetContext, true);
                          kony.widgets.Segment.PageView.nextImage(hStripElement,imageStripWidgetContext, true);
                     }
                     else
                     {
                        kony.widgets.Segment.PageView.nextImage(hStripElement,imageStripWidgetContext, true);
                         kony.widgets.Segment.PageView.previousImage(hStripElement,imageStripWidgetContext, true);
                     }
 
                     for(var j=0;j<individualImages.length;j++)
                     {
                        individualImages[j].style.display = "inline";
                     }
                    
                 }
                 if( ( navigator.userAgent.match(/android/i) ) || ( navigator.userAgent.match(/BlackBerry/i) ) )
                 {
                     if(typeof updateImageStripWidgetContextTime != "undefined" ){
                         updateImageStripWidgetContext.clear();
                     }
                     updateImageStripWidgetContext = setTimeout( kony.widgets.Segment.PageView.updateImageStripWidgetContext, 500);
                 }
             }
             
        },

       /**
         *  Get the previous Page
         *
         */
        previousImage : function(touchContainerElement, imageStripWidgetContext, orientationChanged)
        {
            var imgsElement = touchContainerElement.children[0];
            //var footer = document.getElementById("footer");
            //footer.innerHTML += imageStripWidgetContext.currentPage + " :: " + imageStripWidgetContext.imageWidth ;
            imageStripWidgetContext.currentPage = Math.max(imageStripWidgetContext.currentPage-1, 0);
            kony.widgets.Segment.PageView.scrollImages(imgsElement, imageStripWidgetContext.imageWidth * imageStripWidgetContext.currentPage, this.speedOfSlide,orientationChanged);
            imgsElement.setAttribute("index", imageStripWidgetContext.currentPage+1);
        },

        /**
         * Get the Next Page
         *
         */
        nextImage : function(touchContainerElement, imageStripWidgetContext, orientationChanged)
        {
            var elem = touchContainerElement.children[0];
            var noOfSwipePages = elem.children.length;

            imageStripWidgetContext.currentPage = Math.min(imageStripWidgetContext.currentPage+1, noOfSwipePages-1);
            kony.widgets.Segment.PageView.scrollImages( elem,imageStripWidgetContext.imageWidth * imageStripWidgetContext.currentPage, this.speedOfSlide,orientationChanged);
            elem.setAttribute("index", imageStripWidgetContext.currentPage+1);
        },


        /**
         * Scroll Images given the distance, duration and the orentation flag.
         *
         */
        scrollImages : function(elem,distance, duration, isOriented)
        {

            var imgs = elem;

            // var footer = document.getElementById("footer");
            //footer.innerHTML += " <br/> Distance: " + distance + " Duration: " + duration  + "Orientation :" + isOriented ;

            if(!isOriented){
                imgs.style.webkitTransition = "-webkit-transform "  + (duration/1000).toFixed(1)+"s ";
            }
            else{
                imgs.style.webkitTransition = "-webkit-transform 0 0";
            }

            //inverse the number we set in the css
            var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
            imgs.style.webkitTransform = "translate3d("+value +"px,0px,0px)"

        },

        updatePageIndicator :function (touchContainerElement, imageStripWidgetContext)
        {

        var index = imageStripWidgetContext.currentPage;
        var navTable = touchContainerElement.nextElementSibling;
        if(navTable)
            {
                var rows = navTable.children;
                var cells = rows[0].children;
                var imgs = cells[0].children;
                var onDotImage = touchContainerElement.getAttribute("pageOnDotImage");
				var offDotImage = touchContainerElement.getAttribute("pageOffDotImage");
				if(imgs && imgs.length == 0)
					return;
                var url =  imgs[0].getAttribute("src");
                if(url)
                {
	                var relUrl = url.substring(0, url.lastIndexOf("/"));
	                for(var j=0,count=imgs.length;j<count; j++)
	                {
	                    if( j == index){
	                    	imgs[j].setAttribute("src",relUrl+"/"+onDotImage);
	                    }else{
	                    	imgs[j].setAttribute("src",relUrl+"/"+offDotImage);
	                    }
	                }
                }
        }

        },
        segmentTouchEventHandler:function(eventSource){
           kony.widgets.Utils.TouchHandlers.Swipe.onTouchStart(eventSource, kony.widgets.Segment.PageView.segmentGenericTouchProcessor);
        },

        segmentGenericTouchProcessor : function(eventDetails){

           //eventDetails  format = {target: targetElement,direction: 'right'/'left', eventType: "swipe",eventSource}
            if (eventDetails)
            {
                if (eventDetails.eventType === "swipe")
                {
                    // Handle the swipe event associated with the image gallery widget.
                    var target = eventDetails.target;
                    var direction = eventDetails.direction;

                    if (target){
                        //If segment is in page view it need to have KTouchSegment as parent.
                        var swipeTarget = kony.widgets.Utils.TouchHandlers.getTouchParent(target);
                        if(swipeTarget){
                            kony.widgets.Segment.PageView.handleSegmentSwipe(swipeTarget,direction);
                        }
                    }
                }
            }

        },



         handleSegmentSwipe: function(target, direction){
            var elements = null;
            var arrows = null;
            var pageOnDotImage = target.getAttribute("pageOnDotImage");
            var pageOffDotImage = target.getAttribute("pageOffDotImage");
            try{
                arrows = target.children[0].children[0].children;
            }catch(e){}

            if(arrows && arrows[0].children[0].nodeName == 'A'){
                target  = target.children[0].children[0].children[1].children
                elements = target[0].children;
            }else{
                arrows = null;
                elements = target.parentNode.children;
        }
            var node = null;
            if(!direction){
                direction = eventName.split(".")[1];
    }
            var index = -1;
            for(var j=0,count=elements.length; j < count; j++ ){
                node = elements[j];
                if(node.style.display == ''){
                    index = j;
                    if(direction == "left" || direction == "next" ){
                        if(j+1 < count){
                            node.style.display='none';
                            node = elements[j+1];
                            node.style.display = '';
                            index = j+1;
                            break;
                        }
                    }else{
                        if(j-1 >= 0){
                            node.style.display='none';
                            node = elements[j-1];
                            node.style.display = '';
                            index = j-1;
                            break;
                        }
                    }
                }
            }
            if(arrows){
                var classname = arrows[0].children[0].className;
                classname = classname.replace("inactive", "");
                if(index == 0){
                    classname = classname + "inactive";
                }
                arrows[0].children[0].className = classname;
                classname = arrows[2].children[0].className;
                classname = classname.replace("inactive", "");
                if(index == elements.length-1){
                    classname = classname + "inactive";
                }
                arrows[2].children[0].className = classname;
            }

            var navTable = null;
            if(!arrows){
                navTable = target.parentNode.nextElementSibling;
            }else{
                navTable = target[1];
            }
            var rows = navTable.children;
            var cells = rows[0].children;
            var imgs = cells[0].children;
            var url =  imgs[0].getAttribute("src");
            var relUrl = url.substring(0, url.lastIndexOf("/"));
            for(var j=0,count=imgs.length;j<count; j++){
                if( j == index){
                    imgs[j].setAttribute("src",relUrl+"/"+pageOnDotImage);
                }else{
                    imgs[j].setAttribute("src",relUrl+"/"+pageOffDotImage);
                }
            }
        }
    }

kony.widgets.Segment.Button = {

    registerWidget: function()
    {
        var segmentButtonEvent = new kony.events.KEvent("click", "seg_Kbutton", this.segmentButtonClickEventHandler);
        //ony.print("Inside SegmentButton widget Initilaization");
        kony.events.KEventManager.registerEvent(segmentButtonEvent);
    },



    segmentButtonClickEventHandler : function(eventSource)
    {

        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object
        var target = domElement.getEventTarget(eventSource);

        var rowid = domElement.getAttributeValueNS(target,"rowid");
        var eventName = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT_NAME);

        if(eventName && (eventName !== null))
        {
            var buttonid = eventName + rowid;
            target.setAttribute("id", buttonid);

            // Setting the progress indicator.
            target.setAttribute("selected", "progress");

            /* Name : R.venkat Rajeshwar Rao
             * Date: 23/06/2011
             * Reason: Added Blockui Support for Button within segment
             */
            var blockinskin = domElement.getAttributeValueNS(target,kony.constants.KONY_BLOCK_UI_SKIN);
            if(blockinskin && blockinskin.length>0)
        {
                    kony.widgets.Utils.applyBlockUISkin(buttonid);
            }
            var postData = kony.data.encodeWidgetData(target,false);

            postData.push("rowid=" + rowid);
            postData.push(eventName + "=x");
            var sectionId = domElement.getAttributeValueNS(target,"sectionid");
			if(sectionId)
			    postData.push("sectionid=" + sectionId);

            var currentForm = domElement.getCurrentForm();
            var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)


            // Before making the AJAX call to handle the segment button event, register for the button unload event
            var segmentButtonUnloadEvent = new kony.events.KUnloadEvent(buttonid, "seg_Kbutton", kony.widgets.Segment.Button.unloadEventHandler);
            kony.addGlobal(kony.constants.SELECTED_ITEM, segmentButtonUnloadEvent);

            var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
            kony.net.ajax.openReq(ajaxConfig, postData, null, null, eventSource);
        }


    },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
        widget.removeAttribute("disabled");


        kony.widgets.Utils.removeBlockUISkin();
    }

}


kony.widgets.Segment.Link = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the Link widget.
     */
    registerWidget: function()
    {
         var segmentLinkEvent = new kony.events.KEvent("click", "seg_Klink", this.segmentLinkClickEventHandler);
         //kony.print("Inside SegmentLink widget Initilaization");
         kony.events.KEventManager.registerEvent(segmentLinkEvent);
    },



    segmentLinkClickEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var rowid = domElement.getAttributeValueNS(target,"rowid");
        var eventName = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT_NAME);

        if(eventName && (eventName !== null))
        {
            var linkid = eventName + rowid;
            target.setAttribute("id", linkid);

            // Setting the progress indicator.
            target.setAttribute("selected", "progress");
            /* Name : R.venkat Rajeshwar Rao
             * Date: 23/06/2011
             * Reason: Added Blockui Support for Button within segment
             */
            var blockinskin = domElement.getAttributeValueNS(target,kony.constants.KONY_BLOCK_UI_SKIN);
            if(blockinskin && blockinskin.length>0)
        {
            kony.widgets.Utils.applyBlockUISkin(linkid);
            }


            var postData = kony.data.encodeWidgetData(target,false);

            postData.push("rowid=" + rowid);
            postData.push(eventName + "=x");
            var sectionId = domElement.getAttributeValueNS(target,"sectionid");
			if(sectionId)
			    postData.push("sectionid=" + sectionId);

            //selectedElements.push(linkid);

            var currentForm = domElement.getCurrentForm();
            var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)


            // Before making the AJAX call to handle the segment button event, register for the button unload event
            var segmentLinkUnloadEvent = new kony.events.KUnloadEvent(linkid, "seg_Klink", kony.widgets.Segment.Link.unloadEventHandler);
            kony.addGlobal(kony.constants.SELECTED_ITEM, segmentLinkUnloadEvent);

            var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
            kony.net.ajax.openReq(ajaxConfig, postData, null, null, eventSource);
        }

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");


        kony.widgets.Utils.removeBlockUISkin();
    }

}

kony.widgets.Image2 = {

    loadHandler : function () {
         //kony.widgets.Image.imgLoadHandler2();
    },
    registerWidget : function () {
       // kony.widgets.Image.imgLoadHandler2();
    }

}

kony.widgets.Image = {
    registerWidget: function()
    {
         
    },
    
    delayedImageLoading: function(event,img)
    {
        setTimeout(function(){kony.widgets.Image.imgLoadHandler2(img);},100);
        return;
    },
    
    imgLoadHandler2: function(domImg)
    {

        var actimgdim = {};
        actimgdim.width=domImg.width;
        actimgdim.height=domImg.height;
        var aspectRatio=(actimgdim.width/actimgdim.height);   
        /*
        if(domImg.id == "image21366678585764")
        {
                console.log("debug");
        }
        */
        var imageModel = {};
        imageModel.referencewidth = domImg.getAttribute("refwidth");
        imageModel.referenceheight = domImg.getAttribute("refheight");

        var cwt = domImg.getAttribute("cwt")/100;
                
        var imageWidget = {};
        imageWidget.width = screen.width*cwt;
        imageWidget.height = 0;
        var imgwidth = screen.width*cwt;

        var viewmode =  domImg.getAttribute("view");
        if(viewmode == "maintainaspectratio"){
            imgwidth = domImg.parentNode.parentNode.offsetWidth*cwt;
        }
        
        
        imageModel.isPercent = domImg.getAttribute("ispercent");
        var dimensions=[]; //only new image works as old image psp generation to be considered

        if(imageModel.referencewidth!= "0" && viewmode == "fittodimensions") //as reference width is mandatory property
        {
            imageWidget.width = (((screen.width*cwt)> imageModel.referencewidth)?imageModel.referencewidth: (screen.width*cwt));
            if(imageModel.isPercent == "false")
                            imageWidget.width = imageModel.referencewidth;
            imageWidget.height = imageModel.referenceheight;
            if(actimgdim.width != "0")
                    domImg.style.width=imageWidget.width+"px";
            if(imageWidget.height)
                    domImg.style.height=imageWidget.height+"px";
        }
        else if (viewmode == "maintainaspectratio")
        {

             if(imageModel.referencewidth === "0")
             {
                if(imageModel.isPercent == "false")
                        {                
                    dimensions[1]=actimgdim.width;
                    dimensions[0]=actimgdim.height;	               
                }
                else
                {
                    if(actimgdim.width<=imgwidth)
                    {
                        if(imageModel.referenceheight!== "0" && actimgdim.height>imageModel.referenceheight)
                        {
                            dimensions[0]=imageModel.referenceheight;
                            dimensions[1]=dimensions[0]*aspectRatio;
                        }
                        else
                        {
                        dimensions[1]=actimgdim.width;
                        dimensions[0]=actimgdim.height;
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
            } 
            else 
            {
                if(imageModel.isPercent == "false")
                {  
                    dimensions[1]=imageModel.referencewidth;
                    dimensions[0]=dimensions[1]/aspectRatio;           
                }
                else
                {
                    var computedimgwidth=(imageModel.referencewidth<=imgwidth)?imageModel.referencewidth:imgwidth;
                    if(imageModel.referenceheight ==="0")
                    {
                        if(actimgdim.width<computedimgwidth)
                        {
                            dimensions[0]=actimgdim.height;
                            dimensions[1]=actimgdim.width;                     
                        }
                        else
                        {
                            dimensions[1]=computedimgwidth;
                            dimensions[0]=	dimensions[1]/aspectRatio;		
                        }   
                    }
                    else
                    {  
                        var checkDim=(actimgdim.width<computedimgwidth)?(actimgdim.height<imageModel.referenceheight?true:false):false;
                        if(!checkDim)
                        {		
                            dimensions[1]=(((imgwidth)>imageModel.referencewidth)?imageModel.referencewidth: (imgwidth));            
                            dimensions[0]=imageModel.referenceheight;                                        
                            var imgdim=(dimensions[1]/aspectRatio)<dimensions[0]?(dimensions[1]/aspectRatio):false;
                            if(imgdim===false)         
                                dimensions[1]=(dimensions[0]*aspectRatio <= imageModel.referencewidth)? dimensions[0]*aspectRatio :false;            
                            else
                                dimensions[0]=imgdim;            
                        }
                        else
                        {
                            dimensions[0]=actimgdim.height;
                            dimensions[1]=actimgdim.width;                
                        } 
                    }               				
                }
            }
            domImg.parentNode.style.width=dimensions[1]+"px";
            domImg.parentNode.style.height=dimensions[0]+"px";
            domImg.style.width = dimensions[1]+"px";
            domImg.style.height = dimensions[0]+"px";
            domImg.style.display = "";
            domImg.style.visibility = "visible";
            domImg.style.opacity = 1;
        }

    },
    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {

    }
}

kony.widgets.HBox = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the HBox widget.
     */
    registerWidget: function()
    {
         var HboxEvent = new kony.events.KEvent("click", "Kbox", this.hBoxEventHandler);
         //kony.print("Inside HBox widget Initilaization");
         kony.events.KEventManager.registerEvent(HboxEvent);
    },



    hBoxEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var eventName = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT_NAME);
        /* Name : R.Venkat Rajeshwar Rao
         * Date: 1/06/2011
         * Reason: Added this to get the topmost Div parent element for any element click inside
         * or on the div as the top most element contains the information about the event...
         *
         */
        var link =  domElement.getDivParent(target);
        if(link) {
            eventName = domElement.getAttributeValueNS(link, kony.constants.KONY_EVENT_NAME);
            
            if(eventName && (eventName !== null)){
                var linkid = eventName;
                link.setAttribute("id", linkid);
                //link.setAttribute("selected", "progress");

                var linkt=link;
                /*for (var i = 0; i < linkt.childNodes.length; i++) {
                     if (linkt.childNodes[i].tagName == "DIV") {
                     linkt= linkt.childNodes[i];
                     break;
                     }
                } */
                link.setAttribute("progressindctr", "true");

                var blockSkinid  = linkid;
                var blockinskin=domElement.getAttributeValueNS(link,kony.constants.KONY_BLOCK_UI_SKIN);
                if(!blockinskin){
                        blockSkinid	= eventName.replace("event_", "");
                        var blockNode = document.getElementById(blockSkinid);
                        blockinskin=domElement.getAttributeValueNS(blockNode,kony.constants.KONY_BLOCK_UI_SKIN);
                }

                if(blockinskin && blockinskin.length>0)
                {
                    kony.widgets.Utils.applyBlockUISkin(blockSkinid);
                }

                var postData = kony.data.encodeFormData();
                postData.push(eventName + "=x");
                //selectedElements.push(linkid);

                var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)

                // Before making the AJAX call to handle the HBox event, register for the HBox unload event
                var hBoxUnloadEvent = new kony.events.KUnloadEvent(linkid, "Kbox", kony.widgets.HBox.unloadEventHandler);
                kony.addGlobal(kony.constants.SELECTED_ITEM, hBoxUnloadEvent);
                
                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                kony.net.ajax.openReq(ajaxConfig, postData, null, null,eventSource);

            }

        }

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");


        kony.widgets.Utils.removeBlockUISkin();
    }

}

kony.widgets.DataGrid = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the DataGrid widget.
     */
    registerWidget: function()
    {
         var dataGrid = new kony.events.KEvent("click", "Kdatagrid", this.dataGridEventHandler);
         //kony.print("Inside DataGrid widget Initilaization");
         kony.events.KEventManager.registerEvent(dataGrid);
    },



    dataGridEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var link =  domElement.getParent(target, "a");
        if(link) {
            var eventName = domElement.getAttributeValueNS(link, kony.constants.KONY_EVENT_NAME);
            if(eventName && (eventName !== null)){
                var rowid = domElement.getAttributeValueNS(link,"rowid");
                var linkid = eventName + rowid;
                link.setAttribute("id", linkid);
                link.setAttribute("selected", "progress");

                var postData = kony.data.encodeWidgetData(link,false);
                postData.push("rowid=" + rowid);
                postData.push(eventName + "=x");

                //selectedElements.push(linkid);

                var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)

                // Before making the AJAX call to handle the DataGrid event, register for the DataGrid unload event
                var dataGridUnloadEvent = new kony.events.KUnloadEvent(linkid, "Kdatagrid", kony.widgets.DataGrid.unloadEventHandler);
                kony.addGlobal(kony.constants.SELECTED_ITEM, dataGridUnloadEvent);

                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                kony.net.ajax.openReq(ajaxConfig, postData, null, null,eventSource);

            }

        }

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");

        var style = widget.getAttribute('style');
        var url = style.substr(style.indexOf("url("),style.indexOf(")"));
        var src = widget.getAttribute('src');
        if(src){
        var back = src.substr(0,src.indexOf("/images/"));
        widget.setAttribute('src',back+url);
        }
        kony.widgets.Utils.removeBlockUISkin();
    }

}

kony.widgets.DataGrid.Label= {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for a Label inside a DataGrid widget.
     */
    registerWidget: function()
    {
         var dataGridLabel = new kony.events.KEvent("click", "datagrid_Klabel", this.dataGridLabelEventHandler);
         //kony.print("Inside DataGrid Label widget Initilaization");
         kony.events.KEventManager.registerEvent(dataGridLabel);
    },



    dataGridLabelEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var isEvent = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);
        //Murty, 12/07/2011, modified !isEvent as we are generating event from codegen
        if (isEvent){
            //datagrid label (Cell or Header) click handling.
            var label = target;
            if(label) {
                var rowid = domElement.getAttributeValueNS(label,"rowid");
                var colid = domElement.getAttributeValueNS(label,"colid");
                var eventName = domElement.getAttributeValueNS(label, kony.constants.KONY_EVENT_NAME);

                if(eventName && (eventName !== null))
                {
                    var labelid = eventName + rowid;
                    label.setAttribute("id", labelid);
                    label.setAttribute("selected", "progress");
                    var postData = kony.data.encodeWidgetData(target,false);

                    postData.push("rowid=" + rowid);
                    postData.push("colid=" + colid);
                    postData.push(eventName + "=x");

                    //selectedElements.push(labelid);

                    var currentForm = domElement.getCurrentForm();
                    var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)

                    // Before making the AJAX call to handle the DataGrid Lable event, register for the DataGrid unload event
                    var dataGridLabelUnloadEvent = new kony.events.KUnloadEvent(labelid, "datagrid_Klabel", kony.widgets.DataGrid.Label.unloadEventHandler);
                    kony.addGlobal(kony.constants.SELECTED_ITEM, dataGridLabelUnloadEvent);

                    var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                    kony.net.ajax.openReq(ajaxConfig, postData, null, null,eventSource);
}
            }
        }

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");

        kony.widgets.Utils.removeBlockUISkin();
    }

}

kony.widgets.DataGrid.Image= {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for a Image inside a DataGrid widget.
     */
    registerWidget: function()
    {
         var dataGridImage = new kony.events.KEvent("click", "datagrid_Kimage", this.dataGridImageEventHandler);
         //kony.print("Inside DataGrid Label widget Initilaization");
         kony.events.KEventManager.registerEvent(dataGridImage);
    },



    dataGridImageEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var isEvent = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);
        //Murty, 12/07/2011, modified !isEvent as we are generating event from codegen
        if (isEvent){
            //datagrid label (Cell or Header) click handling.
            var image = target;
            if(image) {
                var rowid = domElement.getAttributeValueNS(image,"rowid");
                var colid = domElement.getAttributeValueNS(image,"colid");
                var eventName = domElement.getAttributeValueNS(image, kony.constants.KONY_EVENT_NAME);

                if(eventName && (eventName !== null) && !image.getAttribute("disabled"))
                {
                    var imageid = eventName + rowid;
                    image.setAttribute("id", imageid);

                    image.setAttribute("disabled","disabled");
                    image.setAttribute("selected", "progress");

                    var src = domElement.getAttributeValueNS(image,'src');
                    var back = src.substr(0,src.indexOf("/images/"));
                    // This is to set the spinner on that particular image
                    image.setAttribute("style",'background-image: url('+ src +') !important;height:'+ image.clientHeight+'px;width:'+ (image.clientWidth - 2)+'px');

                    var postData = kony.data.encodeWidgetData(image,false);

                    postData.push("rowid=" + rowid);
                    postData.push("colid=" + colid);
                    postData.push(eventName + "=x");

                    //selectedElements.push(labelid);

                    var currentForm = domElement.getCurrentForm();
                    var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)

                    // Before making the AJAX call to handle the DataGrid Lable event, register for the DataGrid unload event
                    var dataGridImageUnloadEvent = new kony.events.KUnloadEvent(imageid, "datagrid_Kimage", kony.widgets.DataGrid.Label.unloadEventHandler);
                    kony.addGlobal(kony.constants.SELECTED_ITEM, dataGridImageUnloadEvent);

                    var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                    kony.net.ajax.openReq(ajaxConfig, postData, null, null,eventSource);
                }
            }
        }

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");

        kony.widgets.Utils.removeBlockUISkin();
    }

}


/**
 *  Register Calendar Popup Widget - This is a third party widget from Yahoo YUI.
 *
 */
kony.widgets.Calendar = {
    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for a Calendar widget.
     */
    registerWidget: function()
    {
         var calendar = new kony.events.KEvent("click", "Kcalendar", this.calendarEventHandler);
         //kony.print("Inside Calendar widget Initilaization");
         kony.events.KEventManager.registerEvent(calendar);

         var calendarChange = new kony.events.KEvent("change", "KcalendarInline", this.calendarChangeEventHandler);
        kony.events.KEventManager.registerEvent(calendarChange);

        //calendar popup implementation changed. width and height caluclated dynamically.
        var calendarOrientationEvent = new kony.events.KEvent("onorientationchange", "Kcalendar", this.setCalStyle);
        kony.events.KEventManager.registerEvent(calendarOrientationEvent);
       // kony.widgets.Calendar.setCalStyle();
    },
    
    setCalStyle: function()
    {
        var calElements = document.getElementsByName("calBody");
        if(calElements)
        {
            for(var i=0; i<calElements.length; i++ )
            {
                var calElement = calElements[i];
                kony.widgets.Calendar.setCalElementStyle(calElement,true);
            }
        }
    },
    setCalElementStyle: function(calParent, inOrientation)
    {
		var calElement = calParent.children[0];
		var calSibling = calParent.children[1];        
        if(! inOrientation){
                calElement = calElement.previousSibling;
        }        
        
        var calParentParent = calElement.parentNode.parentNode;


        var calParentStyle = window.getComputedStyle(calParent);
        var calParentParentStyle = window.getComputedStyle(calParentParent);
        var calSiblingStyle = window.getComputedStyle(calSibling);


        calElement.style.fontFamily = calParentStyle.fontFamily;
        calElement.style.fontSize = calParentStyle.fontSize;
        calElement.style.color = calParentStyle.color;
        calElement.style.fontWeight = calParentStyle.fontWeight;
        calElement.style.fontStyle = calParentStyle.fontStyle;
        
        calElement.style.height = calSibling.height+"px";

        var btlr = calParentStyle.borderTopLeftRadius;
        var bblr = calParentStyle.borderBottomLeftRadius;
        var btrr = calParentStyle.borderTopRightRadius;
        var bbrr = calParentStyle.borderBottomRightRadius;

        var tlr = parseInt(btlr.substring(0,btlr.indexOf("p")));
        var blr = parseInt(bblr.substring(0,bblr.indexOf("p")));

        var trr = parseInt(btrr.substring(0,btrr.indexOf("p")));
        var brr = parseInt(bbrr.substring(0,bbrr.indexOf("p")));

        var leftRadius = 0;
        var rightRadius = 0;

        if (tlr<=blr){
                leftRadius = parseInt(blr/2);
                calElement.style.marginLeft = leftRadius+'px';
        }else{
                leftRadius = parseInt(tlr/2);
                calElement.style.marginLeft = leftRadius+'px';
        }

        if (trr<=brr){
            rightRadius = parseInt(brr/2);
                calSibling.style.marginRight = rightRadius+'px';
        }else{
                rightRadius = parseInt(trr/2);
                calSibling.style.marginRight = rightRadius+'px';
        }

        var calParentStyleWidth = calParentStyle.width;
        var calParentParentStyleWidth = calParentParentStyle.width;
        var parentWidth = parseInt(calParentParentStyleWidth.substring(0,calParentParentStyleWidth.indexOf("p")));

        var calSiblingStyleWidth = calSiblingStyle.width;
        var imageWidth = parseInt(calSiblingStyleWidth.substring(0,calSiblingStyleWidth.indexOf("p")));

        calElement.style.width = (( parentWidth-(2*imageWidth)-leftRadius-rightRadius)/parentWidth)*100+'%';
    },

    
    calendarEventHandler : function(eventSource){

        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var id = domElement.getAttributeValueNS(target,"id");

        var cid;
        if(id.indexOf("show") > -1){
            cid= id.substr(4);
        }
    else if(id.indexOf("Div_") > -1){
            cid= id.substr(4);
        }
        else{
            cid= id;
        }

            /*
             * Sumanth Divvela, Aug 19, 2011: if calendar text field is selected
             * then get the calendar image element to get startdate and enddate.
             */
            target = domElement.getElementByIDNS("show"+cid);
        
		if(target == null)
			return;

        var title = target.getAttribute("title");
        var startDate = target.getAttribute("startdate");
        var endDate = target.getAttribute("enddate");
        startDate = kony.widgets.Calendar.formatDate(startDate);
        endDate = kony.widgets.Calendar.formatDate(endDate);
        //SUMA:Sep27,2011 Implemented calendar internationalization
        var months = target.getAttribute("months");
        var weekdays = target.getAttribute("weekdays");
		var days = target.getAttribute("days");
        months = eval(months);
        weekdays = eval(weekdays);
		days = eval(days);
        //SUMA:Dec16,2011 Supporting dates enabling and disabling feature in konycalendar
        var calendarenableddates = target.getAttribute("calendarenableddates");
        var calendarskin = target.getAttribute("calendarskin");
        var calendarskinfordates = target.getAttribute("calendarskinfordates");
        var enabledisableflag = target.getAttribute("enabledisableflag");
        var enabledstartdate = target.getAttribute("enabledstartdate");
        var enabledenddate = target.getAttribute("enabledenddate");
        var calendarskindates = target.getAttribute("calendarskindates");
        var mtdlist = target.getAttribute("mtdlist");
		
		target = domElement.getElementByIDNS(cid);
		var dateObj = target.value;			
		var formater = kony.widgets.Calendar.DateFormater;
		var dateval;
        if (dateObj) {            
            dateval = formater.convertToDate(dateObj,target.getAttribute("format"));
		}		
        
        if(enabledstartdate != null)
        {
            enabledstartdate = eval(enabledstartdate);
        }
        if(enabledenddate != null)
        {
            enabledenddate = eval(enabledenddate);
        }
        calendarenableddates = eval(calendarenableddates);

        if(enabledstartdate != null)
        {
            enabledstartdate = enabledstartdate.toString();
        }
        if(enabledenddate != null)
        {
            enabledenddate = enabledenddate.toString();
        }
        if(calendarskindates != null)
        {
            calendarskindates = eval(calendarskindates);
        }
        if(mtdlist != null)
        {
            mtdlist = eval(mtdlist);
        }

        E=YAHOO.util.Dom;

        var reg = E.getRegion(target);
        kony.widgets.Calendar.Popupview.targetH= target.clientHeight;
        kony.widgets.Calendar.Popupview.clientH= window.outerHeight;
        if( ( navigator.userAgent.match(/android/i) ) || ( navigator.userAgent.match(/BB10/i) ))
		{
			kony.widgets.Calendar.Popupview.clientH= window.innerHeight;
		}
        var isdisabled = target.getAttribute("disabled");
		if(isdisabled == null)
		{
			kony.widgets.Calendar.Popupview.showCalenderPopup(cid,-1,reg.top,title,startDate,endDate,months,weekdays,days,
			calendarenableddates,calendarskin,calendarskinfordates,enabledisableflag,enabledstartdate,enabledenddate,calendarskindates,mtdlist
			,dateval);
			window.scroll(0,reg.top);
		}
    },
     calendarChangeEventHandler : function(eventSource){

        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var id = domElement.getAttributeValueNS(target,"id");
        var cid = id.substr(0,id.indexOf("_"));
        var startDate = target.getAttribute("startdate");
        var endDate = target.getAttribute("enddate");
        startDate = kony.widgets.Calendar.formatDate(startDate);
        endDate = kony.widgets.Calendar.formatDate(endDate);

        kony.widgets.Calendar.Inlineview.updateDaysforInlineMode(cid,startDate,endDate);

    },
    unloadEventHandler: function(widget)
    {
        /*
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");

        kony.widgets.Utils.removeBlockUISkin(); */
    },

    formatDate: function(date)
    {
        if(date){
            try{
                date = date.replace("{", "[")
                date = date.replace("}", "]")
                date = eval(date);
                date = date[1] + "/" +date[0] + "/" + date[2];
            }catch(e){
                date = '';
            }
        }
        return date;
    }
}


/**
 *  This is inline Calendar developed inhouse for registering the calendars in inline mode and collapsible modes.
 *
 */
kony.widgets.Calendar.Button = {
/**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for a Calendar widget.
     */
    registerWidget: function()
    {
         var calendarButton = new kony.events.KEvent("click", "Kcalenbut", this.calendarButtonEventHandler);
         //kony.print("Inside Calendar Show Button widget Initilaization");
         kony.events.KEventManager.registerEvent(calendarButton);
    },
    calendarButtonEventHandler : function(eventSource){

        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var id = domElement.getAttributeValueNS(target,"id");

        var calendarID= id.split("_")[0];
        if(id.indexOf("updatecalen")>-1){
            kony.widgets.Calendar.Inlineview.updateCalendar(calendarID);
        }else if(id.indexOf("hidecalen")>-1){
            kony.widgets.Calendar.Inlineview.hideCalendar(calendarID);
        }else if(id.indexOf("showCalen")>-1){
            kony.widgets.Calendar.Inlineview.showCalendar(calendarID);
        }
    },
    unloadEventHandler: function(widget)
    {
        /*
        widget.removeAttribute("selected");
    widget.removeAttribute("disabled");

        kony.widgets.Utils.removeBlockUISkin(); */
    }
}

kony.widgets.RichText = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the rich Text widget.
     */
    registerWidget: function()
    {
         var richTextEvent = new kony.events.KEvent("click", "Krichtext", this.richTextEventHandler);
         //kony.print("Inside rich text widget Initilaization");
         kony.events.KEventManager.registerEvent(richTextEvent);
    },

    richTextEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object
        var target = domElement.getEventTarget(eventSource);
        if(target.getAttribute("kdisabled") != null || 
        		(target.parentNode && target.parentNode.getAttribute("kdisabled") != null))
        {
            return;
        }
        if (target){

            var isEvent = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);

            if (isEvent && isEvent.indexOf("yes") != -1){
                var href = target.getAttribute("href");
                //var params = href.split("&");

                /* Right now rich text widget does not support blocking or progress skins.
                    var blockinskin = domElement.getAttributeValueNS(target,kony.constants.KONY_BLOCK_UI_SKIN);
                    if(blockinskin && blockinskin.length>0){
                    kony.widgets.Utils.applyBlockUISkin(buttonid);
                    }
                 */

                var postData = kony.data.encodeFormData();               
                if(href != null)
                {
                    var params = href.split("&");
                    postData.push(params[1]); //formid
                    postData.push(params[2] + "x"); //event
                    if(params.length > 2) { //inside segment
                        postData.push(params[3]); //rowid
                        postData.push(params[4]); //segment id
                        postData.push(params[5]); //original href
                    }
                }
                else
                {
                    postData.push(target.getAttribute("id") + "event_=x");                    
                    var rowid = target.getAttribute("rowid");
                    if(rowid)
                    	postData.push("rowId="+rowid);
                    var segid = target.getAttribute("segmentid");                    
                    if(segid)
                    	postData.push("segmentId="+segid);
                }


                var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION);
                //displayProgressIndicator(eventid);

                // Before making the AJAX call to handle the DataGrid Lable event, register for the DataGrid unload event
                /*
                var richTextUnloadEvent = new kony.events.KUnloadEvent(richTextId, "Krichtext", kony.widgets.RichText.unloadEventHandler);
                kony.addGlobal(kony.constants.SELECTED_ITEM, richTextUnloadEvent);
                */

                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                kony.net.ajax.openReq(ajaxConfig, postData, null, null,eventSource);

            }

        }

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        /*widget.removeAttribute("selected");
    widget.removeAttribute("disabled");

        kony.widgets.Utils.removeBlockUISkin(); */
    }
}

kony.widgets.ImageGallery = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the Image Gallery widget.
     */
    registerWidget: function()
    {
         var imageGalleryEvent = new kony.events.KEvent("click", "Kimggal", this.imageGalleryClickEventHandler);
         //kony.print("Inside Image Gallery widget Initilaization");
         kony.events.KEventManager.registerEvent(imageGalleryEvent);

    },
    
    registerTouchWidget: function()
    {

         var imageGalleryTouchEvent = new kony.events.KEvent("swipe", "KTouchimggal", this.imageGalleryTouchEventHandler);
         //kony.print("Inside Image Gallery widget Initilaization");
         kony.events.KEventManager.registerTouchEvent(imageGalleryTouchEvent);

    },
    
    galleryLoadHandler2: function(domImg){

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
                var nWidth = domImg.naturalWidth;
                var nHeight = domImg.naturalHeight;
                var aspectRatio = nWidth / nHeight;
                var imgspace=domImg.style.marginRight;
				imgspace=imgspace.substring(0,imgspace.indexOf("px"));
				if(domImg.parentNode.nodeName=="A")
					var recperpage=parseInt(domImg.parentNode.parentNode.parentNode.getAttribute("recperpage"));
				else
				var recperpage=parseInt(domImg.parentNode.parentNode.getAttribute("recperpage"));
                cwt=1/recperpage;
				if(domImg.getAttribute("konywidgettype")=="Kimggal")
				{
                    offWidth = domImg.parentNode.parentNode.offsetWidth-(recperpage +1)*imgspace;
                    var imgwidth=offWidth*cwt;
				}
				else
                	{
					if(domImg.parentNode.nodeName=="A")
						offWidth=domImg.parentNode.parentNode.offsetWidth-(recperpage +1)*imgspace;
					else
                	offWidth=domImg.parentNode.offsetWidth-(recperpage +1)*imgspace;
                    var imgwidth = offWidth*cwt;                
                	}
                imageModel.isPercent = domImg.getAttribute("ispercent");
                var cat=document.getElementsByName("cat")[0];
                if(cat && cat.value==="nth")
                {
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
                    domImg.style.width = dimensions[1]+"px";
                    domImg.style.height = dimensions[0]+"px";
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
                    }
                }

                }
            else
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
            }
        //}
    },  


    imageGalleryClickEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object
        var target = domElement.getEventTarget(eventSource);

        if (target){


            var imageGalleryID = domElement.getAttributeValueNS(target, "id");


            var eventName = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT_NAME);
            if (eventName && eventName != null && target.getAttribute("disabled" )== null){

            var postData = kony.data.encodeFormData();
            postData.push(eventName + "=x");

            var currentForm = domElement.getCurrentForm();
            var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION);

            // Before making the AJAX call to handle the DataGrid Lable event, register for the DataGrid unload event
            var imageGalleryUnloadEvent = new kony.events.KUnloadEvent(imageGalleryID, "Kimggal", kony.widgets.ImageGallery.unloadEventHandler);
            kony.addGlobal(kony.constants.SELECTED_ITEM, imageGalleryUnloadEvent);

            //displayProgressIndicator(eventid);
            var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
            kony.net.ajax.openReq(ajaxConfig, postData, null, null,eventSource);
            }


        }



  },

    imageGalleryTouchEventHandler : function(eventSource)
    {
       kony.widgets.Utils.TouchHandlers.Swipe.onTouchStart(eventSource, this.imageGalleryGenericTouchProcessor);
    },

    imageGalleryGenericTouchProcessor: function(eventDetails)
    {
        //{target: targetElement,direction: this.distanceMovedInXDirection > 0 ? 'right' : 'left', eventType: "swipe"}
        if (eventDetails)
        {
            if (eventDetails.eventType === "swipe")
            {
                // Handle the swipe event associated with the image gallery widget.

                var domElement = new kony.dom.Element();
                var target = eventDetails.target;
                var direction = eventDetails.direction;
                var eventSource = eventDetails.eventSource;
                if (target){

                var isEvent = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);
                var imageGalleryID = domElement.getAttributeValueNS(target, "id");

                if (isEvent && isEvent.indexOf("yes") != -1){
                    var eventName = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT_NAME);
                    if (eventName && eventName != null){
                        var eventNameArry = eventName.split(".");
                        eventName = eventNameArry[0] + "." + (direction=="left"?"next":"prev") + "." + eventNameArry[2] + "." + eventNameArry[3];
                    }


                /* Right now rich text widget does not support blocking or progress skins.
                    var blockinskin = domElement.getAttributeValueNS(target,kony.constants.KONY_BLOCK_UI_SKIN);
                    if(blockinskin && blockinskin.length>0){
                    kony.widgets.Utils.applyBlockUISkin(buttonid);
                    }
                 */
                    var postData = kony.data.encodeGenericWidgetData();
                    postData.push(eventName + "=x");

                    var currentForm = domElement.getCurrentForm();
                    var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION);

                    // Before making the AJAX call to handle the DataGrid Lable event, register for the DataGrid unload event
                    var imageGalleryUnloadEvent = new kony.events.KUnloadEvent(imageGalleryID, "KTouchimggal", kony.widgets.ImageGallery.unloadEventHandler);
                    kony.addGlobal(kony.constants.SELECTED_ITEM, imageGalleryUnloadEvent);

                    //displayProgressIndicator(eventid);
                    var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                    kony.net.ajax.openReq(ajaxConfig, postData, null, null,eventSource);

                }

            }
        }
    }
    },


    /*  IMAGE STRIP */
    handleImageGalleryResponse : function(responseData,eventSource)
    {

        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object


        var imageData = responseData.data;
        if(imageData){
            var target = domElement.getEventTarget(eventSource);

            // Get the touch handler Parent.
            target = kony.widgets.Utils.TouchHandlers.getTouchParent(target);

            var name = target.getAttribute("id");
            //target = target.parentNode.parentNode.parentNode;
            var size = imageData.length;
            var index = 0, endRecord = size, meta = responseData.meta;
            if(meta){
                var startRecord =meta.StartRecord;
                endRecord =meta.EndRecord;
                var totalRecords = meta.TotalRecords;
                size = endRecord-startRecord+1;
            }
            var tables = target.children;
            if(tables.length == 1){
                var arrow =tables[0].children[0].children[0].children[0];
                var classname = arrow.className;
                classname = classname.replace("inactive", "");
                if(startRecord == 1){
                    classname = classname + "inactive";
                }
                arrow.className = classname;
                arrow = tables[0].children[0].children[2].children[0];
                classname = arrow.className;
                classname = classname.replace("inactive", "");
                if(totalRecords == endRecord){
                    classname = classname + "inactive";
                }
                arrow.className = classname;
                tables = tables[0].children[0].children[1].children;
            }
            var imgTable = tables[0];
            //Render images
            var rows = imgTable.children;
            var cells = null, img = null;
            var focusedindex = responseData.focusedindex;
            var skin = document.getElementById(name+"Skin").value;
            var focusSkin = document.getElementById(name+"FocusSkin").value;
            var imgpath = null;
            var url = null;
            var relUrl = null;
            for(var j=0,rowcount=rows.length;j < rowcount; j++){
                cells = rows[j].children;
                for(var k=0,cellcount=cells.length;k < cellcount; k++){
                    if(index+1 == focusedindex){
                        cells[k].setAttribute("class", focusSkin);
                    }else{
                        cells[k].setAttribute("class", skin);
                    }
                    img =  cells[k].getElementsByTagName("img")[0];
                    url =  img.getAttribute("src");
                    imgpath = imageData[index];
                    if(imgpath.indexOf("http:") > -1){
                        url =imgpath;
                    }else{
                        if(relUrl == null)
                            relUrl = url.substring(0, url.lastIndexOf("/")+1);
                        url = relUrl + imgpath;
                    }
                    img.setAttribute("src",url);
                    index++;
                }
            }
            //Render navigation
            var navTable = tables[1];
            rows = navTable.children;
            cells = rows[0].children;
            var imgs = cells[0].children;
            url =  imgs[0].getAttribute("src");
            relUrl = url.substring(0, url.lastIndexOf("/"));
            for(var j=0,count=imgs.length;j<count; j++){
                if( j+1 == (endRecord/size)){
                    imgs[j].setAttribute("src",relUrl+"/whitedot.gif");
                }else{
                    imgs[j].setAttribute("src",relUrl+"/blackdot.gif");
                }
            }

            target = tables = responseData = imageData = cells = rows = null;
            meta = url = relUrl = imgs = navTable = img = imgTable = imgpath =  null;
        }
    },
    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
        /*widget.removeAttribute("selected");
    widget.removeAttribute("disabled");

        kony.widgets.Utils.removeBlockUISkin(); */
    }
}


/**
 *  Event Handler for the Horizontal Image Strip widget.
 *
 *  The following structure is required for the image strig
 *  <div name="hstriptouchcontainer">
 *      <div name="hstripimagefolder">
 *          <div> Individual Images </div>
 *          <div> Individual Images </div>
 *          <div> Individual Images </div>
 *      </div>
 *  </div>
 *
 *
 */
kony.widgets.HorizontalImageStrip = {

    speedOfSlide : 500,
    /**
     * Image Strip Widget Context
     */
    ImageStripWidgetContext : function(id)
    {
        this.id = id;
        this.currentPage = 0;
        this.widthRatio = 0;
        this.imageWidth = 0;
    },

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the Horizontal Image Strip widget.
     */
    registerWidget: function()
    {
         var horizontalImageStripEvent = new kony.events.KEvent("click", "Khstrip", this.horizontalImageStripClickEventHandler);
         kony.events.KEventManager.registerEvent(horizontalImageStripEvent);

         var horizontalImageStripOrientationEvent = new kony.events.KEvent("onorientationchange", "HorizontalImageStrip", this.horizontalStripOrentationHandler);
         kony.events.KEventManager.registerEvent(horizontalImageStripOrientationEvent);

    },
    
    registerTouchWidget: function()
    {
         var horizontalImageStripTouchEvent = new kony.events.KEvent("swipe", "KTouchstrip", this.horizontalStripSwipeHandler);
         kony.events.KEventManager.registerTouchEvent(horizontalImageStripTouchEvent);

         this.computeImageStripWidths();
    },

    horizontalImageStripClickEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object
        var target = domElement.getEventTarget(eventSource);

        if (target)
        {
            var imageGalleryID = domElement.getAttributeValueNS(target, "id");
            var eventName = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT_NAME);
            if (eventName && eventName != null && target.getAttribute("disabled" )== null)
            {
                var postData = kony.data.encodeFormData();
                postData.push(eventName + "=x");

                var currentForm = domElement.getCurrentForm();
                var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION);

                // Before making the AJAX call to handle the DataGrid Lable event, register for the DataGrid unload event
                var horizontalImageStripUnloadEvent = new kony.events.KUnloadEvent(imageGalleryID, "Khstrip", kony.widgets.HorizontalImageStrip.unloadEventHandler);
                kony.addGlobal(kony.constants.SELECTED_ITEM, horizontalImageStripUnloadEvent);

                //displayProgressIndicator(eventid);
                var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                kony.net.ajax.openReq(ajaxConfig, postData, null, null,eventSource);
            }
        }
    },
/*
    horizontalImageStripTouchEventHandler : function(eventSource)
    {
       kony.widgets.Utils.TouchHandlers.Swipe.onTouchStart(eventSource, kony.widgets.HorizontalImageStrip.horizontalImageStripGenericTouchProcessor);
    },

    horizontalImageStripGenericTouchProcessor: function(eventDetails)
    {
        //eventDetails  format = {target: targetElement,direction: 'right'/'left', eventType: "swipe",eventSource}
        if (eventDetails)
        {
            if (eventDetails.eventType === "swipe")
            {
                // Handle the swipe event associated with the image gallery widget.
                var domElement = new kony.dom.Element();
                var target = eventDetails.target;
                var direction = eventDetails.direction;
                var eventSource = eventDetails.eventSource;
                if (target){

                    var imageGalleryID = domElement.getAttributeValueNS(target, "id");
                    var eventName = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT_NAME);
                    if (eventName && eventName != null){
                        var eventNameArry = eventName.split(".");
                        eventName = eventNameArry[0] + "." + (direction=="left"?"next":"prev") + "." + eventNameArry[2] + "." + eventNameArry[3];
                    }

                    var postData = kony.data.encodeGenericWidgetData(target);
                    postData.push(eventName + "=x");

                    var currentForm = domElement.getCurrentForm();
                    var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION);

                    // Before making the AJAX call to handle the DataGrid Lable event, register for the DataGrid unload event
                    var imageGalleryUnloadEvent = new kony.events.KUnloadEvent(imageGalleryID, "KTouchhstrip", kony.widgets.HorizontalImageStrip.unloadEventHandler);
                    kony.addGlobal(kony.constants.SELECTED_ITEM, imageGalleryUnloadEvent);

                    //displayProgressIndicator(eventid);
                    var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                    kony.net.ajax.openReq(ajaxConfig, postData, null, null ,eventSource);

                }
            }
        }
    },
     /**
     * This is a special action where in the data is passed to the widget as a json instead of the entire form being refreshed and
     * hence requires special processing.
     *
     */
/*
    handleHorizontalStripResponse: function(responseData,eventSource){

        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object
        var target = domElement.getEventTarget(eventSource);
        var imageData = responseData.data;
        var size = imageData.length;
        var startRecord = 0;
        var endRecord = size;
        var totalRecs = size;
        var id = target.getAttribute("id");
        var pageNo = responseData.pagenumber;
        var recPerPage = document.getElementById(id+"recperpage").value;
        var dataStartRec = 1;
        var dataEndRec = size;

        if(responseData.meta){
            dataStartRec = responseData.meta.StartRecord;
            dataEndRec = responseData.meta.EndRecord;
            totalRecs = responseData.meta.TotalRecords;
        }

        startRecord = pageNo*recPerPage - dataStartRec + 1;
        endRecord = (pageNo+1)*recPerPage - dataStartRec + 1;

        if(endRecord >= totalRecs){
            startRecord = startRecord - (endRecord - totalRecs);
        }
        var focusedindex = responseData.focusedindex;
        var skin = document.getElementById(id+"Skin").value;
        var focusSkin = document.getElementById(id+"FocusSkin").value;

        // alert(target.localName);
        if(target.localName == 'img')
            target = target.parentNode;

        var list = target.children;
        if(list[0].localName=='div'){
            var arrow =list[0].children[0].children[0].children[0];
            var classname = arrow.className;
            classname = classname.replace("inactive", "");
            if(pageNo == 0){
                classname = classname + "inactive";
            }
            arrow.className = classname;
            arrow = list[0].children[0].children[2].children[0];
            classname = arrow.className;
            classname = classname.replace("inactive", "");
            if(totalRecs <= endRecord){
                classname = classname + "inactive";
            }
            arrow.className = classname;
            list = list[0].children[0].children[1].children;

        }else if(list[list.length -1].localName=='div'){

            //Render navigation
            var rows = null, cells = null;
            var navTable = list[list.length -1];
            rows = navTable.children;
            cells = rows[0].children;
            var imgs = cells[0].children;
            url =  imgs[0].getAttribute("src");
            relUrl = url.substring(0, url.lastIndexOf("/"));
            for(var j=0,count=imgs.length;j<count; j++){
                if( j == pageNo){
                    imgs[j].setAttribute("src",relUrl+"/whitedot.gif");
                }else{
                    imgs[j].setAttribute("src",relUrl+"/blackdot.gif");
                }
            }
        }
        var node = null;
        var imgpath = null;
        var url = null;
        var relUrl = null;
        //alert("HandleImgGalData: " + imgobj.meta.StartRecord + " " + id);
        for(var j=0; j >= 0 && j < list.length && j < size ; j++ ){
            node = list[j];
            if(node.localName.toLowerCase() == "a"){
                node.setAttribute("rowid",startRecord);
                node = node.getElementsByTagName("img")[0];
            }
            if(node.localName.toLowerCase() == "img"){
                url =  node.getAttribute("src");
                imgpath = imageData[startRecord];
                if(imgpath.indexOf("http:") > -1){
                    url =imgpath;
                }else{
                    if(relUrl == null)
                        relUrl = url.substring(0, url.lastIndexOf("/")+1);
                    url = relUrl + imgpath;
                }
                node.setAttribute("src",url);
                var eventName = node.getAttribute("eventname");
                var eventNameArry = eventName.split(".");
                eventName = eventNameArry[0] + "." + startRecord
                + "." + eventNameArry[2] + "." + eventNameArry[3];
                node.setAttribute("eventName",eventName);
                startRecord++;
                if(startRecord == focusedindex){
                    node.setAttribute("class", focusSkin);
                }else{
                    node.setAttribute("class", skin);
                }

            }
        }
        list  = responseData = imageData =  null;
        node = url = relUrl = imgpath =  null;
    }
     */
    
    /**
      * As different image strips in the application might have different events for which they might have registered
      * besides the normal swipe. The event information for which the strip might have registered should be part of the
      * widget itself.
      *
      * Also for each of the strip widget there is a state associated which is needed when the swipe event happens.
      * Based on the direction of the movement of the swipe, the strip should move either left or right.
      *
      * This state is maintained for the image strip in a WidgetContext
      */
    computeImageStripWidths : function()
    {
        var konyElement = new kony.dom.Element();
    var hStripElements = document.getElementsByName("touchcontainer_KTouchstrip");
        if(hStripElements)
        {
            for(var i=0; i<hStripElements.length; i++ )
            {
                var hStripElement = hStripElements[i];

                var imgsElement = hStripElement.children[0];
                var individualImages = imgsElement.children;
				if(individualImages.length == 0)
					continue;
                var noOfSwipePages = individualImages.length;
                imgsElement.style.width = noOfSwipePages*100+"%";
                 var widthRatio=0;
                var IMG_WIDTH=0;

                for(var j=0;j<individualImages.length;j++)
                {
                    individualImages[j].style.display = "inline";
                    individualImages[j].style.width = "100%";

                    individualImages[j].style.width = individualImages[j].clientWidth/noOfSwipePages+'px';

                }
                IMG_WIDTH = individualImages[0].clientWidth;

                if(window.orientation===90 || window.orientation===-90) // portrait
                    widthRatio = IMG_WIDTH/screen.height;
                else if(window.orientation===0 || window.orientation===180) // landscape
                    widthRatio = IMG_WIDTH/screen.width;

                individualImages[0].style.display = "block";

                hStripElement.setAttribute("imageWidth", IMG_WIDTH);
                hStripElement.setAttribute("ratio", widthRatio);

                //footer.innerHTML += " Image strip widget not found";
                var imageStripWidgetContext = new kony.widgets.HorizontalImageStrip.ImageStripWidgetContext(hStripElement.id);
                imageStripWidgetContext.imageWidth = IMG_WIDTH;
                imageStripWidgetContext.widthRatio = widthRatio;

                var index = parseInt(konyElement.getAttributeValueNS(imgsElement, "index"))-1;
                imageStripWidgetContext.currentPage = index;


                kony.addGlobal(hStripElement.id, imageStripWidgetContext);

                kony.widgets.Segment.PageView.scrollImages(imgsElement, imageStripWidgetContext.imageWidth * imageStripWidgetContext.currentPage, this.speedOfSlide,true);
                kony.widgets.Segment.PageView.updatePageIndicator(hStripElement, imageStripWidgetContext);

            }
        }
    },
    horizontalStripSwipeHandler : function(eventSource, touchContext)
    {

        var konyElement = new kony.dom.Element();

        // Retrieve the parent touch container - Div with ID hstripID_touchContainer
        var touchContainerWidget = konyElement.getElementByIDNS(touchContext.targetWidgetID);

        var imgsElement = touchContainerWidget.children[0];
        //var footer = konyElement.getElementByIDNS("footer");

        //footer.innerHTML += " <br/> I am in Swipe Handler and my touch Context Info is as follows <br/>" + touchContext.printContext();
        var imageStripWidgetContext = kony.getGlobal(touchContext.targetWidgetID);

        if (!imageStripWidgetContext)
        {
            //footer.innerHTML += " Image strip widget not found";
            imageStripWidgetContext = new kony.widgets.HorizontalImageStrip.ImageStripWidgetContext(touchContext.targetWidgetID);
            imageStripWidgetContext.imageWidth = konyElement.getAttributeValueNS(touchContainerWidget, "imageWidth");
            imageStripWidgetContext.widthRatio = konyElement.getAttributeValueNS(touchContainerWidget, "ratio");

            kony.addGlobal(touchContext.targetWidgetID, imageStripWidgetContext);
        }


        //If we are moving before swipe, and we are going Lor R in X mode, or U or D in Y mode then drag.
        if( touchContext.currentTouchPhase == kony.widgets.touch.TouchContext.STATE_MOVE &&
            (touchContext.direction==kony.widgets.touch.TouchContext.LEFT || touchContext.direction==kony.widgets.touch.TouchContext.RIGHT) )
        {
            var duration=0;

            if (touchContext.direction == kony.widgets.touch.TouchContext.LEFT)
                kony.widgets.HorizontalImageStrip.scrollImages(imgsElement,(imageStripWidgetContext.imageWidth * imageStripWidgetContext.currentPage) + touchContext.distance, duration);

            else if (touchContext.direction == kony.widgets.touch.TouchContext.RIGHT)
                kony.widgets.HorizontalImageStrip.scrollImages(imgsElement,(imageStripWidgetContext.imageWidth * imageStripWidgetContext.currentPage) - touchContext.distance, duration);
        }
        else if ( touchContext.currentTouchPhase  == kony.widgets.touch.TouchContext.STATE_CANCEL)
        {
            kony.widgets.HorizontalImageStrip.scrollImages(imgsElement,imageStripWidgetContext.imageWidth * imageStripWidgetContext.currentPage, this.speedOfSlide);
        }
        else if ( touchContext.currentTouchPhase  ==kony.widgets.touch.TouchContext.STATE_END )
        {

             //footer.innerHTML += " Iin end. Current Page No is" + imageStripWidgetContext.currentPage;

            if (touchContext.direction == kony.widgets.touch.TouchContext.RIGHT){
                kony.widgets.HorizontalImageStrip.previousImage(touchContainerWidget, imageStripWidgetContext, false);
                kony.widgets.HorizontalImageStrip.updatePageIndicator(touchContainerWidget, imageStripWidgetContext);
            }
            else if (touchContext.direction == kony.widgets.touch.TouchContext.LEFT){
                kony.widgets.HorizontalImageStrip.nextImage(touchContainerWidget,imageStripWidgetContext, false);
                kony.widgets.HorizontalImageStrip.updatePageIndicator(touchContainerWidget, imageStripWidgetContext);
            }else if (touchContext.direction == kony.widgets.touch.TouchContext.UP)
            {
                window.scrollTo(0, 50);
            }
            else if (touchContext.direction == kony.widgets.touch.TouchContext.DOWN)
            {
                window.scrollTo(0, -50);
            }
            //kony.removeGlobal(touchContext.targetWidgetID);
        }

    },


    /**
     * Event raised during orientation change.
     *
     */
    horizontalStripOrentationHandler : function(orientation)
    {
        var hStripElements = document.getElementsByName("touchcontainer_KTouchstrip");
        if(hStripElements)
        {

            for(var i=0; i<hStripElements.length; i++ )
            {
                var hStripElement = hStripElements[i];

                var imageStripWidgetContext = kony.getGlobal(hStripElement.id);

                if (!imageStripWidgetContext)
                    continue;


                var imgsElement = hStripElement.children[0];
                // Retrieve the Individual Images pages of the imagestripe
                var individualImages = imgsElement.children;


                var noOfSwipePages = individualImages.length;

                imgsElement.style.width = noOfSwipePages*100+"%";

                var IMG_WIDTH=0;

                /**
                 * First set all the images to display none except the current Image /Page. This is done
                 * to avoid flickering while performing the width calculations on change in the orientation.
                 */
                for(var j=0;j<individualImages.length;j++)
                {
                    if (j != (imageStripWidgetContext.currentPage + 1) )
                    {
                        individualImages[j].style.display = "none";
                    }
                }


                var pageWidthInLandScape = screen.height*imageStripWidgetContext.widthRatio+'px';
                var pageWidthInPortrait  = screen.width*imageStripWidgetContext.widthRatio+'px';


                /**
                 * Iterate thru the invidiual images and calculate their width and height.
                 */
                for(var k=0;k<individualImages.length;k++)
                {
                    if( ( navigator.userAgent.match(/android/i) ) || ( navigator.userAgent.match(/BlackBerry/i) ) )
                    {
                        if(orientation === "landscape")
                            individualImages[k].style.width = pageWidthInPortrait;
                        else if(orientation === "portrait")
                            individualImages[k].style.width = pageWidthInPortrait;
                    }else{
                        if(orientation === "landscape")
                            individualImages[k].style.width = pageWidthInLandScape;
                        else if(orientation === "portrait")
                            individualImages[k].style.width = pageWidthInPortrait;
                    }
                }

                IMG_WIDTH = individualImages[0].parentNode.clientWidth/noOfSwipePages;
                imageStripWidgetContext.imageWidth = IMG_WIDTH;
                hStripElement.setAttribute("imageWidth", IMG_WIDTH);


                if (imageStripWidgetContext.currentPage  === (noOfSwipePages - 1))
                {
                     kony.widgets.HorizontalImageStrip.previousImage(hStripElement,imageStripWidgetContext, true);
                     kony.widgets.HorizontalImageStrip.nextImage(hStripElement,imageStripWidgetContext, true);
                }
                else
                {
                   kony.widgets.HorizontalImageStrip.nextImage(hStripElement,imageStripWidgetContext, true);
                    kony.widgets.HorizontalImageStrip.previousImage(hStripElement,imageStripWidgetContext, true);
                }

                for(var j=0;j<individualImages.length;j++)
                {
                   individualImages[j].style.display = "inline";
                }

            }
        }
    },

    /**
     *  Get the previous Page
     *
     */
    previousImage : function(touchContainerElement, imageStripWidgetContext, orientationChanged)
    {
        var imgsElement = touchContainerElement.children[0];
        //var footer = document.getElementById("footer");
        //footer.innerHTML += imageStripWidgetContext.currentPage + " :: " + imageStripWidgetContext.imageWidth ;
        imageStripWidgetContext.currentPage = Math.max(imageStripWidgetContext.currentPage-1, 0);
        kony.widgets.HorizontalImageStrip.scrollImages(imgsElement, imageStripWidgetContext.imageWidth * imageStripWidgetContext.currentPage, this.speedOfSlide,orientationChanged);
    },

    /**
     * Get the Next Page
     *
     */
    nextImage : function(touchContainerElement, imageStripWidgetContext, orientationChanged)
    {
        var elem = touchContainerElement.children[0];
        var noOfSwipePages = elem.children.length;

        imageStripWidgetContext.currentPage = Math.min(imageStripWidgetContext.currentPage+1, noOfSwipePages-1);
        kony.widgets.HorizontalImageStrip.scrollImages( elem,imageStripWidgetContext.imageWidth * imageStripWidgetContext.currentPage, this.speedOfSlide,orientationChanged);
    },


    /**
     * Scroll Images given the distance, duration and the orentation flag.
     *
     */
    scrollImages : function(elem,distance, duration, isOriented)
    {

        var imgs = elem;

        // var footer = document.getElementById("footer");
        //footer.innerHTML += " <br/> Distance: " + distance + " Duration: " + duration  + "Orientation :" + isOriented ;

        if(!isOriented){
            imgs.style.webkitTransition = "-webkit-transform "  + (duration/1000).toFixed(1)+"s ";
        }
        else{
            imgs.style.webkitTransition = "-webkit-transform 0 0";
        }

        //inverse the number we set in the css
        var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
        imgs.style.webkitTransform = "translate3d("+value +"px,0px,0px)"

    },

    updatePageIndicator :function (touchContainerElement, imageStripWidgetContext)
    {

    var index = imageStripWidgetContext.currentPage;
    var navTable = touchContainerElement.nextElementSibling;
    if(navTable)
        {
            var rows = navTable.children;
            var cells = rows[0].children;
            var imgs = cells[0].children;
            var url =  imgs[0].getAttribute("src");
            var relUrl = url.substring(0, url.lastIndexOf("/"));
            for(var j=0,count=imgs.length;j<count; j++)
            {
                if( j == index){
                        imgs[j].setAttribute("src",relUrl+"/whitedot.gif");
                }else{
                        imgs[j].setAttribute("src",relUrl+"/blackdot.gif");
                }
            }
    }

    },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {
    }
}

kony.widgets.Switch = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the Switch widget.
     */
    registerWidget: function()
    {
        var switchEvent = new kony.events.KEvent("click", "Kswitch", this.switchEventHandler);
         //kony.print("Inside Switch widget Initilaization");
         kony.events.KEventManager.registerEvent(switchEvent);
    },
    switchEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object
        var target = domElement.getEventTarget(eventSource);
        var switchID = kony.widgets.Switch.findParentswitch(target).id;
        var isEvent = domElement.getAttributeValueNS(target, kony.constants.KONY_EVENT);

        var firstnodeskin;
        var parent;
        var targetclassname = target.className;
        var firstnode;

        if(targetclassname.indexOf("krow") != -1){
            firstnode = kony.widgets.Switch.findChildSwitch(target);
            firstnodeskin = firstnode.getAttribute("class");
            parent = target;

        } else {
            firstnode = kony.widgets.Switch.findfirstSwitch(target);
            parent = kony.widgets.Switch.findParentswitch(target);
            firstnodeskin = firstnode.getAttribute("class");
        }

        if (firstnodeskin.indexOf("off") != -1) {
            firstnodeskin = firstnodeskin.replace("off", "on");
            firstnode.className = firstnodeskin;
            firstnode.innerHTML =firstnode.getAttribute("lefttext");
        }
        else {
            firstnodeskin = firstnodeskin.replace("on", "off");
            firstnode.className = firstnodeskin;
            firstnode.innerHTML =firstnode.getAttribute("righttext");
        }

        /**
         * switchStatus:
         * 1.0 indicates ON status
         * 2.0 indicates OFF status
         */
        var switchStatus;

        if(parent.getAttribute("toggled") == "1.0")
            switchStatus ="2.0";
        else
            switchStatus ="1.0";

        parent.setAttribute("toggled", switchStatus);
        var parentid = parent.getAttribute("id");

        //Remove switch widget in the parent id string
        var parentIdAfterReplace=parentid.replace("switchwidget","");

        if(isEvent && isEvent.indexOf("yes") != -1)
        {

            var postData = kony.data.encodeFormData();

            eventSource.preventDefault();
            postData.push( parentIdAfterReplace+ "event_=x");
            postData.push( parentIdAfterReplace + "="+switchStatus);

            var currentForm = domElement.getCurrentForm();
            var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION);

            // Before making the AJAX call to handle the Switch event, register for the Switch unload event

            var imageGalleryUnloadEvent = new kony.events.KUnloadEvent(switchID, "Kswitch", kony.widgets.Switch.unloadEventHandler);
            kony.addGlobal(kony.constants.SELECTED_ITEM, imageGalleryUnloadEvent);


            var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
            kony.net.ajax.openReq(ajaxConfig, postData, null, null,eventSource);

        }
        else
        {
            var parentObject=document.getElementById(parentIdAfterReplace);
            parentObject.setAttribute("toggled", switchStatus);
            parentObject.setAttribute("value", switchStatus);
        }
    },
    findChildSwitch: function(clicked){
        var childnode = clicked.childNodes[1];
        var childid = childnode.getAttribute("id");
        var child = document.getElementById(childid);
        return child;
    },
    findParentswitch: function(node){
        var parentnode = node.parentNode;
        return parentnode;
    },
    findfirstSwitch: function(clicked){
        var parentnode = clicked.parentNode;
        var parentid = parentnode.getAttribute("id");
        var first = document.getElementById(parentid+"first");
        return first;
    },
    unloadEventHandler: function(widget)
    {
        /*widget.removeAttribute("selected");
    widget.removeAttribute("disabled");

        kony.widgets.Utils.removeBlockUISkin(); */
    }
}


kony.widgets.Phone = {

    /**
     * Register a widget with the kony event manager. When ever an event is fired, this handler is invoked by the event manager
     * when it determines that the event is for the Phone widget.
     */
    registerWidget: function()
    {
         var phoneEvent = new kony.events.KEvent("click", "Kphone", this.phoneEventHandler);
         //kony.print("Inside Phone widget Initilaization");
         kony.events.KEventManager.registerEvent(phoneEvent);
    },

    phoneEventHandler : function(eventSource)
    {
        var domElement = new kony.dom.Element();
        eventSource = eventSource || window.event;   //For IE where window.event is global object

        var target = domElement.getEventTarget(eventSource);
        var href = domElement.getAttributeValueNS(target, "href");
        href = href.replace("tel:","");
        href = href.replace(new RegExp('-',"g"),'');
        if(isNaN(href.trim()))
            href = kony.widgets.Utils.convertPhoneAlphabetToNumber(href);
        href = "tel:"+href;
        try{
            window.location.href = href;
        }catch(e){}

        return false;

  },

    /**
     * This is called as a part of the body unload event to remove any of the widget specific items. like for eg, progress indicators
     */
    unloadEventHandler: function(widget)
    {

    }

}


kony.widgets.Scroller ={

    registerWidget: function(){

       var scrollerNodes = document.getElementsByName("touchcontainer_KScroller");
        for (var i = 0; i < scrollerNodes.length; i++) 
        {
            var _scrollerId = scrollerNodes[i].id;
            var scrollerId = _scrollerId.substring(0, _scrollerId.lastIndexOf("_"));
            
            // Read attributes from scroller
            var _scrollerDOMNode = document.getElementById(_scrollerId);
            var widgetType = _scrollerDOMNode.getAttribute("widgetType");
            var swipeDirection = _scrollerDOMNode.getAttribute("swipeDirection");
            
            var options = {};
            // TODO: Do we need scrollbar for box?
            if (swipeDirection == "vertical") 
            {
                options.vScroll = true;
                //options.vScrollbar = true;
            }
            else if (swipeDirection == "horizontal") 
            {
                options.hScroll = true;
                //options.hScrollbar = true;
            }
            else    // both
            {
                options.vScroll = true;
                //options.vScrollbar = true;
                options.hScroll = true;
                //options.hScrollbar = true;
            }
            
            if (widgetType == "form") 
            {
                kony.widgets.Scroller.setHeight(scrollerId);
                options.vScrollbar = true;
            }
            else
                options.scrollbox = true;
            
            options.formid = scrollerId;
            
            var scrollerInstance = new kony.widgets.touch.konyScroller(scrollerId + '_scroller', options);
            
            // TODO:
            if (swipeDirection == "horizontal" || swipeDirection == "both")
            {
                _scrollerDOMNode.children[0].style.width = _scrollerDOMNode.children[0].scrollWidth + "px";
                scrollerInstance.refresh();
            }
              var timer= setInterval(function () {
                              //Footer added
                    kony.widgets.Scroller.checkDOMChanges(scrollerId + "_scroller", "form1_header", "scroller_footer");
                }, 1000);
            // Save scroller instance
            kony.addGlobal(scrollerId + '_scroller', scrollerInstance);
        }
    },

    setHeight:function (scrollerId)
    {
        /*
        Header
          |
        Form
          |
        Footer
          |
        AppMenu
    */

        this.headerH = 0;
        this.footerH = 0;
        this.appmenuH = 0;

        var _scrollerDOMNode = document.getElementById(scrollerId + "_scroller");
        
        //var header = document.getElementById('scroller_header');
        //var footer = document.getElementById('scroller_footer');
        
        var header = document.getElementById("form1_header");
        var footer = document.getElementById('scroller_footer');
        
        var appmenu = document.getElementById(scrollerId + "konyappmenudiv");
        
        if(header)
            this.headerH = header.offsetHeight;
        if (appmenu) 
            this.appmenuH = appmenu.offsetHeight;
        if(footer)
        {
            this.footerH = footer.offsetHeight;
            footer.style.bottom = this.appmenuH + "px";
        }

        _scrollerDOMNode.style.top = this.headerH + 'px';
        _scrollerDOMNode.style.bottom = this.footerH + this.appmenuH + 'px';
    /*
         if(header)
           headerH = header.offsetHeight;
        if (appmenu) 
            appmenuH = appmenu.offsetHeight;
        if(footer)
        {
            footerH = footer.offsetHeight;
            footer.style.bottom = appmenuH + "px";
        }

        _scrollerDOMNode.style.top = headerH + 'px';
        _scrollerDOMNode.style.bottom = footerH + appmenuH + 'px'; */
    },
    
    checkDOMChanges: function(_scrollerId, headerId, footerId)
    {
            //alert("hello");
        var headerNode = document.getElementById(headerId);
        var footerNode = document.getElementById(footerId);
        var appmenuNode = document.getElementById("konyappmenudiv");
        
        if(headerNode && (this.headerH != headerNode.offsetHeight))
        {
            var _scrollerDOMNode = document.getElementById(_scrollerId);
            var scrollerInstance = kony.getGlobal(_scrollerId);
            
            if(_scrollerDOMNode && scrollerInstance)
            {
                this.headerH = headerNode.offsetHeight;
                _scrollerDOMNode.style.top = headerNode.offsetHeight + "px";
                scrollerInstance.refresh();
            }
        }   
        if(footerNode && (this.footerH != footerNode.offsetHeight))
        {
            var _scrollerDOMNode = document.getElementById(_scrollerId);
            var scrollerInstance = kony.getGlobal(_scrollerId);
            
            if(_scrollerDOMNode && scrollerInstance)
            {
                this.footerH = footerNode.offsetHeight;
                _scrollerDOMNode.style.bottom = footerNode.offsetHeight + "px";
                scrollerInstance.refresh();
            }
        }       
        if(appmenuNode && (this.appmenuH != appmenuNode.offsetHeight))
        {
            var _scrollerDOMNode = document.getElementById(_scrollerId);
            var scrollerInstance = kony.getGlobal(_scrollerId);
            
            if(_scrollerDOMNode && scrollerInstance)
            {
                this.appmenuH = appmenuNode.offsetHeight;
                _scrollerDOMNode.style.bottom = appmenuNode.offsetHeight + "px";
                scrollerInstance.refresh();
            }
        }
    }

    /*
    scrollerSwipeHandler: function(event, touchContext)
    {
        //console.log(event.type);
                var scrollerId = touchContext.targetWidgetID; // TODO: Check if a better way to retrieve
        //console.log(scrollerId);
                var scrollerInstance = kony.getGlobal(scrollerId);
        //var touch = event.touches && event.touches[0];
            if ((scrollType == "vertical" && (touchContext.direction == kony.widgets.touch.TouchContext.UP ||
                    touchContext.direction == kony.widgets.touch.TouchContext.DOWN) || (scrollType == "horizontal" &&
                        (touchContext.direction == kony.widgets.touch.TouchContext.LEFT ||
                            touchContext.direction == kony.widgets.touch.TouchContext.RIGHT))))
            {
        // Dispatch events
        if(event.type == "touchstart" || event.type == "mousedown")
        {
            scrollerInstance.onTouchStart(event);
        }
        else if(event.type == "touchmove" || event.type == "mousemove")
        {
            scrollerInstance.onTouchMove(event);
        }
        else if(event.type == "touchend" || event.type == "mouseup")
        {
            scrollerInstance.onTouchEnd(event);
        }
        else if(event.type == "orientationchange" || event.type == "resize")
        {
            scrollerInstance.resize(event);
        }
    }
    },

        onorientationchange: function()
        {

        
        }*/
    }

if(kony.widgets.Form)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Form);
if(kony.widgets.HBox)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.HBox);	
if(kony.widgets.Button)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Button);
if(kony.widgets.Image)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Image);
if(kony.widgets.Image2)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Image2);

if(kony.widgets.Link)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Link);
if(kony.widgets.CheckBoxGroup)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.CheckBoxGroup);
if(kony.widgets.RadioButtonGroup)    
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.RadioButtonGroup);
if(kony.widgets.TextField)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.TextField);
if(kony.widgets.ListBox)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.ListBox);
if(kony.widgets.ComboBox)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.ComboBox);
if(kony.widgets.Phone)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Phone);
if(kony.widgets.RichText)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.RichText);
if(kony.widgets.Switch)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Switch);

if(kony.widgets.Segment){
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Segment);
if(kony.widgets.Segment.Button)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Segment.Button);
if(kony.widgets.Segment.Link)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Segment.Link);

if(kony.widgets.Segment.PageView)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Segment.PageView);
}

if(kony.widgets.DataGrid){
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.DataGrid);
if(kony.widgets.DataGrid.Label)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.DataGrid.Label);
if(kony.widgets.DataGrid.Image)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.DataGrid.Image);
}

if(kony.widgets.Calendar){
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Calendar);
    if(kony.widgets.Calendar.Button)
        kony.widgets.KWidgetManager.supportWidget(kony.widgets.Calendar.Button);    
}

if(kony.widgets.ImageGallery)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.ImageGallery);
if(kony.widgets.HorizontalImageStrip)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.HorizontalImageStrip);

if(kony.widgets.Tab)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Tab);
if(kony.widgets.CollapsibleTab)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.CollapsibleTab);

if(kony.widgets.Appmenu)
    kony.widgets.KWidgetManager.supportWidget(kony.widgets.Appmenu);

//Added to prevent issues with dflt button submit in windows9 when enter is pressed on device
//JSPFQA7049,JSPFQA7053
if(window.navigator.appVersion.match(/MSIE (\d+)/) != null && RegExp.$1 == "9")
{
   	 function noenter() {
   	   return !(window.event && window.event.keyCode == 13); 
   	 }
}    






