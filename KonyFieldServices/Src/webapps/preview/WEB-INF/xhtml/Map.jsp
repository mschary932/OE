<%--
    Document   : Map
    Created on : Apr 16, 2012, 12:33:52 PM
    Author     : Maruthi
--%>

<%@page import="com.konylabs.vm.LuaNil"%>
<%@include file="common.jsp"%>


<%
//images, map style, inputURL

            //SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
			String formid = frmId; //(String) uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);
            String cat = "basic";
            String inputURL = "";
            inputURL = "?formid=" + formid + "&cat=" + cat + (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() > 0 ? "&krfid=" + WAPUtilities.getKRFId(request) : "") + "&node=" + request.getAttribute("node.no");

            String wid = (String) widget.getTable("id");
            String mapURL = (String) widget.getTable("url");

            String panupimg = "tupF.png";
            String pandownimg = "tdownF.png";
            String panrightimg = "trightF.png";
            String panleftimg = "tleftF.png";
            String zoom_inimg = "zoomin.png";
            String zoom_outimg = "zoomout.png";

            LuaTable mapimgs = new LuaTable();
            if(widget.map.get(constants.NAV_CONTROL_IMG_CONFIG) != null && widget.map.get(constants.NAV_CONTROL_IMG_CONFIG) != LuaNil.nil) {
                mapimgs = (LuaTable) widget.map.get(constants.NAV_CONTROL_IMG_CONFIG);
                if (mapimgs.map.get("navtop") != LuaNil.nil) {
                    panupimg = (String) mapimgs.map.get("navtop");
                }
                if (mapimgs.map.get("navbottom") != LuaNil.nil) {
                    pandownimg = (String) mapimgs.map.get("navbottom");
                }
                if (mapimgs.map.get("navright") != LuaNil.nil) {
                    panrightimg = (String) mapimgs.map.get("navright");
                }
                if (mapimgs.map.get("navleft") != LuaNil.nil) {
                    panleftimg = (String) mapimgs.map.get("navleft");
                }
                if (mapimgs.map.get("zoomin") != LuaNil.nil) {
                    zoom_inimg = (String) mapimgs.map.get("zoomin");
                }
                if (mapimgs.map.get("zoomout") != LuaNil.nil) {
                    zoom_outimg = (String) mapimgs.map.get("zoomout");
                }
            }
%>

<table>
    <tr>
        <td>
            <a href="<%=response.encodeURL(apppath + inputURL + "&event=10&" + wid + "=0")%>" style = "text-decoration: none;" konywidgettype="Kmap">
                <img id="<%=widget.getTable("id")%>_up_event" src = "<%=imgpath + panupimg%>" alt="" />
            </a>
        </td>
        <td>
            <a href="<%=response.encodeURL(apppath + inputURL + "&event=10&" + wid + "=1")%>" style = "text-decoration: none;" konywidgettype="Kmap">
                <img id="<%=widget.getTable("id")%>_down_event" src = "<%=imgpath + pandownimg%>" alt="" />
            </a>
        </td>
        <td>
            <a href="<%=response.encodeURL(apppath + inputURL + "&event=10&" + wid + "=2")%>" style = "text-decoration: none;" konywidgettype="Kmap">
                <img id="<%=widget.getTable("id")%>_right_event" src = "<%=imgpath + panrightimg%>" alt="" />
            </a>
        </td>
        <td>
            <a href="<%=response.encodeURL(apppath + inputURL + "&event=10&" + wid + "=3")%>" style = "text-decoration: none;" konywidgettype="Kmap">
                <img id="<%=widget.getTable("id")%>_left_event" src = "<%=imgpath + panleftimg%>" alt="" />
            </a>
        </td>
        <td>
            <a href="<%=response.encodeURL(apppath + inputURL + "&event=10&" + wid + "=4")%>" style = "text-decoration: none;" konywidgettype="Kmap">
                <img id="<%=widget.getTable("id")%>_zoomin_event" src = "<%=imgpath + zoom_inimg%>" alt="" />
            </a>
        </td>
        <td>
            <a href="<%=response.encodeURL(apppath + inputURL + "&event=10&" + wid + "=5")%>" style = "text-decoration: none;" konywidgettype="Kmap">
                <img id="<%=widget.getTable("id")%>_zoomout_event" src = "<%=imgpath + zoom_outimg%>" alt="" />
            </a>
        </td>
    </tr>
</table>

<img src="<%=webprotocol + mapURL%>"      alt="Map Widget"/>