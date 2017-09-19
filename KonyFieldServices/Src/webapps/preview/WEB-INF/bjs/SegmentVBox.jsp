<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Stack"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="com.konylabs.api.ui.KonyLabel"%>
<%@page import="com.konylabs.api.ui.KonyLabel"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="com.kony.web.WebAlert"%>
<%@page import="java.util.Hashtable"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>

<%@include file="common.jsp"%>
<%
	KonyServerWidget widgetInfo = null;
		//SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
		String formid = frmId; //(String) uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);
	if (tabpaneid != null)
	{
		KonyServerWidget parentInfo = (KonyServerWidget) form.getTable(tabpaneid);
		widgetInfo = (KonyServerWidget) parentInfo.getTable(widgetId);
	}
	else
	{
		widgetInfo = (KonyServerWidget) form.map.get(widgetId);		
	}
	
	KonyServerWidget segmentbox = (KonyServerWidget)request.getAttribute("segmentbox");
	if(widgetInfo == null)
		widgetInfo = (KonyServerWidget)segmentbox.map.get(widgetId);
        
        Stack boxonclickeventstack = new Stack();
        String eventExist = "";
        String eventName = "";
        String parentEventName = null;    
               
        String[] childrenarray = (String[])request.getAttribute("childrenarray"); 
        Hashtable segmentmetadata = (Hashtable)request.getAttribute("segmentmetadata");
        LuaTable segmentrec = (LuaTable)request.getAttribute("segmentrec");
        WAPUtilities wapUtil = new com.kony.web.util.WAPUtilities();
        JSWAPUtil jswapUtil = new com.kony.web.util.JSWAPUtil();
        String cwt = null;
        LuaTable vrecord = (LuaTable)segmentrec.map.get(widgetId);
        Object vonclick = null;
		String vboxSkin = (String)widget.map.get(KonyServerWidget.SKIN);
		Hashtable segmetadata = (Hashtable)request.getAttribute("segmentmetadata");
		if(vboxSkin == null)
		{			
        	LuaTable rowmetaskin = (LuaTable)request.getAttribute("segmentrowmetainfo");
        	Object tempwidgetID = "";
        	if(segmetadata != null && segmetadata.containsKey(widgetId))
        	{
        		tempwidgetID = segmetadata.get(widgetId);
        	}
        	
        	
        	if(rowmetaskin != null && rowmetaskin.map.containsKey(tempwidgetID))
        	{
        		LuaTable rowwidgetinfo = (LuaTable)rowmetaskin.map.get(tempwidgetID);
        		if(rowwidgetinfo.map.containsKey("skin"))
        		{
        			vboxSkin = rowwidgetinfo.map.get("skin").toString();
        		}
        	}
		}
		if(vrecord != null)
		{
			vboxSkin = (String)vrecord.map.get(KonyServerWidget.SKIN);
			vonclick = vrecord.map.get(constants.ONCLICK); 
		}
        if (widgetInfo.getTable(constants.CONTAINER_WEIGHT) != LuaNil.nil)
        {
                
                cwt =  widgetInfo.getTable(constants.CONTAINER_WEIGHT) + "%";

        }
        
        if(request.getAttribute("boxonclickeventstack")!= null)
            boxonclickeventstack = (Stack) request.getAttribute("boxonclickeventstack");
            if(request.getAttribute("eventName") != null)
                eventName = (String) request.getAttribute("eventName");
            if(request.getAttribute("eventExist") != null)
                eventExist = (String) request.getAttribute("eventExist");
        //parsing props for vbox onclick
        if(widget.getTable(constants.ONCLICK)!=LuaNil.nil || vonclick != null) {
            eventExist = "true";
            String parentId = (String)widget.getTable(KonyServerWidget.ID);
            boxonclickeventstack.push(parentId);
            eventName = widget.getWidgetID()+"event_";
            if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
            {
                eventName = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + eventName;
            }
            if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
            {
                eventName = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + eventName;
            }
            request.setAttribute("boxonclickeventstack", boxonclickeventstack);
            if(request.getAttribute("eventName") != null)
               parentEventName= (String) request.getAttribute("eventName");
            request.setAttribute("eventName", eventName);
            request.setAttribute("eventExist", eventExist);
         }    
        String parentSegPreOnclickjs = (String)request.getAttribute("segPreOnclickJS");
        String parentSegPostOnclickjs = (String)request.getAttribute("segPostOnclickJS");
        String preOnclickJS = null;
    	if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
    	 	preOnclickJS = (String) widget.map.get(constants.PRE_ONCLICK_JS);
    	if(widget.map.get(constants.PRE_LUA_JS) != null && widget.map.get(constants.PRE_LUA_JS) != LuaNil.nil)
    		preOnclickJS = (String) widget.map.get(constants.PRE_LUA_JS);
    	if(preOnclickJS != null)
    		request.setAttribute("segPreOnclickJS", preOnclickJS);
    	
    	String postOnclickJS = null;
    	if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil)
    		postOnclickJS = (String) widget.map.get(constants.POST_ONCLICK_JS);
    	if(widget.map.get(constants.POST_LUA_JS) != null && widget.map.get(constants.POST_LUA_JS) != LuaNil.nil)
    		postOnclickJS = (String) widget.map.get(constants.POST_LUA_JS);
    	if(postOnclickJS != null)
    		request.setAttribute("segPostOnclickJS", postOnclickJS);
	List<String> childWidgets = ((LuaTable) widgetInfo.getTable(WEBConstants.CHILDREN)).list;
        request.setAttribute("segmentvbox", "true");
        request.setAttribute("segmentbox", widgetInfo);
