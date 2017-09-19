<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.vm.LuaTable"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="com.konylabs.api.util.WEBUtil"%>
<%@page import="com.konylabs.api.ThemeLib"%>

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<!--[if IE]> <meta name="viewport" content="width=device-width,user-scalable=no"/><![endif]-->
<meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, post-check=0, pre-check=0" />
<!--[if IE]> <meta name="viewport" content="width=device-width,user-scalable=no"/><![endif]-->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" /> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<%
    String version=""; String favIcon=""; String appId="";String appTitle=""; String noScriptMessage=""; String phoneDetector="false";
    String appmenumoreimg="";
    Boolean isPreview = false;
    LuaTable appProperties = (LuaTable)uiState.get(constants.APP_CONFIG);
    if(request.getAttribute("ispreview") != null)
       isPreview = (Boolean) request.getAttribute("ispreview");
    if(!isPreview) {
        if(appProperties != null) {
            version = (String) appProperties.map.get(constants.APP_VERSION);
            favIcon = (String) appProperties.map.get(constants.FAV_ICON);
            appTitle = (String) appProperties.map.get(constants.APP_TITLE);
            appId = (String) appProperties.map.get(constants.APP_ID);
            noScriptMessage = (String) appProperties.map.get(constants.NO_SCRIPT_MESSAGE);
            adherePercentageStrictly = JSWAPUtil.getBooleanValue(appProperties.map.get(constants.ADHERE_PERCENTAGE_STRICTLY));
            phoneDetector = (String) appProperties.map.get(constants.PHONE_DETECTOR);
            appmenumoreimg = (String)appProperties.map.get("basic_appmenumoreimage");
            if(appmenumoreimg!= null)
                  request.setAttribute("appmenumoreimg", appmenumoreimg);            
         }
    }
    session.setAttribute(constants.ADHERE_PERCENTAGE_STRICTLY, adherePercentageStrictly);
    String preua = request.getHeader("user-agent");
    if (preua.indexOf("BlackBerry95") != -1)
    {%>
        <meta name="viewport" content="width=480,height=480"/>
    <%}
%>
	<% 
	Object theme = WEBUtil.getTheme().toString().replace("/", "");
	String themeurlvalue = "";
	if(session.getAttribute(ThemeLib.URL_THEMES_LIST) != null)
	{
 	LuaTable themesurl = (LuaTable)session.getAttribute(ThemeLib.URL_THEMES_LIST);
 	
 	if(themesurl.list.contains(theme))
 	{
 		LuaTable themeurlmap = (LuaTable)session.getAttribute(ThemeLib.THEME_URL);
 		themeurlvalue = themeurlmap.getTable(theme).toString();
 	}   
	} 
        if(form!= null)
        {
            if(form.map.get("title") != null && form.map.get("title") != LuaNil.nil) {%>
            <title><%=form.map.get("title")%></title>	
            <% } else if(appTitle != null) {%>
            <title><%=appTitle%></title>
            <% } else { %>
            <title><%=appId%></title>
	        <% }
        }%>
  

  <% 
  if (themeurlvalue.length()>0)
	 {%>
	 	<link href="<%=themeurlvalue%>" rel="stylesheet" type="text/css" />
	 <%}
else
{  %>
	<link href="<%=gpath + "/xhtml"+ WEBUtil.getTheme() + "/konybasicxhtml"+ imageCat +".css?ver=1.0.0"%>" rel="stylesheet" type="text/css" />
<%}%>
    <%if(favIcon != null && !favIcon.equals("")) { %>
        <link rel="shortcut icon" href="<%=gpath +"/"+ favIcon%>"/>
    <%}%>

    <%if(phoneDetector != null && phoneDetector.equals("false")) { %>
        <meta http-equiv="x-rim-auto-match" content="none">
    <%}    
    Map<String, String> metaTags = (Map<String, String>)session.getAttribute(KonyServerWidget.META_TAGS);
    if(metaTags != null)
    {
    	for(Map.Entry<String, String> entry: metaTags.entrySet())
    	{
    		out.println(entry.getValue());
    	}
    }
    %>

</head> 