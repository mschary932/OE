<%@include file="common.jsp"%>
<%
     java.util.ArrayList <com.konylabs.api.ui.structures.AppMenuStructure> appMenuList = uiState.getAppMenuItems();
     int appMenuSize=appMenuList.size();
if(appMenuSize>0)
{
      boolean moreExists=false;
     if(appMenuList.size()>5)
         {
         appMenuSize=5;
         moreExists=true;
         }
int width1=100/appMenuSize;
String wid=width1+"%";
String appskinId= appMenuList.get(0).skin;
     %>
<div class="<%=appskinId%>">
	<table columns="<%=appMenuSize%>" style="width: 100%;">
		<tr>
			<%
   /* String appMenuid="";
     String focusSkin="";*/
     String skinId="";
   /*  String appMenuLabel="";
     String appMenuIcon=""; */
     if(moreExists)
        appMenuSize=4;
     for(int i=0;i<appMenuSize;i++)
     {
     com.konylabs.api.ui.structures.AppMenuStructure appMenuStructure = appMenuList.get(i);
     String appMenuid=appMenuStructure.id;
     String focusSkin=appMenuStructure.focusSkin;
     skinId=appMenuStructure.skin;
     String appMenuLabel=appMenuStructure.title;
     String appMenuIcon=appMenuStructure.icon;
     int count=appMenuStructure.count;
    %>
			<td style="width:<%=wid%>;" valign="middle" align="center"><a
				id="<%=appMenuid %>" konywidgettype="Kappmenu"
				<%if(skinId!=null&&skinId.trim().length()!=0)%> class="<%=skinId%>"
				<%if(WAPUtilities.isSecureTransaction(session)){%>
				href="<%=response.encodeURL(apppath+"?&formid=" + frmId + "&krfid="+WAPUtilities.getKRFId(request)+"&previousform=" + uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)+ "&" +appMenuid +"."+count+".event_.Kappmenu=x")%>"
				style="text-decoration: none;"> <%}
            else{%> href="<%=response.encodeURL(apppath+"?&formid=" + frmId + "&previousform=" + uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)+ "&" +appMenuid +"."+count+".event_.Kappmenu=x")%>"
					style = "text-decoration: none;"> <%}%>
					<table>
						<tr>
							<td style="text-align: center">
								<%
		                if(!"".equals(appMenuIcon)){
                    		String appMenuIconId= appMenuIcon;		
			                if (appMenuIconId != null && !appMenuIconId.startsWith("http"))
			                {
			                    appMenuIconId = imgpath + appMenuIconId;
			                }
		             %> <img konywidgettype="Kappmenu" style="border: none;"
								src="<%=appMenuIconId %>" width="20px" height="20px"
								align="middle" /> <%} %>
							</td>
						</tr>
						<tr>
							<td style="text-align: center"><label
								<%if(skinId!=null&&skinId.trim().length()!=0)%>
								class="<%=skinId%>"
								style="font-size: xx-small; background: inherit;"
								konywidgettype="Kappmenu"><%=appMenuLabel%></label></td>
						</tr>
					</table>
			</a> <%}%> <%
   if(moreExists)
    { %>
			<td style="<%=wid%>;" valign="middle" align="center">
				<%
    String appMenuIconId="appMenuid"+"img";
    appMenuIconId = "appmore.png";
             //added appmenumore image updated if it is defined in application proprotes
        if(request.getAttribute("appmenumoreimg")!=null)
            appMenuIconId =(String) request.getAttribute("appmenumoreimg");

    if (appMenuIconId != null && !appMenuIconId.startsWith("http"))
    {
        appMenuIconId = imgpath + appMenuIconId;
    }
 %> <a konywidgettype="Kappmenu"
				<%if(skinId!=null&&skinId.trim().length()!=0)%> class="<%=skinId%>"
				<%if(WAPUtilities.isSecureTransaction(session)){ %>
				href="<%=response.encodeURL(apppath+"?appmenumore=true&formid=" + frmId +"&krfid="+WAPUtilities.getKRFId(request) +"&previousform=" + uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)+ "&" +appMenuList.get(4).id +"."+4+".event_.Kappmenu=x")%>"
				style="text-decoration: none;"> <% }
        else{ %> href="<%=response.encodeURL(apppath+"?appmenumore=true&formid=" + frmId +"&previousform=" + uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)+ "&" +appMenuList.get(4).id +"."+4+".event_.Kappmenu=x")%>"
					style = "text-decoration: none;"> <% } %>
					<table>
						<tr>
							<td style="text-align: center"><img
								konywidgettype="Kappmenu" style="border: none;"
								src="<%=appMenuIconId %>" width="20px" height="20px"
								align="middle" /></td>
						</tr>
						<tr>
							<td style="text-align: center"><label
								<%if(skinId!=null&&skinId.trim().length()!=0)%>
								class="<%=skinId%>"
								style="font-size: xx-small; background: inherit;">More</label></td>
						</tr>
					</table>
			</a> <%   }
       %>
			
		</tr>
	</table>
</div>

<%}%>



