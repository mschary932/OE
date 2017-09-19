<%@page import="com.konylabs.vm.LuaNil"%>
<%@include file="common.jsp"%>

<%
	String imgsrc = "";
	Object imgexists = widget.getTable("image");
	boolean phbg = false;
	if (imgexists != LuaNil.nil)
	{
		phbg = true;
		imgsrc = imgpath + (String) widget.getTable("image");

	}       
%>

<%
	if (phbg)
	{
%>
<a konywidgettype="Kphone" class="<%=widget.getTable(KonyServerWidget.SKIN)%>" href="tel:<%=widget.getTable(KonyServerWidget.TEXT)%>"
  style="<%=JSWAPUtil.getWidgetStyleInfo(widget, !(request.getAttribute("layout") != null && request.getAttribute("layout").equals("nonpercent")))%>"
  <%if (widget.map.get(constants.PRE_ONCLICK_JS) != null
                            && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
                    {%>
    prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
    <%}
                    if (widget.map.get(constants.POST_ONCLICK_JS) != null
                            && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil)
                    {%>
    postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>>
	<img style="border: none;" konywidgettype="Kphone" src="<%=imgsrc%>" alt="Call" />
</a>
<%
	}
	else
	{
%>

<div konywidgettype="Kphone" class="<%=widget.getTable(KonyServerWidget.SKIN)%> "
	style="<%=JSWAPUtil.getWidgetStyleInfo(widget, !(request.getAttribute("layout") != null && request.getAttribute("layout").equals("nonpercent")))%>"
	<%if (widget.map.get(constants.PRE_ONCLICK_JS) != null
                            && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
                    {%>
    prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
    <%}
                    if (widget.map.get(constants.POST_ONCLICK_JS) != null
                            && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil)
                    {%>
                    postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>> 
	<a konywidgettype="Kphone" class="<%=widget.getTable(KonyServerWidget.SKIN)%>" 
	href="tel:<%=request.getAttribute("widgetDataText1") == null ? widget.getTable(KonyServerWidget.TEXT) : request.getAttribute("widgetDataText1")%>"
		style="border: none; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>"
		<%if (widget.map.get(constants.PRE_ONCLICK_JS) != null
                            && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
                    {%>
    prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
    <%}
                    if (widget.map.get(constants.POST_ONCLICK_JS) != null
                            && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil)
                    {%>
    postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>> 
		<%=request.getAttribute("widgetDataText1") == null ? widget.getTable(KonyServerWidget.TEXT) : request.getAttribute("widgetDataText1")%>
	</a>
</div>

<%
	}
%>

