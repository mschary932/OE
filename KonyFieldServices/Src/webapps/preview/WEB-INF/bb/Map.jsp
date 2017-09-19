<%--
    Document   : Map
    Created on : Apr 16, 2012, 12:33:52 PM
    Author     : Maruthi
--%>

<%@page import="com.konylabs.api.ui.KonyMap"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@include file="common.jsp"%>


<%
//images, map style, inputURL
        	//SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
            String formid = frmId; //(String) uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);
            String cat = preferredML;
            String inputURL = "";
            inputURL = "?formid=" + formid + "&cat=" + cat + 
                    (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() > 0 ? "&krfid=" + 
                            WAPUtilities.getKRFId(request) : "") + "&node=" + request.getAttribute("node.no");

            String wid, mapURL, mapview, defaultpinimage ="";
            int mapmode =0;
            wid = (String) widget.map.get("id");
            mapURL = (String) widget.getTable("url");
            mapview = (String) widget.map.get(constants.MAP_SRC);

            if(widget.getTable(constants.DEFAULT_PIN_IMG) != null && widget.getTable(constants.DEFAULT_PIN_IMG) != LuaNil.nil)
                defaultpinimage = (String) widget.map.get(constants.DEFAULT_PIN_IMG);

            if(widget.map.get("mode") != null && widget.map.get("mode") != LuaNil.nil)
                mapmode = JSWAPUtil.getIntValue(widget.map.get("mode"));

            if("non-native".equals(mapview) && (mapmode == 5))
                mapview ="polygon";

            if("palm".equalsIgnoreCase(cat) || "nth".equalsIgnoreCase(cat))
                mapview = "static";

    if("static".equals(mapview))
    {
            String panupimg = "tupF.png";
            String pandownimg = "tdownF.png";
            String panrightimg = "trightF.png";
            String panleftimg = "tleftF.png";
            String zoom_inimg = "zoomin.png";
            String zoom_outimg = "zoomout.png";

            LuaTable mapimgs = new LuaTable();
            if(widget.map.get(constants.NAV_CONTROL_IMG_CONFIG) != null && 
                    widget.map.get(constants.NAV_CONTROL_IMG_CONFIG) != LuaNil.nil)
            {
                mapimgs = (LuaTable) widget.map.get(constants.NAV_CONTROL_IMG_CONFIG);

                if (mapimgs.map.get(constants.NAV_TOP) != LuaNil.nil) {
                    panupimg = (String) mapimgs.map.get(constants.NAV_TOP);
                }
                if (mapimgs.map.get(constants.NAV_BOTTOM) != LuaNil.nil) {
                    pandownimg = (String) mapimgs.map.get(constants.NAV_BOTTOM);
                }
                if (mapimgs.map.get(constants.NAV_RIGHT) != LuaNil.nil) {
                    panrightimg = (String) mapimgs.map.get(constants.NAV_RIGHT);
                }
                if (mapimgs.map.get(constants.NAV_LEFT) != LuaNil.nil) {
                    panleftimg = (String) mapimgs.map.get(constants.NAV_LEFT);
                }
                if (mapimgs.map.get(constants.ZOOM_IN) != LuaNil.nil) {
                    zoom_inimg = (String) mapimgs.map.get(constants.ZOOM_IN);
                }
                if (mapimgs.map.get(constants.ZOOM_OUT) != LuaNil.nil) {
                    zoom_outimg = (String) mapimgs.map.get(constants.ZOOM_OUT);
                }
            }

        %>

        <table>
            <tr>
                <td>
                    <a href="#" eventnumber="0" namet="<%=wid%>" style = "text-decoration: none;" konywidgettype="Kmap">
                        <img id="<%=wid%>_up_event" src = "<%=imgpath + panupimg%>" alt="" konywidgettype = "Kmap"
                        <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>
                        prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                        <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> 
                        postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
                             />
                    </a>
                </td>
                <td>
                    <a href="#" eventnumber="1" namet="<%=wid%>"   style = "text-decoration: none;" konywidgettype="Kmap">
                        <img id="<%=wid%>_down_event" src = "<%=imgpath + pandownimg%>" alt="" konywidgettype = "Kmap" />
                    </a>
                </td>
                <td>
                    <a href="#" eventnumber="2" namet="<%=wid%>"  style = "text-decoration: none;" konywidgettype="Kmap">
                        <img id="<%=wid%>_right_event" src = "<%=imgpath + panrightimg%>" alt="" konywidgettype = "Kmap" />
                    </a>
                </td>
                <td>
                    <a href="#" eventnumber="3" namet="<%=wid%>"   style = "text-decoration: none;" konywidgettype="Kmap">
                        <img id="<%=wid%>_left_event" src = "<%=imgpath + panleftimg%>" alt="" konywidgettype = "Kmap" />
                    </a>
                </td>
                <td>
                    <a href="#" eventnumber="4" namet="<%=wid%>"   style = "text-decoration: none;" konywidgettype="Kmap">
                        <img id="<%=wid%>_zoomin_event" src = "<%=imgpath + zoom_inimg%>" alt=""  konywidgettype = "Kmap"/>
                    </a>
                </td>
                <td>
                    <a href="#" eventnumber="5" namet="<%=wid%>"   style = "text-decoration: none;" konywidgettype="Kmap">
                        <img id="<%=wid%>_zoomout_event" src = "<%=imgpath + zoom_outimg%>" alt="" konywidgettype = "Kmap" />
                    </a>
                </td>
            </tr>
        </table>

        <img src="<%=webprotocol + mapURL%>"      alt="Map Widget" class="" 
             style ="margin:<%=JSWAPUtil.getWidgetMargin(widget)%>; width:<%=JSWAPUtil.adjustedWeightForMargin(widget, "100")%>; "/>
        
    <%
    } 
    else if("native".equals(mapview))
    {
        String path  = uiState.getStringValue(formid + "."+ wid +".mapnativedata");
    %>
        <a href="<%=webprotocol+path%>" >Google Map Name</a>

    <%}
     else {
           //default view is non native map.     
        String wdata = formid + "."+ wid +".widgetdata";        
        if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
        {
            wdata = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+ "."+ wid +".widgetdata";  
        }
        if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
        {
            wdata = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+ "."+ wid +".widgetdata";  
        }
        if(request.getAttribute("tabpaneid") != null)
        {
             wdata = frmId +"."+request.getAttribute("tabpaneid")+ "."+ wid +".widgetdata";  
             
        }
        String onpinclick;      
        if(widget.map.get(constants.ONPINCLICK)!= null && widget.map.get(constants.ONPINCLICK)!= LuaNil.nil )
            onpinclick = "true";
        else
            onpinclick ="false";

        if(uiState.getWidgetData(wdata).length()>2)
        {%>
            <div id = "<%=wid%>" name="map_canvas" onpinselect="<%=onpinclick%>"  konywidgettype = "Kmap" class ="" 
                style="width: 100%; height:500px; <%=JSWAPUtil.getWidgetStyleInfo(widget, true)%> "
                mapview ="<%=KonyMap.mapview[mapmode]%>" index ="<%= widget.getTable("index")%>" 
                droppin ="<%=widget.getTable(constants.DROP_PIN)%>"
                apishowcallout ="<%= widget.getTable(constants.API_SHOWCALLOUT)%>" 
                konywidgetdata = '<%=uiState.getWidgetData(wdata)%>'
                mapclientid = '<%= widget.getTable(constants.MAP_CLIENT_ID) %>'
                fromonselection ="<%= widget.getTable(constants.FROM_ONSELECTION)%>"
                <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>
                prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                <%}if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> 
                postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
            ></div>
        <%}%>
    <%
    }%>    
