<%--
    Document   : RichText
    Created on : Apr 16, 2012, 12:33:52 PM
    Author     : Maruthi
--%>

<%@page import="com.konylabs.vm.LuaNil"%>
<%@include file="common.jsp"%>

<%
    String eventName = widget.getWidgetID() + "event_";
    if (request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
    {
        eventName = "app.headers." + request.getAttribute(WEBConstants.FORM_HEADER_ID) + "." + eventName;
    }
    if (request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
    {
        eventName = "app.footers." + request.getAttribute(WEBConstants.FORM_FOOTER_ID) + "." + eventName;
    }
    if (request.getAttribute("tabpaneid") != null)
    {
        eventName = request.getAttribute("tabpaneid") + "." + widget.getWidgetID() + "event_";
        eventName = frmId + "." + eventName;
    }
    if (request.getAttribute("segmentid") != null)
    {
        eventName = request.getAttribute("segmentid") + "." + request.getAttribute("segmentrow") + "."
                + widget.getWidgetID() + "event_" + "." + "Krichtext_link";
        if (request.getAttribute("tabpaneid") != null)
        {
            eventName = request.getAttribute("tabpaneid") + "." + eventName;
            eventName = frmId + "." + eventName;
        }
    }
%>

<%
    if (request.getAttribute("segmentid") != null)
    {
        if (request.getAttribute("seglayout") != null && request.getAttribute("seglayout").equals("nonpercent"))
        {
            style = JSWAPUtil.getWidgetStyleInfo(widget, false);
        }
        else
        {
            style = JSWAPUtil.getWidgetStyleInfo(widget, true);
        }
%>
<div id="<%=eventName%>" name="<%=eventName%>" konywidgettype="Krichtext" class="<%=widget.getTable("skin")%>"
	rowid="<%=request.getAttribute("segmentrow")%>" segmentid="<%=request.getAttribute("segmentid")%>" style="<%=style%>"
	<%if (event.equals("yes"))
                {%> event="<%=event%>" <%}%> <%if (request.getAttribute("sectionId") != null)
                {%>
	sectionid="<%=request.getAttribute("sectionId")%>" <%}%>
	<%if (widget.map.get(WEBConstants.ENABLED).toString().length() > 0)
                {%> disabled="true" <%}%>
               <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false))
    {%>
    	disabled="true"
    <%} %> 
                >
	<%
	    if ("yes".equals(event))
	        {
	            String text = (String) request.getAttribute("widgetDataText1");
	            text = WAPUtilities.processRichTextForEvents(text);
	            out.println(JSWAPUtil.replaceRichtextValues(request, text, frmId, widgetId, apppath));
	        }
	        else
	            out.println(request.getAttribute("widgetDataText1"));
	%>
</div>
<%
    }

    else if (request.getAttribute("layout") != null && request.getAttribute("layout").equals("nonpercent"))
    {
%>
<div id="<%=eventName%>" name="<%=eventName%>" konywidgettype="Krichtext" class="<%=widget.getTable("skin")%>" style=""
	<%if (event.equals("yes"))
                {%> event="<%=event%>" <%}%>
                <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false))
    {%>
    disabled="true"
    <%} %>
	<%if (widget.map.get(WEBConstants.ENABLED).toString().length() > 0)
                {%> disabled="true" <%}%>><%="yes".equals(event) ? JSWAPUtil.replaceRichtextValues(request,
                        widget.getTable(KonyServerWidget.MODIFIED_TEXT), frmId, widgetId, apppath) : widget
                        .getTable("text")%>
</div>
<%
    }
    else
    {
%>
<div id="<%=eventName%>" name="<%=eventName%>" konywidgettype="Krichtext" class="<%=widget.getTable("skin")%>"
	style="width: 100%;" <%if (event.equals("yes"))
                {%> event="<%=event%>" <%}%>
	<%if (widget.map.get(WEBConstants.ENABLED).toString().length() > 0)
                {%> kdisabled="true" <%}%>><%="yes".equals(event) ? JSWAPUtil.replaceRichtextValues(request,
                        widget.getTable(KonyServerWidget.MODIFIED_TEXT), frmId, widgetId, apppath) : widget
                        .getTable("text")%>
</div>
<%
    }
%>