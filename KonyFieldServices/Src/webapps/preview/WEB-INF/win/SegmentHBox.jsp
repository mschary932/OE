<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Arrays"%>
<%@page import="java.util.Stack"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="com.kony.web.WebAlert"%>
<%@page import="java.util.List"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.Hashtable"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.konylabs.api.ui.KonyLabel"%>
<%@page import="com.konylabs.vm.Function"%>

<%@include file="common.jsp"%>
<%
	//KonyServerWidget widget = (KonyServerWidget) form.map.get(widgetId);
		//SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
		String formid = frmId; //(String) uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);
        List<String> childWidgets = ((LuaTable) widget.getTable(WEBConstants.CHILDREN)).list;
        String[] childrenarray = (String[])request.getAttribute("childrenarray"); 
        Hashtable segmentmetadata = (Hashtable)request.getAttribute("segmentmetadata");
        LuaTable segmentrec = (LuaTable)request.getAttribute("segmentrec");
        LuaTable vrecord = (LuaTable)segmentrec.map.get(widgetId);
        Object vonclick = null;
		String vboxSkin = (String)widget.map.get(KonyServerWidget.SKIN);
		if(vrecord != null)
		{
			vboxSkin = (String)vrecord.map.get(KonyServerWidget.SKIN);
			vonclick = vrecord.map.get(constants.ONCLICK);
		}
        WAPUtilities wapUtil = new com.kony.web.util.WAPUtilities();
        JSWAPUtil jswapUtil = new com.kony.web.util.JSWAPUtil();
        String[] hdrchildrenarray =  (String[])request.getAttribute("hdrchildrenarray"); 
        if(hdrchildrenarray != null)
        {
            childWidgets = Arrays.asList(hdrchildrenarray);
        }
        Stack boxonclickeventstack = (Stack) request.getAttribute("boxonclickeventstack");
        if(boxonclickeventstack == null)
            boxonclickeventstack = new Stack();

        String eventExist = "";
        String eventName = "";
        String parentEventName = null;   
        
        HashMap styleMap = new HashMap();
        styleMap.put("margin", JSWAPUtil.getWidgetMargin(widget));
        styleMap.put("padding", JSWAPUtil.getWidgetPadding(widget));
        styleMap.put("width", JSWAPUtil.adjustedWeightForMargin(widget, "100"));
        String wSkin = JSWAPUtil.getWidgetStyle(styleMap);
        KonyServerWidget segmentbox = (KonyServerWidget)request.getAttribute("segmentbox");
        
        int columns = 0;
        if(childrenarray != null && childrenarray.length > 0)
        	columns=childrenarray.length;
        boolean isPercent = JSWAPUtil.getBooleanValue(widget.map.get("percent"));
        if(!isPercent)
        {
            columns=1;
            request.setAttribute("seglayout", "nonpercent");
         }
        KonyServerWidget fChild = null;
        String chk = "false";
        if(childrenarray != null && childrenarray.length > 0)
        {            
            String firstChild = childWidgets.get(0);
			if(widget.map.get(firstChild) != LuaNil.nil)
            fChild = (KonyServerWidget)widget.getTable(firstChild);
			if(fChild == null)
            {	
            	request.setAttribute("segmentbox", segmentbox);
            	fChild = (KonyServerWidget)segmentbox.map.get(firstChild);                
            }
        }
        request.setAttribute("segmenthbox", "true");
        String bcollapse = (String)widget.map.get(constants.BRDR_COLLAPSE);
         
        if(request.getAttribute("eventName") != null)
            eventName = (String) request.getAttribute("eventName");
        if(request.getAttribute("eventExist") != null)
            eventExist = (String) request.getAttribute("eventExist");

        if(widget.getTable(constants.ONCLICK)!=LuaNil.nil || vonclick != null)
        {
            eventExist = "true";
            String parentId = (String)widget.map.get(KonyServerWidget.ID);
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
                 
        String secHdrSkn = (String)request.getAttribute("sectionHdrSkin");
        request.removeAttribute("sectionHdrSkin");
        Hashtable segmetadata = (Hashtable)request.getAttribute("segmentmetadata");
        if(secHdrSkn == null)
		{			
         	secHdrSkn = (String)widget.map.get(KonyServerWidget.SKIN);  
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
         			secHdrSkn = rowwidgetinfo.map.get("skin").toString();
         		}
         	}
 		}	
        if(secHdrSkn == null)
        	secHdrSkn = (String)widget.map.get(KonyServerWidget.SKIN);
        
        String preOnclickJS = null;
    	if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
    	 	preOnclickJS = (String) widget.map.get(constants.PRE_ONCLICK_JS);
    	if(widget.map.get(constants.PRE_LUA_JS) != null && widget.map.get(constants.PRE_LUA_JS) != LuaNil.nil)
    		preOnclickJS = (String) widget.map.get(constants.PRE_LUA_JS);
    	//if(preOnclickJS != null)
    		//request.setAttribute("segPreOnclickJS", preOnclickJS);
    	
    	String postOnclickJS = null;
    	if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil)
    		postOnclickJS = (String) widget.map.get(constants.POST_ONCLICK_JS);
    	if(widget.map.get(constants.POST_LUA_JS) != null && widget.map.get(constants.POST_LUA_JS) != LuaNil.nil)
    		postOnclickJS = (String) widget.map.get(constants.POST_LUA_JS);
    	//if(postOnclickJS != null)
    		//request.setAttribute("segPostOnclickJS", postOnclickJS);
        
