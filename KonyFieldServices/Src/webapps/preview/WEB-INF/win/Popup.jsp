<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="com.kony.web.WebAlert"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="com.konylabs.api.ui.segui.KonySegmentUI"%>
<%@page import="com.konylabs.api.ui.KonyDummyTabWidget"%>

<%@include file="common.jsp"%>
<%@include file="bjshead.jsp"%>

<body id="b<%=frmId %>" class = "<%=form.getTable(KonyServerWidget.SKIN)%>">
<form id="<%=frmId %>" action="<%=apppath%>/pop1" method="post" formonloadjs="<%=form.getTable(constants.FORM_ONLOAD_JS)%>"
        formunloadjs="<%=form.getTable(constants.FORM_UNLOAD_JS)%>"
        style ="padding:<%=JSWAPUtil.getWidgetPadding((KonyServerWidget)uiState.get(frmId))%>;"> 
<input name="formid"  type="hidden" autocomplete="off"  value="<%=frmId %>"/>
<input name="cat"  type="hidden" autocomplete="off"  value="bjs"/>
<input name="<%=WEBConstants.PREVIOUS_FORM%>"  type="hidden" autocomplete="off"  value="<%=(uiState.getWebTransactionVariable(WEBConstants.PREVIOUS_FORM) != null ? WAPUtilities.escapeHtml((String)uiState.getWebTransactionVariable(WEBConstants.PREVIOUS_FORM)) : uiState.getWebTransactionVariable(WEBConstants.PREVIOUS_FORM))%>"/>
<input name="cacheid"  type="hidden" autocomplete="off"  value="<%=request.getAttribute("cacheid")%>"/>
<%if(WAPUtilities.isSecureTransaction(session)){%>
<input name="krfid"  type="hidden" autocomplete="off"  value="<%=WAPUtilities.getKRFId(request)%>"/>
<%}%>
<%if(uiState.getSessionLevelVariable("TOKEN_KEY") != null) {%>
<input name="TOKEN_KEY"  type="hidden" autocomplete="off"  value="<%=uiState.getSessionLevelVariable("TOKEN_KEY")%>"/>
<%}%>

    <input name="<%=WEBConstants.PREVIOUS_FORM_ID%>"  type="hidden" autocomplete="off"  value="<%=WAPUtilities.escapeHtml((String)uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID))%>"/>

<%
    Map<String, String> hiddenFields = (Map)uiState.getWebTransactionVariable("hiddenfields");
    if(hiddenFields != null)
    {
       for(Map.Entry<String, String> hiddenField : hiddenFields.entrySet())
       {

%>
<input name="<%=hiddenField.getKey()%>"  type="hidden" autocomplete="off"  value="<%=hiddenField.getValue()%>"/>
<%}
       }%>
         <label class ="popuptitle"><%=form.map.get("title")%> </label>
       <%
                    //parsing form headers
                    if(form.map.get(WEBConstants.FORM_HEADERS) != LuaNil.nil) {
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
              }
        %>
     <%
                     // parsing form chiildren Hboxes based on position. if position is header or segheader we need to add at them at top.
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
                                        if(childWidget.getTable(constants.CONTENT_ALIGNMENT)== null) {
                                            jspFile = "Phone.jsp";
                                            childWidget.map.put("wType", "Phone");
                                        }
                                }
                request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                if((Boolean)childWidget.getTable(constants.ISVISIBLE))
                {                                 
                                   
                    if(!(childWidget instanceof KonyContainer)&& !(childWidget instanceof KonySegmentUI) && !(childWidget instanceof KonyDummyTabWidget))
                    {
                        String WidgetAlignment = JSWAPUtil.getWidgetAlignmentStyle(childWidget);

        %>

        <table columns="1" style="width: 100%; border: none;">
            <tr style="width: 100%; border: none;" <%=WidgetAlignment%>>
                <%
                                String childWidgetMargin = "0%";
                               if (!("Phone.jsp".equals(jspFile)) && !("Label".equals(childWidget.getTable("wType"))) && !("RichText".equals(childWidget.getTable("wType")))
                                     && !("Link".equals(childWidget.getTable("wType"))) && !("Map".equals(childWidget.getTable("wType"))) && childWidget.getTable(KonyServerWidget.MARGIN) != null)
                                {
                                        childWidgetMargin = JSWAPUtil.getWidgetMargin(childWidget);
                                }

                            %>
                <td style="width: 100%; padding:<%=childWidgetMargin %>; border: none;" <%=WidgetAlignment%>>
                    <%
                    }
        %> <jsp:include page="<%=jspFile%>" /> <%
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

        // parsing form chiildren Hboxes based on position. if position is footer or segfooter we need to add at them at top.
           for (String s : childWidgets)
               {
               childWidget = (KonyServerWidget) form.getTable(s);
               if(childWidget instanceof KonyContainer &&("footer".equals(childWidget.getTable("position")) ||
                       ("segfooter".equals(childWidget.getTable("position"))))){
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
 

<%if(uiState.getWebTransactionVariable(WEBConstants.TRANS_WEB_ALERT) != null) {
           WebAlert webAlert = (WebAlert) uiState.getWebTransactionVariable(WEBConstants.TRANS_WEB_ALERT);
%>
<script type="text/javascript">
    function processAlert(){
        parsealert('<konyalert type="<%=webAlert.alertType%>"msg="<%=WAPUtilities.replaceescapesequence(webAlert.alertMsg)%>"title="KonyAlert Msg"/>');
    }
    window.onload = processAlert;
</script>
<% }%>

</form>
 <style>
 #JavaScriptDisabledErrorMsg { display:none; }
 </style>
 <noscript>
 <style type='text/css'>
 form {display: none !important}
 html {display : block}
 #JavaScriptDisabledErrorMsg {display:block;}
 </style>
 </noscript>
 <div id="JavaScriptDisabledErrorMsg"> To use this site, first enable your browser's JavaScript support and then refresh this page. </div></body>
</html>