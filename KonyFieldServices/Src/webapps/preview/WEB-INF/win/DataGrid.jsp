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
            if (focusskin == null || (focusskin instanceof com.konylabs.vm.LuaNil)) {
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
            String widgetAlignment = JSWAPUtil.getWidgetAlignmentStyle(widget);

%>

<table columns = "<%=columndata.size()%>" class="<%=skin%>"
       style="width:<%=width%>; margin: <%=widgetMargin%>; padding: <%=widgetPadding%>;"
       >
    <% if (showcolumnheaders) {%>
    <tr valign="middle" align="center">

        <%
             for (LuaTable column : v) {
                 columnId = (String) column.getTable(constants.COLUMN_ID);
                 ++i;
                 weightSelector = column.getTable(constants.COLUMN_WIDTH_IN_PERCENTAGE);

        %>
        <td class="<%=headerskin%> " style="padding: <%=widgetPadding%>; width: <%=weightSelector%>%" valign="middle" align="center">

            <%
                             if (eventExist) {

            %>
            <a style="text-decoration:none"    konywidgettype = "Kdatagrid"
               href="<%=response.encodeURL(apppath + inputURL + "&" + dataGridId + "." + "-1" + ",0.event_.Kdatagrid=x&colid=" + i + "&rowid=-1")%>"
               >
                <label
                    eventname="<%=dataGridId%>.-1,<%=i%>.event_.Kdatagrid"         rowid="-1"
                    >
                    <%=column.getTable(constants.COLUMN_HEADER_TEXT)%>
                </label> </a>
                <% } else {%>
            <label
                eventname="<%=dataGridId%>.-1,<%=i%>.event_.Kdatagrid"         rowid="-1"
                >
                <%=column.getTable(constants.COLUMN_HEADER_TEXT)%>
            </label>
            <% }%>
        </td>
        <%     }%>
    </tr>
    <% }%>
    <%
                isheader = false;
                //String wData = frmId + "." + dataGridId + ".data";
                //String selectedindices = frmId + "." + dataGridId + ".selectedindices";
                //String focusIndex = frmId + "." + dataGridId + ".focusedindex";

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

    <tr  valign="middle" align="center"        >
        <%
                                        boolean firstcolumn = true;
                                        for (LuaTable column : v) {
                                            columnId = (String) column.getTable(constants.COLUMN_ID);
                                            weightSelector = column.getTable(constants.COLUMN_WIDTH_IN_PERCENTAGE);
                                            String colskin = columnId + "_skin";
                                            String columnContentAlignment = "";
                                            if(column.getTable(constants.COLUMN_CONTENT_ALIGNMENT) != null && 
                                                    !(column.getTable(constants.COLUMN_CONTENT_ALIGNMENT) instanceof LuaNil))
                                                columnContentAlignment = (String) column.getTable(constants.COLUMN_CONTENT_ALIGNMENT);
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
        <td class="<%=cellskin%> " style="padding: <%=widgetPadding%>; width: <%=weightSelector%>%;text-align: <%=columnContentAlignment%>" <%=widgetAlignment%>>

            <%
                                                    if (eventExist && ((isheader && (column.getTable(constants.IS_COLUMN_SORTABLE).equals("true"))) || firstcolumn)) {

            %>


            <a style="text-decoration:none"    konywidgettype = "Kdatagrid"
               href="<%=response.encodeURL(apppath + inputURL + "&" + dataGridId + "." + i + ",0.event_.Kdatagrid=x&colid=0&rowid=" + i)%>"
               >
                <% if (column.getTable(constants.COLUMN_TYPE).equals("text")) {%>
                <label
                    eventname="<%=dataGridId%>.<%=i%>,<%=k%>.event_.Kdatagrid"
                    rowid="<%=i%>"
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
                    src = "<%=imgName%>"      style="width:100%;"              alt = ""
                    eventname="<%=dataGridId%>.<%=i%>,<%=k%>.event_.Kdatagrid"
                    rowid="<%=i%>"                     colid="<%=k%>"                    />
                <% }%>
            </a>
            <% } else {%>

            <% if (column.getTable(constants.COLUMN_TYPE).equals("text")) {%>
            <label
                eventname="<%=dataGridId%>.<%=i%>,<%=k%>.event_.Kdatagrid"
                rowid="<%=i%>"
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
                src = "<%=imgName%>"   style="width:100%;"             alt = ""
                eventname="<%=dataGridId%>.<%=i%>,<%=k%>.event_.Kdatagrid"
                rowid="<%=i%>"                colid="<%=k%>"                />

            <% }
                                                    }%>
        </td>
        <%     k++;
                                            firstcolumn = false;
                                        }%>
    </tr>

    <% }

                }//end for no of rows %>
</table>

