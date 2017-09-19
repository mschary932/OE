<?xml version="1.0"?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page import="com.kony.web.WEBConstants, com.kony.web.WebAlert, com.kony.web.util.WAPUtilities"%>
<%
com.kony.web.WebUIState uiState = (com.kony.web.WebUIState) request.getSession().getAttribute("uiState");
String apppath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/" + application.getAttribute("servletname") ;
String imgpath = "";
WebAlert webAlert = (WebAlert) uiState.getWebTransactionVariable(WEBConstants.TRANS_WEB_ALERT);

 %>
<head>
<title><%=webAlert.alertType%></title>
<style type="text/css">@import "xhtml/konybasicxhtml<%=session.getAttribute(com.kony.web.WEBConstants.IMAGE_CAT)%>.css";
 body, a,label{font: small sans-serif;} a{text-decoration : none;}
</style>
</head>
<body id="ia" >
<form id="konyalert" action="<%=apppath%>" method="post" class="<%=webAlert.alertSkin%>">
    <%=webAlert.alertMsg%> <br/>
    <input type="hidden" name="formid" value="<%=webAlert.parentForm%>"/>
    <input name="cacheid" type="hidden" value="<%=request.getAttribute("cacheid")%>"/>
    <input name="node" type="hidden" value="<%=request.getAttribute("node.no")%>"/>
    <input name="cat" type="hidden" value="large"/>
    <%if(WAPUtilities.isSecureTransaction(session)){%>
        <input name="krfid" type="hidden" value="<%=WAPUtilities.getKRFId(request)%>"/>
    <%}%>
    <input type="submit" id="alert_confirm_yes" name="alert_confirm_yes" value="ok" title="ok"/>

</form>
</body>
</html>