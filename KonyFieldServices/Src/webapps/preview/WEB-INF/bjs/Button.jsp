<%@page import="com.konylabs.vm.LuaNil"%>
<%@include file="common.jsp"%>

<%
        String eventName = widget.getWidgetID()+"event_";
        if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
        {
            eventName = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + eventName;
        }
       /* if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
        {
            eventName = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + eventName;
        }*/
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
        if("nonpercent".equals(request.getAttribute("seglayout")) || 
        		"nonpercent".equals(request.getAttribute("layout")))
        {
            style = JSWAPUtil.getWidgetStyleInfo(widget, false);
        }
        else{
            style =  JSWAPUtil.getWidgetStyleInfo(widget, true);
        }
        Object text = "";
        String widgetType = "Kbutton";
        if(request.getAttribute("segmentid") != null)
        {
        	text = (String)request.getAttribute("widgetDataText1");
        	if(widget.map.get(constants.ONCLICK) == null)
        		widgetType = "Ksegment";
        }
        else if(widget.map.get(KonyServerWidget.TEXT) != null &&
        		widget.map.get(KonyServerWidget.TEXT) != LuaNil.nil)
			text = widget.map.get(KonyServerWidget.TEXT);
   
        if (widget.map.get(constants.DISPLAY_TEXT) !=  null &&
                !((Boolean) widget.map.get(constants.DISPLAY_TEXT)))
        	text = "";
        
        if(widget.map.get(constants.HAS_BG_IMAGE) == null) {%>        
         
         <input konywidgettype = "<%=widgetType %>" 
             type="submit" name="<%=eventName%>" value="<%=text%>" <%="yes".equals(event) ? "event=\"yes\"" : "" %> title="<%=text%>"
             <%if(request.getAttribute("sectionId") != null) { %> sectionid = "<%=request.getAttribute("sectionId")%>" <%} %> 
             <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%> style="<%=style%>"
             <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
             <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>                    
         <%if(widget.map.get(constants.EXTERNAL_URL) != null && widget.map.get(constants.EXTERNAL_URL) != LuaNil.nil) {%>
         onclick="window.open('<%=widget.map.get(constants.EXTERNAL_URL)%>'); return false;"
         <%} %>
         <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
     		disabled = "true "
    	 <% }else{  %>   
     	<%=widget.map.get(WEBConstants.ENABLED) %>
     	<%} %>
         <%if(widget.map.get(constants.SUBMIT_URL) != null && widget.map.get(constants.SUBMIT_URL) != LuaNil.nil) {%>
         externalSubmitAction = "<%= widget.map.get(constants.SUBMIT_URL)%>"
         <%} %> 
         >
<%} 
 else
 { %>
<div
     name="<%=eventName%>" value="<%=text%>" <%="yes".equals(event) ? "event=\"yes\"" : "" %> title="<%=text%>"
     konywidgettype = "<%=widgetType %>"
     <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%> style="<%=style%>"
     <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
             <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>                    
         <%if(widget.map.get(constants.EXTERNAL_URL) != null && widget.map.get(constants.EXTERNAL_URL) != LuaNil.nil) {%>
         onclick="window.open('<%=widget.map.get(constants.EXTERNAL_URL)%>'); return false;"
         <%} %>
        <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
     	disabled = "true "
     <% }else{  %>   
     	<%=widget.map.get(WEBConstants.ENABLED) %>
     	<%} %>
         <%if(widget.map.get(constants.SUBMIT_URL) != null && widget.map.get(constants.SUBMIT_URL) != LuaNil.nil) {%>
         externalSubmitAction = "<%= widget.map.get(constants.SUBMIT_URL)%>"
         <%} %>    
></div>
<%
}
%>
