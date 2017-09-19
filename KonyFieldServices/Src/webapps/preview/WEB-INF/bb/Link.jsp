<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Vector"%>
<%@page import="com.konylabs.api.ui.KonyTab"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="java.util.HashMap"%>

<%@include file="common.jsp"%>

<%
        String eventName = widget.getWidgetID()+"event_";
        if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
        {
            eventName = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + eventName;
        }
        if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
        {
            eventName = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + eventName;
        }
        if(request.getAttribute("tabpaneid") != null)
        {
             eventName = request.getAttribute("tabpaneid")+"."+widget.getWidgetID()+"event_";
             eventName = frmId +"."+eventName;
        }
        if(request.getAttribute("segmentid") != null)
        {
            eventName = request.getAttribute("segmentid")+"."+request.getAttribute("rowid")+"."+widget.getWidgetID()+"event_"+"."+"Ksegment";
            if(request.getAttribute("tabpaneid") != null)
            {
                 eventName = request.getAttribute("tabpaneid") +"."+eventName;
                 eventName = frmId +"."+eventName;
            }
        }
%>
<%if(request.getAttribute("segmentid") != null){
    if(request.getAttribute("seglayout")!= null && request.getAttribute("seglayout").equals("nonpercent"))
    {
        style = JSWAPUtil.getWidgetStyleInfo(widget, false);
    }
    else{
        style = JSWAPUtil.getWidgetStyleInfo(widget, true);
    }%>
   <div <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" 
                              <%if(widget.map.get(constants.SHOW_PROGRESS_INDICATOR) != null 
           && "true".equals(widget.map.get(constants.SHOW_PROGRESS_INDICATOR).toString())){%>
            kprogressskin ="<%=widget.map.get(KonyServerWidget.SKIN)%>"
            <%} %>  <%}%>  konywidgettype = "seg_Klink" 	style="<%=style%>" >
            <a konywidgettype = "seg_Klink" style="width:100%; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>" id="<%=widgetId%> " name="<%=eventName%>" <%="yes".equals(event) ? "event=\"yes\"" : "" %>
            href="#" eventname ="<%=eventName%>" rowid="<%=request.getAttribute("rowid")%>"
            <%if(request.getAttribute("sectionId") != null) { %> sectionid = <%= request.getAttribute("sectionId")%> <%} %>
            <%if(widget.map.get(WEBConstants.ENABLED).toString() != null && widget.map.get(WEBConstants.ENABLED).toString().length() > 0 ){%> kdisabled="true" <%} %>
            <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false))
             {%>
             	kdisabled="true"
             <%}%>
            <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.getTable(constants.PRE_ONCLICK_JS)%>"
            <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.getTable(constants.POST_ONCLICK_JS)%>" <%}%>            
            <%if(widget.map.get(constants.SUBMIT_URL) != null && widget.map.get(constants.SUBMIT_URL) != LuaNil.nil) {%>
                externalSubmitAction = "<%= widget.map.get(constants.SUBMIT_URL)%>"
            <%}%>     
            >
                 <%=request.getAttribute("widgetDataText1")%>
            </a>
    </div>
  <%}
