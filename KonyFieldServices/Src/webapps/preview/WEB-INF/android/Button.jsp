<%@page import="com.konylabs.api.ui.constants.KonyConstantsFactory"%>
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
    if (request.getAttribute("segmentid") != null && request.getAttribute("issectionheader") == null)
    {
        eventName = request.getAttribute("segmentid") + "." + request.getAttribute("rowid") + "."
                + widget.getWidgetID() + "event_" + "." + "Ksegment";
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
<input id="<%=widget.map.get(KonyServerWidget.ID)%>" type="submit" konywidgettype="seg_Kbutton"
	rowid="<%=request.getAttribute("rowid")%>" <%if (request.getAttribute("sectionId") != null)
                {%>
	sectionid="<%=request.getAttribute("sectionId")%>" <%}%> korigskin="<%=widget.map.get(KonyServerWidget.SKIN)%>"
	value="<%=request.getAttribute("widgetDataText1")%>" title="<%=request.getAttribute("widgetDataText1")%>"
	<%="yes".equals(event) ? "event=\"yes\"" : ""%> eventname="<%=eventName%>"
	name="<%=widget.map.get(KonyServerWidget.ID)%>event_" <%if (widget.map.get(KonyServerWidget.SKIN) != null)
                {%>
	class="<%=widget.map.get(KonyServerWidget.SKIN)%>" kprogressskin="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
	style="<%=style%>"
	<%if (widget.map.get(constants.PRE_ONCLICK_JS) != null
                        && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
                {%>
	prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
	<%}
                if (widget.map.get(constants.POST_ONCLICK_JS) != null
                        && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil)
                {%>
	postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
	<%if (widget.map.get(constants.BLOCKED_UI_SKIN) != null)
                {%>
	kblockinskin="<%=widget.map.get(constants.BLOCKED_UI_SKIN)%>" <%}%> <%=widget.map.get(WEBConstants.ENABLED)%>
	<%if (widget.map.get(constants.EXTERNAL_URL) != null && widget.map.get(constants.EXTERNAL_URL) != LuaNil.nil)
                {%>
	onclick="window.open('<%=widget.map.get(constants.EXTERNAL_URL)%>'); return false;" <%}%>
	<%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
     	disabled = "true"
     <% }else{  %>   
     	<%=widget.map.get(WEBConstants.ENABLED) %>
     	<%} %>
	<%if (widget.map.get(constants.SUBMIT_URL) != null && widget.map.get(constants.SUBMIT_URL) != LuaNil.nil)
                {%>
	externalSubmitAction="<%=widget.map.get(constants.SUBMIT_URL)%>" <%}%> />
<%
    }
    else
    {
%>
<%
    if (request.getAttribute("layout") != null && request.getAttribute("layout").equals("nonpercent"))
        {
%>
<input type="submit" konywidgettype="Kbutton" name="<%=eventName%>" id="<%=eventName%>"
	   <%if (widget.map.get(constants.DISPLAY_TEXT) !=  null &&
                             !((Boolean) widget.map.get(constants.DISPLAY_TEXT)))
     {%> value="" title=""<%}
	    else {%>value="<%=widget.map.get(KonyServerWidget.TEXT)%>" title="<%=widget.map.get(KonyServerWidget.TEXT)%>"       
     <%}%><%="yes".equals(event) ? "event=\"yes\"" : ""%>
	<%if (widget.map.get(KonyServerWidget.SKIN) != null)
                    {%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>"
	kprogressskin="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
	<%if (widget.map.get(constants.PRE_ONCLICK_JS) != null
                            && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
                    {%>
	prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
	<%}
                    if (widget.map.get(constants.POST_ONCLICK_JS) != null
                            && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil)
                    {%>
	postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
	style="<%=JSWAPUtil.getWidgetStyleInfo(widget, false)%>"
	<%if (widget.map.get(constants.BLOCKED_UI_SKIN) != null)
                    {%>
	kblockinskin="<%=widget.map.get(constants.BLOCKED_UI_SKIN)%>" <%}%> <%=widget.map.get(WEBConstants.ENABLED)%>
	<%if (widget.map.get(constants.EXTERNAL_URL) != null && widget.map.get(constants.EXTERNAL_URL) != LuaNil.nil)
                    {%>
	onclick="window.open('<%=widget.map.get(constants.EXTERNAL_URL)%>'); return false;" <%}%>
	<%if (widget.map.get(constants.SUBMIT_URL) != null && widget.map.get(constants.SUBMIT_URL) != LuaNil.nil)
                    {%>
	externalSubmitAction="<%=widget.map.get(constants.SUBMIT_URL)%>" <%}%> />

<%
    }
        else
        {
%>
<input type="submit" konywidgettype="Kbutton" name="<%=eventName%>" id="<%=eventName%>"
	<%if (widget.map.get(constants.DISPLAY_TEXT) !=  null &&
                             !((Boolean) widget.map.get(constants.DISPLAY_TEXT)))
     {%> value="" title=""<%}
        else {%>value="<%=widget.map.get(KonyServerWidget.TEXT)%>" title="<%=widget.map.get(KonyServerWidget.TEXT)%>"       
     <%}%> <%="yes".equals(event) ? "event=\"yes\"" : ""%>
	<%if (widget.map.get(KonyServerWidget.SKIN) != null)
                    {%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>"
	kprogressskin="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
	<%if (widget.map.get(constants.PRE_ONCLICK_JS) != null
                            && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
                    {%>
	prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
	<%}
                    if (widget.map.get(constants.POST_ONCLICK_JS) != null
                            && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil)
                    {%>
	postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
	style="<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>"
	<%if (widget.map.get(constants.BLOCKED_UI_SKIN) != null)
                    {%>
	kblockinskin="<%=widget.map.get(constants.BLOCKED_UI_SKIN)%>" <%}%> <%=widget.map.get(WEBConstants.ENABLED)%>
	<%if (widget.map.get(constants.EXTERNAL_URL) != null && widget.map.get(constants.EXTERNAL_URL) != LuaNil.nil)
                    {%>
	onclick="window.open('<%=widget.map.get(constants.EXTERNAL_URL)%>'); return false;" <%}%>
	<%if (widget.map.get(constants.SUBMIT_URL) != null && widget.map.get(constants.SUBMIT_URL) != LuaNil.nil)
                    {%>
	externalSubmitAction="<%=widget.map.get(constants.SUBMIT_URL)%>" <%}%> />
<%
    }
%>

<%
    }
%>

