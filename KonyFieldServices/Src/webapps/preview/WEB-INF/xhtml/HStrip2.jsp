<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Vector"%>
<%@page import="com.konylabs.api.ui.KonyTab"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>

<%@include file="common.jsp"%>

<%
	//SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
	String formid = frmId; //(String) uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);
    String widgetid = (String) request.getAttribute("wid");
    String widgetRefStr = formid + "." + widgetid;

    Boolean showarrows = false;
    showarrows = (Boolean) widget.map.get(constants.SHOW_ARROWS);
    String leftarrowimage = imgpath + "previous.png";
    String rightarrowimage = imgpath + "next.png";
    if (showarrows != null && showarrows == true) {
        if (widget.map.get(constants.LEFT_ARROW_IMG) != null) {
            leftarrowimage = (String) widget.map.get(constants.LEFT_ARROW_IMG);
            if (!leftarrowimage.startsWith("http")) {
                leftarrowimage = imgpath + leftarrowimage;
            }
        }
        if (widget.map.get(constants.RIGHT_ARROW_IMG) != null) {
            rightarrowimage = (String) widget.map.get(constants.RIGHT_ARROW_IMG);
            if (!rightarrowimage.startsWith("http")) {
                rightarrowimage = imgpath + rightarrowimage;
            }
        }
    } else {
        showarrows = false;
    }

    if (request.getAttribute(WEBConstants.FORM_HEADER_ID) != null) {
        widgetRefStr = "app.headers." + request.getAttribute(WEBConstants.FORM_HEADER_ID) + "." + widgetid;
    }
    if (request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null) {
        widgetRefStr = "app.footers." + request.getAttribute(WEBConstants.FORM_FOOTER_ID) + "." + widgetid;
    }
    if (request.getAttribute("tabpaneid") != null) {
        widgetRefStr = frmId + "." + request.getAttribute("tabpaneid") + "." + widgetid;
    }
