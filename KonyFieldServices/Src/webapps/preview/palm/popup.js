/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



kony.widgets.Popup =
{
}

kony.widgets.Popup.Util =
{
    popuptimer : "",
    popuptransitiontype:"",

    /**
     * Loads the response XML into a DOM model.
     */
    loadXMLString : function(XMLText)
    {
        if (window.DOMParser)
        {
            var parser=new DOMParser();
            var xmlDoc=parser.parseFromString(XMLText,"text/xml");
        }
        else // Internet Explorer
        {
            xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async="false";
            xmlDoc.loadXML(XMLText);
        }
        return xmlDoc;
    },

    findPos: function(obj) {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return [curleft,curtop];
        }

    },

    cElem: function(a) {
        try{
            return document.createElement(a);
        }catch(b){
        // showErr("cElem('"+a+"')",b);
        }
    },

    setDisp : function(o,display){
        try{
            if(typeof o == "string"){
                document.getElementById(o).style.display=(display?"":"none");
            }else{
                o.style.display=(display?"":"none");
            }
        }catch(e){
        }
    },

    positionLayer: function(eid,ordinates)
    {
        var o = document.getElementById(eid);
        if(o){
            var floatWidth = o.children[0].clientWidth;
            var floatHeight = o.children[0].clientHeight;
            var scrollW = kony.widgets.Utils.scrollInterface.getScrollX();
            var scrollH = kony.widgets.Utils.scrollInterface.getScrollY();
            var clientH = kony.widgets.Utils.scrollInterface.getClientH();
            var clientW = kony.widgets.Utils.scrollInterface.getClientW();

            /*var top = (Math.floor(scrollH) +  Math.floor((clientH/2)  - (floatHeight/2))) + "px";
            var left = (Math.floor(scrollW) +  Math.floor((clientW/2)  - (floatWidth/2))) + "px"; */

            var topstart = (Math.floor(scrollH) - (floatHeight));
            var leftstart = (Math.floor(scrollW)  - (floatWidth));

            var topcenter = (Math.floor(scrollH) +  Math.floor((clientH/2)  - (floatHeight/2)));
            var leftcenter = (Math.floor(scrollW) +  Math.floor((clientW/2)  - (floatWidth/2)));

            var topend = (Math.floor(scrollH) +  Math.floor((clientH)  + (floatHeight)));
            var leftend = (Math.floor(scrollW) +  Math.floor((clientW)  + (floatWidth)));

            var leftdiff, topdiff;

            var transtype = popuptransitiontype;

             switch(transtype)
                    {
                    case 'topCenter':
                        leftdiff = "0px";
                        topdiff = (topcenter -topstart) + "px" ;
                        o.style.top = topstart+ "px" ;
                        o.style.left = leftcenter+ "px" ;
                        o.style.webkitTransition = "-webkit-transform 2s";
                        o.style.webkitTransform = "translate("+leftdiff+","+topdiff+")";
                        break;
                    case 'bottomCenter':
                        leftdiff = "0px";
                        topdiff = (topcenter - topend) + "px" ;
                        o.style.top = topend+ "px" ;
                        o.style.left = leftcenter+ "px" ;
                        o.style.webkitTransition = "-webkit-transform 2s";
                        o.style.webkitTransform = "translate("+leftdiff+","+topdiff+")";
                        break;
                    case 'leftCenter':
                        topdiff = "0px";
                        leftdiff = (leftcenter - leftstart) + "px" ;
                        o.style.top = topcenter+ "px" ;
                        o.style.left = leftstart+ "px" ;
                        o.style.webkitTransition = "-webkit-transform 2s";
                        o.style.webkitTransform = "translate("+leftdiff+","+topdiff+")";
                        break;
                    case 'rightCenter':
                        topdiff = "0px";
                        leftdiff = (leftcenter - leftend) + "px" ;
                        o.style.top = topcenter+ "px" ;
                        o.style.left = leftend+ "px" ;
                        o.style.webkitTransition = "-webkit-transform 2s";
                        o.style.webkitTransform = "translate("+leftdiff+","+topdiff+")";
                        break;
                    case 'fadeAnimation':
                        o.style.opacity = 0;
                        //o.className +=" fadein ";
                        o.style.top = topcenter+ "px" ;
                        o.style.left = leftcenter+ "px" ;
                        //setTimeout("kony.widgets.Popup.Util.fadein("+o+")", 2000);
                        setTimeout(function(){
                            var o=document.getElementById("popup");
                            o.style.webkitTransition = "opacity 2s linear";
                            o.style.opacity = 1;
                        }, 500);
                        break;
                    case 'fadeout':
                        o.style.top = topcenter+ "px" ;
                        o.style.left = leftcenter+ "px" ;
                        o.style.opacity = "0 !important";
                        o.style.webkitTransition = "opacity 2s";
                        break;

                     default:
                         var top = (Math.floor(scrollH) +  Math.floor((clientH/2)  - (floatHeight/2))) + "px";
                         var left = (Math.floor(scrollW) +  Math.floor((clientW/2)  - (floatWidth/2))) + "px";


                }

            if(ordinates){
                var x = ordinates[0];
                var y = ordinates[1];
                //alert('Y = ' + y + ' scrollH : ' + scrollH + ' floatHeight : ' + floatHeight)
                top = (y  - floatHeight  - 15 )+ "px";
                left = x + scrollW - Math.floor(floatWidth) + "px";
            }
            if(parseInt(top.replace("px","")) < 0){
                top = "10px";
            }
            o.style.top = top;
            o.style.left = left;
            o = null;
        }else{
            window.clearInterval(kony.widgets.Popup.Util.popuptimer);
        }
    },

    pCover: function(i){
        var doc = document;
        try{
            var b=document.getElementById("dCover");
            if(b==undefined)
            {
                b=this.cElem("div");
                b.setAttribute("id","dCover");
                //z-index value changed to 795, to show calendar widget on top Popup incase of calendar placed on popup.
                b.style.zIndex=795;
                b.className='cover';
                doc.body.appendChild(b);
                b.setAttribute("selected","true");
            }

            var d=Math.max(Math.max(doc.body.scrollHeight,doc.documentElement.scrollHeight),
                Math.max(doc.body.offsetHeight,doc.documentElement.offsetHeight),
                Math.max(doc.body.clientHeight,doc.documentElement.clientHeight));
            var a=Math.max(Math.max(doc.body.scrollWidth,doc.documentElement.scrollWidth),
                Math.max(doc.body.offsetWidth,doc.documentElement.offsetWidth),
                Math.max(doc.body.clientWidth,doc.documentElement.clientWidth));

            b.style.height=d+"px";
            b.style.width=a+"px";
            this.setDisp("dCover",i);

        }catch(f){
        //showErr("pCover('"+i+"')",f);
        }
    },

    delayDismiss : function (event){
        var doc = document.body ? document.body : document.documentElement;
        var ele = doc.getElementsByClassName('popup', "div");
        if(ele[0])
        doc.removeChild(ele[0]);
        var eleform = document.getElementsByTagName("form");
        eleform = eleform[0];
        var formid = eleform.getAttribute("id");
        var hashkey = kony.system.browserback.HASH_PREFIX+formid
        location.hash = currentHash = hashkey;
        ele = eleform = formid = hashkey = null;
        window.clearInterval(kony.widgets.Popup.Util.popuptimer);
        if(event){
            event.cancelBubble = true;
            if (event.stopPropagation)
                event.stopPropagation();
            event.preventDefault();
        }
        registerWithBrowserForOnLoad();
        doc = null;
        this.setDisp('dCover',false);
    },

    closePopup : function (event){
            //Remove popup from body and add event listeners.
            var doc = document.body ? document.body : document.documentElement;
            var ele = doc.getElementsByClassName('popup', "div");
            /** Added this for popuptansition */
            var o = document.getElementById("popup");

            if(o){
                var floatWidth = o.children[0].clientWidth;
                var floatHeight = o.children[0].clientHeight;
                var scrollW = kony.widgets.Utils.scrollInterface.getScrollX();
                var scrollH = kony.widgets.Utils.scrollInterface.getScrollY();
                var clientH = kony.widgets.Utils.scrollInterface.getClientH();
                var clientW = kony.widgets.Utils.scrollInterface.getClientW();

                //var top = (Math.floor(scrollH) +  Math.floor((clientH/2)  - (floatHeight/2))) + "px";
                //var left = (Math.floor(scrollW) +  Math.floor((clientW/2)  - (floatWidth/2))) + "px";


                var topstart = (Math.floor(scrollH) - (floatHeight));
                var leftstart = (Math.floor(scrollW)  - (floatWidth));

                var topcenter = (Math.floor(scrollH) +  Math.floor((clientH/2)  - (floatHeight/2)));
                var leftcenter = (Math.floor(scrollW) +  Math.floor((clientW/2)  - (floatWidth/2)));

                var topend = (Math.floor(scrollH) +  Math.floor((clientH)  + (floatHeight)));
                var leftend = (Math.floor(scrollW) +  Math.floor((clientW)  + (floatWidth)));

                var leftdiff, topdiff;

                var curtop, curleft;

                var selectedItem = kony.getGlobal("butid");
                var transtype = popuptransitiontype;
                if(popuptransitiontype==="fadeAnimation")
                    transtype="fadeout";
                o.style.webkitTransition ="";
                o.style.webkitTransform="";

                switch(transtype)
                {
                    case 'topCenter':
                        leftdiff = "0px";
                        topdiff = (topstart - topcenter) + "px" ;
                        o.style.webkitTransition = "-webkit-transform 2s";
                        o.style.webkitTransform = "translate("+leftdiff+","+topdiff+")";
                        break;
                    case 'bottomCenter':
                        var a = o.style.top;
                        var b = o.style.left;
                        leftdiff = "0px";
                        topdiff = (topend - topcenter) + "px" ;
                        o.style.webkitTransition = "-webkit-transform 2s";
                        o.style.webkitTransform = "translate("+leftdiff+","+topdiff+")";
                        break;
                    case 'leftCenter':
                        topdiff = "0px";
                        leftdiff = (leftstart - leftcenter) + "px" ;
                        o.style.webkitTransition = "-webkit-transform 2s";
                        o.style.webkitTransform = "translate("+leftdiff+","+topdiff+")";

                        break;
                    case 'rightCenter':
                        curtop = o.style.top;
                        curleft = o.style.left;
                        curtop	= curtop.replace("px","");
                        curleft = curleft.replace("px","");
                        topdiff = "0px";
                        leftdiff = ( leftend -curleft) + "px" ;
                        o.style.webkitTransition = "-webkit-transform 2s";
                        o.style.webkitTransform = "translate("+leftdiff+","+topdiff+")";
                        break;
                    case 'fadein':
                        o.style.top = topcenter+ "px" ;
                        o.style.left = leftcenter+ "px" ;
                        o.style.webkitTransition = "opacity 2s";
                        o.style.opacity = 1;
                        break;
                    case 'fadeout':
                        o.style.top = topcenter+ "px" ;
                        o.style.left = leftcenter+ "px" ;
                        o.style.opacity = "0 !important";
                        o.style.webkitTransition = "opacity 2s";
                        break;
                    default:
                        /*doc.removeChild(ele[0]);
                        var eleform = document.getElementsByTagName("form");
                        eleform = eleform[0];
                        var formid = eleform.getAttribute("id");
                        var hashkey = kony.system.browserback.HASH_PREFIX+formid
                        location.hash = currentHash = hashkey;
                        ele = eleform = formid = hashkey = null;
                        window.clearInterval(kony.widgets.Popup.Util.popuptimer);
                        if(event){
                            event.cancelBubble = true;
                            if (event.stopPropagation)
                                event.stopPropagation();
                            event.preventDefault();
                        }
                        registerWithBrowserForOnLoad();
                        doc = null;
                        this.setDisp('dCover',false); */
                        kony.widgets.Popup.Util.delayDismiss(event);

                }

            }
            /*Sumanth Divvela: Nov 8,2011: Bug 40130 - delayDismiss timer is not needed if there is no transition defined, so added condition to check this.*/
            if(popuptransitiontype != "" && popuptransitiontype != "None")
            {
            setTimeout(function(){
                kony.widgets.Popup.Util.delayDismiss(event)
            }, 2000);
            }
  
	},
    isAgent: function(name){
        var s = navigator.userAgent
        return (s.indexOf(name) > -1 )?true:false;
    },

    showPopup: function(eid,html,ele,event) {
        var doc = document;
        try {
            var o = document.getElementById(eid);
            if(o == undefined){
                o=this.cElem("div");
                o.setAttribute("id",eid);
                o.className='popup';
                //var eleform = document.getElementsByTagName("form")[0];
                // doc.body.insertAfter(o,eleform);

                doc.body.appendChild(o);
                var pb = this.cElem("div");
                pb.className='popupbody';
                o.appendChild(pb);
                var ptb = this.cElem("div");
                ptb.className='popuptitleBar';
                pb.appendChild(ptb);
                var pt = this.cElem("div");
                pt.className='popuptitle';
                pt.innerHTML='Title';
                ptb.appendChild(pt);
                var cl = this.cElem("div");
                cl.className='close';
                ptb.appendChild(cl);
                var cla = this.cElem("a");
                cl.appendChild(cla);

                cla.setAttribute("href", '#');
                cla.setAttribute("konywidgettype", 'KclosePopup');
                cla.setAttribute("id", 'KclosePopup');
                cla.innerHTML = 'Close';

                var pbd = this.cElem("div");
                pb.appendChild(pbd);
                pbd.setAttribute("style", 'float:left;width:100%');
            }
            if(html){
                o.children[0].children[1].innerHTML = html;
            }
            var c = o.children[0];
            var height= c.clientHeight;
            o.style.height = height;
            c.style.width = "100%";

            window.clearInterval(kony.widgets.Popup.Util.popuptimer);

            if(ele){
                var title = ele.getAttribute('title');
                if(!title || title == 'false' || title == 'null' ){
                    c.children[0].style.display='none';
                }else{
                    c.children[0].style.display='';
                    c.children[0].children[0].innerHTML=title;
                }
                //Container Weight of popup.
                var w = ele.getAttribute('width');
                popuptransitiontype=ele.getAttribute("transition");
                o.style.width = w;

                // alert(findPos(target))
                //If widget is true we need to display popup arround the widget
                //where event was raised.
                // else display popop in the center of the screen.
                /*Removed context fuctionality for popup*/
                var widget = false;// ele.getAttribute('widget');
                if(widget){
                    if(this.isAgent('webOS')){
                        var target = gettarget(event);
                        this.positionLayer(eid,this.findPos(target));
                    }else{
                        this.positionLayer(eid,[event.clientX,event.clientY]);
                    }
                }else{
                    if(this.isAgent('webOS')){
                        this.positionLayer(eid);
                        scroll(0,0);
                    }else{
                        this.positionLayer(eid);
                        if(!(popuptransitiontype.length>0))
                        kony.widgets.Popup.Util.popuptimer = setInterval("kony.widgets.Popup.Util.positionLayer('" +eid+ "')",300);
                    }
                }

                //Model: if model is true remaining screen(other than popup) is non clickable
                // else remaining screen is clickable and click on remaining screen will close the popup.
                var model = ele.getAttribute('model');
                if(model && model == 'true'){
                    this.pCover(true);
                }
            }
            doc = o = c = html = pbd = cla = cl = pt = ptb = pb = eleform = null;
        } catch (e) {
        //alert(e.message);
        }
    }

}

