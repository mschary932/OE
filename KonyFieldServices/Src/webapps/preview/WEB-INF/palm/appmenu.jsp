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
<div class="ktable" columns="<%=appMenuSize%>" style="width: 100%;">
	<div class="krow">
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
		<div class="kcell <%=skinId%>" style="width:<%=wid%>;" valign="middle"
			align="center">
			<a id="<%=appMenuid %>" konywidgettype="Kappmenu" event="yes"
				index="<%=count %>" href="#" style="text-decoration: none;"> <%
		                if(!"".equals(appMenuIcon)){
                    		String appMenuIconId= appMenuIcon;		
			                if (appMenuIconId != null && !appMenuIconId.startsWith("http"))
			                {
			                    appMenuIconId = imgpath + appMenuIconId;
			                }
		             %>
				<div>
					<img konywidgettype="Kappmenu" style="border: none;"
						src="<%=appMenuIconId %>" width="20px" height="20px"
						align="middle" />
				</div> <%} %>
				<div>
					<label konywidgettype="Kappmenu"
						<%if(skinId!=null&&skinId.trim().length()!=0){%>
						class="<%=skinId%>" <%}%> style="background: inherit;"><%=appMenuLabel%></label>
				</div>
			</a>
		</div>
		<%}%>
		<%
    if(moreExists)
    { %>
		<div class="kcell <%=skinId%>" style="<%=wid%>;" valign="middle"
			align="center">
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
        %>
			<a konywidgettype="Kappmenu" event="yes" index="4" appmenumore="true"
				href="#" style="text-decoration: none;">
				<div>
					<img konywidgettype="Kappmenu" style="border: none;"
						src="<%=appMenuIconId %>" width="20px" height="20px"
						align="middle" />
				</div>
				<div>
					<label <%if(skinId!=null&&skinId.trim().length()!=0)%>
						class="<%=skinId%>" style="background: inherit;">More</label>
				</div>
			</a>
		</div>
		<%}%>
	</div>
</div>
<%}%>