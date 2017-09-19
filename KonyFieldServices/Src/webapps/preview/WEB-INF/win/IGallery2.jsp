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
	String formid = frmId; //(String)uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);;
	String widgetid = (String)request.getAttribute("wid");
	String widgetRefStr = formid + "."+ widgetid;
        
        if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
        {
            widgetRefStr = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + widgetid;
        }
        if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
        {
            widgetRefStr = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + widgetid;
        }
        if(request.getAttribute("tabpaneid") != null)
        {
             widgetRefStr = frmId +"."+request.getAttribute("tabpaneid")+"."+widgetid;            
        }        
	%>
	<%if(uiState.getBoolValue(widgetRefStr + "." + constants.ISVISIBLE)){%>
<%
    int pos =0 ;
    if(widget != null && widget.map.get(constants.ONSELECTION) != null)     
        event = "yes";
     else
        event = "no";      
%>
<input type="hidden"  autocomplete="off" id="<%=widgetid%>Skin"/>
<input type="hidden"  autocomplete="off" id="<%=widgetid%>FocusSkin"/>
 <div id="<%=widgetid%>" konywidgettype="KTouchimggal" eventname="<%=widgetid%>.div.event_.Kimggal"
>

    <%
        String compWidth ="100%";
        if(request.getAttribute("adjustedCompWeight")!= null) {
                 compWidth = (String)request.getAttribute("adjustedCompWeight");
        }		
    	String imgSkin = "";        
        imgSkin=uiState.getStringValue(widgetRefStr + ".skin");
        Object obj = uiState.get(widgetRefStr + ".ilist");
        if (obj != null)
        {
           java.util.Vector data = (java.util.Vector) obj;
           String img = "";
           int size = data.size();
           	int recPerRow = 4;
    		int startRecord = 1;
    		int endRecord = size;
    		int totalRecords = size;
                int imageSpace = 0;
               String navigationbarposition ="bottom";
               Boolean showstatus = true;
               String []dim = null;

               if(widget.map.get(constants.ITEMS_PER_ROW)!= null)
                    recPerRow =JSWAPUtil.getIntValue(widget.map.get(constants.ITEMS_PER_ROW));
               if(widget.getTable(constants.SPACE_BETWEEN_IMGS) != LuaNil.nil)
                    imageSpace = JSWAPUtil.getIntValue(widget.getTable(constants.SPACE_BETWEEN_IMGS));
               if(widget.map.get(constants.NAV_BAR_POS)!= null)
                    navigationbarposition =(String) widget.map.get(constants.NAV_BAR_POS);
               if(widget.map.get("showstatus") != null)
                    showstatus = (Boolean) widget.map.get("showstatus");

                String scaleMode;
                if(widget.getTable(constants.IMG_SCALE_MODE)!= LuaNil.nil)
                     scaleMode = (String) widget.getTable(constants.IMG_SCALE_MODE);
                else
                    scaleMode = "default";

            int referenceWidth =0, referenceHeight = 0;
            if(widget.getTable(constants.REF_WIDTH) != LuaNil.nil)
                    referenceWidth = JSWAPUtil.getIntValue(widget.getTable(constants.REF_WIDTH));

            if(widget.getTable(constants.REF_HEIGHT) != LuaNil.nil)
                    referenceHeight = JSWAPUtil.getIntValue(widget.getTable(constants.REF_HEIGHT));

                int image_left_space = imageSpace;
                int image_top_space = imageSpace;
    		obj = uiState.get(widgetRefStr);
    		if(obj != null && size > 0)
                {
        		com.konylabs.vm.LuaTable imgTable = (com.konylabs.vm.LuaTable) obj;
        		obj = imgTable.getTable("meta");
        		if (obj != null && obj instanceof com.konylabs.vm.LuaTable)
        		{
                            com.konylabs.vm.LuaTable metaTable = (com.konylabs.vm.LuaTable) obj;
                            startRecord = JSWAPUtil.getIntValue(metaTable.list.elementAt(0));
                            endRecord = JSWAPUtil.getIntValue(metaTable.list.elementAt(1));
                            totalRecords = JSWAPUtil.getIntValue(metaTable.list.elementAt(2));
                            size = endRecord-startRecord+1;
       			}
                        int focusedindex=0;
                        if(event.equals("yes"))
                            focusedindex =uiState.getIntValue(widgetRefStr + ".focusedindex");


                  %> <table cols = "<%=recPerRow%>" style="width:<%=compWidth%>  padding: <%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>">
                  <%
                  for(int i=0; i < size; i++)
                    {
                    if (i % recPerRow == 0)
                    {
                          pos = 0;
                        image_left_space = imageSpace;
                    %>
                    <tr> <%}
                    else
                        image_left_space = 0;

                    if( i < recPerRow)
                        image_top_space = imageSpace;
                    else
                        image_top_space = 0;

                    obj = data.elementAt( i );

                    if(obj != null)
                    {
                        img = (String) obj;
                        if(!img.startsWith("http"))
                            img = imgpath + img;
                         if(event.equals("yes")) {
			    if((i+1)==focusedindex) {
                                    imgSkin=uiState.getStringValue(widgetRefStr + ".focusskin");
                            }
                    }
		%>
                        <td class="<%=imgSkin%>"  valign="middle" align="center">
                            <% if(event.equals("yes")) {%>
                            <a href="<%=response.encodeURL(apppath+"?formid=" + formid + "&cat=bjs"+ (WAPUtilities.getKRFId(request) != null &&
                            WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&node="+request.getAttribute("node.no")+"&rowid="+i+"&event=" + widgetRefStr )%>">
                             <%}
                               if(scaleMode.equals("fittodimensions")) {%>
                            
                                <img src="<%=img%>" konywidgettype = "Kimggal" <%=widget.map.get(WEBConstants.ENABLED)%>
                                   style = "margin-top:<%=image_top_space%>px;margin-right:<%=imageSpace%>px;margin-bottom:<%=imageSpace%>px;
                                   margin-left:<%=image_left_space%>px; width:<%=referenceWidth%>px; height:<%=referenceHeight%>px;"  
                                    view ="fittodimensions" refwidth = "<%=referenceWidth%>" refheight = "<%=referenceHeight%>"
                                    prejsevent="<%=widget.getTable(constants.PRE_ONCLICK_JS)%>" onload ="galleryLoadHandler2(this)"
                                 />
                              <% }else{ %>
                                <img src="<%=img%>" konywidgettype = "Kimggal" <%=widget.map.get(WEBConstants.ENABLED)%>
                                   style = "margin-top:<%=image_top_space%>px;margin-right:<%=imageSpace%>px;margin-bottom:<%=imageSpace%>px;
                                   margin-left:<%=image_left_space%>px;width:<%=referenceWidth%>px; height:<%=referenceHeight%>px;"  
                                    view ="maintainaspectratio" refwidth = "<%=referenceWidth%>" refheight = "<%=referenceHeight%>"
                                    prejsevent="<%=widget.getTable(constants.PRE_ONCLICK_JS)%>" onload ="galleryLoadHandler2(this)"
                                 />
                              <% } %>
                             <% if(event.equals("yes")){%>
                              </a>
                             <%}%>
                         </td>
               <%
            }
            if ( (i+1) % recPerRow == 0 || i == (data.size() - 1))
            {%>
                </tr> <%}

        } %>
            <tr  style="width: 100%;">
        	<td align="" >
        	<% if(startRecord > 1){  %>
        		<a class= "previousArrowNav"        eventname="<%=widgetid%>.prev.event_.Kimggal"  konywidgettype = "Kimggal"
        		href="<%=response.encodeURL(apppath+"?formid=" + formid + "&cat=bjs"+ (WAPUtilities.getKRFId(request) != null &&
                        WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&node="+request.getAttribute("node.no")+"&rowid=prev&event=" + widgetid)%>"
                        >
        		<img src = "<%=imgpath%>leftarr.png" style="border: medium none;"/>
        		</a>
        	<% } %>
        	</td>
        	 <td  align="center">
                        <%=startRecord%>/<%=endRecord%>&nbsp;of&nbsp;<%=totalRecords%>
        	 </td>

        	 <td align="">
        	<% if(endRecord < totalRecords){ %>
        		<a class=" " eventname="<%=widgetid%>.next.event_.Kimggal" konywidgettype = "Kimggal"
        		href="<%=response.encodeURL(apppath+"?formid=" + formid + "&cat=bjs"+ (WAPUtilities.getKRFId(request) != null &&
                        WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&node="+request.getAttribute("node.no")+"&rowid=next&event=" + widgetid ) %>"
                        >
        		<img src = "<%=imgpath%>rightarr.png" style="border: medium none;" />
        		</a>
        	<%} %>
        	</td>
        	</tr>
        </table>
        <%
        }
      }
    %>

</div>

<%}%>