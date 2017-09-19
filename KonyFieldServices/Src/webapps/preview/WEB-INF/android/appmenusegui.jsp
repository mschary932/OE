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
   String deviceCategory = (String)session.getAttribute(com.kony.web.WEBConstants.PREFERRED_ML);
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
  

  String imgpath = gpath + "/"+deviceCategory+"/images/";
    String imageCat = (String)session.getAttribute(com.kony.web.WEBConstants.IMAGE_CAT);
    if(imageCat != null && !"0".equals(imageCat) && !"iphone".equals(deviceCategory)){
        imgpath = imgpath + imageCat +"/";
    }
    else
     {
        imageCat="";
    }

      
  String conditions = wapUtil.checkForSpecialConditions(uiState);
    if (conditions != null && conditions.trim().length() != 0)
    {

        out.println(conditions);
        return;
    }
 %>
 
<body>
<form id="appmenusegui" action="<%=apppath%>/appmenusegui" method="post" selected="true" > 
<input name="formid" autocomplete="off" type="hidden" value="appmenusegui"/>
<input name="cat" autocomplete="off" type="hidden" value="<%=deviceCategory%>"/>
<input name="cacheid" autocomplete="off" type="hidden" value="<%=request.getAttribute(WEBConstants.CACHE_ID)%>" />
<%if(uiState.getSessionLevelVariable("TOKEN_KEY") != null) {%>
<input name="TOKEN_KEY" type="hidden" value="<%=uiState.getSessionLevelVariable("TOKEN_KEY")%>"/>
<%}%>
<%if(uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID) != null) { %>
    <input name="<%=WEBConstants.PREVIOUS_FORM_ID%>" type="hidden" value="<%=uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)%>"/>
<%}%>
<%if(WAPUtilities.isSecureTransaction(session)){%>
<input name="krfid"  type="hidden" autocomplete="off"  value="<%=WAPUtilities.getKRFId(request)%>"/>
<%}%>

<%
     java.util.ArrayList <com.konylabs.api.ui.structures.AppMenuStructure> appMenuList = uiState.getAppMenuItems();
     int appMenuSize=appMenuList.size();
     String appskinId= appMenuList.get(0).skin;
     %>
     <%

 for(int i=0;i<appMenuSize;i++)
 {
     com.konylabs.api.ui.structures.AppMenuStructure appMenuStructure = appMenuList.get(i);
     String appMenuid=appMenuStructure.id;
     String focusSkin=appMenuStructure.focusSkin;
     String skinId=appMenuStructure.skin;
     String appMenuLabel=appMenuStructure.title;
     String appMenuIcon=appMenuStructure.icon;
    %>
          
<div class = "<%=appskinId%>"    >
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
                <a konywidgettype="Kappmenu"  href="#" style = "text-decoration: none;" index="<%=i%>" event="yes" 
                       <%if(skinId!=null&&skinId.trim().length()!=0)%>
                            class = "<%=skinId%>"                  >
                    <img konywidgettype="Kappmenu" style="border:none;" src = "<%=appMenuIconId %>"  width="20px" height="20px" align="middle"/>
                </a> 
                <label  <%if(skinId!=null&&skinId.trim().length()!=0)%>
                      class = "<%=skinId%>"  style="font-size:xx-small;background:inherit;">
                    <%=appMenuLabel%>
                </label>
            </td>
        </tr>
      </table>
</div>
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




