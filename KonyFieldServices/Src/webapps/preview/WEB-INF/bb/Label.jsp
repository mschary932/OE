<%@include file="common.jsp"%>
<%
    String name = (String) widget.map.get("id");
    if (tabpaneid != null) {
        name = frmId + "." + tabpaneid + "." + name;
    }
    if (request.getAttribute(WEBConstants.FORM_HEADER_ID) != null) {
        name = "app.headers." + request.getAttribute(WEBConstants.FORM_HEADER_ID) + "." + name;
    }
    if (request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null) {
        name = "app.footers." + request.getAttribute(WEBConstants.FORM_FOOTER_ID) + "." + name;
    }
    if (request.getAttribute("segmentid") != null) {
        name = request.getAttribute("segmentid").toString();
        if (request.getAttribute("tabpaneid") != null) {
            name = request.getAttribute("tabpaneid") + "." + name;
            name = frmId + "." + name;
        }
    }
    Boolean boxEventExist = false;
    if (request.getAttribute("eventExist") != null) {
        boxEventExist = (Boolean) request.getAttribute("eventExist");
    }
%>
<%if (request.getAttribute("segmentid") != null) {
        if (request.getAttribute("seglayout") != null && request.getAttribute("seglayout").equals("nonpercent")) {
            style = JSWAPUtil.getWidgetStyleInfo(widget, false);
        } else {
            style = JSWAPUtil.getWidgetStyleInfo(widget, true);
        }
         String widgetSkin1 = "";
 if (request.getAttribute("widgetSkin1") != null) {
       widgetSkin1 = (String)request.getAttribute("widgetSkin1"); 
 }else {
     if (widget.map.get(KonyServerWidget.SKIN) != null) {
        widgetSkin1 = (String) widget.map.get(KonyServerWidget.SKIN);
     }
 }
        %>
        <div class="<%=widgetSkin1%>" style="<%=style%>" konywidgettype = "Ksegment" 
        <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
        disabled = "true"
        <%} else{  %>   
     	<%=widget.map.get(WEBConstants.ENABLED) %>
     	<%} %> 
        >
    <label konywidgettype = "Ksegment" class="kheight <%=widgetSkin1%> " style="background:none;border: none; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>" 
    <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
     	disabled = "true"
     <% }else{  %>   
     	<%=widget.map.get(WEBConstants.ENABLED) %>
     	<%} %> >
        <%=request.getAttribute("widgetDataText1")%>
    </label>
</div>
<%} else {%>
<%if (request.getAttribute("layout") != null && request.getAttribute("layout").equals("nonpercent")) {%>
<div class="<%if (widget.map.get(KonyServerWidget.SKIN) != null) {%> <%=widget.map.get(KonyServerWidget.SKIN)%> <%}%>" <%if (boxEventExist) {%> konywidgettype = "Kbox" <% }%>
     style="<%=JSWAPUtil.getWidgetStyleInfo(widget, false)%>">
    <label name="<%=name%>" id="<%=name%>" <%if (boxEventExist) {%> konywidgettype = "Kbox" <% }%> accesskey=""
           class="kheight <%if (widget.map.get(KonyServerWidget.SKIN) != null) {%> <%=widget.map.get(KonyServerWidget.SKIN)%> <%}%> " style=" background:none; border: none; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>" >
        <%=widget.getTable(KonyServerWidget.TEXT)%>
    </label>
</div>
<%} else {%>
<div class="<%if (widget.map.get(KonyServerWidget.SKIN) != null) {%> <%=widget.map.get(KonyServerWidget.SKIN)%> <%}%>" <%if (boxEventExist) {%> konywidgettype = "Kbox" <% }%>
     style="<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%> ">
    <label name="<%=name%>" id="<%=name%>" <%if (boxEventExist) {%> konywidgettype = "Kbox" <% }%> accesskey=""
           class="kheight <%if (widget.map.get(KonyServerWidget.SKIN) != null) {%> <%=widget.map.get(KonyServerWidget.SKIN)%> <%}%>" style="background:none; border:none;width:100%;text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>" >
        <%=widget.getTable(KonyServerWidget.TEXT)%>
    </label>
</div>
<%}%>
<%}%>