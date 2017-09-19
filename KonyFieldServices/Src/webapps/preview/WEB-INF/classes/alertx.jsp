<?xml version="1.0"?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%
com.kony.web.WebUIState uiState = (com.kony.web.WebUIState) request.getSession().getAttribute("uiState");
String apppath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/" + getServletContext().getAttribute("servletname") ;
String imgpath = "";
 %>
<head>
 <title><%=request.getParameter("alertType")%></title>
 <style type="text/css">@import "xhtml.css";</style>
</head>
<body id="ia" class="<%=request.getParameter("skin")%>">
    <form id="fia" action="<%=apppath%>" method="post">
    <%=request.getParameter("text")%> <br/>
    <input type="hidden" name="formId" value="<%=request.getParameter("formId")%>"/>
    <input type="submit" name="alert_default" value="Ok" title="Ok"/>
</form>
</body>
</html>
