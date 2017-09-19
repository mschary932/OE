<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.vm.LuaTable"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="com.kony.web.util.JSWAPUtil"%>
<%@ page import="com.kony.web.WEBConstants,com.kony.web.KonyAppConfig,com.konylabs.api.util.WEBUtil" %>
<head>
    
    <%
          String upath = (String) request.getAttribute("upath");
          String version=""; 
          String favIcon=""; 
          String appId=""; 
          String appleIcon =""; 
          String appmenumoreimg="";
          String appTitle ="";
          String noScriptMessage="";  
          Boolean hasMap= false; 
          Boolean phoneDetector=false;
          LuaTable appProperties = (LuaTable)uiState.get(constants.APP_CONFIG);
          Boolean isPreview = false;
          if(request.getAttribute("ispreview") != null)
            isPreview = (Boolean) request.getAttribute("ispreview");
          if(!isPreview) {
              if(appProperties != null)
              {
                  version = (String) appProperties.map.get(constants.APP_VERSION);
                  favIcon = (String) appProperties.map.get(constants.FAV_ICON);
                  appId = (String) appProperties.map.get(constants.APP_ID);
                  noScriptMessage = (String) appProperties.map.get(constants.NO_SCRIPT_MESSAGE);
                  phoneDetector = JSWAPUtil.getBooleanValue(appProperties.map.get(constants.PHONE_DETECTOR));
                  appleIcon = (String) appProperties.map.get(constants.APPLE_ICON);
                  adherePercentageStrictly = JSWAPUtil.getBooleanValue(appProperties.map.get(constants.ADHERE_PERCENTAGE_STRICTLY));
                  if(appProperties.map.get(constants.APP_TITLE) != null)
                    appTitle = (String) appProperties.map.get(constants.APP_TITLE);
                  else
                    appTitle = (String) appProperties.map.get(constants.APP_ID);
                  
                  hasMap = JSWAPUtil.getBooleanValue(appProperties.map.get("requiresgpsfuctionality"));
                  phoneDetector = JSWAPUtil.getBooleanValue(appProperties.map.get("tcphoneformatindicator"));
                  appmenumoreimg = (String) appProperties.map.get(deviceCategory+"_appmenumoreimage");
                  if(appmenumoreimg!= null)
                      request.setAttribute("appmenumoreimg", appmenumoreimg);
               }
           }
          session.setAttribute(constants.ADHERE_PERCENTAGE_STRICTLY, adherePercentageStrictly);
          if (uiState.getWebTransactionVariable(WEBConstants.NEW_PAGE) != null){
    %>

    <% if(deviceCategory.equalsIgnoreCase("android")) {%>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>       
    <%}else if(deviceCategory.equalsIgnoreCase("palm")) {%>
        <meta name="viewport" content="width=320, initial-scale=1.0, user-scalable=no"/>
    <%}else {%>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <%}%>
    <%if(deviceCategory.equalsIgnoreCase("iphone")){%>
        <meta name="apple-touch-fullscreen" content="YES" />
    <%}%>     
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <%if(!deviceCategory.equalsIgnoreCase("android") && !deviceCategory.equalsIgnoreCase("nth") && !deviceCategory.equalsIgnoreCase("bb")){ %>
        <style id="theme" type="text/css" media="screen">@import "<%= String.format("%s/%s%s/kony%s%s.css?ver=%s", gpath, deviceCategory, WEBUtil.getTheme(), deviceCategory, imageCat,version) %>";</style>
    <%}%>
    <%if(deviceCategory.equalsIgnoreCase("iphone")){ %>
        <style type="text/css" media="only screen and (-webkit-min-device-pixel-ratio: 2)">@import "<%=gpath%>/iphone<%=WEBUtil.getTheme()%>/konyiphoneretina.css?ver=<%=version%>";</style>
    <%}%>
    <%if(deviceCategory.equalsIgnoreCase("nth")){
        String nthcat = (String) session.getAttribute("devicecat");
        String userAgent = request.getHeader("user-agent");
        if(userAgent.indexOf("MSIE 10.0") != -1)
        {
        %>
        	<style id="theme" type="text/css" media="screen">@import "<%= String.format("%s/%s%s/kony%s%s10%s.css?ver=%s", gpath, deviceCategory, WEBUtil.getTheme(), deviceCategory, nthcat,imageCat,version) %>";</style>
        <%
        }
        else if(!nthcat.equals("bb")) {
    %>
         <style id="theme" type="text/css" media="screen">@import "<%= String.format("%s/%s%s/kony%s%s%s.css?ver=%s", gpath, deviceCategory, WEBUtil.getTheme(), deviceCategory, nthcat,imageCat,version) %>";</style>
    <%}}%>

    <%if(!phoneDetector) { %>
        <meta name="format-detection" content="telephone=no">
    <%}%>
    <%if(favIcon != null && !favIcon.equals("")) { %>
        <link rel="shortcut icon" href="<%=gpath%>/<%=favIcon%>"/>
    <%}%>
    
    <%if(deviceCategory.equalsIgnoreCase("iphone") &&appleIcon != null && !appleIcon.equals("")) { %>        
        <link rel="apple-touch-icon-precomposed" href="<%=gpath%>/<%=appleIcon%>"/>
    <%}%>

    <script type="text/javascript">
        if (document.getElementById && document.createElement) {
            document.write("<style>html {display: none;}</style><script>if( self == top ){document.documentElement.style.display = 'block';} else {top.location = self.location;}</sc"+"ript>");
        }
        else {
            if (top != self) {
                top.location = self.location;
            }
        }
       isStartUp = true;
    </script>
    <%
    if(deviceCategory.equalsIgnoreCase("android"))
    { 
    %>
        <script type="text/javascript" >
        var dpi = 1;
        var category = 320;
        var dpiratio = window.devicePixelRatio;
        var supporttargetdpi = false;
        if(dpiratio < 1) {
             dpi = supporttargetdpi ? 0.75: 1;
             category = supporttargetdpi ? 240 : 320;
        } else if (dpiratio <= 1) {
             dpi = 1;
             category = 320;
        } else if(dpiratio <= 1.5){
             dpi = 1.5;
             category = supporttargetdpi ? 480 : 360;
        } else if(dpiratio <= 2) {
          dpi = 2;
          category = supporttargetdpi ? 640 : 400;
        } else if(dpiratio>2){
          dpi = 2.25;
          category = supporttargetdpi ? 720 : 440;
        }
        function evalCategory()
        {
           return category;
        }
        var link = document.createElement("link");
        link.setAttribute("id", "theme");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", "<%=String.format("%s/android%s/konyandroid", gpath, WEBUtil.getTheme())%>"+category+".css");        
        document.getElementsByTagName("head")[0].appendChild(link);
        document.cookie = "konydpi="+dpi+"; Version=1; path=/";
      //  kony.system.cookie.createCookie("konydpi", dpi);      
        </script>
<%}
        String nthcat = (String) session.getAttribute("devicecat");
      if(nthcat == null) 
         nthcat = "";
      if(deviceCategory.equalsIgnoreCase("bb") || deviceCategory.equalsIgnoreCase("nth"))
    { 
    %>
        <script type="text/javascript" >
        var orientation = window.orientation;
    var category = window.innerWidth;
    var dpi = 1;
    if(orientation) {
    category = Math.min(window.innerWidth, window.innerHeight);
    }
    if(orientation && parseInt(category, 10) > 250) {
    category = 360;
    dpi = 1.5;
    } else if( orientation || parseInt(category, 10) < 340) {
    category = 320;
    dpi = 1;
    } else {
    category = 360;
    dpi = 1.5;
    }
    if(window.devicePixelRatio > 2) {
        dpi = 2.25;
         category = 440;
     }     
    function evalCategory()
    {
       return category;
    }
    var link = document.createElement("link");
    link.setAttribute("id", "theme");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "<%= String.format("%s/%s%s/kony%s%s", gpath, deviceCategory, WEBUtil.getTheme(), deviceCategory, nthcat) %>"+category+".css");
    document.getElementsByTagName("head")[0].appendChild(link);
    document.cookie = "konydpi="+dpi+"; Version=1; path=/";
    //kony.system.cookie.createCookie("konydpi", dpi);   
        </script>

     <%}%> 
    <script type="text/javascript" src="<%=String.format("%s/%s/konyframeworkmin.js?ver=%s",gpath, deviceCategory,version)%>"></script>
    <script type="text/javascript" src="<%=String.format("%s/%s/konyothermin.js?ver=%s",gpath, deviceCategory,version)%>"></script>
  
    <%
    if(appProperties != null) {
        String jsfilelist = (String) appProperties.map.get(constants.IMPORTED_JS_FILES);
        if(jsfilelist != null){
            String jsfiles[] = jsfilelist.split(",");
            for(String jsfile:jsfiles){
    %>
    <script type="text/javascript" src="<%=jsfile.startsWith("http") ? jsfile : String.format("%s/%s/%s",gpath,deviceCategory,jsfile) %>"></script>
     <%
            }
        }
     }
    %>
    <style type="text/css" media="screen">@import "<%=gpath%>/tparty/cal/container.css";</style>
    <style type="text/css" media="screen">@import "<%=gpath%>/tparty/cal/calendar.css";</style>
    <%
	 String appmode = session.getAttribute(WEBConstants.APPMODE).toString();
	 if("2.0".equals(appmode) ){
    %>
	    <script type="text/javascript" src="<%=gpath%>/<%=deviceCategory%>/tchybrid.js?ver=<%=version%>"></script>
	    <script type="text/javascript" src="<%=gpath%>/<%=deviceCategory%>/nativeplatform.js?ver=<%=version%>"></script>
    <%
        }%>
    <title><%=appTitle%></title>
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