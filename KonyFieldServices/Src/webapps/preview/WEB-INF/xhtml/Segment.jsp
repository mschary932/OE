<%@page import="com.konylabs.api.ui.segui.KonySegmentUI"%>
<%@page import="com.konylabs.api.ui.KonyRichText"%>
<%@page import="com.konylabs.api.ui.KonyLabel"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Vector"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.konylabs.api.ui.KonyTab"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="com.konylabs.api.ui.KonyImage"%>

<%@include file="common.jsp"%>

<%
	//SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
	String formid = frmId; //(String) uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);;
    String widgetid = (String) request.getAttribute(WEBConstants.WIDGET_ID);
    Boolean isVisible = (Boolean) widget.getTable(constants.ISVISIBLE);
    WAPUtilities wapUtil = new com.kony.web.util.WAPUtilities();
    JSWAPUtil jswapUtil = new com.kony.web.util.JSWAPUtil();
    List<String> childWidgets = ((LuaTable) widget.getTable(WEBConstants.CHILDREN)).list;
    String segmentboxId = (String) (((LuaTable) widget.getTable(WEBConstants.CHILDREN)).list).elementAt(0);
    KonyServerWidget segmentboxInfo = (KonyServerWidget) ((LuaTable) uiState.get(formid)).getTable(segmentboxId);
    request.setAttribute("segmentbox",segmentboxInfo); 
    String segmentorientation = null;
    if(segmentboxInfo.getTable("orientation") != LuaNil.nil)
    {
        segmentorientation = (String)segmentboxInfo.getTable("orientation");
        request.setAttribute("segmentorientation", segmentorientation);
    }
    List<String> segmentActualChildren = ((LuaTable) segmentboxInfo.getTable(WEBConstants.CHILDREN)).list;
    List<String> segmentboxchildren = segmentActualChildren;
    
    request.setAttribute("dfltSelection", widget.map.get(constants.DFLT_SEL));
    
    HashMap styleMap = new HashMap();
    styleMap.put("width", "100%");
    String wSkin = JSWAPUtil.getWidgetStyle(styleMap);
    request.setAttribute("segmentid", widgetid); 
    LuaTable selectionBehaviorConfig = (LuaTable)widget.map.get(constants.SELECTION_BEHAVIOR_CONFIG);   
    if(selectionBehaviorConfig != null)
    {
   	 if(selectionBehaviorConfig.map.get(constants.IMAGE_IDENTIFIER) != null)
   	 {
   		 request.setAttribute(constants.IMAGE_IDENTIFIER, selectionBehaviorConfig.map.get(constants.IMAGE_IDENTIFIER));
   		if(selectionBehaviorConfig.map.get(constants.SELECTED_STATE_IMAGE) != null)
		 	request.setAttribute(constants.SELECTED_STATE_IMAGE, selectionBehaviorConfig.map.get(constants.SELECTED_STATE_IMAGE));
		 else
			request.setAttribute(constants.SELECTED_STATE_IMAGE, "tick.png");
		 if(selectionBehaviorConfig.map.get(constants.UNSELECTED_STATE_IMAGE) != null)
		 	request.setAttribute(constants.UNSELECTED_STATE_IMAGE, selectionBehaviorConfig.map.get(constants.UNSELECTED_STATE_IMAGE));
		 else
			request.setAttribute(constants.UNSELECTED_STATE_IMAGE, "notick.png");
   	 }
    }
    if (isVisible)
    {
        Object wobj = null;
        String widgetkey = null;
        Object obj = widget.getTable(KonyServerWidget.DATA);
        String segskin = "";
        if (obj != LuaNil.nil)
        {
            java.util.Hashtable segmentmetadata = null;
            java.util.Vector segmentdata = ((LuaTable)obj).list;
            obj = widget.getTable(constants.WIDGETIDMAP);
            if (obj != LuaNil.nil && obj instanceof java.util.Hashtable)
            {
                segmentmetadata = (java.util.Hashtable) obj;
                request.setAttribute("segmentmetadata", segmentmetadata);
                com.konylabs.vm.LuaTable segmentrec = null;
                Object objClickable = null;
                boolean isRowClickable = widget.getTable(constants.ONCLICK) != LuaNil.nil ? true : false;
                
                Object objSkin = null;
                String segmentSkin = null;
                if(widget.getTable(KonyServerWidget.SKIN) != LuaNil.nil)
                {
                    segmentSkin = (String)widget.getTable(KonyServerWidget.SKIN);
                }
                String segWidgetSkin = null;
                if(widget.getTable(constants.WIDGET_SKIN) != LuaNil.nil)
                {
                	segWidgetSkin = (String)widget.getTable(constants.WIDGET_SKIN);
                }
                String altSkin = segmentSkin;
                String focusSkin = segmentSkin;
                String secSkin = segmentSkin;
                
                if (widget.getTable(constants.A_SKIN) != LuaNil.nil) {
                    altSkin = (String)widget.getTable(constants.A_SKIN);
                }
                if (widget.getTable(constants.FOCUSSKIN) != LuaNil.nil) {
                    focusSkin = (String)widget.getTable(constants.FOCUSSKIN);
                }
                if (widget.getTable(constants.SECTION_HEADER_SKIN) != LuaNil.nil) {
                    secSkin = (String)widget.getTable(constants.SECTION_HEADER_SKIN);
                } else if(widget.getTable(constants.SECTION_SKIN_BKWD) != null && widget.getTable(constants.SECTION_SKIN_BKWD) != LuaNil.nil) {
                    secSkin = (String)widget.getTable(constants.SECTION_SKIN_BKWD);
                }
                
                com.konylabs.vm.LuaTable rowmetainfo = null;
                Vector selectedRows = null;
                Map selectedItems = new HashMap();
                LuaTable selectedIndices = null;
                Object selectedIndicesObj = widget.getTable(constants.SELECTEDINDICES);
                if(selectedIndicesObj != LuaNil.nil && selectedIndicesObj != null)
                	 selectedIndices = (LuaTable)selectedIndicesObj;
                if(selectedIndices != null)
                {
                	if(selectedIndices.list.size() > 1 && !(selectedIndices.list.get(0) instanceof LuaTable))
                    {                    	
                    	Double sectionid = Double.valueOf(selectedIndices.list.get(0).toString()) - constants.INDEXJL;
                    	request.setAttribute("sectionid", sectionid);
                        Object secondObj = selectedIndices.list.get(1);
                        if(secondObj instanceof LuaTable)
                        {
                            selectedRows = ((LuaTable)secondObj).list;
                        }
                      /*   else
                            selectedRows.add(secondObj); */
                        selectedItems.put(""+((Double)selectedIndices.list.get(0)), selectedRows);
                    }
                	else
                	{
                		for(LuaTable secListObj : (Vector<LuaTable>)selectedIndices.list)
                		{                			                			
                			Double sectionid = Double.valueOf(secListObj.list.get(0).toString())- constants.INDEXJL;
                            request.setAttribute("sectionid", sectionid); 		
                			selectedRows = ((LuaTable)secListObj.list.get(1)).list;
                			selectedItems.put(""+((Double)secListObj.list.get(0)), selectedRows);
                		}
                	}
                	request.setAttribute("selectedRows",selectedItems);
                }
                                
                boolean focusedRow = false;
                int focusedIndex = 0;
                int i = 0;
                focusedIndex =  JSWAPUtil.getIntValue(widget.getTable(constants.FOCUSED_INDEX));
                
                if(KonySegmentUI.VIEW_TYPE_PAGE.equals(widget.map.get(constants.VIEW_TYPE)) || "pageview".equals(widget.map.get("view")))
                {
                    //rendering page view of segment
                    String eventName = "";
                    if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
                    {
                        eventName = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + eventName;
                    }
                    if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
                    {
                        eventName = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + eventName;
                    }
                    if (tabpaneid != null)
                    {
                            eventName = frmId + "." + tabpaneid + "." + eventName;
                    }
                    if(request.getAttribute("segmentid") != null)
                    {
                        eventName = request.getAttribute("segmentid").toString();
                        if(request.getAttribute("tabpaneid") != null)
                        {
                             eventName = request.getAttribute("tabpaneid") +"."+eventName;
                             eventName = frmId +"."+eventName;
                        }
                    }
                    if(JSWAPUtil.getBooleanValue(widget.getTable(constants.ISPGINDCTRNEEDED))) { 
                    	if(segWidgetSkin != null){ %> <div class="<%=segWidgetSkin%>" style="height:auto;width:100%;overflow:hidden;position:relative;"> <%} 
                 %>
				                                 <%
									i = ((Integer)widget.getTable("pagenumber")).intValue();
                                    segmentboxchildren = segmentActualChildren;
                                    request.setAttribute("currentRow", i);
                                %>
                   <table style = "width: 100%;">
                        <tr align="left" style = "width:100%;">
                           <td align="left" style="width:30px;">
                                <% if(i > 0){%>
                                    <a href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=bjs&tabview="+request.getAttribute("tabpaneid")+ (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&node="+request.getAttribute("node.no")+"&rowid=prev"+"&"+eventName+"event_=x")%>">
                                    <img src = "<%=imgpath%>leftarr.png" konywidgettype = "Ksegment" style="border: medium none;"/>
                                    </a>
                                <% } %>
                            </td>
                            <td align="center" >                                

                              <%@include file="SegmentHelper1.jsp"%>
                            <td align="right" style="width:30px;">
                                <% if((i + 1) < segmentdata.size()){ %>
                                        <a href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=bjs&tabview="+request.getAttribute("tabpaneid")+ (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&node="+request.getAttribute("node.no")+"&rowid=next"+"&"+eventName+"event_=x")%>">
                                        <img src = "<%=imgpath%>rightarr.png" style="border: medium none;" konywidgettype = "Ksegment"
                                            />
                                        </a>
                                <%} %>
                            </td>
                        </tr>
                    </table>
                <% 		if(segWidgetSkin != null){%> </div> <% } 
                    }
                }
                else if(widget.getTable("sections") != LuaNil.nil)
                {
 					if(segWidgetSkin != null){ %> <div class="<%=segWidgetSkin%>" style="height:auto;width:100%;overflow:hidden;position:relative;"> <%} 
                    //rendering segment section headers
                    obj = widget.getTable("sections");
                    java.util.Vector sectionList = (java.util.Vector) obj;
                    LuaTable sectionHeaderTemplate = (LuaTable)widget.map.get(constants.SECHDRTMPLT);
                    String widgetSkin = (String)widget.map.get(constants.SECTION_HEADER_SKIN);
                    request.setAttribute("segmentid", widgetId); 
                    for(int ss=0; ss<sectionList.size(); ss++)
                    {
                        com.konylabs.api.ui.segui.SectionInfo sInfo = (com.konylabs.api.ui.segui.SectionInfo) sectionList.get(ss);
                        segmentdata = sInfo.allSegments;                        
                        request.setAttribute("sectionId", ss);                       
                        if(selectedIndices != null)
                        {
                        	if(selectedIndices.list.size() > 1 && !(selectedIndices.list.get(0) instanceof LuaTable))
                            {                    	
                            	 Double sectionid = Double.valueOf(selectedIndices.list.get(0).toString()) - constants.INDEXJL; 
                            	 if(sectionid.intValue() == ss){
                                 	request.setAttribute("sectionid", sectionid); 
	                                Object secondObj = selectedIndices.list.get(1);
	                                if(secondObj instanceof LuaTable)
	                                {
	                                    selectedRows = ((LuaTable)secondObj).list;
	                                }
                            	}
                            }
                        	else
                        	{
                        		for(LuaTable secListObj : (Vector<LuaTable>)selectedIndices.list)
                        		{                			 
                        			Double sectionid = Double.valueOf(secListObj.list.get(0).toString()) - constants.INDEXJL;
	                                if(sectionid.intValue() == ss){
	                                 	request.setAttribute("sectionid", sectionid); 
	                        			selectedRows = ((LuaTable)secListObj.list.get(1)).list;
	                        			break;
	                                }
        						}
                        	}
                        }              
                        if(sectionHeaderTemplate != null)
                         {
                             LuaTable headerTemplateChilren = null;
                             if(sInfo.headerTemplate != null)
                                 headerTemplateChilren = (LuaTable)sInfo.headerTemplate.map.get("children");
                             else                                
                                 headerTemplateChilren = (LuaTable)sectionHeaderTemplate.map.get("children");
                             String[] chilren = new String[headerTemplateChilren.list.size()];
                             request.setAttribute("hdrchildrenarray", headerTemplateChilren.list.toArray(chilren));
                             segmentrec = sInfo.templateData;
                             request.setAttribute("segmentrec", segmentrec);
                             request.setAttribute("widgetSkin", widgetSkin);
                             request.setAttribute(WEBConstants.WIDGET_ID, widgetId);
                             request.setAttribute("sectionHdrSkin", secSkin);
                         %>
                             <jsp:include page="SegmentHBox.jsp"/>    
                         <%
                         request.removeAttribute("hdrchildrenarray");
                         }
                        else
                        {
                         %>                        
                        <div class="<%=secSkin%>" <% if(ss != 0) { %> style = "margin-top:0px;" <%}%> >
                        <% if(sInfo.sectionName!=null && sInfo.sectionName.trim().length()!=0)
                        {%>
                           <table columns="1" style="width:100%;border:none">
                                <tr style="width:100%;border:none;">
                                    <td >
                                         <%=sInfo.sectionName%>
                                   </td>
                               </tr>
                           </table>
                       <%}%>
                       </div>
                       <%} %>
                       <%for ( i = 0; i < segmentdata.size(); i++)
                       {  
                    	   request.setAttribute("segmentrowmetainfo", segmentdata.get(i));
                            request.setAttribute("dfltSelection", widget.map.get(constants.DFLT_SEL));
                       segmentboxchildren = segmentActualChildren;
                       request.setAttribute("currentRow", i);
                            %>                        
                            <%@include file="SegmentHelper1.jsp"%>
                        <% 
                        request.removeAttribute("dfltSelection");
                       }
                    }
                    request.removeAttribute("segmentid");
                    if(segWidgetSkin != null){%> </div> <% } 
                }
                else
                {
 					if(segWidgetSkin != null){ %> <div class="<%=segWidgetSkin%>" style="height:auto;width:100%;overflow:hidden;position:relative;"> <%} 
                	request.setAttribute("sectionId", 0);
                    //rendering segment 
                     for ( i = 0; i < segmentdata.size(); i++)
                     {     
                    	 request.setAttribute("segmentrowmetainfo", segmentdata.get(i));
                            request.setAttribute("dfltSelection", widget.map.get(constants.DFLT_SEL));
                         segmentboxchildren = segmentActualChildren;
                         request.setAttribute("currentRow", i);
                            %>
                     
                        <%@include file="SegmentHelper1.jsp"%>
                        <%
                        request.removeAttribute("dfltSelection");
                     }
                     if(segWidgetSkin != null){%> </div> <% } 
                }
            }
         }
		request.removeAttribute("segmentid");
	    request.removeAttribute("segmentmetadata");
	    request.removeAttribute("segmentorientation");
	    request.removeAttribute("boxEventExist");
	    request.removeAttribute("childrenarray");
	    request.removeAttribute("segmentrec");
	    request.removeAttribute("segmentmetadata");
	    request.removeAttribute("segmentrow");
	    request.removeAttribute("segmentid");
	    request.removeAttribute("objClickable");
	    request.removeAttribute("segmentbox");
	    request.removeAttribute("widgetDataText1"); 
            request.removeAttribute("widgetSkin");   
            request.removeAttribute("sectionid");
            request.removeAttribute("sectionId");
            request.removeAttribute(constants.IMAGE_IDENTIFIER);
            request.removeAttribute(constants.SELECTED_STATE_IMAGE);
            request.removeAttribute(constants.UNSELECTED_STATE_IMAGE);
            request.removeAttribute("currentRow");
            request.removeAttribute("selectedRows");
      }%>

