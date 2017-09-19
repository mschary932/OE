<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="com.kony.web.util.JSWAPUtil"%>
<%
    obj = segmentdata.elementAt(i);
    if (obj != null && obj != LuaNil.nil)
    {
        segmentrec = (LuaTable) obj;
        if (i % 2 == 0)
            segskin = segmentSkin;
        else
            segskin = altSkin;

        obj = segmentrec.map.get(KonyServerWidget.MINFO);
        LuaTable rowTemplate = null;
        if(segmentrec.getTable("template") != LuaNil.nil)
        {
        	rowTemplate = (LuaTable)segmentrec.getTable("template");
        	segmentboxchildren = ((LuaTable) rowTemplate.getTable(WEBConstants.CHILDREN)).list;
        }
        rowmetainfo = null;
        //isRowClickable = true;
        isRowClickable = widget.getTable(constants.ONCLICK) != LuaNil.nil ? true : false;
        if (obj instanceof com.konylabs.vm.LuaTable && obj != LuaNil.nil)
        {
            rowmetainfo = (com.konylabs.vm.LuaTable) obj;
            objSkin = rowmetainfo.getTable(KonyServerWidget.SKIN);
            if (objSkin != null && objSkin instanceof String) {
                segskin = (String) objSkin;
            } else if (objSkin != null && objSkin instanceof com.konylabs.vm.LuaTable) {
                segskin = (String) ((com.konylabs.vm.LuaTable) objSkin).getTable(KonyServerWidget.ID);
            }
            objClickable = rowmetainfo.getTable(KonyServerWidget.ISCLICKABLE);
            if (objClickable != null && objClickable instanceof Boolean) {
                isRowClickable = (Boolean) objClickable;
            }            
        }

        focusedRow = false;
        if(selectedRows != null )
        {
            for(Object index : selectedRows)
            {
            	if(index instanceof Double)
            		index = Double.valueOf(index.toString()).intValue();
                if( Integer.parseInt(index.toString()) == i+(int)constants.INDEXJL)
                {
                	if(request.getAttribute("sectionid") != null && request.getAttribute("sectionId") != null 
                			 && Double.valueOf(request.getAttribute("sectionid").toString()).intValue()  == Double.valueOf(request.getAttribute("sectionId").toString()).intValue())
                		{
                			focusedRow = true;                	
    		                if(!"".equals(focusSkin))
    		                        segskin = focusSkin;
    		                break;
                		}                			
               	}
                	
             }
        }

        String sepcolor ="000000";
        String septhickness ="0";
        Double d ;             
        
        if("true".equals(widget.getTable(constants.SEPERATOR_REQD).toString()) && widget.getTable(constants.SEPCOLOR)!= null){
            sepcolor = ((String)(widget.getTable(constants.SEPCOLOR)));
            if(widget.getTable(constants.SEPERATOR_TRANSPARENCY) != null)
                sepcolor = sepcolor + widget.getTable("separatorTransparency");
        }
        
        if("true".equals(widget.getTable(constants.SEPERATOR_REQD).toString()) && widget.getTable(constants.SEPTHICKNESS)!= null){
            septhickness= ((Double)(widget.getTable(constants.SEPTHICKNESS))).toString();
        }
        
        String segStyle = "";
        String sepLine = "";
        if (sepcolor != null && sepcolor.trim().length() > 6)
        {
            //sepcolor = sepcolor.substring(0, 6);
            if (!JSWAPUtil.hasAlphaInColor(sepcolor))
            {
                sepcolor = JSWAPUtil.getRGBHex(sepcolor);
                sepcolor = "#" + sepcolor;
            }
            else
            {
                sepcolor =  "#" + JSWAPUtil.convertHexToRGBA(sepcolor);
            }
        }
        
        segStyle = "style=\"border-color: " + sepcolor + ";border-width: "+ septhickness+ "px; \"";
        sepLine =septhickness + "px" + " solid " + sepcolor;

        String border = "2";
        if(widget.map.get("border")!= null){
            border =(String)(widget.map.get("border"));
        }

        List<String> segmentchildrenlist = new ArrayList<String>();
        Object childWidgetObj = null;
        LuaTable templates = ((LuaTable)uiState.get("app.templates"));
        for (int j = 0; j < segmentboxchildren.size(); j++)
        {
            String childwidgetid = segmentboxchildren.get(j);
            childWidget = (KonyServerWidget)((LuaTable) uiState.get(formid)).map.get(childwidgetid);
            if(childWidget == null){
                if(rowTemplate != null)
                    childWidget = (KonyServerWidget)rowTemplate.map.get(childwidgetid);
                else
                    childWidget = (KonyServerWidget)((LuaTable)templates.getTable(segmentboxId)).map.get(childwidgetid);
            }
            if (!(childWidget instanceof KonyContainer)) {
                segmentchildrenlist.add(segmentboxchildren.get(j));
            }
            if (childWidget instanceof KonyContainer) {
                List<String> segmentchildrenlist1 = jswapUtil.generateSegmentWidgetVisibilityCheck(childWidget, formid, uiState);
                for (int s = 0; s < segmentchildrenlist1.size(); s++) {
                    segmentchildrenlist.add(segmentchildrenlist1.get(s));
                }
            }
        }

        String[] segmentchildrenarray = new String[segmentchildrenlist.size()];

        if (wapUtil.areSegmentWidgetsVisible(segmentmetadata, segmentrec, segmentchildrenlist.toArray(segmentchildrenarray)))
        {
        String dfltSelection = "false";
        %>
         <%if(!(KonySegmentUI.VIEW_TYPE_PAGE.equals(widget.map.get(constants.VIEW_TYPE)) || "pageview".equals(widget.map.get("view"))))
        {%>
            <% if(border.equals("0")){ %>
                <%if(i == 0) {%>
                    <li class="<%=segskin%> " style="border-bottom:<%=sepLine%>; border-top:<%=sepLine%>;">
                <% }else if(i!=(segmentdata.size()-1) ){ %>
                    <li class="<%=segskin%> " style="border-bottom:<%=sepLine%>;">
                <% } %>
            <%} else if(border.equals("1")){ %>
                    <li class="<%=segskin%> " style="border-bottom:<%=sepLine%>; ">
            <%} else if(border.equals("2")){ %>
                <%if(i == 0) {%>
                    <li class="<%=segskin%> " style="border-bottom:<%=sepLine%>; border-top:<%=sepLine%>;">
                <% }else{ %>
                    <li class="<%=segskin%> " style="border-bottom:<%=sepLine%>;">
                <% } %>
            <%} else if(border.equals("3")) {%>
                <%if(i==0 && segmentdata.size()>1) {%>
                        <li class="<%=segskin%> " style="border-bottom:<%=sepLine%>;">
                <%}else if((i== segmentdata.size()-1) && segmentdata.size()>1){ %>
                        <li class="<%=segskin%> " >
                <%}else if( segmentdata.size()>1){ %>
                        <li class="<%=segskin%> " style="border-bottom:<%=sepLine%>;">
                 <%} %>
            <%}%>
        <%}
        else
        {%>
            <%if("palm".equalsIgnoreCase(preferredML) || "nth".equalsIgnoreCase(preferredML)){%>
                <div id="<%=segmentId %>" class="<%=segskin%>" konywidgettype = "KTouchsegment" <% if(i != focusedIndex){ %>  style="display:none" <%}%> >
            <%} else { %>
                <div id="<%=segmentId %>" class="<%=segskin%>" konywidgettype = "KTouchsegment"
                     <%if(i+1 != focusedIndex){ %>
                        style="display:inline; width: 100%; float: left;"
                     <%}else{%>
                        style="display:block; width: 100%; float: left;"
                     <%}%>
                 >
            <% } %>
        <%}

        if(isRowClickable)
        {%>
            <div rowid="<%=i %>" eventname="<%=eventName %>event_" href="#" konywidgettype = "Ksegment"
            <%if (request.getAttribute("segpreOnclickJS") != null) {%> prejsevent="<%=request.getAttribute("segpreOnclickJS")%>" <%}
            	if (request.getAttribute("segpostOnclickJS") != null) {%> prejsevent="<%=request.getAttribute("segpostOnclickJS")%>" <%}%>
                 kblockinskin ="<%=widget.map.get(constants.BLOCKED_UI_SKIN)%>" kprogressskin="<%=segskin%>"
                 <%if(request.getAttribute("sectionId") != null) { %> sectionid = <%= request.getAttribute("sectionId")%> <%} %>
                 >
        <%}%>
            <div class="ktable kwt100 kbasemargin   <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(widget)%> "
                 konywidgettype = "Ksegment"
                <%if("horizontal".equals(segmentorientation)){%> columns = "<%=segmentchildrenlist.size()%>" <%} else {%> columns = "1" <%}%>
             >
             <%if("horizontal".equals(segmentorientation)){%>
                <div class="krow <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(widget)%> "   konywidgettype = "Ksegment" style = "width:100%;border:none;">
             <%}%>
            <%
            KonyServerWidget childWidget1 = null;
            LuaTable segmentBox = null;
            for (String s : segmentboxchildren)
            {
                childWidget1 = (KonyServerWidget) ((LuaTable) uiState.get(formid)).map.get(s);
                if(childWidget1 == null)
                {
                    segmentBox = (LuaTable)templates.map.get(segmentboxId);
                    if(segmentBox != null)
                    	childWidget1 = (KonyServerWidget)segmentBox.map.get(s);
                    if(childWidget1 == null && rowTemplate != null)
                    {
                        //get it form template
                        childWidget1 = (KonyServerWidget)rowTemplate.map.get(s);
                        request.setAttribute("segmentbox", rowTemplate);
                    }
                    else
                    {
                        request.setAttribute("segmentbox", segmentBox);
                    }
                }
                Boolean childVisible = (Boolean) childWidget1.getTable(constants.ISVISIBLE);
                String childwidgetId = (String) childWidget1.getTable(KonyServerWidget.ID);
                jspFile = childWidget1.getWidgetType() + WEBConstants.JSP_EXTENSION;
                List<String> childrenlist = new ArrayList<String>();

                if (childVisible)
                {
                    if (!(childWidget1 instanceof KonyContainer)) {
                        childrenlist.add(childwidgetId);
                    }
                    if (childWidget1 instanceof KonyContainer) {
                        List<String> segmentchildrenlist1 = jswapUtil.generateSegmentWidgetVisibilityCheck(childWidget1, formid, uiState);
                        for (int t = 0; t < segmentchildrenlist1.size(); t++) {
                            childrenlist.add(segmentchildrenlist1.get(t));
                        }
                    }
                }
                String[] childrenarray = new String[childrenlist.size()];

               if (wapUtil.areSegmentWidgetsVisible(segmentmetadata, segmentrec, childrenlist.toArray(childrenarray)) ||
            		   "Line".equals(childWidget1.getWidgetType()))
               {
                request.setAttribute("childrenarray", childrenlist.toArray(childrenarray));
                request.setAttribute("segmentrec", segmentrec);
                request.setAttribute("segmentmetadata", segmentmetadata);
                request.setAttribute("segmentrow", focusedIndex);
                request.setAttribute("segmentid", widgetId);
                request.setAttribute("objClickable", objClickable);
                request.setAttribute(WEBConstants.WIDGET_ID, childwidgetId);
                request.setAttribute("rowid", i);

                String cwt = childWidget1.getTable(constants.CONTAINER_WEIGHT) + "%";
                String widgetAlignment = JSWAPUtil.getWidgetAlignmentStyle(childWidget1);


                if (!(childWidget1 instanceof KonyContainer))
                {
                    jspFile = "SegmentHelper.jsp";
                }
                else
                {
                    String orientation = (String) childWidget1.getTable(KonyServerWidget.ORIENTATION);
                    if ((KonyServerWidget.VERTICAL_CONTAINER).equals(orientation)) {
                        jspFile = "SegmentVBox.jsp";
                    }
                    else {
                        jspFile = "SegmentHBox.jsp";
                    }
                }
                %>
                <%if (childVisible)
                {%>
                    <%if("vertical".equals(segmentorientation)){%>
                        <div class="krow <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(widget)%> "  konywidgettype = "Ksegment" style = "width:100%;border:none;">
                    <%}%>
                    <div class="kcell <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(childWidget1)%> " <%=segmentWidget.map.get(WEBConstants.ENABLED)%> style ="width: <%=cwt%>; "  konywidgettype = "Ksegment"  >
                            <jsp:include page="<%=jspFile%>" />
                    </div>
                    <%if("vertical".equals(segmentorientation)){%>
                        </div>
                    <%}%>
                <%}
                request.removeAttribute("childrenarray");
            }

                 }
            %>
            <%if("horizontal".equals(segmentorientation)){%>
                    </div>
            <%}
            %>
            </div>
            <%if(isRowClickable)
            {%>
                </div>
            <%} %>
            <% if(KonySegmentUI.VIEW_TYPE_PAGE.equals(widget.map.get(constants.VIEW_TYPE)) || "pageview".equals(widget.map.get("view"))){
             %>
                </div>
            <%}%>
           <%if(!(KonySegmentUI.VIEW_TYPE_PAGE.equals(widget.map.get(constants.VIEW_TYPE)) || "pageview".equals(widget.map.get("view")))) {%>
                        </li>
            <%}%>
                <%
        }
    }
%>