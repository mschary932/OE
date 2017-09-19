<%--
Document   : Datagrid
Created on : Apr 19, 2012, 1:27:09 PM
Author     : Maruthi
--%>

<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="java.util.Vector"%>
<%@include file="common.jsp"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.ArrayList"%>

<%

//not supporting grid line color and style.
            String dataGridId = (String) widget.getTable("id");
            String path = frmId + dataGridId;
            Boolean multiclick = JSWAPUtil.getBooleanValue(widget.getTable(constants.ISMULTICLICK));
            String cat = "bjs";
            String inputURL = "";
            inputURL = "?formid=" + frmId + "&cat=" + cat + (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() > 0 ? "&krfid=" + WAPUtilities.getKRFId(request) : "") + "&node=" + request.getAttribute("node.no");

            Object skin = "", focusskin = "", headerskin = "", alternateskin = "";

            skin = widget.getTable(constants.ROWNORMALSKIN);
            focusskin = widget.getTable(constants.ROW_FOCUS_SKIN);
            if (focusskin == LuaNil.nil) {
                focusskin = skin;
            }

            headerskin = widget.getTable(constants.HEADER_ROW_SKIN);
            if (headerskin == null || (headerskin instanceof com.konylabs.vm.LuaNil)) {
                headerskin = skin;
            }

            alternateskin = widget.getTable(constants.ROWALTERNATESKIN);
            if (alternateskin == null || (alternateskin instanceof com.konylabs.vm.LuaNil)) {
                alternateskin = skin;
            }

            boolean eventExist = false;
            if(widget.map.get(constants.ONROWSELECTED) != null && widget.map.get(constants.ONROWSELECTED) != LuaNil.nil
                && !"disabled".equals(widget.map.get(WEBConstants.ENABLED)))
                eventExist = true;

            Object weightSelector = "";
            Boolean showcolumnheaders = JSWAPUtil.getBooleanValue(widget.getTable(constants.SHOW_COLUMN_HEADERS));
            LuaTable columndata = (LuaTable) widget.getTable(constants.COLUMN_HEADERS_CONFIG);
            Vector<LuaTable> v = (Vector<LuaTable>) columndata.list;
            String columnId = "";
            Boolean isheader = true;

            int i = -1;

            String widgetMargin = JSWAPUtil.getWidgetMargin(widget);
            String widgetPadding = JSWAPUtil.getWidgetPadding(widget);
            String width = JSWAPUtil.adjustedWeightForMarginandPadding(widget, "100");

%>