else{%>
<%if(request.getAttribute("layout")!= null && request.getAttribute("layout").equals("nonpercent"))
    {%>
        <div <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" 
                               <%if(widget.map.get(constants.SHOW_PROGRESS_INDICATOR) != null 
           && "true".equals(widget.map.get(constants.SHOW_PROGRESS_INDICATOR).toString())){%>
            kprogressskin ="<%=widget.map.get(KonyServerWidget.SKIN)%>"
            <%} %>  <%}%> konywidgettype = "Klink"
                    style=" <%=JSWAPUtil.getWidgetStyleInfo(widget, false)%>  ">
	<a style="border: none; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>" class=" kwt100 kheight"
           konywidgettype="Klink" name="<%=eventName%>" id="<%=eventName%>" 
           <%if(widget.map.get(constants.SHOW_PROGRESS_INDICATOR) != null 
           && "true".equals(widget.map.get(constants.SHOW_PROGRESS_INDICATOR).toString())){%>
            kprogressskin ="<%=widget.map.get(KonyServerWidget.SKIN)%>"
            <%} %>  
		<% if(widget.getTable(constants.ONCLICK) != LuaNil.nil) {%> event="yes" <% } else { %> event="" <% } %>
                <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.getTable(constants.PRE_ONCLICK_JS)%>"
                <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.getTable(constants.POST_ONCLICK_JS)%>" <%}%>
                <%if(widget.map.get(constants.BLOCKED_UI_SKIN)!= null){%> kblockinskin="<%=widget.map.get(constants.BLOCKED_UI_SKIN)%>" <% }%>
		<%if(widget.map.get(WEBConstants.ENABLED).toString().length() > 0 ){%> kdisabled="true" <%} %>
                <%if(widget.map.get(constants.EXTERNAL_URL) != LuaNil.nil){%>
                    href="#" onclick="window.open('<%=widget.map.get(constants.EXTERNAL_URL)%>'); return false;"
                 <%}else{%>
                    href="#"
                 <%}%>
                <%if(widget.map.get(constants.SUBMIT_URL) != null && widget.map.get(constants.SUBMIT_URL) != LuaNil.nil) {%>
                externalSubmitAction = "<%= widget.map.get(constants.SUBMIT_URL)%>"
                <%} %>                 >
		<%=widget.map.get(KonyServerWidget.TEXT)%>
	</a>
</div>
    <%}
    else{%>
        <div <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" 
                               <%if(widget.map.get(constants.SHOW_PROGRESS_INDICATOR) != null 
           && "true".equals(widget.map.get(constants.SHOW_PROGRESS_INDICATOR).toString())){%>
            kprogressskin ="<%=widget.map.get(KonyServerWidget.SKIN)%>"
            <%} %> 
                     <%}%>  konywidgettype = "Klink"
	style=" <%=JSWAPUtil.getWidgetStyleInfo(widget, true)%> ">
	<a style=" border: none; width: 100%; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>" class=" kwt100 kheight"
           konywidgettype="Klink" name="<%=eventName%>" id="<%=eventName%> " 
           <%if(widget.map.get(constants.SHOW_PROGRESS_INDICATOR) != null 
           && "true".equals(widget.map.get(constants.SHOW_PROGRESS_INDICATOR).toString())){%>
            kprogressskin ="<%=widget.map.get(KonyServerWidget.SKIN)%>"
            <%} %> 
		<% if(widget.getTable(constants.ONCLICK) != LuaNil.nil) {%> event="yes" <% } else { %> event="" <% } %>
                <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.getTable(constants.PRE_ONCLICK_JS)%>"
                <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.getTable(constants.POST_ONCLICK_JS)%>" <%}%>
                <%if(widget.map.get(constants.BLOCKED_UI_SKIN)!= null){%> kblockinskin="<%=widget.map.get(constants.BLOCKED_UI_SKIN)%>" <% }%>
         <%if(widget.map.get(WEBConstants.ENABLED).toString().length() > 0 ){%> kdisabled="true" <%} %>
         <%if(widget.map.get(constants.EXTERNAL_URL) != LuaNil.nil){%>
            href="#" onclick="window.open('<%=widget.map.get(constants.EXTERNAL_URL)%>'); return false;"
         <%}else{%>
            href="#"
         <%}%>
        <%if(widget.map.get(constants.SUBMIT_URL) != null && widget.map.get(constants.SUBMIT_URL) != LuaNil.nil) {%>
        externalSubmitAction = "<%= widget.map.get(constants.SUBMIT_URL)%>"
        <%} %>         >
		<%=widget.map.get(KonyServerWidget.TEXT)%>
	</a>
</div>
    <%}%>
<%}%>

