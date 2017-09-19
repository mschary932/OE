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
   <div class="<%=widget.getTable(KonyServerWidget.SKIN)%>"
	style="<%=style%>" >
            <a konywidgettype = "Klink" style="width:100%" name="<%=eventName%>" <%="yes".equals(event) ? "event=\"yes\"" : "" %>
            href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=bjs"+ 
                    (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+
                            WAPUtilities.getKRFId(request) : "" ) +"&node="+request.getAttribute("node.no")+"&"+eventName+"=x"+                            
                    "&rowid="+request.getAttribute("segmentrow"))%><%if(request.getAttribute("sectionId") != null) { %>&sectionid=<%= request.getAttribute("sectionId")%><%} %>"
            <%if(widget.map.get(WEBConstants.ENABLED).toString().length() > 0 ){%> disabled="true" <%} %>
            <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
            disabled="true"
            <%} %>
            >
                 <%=request.getAttribute("widgetDataText1")%>
            </a>
    </div>
  <%}
else{%>
<%if(request.getAttribute("layout")!= null && request.getAttribute("layout").equals("nonpercent"))
    {%>        
	<a class="<%=widget.map.get(KonyServerWidget.SKIN)%>" style="" konywidgettype="Klink" name="<%=eventName%>" id="<%=eventName%>"
		<% if(widget.getTable(constants.ONCLICK) != LuaNil.nil && widget.map.get(WEBConstants.ENABLED).toString().length() == 0) {%> event="yes" 
		href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=" + imageCat + (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&event="+frmId+"."+widgetId +"&previousform=" + uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID))%>"
		<% } else { %> event="" href="#" <% } %>
                <%if(widget.map.get(WEBConstants.ENABLED).toString().length() > 0 ){%> disabled="true" <%} %>
                <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
            disabled="true"
            <%} %>
                >
		<%=widget.map.get(KonyServerWidget.TEXT)%>
	</a>

    <%}
    else{%>
	<a class="<%=widget.map.get(KonyServerWidget.SKIN)%>" style="width: 100%;" konywidgettype="Klink" name="<%=eventName%>" id="<%=eventName%> "
		<% if(widget.getTable(constants.ONCLICK) != LuaNil.nil && widget.map.get(WEBConstants.ENABLED).toString().length() == 0) {%> event="yes" 
		href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=" + imageCat + (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&event="+frmId+"."+widgetId +"&previousform=" + uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID))%>"
		<% } else { %> event="" href="#"  <% } %>
                <%if(widget.map.get(WEBConstants.ENABLED).toString().length() > 0 ){%> disabled="true" <%} %>
                >
		<%=widget.map.get(KonyServerWidget.TEXT)%>
	</a>

    <%}%>
<%}%>

