<%@ page import="com.kony.web.WEBConstants, com.kony.web.WebUIState, com.kony.web.WebAlert" %>
<%
WebUIState uiState = (WebUIState) session.getAttribute("uiState");
if (uiState.getWebTransactionVariable(WEBConstants.EXTERNAL_URL) != null)
{
    String externalurl = (String) uiState.getWebTransactionVariable(WEBConstants.EXTERNAL_URL);%>
    konysecurecall("<%=externalurl%>");
<%
return;
}
if(uiState.getWebTransactionVariable(WEBConstants.SECURE_CALL) != null) 
{
    String konysecure = (String) uiState.getWebTransactionVariable(WEBConstants.SECURE_CALL);
%>
    konysecurecall("<%=konysecure%>");
    <% return; 
}
if(uiState.getWebTransactionVariable(WEBConstants.TRANS_WEB_ALERT) != null) 
{
   WebAlert webAlert = (WebAlert) uiState.getWebTransactionVariable(WEBConstants.TRANS_WEB_ALERT);
    if (webAlert.alertType.equals(WEBConstants.INFO_ALERT_TYPE) || webAlert.alertType.equals(WEBConstants.ERROR_ALERT_TYPE))
    { %>
         konyalert("<%=webAlert.alertMsg%>");
       <% return; 
    }
    else if (webAlert.alertType.equals(WEBConstants.CONFIRM_ALERT_TYPE))
    { %>
        konyconfirm("<%=webAlert.alertMsg%>", "<%=webAlert.parentForm%>", "<%=request.getAttribute("cacheid")%>", "<%=request.getAttribute("node.no")%>");
       <% return; 
    }
}
%>