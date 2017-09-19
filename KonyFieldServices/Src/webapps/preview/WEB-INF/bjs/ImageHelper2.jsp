<%@page import="com.kony.web.util.JSWAPUtil"%>
<%@page import="com.kony.web.WEBConstants"%>

<%if (scaleMode.equals("fittodimensions")) {%>
    <img  name="<%=imgID%>" id ="<%=imgID%>" alt="" src="<%=imgsrc%>"  view ="fittodimensions"  refwidth = "<%=referenceWidth%>" refheight = "<%=referenceHeight%>"
          cwt="<%=cwt%>" ispercent="<%=isPercent%>"
          onload ="KImageLoad(this)" style="<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>"
          />
<% } else  {
%>
    <span id="<%=imgID%>_span" class="     " style="display:inline-block;<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>;width:100%;">
    <img  name="<%=imgID%>" id ="<%=imgID%>" alt="" src="<%=imgsrc%>" view ="maintainaspectratio" refwidth = "<%=referenceWidth%>" refheight = "<%=referenceHeight%>"
          cwt="<%=cwt%>" ispercent="<%=isPercent%>" style="visibility: hidden;opacity: 0;"
          onload ="delayedImageLoading(event,this);" />
        </span>
<% } %>         

