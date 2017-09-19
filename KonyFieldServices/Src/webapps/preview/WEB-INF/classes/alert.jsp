<?xml version="1.0"?>
<!DOCTYPE wml PUBLIC "-//WAPFORUM//DTD WML 1.1//EN" "http://www.wapforum.org/DTD/wml_1.1.xml">
<%@ page language="java" contentType="text/vnd.wap.wml" %>
<%@ page import="com.kony.web.WEBConstants, com.kony.web.WebAlert"%>
<wml>
<head>
<meta http-equiv="Cache-Control" content="no-cache" forua= "true"/>
<meta http-equiv="Cache-Control" content="max-age=0" forua="true"/> 
</head> 
<%
com.kony.web.WebUIState uiState = (com.kony.web.WebUIState) request.getSession().getAttribute("uiState");
com.kony.web.util.WAPUtilities wapUtil = new com.kony.web.util.WAPUtilities();
String apppath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/" + getServletContext().getAttribute("servletname") ;
String imgpath = "";
WebAlert webAlert = (WebAlert) uiState.getWebTransactionVariable(WEBConstants.TRANS_WEB_ALERT);

 %>
<card id="alert" title="<%=webAlert.alertType%>">
<p mode="nowrap"> 
<do type="options" name="alert_default" label="Ok">
<go href="<%=response.encodeURL(apppath)%>" method="post">
 <postfield name="formid" value="<%=webAlert.parentForm%>"/>
</go>
</do>
    <%=webAlert.alertMsg%> <br/>
</p>
</card>
</wml>
