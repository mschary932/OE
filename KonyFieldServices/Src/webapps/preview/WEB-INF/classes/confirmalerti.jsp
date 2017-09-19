<%-- 
    Document   : alertconf
    Created on : Jan 15, 2009, 12:29:13 PM
    Author     : rajan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="com.kony.web.WEBConstants, com.kony.web.WebUIState, com.kony.web.WebAlert, com.kony.web.util.WAPUtilities" %>
<%
WebUIState uiState = (WebUIState) request.getSession().getAttribute("uiState");
WAPUtilities wapUtil = new WAPUtilities();
String upath =request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
String apppath = upath + "/" + application.getAttribute("servletname") ;
String imgpath = upath + "/iphone/images/";
WebAlert webAlert = (WebAlert) uiState.getWebTransactionVariable(WEBConstants.TRANS_WEB_ALERT);
%>
<form id="alertconf" class="dialog" action="<%=response.encodeURL(apppath)%>" selected="true">
    <input name="formid" type="hidden" value="<%=webAlert.parentForm%>"/>
     <input name="cacheid" type="hidden" value="<%=request.getAttribute("cacheid")%>"/>
    <input name="node" type="hidden" value="<%=request.getAttribute("node.no")%>"/>
    <%if(WAPUtilities.isSecureTransaction(session)){%>
     <input name="krfid" type="hidden" value="<%=WAPUtilities.getKRFId(request)%>"/>
    <%}%>
    <fieldset>
        <h1>Confirmation Alert</h1>
        <label><%=webAlert.alertMsg%></label>
          <input class="button leftButton" type="submit" name="alert_confirm_yes" value="Yes" title="Yes"/>
    <input class="button blueButton" type="submit" name="alert_confirm_no" value="No" title="No"/>
    </fieldset>
</form>

