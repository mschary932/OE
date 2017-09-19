
<%@page import="com.konylabs.api.ui.segui.KonySegmentUI"%>
<%@page import="java.util.Hashtable"%>
<%@page import="com.konylabs.api.ui.segui.SectionInfo"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Vector"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.konylabs.api.ui.*"%>

<%@include file="common.jsp"%>

<%
	//SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
	String formid = frmId; //(String) uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);
    String widgetid = (String) request.getAttribute(WEBConstants.WIDGET_ID);
    Boolean isVisible = (Boolean) widget.getTable(constants.ISVISIBLE);
    WAPUtilities wapUtil = new com.kony.web.util.WAPUtilities();
    LuaTable segmentWidget = widget;
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
        HashMap styleMap = new HashMap();
        styleMap.put("margin", JSWAPUtil.getWidgetMargin(widget));
        styleMap.put("padding", JSWAPUtil.getWidgetPadding(widget));
        //styleMap.put("width", JSWAPUtil.adjustedWeightForMargin(widget, "100"));
        String wSkin = JSWAPUtil.getWidgetStyle(styleMap);       
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
        
    if (isVisible) {
        Object wobj = null;
        String widgetkey = null;
        Object obj = widget.getTable(KonyServerWidget.DATA);
        String segskin = "";
        String segmentId = "";
        if (obj != null) {
            Hashtable segmentmetadata = null;
            Vector segmentdata = ((LuaTable)obj).list;
            obj = widget.getTable(constants.WIDGETIDMAP);
            segmentId = (String)widget.map.get("id");
            if (obj != null && obj instanceof Hashtable) {
                segmentmetadata = (Hashtable) obj;
                request.setAttribute("segmentmetadata", segmentmetadata);
                LuaTable segmentrec = null;
                Object objClickable = null;
                boolean isRowClickable;
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
                } else if(widget.getTable(constants.SECTION_SKIN_BKWD) != LuaNil.nil) {
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
                if (widget.getTable(constants.FOCUSED_INDEX) != LuaNil.nil && widget.getTable(constants.FOCUSED_INDEX) != null) {
                	focusedIndex = (Double.valueOf(widget.getTable(constants.FOCUSED_INDEX).toString()).intValue());
                }

                String eventName = segmentId;
                if (tabpaneid != null)
                {
                    eventName = frmId + "." + tabpaneid + "." + eventName;
                }
                if(KonySegmentUI.VIEW_TYPE_PAGE.equals(widget.map.get(constants.VIEW_TYPE)) || "pageview".equals(widget.map.get("view")))
                {
                    //int i = 0;
                    if(widget.getTable(constants.FOCUSED_INDEX) != LuaNil.nil)
                    {
                         focusedIndex = (Double.valueOf(widget.getTable(constants.FOCUSED_INDEX).toString()).intValue());
                    }  
                    request.setAttribute("segmentid", widgetId);                    
                     eventName = segmentId;
                     if(request.getAttribute("tabpaneid") != null)
                     {
                          eventName = request.getAttribute("tabpaneid") +"."+eventName;
                          eventName = frmId +"."+eventName;
                     }
                
                    String evtName ="";
                    %>
                    <% if("palm".equalsIgnoreCase(preferredML) || "nth".equalsIgnoreCase(preferredML)) { %>
                    	 <%if(segWidgetSkin != null){ %> <div class="<%=segWidgetSkin%>grp" style="height:auto;width:100%;overflow:hidden;position:relative;"> <%} %>
                        <div id="<%=widgetId%>" konywidgettype="KTouchsegment" pageOnDotImage="<%= widget.map.get(constants.PAGE_ON_DOT_IMAGE)%>"
                             pageOffDotImage="<%=widget.map.get(constants.PAGE_OFF_DOT_IMAGE)%>"
                             <%if (preOnclickJS != null) {%>	prejsevent="<%=preOnclickJS%>"	<%}
		                    if (postOnclickJS != null)  {%>	postjsevent="<%=postOnclickJS%>" <%}%>
		                             >
                            <div class="kwt100 ktable" konywidgettype = "Ksegment">
                                <div class="kwt100 krow" konywidgettype = "Ksegment">
                                    <div class="middlecenteralign kcell" style="width:30px">
                                        <% evtName = eventName+".prev.event_.Ksegment";%>
                                           <a class="previousArrowNav <% if(focusedIndex == 0){%>inactive<%}%>"
                                          <%if (preOnclickJS != null) {%>	prejsevent="<%=preOnclickJS%>"	<%}
		                    			if (postOnclickJS != null)  {%>	postjsevent="<%=postOnclickJS%>" <%}%>
                                                id=<%=widgetId%> konywidgettype = "Ksegment" eventname=<%=evtName%> pageOnDotImage="<%= widget.map.get(constants.PAGE_ON_DOT_IMAGE)%>"
                             pageOffDotImage="<%=widget.map.get(constants.PAGE_OFF_DOT_IMAGE)%>"></a>
                                    </div>
                                    <div class="middlecenteralign kcell" konywidgettype = "Ksegment">
                                        <div>
                                            <% for (int i = 0; i < segmentdata.size(); i++) {
                                            	request.setAttribute("segmentrowmetainfo", segmentdata.get(i));
                                                segmentboxchildren = segmentActualChildren;
                                                request.setAttribute("currentRow", i);
                                            %>
                                                <%@include file="SegmentHelper1.jsp"%>
                                            <%}%>
                                        </div>
                                         <%if(JSWAPUtil.getBooleanValue(widget.getTable(constants.ISPGINDCTRNEEDED))) {%>
                                        <div>
                                        <div>                                       
                                        <div>
                                              <% for(int j=0; j< segmentdata.size(); j++){
                                                        if(focusedIndex == j){
                                                %> <img src="<%=imgpath%><%=widget.map.get(constants.PAGE_ON_DOT_IMAGE)%>" /><%
                                                        }else{
                                                       %> <img src="<%=imgpath%><%=widget.map.get(constants.PAGE_OFF_DOT_IMAGE)%>" /> <%
                                                        }
                                                }%>
                                        </div>
                                        </div>
                                        </div>
                                          <%} %>
                                                               </div>
                                    <div class="middlecenteralign kcell" style="width:30px">
                                    <% if((focusedIndex + 1) < segmentdata.size()){
                                            evtName = eventName+".next.event_.Ksegment";%>
                                            <a class="nextArrowNav <% if(focusedIndex == segmentdata.size() - 1){%>inactive<%}%>"
                                            <%if (preOnclickJS != null) {%>	prejsevent="<%=preOnclickJS%>"	<%}
		                    if (postOnclickJS != null)  {%>	postjsevent="<%=postOnclickJS%>" <%}%>
                                            id=<%=widgetId%> konywidgettype = "Ksegment" eventname=<%=evtName%>></a>
                                    <%} %>
                                    </div>
                                 </div>
                             </div>
                         </div>
                        <% if(segWidgetSkin != null){%> </div> <% } %> 
                    <% } else { %>
                    	<% if(segWidgetSkin != null){ %> <div class="<%=segWidgetSkin%>grp" style="height:auto;width:100%;overflow:hidden;position:relative;"> <%} %>
                        <% int pageIndex=focusedIndex;  if(focusedIndex == 0){focusedIndex++;pageIndex++;} %>
                        <div id="<%=widgetId%>" konywidgettype="Ksegment"  eventname="<%=widgetId%>event_" name="touchcontainer_Ksegment"
                        <%if (preOnclickJS != null) {%>	prejsevent="<%=preOnclickJS%>"	<%}
		                    if (postOnclickJS != null)  {%>	postjsevent="<%=postOnclickJS%>" <%}%>
                             style="height:auto;width:100%;overflow:hidden;position:relative;" pageOnDotImage="<%= widget.map.get(constants.PAGE_ON_DOT_IMAGE)%>"
                             pageOffDotImage="<%=widget.map.get(constants.PAGE_OFF_DOT_IMAGE)%>">
                            <div id="imgs" index="<%=pageIndex%>" konywidgettype = "Ksegment"
                                 style="float:left;display:inline;-webkit-transition-property: -webkit-transform;-webkit-transition-duration: 0.5s;-webkit-transition-timing-function: ease-out;padding:0px;margin:0px;-webkit-transform: translate3d(0px,0px,0px);">
                                 <% for (int i = 0; i < segmentdata.size(); i++) {
                                     segmentboxchildren = segmentActualChildren;
                                     request.setAttribute("currentRow", i);
                                 %>
                                        <%@include file="SegmentHelper1.jsp"%>
                                 <%}%>
                            </div>
                        </div>
                <%if(JSWAPUtil.getBooleanValue(widget.getTable(constants.ISPGINDCTRNEEDED))) {%>
                        <div class="ktable kbasemargin kwt100" konywidgettype = "Ksegment">
                            <div class="kwt100 krow" align="center" konywidgettype = "Ksegment">
                    <div class="middlecenteralign kwt100 kcell" konywidgettype = "Ksegment">
                    <% for(int j=0; j< segmentdata.size(); j++){
                        if(focusedIndex == j+1){
                                            %> <img src="<%=imgpath%><%=widget.map.get(constants.PAGE_ON_DOT_IMAGE)%>" /><%
                        }else{
                                            %> <img src="<%=imgpath%><%=widget.map.get(constants.PAGE_OFF_DOT_IMAGE)%>" /> <%
                        }
                    }%>
                    </div>
                            </div>
            </div>
                    <%
                    }  if(segWidgetSkin != null){%> </div> <% } 
                    }%>
                <%}
                else if(widget.map.get("sections") != null)
                {
 					if(segWidgetSkin != null){ %> <div class="<%=segWidgetSkin%>grp" style="height:auto;width:100%;overflow:hidden;position:relative;"> <%} 
                    obj = widget.map.get("sections");
                    List sectionList = (List) obj;
                    LuaTable sectionHeaderTemplate = (LuaTable)widget.map.get(constants.SECHDRTMPLT);
                    String widgetSkin = (String)widget.map.get(constants.SECTION_HEADER_SKIN);
                    request.setAttribute("segmentid", widgetId);                   
                    for(int ss=0; ss<sectionList.size(); ss++)
                    {     
                        SectionInfo sInfo = (SectionInfo) sectionList.get(ss);
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
                            request.setAttribute("issectionheader", "true");
                            request.setAttribute("sectionheaderid", sectionHeaderTemplate.map.get("id"));
                        %>
                            <jsp:include page="SegmentHBox.jsp"/>    
                        <%
                        request.removeAttribute("hdrchildrenarray");    
                        request.removeAttribute("issectionheader"); 
                        request.removeAttribute("sectionheaderid");
                        }
                        else
                        {                                                        
                        %>                        
                        <div class="<%=secSkin%>" <% if (ss != 0) {%> style = "margin-top:0px;" <%}%> konywidgettype = "Ksegment">
                            <% if (sInfo.sectionName != null && sInfo.sectionName.trim().length() != 0) {%>
                            <div class="ktable" columns="1" style="width:100%;border:none" konywidgettype = "Ksegment">
                                <div class="krow" style="width:100%;border:none;" konywidgettype = "Ksegment">
                                    <div class="kcell" konywidgettype = "Ksegment">
                                        <%=sInfo.sectionName%>
                                    </div>
                                </div>
                            </div>
                            <%}%>
                        </div>
                        <%} %>
	                    <% if(segWidgetSkin != null){ %>
	                    	<ul style="<%=wSkin%> list-style: none;">
	                    <%}else{ %>
	                    	<ul class="<%=segmentSkin%>grp"  style="<%=wSkin%> list-style: none;">
	                    <%} %>
                           <%for (int i = 0; i < segmentdata.size(); i++) {
                        	   request.setAttribute("segmentrowmetainfo", segmentdata.get(i));
                        	   request.setAttribute("currentRow", i);
                               segmentboxchildren = segmentActualChildren;
                           %>
                                <%@include file="SegmentHelper1.jsp"%>
                            <% }%>
                        </ul>
                    <%}
                    request.removeAttribute("sectionId");
                    if(segWidgetSkin != null){%> </div> <% } 
                }
                else{
 					if(segWidgetSkin != null){ %> <div class="<%=segWidgetSkin%>grp" style="height:auto;width:100%;overflow:hidden;position:relative;"> <%}  
                	request.setAttribute("sectionId", 0);
                    %>
                    <% if(segWidgetSkin != null){ %>
                    	<ul style="<%=wSkin%> list-style: none;">
                    <%}else{ %>
                    	<ul class="<%=segmentSkin%>grp"   style="<%=wSkin%> list-style: none;">
                    <%} %>
                        <% 
                        for (int i = 0; i < segmentdata.size(); i++) { 
                        	request.setAttribute("segmentrowmetainfo", segmentdata.get(i));
                        	request.setAttribute("currentRow", i);
                            segmentboxchildren = segmentActualChildren;
                            %>
                            <%@include file="SegmentHelper1.jsp"%>                      
                        <% }%>
                    </ul>
                <% if(segWidgetSkin != null){%> </div> <% } %>
                <%}
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
		 request.removeAttribute("segpreOnclickJS");
		 request.removeAttribute("segpostOnclickJS"); 
      }%>

