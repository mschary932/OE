<%@page import="com.konylabs.api.ExecutionContext.DisplayType"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="com.kony.web.WebAlert"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="com.konylabs.api.ui.segui.KonySegmentUI"%>
<%@page import="com.konylabs.api.ui.KonyDummyTabWidget"%>

<%@include file="common.jsp"%>

<%@include file="head.jsp"%>

<%
     conditions = WAPUtilities.checkForSpecialConditions(uiState);
    if (conditions != null && conditions.trim().length() != 0)
    {
        if (uiState.getWebTransactionVariable(WEBConstants.HYBRID_TO_NATIVE) != null)
        {
            out.println(conditions);
        }
        else
        {
            out.println(conditions);  
            return;
        }
    }
    
Object popupContext = form.getTable("context");
    Object popupDismiss = form.getTable("dismiss");
    Object widgetTable = "";
    String widgetContextId="";
    if(popupContext != null && popupContext instanceof com.konylabs.vm.LuaTable){
           widgetTable = ((com.konylabs.vm.LuaTable)popupContext).getTable("widget");
            if(widgetTable != null && widgetTable instanceof com.konylabs.vm.LuaTable){
                widgetContextId = (String)((com.konylabs.vm.LuaTable)widgetTable).getTable("id");
            }
    } %>

        <konypopup transition="$popuptransition" widget="<%=widgetContextId%>" anchor="top" model="true"
            title="<%=form.getTable("title")%>" dismiss="<%=form.getTable("dismiss")%>" width="<%=form.getTable(constants.CONTAINER_WEIGHT)%>%"
            <%if(WAPUtilities.isSecureTransaction(session)){%> krfid="<%=WAPUtilities.getKRFId(request)%>" <%}%> />
