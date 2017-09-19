<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="com.kony.web.WebAlert"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="com.konylabs.api.ui.segui.KonySegmentUI"%>
<%@page import="com.konylabs.api.ui.KonyDummyTabWidget"%>

<%@include file="common.jsp"%>
<%@include file="basichead.jsp"%>
<body id="b<%=form.getTable("id")%>" class="<%=form.getTable(KonyServerWidget.SKIN)%>">
	<form id="<%=form.getTable("id")%>" action="<%=apppath%>/<%=form.getTable("id")%>" method="post">

            <%
                //parsing form headers
                if(form.map.get(WEBConstants.FORM_HEADERS) != LuaNil.nil)
                {
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
                            if(JSWAPUtil.getBooleanValue(header.getTable(constants.ISVISIBLE)))
                            {                              
                                request.setAttribute(WEBConstants.WIDGET_ID, header.getTable("id"));
                                request.setAttribute(WEBConstants.FORM_HEADER_ID, header.getTable("id"));
                                jspFile = header.getWidgetType() + WEBConstants.JSP_EXTENSION;
                                %>
                                <jsp:include page="<%=jspFile%>" />
                                <%
                            }                            
                        }
                        request.removeAttribute("FORM_HEADER_ID");
                        request.setAttribute(WEBConstants.FORM_ID, tmpFrmId);
                    }
             }
            %>


            <input name="formid" type="hidden" value="<%=form.getTable("id")%>" /> <input name="cat" type="hidden" value="basic" />
            <input name="cacheid" type="hidden" value="<%=request.getAttribute(WEBConstants.CACHE_ID)%>" />
            <%
                    if (WAPUtilities.isSecureTransaction(session))
                    {
            %>
            <input name="krfid" type="hidden" value="<%=WAPUtilities.getKRFId(request)%>" />
            <%
                    }
            %>
            <%
                    if (uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID) != null)
                    {
            %>
            <input name="<%=WEBConstants.PREVIOUS_FORM_ID%>" type="hidden"
                    value="<%=WAPUtilities.escapeHtml((String)uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID))%>" />
            <%
                    }
            %>
            <%
                    Map<String, String> hiddenFields = (Map<String, String>) uiState.getWebTransactionVariable(WEBConstants.HIDDEN_FIELDS);
                    if (hiddenFields != null)
                    {
                            for (Map.Entry<String, String> hiddenField : hiddenFields.entrySet())
                            {
            %>
            <input name="<%=hiddenField.getKey()%>" type="hidden" value="<%=hiddenField.getValue()%>" />
            <%
                            }
                    }
            %>


            <% if(uiState.getWebTransactionVariable(WEBConstants.TRANS_WEB_ALERT) != null)
            {
                //parsing alert in basic.
               WebAlert webAlert = (WebAlert) uiState.getWebTransactionVariable(WEBConstants.TRANS_WEB_ALERT);
            if (webAlert.alertType != null && (webAlert.alertType.equals(WEBConstants.INFO_ALERT_TYPE) ||
                       webAlert.alertType.equals(WEBConstants.ERROR_ALERT_TYPE)))
            {%>
                <%if(webAlert.hasEvent) {%>
                <jsp:forward page="errorinfoalert.jsp"/>
                <%}else{%>
                <div class="<%=webAlert.alertType + "konyalertdiv"%>">
                <label class="<%=webAlert.alertType + "konyalertlabel"%>">
                <%=webAlert.alertMsg%>
                </label>
                </div>
                <%}%>
            <%}
            else if (webAlert.alertType != null && webAlert.alertType.equals(WEBConstants.CONFIRM_ALERT_TYPE) )
            {
                webAlert.alertSkin = "Main";
                uiState.setWebTransactionVariable(WEBConstants.TRANS_WEB_ALERT, webAlert);
                %>
                <jsp:forward page="confirmalert.jsp"/>
            <%}
            }%>


            <%
                 // parsing form chiildren Hboxes based on position. if position is header or segheader we need to add at them at top.
                    LuaTable children = (LuaTable) form.map.get(WEBConstants.CHILDREN);
                    List<String> childWidgets = children.list;
                    for (String s : childWidgets)
                    {
					
                        childWidget = (KonyServerWidget) form.getTable(s);
                        if(childWidget instanceof KonyContainer &&childWidget.getWidgetType().equals("HBox")&&
                                ("header".equals(childWidget.getTable("position")) || ("segheader".equals(childWidget.getTable("position")))))
                        {
                            jspFile = childWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;
                             if(jspFile.equals("HBox.jsp") && JSWAPUtil.getBooleanValue(childWidget.getTable(constants.ISVISIBLE))) {
                                 request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
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
                            if((Boolean)childWidget.getTable(constants.ISVISIBLE))
                            {
                                request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                                if(childWidget instanceof KonyContainer && childWidget.getWidgetType().equals("HBox")
                                  &&!("normal".equals(childWidget.getTable("position"))|| "".equals(childWidget.getTable("position"))
                                          || childWidget.getTable("position") == LuaNil.nil)){
                                    continue;
                                    }
                                    if(!(childWidget instanceof KonyContainer)&& !(childWidget instanceof KonySegmentUI) && !(childWidget instanceof KonyDummyTabWidget))
                                    {
                                            String WidgetAlignment = JSWAPUtil.getWidgetAlignmentStyle(childWidget);

            %>

            <table columns="1" style="width: 100%; border: none;">
                    <tr style="width: 100%; border: none;" <%=WidgetAlignment%>>
                        <td style="width: 100%; border: none;" <%=WidgetAlignment%> >
                                    <%
									
                                    }
                                
                                 %> <jsp:include page="<%=jspFile%>" /><%

                                    if(!(childWidget instanceof KonyContainer)&& !(childWidget instanceof KonySegmentUI) && !(childWidget instanceof KonyDummyTabWidget))
                                    {
            %>
                            </td>
                    </tr>
            </table>
            <%
                                    }
                            }
                    }
            %>
         <%
        // parsing form chiildren Hboxes based on position. if position is footer or segfooter we need to add at them at bottom.
           for (String s : childWidgets)
               {
               childWidget = (KonyServerWidget) form.getTable(s);
               if(childWidget instanceof KonyContainer && childWidget.getWidgetType().equals("HBox") &&("footer".equals(childWidget.getTable("position")) ||
                       ("segfooter".equals(childWidget.getTable("position"))))){
                   jspFile = childWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;                  
                    if(jspFile.equals("HBox.jsp") && JSWAPUtil.getBooleanValue(childWidget.getTable(constants.ISVISIBLE))) {
                         request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
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
                    if(JSWAPUtil.getBooleanValue(footer.getTable(constants.ISVISIBLE)))
                    {                     
                        request.setAttribute(WEBConstants.WIDGET_ID, footer.getTable("id"));
                        request.setAttribute(WEBConstants.FORM_FOOTER_ID, footer.getTable("id"));
                        jspFile = footer.getWidgetType() + WEBConstants.JSP_EXTENSION;
                        %>
                            <jsp:include page="<%=jspFile%>" />
                            <%
                    }                        
               }

            }

        %>

   <%if(uiState.getAppMenuItems() != null)
     {
    	 boolean launchappmenu = false;
    	 if(form.map.get(constants.NEED_APPLEVEL_MENU) != null && form.map.get(constants.NEED_APPLEVEL_MENU) != LuaNil.nil)
    	 {
    		 launchappmenu = JSWAPUtil.getBooleanValue(form.map.get(constants.NEED_APPLEVEL_MENU));
    	 }
    	 else if(JSWAPUtil.getBooleanValue(form.map.get(constants.NEED_APPMENU)))
    	 {
    		 launchappmenu = JSWAPUtil.getBooleanValue(form.map.get(constants.NEED_APPMENU));
    	 }
    	 if(launchappmenu)     
	     { 
	      %>
        <jsp:include page="appmenu.jsp" />
        <%}}%>

        

	</form>
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
	<div id="JavaScriptDisabledErrorMsg"><%=noScriptMessage%></div>
</body>
</html>