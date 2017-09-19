<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Vector"%>
<%@page import="com.konylabs.api.ui.KonyTab"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="java.util.HashMap"%>

<%@include file="common.jsp"%>

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
        if(request.getAttribute("segmentid") != null)
        {
        	eventName = request.getAttribute("segmentid")+"."+request.getAttribute("sectionId")+","+request.getAttribute("rowid")+"."+widget.getWidgetID()+"event_"+"."+"Ksegment";
            if(request.getAttribute("tabpaneid") != null)
            {
                 eventName = request.getAttribute("tabpaneid") +"."+eventName;
                 eventName = frmId +"."+eventName;
            }
        }
%>
<%if(request.getAttribute("segmentid") != null){
    if(request.getAttribute("seglayout")!= null && request.getAttribute("seglayout").equals("nonpercent"))
    {
        style = JSWAPUtil.getWidgetStyleInfo(widget, false);
    }
    else{
        style = JSWAPUtil.getWidgetStyleInfo(widget, true);
    }%>
   <div <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
	style="<%=style%>" >
            <a <%if(widget.map.get(constants.ONCLICK)!= null){%> konywidgettype = "Klink" <%}else{%>konywidgettype = "Ksegment"<%}%>
               style="width:100%; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>" name="<%=eventName%>" <%="yes".equals(event)  && !"disabled".equals(widget.map.get(WEBConstants.ENABLED)) ? "event=\"yes\"" : "" %>
               <%if(request.getAttribute("sectionId") != null) { %> sectionid = <%= request.getAttribute("sectionId")%> <%} %>
                <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.getTable(constants.PRE_ONCLICK_JS)%>"
                <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.getTable(constants.POST_ONCLICK_JS)%>" <%}%>
            href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=bjs"+ (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&node="+request.getAttribute("node.no")+"&"+eventName+"=x"+"&rowid="+request.getAttribute("segmentrow"))%>"
          <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
     	kdisabled = "true "
     <% }else if(widget.map.get(WEBConstants.ENABLED).toString().length() > 0)
                {%> kdisabled="true" <%}%>
                <%if(widget.map.get(constants.SUBMIT_URL) != null && widget.map.get(constants.SUBMIT_URL) != LuaNil.nil) {%>
                externalSubmitAction = "<%= widget.map.get(constants.SUBMIT_URL)%>"
                <%} %>            
            >
                 <%=request.getAttribute("widgetDataText1")%>
            </a>
    </div>
  <%}
else{%>
<%if(request.getAttribute("layout")!= null && request.getAttribute("layout").equals("nonpercent"))
    {%>
        <div <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
                                       konywidgettype = "Klink" style=" <%=JSWAPUtil.getWidgetStyleInfo(widget, false)%>  ">
	<a style="text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>" konywidgettype="Klink" name="<%=eventName%>" id="<%=eventName%>" class="<%=widget.map.get(KonyServerWidget.SKIN)%>"
		<% if(widget.getTable(constants.ONCLICK) != LuaNil.nil  && widget.map.get(WEBConstants.ENABLED).toString().length() == 0 ) {%> event="yes" <% } else { %> event="" <% } %>
                <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.getTable(constants.PRE_ONCLICK_JS)%>"
                <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.getTable(constants.POST_ONCLICK_JS)%>" <%}%>
		href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=" + imageCat + (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&event="+frmId+"."+widgetId +"&previousform=" + uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID))%>"
                <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
     	kdisabled = "true "
     <% }else if(widget.map.get(WEBConstants.ENABLED).toString().length() > 0)
                {%> kdisabled="true" <%}%>
                <%if(widget.map.get(constants.SUBMIT_URL) != null && widget.map.get(constants.SUBMIT_URL) != LuaNil.nil) {%>
                externalSubmitAction = "<%= widget.map.get(constants.SUBMIT_URL)%>"
                <%} %>                
                >
		<%=widget.map.get(KonyServerWidget.TEXT)%>
	</a>
</div>
    <%}
    else{%>
        <div <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
             konywidgettype = "Klink" style=" <%=JSWAPUtil.getWidgetStyleInfo(widget, true)%> ">
	<a style="width: 100%; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>" konywidgettype="Klink" name="<%=eventName%>" id="<%=eventName%> " class="<%=widget.map.get(KonyServerWidget.SKIN)%>"
		<% if(widget.getTable(constants.ONCLICK) != LuaNil.nil && widget.map.get(WEBConstants.ENABLED).toString().length() == 0  ) {%> event="yes" <% } else { %> event="" <% } %>
		       <%if(!JSWAPUtil.getBooleanValue(request.getAttribute("isCellClickable1"))) {%>
     	kdisabled = "true "
     <% }else if(widget.map.get(WEBConstants.ENABLED).toString().length() > 0)
                {%> kdisabled="true" <%}%> 
                <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.getTable(constants.PRE_ONCLICK_JS)%>"
                <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.getTable(constants.POST_ONCLICK_JS)%>" <%}%>
		href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=" + imageCat + (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&event="+frmId+"."+widgetId +"&previousform=" + uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID))%>"                
                <%if(widget.map.get(constants.SUBMIT_URL) != null && widget.map.get(constants.SUBMIT_URL) != LuaNil.nil) {%>
                externalSubmitAction = "<%= widget.map.get(constants.SUBMIT_URL)%>"
                <%} %>                
                >
		<%=widget.map.get(KonyServerWidget.TEXT)%>
	</a>
</div>
    <%}%>
<%}%>