<form id="<%=form.getTable("id")%>" action="<%=apppath%>/<%=form.getTable("id")%>" method="post" imgbaseurl ="<%=imgpath%>" selected="true" 
        <% if(!"".equals(form.getTable(KonyServerWidget.SKIN))) {%> class="<%=form.getTable(KonyServerWidget.SKIN)%>"
        <%}else { %> class="konyform" <%}%> formonloadjs="<%=form.getTable(constants.FORM_ONLOAD_JS)%>"
        formunloadjs="<%=form.getTable(constants.FORM_UNLOAD_JS)%>" nocache="<%=form.map.get(constants.NO_CACHE) %>"	
        style ="padding:<%=JSWAPUtil.getWidgetPadding((KonyServerWidget)uiState.get(frmId))%>;"  >

        <input type="hidden" autocomplete="off" id="isnewpage" value="true" />
        <input name="konyformtitle" type="hidden" autocomplete="off" value="<%=form.getTable("title")%>" /> 
        <input name="formid" type="hidden" autocomplete="off" value="<%=frmId%>" /> 
        <input name="cat" type="hidden" autocomplete="off" value="<%=deviceCategory%>" /> 
        <input name="DisplayType" type="hidden" autocomplete="off" value="<%=DisplayType.POPUP%>">
        <%if(WAPUtilities.isSecureTransaction(session)){%>
        <input name="krfid" type="hidden" autocomplete="off" value="<%=WAPUtilities.getKRFId(request)%>" />
    <%}
    Map<String, String> hiddenFields = (Map)uiState.getWebTransactionVariable("hiddenfields");
    if(hiddenFields != null)
    {
       for(Map.Entry<String, String> hiddenField : hiddenFields.entrySet())
       {
    %>
        <input name="<%=hiddenField.getKey()%>" type="hidden" autocomplete="off" value="<%=hiddenField.getValue()%>" />
    <% }
    }
    %>
    <%
    if(form.map.get(constants.CAPTURE_GPS) != null && (Boolean)form.map.get(constants.CAPTURE_GPS))
    {%>
        <input id="gpseventtrue"  type="hidden" autocomplete="off"  konyffipreevent="true" />
    <% }%> 
    <% if (uiState.getSessionLevelVariable("registerfortimeout")!=null && (Boolean) uiState.getSessionLevelVariable("registerfortimeout") ) { %>
        <input id="enabletimeout" registertimeout="<%=uiState.getSessionLevelVariable("registryfortimeout")%>" tim="<%=uiState.getSessionLevelVariable("idletimeout")%>"   type="hidden" autocomplete="off"  value="<%=uiState.getSessionLevelVariable("idletimeout")%>"/>
    <%}%>    
        <input name="cacheid" type="hidden" autocomplete="off" value="<%=request.getAttribute("cacheid")%>" />
       
        <input name="<%=WEBConstants.PREVIOUS_FORM_ID%>" type="hidden" autocomplete="off"
            value="<%=WAPUtilities.escapeHtml((String)uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID))%>" />

        <%
                    //parsing form headers.           
            LuaTable headers = (LuaTable)form.map.get(WEBConstants.FORM_HEADERS);
           if(headers == null) //for backward compatability
            headers = (LuaTable)form.map.get(constants.FORM_GLOBAL_HEADERS);
            if(headers != null && headers.list != null && !headers.list.isEmpty())
            {
                String tmpFrmId = frmId;
                KonyServerWidget header = null;
               for( int i = 0 ; i < headers.list.size(); i++)
               {
                    header = (KonyServerWidget)headers.list.get(i);
                    request.setAttribute(WEBConstants.WIDGET_ID, header.getTable("id"));
                    request.setAttribute(WEBConstants.FORM_HEADER_ID, header.getTable("id"));
                    jspFile = header.getWidgetType() + WEBConstants.JSP_EXTENSION;
                    %>
        <jsp:include page="<%=jspFile%>" />
        <%
               }
              request.removeAttribute("FORM_HEADER_ID");
              request.setAttribute(WEBConstants.FORM_ID, tmpFrmId);
            }
      
                     // parsing form Hbox headers based on position.
            LuaTable children = (LuaTable) form.map.get(WEBConstants.CHILDREN);
            List<String> childWidgets = children.list;
                        for (String s : childWidgets)
            {
                            childWidget = (KonyServerWidget) form.getTable(s);                            
                            if(childWidget instanceof KonyContainer &&("header".equals(childWidget.getTable("position")) ||
                                    ("segheader".equals(childWidget.getTable("position"))))){
                                jspFile = childWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;
                                request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                                 if(jspFile.equals("HBox.jsp")) {
                 %>
        <jsp:include page="<%=jspFile%>" />
        <%
                                }
                            }
                        }
                 %>

        <%                    
            for (String s : childWidgets)
            {
                childWidget = (KonyServerWidget) form.getTable(s);
                jspFile = childWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;
                                if(jspFile.equals("Button.jsp")) {
                                        if(childWidget.getTable(constants.CONTENT_ALIGNMENT)== LuaNil.nil) {
                                            jspFile = "Phone.jsp";  
                                            childWidget.map.put("wType", "Phone");
                                        }
                                }
                request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                if((Boolean)childWidget.getTable(constants.ISVISIBLE))
                {
                    if(!(childWidget instanceof KonyContainer)&& !(childWidget instanceof KonySegmentUI) && !(childWidget instanceof KonyDummyTabWidget))
                    {                                                

        %>

        <div class=" ktable kwt100 " columns="1" style="border: none;">
            <div class="krow kwt100" style="border: none;">
                <div class="kcell kwt100" style="border: none;">
                    <%
                    }    
        %>

                    <jsp:include page="<%=jspFile%>" />
                    <%
               
                    if(!(childWidget instanceof KonyContainer)&& !(childWidget instanceof KonySegmentUI) && !(childWidget instanceof KonyDummyTabWidget))
                    {
        %>
                </div>
            </div>
        </div>
        <%
                    }
                }
            }
                  %>

        <%                                        
                     for (String s : childWidgets)
            {
                            childWidget = (KonyServerWidget) form.map.get(s);                            
                            if(childWidget instanceof KonyContainer &&(("footer".equals(childWidget.map.get("position")))||
                                    ("segfooter".equals(childWidget.map.get("position"))))){
                                jspFile = childWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;
                                request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                                 if(jspFile.equals("HBox.jsp")) {
                 %>
        <jsp:include page="<%=jspFile%>" />
        <%
                                }
                            }
                        }
    
    LuaTable footers = (LuaTable)form.map.get(WEBConstants.FORM_FOOTERS);
    if(footers == null)
        footers = (LuaTable)form.map.get(constants.FORM_GLOBAL_FOOTERS);
    if(footers != null && footers.list != null && !footers.list.isEmpty())
    {
        KonyServerWidget footer = null;
       for( int i = 0 ; i < footers.list.size(); i++)
       {
            footer = (KonyServerWidget)footers.list.get(i);
            request.setAttribute(WEBConstants.WIDGET_ID, footer.getTable("id"));
            request.setAttribute(WEBConstants.FORM_FOOTER_ID, footer.getTable("id"));
            jspFile = footer.getWidgetType() + WEBConstants.JSP_EXTENSION;
            %>
        <jsp:include page="<%=jspFile%>" />
        <%
       }

    }

%>



    </form>
    <% if (uiState.getWebTransactionVariable(WEBConstants.NEW_PAGE) != null){%>
    <style>
#JavaScriptDisabledErrorMsg {
    display: none;
}
</style>
    <noscript>
        <style type='text/css'>
form {
    display: none !important
}

html {
    display: block
}

#JavaScriptDisabledErrorMsg {
    display: block;
}
</style>
    </noscript>
    <div id="JavaScriptDisabledErrorMsg">To use this site, first enable your browser's JavaScript support and then
        refresh this page.</div>

</html>
<%}%>