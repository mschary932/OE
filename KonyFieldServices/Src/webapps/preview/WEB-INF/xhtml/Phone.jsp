<%@include file="common.jsp"%>

<%
	String imgsrc = "";
	Object imgexists = widget.getTable("image");
	boolean phbg = false;
	if (imgexists != null && !(imgexists instanceof com.konylabs.vm.LuaNil))
	{
		phbg = true;
		imgsrc = imgpath + (String) widget.getTable("image");

	}       
%>

<%
	if (phbg)
	{
%>
<a konywidgettype="Kphone" class="<%=widget.getTable(KonyServerWidget.SKIN)%> " href="tel:<%=widget.getTable(KonyServerWidget.TEXT)%>"
  style="<%=JSWAPUtil.getWidgetStyleInfo(widget, !(request.getAttribute("layout") != null && request.getAttribute("layout").equals("nonpercent")))%>">
	<img style="border: none;" konywidgettype="Kphone" src="<%=imgsrc%>" alt="Call" />
</a>
<%
	}
	else
	{
%>

<div konywidgettype="Kphone" class="<%=widget.getTable(KonyServerWidget.SKIN)%>"
	style="<%=JSWAPUtil.getWidgetStyleInfo(widget, !(request.getAttribute("layout") != null && request.getAttribute("layout").equals("nonpercent")))%>">
	<a konywidgettype="Kphone" class="<%=widget.getTable(KonyServerWidget.SKIN)%>" 
	href="tel:<%=request.getAttribute("widgetDataText1") == null ? widget.getTable(KonyServerWidget.TEXT) : request.getAttribute("widgetDataText1")%>"
		style="border: none;"> 
		<%=request.getAttribute("widgetDataText1") == null ? widget.getTable(KonyServerWidget.TEXT) : request.getAttribute("widgetDataText1")%>
	</a>
</div>

<%
	}
%>

