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

    com.konylabs.api.ui.KonyTab activetab = null;
    String view = (String) parentInfo.getTable(constants.VIEW_TYPE);
    Vector<com.konylabs.api.ui.KonyTab> tabs = (Vector<com.konylabs.api.ui.KonyTab>) parentInfo.getTable(KonyServerWidget.TABS);
    int tabctr = 0;
    request.setAttribute("tabpaneid", parentInfo.getTable("id"));

if (view.equals(WEBConstants.SELECTED_TAB))
{
    //tab view is table view

    if (parentInfo.getTable(constants.ACTIVE_TAB) instanceof KonyTab) {
        activetab = (com.konylabs.api.ui.KonyTab) parentInfo.getTable(constants.ACTIVE_TAB);
    }
    else {
        //int activetabIndex =  JSWAPUtil.getIntValue(parentInfo.getTable(KonyServerWidget.ACTIVE_TAB));
       // activetab = tabs.get(activetabIndex - 1);
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
            <table style="width:100%;">
                <tr>
                    <%
                    for (com.konylabs.api.ui.KonyTab tab : tabs)
                    {
                        KonyServerWidget childInfo = (KonyServerWidget)tab.tabPage;
                        Boolean tabVisible = JSWAPUtil.getBooleanValue(childInfo.map.get(constants.ISVISIBLE));
                        if(tabVisible)
                        {
                        if ((activetab.id).equals(tab.id)) {%>
                            <td class="<%=parentInfo.getTable(constants.ACTIVE_SKIN)%>">
                        <%} else {%>
                            <td class="<%=parentInfo.getTable(constants.INACTIVE_SKIN)%>">
                        <%}%>
                        <a href="<%=response.encodeURL(apppath + "?formid=" + formid + "&cat=bjs" + (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() > 0 ? "&krfid=" + WAPUtilities.getKRFId(request) : "") + "&node=" + request.getAttribute("node.no") + "&tabview=" + tab.id + "&tabctr=" + tabctr + "&tabevent=" + widgetid)%>"
                            style="border:none" konywidgettype = "Ktab"
                            <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                            <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
                        >
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
                        </td>
                        <%
                        }
                        tabctr++;
                    }
                %>
                </tr>
            </table>
        </div>
    <input type="hidden" autocomplete="off" name="tabview" value="<%=activetab.id%>" />
    <div class="<%=parentInfo.getTable("skin")%>">
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
                        for (String t : activeTabchildWidgets) {
                            activechildWidget = (KonyServerWidget) activeTabWidgetInfo.getTable(t);
                            String widgetAlignment = JSWAPUtil.getWidgetAlignmentStyle(activechildWidget);
                            Boolean childVisible = JSWAPUtil.getBooleanValue(activechildWidget.map.get(constants.ISVISIBLE));
                            jspFile = activechildWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;
                            request.setAttribute(WEBConstants.WIDGET_ID, activechildWidget.getWidgetID());
                            request.setAttribute("tabpaneid", parentInfo.getTable("id"));
                                if (childVisible) {%>
                                    <jsp:include page="<%=jspFile%>" />
                                <%}
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
    Vector activetabs = null;
    if (parentInfo.getTable(constants.ACTIVE_TABS) != LuaNil.nil) {
        activetabs = ((LuaTable) parentInfo.getTable(constants.ACTIVE_TABS)).list;
    } else {
        activetabs = new Vector();
    }

    String imageposition ="right";
    String tabnamealignment ="left";
    Boolean toogleTabs =false;
    Double active = constants.INDEXJL;
    String collapsedimage = null;
    String expandedimage = null;

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
    <div class="tabbar1" style = "margin:<%=JSWAPUtil.getWidgetMargin(parentInfo)%> ">
       <% for (com.konylabs.api.ui.KonyTab tab : tabs)
       {
            KonyServerWidget tabInfo = (KonyServerWidget) tab.tabPage;
            //need to do: ide is not giving tab visible true or false
            Boolean tabVisible = JSWAPUtil.getBooleanValue(tabInfo.getTable(constants.ISVISIBLE));
            if(tabVisible)
            {
                boolean activetabFound = false;
                String eventname = "&" + parentInfo.getTable("id") + "." + tabctr + ".event_.Kcollapsible=t";
                if(activetabs.contains(active))
                {
                    activetabFound = true;
                }

                if ((activetabs.size() > 0) && activetabFound)
                {%>
                 <div class="<%=parentInfo.getTable("activeskin")%>">
                    <table style="width: 100%;">
                        <tr style="width: 100%;" class=" <%=parentInfo.map.get(constants.ACTIVE_SKIN)%> "
                           <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                           <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
                         >
                            <% if("left".equalsIgnoreCase(imageposition) && expandedimage != null) { %>
                                <td konywidgettype="Kcollapsible" class=" middleleftalign" style=" width:5%;">
                                    <img konywidgettype="Kcollapsible" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>img"
                                                  src="<%=imgpath%><%=expandedimage%>"
                                    />
                                </td>
                            <%}%>
                                <td konywidgettype="Kcollapsible" class="kcell middleleftalign" style="width:95%; ">
                                    <div konywidgettype="Kcollapsible" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>div"
                                       <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                                       <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
                                        style="width:100%; text-align: <%=tabnamealignment%>;">
                                        <a href="<%=response.encodeURL(apppath + "?formid=" + formid + "&node=" + request.getAttribute("node.no") + "" + (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() > 0 ? "&krfid=" + WAPUtilities.getKRFId(request) : "") + eventname)%>"
                                           <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                                           <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
                                            style="width:100%; text-align: <%=tabnamealignment%>; border: none;">
                                            <%=tab.Name %>
                                        </a>
                                    </div>
                                </td>
                            <% if("right".equalsIgnoreCase(imageposition) && expandedimage != null) { %>
                                <td konywidgettype="Kcollapsible" class=" middleleftalign" style=" width:5%;">
                                    <img konywidgettype="Kcollapsible" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>img"
                                                  src="<%=imgpath%><%=expandedimage%>"
                                    />
                                </td>
                            <%}%>

                        </tr>
                    </table>
                 </div>
                 <div style="display:block">
                    <div class="<%=tabInfo.getTable("skin")%>">
                        <input type="hidden" autocomplete="off" name="collapsibleview" value="<%=tabInfo.map.get("id")%>" />
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
            <%}
            else
            {%>
                <div class="<%=parentInfo.getTable("inactiveskin")%>">
                    <table style="width: 100%;">
                        <tr style="width: 100%;" class=" <%=parentInfo.map.get(constants.ACTIVE_SKIN)%> "
                           <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                           <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
                         >
                            <% if("left".equalsIgnoreCase(imageposition) && collapsedimage != null) { %>
                                <td konywidgettype="Kcollapsible" class=" middleleftalign" style=" width:5%;">
                                    <img konywidgettype="Kcollapsible" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>img"
                                                  src="<%=imgpath%><%=collapsedimage%>"
                                    />
                                </td>
                            <%}%>

                                <td konywidgettype="Kcollapsible" class="kcell middleleftalign" style="width:95%; ">
                                    <div konywidgettype="Kcollapsible" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>div"
                                       <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                                       <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
                                        style="width:100%; text-align: <%=tabnamealignment%>;">
                                        <a href="<%=response.encodeURL(apppath + "?formid=" + formid + "&node=" + request.getAttribute("node.no") + "" + (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() > 0 ? "&krfid=" + WAPUtilities.getKRFId(request) : "") + eventname)%>"
                                           <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                                           <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
                                            style="width:100%; text-align: <%=tabnamealignment%>; border: none;">
                                            <%=tab.Name %>
                                        </a>
                                    </div>
                                </td>
                            <% if("right".equalsIgnoreCase(imageposition) && collapsedimage != null) { %>
                                <td konywidgettype="Kcollapsible" class=" middleleftalign" style=" width:5%;">
                                    <img konywidgettype="Kcollapsible" id="<%=tabInfo.map.get(KonyServerWidget.ID)%>img"
                                                  src="<%=imgpath%><%=collapsedimage%>"
                                    />
                                </td>
                            <%}%>
                        </tr>
                    </table>
                </div>
                <div style="display:none">
                <input type="hidden" autocomplete="off" name="collapsibleview" value="<%=tabInfo.map.get("id")%>" />
                <div class="<%=tabInfo.getTable("skin")%>">
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
        <%}%>
        <br/>
    <%        }
        tabctr++;
        active++;
    }%>
</div>
    <%}
    request.removeAttribute("tabpaneid");
%>