%>
<%if (uiState.getBoolValue(widgetRefStr + "." + constants.ISVISIBLE)) {%>

<input type="hidden" id="<%=widgetid%>Skin"/>
<input type="hidden" id="<%=widgetid%>FocusSkin"/>  
<%
    Object objhimgstrip = uiState.get(widgetRefStr + ".ilist");
    if (objhimgstrip != null) {
        if (widget != null && widget.map.get(constants.ONSELECTION) != null) {
            event = "yes";
        } else {
            event = "no";
        }
        String imgSkin = uiState.getStringValue(widgetRefStr + ".skin");
        java.util.Vector datahimgstrip = (java.util.Vector) objhimgstrip;
        String imghimgstrip = "";
        int focusedindex = uiState.getIntValue(widgetRefStr + "."+ constants.FOCUSED_INDEX);
        int size = datahimgstrip.size();
        int startRecord = 0;
        int endRecord = size;
        int imageSpace = 0;
        if (widget.getTable(constants.SPACE_BETWEEN_IMGS) != LuaNil.nil) {
            imageSpace = ((Double) widget.getTable(constants.SPACE_BETWEEN_IMGS)).intValue();
        }
        int image_left_margin = 0;
        int totalRecords = size;
        objhimgstrip = uiState.get(widgetRefStr);
        if (objhimgstrip != null) {
            com.konylabs.vm.LuaTable imgTable = (com.konylabs.vm.LuaTable) objhimgstrip;
            int dataStartRec = 1;
            objhimgstrip = imgTable.getTable("meta");
            if (objhimgstrip != null && objhimgstrip instanceof com.konylabs.vm.LuaTable) {
                com.konylabs.vm.LuaTable metaTable = (com.konylabs.vm.LuaTable) objhimgstrip;
                dataStartRec = ((Double) metaTable.list.elementAt(0)).intValue();
                totalRecords = ((Double) metaTable.list.elementAt(2)).intValue();
            }
            int pageNo = 0;
            int recPerPage = 3;
            pageNo = (Integer) imgTable.getTable("pagenumber");
            if (imgTable.getTable("recperpage") != LuaNil.nil) {
                recPerPage = ((Double) imgTable.getTable("recperpage")).intValue();
            }
            if (size < recPerPage) {
                recPerPage = size;
            }
            startRecord = pageNo * recPerPage - dataStartRec + 1;
            endRecord = (pageNo + 1) * recPerPage - dataStartRec + 1;
            if (endRecord >= totalRecords) {
                startRecord = startRecord - (endRecord - totalRecords);
            }

            String scaleMode = "fittodimensions";
            if (widget.getTable(constants.IMG_SCALE_MODE) != LuaNil.nil) {
                scaleMode = (String) widget.getTable(constants.IMG_SCALE_MODE);
            }

            int referenceWidth = 0, referenceHeight = 0;

            if (widget.getTable(constants.REF_WIDTH) != LuaNil.nil) {
                referenceWidth = ((Double) widget.getTable(constants.REF_WIDTH)).intValue();
            }

            if (widget.getTable(constants.REF_HEIGHT) != LuaNil.nil) {
                referenceHeight = ((Double) widget.getTable(constants.REF_HEIGHT)).intValue();
            }
%>
<input type="hidden" id="<%=widgetid%>recperpage" value="<%=recPerPage%>"/>
<div id="<%=widgetid%>" konywidgettype="KTouchhstrip" eventname="<%=widgetid%>.event_.Khstrip"
     prejsevent="<%=widget.getTable(constants.PRE_ONCLICK_JS)%>" postjsevent="<%=widget.getTable(constants.POST_ONCLICK_JS)%>" >

    <table style="table-layout: auto">
        <tr>
        
        <% if(pageNo != 0){ %>
<td>

<a href="<%=response.encodeURL(apppath+"?formid=" +formid+ (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&node="+request.getAttribute("node.no")+"&"+widgetid+".prev.event_.Khstrip=x")%>"
class=" "
       id="<%=widgetid%>" konywidgettype = "Khstrip"
            eventname="<%=widgetid%>.prev.event_.Khstrip">
 <img class="" src="<%=imgpath+"leftarr.png"%>" /> 
 </a>

</td>
<%}%>

            <td>
                <div id="<%=widgetid%>">
                    <%
                        for (int i = startRecord; i >= 0 && i < endRecord && i < size; i++) {
                            objhimgstrip = datahimgstrip.elementAt(i);;
                            if (objhimgstrip != null) {
                                imghimgstrip = (String) objhimgstrip;
                                if (!imghimgstrip.startsWith("http")) {
                                    imghimgstrip = imgpath + imghimgstrip;
                                }

                    %>
                    <% if (i % recPerPage == 0) {
                      image_left_margin = imageSpace;
                  } else {
                      image_left_margin = 0;
                  }%>
                    <%if (event.equals("yes")) {%>
                    <a href="<%=response.encodeURL(apppath + "?formid=" + formid + "&cat=bjs" + (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() > 0 ? "&krfid=" + WAPUtilities.getKRFId(request) : "") + "&node=" + request.getAttribute("node.no") + "&" + widgetid + "." + i + ".event_.Khstrip=x")%>">
                        <%
                            focusedindex = uiState.getIntValue(widgetRefStr + "."+ constants.FOCUSED_INDEX);
                            if (i + 1 == focusedindex) {
                                imgSkin = uiState.getStringValue(widgetRefStr + "." + constants.FOCUSSKIN);
                            } else {
                                imgSkin = uiState.getStringValue(widgetRefStr + ".skin");
                            }
                        %>
                        <%}%>
                        <%if (scaleMode.equals("fittodimensions")) {%>
                        <img class="<%=imgSkin%>"   src = "<%=imghimgstrip%>"        eventname="<%=widgetid%>.<%=i%>.event_.Khstrip"
                             view ="fittodimensions"  refwidth = "<%=referenceWidth%>" refheight = "<%=referenceHeight%>"
                             konywidgettype = "Khstrip" id="<%=widgetid%>"  
                             <% if (imageCat != null && imageCat.trim().length() != 0) {%>
                             style="margin-right:<%=imageSpace%>px
                             width:<%=referenceWidth%>px; height:<%=referenceHeight%>px;"
                             <%}%>                 />
                        <% } else {%>
                        <img class="<%=imgSkin%>"   src = "<%=imghimgstrip%>"        eventname="<%=widgetid%>.<%=i%>.event_.Khstrip"
                             view ="maintainaspectratio"  refwidth = "<%=referenceWidth%>" refheight = "<%=referenceHeight%>"
                             konywidgettype = "Khstrip" id="<%=widgetid%>"  
                             <% if (imageCat != null && imageCat.trim().length() != 0) {%>
                             style="margin-right:<%=imageSpace%>px
                             width:<%=referenceWidth%>px; height:<%=referenceHeight%>px;"
                             <%}%>                 />
                        <% }%>
                        <%if (event.equals("yes")) {%>
                    </a>
                    <%}%>
                    <%
                            }
                        }
                    %>
                </div>
            </td>
<% if(endRecord < totalRecords){ %>
<td>
<a href="<%=response.encodeURL(apppath+"?formid=" +formid+(WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&node="+request.getAttribute("node.no")+"&"+widgetid+".next.event_.Khstrip=x")%>"
class=" "
       id="<%=widgetid%>" konywidgettype = "Khstrip"
            eventname="<%=widgetid%>.next.event_.Khstrip">
 <img class="" src="<%=imgpath+"rightarr.png"%>" /> 
 </a>

</td>
<%}%>
        </tr>
    </table>
</div>

<%
        }
    }
%>
<%}%>