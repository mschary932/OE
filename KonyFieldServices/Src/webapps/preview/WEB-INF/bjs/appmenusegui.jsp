<%@ page pageEncoding="UTF-8" %>
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page import="com.kony.web.WEBConstants, com.kony.web.WebUIState, com.kony.web.WebAlert, com.kony.web.util.WAPUtilities, com.kony.web.KonyAppConfig, com.konylabs.api.util.WEBUtil" %>
<%
   KonyAppConfig konyAppConfig = (KonyAppConfig) application.getAttribute(WEBConstants.KONY_APP_CONFIG);
   WebUIState uiState = (WebUIState) session.getAttribute("uiState");
   WAPUtilities wapUtil = new com.kony.web.util.WAPUtilities();
   int nonSecurePort = Integer.parseInt(konyAppConfig.getHttpPort());
   String gpath = "http://" + request.getServerName() + ":" + nonSecurePort + request.getContextPath();
   String upath = "";
    
   String fmid = "appmenusegui";
   String deviceCategory = "bjs";
       upath =  gpath;
  


if (request.getScheme().equalsIgnoreCase("https")) {
                int secureport = Integer.parseInt(konyAppConfig.getHttpsPort());
                if (secureport == 443) {
                    upath = "https://" + request.getServerName() + request.getContextPath();
                } else {
                    upath = "https://" + request.getServerName() + ":" + secureport + request.getContextPath();
                }

            } else {
                int nonSecureport = Integer.parseInt(konyAppConfig.getHttpPort());
                if (nonSecureport == 80) {
                    upath = "http://" + request.getServerName() + request.getContextPath();
                } else {
                    upath = "http://" + request.getServerName() + ":" + nonSecureport + request.getContextPath();
                }
            }
 gpath = upath;

  String apppath = upath + "/" + application.getAttribute("servletname") ;
  

  String imgpath = gpath + "/bjs/images/";
    String imageCat = (String)session.getAttribute(com.kony.web.WEBConstants.IMAGE_CAT);
    if(imageCat != null && !"0".equals(imageCat)){
        imgpath = imgpath + imageCat +"/";
    }
    else
     {
imageCat="";
}

 %>
<head>
<!--[if IE]> <meta name="viewport" content="width=device-width,user-scalable=no"/><![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<%
    String preua = request.getHeader("user-agent");
    if (preua.indexOf("BlackBerry95") != -1)
    {%>
        <meta name="viewport" content="width=480,height=480"/>
    <%}
%>

	<% if(uiState.get("$form.id.title") != null) {%>
	<title><%=uiState.get("$form.id.title")%></title>
 	<% } %>
 


<link href="<%=gpath + "/bjs"+  WEBUtil.getTheme() + "/konybasicxhtml" + imageCat +".css"%>" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="<%=gpath + "/bjs/konybasicframework.js"%>"></script>
<script type="text/javascript" src="<%=gpath + "/bjs/konybasiccalendar.js"%>"></script>
<script type="text/javascript" src="<%=gpath + "/bjs/motionpack.js"%>"></script>
</head>
<body>
<form id="appmenusegui" action="<%=apppath%>/appmenusegui" method="post">
<input name="formid" type="hidden" value="appmenusegui"/>
<input name="cat" type="hidden" value="bjs"/>
<input name="cacheid" type="hidden" value="<%=request.getAttribute(WEBConstants.CACHE_ID)%>" />
<%if(uiState.getSessionLevelVariable("TOKEN_KEY") != null) {%>
<input name="TOKEN_KEY" type="hidden" value="<%=uiState.getSessionLevelVariable("TOKEN_KEY")%>"/>
<%}%>
<%if(uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID) != null) { %>
    <input name="<%=WEBConstants.PREVIOUS_FORM_ID%>" type="hidden" value="<%=uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)%>"/>
<%}%>

<%
     java.util.ArrayList <com.konylabs.api.ui.structures.AppMenuStructure> appMenuList = uiState.getAppMenuItems();
     int appMenuSize=appMenuList.size();
     String appskinId= appMenuList.get(0).skin;
     %>
     <%
   /* String appMenuid="";
     String focusSkin="";
     String skinId="";
     String appMenuLabel="";
     String appMenuIcon=""; */
     for(int i=0;i<appMenuSize;i++)
     {
     com.konylabs.api.ui.structures.AppMenuStructure appMenuStructure = appMenuList.get(i);
     String appMenuid=appMenuStructure.id;
     String focusSkin=appMenuStructure.focusSkin;
     String skinId=appMenuStructure.skin;
     String appMenuLabel=appMenuStructure.title;
     String appMenuIcon=appMenuStructure.icon;
    %>
          <div
class = "<%=appskinId%>"
    >
      <table columns = "<%=appMenuSize%>" style = "width:100%;">
      <tr>
     <td style = "width:100%;">
      <%
    String appMenuIconId=appMenuid+"img";
    appMenuIconId = appMenuIcon;

    if (appMenuIconId != null && !appMenuIconId.startsWith("http"))
    {
        appMenuIconId = imgpath + appMenuIconId;
    }
 %>
           
                    <a
                    konywidgettype="Kappmenu"
                   <%if(skinId!=null&&skinId.trim().length()!=0)%>
                        class = "<%=skinId%>"
                   href="<%=response.encodeURL(apppath+"?formid=" + fmid + "&" +appMenuid +"."+i+".event_.Kappmenu=x")%>" style = "text-decoration: none;">
                <img
konywidgettype="Kappmenu"
style="border:none;" src = "<%=appMenuIconId %>"  width="20px" height="20px" align="middle"/>
        </a>
        <label  <%if(skinId!=null&&skinId.trim().length()!=0)%>
                        class = "<%=skinId%>"  style="font-size:xx-small;background:inherit;"><%=appMenuLabel%></label>
        </td> </tr></table></div>
   <%}%>
<%if(uiState.getWebTransactionVariable(WEBConstants.TRANS_WEB_ALERT) != null) {
           WebAlert webAlert = (WebAlert) uiState.getWebTransactionVariable(WEBConstants.TRANS_WEB_ALERT);
%>
<script type="text/javascript">
	function processAlert(){
    	parsealert('<konyalert type="<%=webAlert.alertType%>"msg="<%=wapUtil.replaceescapesequence(webAlert.alertMsg)%>"title="KonyAlert Msg"/>');
    }
    window.onload = processAlert;
</script>
<% }%>

</form>
</body>
</html>




