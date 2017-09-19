<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@include file="common.jsp"%>

<%
        String scaleMode;
        String isPercent = "true";
        if(widget.getTable(constants.IMAGE_SCALE_MODE)!= LuaNil.nil)
             scaleMode = (String) widget.getTable(constants.IMAGE_SCALE_MODE);
        else
            scaleMode = "default";
        
        String imgID = (String) widget.getTable("id");
        String imgsrc = "";
        if(widget.map.get("src")!= null && widget.map.get("src") != LuaNil.nil)
                imgsrc= (String)widget.map.get("src");
        if(!imgsrc.startsWith("http"))
        {
                 imgsrc = imgpath+ imgsrc.split(",")[0];
        }
               
        Double cwt= (Double) widget.getTable(constants.CONTAINER_WEIGHT);
        if(widget.getParent() != null) {
            String parent  =  widget.getParent().getWidgetType();
            if(parent.equalsIgnoreCase("form") || parent.equalsIgnoreCase("form2") || parent.equalsIgnoreCase("vbox") )
                cwt =100.0;
         }
        
        int referenceWidth =0, referenceHeight = 0;
        if (request.getAttribute("widgetDataText1") != null)
        {    
            imgsrc = (String) request.getAttribute("widgetDataText1");    
            if(!imgsrc.startsWith("http"))
                    imgsrc = imgpath+ imgsrc;    
        }    

        if(widget.getTable(constants.REFERENCE_WIDTH) != LuaNil.nil)
                referenceWidth = ((Double)widget.getTable(constants.REFERENCE_WIDTH)).intValue();

        if(widget.getTable(constants.REFERENCE_HEIGHT) != LuaNil.nil)
                referenceHeight = ((Double)widget.getTable(constants.REFERENCE_HEIGHT)).intValue();        

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
        if (request.getAttribute("layout") != null && request.getAttribute("layout").equals("nonpercent"))
        {
            style = JSWAPUtil.getWidgetStyleInfo(widget, false);
            isPercent = "false";
        }
        else
        {
            style = JSWAPUtil.getWidgetStyleInfo(widget, true);
        }

        boolean defaultSelection = false;
        if (request.getAttribute("dfltSelection") != null)
        {
            if ((Boolean) request.getAttribute("dfltSelection"))
            {
                defaultSelection = true;
            }
        }
        request.removeAttribute("dfltSelection");
%>
<%
    if (request.getAttribute("segmentid") != null)
    {
        if ("nonpercent".equals(request.getAttribute("seglayout")))
        {
            style = JSWAPUtil.getWidgetStyleInfo(widget, false);
            isPercent = "false";
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
	<%@include file="ImageHelper2.jsp"%>
</a>
<%
    }
         else if (defaultSelection || (Boolean) JSWAPUtil.getBooleanValue(widget.getTable(constants.RENDER_AS_ANCHOR)))
        {
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
	<%@include file="ImageHelper2.jsp"%>
</a>
<%
    }
    else
    {
%>
<%@include file="ImageHelper2.jsp"%>
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
<%@include file="ImageHelper2.jsp"%>
<%
    }
%>