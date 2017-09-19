<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@include file="common.jsp"%>

<%
    String scaleMode;
    String isPercent = "true";
    if (widget.getTable(constants.IMAGE_SCALE_MODE) != LuaNil.nil)
        scaleMode = (String) widget.getTable(constants.IMAGE_SCALE_MODE);
    else
        scaleMode = "default";

    String imgID = (String) widget.getTable("id");
    String imgsrc = "";
    if (widget.map.get("src") != null && widget.map.get("src") != LuaNil.nil)
        imgsrc = (String) widget.map.get("src");

    Double cwt = (Double) widget.getTable(constants.CONTAINER_WEIGHT);
    if (widget.getParent() != null)
    {
        String parent = widget.getParent().getWidgetType();
        if (parent.equalsIgnoreCase("form") || parent.equalsIgnoreCase("form2")
                || parent.equalsIgnoreCase("vbox"))
            cwt = 100.0;
    }

    String width1 = JSWAPUtil.adjustedWeightForMarginandPadding(widget, "100");
    String name = "";
    if (request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
    {
        name = "app.headers." + request.getAttribute(WEBConstants.FORM_HEADER_ID) + "." + name;
    }
    else if (request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
    {
        name = "app.footers." + request.getAttribute(WEBConstants.FORM_FOOTER_ID) + "." + name;
    }

    if (tabpaneid != null)
    {
        name = frmId + "." + tabpaneid + "." + name;
    }

    String wType = "Kimage";
    if (request.getAttribute("eventExist") != null)
    {
        wType = "Kbox";
    }

    if (request.getAttribute("segmentid") != null)
    {
        name = request.getAttribute("segmentid").toString();
        if (request.getAttribute("tabpaneid") != null)
        {
            name = request.getAttribute("tabpaneid") + "." + name;
            name = frmId + "." + name;
        }
        wType = "Ksegment";
    }

    if (request.getAttribute("widgetDataText1") != null)
        imgsrc = (String) request.getAttribute("widgetDataText1");

    if (!imgsrc.startsWith("http"))
    {
        imgsrc = imgpath + imgsrc;
    }
%>
<%
    if (request.getAttribute("layout") != null && request.getAttribute("layout").equals("nonpercent"))
    {
        style = JSWAPUtil.getWidgetStyleInfo(widget, false);
        isPercent = "false";
    }
    else
    {
        style = JSWAPUtil.getWidgetStyleInfo(widget, true);
    }

    int referenceWidth = 0, referenceHeight = 0;

    if (widget.getTable(constants.REFERENCE_WIDTH) != LuaNil.nil)
        referenceWidth = ((Double) widget.getTable(constants.REFERENCE_WIDTH)).intValue();

    if (widget.getTable(constants.REFERENCE_HEIGHT) != LuaNil.nil)
        referenceHeight = ((Double) widget.getTable(constants.REFERENCE_HEIGHT)).intValue();
%>

<%
    if (scaleMode.equals("fittodimensions"))
    {
%>
<img name="<%=imgID%>" id="<%=imgID%>" alt="" src="<%=imgsrc%>" view="fittodimensions" refwidth="<%=referenceWidth%>"
	refheight="<%=referenceHeight%>" konywidgettype="<%=wType%>" onload="kony.widgets.Image.imgLoadHandler2(this)"
	cwt="<%=cwt%>" style="margin:<%=JSWAPUtil.getWidgetMargin(widget)%>; padding:<%=JSWAPUtil.getWidgetPadding(widget)%>" ispercent="<%=isPercent%>"
	<%if (request.getAttribute("sectionId") != null)
                {%>
	sectionid="<%=request.getAttribute("sectionId")%>" <%}%> />
<%
    }
    else
    {
%>
    
    <span id="<%=imgID%>_span" class="     " konywidgettype="<%=wType%>" style="display:inline-block; margin:<%=JSWAPUtil.getWidgetMargin(widget)%>; padding:<%=JSWAPUtil.getWidgetPadding(widget)%>width:100%;">
<img name="<%=imgID%>" id="<%=imgID%>" alt="" src="<%=imgsrc%>" view="maintainaspectratio"
	refwidth="<%=referenceWidth%>" refheight="<%=referenceHeight%>" konywidgettype="<%=wType%>"
	onload="kony.widgets.Image.delayedImageLoading(event,this)" cwt="<%=cwt%>" style="visibility:hidden;opacity: 0;" ispercent="<%=isPercent%>"
	<%if (request.getAttribute("sectionId") != null)
                {%>
	sectionid="<%=request.getAttribute("sectionId")%>" <%}%> />
    </span>
<%
    }
%>


