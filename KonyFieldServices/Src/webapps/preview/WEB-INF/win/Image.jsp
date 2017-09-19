<%@include file="common.jsp"%>
<%@page import="com.konylabs.vm.LuaNil"%>

<%
    String scaleMode = "default";
    if (widget.getTable("tcadvbjsscalemode") != LuaNil.nil)
        scaleMode = (String) widget.getTable("tcadvbjsscalemode");

    String imgID = (String) widget.getTable("id");
    String imgsrc = "";
    if (widget.map.get("src") != null && widget.map.get("src") != LuaNil.nil)
        imgsrc = (String) widget.map.get("src");

    if (!imgsrc.startsWith("http"))
    {
        imgsrc = imgpath + imgsrc.split(",")[0];
    }
    //String width1 = JSWAPUtil.adjustedWeightForMarginandPadding(widget, "100");
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
        if (request.getAttribute("containerevent") != null)
        {
            containereventName = frmId + "." + tabpaneid + "." + containereventName;
        }
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
    boolean defaultSelection = false;
    if(request.getAttribute("dfltSelection")!=null && (Boolean)request.getAttribute("dfltSelection"))
    {
            defaultSelection = true;
    }
    
    request.removeAttribute("dfltSelection");
%>
<%
    if (request.getAttribute("segmentid") != null)
    {
        if ("nonpercent".equals(request.getAttribute("seglayout")))
        {
            style = JSWAPUtil.getWidgetStyleInfo(widget, false);
        }
        else
        {
            style = JSWAPUtil.getWidgetStyleInfo(widget, true);
        }

        if (request.getAttribute("eventExist") != null && request.getAttribute("eventExist").equals("true"))
        {
%>
<a konywidgettype="Ksegment" class=<%=widget.map.get(KonyServerWidget.SKIN)%>
	style="display:block;text-decoration:none;text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>"
	 <%if(request.getAttribute("preOnclickJS") != null){ %>prejsevent="<%=request.getAttribute("preOnclickJS")%>" <%} %>
                <%if(request.getAttribute("segPostOnclickJS") != null){ %>prejsevent="<%=request.getAttribute("segPostOnclickJS")%>" <%} %>
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
                            + request.getAttribute("segmentid")
                            + "."
                            + request.getAttribute("segmentrow")
                            + "."
                            + request.getAttribute("eventName")
                            + ".Ksegment=x"
                            + (request.getAttribute("sectionId") != null ? "&sectionid="
                                    + request.getAttribute("sectionId") : ""))%>">
	<%@include file="ImageHelper.jsp"%>
</a>
<%
    }
        else if (defaultSelection || JSWAPUtil.getBooleanValue(widget.getTable(constants.RENDER_AS_ANCHOR)))
        {
%>
<a konywidgettype="Ksegment" class=<%=widget.getTable("skin")%>
	style="text-decoration:none;text-align:<%=widget.getTable(constants.CONTENT_ALIGNMENT)%>"
	 <%if(request.getAttribute("preOnclickJS") != null){ %>prejsevent="<%=request.getAttribute("preOnclickJS")%>" <%} %>
                <%if(request.getAttribute("segPostOnclickJS") != null){ %>prejsevent="<%=request.getAttribute("segPostOnclickJS")%>" <%} %>
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
    }
    else
    {
%>
<%@include file="ImageHelper.jsp"%>
<%
    }

    }

    else if (request.getAttribute("containerevent") != null)
    {
%>
<a konywidgettype="Kbox" eventname="<%=containereventName%>event_"
	href="<%=response.encodeURL(apppath
                        + "?formid="
                        + frmId
                        + "&cat=bjs"
                        + (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() > 0 ? "&krfid="
                                + WAPUtilities.getKRFId(request)
                                : "")
                        + "&event="
                        + containereventName
                        + "&previousform="
                        + (uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID) != null ? WAPUtilities
                                .escapeHtml((String) uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID))
                                : uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)))%>"
	style="text-decoration: none;"> <%@include file="ImageHelper.jsp"%>
</a>
<%
    }
    else
    {
%>
<%@include file="ImageHelper.jsp"%>
<%
    }
%>