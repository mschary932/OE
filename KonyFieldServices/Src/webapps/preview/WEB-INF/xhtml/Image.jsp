<%@include file="common.jsp"%>
<%@page import="com.konylabs.vm.LuaNil"%>

<%
    String scaleMode = "default";
    if (widget.getTable("scalemode") != LuaNil.nil && widget.getTable("scalemode") instanceof String)
        scaleMode = (String) widget.getTable("scalemode");

    String imgID = (String) widget.getTable("id");
    String imgsrc = "";
    if (widget.map.get("src") != null && widget.map.get("src") != LuaNil.nil)
        imgsrc = (String) widget.map.get("src");
    
    String name = "";
    if (request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
    {
        name = "app.headers." + request.getAttribute(WEBConstants.FORM_HEADER_ID) + "." + name;
    }
    if (request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
    {
        name = "app.footers." + request.getAttribute(WEBConstants.FORM_FOOTER_ID) + "." + name;
    }
    if (tabpaneid != null)
    {
        name = frmId + "." + tabpaneid + "." + name;

    }
    if (request.getAttribute("segmentid") != null)
    {
        name = request.getAttribute("segmentid").toString();
        if (request.getAttribute("tabpaneid") != null)
        {
            name = request.getAttribute("tabpaneid") + "." + name;
            name = frmId + "." + name;
        }
    }
    String defaultSelection = "false";
    if (request.getAttribute("dfltSelection") != null && "true".equals(request.getAttribute("dfltSelection").toString()))
    {
            defaultSelection = "true";
            request.removeAttribute("dfltSelection");
    }
%>

<%
    if (request.getAttribute("segmentid") != null && ("true".equals(defaultSelection)))
    {
        if (request.getAttribute("seglayout") != null && request.getAttribute("seglayout").equals("nonpercent"))
        {
            style = JSWAPUtil.getWidgetStyleInfo(widget, false);
        }
        else
        {
            style = JSWAPUtil.getWidgetStyleInfo(widget, true);
        }
        if (("vertical".equals(request.getAttribute("segmentorientation")))
                && !("true".equals(request.getAttribute("segmenthbox")))
                && !("true".equals(request.getAttribute("segmentvbox"))))
        {
%>
<div style="<%=style%>">
	<%
	    }
	%>
	<a konywidgettype="Ksegment" class=<%=widget.getTable("skin")%>
		style="text-decoration:none;text-align:<%=widget.getTable(constants.CONTENT_ALIGNMENT)%>"
		href="<%=response.encodeURL(apppath
                        + "?formid="
                        + frmId
                        + "&cat=bjs"
                        + (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() > 0 ? "&krfid="
                                + WAPUtilities.getKRFId(request)
                                : "")
                        + "&node="
                        + request.getAttribute("node.no")
                        + "&rowid="
                        + request.getAttribute("segmentrow")
                        + "&"
                        + name
                        + "event_=x"
                        + (request.getAttribute("sectionId") != null ? "&sectionid="
                                + request.getAttribute("sectionId") : ""))%>">
		<%@include file="ImageHelper.jsp"%>
	</a>
	<%
	    if (("vertical".equals(request.getAttribute("segmentorientation")))
	                && !("true".equals(request.getAttribute("segmenthbox")))
	                && !("true".equals(request.getAttribute("segmentvbox")))
	                && request.getAttribute("seglayout") != null
	                && !(request.getAttribute("seglayout").equals("nonpercent")))
	        {
	%>
</div>
<%
    }
    }
    else if (request.getAttribute("segmentid") != null && ("false".equals(defaultSelection)))
    {
        if (request.getAttribute("seglayout") != null && request.getAttribute("seglayout").equals("nonpercent"))
        {
            style = JSWAPUtil.getWidgetStyleInfo(widget, false);
        }
        else
        {
            style = JSWAPUtil.getWidgetStyleInfo(widget, true);
        }
        if (("vertical".equals(request.getAttribute("segmentorientation")))
                && !("true".equals(request.getAttribute("segmentvbox"))))
        {
%>
<div style=" <%=style%>">
	<%
	    }
	        if ("true".equals(defaultSelection) || JSWAPUtil.getBooleanValue(widget.getTable(constants.RENDER_AS_ANCHOR)))
	        {
	%>
	<a konywidgettype="Ksegment" class=<%=widget.getTable("skin")%>
		style="display:block;text-decoration:none;text-align:<%=widget.getTable(constants.CONTENT_ALIGNMENT)%>"
		href="<%=response.encodeURL(apppath
                            + "?formid="
                            + frmId
                            + "&cat=basic"
                            + (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() > 0 ? "&krfid="
                                    + WAPUtilities.getKRFId(request)
                                    : "")
                            + "&node="
                            + request.getAttribute("node.no")
                            + "&rowid="
                            + request.getAttribute("segmentrow")
                            + "&"
                            + name
                            + "event_=x"
                            + (request.getAttribute("sectionId") != null ? "&sectionid="
                                    + request.getAttribute("sectionId") : ""))%>">
		<%@include file="ImageHelper.jsp"%>
	</a>
	<%
	    }
	        else
	        {
	%>
	<%@include file="ImageHelper.jsp"%>
	<%
	    }
	        if (("vertical".equals(request.getAttribute("segmentorientation")))
	                && !("true".equals(request.getAttribute("segmentvbox"))))
	        {
	%>
</div>
<%
    }
    }
    else
    {
%>
<%@include file="ImageHelper.jsp"%>
<%
    }
%>