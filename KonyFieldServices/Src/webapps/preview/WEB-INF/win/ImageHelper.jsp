<%@page import="com.kony.web.WEBConstants"%>
<%
if(request.getAttribute("widgetDataText1") != null)
    imgsrc = (String)request.getAttribute("widgetDataText1");
if(!imgsrc.startsWith("http"))
{
        imgsrc = imgpath+ imgsrc.split(",")[0];
}
%>
<%if("nonpercent".equals(request.getAttribute("layout"))) { %>
    <%if (scaleMode.equals("default"))
    {%>
            <img  id ="<%=imgID%>" name="<%=imgID%>" alt="" src="<%=imgsrc%>" style="<%=JSWAPUtil.getWidgetStyleInfoForIE(widget, false)%>" />
    <% }
    else if (scaleMode.equals("maintainaspectratio"))
    {%>
        <div style="width:100%;">
            <img  id ="<%=imgID%>" name="<%=imgID%>"  alt="" src="<%=imgsrc%>" style=" width:100%; <%=JSWAPUtil.getWidgetStyleInfoForIE(widget, false)%>  " />
        </div>
    <% }
    else if (scaleMode.equals("fixedsize"))
    {
       // imageCat: need to parse style based on widget dimensions
        String heightwidth = (String)widget.map.get("bjs"+imageCat+"heightwidth");
        String dim [] = heightwidth.split(",");   
    %>
            <img  id ="<%=imgID%>" name="<%=imgID%>" alt="" src="<%=imgsrc %>" style=" width:<%=dim[0]%>px; height: <%=dim[1]%>px; <%=JSWAPUtil.getWidgetStyleInfoForIE(widget, false)%>" />
    <%}%>    
<%} else{%>   
    <%if (scaleMode.equals("default"))
    {%>
            <img  id ="<%=imgID%>" name="<%=imgID%>" alt="" src="<%=imgsrc%>" style="<%=JSWAPUtil.getWidgetStyleInfoForIE(widget, true)%>" />
    <% }
    else if (scaleMode.equals("maintainaspectratio"))
    {%>
        <div style="width:100%;">
            <img  id ="<%=imgID%>" name="<%=imgID%>"  alt="" src="<%=imgsrc%>" style=" width:100%; <%=JSWAPUtil.getWidgetStyleInfoForIE(widget, true)%>  " />
        </div>
    <% }
    else if (scaleMode.equals("fixedsize"))
    {
       // imageCat: need to parse style based on widget dimensions
        String heightwidth = (String)widget.map.get("bjs"+imageCat+"heightwidth");
        String dim [] = heightwidth.split(",");   
    %>
            <img  id ="<%=imgID%>" name="<%=imgID%>" alt="" src="<%=imgsrc %>" style=" width:<%=dim[0]%>px; height: <%=dim[1]%>px; <%=JSWAPUtil.getWidgetStyleInfoForIE(widget, true)%>" />
    <%}%>
<%}%>              