%>
        <%for (String s : childWidgets)
        {%>                        
            <%
            childWidget = (KonyServerWidget) form.map.get(s);
            if(childWidget == null)
            {
            	request.setAttribute("segmentbox", segmentbox);
            	childWidget = (KonyServerWidget)segmentbox.map.get(s);
            }
            if(childWidget == null)
            {
            	request.setAttribute("segmentbox", widget);
            	childWidget = (KonyServerWidget)widget.map.get(s);
            }
            String childwidgetId = (String) childWidget.getTable(KonyServerWidget.ID);            
            Boolean childVisible = (Boolean) childWidget.getTable(constants.ISVISIBLE);
            
            List<String> childrenlist = new ArrayList<String>();                        
            if (!(childWidget instanceof KonyContainer)) {
                childrenlist.add(childwidgetId);
            }
            if (childWidget instanceof KonyContainer) {
                List<String> segmentchildrenlist1 = jswapUtil.generateSegmentWidgetVisibilityCheck(childWidget, formid, uiState);
                for (int t = 0; t < segmentchildrenlist1.size(); t++) {
                    childrenlist.add(segmentchildrenlist1.get(t));

                }
            }
            childrenarray = new String[childrenlist.size()];
            childVisible =wapUtil.areSegmentWidgetsVisible( segmentmetadata ,segmentrec, childrenlist.toArray(childrenarray) ); 
            if (childVisible)
            {
                String orientation = null;
                if (childWidget instanceof KonyContainer)
                {
                        orientation = (String) childWidget.getTable(KonyServerWidget.ORIENTATION);
                }
                String widgetPadding = "0%";
                if (childWidget.getTable(KonyServerWidget.PADDING) != LuaNil.nil)
                {                               
                        widgetPadding = JSWAPUtil.getWidgetPadding(widget);
                }
                String widgetMargin = "0%";
                if (childWidget.getTable(KonyServerWidget.MARGIN) != LuaNil.nil)
                {                                
                        widgetMargin = JSWAPUtil.getWidgetMargin(childWidget);
                }
                String width = JSWAPUtil.adjustedWeightForMarginandPadding(childWidget, "100");
                String widgetAlignment = JSWAPUtil.getWidgetAlignmentStyle(childWidget);

                if(childWidget instanceof KonyLabel || "Link".equals(childWidget.getTable("wType")) || "RichText".equals(childWidget.getTable("wType")) || "Phone".equals(childWidget.getTable("wType"))){
                %>
                <div class="<%=vboxSkin%>"  <%=widgetAlignment%> style="width:100%; border:none; " >
                <%}else{%>
                <div class="<%=vboxSkin%>"  style=" width:<%=width%>; margin: <%=widgetMargin%>; <%=widgetAlignment%> ">
                <%}
                if (!(childWidget instanceof KonyContainer))
                {%>
                     <%jspFile = "SegmentHelper.jsp";
                }
                else
                {%>
 
                         <%jspFile = "SegmentHBox.jsp";

                }
                request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                %>
                <jsp:include page="<%=jspFile%>" /> 
                </div>     
                <% 
            }
        }//end of parsing  vbox children widgets
        request.removeAttribute("segmentvbox");
        request.setAttribute("segmentbox", segmentbox);
        request.setAttribute("segPreOnclickJS", parentSegPreOnclickjs);
        request.setAttribute("segPostOnclickJS", parentSegPostOnclickjs);
         if(widget.getTable(constants.ONCLICK)!= LuaNil.nil) {
            boxonclickeventstack.pop(); // removing onclick element       
            if(parentEventName != null)
                request.setAttribute("eventName", parentEventName);
            }                
     
    request.setAttribute("widget.id", widgetId);

%>
<%-- populate style after cgen modification--%>
<%-- All these code changes shd happen only if widget is enabled.Add that chk --%>
<%-- get the size % property from cgen --%>