<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="com.kony.web.util.JSWAPUtil"%>
<%
    obj = segmentdata.elementAt(i);
    if (obj != null && obj != com.konylabs.vm.LuaNil.nil)
    {
        segmentrec = (com.konylabs.vm.LuaTable) obj;
        if (i % 2 == 0) 
        {
            segskin = segmentSkin;
        } else {
            segskin = altSkin;
        }
        obj = segmentrec.map.get(KonyServerWidget.MINFO);
        LuaTable rowTemplate = null;
        if(segmentrec.getTable("template") != LuaNil.nil)
        {
        	rowTemplate = (LuaTable)segmentrec.getTable("template");
        	segmentboxchildren = ((LuaTable) rowTemplate.getTable(WEBConstants.CHILDREN)).list;
        }
        rowmetainfo = null;
        
        isRowClickable = widget.getTable(constants.ONCLICK) != LuaNil.nil ? true : false;
        if (obj instanceof com.konylabs.vm.LuaTable)
        {
            rowmetainfo = (com.konylabs.vm.LuaTable) obj;
            objSkin = rowmetainfo.getTable(KonyServerWidget.SKIN);
            if (objSkin != null && objSkin instanceof String)
            {
                segskin = (String) objSkin;
            } else if (objSkin != null && objSkin instanceof com.konylabs.vm.LuaTable)
            {
                segskin = (String) ((com.konylabs.vm.LuaTable) objSkin).getTable(KonyServerWidget.ID);
            }
            objClickable = rowmetainfo.getTable(KonyServerWidget.ISCLICKABLE);
            if (objClickable != null && objClickable instanceof Boolean)
            {
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
                			 && Double.valueOf(request.getAttribute("sectionid").toString()).intValue()  == 
                			 Double.valueOf(request.getAttribute("sectionId").toString()).intValue())
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
        }

        if("true".equals(widget.getTable(constants.SEPERATOR_REQD).toString()) && widget.getTable(constants.SEPTHICKNESS)!= null){
            septhickness= ((Double)(widget.getTable(constants.SEPTHICKNESS))).toString();
        }
        
        String segStyle = "";
        String sepLine = "";
        if (sepcolor != null && sepcolor.trim().length() > 6)
        {
            sepcolor = sepcolor.substring(0, 6);
        }
        segStyle = "style=\"border-color: " + sepcolor + ";border-width: "+ septhickness+ "px; \"";
        sepLine =septhickness + "px" + " solid #" + sepcolor;

        String border = "2";
        if(widget.map.get("border")!= null)
        {
            border =(String)(widget.map.get("border"));
        }

        //preparing list of widgets in segment
        List<String> segmentchildrenlist = new ArrayList<String>();
        LuaTable templates = ((LuaTable)uiState.get("app.templates"));
        for (int j = 0; j < segmentboxchildren.size(); j++)
        {
            String childwidgetid = segmentboxchildren.get(j);
            childWidget = (KonyServerWidget) ((LuaTable) uiState.get(formid)).map.get(childwidgetid);
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
            <%if(!(widget.map.containsKey("ispageindicatorneeded")))
            {%>
                <table class = "<%=segskin%>"
                    <%if("horizontal".equals(segmentorientation)){%>  columns = "<%=segmentchildrenlist.size()%>"<%} else {%> columns = "1" <%}%>
                    <% if (i == 0) {%>
                    style = "<%=wSkin%> border-bottom : <%=sepLine%>;  border-top:<%=sepLine%>; margin:<%=margintop%>; "
                    <%} else if (i != segmentdata.size() - 1) {%>
                    style = "border-bottom:<%=sepLine%>; margin:<%=margininbetween%>;  <%=wSkin%>"
                    <%} else {%>
                    style = "<%=sepLine%>; margin:<%=marginbottom%>; <%=wSkin%>"
                    <%}%>
                >
            <%}
            else 
            { %>
               <table  class = "<%=segskin%>"
                    <%if("horizontal".equals(segmentorientation)){%>  columns = "<%=segmentchildrenlist.size()%>"<%} else {%> columns = "1" <%}%>
               >     
               
            <%} %>
            <tr style = "width:100%;border:none;" valign="middle" align="left" >
            <% if("vertical".equals(segmentorientation)){%>
                <td style = "width:100%;border:none;" class = "<%=segskin%>" valign="middle" align="left" >
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
                if (wapUtil.areSegmentWidgetsVisible(segmentmetadata, segmentrec, childrenlist.toArray(childrenarray))
                		|| "Line".equals(childWidget1.getWidgetType()))
                {                 
                request.setAttribute("childrenarray", childrenlist.toArray(childrenarray));
                request.setAttribute("segmentmetadata", segmentmetadata);
                request.setAttribute("segmentrec", segmentrec);
                request.setAttribute("segmentrow", i);
                request.setAttribute("segmentid", widgetId);
                request.setAttribute("objClickable", objClickable);
                request.setAttribute(WEBConstants.WIDGET_ID, childwidgetId);
                request.setAttribute("rowid", i);

                String cwt = null;
                if (childWidget1.getTable(constants.CONTAINER_WEIGHT) != null)
                {
                        int temp = JSWAPUtil.getIntValue(childWidget1.getTable(constants.CONTAINER_WEIGHT));
                        cwt = Integer.valueOf(temp).toString() + "%";

                }
                //String widgetAlignment = JSWAPUtil.getWidgetAlignmentStyle(childWidget1);
                String childWidgetMargin = "0%"; 
                if (!(childWidget1 instanceof KonyContainer))
                {
                    jspFile = "SegmentHelper.jsp";
                       if (("horizontal".equals(segmentorientation)) && !(childWidget1 instanceof KonyLabel) && !("Link".equals(childWidget1.getTable("wType"))) && !("RichText".equals(childWidget1.getTable("wType"))) && childWidget1.getTable(KonyServerWidget.MARGIN) != null)
                        {
                               // childWidgetMargin = (String) childWidget.map.get(KonyServerWidget.MARGIN);
                                childWidgetMargin = JSWAPUtil.getWidgetMargin(childWidget1);
                        }
                }
                else
                {
                    String orientation = (String) childWidget1.getTable(KonyServerWidget.ORIENTATION);
                    if ((KonyServerWidget.VERTICAL_CONTAINER).equals(orientation)) {
                        jspFile = "SegmentVBox.jsp";
                    }
                    else
                        jspFile = "SegmentHBox.jsp";                    
                }
                %>
                <%if("horizontal".equals(segmentorientation))
                {%>
                    <%if(childVisible) {%>
                        <td style = "width:<%=cwt%>; border:none; padding:<%=childWidgetMargin%>; text-align:<%=childWidget1.map.get(constants.CONTENT_ALIGNMENT)%>;"
                            <%=JSWAPUtil.getWidgetAlignmentStyle(childWidget1)%> >
                        <jsp:include page="<%=jspFile%>" />
                        </td>
                     <%}%>
                <%}
                else 
                {%>
                    <% if (childVisible) {%>
                        <div style = "width:100%; border:none; text-align:<%=childWidget1.map.get(constants.CONTENT_ALIGNMENT)%>;"
                            <%=JSWAPUtil.getWidgetAlignmentStyle(childWidget1)%> >
                        <jsp:include page="<%=jspFile%>" />
                        </div>
                     <%}%>
                <%}%>                
            <% 
            request.removeAttribute("childrenarray");
                } }// end of childnrens in segment row
            %>
            <%if("vertical".equals(segmentorientation)){%>
            </td>
            <%}%>
            </tr>
            </table><%
        }
    }
%>