<div columns = "<%=columndata.size()%>" class="ktable <%=skin%> middlecenteralign"
       style="width:<%=width%>; margin: <%=widgetMargin%>; padding: <%=widgetPadding%>;" konywidgettype="Kdatagrid"
       >
    <% if (showcolumnheaders) {%>
            
    <div class="<%=headerskin%>tb ktable middlecenteralign kwt100  "  konywidgettype = "Kdatagrid" >
    <div class="<%=headerskin%>tr krow middlecenteralign kwt100" konywidgettype="Kdatagrid">

        <%
        	
             for (LuaTable column : v) {
                 columnId = (String) column.getTable(constants.COLUMN_ID);
                 ++i;
                 weightSelector = column.getTable(constants.COLUMN_WIDTH_IN_PERCENTAGE);
                 boolean headerEventExist = false; 
                 if(widget.map.get("columnHeadersConfig") != null && widget.map.get("columnHeadersConfig") != LuaNil.nil)
     			{
     	   
     				LuaTable columnconfig = (LuaTable)widget.map.get("columnHeadersConfig");
     				LuaTable columnconfigrec = (LuaTable)columnconfig.list.get(i);
     				if(columnconfigrec.map.get("columnOnClick") != null && columnconfigrec.map.get("columnOnClick") != LuaNil.nil)
     				{
     					headerEventExist = true;
     				}
     			}

        %>
        <div class="<%=headerskin%> kcell middlecenteralign" style="padding: <%=widgetPadding%>; width: <%=weightSelector%>%"
                konywidgettype="Kdatagrid">
            <label
                eventname="<%=dataGridId%>.-1,<%=i%>.event_.Kdatagrid"         
                rowid="-1"
                colid="<%=i %>"
                konywidgettype="datagrid_Klabel"
                <% if (headerEventExist) { %>
                event ="yes"
                <% } %>
                >
                <%=column.getTable(constants.COLUMN_HEADER_TEXT)%>
            </label>
        </div>
        <%     }%>
    </div>
    </div>    

    <% }%>
    <%

                Object widgetData = widget.map.get("data");
                if (widgetData != null) {
                    Object datagridskin = ""; Object cellskin = "";
                    java.util.Vector data = (java.util.Vector) widgetData;
                    com.konylabs.vm.LuaTable recdata = null;

                    Object objselected = null;
                    Object objSkin = null;
                    com.konylabs.vm.LuaTable rowmetainfo = null;
                    Object tmpcellskinobj = null;
                    com.konylabs.vm.LuaTable cellskinobj = null;
                    Double selectedRow = null;
                    com.konylabs.vm.LuaTable selectedRows = null;

                    if (multiclick) {
                        objselected = widget.map.get(constants.SELECTEDINDICES);
                        if (objselected != null && objselected instanceof com.konylabs.vm.LuaTable) {
                            selectedRows = (com.konylabs.vm.LuaTable) objselected;
                        }
                    } else {
                        objselected = widget.map.get(constants.FOCUSED_INDEX);
                        if (objselected != null && objselected instanceof Double) {
                            selectedRow = (Double) objselected;
                        }
                    }

                    i = -1;
                    for (int j = 0; j < data.size(); j++) {
                        ++i;
                        int k = 0;
                        widgetData = data.elementAt(j);
                        if (widgetData != null && widgetData != com.konylabs.vm.LuaNil.nil) {
                            recdata = (com.konylabs.vm.LuaTable) widgetData;
                            if (j % 2 == 0) {
                                datagridskin = skin;
                            } else {
                                datagridskin = alternateskin;
                            }
                            if (multiclick) {
                                if (selectedRows != null) {
                                    for (Object index : selectedRows.list) {
                            if ((Double) index == i + + constants.INDEXJL) {
                                            datagridskin = focusskin;
                                            break;
                                        }
                                    }
                                }
                            } else {
                                if (selectedRow != null) {
                            if ((Double) selectedRow == i + constants.INDEXJL) {
                                        datagridskin = focusskin;
                                    }
                                }
                            }

                            widgetData = recdata.getTable("metainfo");
                            rowmetainfo = null;
                            if (widgetData instanceof com.konylabs.vm.LuaTable) {
                                rowmetainfo = (com.konylabs.vm.LuaTable) widgetData;
                                objSkin = rowmetainfo.getTable("skin");
                                if (objSkin != null && objSkin instanceof String) {
                                    datagridskin = (String) objSkin;
                                }
                            }
                        }
    %>
    <%if(eventExist) { %>
                <a style="text-decoration:none"    konywidgettype = "Kdatagrid"
               href="#"
               colid="-1"
               eventname="<%=dataGridId %>.<%=i%>,-1.event_.Kdatagrid"   
        rowid="<%=i%>"
               > 
      <%}%>
      <div class="<%=datagridskin%>tb ktable middlecenteralign kwt100" konywidgettype="Kdatagrid" >
    <div  class="<%=datagridskin%>tr krow middlecenteralign kwt100" konywidgettype="Kdatagrid">
        <%
            for (LuaTable column : v) {
                columnId = (String) column.getTable(constants.COLUMN_ID);
                weightSelector = column.getTable(constants.COLUMN_WIDTH_IN_PERCENTAGE);

                String columnContentAlignment = "";
                if(column.getTable(constants.COLUMN_CONTENT_ALIGNMENT) != null 
                        && !(column.getTable(constants.COLUMN_CONTENT_ALIGNMENT) instanceof LuaNil))
                    columnContentAlignment = (String) column.getTable(constants.COLUMN_CONTENT_ALIGNMENT);

                String colskin = columnId + "_skin";
                tmpcellskinobj = recdata.getTable(colskin);
                if (tmpcellskinobj == com.konylabs.vm.LuaNil.nil && rowmetainfo != null) {
                    tmpcellskinobj = rowmetainfo.getTable(colskin);
                }

                if (tmpcellskinobj != com.konylabs.vm.LuaNil.nil) {
                    cellskin = tmpcellskinobj;
                } else {
                    cellskin = datagridskin;
                }
        %>
        <%if("palm".equalsIgnoreCase(preferredML)){%>
        	<div class="<%=cellskin%>tb kcell <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(widget)%>" 
                style="padding: <%=widgetPadding%>; width: <%=weightSelector%>%; text-align: <%=columnContentAlignment%>"
                    konywidgettype="Kdatagrid">
        <%}else{ %>
        	<div class="<%=cellskin%> kcell <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(widget)%>" 
                style="padding: <%=widgetPadding%>; width: <%=weightSelector%>%; text-align: <%=columnContentAlignment%>"
                    konywidgettype="Kdatagrid">
        <%}%>

                <% if (column.getTable(constants.COLUMN_TYPE).equals("text")) {%>
                <label
                    eventname="<%=dataGridId%>.<%=i%>,<%=k%>.event_.Kdatagrid"
                    rowid="<%=i%>"
                    konywidgettype="datagrid_Klabel"
                    <%if(eventExist){ %>
                     event = "yes"
                    <% }%>
                    >
                    <%=	recdata.getTable(columnId)%>
                </label>
                <% } else {
                     String imgName = "";
                     if(recdata.getTable(columnId) != null)
                        imgName = recdata.getTable(columnId).toString();
                     if(!imgName.startsWith("http"))
                        imgName = imgpath + imgName;
                %>
                <img
                    src = "<%=imgName%>"       style="width:100%;"             alt = ""
                    eventname="<%=dataGridId%>.<%=i%>,<%=k%>.event_.Kdatagrid"
                    rowid="<%=i%>"                     colid="<%=k%>"                    />
                <% }%>
        </div>
        <%     k++;
                                        }%>
    </div>
    </div>
    <%if(eventExist) { %>            
            </a>
           <% } %>
    <% }

                }//end for no of rows %>
</div>

