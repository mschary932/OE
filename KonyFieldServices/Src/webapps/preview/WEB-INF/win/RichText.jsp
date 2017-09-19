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
<div <%if (widget.map.get(constants.ONCLICK) != null)
                {%> konywidgettype="Krichtext" <%}
                else
                {%>
	konywidgettype="Ksegment" <%}%> id="<%=eventName%>" name="<%=eventName%>" style="<%=style%>"
	<%if (widget.map.get(constants.PRE_ONCLICK_JS) != null
                        && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
                {%>
	prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>" <%}%>
	<%if (widget.map.get(KonyServerWidget.SKIN) != null)
                {%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
	rowid="<%=request.getAttribute("segmentrow")%>" segmentid="<%=request.getAttribute("segmentid")%>"
	<%if (request.getAttribute("sectionId") != null)
                {%> sectionid="<%=request.getAttribute("sectionId")%>" <%}%>
	<%if (event.equals("yes"))
                {%> event="<%=event%>" <%}%>
	<%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false))
    {%>
     	kdisabled = "true "
     <% }else if(widget.map.get(WEBConstants.ENABLED).toString().length() > 0)
                {%> kdisabled="true" <%}%> >
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
<div id="<%=eventName%>" name="<%=eventName%>" konywidgettype="Krichtext"
	<%if (widget.map.get(KonyServerWidget.SKIN) != null)
                {%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
	style="<%=JSWAPUtil.getWidgetStyleInfoForIE(widget, false)%>"
	<%if (widget.map.get(constants.PRE_ONCLICK_JS) != null
                        && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
                {%>
	prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>" <%}%> <%if (event.equals("yes"))
                {%> event="<%=event%>"
	<%}%> <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false))
    {%>
     	kdisabled = "true "
     <% }else if(widget.map.get(WEBConstants.ENABLED).toString().length() > 0)
                {%> kdisabled="true" <%}%> ><%="yes".equals(event) ? JSWAPUtil.replaceRichtextValues(request,
                        widget.map.get(KonyServerWidget.MODIFIED_TEXT), frmId, widgetId, apppath) : widget.map
                        .get(KonyServerWidget.TEXT)%>
</div>
<%
    }
    else
    {
%>
<div id="<%=eventName%>" name="<%=eventName%>" konywidgettype="Krichtext"
	<%if (widget.map.get(KonyServerWidget.SKIN) != null)
                {%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
	style="<%=JSWAPUtil.getWidgetStyleInfoForIE(widget, true)%>"
	<%if (widget.map.get(constants.PRE_ONCLICK_JS) != null
                        && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
                {%>
	prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>" <%}%> <%if (event.equals("yes"))
                {%> event="<%=event%>"
	<%}%> <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
     	kdisabled = "true "
     <% }else if(widget.map.get(WEBConstants.ENABLED).toString().length() > 0)
                {%> kdisabled="true" <%}%> ><%="yes".equals(event) ? JSWAPUtil.replaceRichtextValues(request,
                        widget.map.get(KonyServerWidget.MODIFIED_TEXT), frmId, widgetId, apppath) : widget.map
                        .get(KonyServerWidget.TEXT)%>
</div>
<%
    }
%>