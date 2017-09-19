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
    String wType = "Kimage";
    if (request.getAttribute("eventExist") != null)
        wType = "Kbox";

    if (request.getAttribute("segmentid") != null)
    {
        name = request.getAttribute("segmentid").toString();
        if (request.getAttribute("tabpaneid") != null)
        {
            name = request.getAttribute("tabpaneid") + "." + name;
            name = frmId + "." + name;
        }
        imgsrc = (String) request.getAttribute("widgetDataText1");
        if (imgsrc == null)
        {
            imgsrc = "";
        }
        wType = "Ksegment";
    }

    if (!imgsrc.startsWith("http"))
    {
        imgsrc = imgpath + imgsrc;
    }
%>


<%
    if (scaleMode.equals("default"))
    {
%>
<img id="<%=imgID%>" name="<%=imgID%>" alt="" src="<%=imgsrc%>" style="<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>"
	konywidgettype="<%=wType%>" <%if (request.getAttribute("sectionId") != null)
                {%>
	sectionid="<%=request.getAttribute("sectionId")%>" <%}%>>
<%
    }
    else if (scaleMode.equals("maintainaspectratio"))
    {
%>
<div style="width: 100%;" konywidgettype="<%=wType%>" >
	<img id="<%=imgID%>" name="<%=imgID%>" alt="" src="<%=imgsrc%>"
		style=" width:100%; <%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>  " konywidgettype="<%=wType%>"
		<%if (request.getAttribute("sectionId") != null)
                {%>
		sectionid="<%=request.getAttribute("sectionId")%>" <%}%>>
</div>
<%
    }
    else if (scaleMode.equals("fixedsize"))
    {
        // imageCat: need to parse style based on widget dimensions
        String heightwidth = (String) widget.map.get("heightwidth");
        String dim[] = heightwidth.split(",");
%>
<img id="<%=imgID%>" name="<%=imgID%>" alt="" src="<%=imgsrc%>"
	style="width:<%=dim[0]%>px; height: <%=dim[1]%>px; <%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>"
	konywidgettype="<%=wType%>" <%if (request.getAttribute("sectionId") != null)
                {%>
	sectionid="<%=request.getAttribute("sectionId")%>" <%}%>>
<%
    }
%>
