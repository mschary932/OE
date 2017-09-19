<%@include file="common.jsp"%>

<%    
        String name = (String)widget.map.get("id");
        if (tabpaneid != null)
	{
                name = frmId + "." + tabpaneid + "." + name;
                if(request.getAttribute("containerevent") != null)
                {
                     containereventName = frmId + "." + tabpaneid + "." + containereventName;
                }
	}
        if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
        {
            name = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + name;
        }
        if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
        {
            name = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + name;
        }
        if(request.getAttribute("segmentid") != null)
        {
            name = request.getAttribute("segmentid").toString();
            if(request.getAttribute("tabpaneid") != null)
            {
                 name = request.getAttribute("tabpaneid") +"."+name;
                 name = frmId +"."+name;
            }
        }  
        String defaultSelection = "false";
        if(request.getAttribute("dfltSelection")!=null)
        {
            if("true".equals(request.getAttribute("dfltSelection").toString()))
            {
                defaultSelection = "true";
                request.removeAttribute("dfltSelection");
            }
        }
        String widgetSkin1 = "";
        if (request.getAttribute("widgetSkin1") != null) {
              widgetSkin1 = (String)request.getAttribute("widgetSkin1"); 
        }else {
            if (widget.map.get(KonyServerWidget.SKIN) != null) {
               widgetSkin1 = (String) widget.map.get(KonyServerWidget.SKIN);
            }
        }
%>

<%if(request.getAttribute("segmentid") != null && ("true".equals(defaultSelection))){
    if(request.getAttribute("seglayout")!= null && request.getAttribute("seglayout").equals("nonpercent"))
    {
        style = JSWAPUtil.getWidgetStyleInfoForIE(widget, false) ;
    }
    else{
        style = JSWAPUtil.getWidgetStyleInfoForIE(widget, true);
    }%>
   <div  class="<%=widgetSkin1%>"
	style="<%=style%>" >
            <a konywidgettype = "Ksegment"  
           <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
     	disabled = "true "
     <% }else{  %>   
     	<%=widget.map.get(WEBConstants.ENABLED) %>
     	<%} %>
                style = "text-decoration:none; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>"
                <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
            href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=bjs"+ (WAPUtilities.getKRFId(request) != null && 
            WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&node="+
            request.getAttribute("node.no")+"&rowid="+request.getAttribute("segmentrow")+"&"+name+"event_=x"+
                    (request.getAttribute("sectionId") != null ? "&sectionid=" +request.getAttribute("sectionId"):""))%>"
                     <%if(request.getAttribute("preOnclickJS") != null){ %>prejsevent="<%=request.getAttribute("preOnclickJS")%>" <%} %>
                <%if(request.getAttribute("segPostOnclickJS") != null){ %>prejsevent="<%=request.getAttribute("segPostOnclickJS")%>" <%} %>
            >
                 <%=request.getAttribute("widgetDataText1")%>
            </a>
    </div>
<%}
else if(request.getAttribute("segmentid") != null && ("false".equals(defaultSelection))){
    if(("vertical".equals(request.getAttribute("segmentorientation"))) && !("true".equals(request.getAttribute("segmentvbox")))){%>
        <div style=" width:100%; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>;">
            <%}
    if(request.getAttribute("seglayout")!= null && request.getAttribute("seglayout").equals("nonpercent"))
    {
        style = JSWAPUtil.getWidgetStyleInfoForIE(widget, false);
    }
    else{
        style = JSWAPUtil.getWidgetStyleInfoForIE(widget, true);
    }%>
    <%if(widget.map.get(constants.RENDER_AS_ANCHOR) != null && (Boolean)widget.getTable(constants.RENDER_AS_ANCHOR))
    {%>
        <div  class="<%=widgetSkin1%>"
	style="<%=style%>" >
            <a konywidgettype = "Ksegment"  
            <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
     	disabled = "true "
     <% }else{  %>   
     	<%=widget.map.get(WEBConstants.ENABLED) %>
     	<%} %>
                style="display:block;text-decoration:none;text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>"
               <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
            href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=bjs"+ (WAPUtilities.getKRFId(request) != null && 
            WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&node="+
            request.getAttribute("node.no")+"&rowid="+request.getAttribute("segmentrow")+"&"+name+"event_=x"+
                    (request.getAttribute("sectionId") != null ? "&sectionid=" +request.getAttribute("sectionId"):""))%>"
                     <%if(request.getAttribute("preOnclickJS") != null){ %>prejsevent="<%=request.getAttribute("preOnclickJS")%>" <%} %>
                <%if(request.getAttribute("segPostOnclickJS") != null){ %>prejsevent="<%=request.getAttribute("segPostOnclickJS")%>" <%} %>
            >
                 <%=request.getAttribute("widgetDataText1")%>
            </a>
        </div>
    <%}
    else{%>
    <div  class="<%=widgetSkin1%>"
        style="<%=style%>" >
           <label name="<%=name%>" id="<%=name%>"  <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
                    style=" border : none;width: 100%; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>; ">
                 <%=request.getAttribute("widgetDataText1")%>
            </label>
    </div>
    <%}
    if(("vertical".equals(request.getAttribute("segmentorientation"))) && !("true".equals(request.getAttribute("segmentvbox")))){%>
        </div>
    <%}
}
else if(request.getAttribute("containerevent") != null){%>
            <a konywidgettype = "Kbox"
eventname="<%=containereventName%>event_"  href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=bjs"+ 
            (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+
WAPUtilities.getKRFId(request) : "" ) +"&event="+containereventName +"&previousform=" + 
            (uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID) != null ? 
                    WAPUtilities.escapeHtml((String)uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)) : 
                        uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)))%>"
style="text-decoration:none;">
<div  class="<%=widgetSkin1%>"
	style="<%=JSWAPUtil.getWidgetStyleInfoForIE(widget, true)%> ">
	<label name="<%=name%>" id="<%=name%>"  class="<%=widgetSkin1%>"
		style=" border : none;width: 100%; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>; ">
		<%=widget.map.get(KonyServerWidget.TEXT)%>
	</label>
</div></a>
  <%}        
else{%>

<%if(request.getAttribute("layout")!= null && request.getAttribute("layout").equals("nonpercent"))
    {%>
     <div  class="<%=widgetSkin1%>"
                                                                 style="<%=JSWAPUtil.getWidgetStyleInfoForIE(widget, false)%>" >
        <span name="<%=name%>" id="<%=name%>" class="<%=widgetSkin1%>"
              style="float:left; border: none; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>" >
		<%=widget.map.get(KonyServerWidget.TEXT)%>
	</span>
     </div>
    <%}
    else{%>
     <div    class="<%=widgetSkin1%>"
            style="<%=JSWAPUtil.getWidgetStyleInfoForIE(widget, true)%>" >
        <span name="<%=name%>" id="<%=name%>" class="<%=widgetSkin1%>"
              style=" border:none;width:100%;text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>" >
		<%=widget.map.get(KonyServerWidget.TEXT)%>
	</span>
    </div>
    <%}%>

<%}%>