%>
<table columns=<%=columns%> class="<%=secHdrSkn%> <%=vboxSkin%> " style="<%=wSkin%>;<%="true".equals(bcollapse) ? "border-collapse:collapse;" : "" %>">
	<tr <%if(request.getAttribute("widgetSkin") != null){%> class="<%=request.getAttribute("widgetSkin")%>" <%}%> style="width: 100%; border: none;" <%=JSWAPUtil.getWidgetAlignmentStyle(widget)%> >
            <%
                if(!isPercent && (fChild != null) && !(fChild instanceof KonyContainer))
                {%>
                    <td>
                <%}
				int allChildsWidth = 0;
                for (String s : childWidgets)
                {
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
                    String childwidgetId = (String) childWidget.map.get(KonyServerWidget.ID);
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
                    childrenlist.toArray(childrenarray);
                    childVisible = wapUtil.areSegmentWidgetsVisible( segmentmetadata ,segmentrec, childrenarray );
                    if (childVisible)
                    {
                    	allChildsWidth+= JSWAPUtil.getIntValue(childWidget.getTable(constants.CONTAINER_WEIGHT));
                        if(widget.getTable(constants.ONCLICK) instanceof Function)
                        {
                            containerevent = widget.getTable("id").toString();
                            request.setAttribute("containerevent",containerevent);
                        }
                        String orientation = null;
                        if (childWidget instanceof KonyContainer)
                        {
                                orientation = (String) childWidget.getTable(KonyServerWidget.ORIENTATION);
                        }
                        String cwt = null;
                        if (childWidget.getTable(constants.CONTAINER_WEIGHT) != LuaNil.nil)
                        {                                            
                                cwt = childWidget.getTable(constants.CONTAINER_WEIGHT) + "%";
                        }
                        String widgetAlignment = JSWAPUtil.getWidgetAlignmentStyle(childWidget);
                        String childWidgetMargin = "0%";
                        if (!(childWidget instanceof KonyLabel) && !("Link".equals(childWidget.getTable("wType"))) && !("RichText".equals(childWidget.getTable("wType"))) && !("Phone".equals(childWidget.getTable("wType"))) && childWidget.getTable(KonyServerWidget.MARGIN) != null)
                        {                                        
                                childWidgetMargin = JSWAPUtil.getWidgetMargin(childWidget);
                        }
                         if (!(childWidget instanceof KonyContainer) )
                         {
                             jspFile = "SegmentHelper.jsp";
                         }
                         else
                         {
                             if("vertical".equals(orientation))
                             {
                                 jspFile = "SegmentVBox.jsp";
                             }
                         }
                        request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                        if (childVisible)
                        {
                            if (!(childWidget instanceof KonyContainer) && isPercent)
                            {%>
                                <td style="width:<%=cwt%>;padding:<%=childWidgetMargin%>;border:none;" <%=widgetAlignment%> >
                            <%
                            }
                            else
                            {%>
                                <td style="width:<%=cwt%>;" <%=widgetAlignment%> >                                
                            <%}    
                            if ("false".equals(chk) && (fChild != null) && (fChild instanceof KonyContainer) && !(childWidget instanceof KonyContainer) && !isPercent)
                            {
                            chk = "true";%>
                                <td>
                            <%
                            }
                        }
                        %> 
                        <jsp:include page="<%=jspFile%>" />
                        <%
                        if (childVisible)
                        {
                                if (isPercent)
                                {%>
                                    </td>
                                <%
                                }
                        }
            }//end of segment hbox childnrens
            if ((fChild != null) && (fChild instanceof KonyContainer) && !(childWidget instanceof KonyContainer) && !isPercent)
            {%>
               </td>
            <%} }
            if(isPercent && allChildsWidth<100 && adherePercentageStrictly){
            %>
            <td style="width:<%=100-allChildsWidth%>%" ></td>
            <%} %>
            </tr>
</table>
            
<%
           if(widget.getTable(constants.ONCLICK)!=LuaNil.nil) {
                boxonclickeventstack.pop(); // removing onclick element
                if(parentEventName != null)
                    request.setAttribute("eventName", parentEventName);
           }
           if(boxonclickeventstack.isEmpty()){
                request.removeAttribute("eventExist");
                request.removeAttribute("eventName");
                request.removeAttribute("boxonclickeventstack");
           }
           request.setAttribute("segmentbox", segmentbox);
        request.removeAttribute("segmenthbox");
        request.removeAttribute("containerevent");
        request.removeAttribute("seglayout");
        request.removeAttribute("boxEventExist");
	request.setAttribute("widget.id", widgetId);
        
%>