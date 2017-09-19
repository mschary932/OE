<%@page import="java.util.ArrayList"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="sun.misc.Launcher"%>
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
        String eventName="";        
	if (tabpaneid != null)
	{
		KonyServerWidget parentInfo = (KonyServerWidget) form.getTable(tabpaneid);
		widgetInfo = (KonyServerWidget) parentInfo.getTable(widgetId);
	}
	else
	{
		widgetInfo = (KonyServerWidget)form.map.get(widgetId);
	}
	KonyServerWidget segmentbox = (KonyServerWidget)request.getAttribute("segmentbox");
	if(widgetInfo == null)
		widgetInfo = (KonyServerWidget)segmentbox.map.get(widgetId);
	
        String[] childrenarray = (String[])request.getAttribute("childrenarray"); 
        Hashtable segmentmetadata = (Hashtable)request.getAttribute("segmentmetadata");
        LuaTable segmentrec = (LuaTable)request.getAttribute("segmentrec");
        WAPUtilities wapUtil = new com.kony.web.util.WAPUtilities();
        JSWAPUtil jswapUtil = new com.kony.web.util.JSWAPUtil();        
        String cwt = widgetInfo.getTable(constants.CONTAINER_WEIGHT) + "%";
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
        String parentEventName = (String)request.getAttribute("eventName");            
        eventName = parentEventName;
        if(widget.getTable(constants.ONCLICK)!=LuaNil.nil || vonclick != null)
        {            
            eventName = widget.getWidgetID()+"event_";
            if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
            {
                eventName = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + eventName;
            }
            if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
            {
                eventName = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + eventName;
            }
            request.setAttribute("eventName",eventName);
         }  
               

	List<String> childWidgets = ((LuaTable) widgetInfo.getTable(WEBConstants.CHILDREN)).list;
	if(childrenarray == null)
	{
	    childrenarray = new String[childWidgets.size()];
	    childrenarray = childWidgets.toArray(childrenarray);
	}
        request.setAttribute("segmentvbox", "true");
        request.setAttribute("segmentbox", widgetInfo);
        
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
<div class="ktable <%=vboxSkin%> <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(widget)%>"
        columns="1"  id="<%=widget.map.get(KonyServerWidget.ID)%>"
        <% if(preOnclickJS != null){%>prejsevent="<%=preOnclickJS %>" <%} %>
            <% if(postOnclickJS != null){%> postjsevent="<%=postOnclickJS %>" <%} %>
        style=" margin: <%=JSWAPUtil.getWidgetMargin(widget)%>;padding: <%=JSWAPUtil.getWidgetPadding(widget)%>; 
        width: <%=JSWAPUtil.adjustedWeightForMarginandPadding(widget, "100")%>; "
        <%if(request.getAttribute("sectionId") != null) { %> sectionid = <%= request.getAttribute("sectionId")%> <%} %>
              <%if(eventName != null){ %> eventname="<%=request.getAttribute("segmentid")%>.<%=request.getAttribute("rowid")%>.<%=eventName%>.Ksegment"
     kwttype ="divParent" konywidgettype ="Kbox" <%}else{%> konywidgettype = "Ksegment" <%}%> >

    <%for (String s : childWidgets)
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
            childVisible =wapUtil.areSegmentWidgetsVisible(segmentmetadata, segmentrec, childrenlist.toArray(childrenarray)); 
            if (childVisible)
            {
            %>
	<div class ="krow" style="width: 100%; border: none;" <%=JSWAPUtil.getWidgetAlignmentStyle(widget)%> konywidgettype = "Ksegment">
            <div class ="kcell" style="width: 100%; border: none;" <%=JSWAPUtil.getWidgetAlignmentStyle(widget)%> konywidgettype = "Ksegment">            
                <%
                //String widgetAlignment = JSWAPUtil.getWidgetAlignmentStyle(childWidget);
                if (!(childWidget instanceof KonyContainer))
                {
                    jspFile = "SegmentHelper.jsp";
                }
                else
                {                   
                    jspFile = "SegmentHBox.jsp";
                }
                request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                %>
                <jsp:include page="<%=jspFile%>" />
            </div>
        </div>                
            <% }
    } %>
</div>
           <% request.removeAttribute("segmentvbox");
           request.setAttribute("segmentbox", segmentbox);
	request.setAttribute("widget.id", widgetId);
	if(parentEventName  == null)
		request.removeAttribute("eventName");
	else
		request.setAttribute("eventName", parentEventName);	
%>
<%-- populate style after cgen modification--%>
<%-- All these code changes shd happen only if widget is enabled.Add that chk --%>
<%-- get the size % property from cgen --%>