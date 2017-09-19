<%@include file="common.jsp"%>
<%
//image background button type need to be implemented
%>
<%
        String eventName = widget.getWidgetID()+"event_";
        if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
        {
            eventName = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + eventName;
        }
        if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
        {
            eventName = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + eventName;
        }
        if(request.getAttribute("tabpaneid") != null)
        {
             eventName = request.getAttribute("tabpaneid")+"."+widget.getWidgetID()+"event_";
             eventName = frmId +"."+eventName;
        }
        if(request.getAttribute("segmentid") != null && request.getAttribute("issectionheader") == null)
        {
        	eventName = request.getAttribute("segmentid")+"."+request.getAttribute("sectionId")+","+request.getAttribute("rowid")+"."+widget.getWidgetID()+"event_"+"."+"Ksegment";
            if(request.getAttribute("tabpaneid") != null)
            {
                 eventName = request.getAttribute("tabpaneid") +"."+eventName;
                 eventName = frmId +"."+eventName;
            }
        }  
        Object text = "";
        String widgetType = "Kbutton";
        if(request.getAttribute("segmentid") != null)
        {
        	text = (String)request.getAttribute("widgetDataText1");
        	if(widget.map.get(constants.ONCLICK) == null)
        		widgetType = "Ksegment";
        }
        else if(widget.map.get(KonyServerWidget.TEXT) != null && widget.map.get(KonyServerWidget.TEXT) != LuaNil.nil)
			text = widget.map.get(KonyServerWidget.TEXT);
        if("nonpercent".equals(request.getAttribute("seglayout")) || 
        		"nonpercent".equals(request.getAttribute("layout")))
        {
            style = JSWAPUtil.getWidgetStyleInfo(widget, false);
        }
        else{
            style =  JSWAPUtil.getWidgetStyleInfo(widget, true);
        }
        
        if (widget.map.get(constants.DISPLAY_TEXT) !=  null &&
                !((Boolean) widget.map.get(constants.DISPLAY_TEXT)))
        	text = "";
        
        if(widget.map.get(constants.HAS_BG_IMAGE) == null) {%>        
         
         <input konywidgettype = "<%=widgetType %>" 
             type="submit" name="<%=eventName%>" value="<%=text%>" <%="yes".equals(event) ? "event=\"yes\"" : "" %> title="<%=text%>"
             <%if(request.getAttribute("sectionId") != null) { %> sectionid = "<%=request.getAttribute("sectionId")%>" <%} %> 
             <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%> style="<%=style%>"                                 
         <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
     	disabled = "true "
     <% }else{  %>   
     	<%=widget.map.get(WEBConstants.ENABLED) %>
     	<%} %>        
         >
<%} 
 else
 { %>
 <input type="image" <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
     	disabled = "true "
     <% }else{  %>   
     	<%=widget.map.get(WEBConstants.ENABLED) %>
     	<%} %>
		name="<%=eventName%>"
		alt="<%=text%>"
     	src= "<%=imgpath+ widget.map.get(constants.HAS_BG_IMAGE)%>"     
     konywidgettype = "<%=widgetType %>" 
    <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%> style="<%=style.replaceAll("width:100%", "")%>"   
/> 
<%
}
%>


