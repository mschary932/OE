<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.vm.LuaTable"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="com.konylabs.api.util.WEBUtil"%>
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

    <%if(((Boolean)form.map.get(constants.NO_CACHE)) == true){%>
        <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, post-check=0, pre-check=0" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
    <% }%>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <%
        String version=""; String favIcon=""; String appId=""; String appTitle="";String noScriptMessage=""; String phoneDetector="false";
        String appmenumoreimg="";
        Boolean isPreview = false;
        LuaTable appProperties = (LuaTable)uiState.get(constants.APP_CONFIG);
        if(request.getAttribute("ispreview") != null)
           isPreview = (Boolean) request.getAttribute("ispreview");
        if(!isPreview) {
            if(appProperties != null) {
                version = (String) appProperties.map.get(constants.APP_VERSION);
                favIcon = (String) appProperties.map.get(constants.FAV_ICON);
                appId = (String) appProperties.map.get(constants.APP_ID);
                appTitle = (String) appProperties.map.get(constants.APP_TITLE);
                noScriptMessage = (String) appProperties.map.get(constants.NO_SCRIPT_MESSAGE);
                adherePercentageStrictly = JSWAPUtil.getBooleanValue(appProperties.map.get(constants.ADHERE_PERCENTAGE_STRICTLY));
                phoneDetector = (String) appProperties.map.get(constants.PHONE_DETECTOR);
                appmenumoreimg = (String) appProperties.map.get("bjs_appmenumoreimage");
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

    <script type="text/javascript">
        if (document.getElementById && document.createElement) {
            document.write("<style>html {display: none;}</style><script>if( self == top ){document.documentElement.style.display = 'block';} else {top.location = self.location;}</sc"+"ript>");
        }
        else {
            if (top != self) {
                top.location = self.location;
            }
        }
    </script>
    <style type ="text/css">
            table{
                            border-collapse: collapse;
                            table-layout: fixed;
                    }
    </style>
    <% if(form.map.get("title") != null && form.map.get("title") != LuaNil.nil) {%>
	<title><%=form.map.get("title")%></title>
    <% } else if(appTitle != null) {%>
       <title><%=appTitle%></title>
    <% } else { %>
	<title><%=appId%></title>
    <% } %>

    <%if(favIcon != null && !favIcon.equals("")) { %>
            <link rel="shortcut icon" href="<%=gpath +"/"+ favIcon%>"/>
    <%}%>
    <%if(phoneDetector != null && phoneDetector.equals("false")) { %>
        <meta http-equiv="x-rim-auto-match" content="none">
    <%}%>

    <link href="<%=gpath + "/bjs"+ WEBUtil.getTheme() + "/konybasicxhtml"+ imageCat +".css?ver=1.0.0"%>" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="<%=gpath + "/bjs/konybasicframework.js?ver="+version%>"></script>
	<script type="text/javascript" src="<%=gpath + "/bjs/konybasiccalendar.js?ver="+version%>"></script>
    <%
    if(appProperties != null) {
        String jsfilelist = (String) appProperties.map.get(constants.IMPORTED_JS_FILES);
        if(jsfilelist != null){
            String jsfiles[] = jsfilelist.split(",");
            for(String jsfile:jsfiles){
    %>
    <script type="text/javascript" src="<%=jsfile.startsWith("http") ? jsfile : gpath+"/bjs/"+jsfile %>"></script>
     <%
            }
        }
     }
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