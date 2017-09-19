<%@page import="java.util.Arrays"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.ArrayList"%>
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
		//SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
		String formid = frmId; //(String) uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);
        List<String> childWidgets = ((LuaTable) widget.getTable(WEBConstants.CHILDREN)).list;
        String[] childrenarray = (String[])request.getAttribute("childrenarray");
        String[] hdrchildrenarray =  (String[])request.getAttribute("hdrchildrenarray"); 
        if(hdrchildrenarray != null)
        {
            childWidgets = Arrays.asList(hdrchildrenarray);
        }
        Hashtable segmentmetadata = (Hashtable)request.getAttribute("segmentmetadata");
        LuaTable segmentrec = (LuaTable)request.getAttribute("segmentrec");
        WAPUtilities wapUtil = new com.kony.web.util.WAPUtilities();
        JSWAPUtil jswapUtil = new com.kony.web.util.JSWAPUtil();
        LuaTable vrecord = (LuaTable)segmentrec.map.get(widgetId);
        String vboxSkin = (String)widget.map.get(KonyServerWidget.SKIN);
        Object honclick = null;    		
   		if(vrecord != null)
   		{
   			vboxSkin = (String)vrecord.map.get(KonyServerWidget.SKIN);
   			honclick = vrecord.map.get(constants.ONCLICK); 
   		}				    
        String eventName="";
        KonyServerWidget segmentbox = (KonyServerWidget)request.getAttribute("segmentbox");
        int columns = 0;
        if(childrenarray != null && childrenarray.length > 0)
        	columns=childrenarray.length;
        boolean isPercent = JSWAPUtil.getBooleanValue(widget.getTable("percent"));
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
            fChild = (KonyServerWidget)widget.map.get(firstChild);
			if(fChild == null)
            {	
            	request.setAttribute("segmentbox", segmentbox);
            	fChild = (KonyServerWidget)segmentbox.map.get(firstChild);                
            }
        }
        request.setAttribute("segmenthbox", "true");
        
        String parentEventName = (String)request.getAttribute("eventName");            
        eventName = parentEventName;
        
        if("true".equals(request.getAttribute("issectionheader")))
        {
       	 String sectionheaderid = request.getAttribute("sectionheaderid").toString();
       	 if(widget.getTable(sectionheaderid) != null && widget.getTable(sectionheaderid) instanceof LuaTable)
       	 {
       		 if((((LuaTable)widget.getTable(sectionheaderid)).getTable(constants.ONCLICK)) !=LuaNil.nil)
       		 {
       			 eventName = request.getAttribute("sectionheaderid").toString()+"event_";
       		 }
       	 }
        }
        else if(widget.getTable(constants.ONCLICK)!=LuaNil.nil || honclick != null)
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
            request.setAttribute("eventName", eventName);
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
<div class="ktable <%=secHdrSkn%> <%= vboxSkin%> <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(widget)%>" 
     columns="<%=columns%>" id="<%=widget.map.get(KonyServerWidget.ID)%>"

      <% if(preOnclickJS != null){%>prejsevent="<%=preOnclickJS %>" <%} %>
            <% if(postOnclickJS != null){%> postjsevent="<%=postOnclickJS %>" <%} %>
     style="<%=JSWAPUtil.getBooleanValue(widget.getTable("percent"))?"":"table-layout:auto;"%>margin: <%=JSWAPUtil.getWidgetMargin(widget)%>;padding: <%=JSWAPUtil.getWidgetPadding(widget)%>; 
        width: <%=JSWAPUtil.adjustedWeightForMarginandPadding(widget, "100")%>; "
        <%if(request.getAttribute("sectionId") != null) { %> sectionid = <%= request.getAttribute("sectionId")%> <%} %>
     <%if(eventName != null){%>
	 <%if("true".equals(request.getAttribute("issectionheader"))){%>
	 	 eventname="<%=request.getAttribute("sectionheaderid").toString()+"event_"%>"
	 <%}else{%>
  		eventname="<%=request.getAttribute("segmentid")%>.<%=request.getAttribute("rowid")%>.<%=eventName%>.Ksegment"
  	  <%}%>
 kwttype ="divParent" konywidgettype ="Kbox" <%}else{%> konywidgettype = "Ksegment"
  <%}%>
 >
    <div class ="krow <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(widget)%>" style="width: 100%; border: none;"  konywidgettype = "Ksegment">
        <%
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
                childrenlist.toArray(childrenarray);
                
                childVisible = wapUtil.areSegmentWidgetsVisible(segmentmetadata, segmentrec, childrenarray);

                if (childVisible)
                {                    
                                                                                                               
                        String cwt = childWidget.getTable(constants.CONTAINER_WEIGHT) + "%";                            
                        allChildsWidth+= JSWAPUtil.getIntValue(childWidget.getTable(constants.CONTAINER_WEIGHT));
                    %>
                    <% if(childWidget instanceof KonyContainer) { %>
                        <div  class ="kcell <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(childWidget)%>" 
                              style="width:<%=cwt%>;border:none;"  konywidgettype = "Ksegment">
                        <%
                            request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                            jspFile = "SegmentVBox.jsp";                     
                        %>
                        <jsp:include page="<%=jspFile%>" />
                        </div>                    
                    
                    <% } else if (!(childWidget instanceof KonyContainer) && isPercent){ %>
                        <div  class ="kcell <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(childWidget)%>" 
                              style="width:<%=cwt%>;border:none;"  konywidgettype = "Ksegment">
                        <%
                            request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                            jspFile = "SegmentHelper.jsp";
                                                   
                        %>
                        <jsp:include page="<%=jspFile%>" />
                        </div>
                    <% } else if (!(childWidget instanceof KonyContainer) && !isPercent){ %>                        
                        <%
                            request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                            jspFile = "SegmentHelper.jsp";
                                                
                        %>
                        <jsp:include page="<%=jspFile%>" />
                                          
                    <%    
                        }                           
                    
   } }
        if(allChildsWidth < 100 && isPercent && adherePercentageStrictly){
        %>
        <div  class ="kcell" style="width:<%=100-allChildsWidth%>%;border:none;"  konywidgettype = "Ksegment"></div>
        <%} %>
    </div>
    </div>
<%
		if(parentEventName  == null)
			request.removeAttribute("eventName");
		else
			request.setAttribute("eventName", parentEventName);	
		request.setAttribute("segmentbox", segmentbox);
        request.removeAttribute("segmenthbox");        
        request.removeAttribute("seglayout");
    	request.setAttribute("widget.id", widgetId);
%>