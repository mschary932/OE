<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Vector"%>
<%@page import="com.konylabs.api.ui.KonyTab"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>

<%@include file="common.jsp"%>

<%
	//SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
    String formid = frmId; //(String) uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);
    String widgetid = (String) request.getAttribute(WEBConstants.WIDGET_ID);
    KonyServerWidget parentInfo = (KonyServerWidget) ((LuaTable) uiState.get(formid)).getTable(widgetid);
    List<String> childWidgets = ((LuaTable) parentInfo.getTable(WEBConstants.CHILDREN)).list;
    KonyTab activetab = null;
    String view = (String) parentInfo.getTable(constants.VIEW_TYPE);
    Vector<com.konylabs.api.ui.KonyTab> tabs = (Vector<com.konylabs.api.ui.KonyTab>) parentInfo.getTable(KonyServerWidget.TABS);
    int tabctr = 0;
    request.setAttribute("tabpaneid", parentInfo.getTable("id"));

if (view.equals(WEBConstants.SELECTED_TAB))
{
     KonyServerWidget activetabwidget = null;
       //tab view is table view
    if (parentInfo.getTable(constants.ACTIVE_TAB) instanceof KonyTab) {
        activetab = (com.konylabs.api.ui.KonyTab) parentInfo.getTable(constants.ACTIVE_TAB);
    }
    else {
        //int activetabIndex =  JSWAPUtil.getIntValue(parentInfo.getTable(KonyServerWidget.ACTIVE_TAB));
        //activetab = tabs.get(activetabIndex - 1);
    }

    if(activetab == null )
    {
        Vector activetabs = null;
        if (parentInfo.getTable(constants.ACTIVE_TABS) != LuaNil.nil) {
             activetabs = ((LuaTable) parentInfo.getTable(constants.ACTIVE_TABS)).list;
        }
        if(activetabs != null && activetabs.size() > 0)
            activetab = tabs.get(JSWAPUtil.getIntValue(activetabs.elementAt(0))-((int)constants.INDEXJL));
        else
            activetab = tabs.get(0);
    }

%>
<div  style = "margin:<%=JSWAPUtil.getWidgetMargin(parentInfo)%> ">
    <div>
        <ul class="<%=parentInfo.getTable(constants.INACTIVE_SKIN)%>basictab" style="list-style:none; padding:<%=JSWAPUtil.getWidgetPadding(parentInfo)%>;">
            <%
            for (com.konylabs.api.ui.KonyTab tab : tabs)
            {
                KonyServerWidget childInfo = (KonyServerWidget)tab.tabPage;
                Boolean childVisible = JSWAPUtil.getBooleanValue(childInfo.map.get(constants.ISVISIBLE));
                if(childVisible)
                {
                    if ((activetab.id).equals(tab.id)) { 
                        activetabwidget = (KonyServerWidget)tab.tabPage; %>                     
                        <li  konywidgettype = "Ktab"  class="selected <%=parentInfo.map.get(constants.ACTIVE_SKIN)%>">

                    <%} else {%>
                        <li  konywidgettype = "Ktab"  class="<%=parentInfo.map.get(constants.INACTIVE_SKIN)%>">
                    <%}%>
                        <a href="#" tabctr ="<%=tabctr%>" id ="<%=childInfo.map.get(KonyServerWidget.ID) %>"
                           tabpane ="<%=parentInfo.map.get(KonyServerWidget.ID) %>"
                           <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                           <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
                           style="border:none;background-color: inherit;" konywidgettype = "Ktab" event="yes" >
                           <% 
                           		if(tab.Image != null && !tab.Image.equals("")) 
                           		{
                           			String tabImg = tab.Image;
                           			if (!tabImg.startsWith("http"))
                           		    {
                           				tabImg = imgpath + tabImg;
                           		    }
                           %>
                           		<img src="<%=tabImg%>" tabctr ="<%=tabctr%>" id ="<%=childInfo.map.get(KonyServerWidget.ID) %>" tabpane ="<%=parentInfo.map.get(KonyServerWidget.ID) %>" konywidgettype = "Ktab" event="yes"/>
                           <%} %>
                           <%=tab.Name %>                           
                        </a>
                        </li>
                    <%
                }
                tabctr++;
            }
            %>
        </ul>
    </div>
	<%if(activetabwidget == null )
	 {
		activetabwidget = (KonyServerWidget)tabs.get(0).tabPage;
	 }%>
    <input type="hidden" autocomplete="off" name="tabview" value="<%=activetab.id%>" />
    <div class="<%=activetabwidget.getTable(KonyServerWidget.SKIN)%>"style ="margin:<%=JSWAPUtil.getWidgetMargin(activetabwidget)%>;
        padding:<%=JSWAPUtil.getWidgetPadding(activetabwidget)%>; ">
        <%
            for (com.konylabs.api.ui.KonyTab tab : tabs)
            {
                childWidget = (KonyServerWidget)tab.tabPage;
                Boolean tabVisible = JSWAPUtil.getBooleanValue(childWidget.map.get(constants.ISVISIBLE));
                if(tabVisible)
                {
                if ((activetab.id).equals(childWidget.getTable("id")))
                {
                    KonyServerWidget activeTabWidgetInfo = (KonyServerWidget) childWidget;
                    List<String> activeTabchildWidgets = ((LuaTable) activeTabWidgetInfo.getTable("children")).list;
                    KonyServerWidget activechildWidget = null;
                    for (String t : activeTabchildWidgets)
                    {
                        activechildWidget = (KonyServerWidget) activeTabWidgetInfo.getTable(t);                        
                        Boolean childVisible = JSWAPUtil.getBooleanValue(activechildWidget.getTable(constants.ISVISIBLE));
                        
                        if (childVisible)
                        {
                            jspFile = activechildWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;
                            request.setAttribute(WEBConstants.WIDGET_ID, activechildWidget.getWidgetID());
                        %>
                                <jsp:include page="<%=jspFile%>" />
                        <%
                            request.removeAttribute(WEBConstants.WIDGET_ID);
                         }
                    }
                }
                }
            }
        %>
    </div>
</div>
<%
}
%>
<%
if (view.equals(KonyServerWidget.COLLAPSIBLE))
{
    //tab view is collapsible view
    
    Vector activetabs = null;
    if (parentInfo.getTable(constants.ACTIVE_TABS) != LuaNil.nil) {
         activetabs = ((LuaTable) parentInfo.getTable(constants.ACTIVE_TABS)).list;
    }else{
        activetabs = new Vector();
    }
    String imageposition ="right";
    String tabnamealignment ="left";    
    String collapsedimage = null;
    String expandedimage = null;
    Double active = constants.INDEXJL;
	LuaTable viewConfig = (LuaTable)parentInfo.map.get(constants.VIEW_CONFIG);
    if(viewConfig != null)
    {
    	LuaTable collapisbleViewConfig = (LuaTable)viewConfig.map.get(constants.COLLAPSIBLE_VIEW_CONFIG);
    	if(collapisbleViewConfig != null)
    	{
    		if(collapisbleViewConfig.map.get(constants.IMAGE_POSITION) != null)
    	        imageposition = (String) collapisbleViewConfig.map.get(constants.IMAGE_POSITION);
    	    if(collapisbleViewConfig.map.get(constants.TAB_NAME_ALIGNMENT) != null)
    	        tabnamealignment = (String) collapisbleViewConfig.map.get(constants.TAB_NAME_ALIGNMENT);
    	    if(collapisbleViewConfig.map.get(constants.COLLAPSED_IMAGE)!= null)
    	        collapsedimage = (String)collapisbleViewConfig.map.get(constants.COLLAPSED_IMAGE);
    	    if(collapisbleViewConfig.map.get(constants.EXPANDED_IMAGE)!= null)
    	        expandedimage = (String)collapisbleViewConfig.map.get(constants.EXPANDED_IMAGE);
    	}
    }
    
%>
    <div  style="margin:<%=JSWAPUtil.getWidgetMargin(parentInfo)%>; padding:<%=JSWAPUtil.getWidgetPadding(parentInfo)%>;">
    <input  type="hidden" autocomplete="off"  id="tabcollapseimg" name="tabcollapseimg" value="<%=collapsedimage%>" />
    <input  type="hidden" autocomplete="off"  id="tabexpandimg" name="tabexpandimg" value="<%=expandedimage%>" />
       <% for (com.konylabs.api.ui.KonyTab tab : tabs)
       {
            KonyServerWidget tabInfo = (KonyServerWidget) tab.tabPage;
            Boolean tabVisible  = JSWAPUtil.getBooleanValue(tabInfo.map.get(constants.ISVISIBLE));
            if(tabVisible)
            {
            boolean activetabFound = false;
            String eventname = parentInfo.getTable("id") + "." + tabctr + ".event_.Kcollapsible";

            if(activetabs.contains(active))
            {
                activetabFound = true;
            }
          
            if ((activetabs.size() > 0) && activetabFound)
            {%>
            <div class="panel" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>"  event="yes" konywidgettype="Kcollapsible"
                 eventname ="<%=eventname%>">
                <div tabheader="true">
                    <div class="ktable kwt100" >
                        <div id="<%=tabInfo.map.get(KonyServerWidget.ID)%>row" class="krow kwt100 <%=parentInfo.map.get(constants.ACTIVE_SKIN)%> "
                             inactskin="<%=parentInfo.map.get(constants.INACTIVE_SKIN)%>" actskin="<%=parentInfo.map.get(constants.ACTIVE_SKIN)%>"                             
                           <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                           <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
                         >
                            <% if("left".equalsIgnoreCase(imageposition) && expandedimage != null) { %>
                                <div konywidgettype="Kcollapsible" class="kcell kwt2 middleleftalign">
                                    <img konywidgettype="Kcollapsible" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>img"
                                                  src="<%=imgpath%><%=expandedimage%>"
                                    />
                                </div>
                            <%}%>
                                <div konywidgettype="Kcollapsible" class="kcell kwt98 middleleftalign">
                                    <div konywidgettype="Kcollapsible" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>div"
                                       <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                                       <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
                                        style="text-align: <%=tabnamealignment%>;">
                                                   <%=tabInfo.map.get("tabname")%>
                                    </div>
                                </div>
                            <% if("right".equalsIgnoreCase(imageposition)&& expandedimage != null) { %>
                                <div konywidgettype="Kcollapsible" class="kcell kwt2 middleleftalign">
                                    <img konywidgettype="Kcollapsible" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>img"
                                                  src="<%=imgpath%><%=expandedimage%>"
                                    />
                                </div>
                            <%}%>
                        </div>
                    </div>
                 </div>
                 <div class="panelcontent" >
                 <input type="hidden" autocomplete="off" name="collapsibleview" value="<%=tabInfo.map.get("id")%>" />
                    <div class="<%=tabInfo.getTable("skin")%>" style="margin:<%=JSWAPUtil.getWidgetMargin(tabInfo)%>;
							padding:<%=JSWAPUtil.getWidgetPadding(tabInfo)%>; ">
                        <%
                            List<String> tabchildWidgets = ((LuaTable) tabInfo.getTable("children")).list;
                            KonyServerWidget tabchildWidget = null;
                            for (String t : tabchildWidgets)
                            {
                                tabchildWidget = (KonyServerWidget) tabInfo.getTable(t);
                                Boolean childVisible = JSWAPUtil.getBooleanValue(tabchildWidget.map.get(constants.ISVISIBLE));
                                
                                if (childVisible)
                                {
                                    jspFile = tabchildWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;
                                    request.setAttribute(WEBConstants.WIDGET_ID, tabchildWidget.getWidgetID());
                                %>
                                    <jsp:include page="<%=jspFile%>" />
                                <%
                                    request.removeAttribute(WEBConstants.WIDGET_ID);
                                }
                             }
                        %>
                   </div>
                 </div>
            </div>
            <%}
            else
            {%>
            <div class="panelcollapsed" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>"   konywidgettype="Kcollapsible"
                 eventname ="<%=eventname%>">
                <div tabheader="true">
                    <div class="ktable kwt100">
                        <div id="<%=tabInfo.map.get(KonyServerWidget.ID)%>row" class="krow kwt100 <%=parentInfo.map.get(constants.INACTIVE_SKIN)%> "
                             inactskin="<%=parentInfo.map.get(constants.INACTIVE_SKIN)%>" actskin="<%=parentInfo.map.get(constants.ACTIVE_SKIN)%>"
                           <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                           <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
                         >
                             <% if("left".equalsIgnoreCase(imageposition) && collapsedimage!= null) { %>
                                <div konywidgettype="Kcollapsible" class="kcell kwt2 middleleftalign"> 
                                    <img konywidgettype="Kcollapsible" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>img"
                                                  src="<%=imgpath%><%=collapsedimage%>"
                                    />
                                </div>
                            <%}%>
                                <div konywidgettype="Kcollapsible" class="kcell kwt98 middleleftalign">
                                    <div konywidgettype="Kcollapsible" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>div"
                                       <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                                       <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
                                         style="text-align: <%=tabnamealignment%>;">
                                                  <%=tabInfo.map.get("tabname")%>
                                    </div>
                                </div>
                            <% if("right".equalsIgnoreCase(imageposition) && collapsedimage!= null) { %>
                                <div konywidgettype="Kcollapsible" class="kcell kwt2 middleleftalign">
                                    <img konywidgettype="Kcollapsible" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>img"
                                                  src="<%=imgpath%><%=collapsedimage%>"
                                    />
                                </div>
                            <%}%>
                        </div>
                    </div>
                 </div>
                 <div class="panelcontent" >
                 <input type="hidden" autocomplete="off" name="collapsibleview" value="<%=tabInfo.map.get(KonyServerWidget.ID)%>" />
                    <div class="<%=tabInfo.getTable("skin")%>" style="margin:<%=JSWAPUtil.getWidgetMargin(tabInfo)%>; 
					padding:<%=JSWAPUtil.getWidgetPadding(tabInfo)%>;" >
                        <%
                            List<String> tabchildWidgets = ((LuaTable) tabInfo.getTable("children")).list;
                            KonyServerWidget tabchildWidget = null;
                            for (String t : tabchildWidgets)
                            {
                                tabchildWidget = (KonyServerWidget) tabInfo.getTable(t);
                                Boolean childVisible = JSWAPUtil.getBooleanValue(tabchildWidget.getTable(constants.ISVISIBLE));
                                if (childVisible)
                                {
                                    jspFile = tabchildWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;
                                    request.setAttribute(WEBConstants.WIDGET_ID, tabchildWidget.getWidgetID());
                                %>
                                    <jsp:include page="<%=jspFile%>" />
                                <%}
                             }
                        %>
                   </div>
                 </div>
            </div>
        <%}}%>
    <%
     active++;
     tabctr++;
    }%>
</div>
    <%}
    request.removeAttribute("tabpaneid");    
%>
