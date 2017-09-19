<%@include file="common.jsp"%>

<%    
        String name = (String)widget.getTable("id");
        if (tabpaneid != null)
	{
                name = frmId + "." + tabpaneid + "." + name;
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
   <div class="<%=widgetSkin1%>"
	style="<%=style%>" >
            <a konywidgettype = "Ksegment" class=<%=widget.getTable("skin")%> 
            style="display:block;text-decoration:none;text-align:<%=widget.getTable(constants.CONTENT_ALIGNMENT)%>"
            href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=bjs"+ (WAPUtilities.getKRFId(request) != null && 
            WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&node="+
            request.getAttribute("node.no")+"&rowid="+request.getAttribute("segmentrow")+"&"+name+"event_=x"+
            (request.getAttribute("sectionId") != null ? "&sectionid=" +request.getAttribute("sectionId"):""))%>"
            <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
     	disabled = "true "
     <% }else{  %>   
     	<%=widget.map.get(WEBConstants.ENABLED) %>
     	<%} %>
            >
                 <%=request.getAttribute("widgetDataText1")%>
            </a>
    </div>
<%}
else if(request.getAttribute("segmentid") != null ){
    if(("vertical".equals(request.getAttribute("segmentorientation"))) && !("true".equals(request.getAttribute("segmentvbox")))){%>
        <div style=" width:100%; text-align:<%=widget.getTable(constants.CONTENT_ALIGNMENT)%>;">
            <%}
    if(request.getAttribute("seglayout")!= null && request.getAttribute("seglayout").equals("nonpercent"))
    {
        style = JSWAPUtil.getWidgetStyleInfoForIE(widget, false);
    }
    else{
        style = JSWAPUtil.getWidgetStyleInfoForIE(widget, true);
    }%>
    <%if(("true".equals(defaultSelection)) || (widget.map.get(constants.RENDER_AS_ANCHOR) != null && (Boolean)widget.getTable(constants.RENDER_AS_ANCHOR)))
    {%>
        <div class="<%=widgetSkin1%>"
	style="<%=style%>" >
            <a konywidgettype = "Ksegment" class=<%=widget.getTable("skin")%> 
            style="display:block;text-decoration:none;text-align:<%=JSWAPUtil.getContentAlignment(widget) %>;"
            href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=basic"+ (WAPUtilities.getKRFId(request) != null && 
            WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&node="+
            request.getAttribute("node.no")+"&rowid="+request.getAttribute("segmentrow")+"&"+name+"event_=x"+
                    (request.getAttribute("sectionId") != null ? "&sectionid=" +request.getAttribute("sectionId"):""))%>"
                    <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
     	disabled = "true "
     <% }else{  %>   
     	<%=widget.map.get(WEBConstants.ENABLED) %>
     	<%} %>
            >
                 <%=request.getAttribute("widgetDataText1")%>
            </a>
        </div>
    <%}
    else{%>
           <label name="<%=name%>" id="<%=name%>"
                   class="<%=widgetSkin1%>"
                    style=" width: 100%; text-align:<%=JSWAPUtil.getContentAlignment(widget) %>; ">
                 <%=request.getAttribute("widgetDataText1")%>
            </label>
    
    <%}
    if(("vertical".equals(request.getAttribute("segmentorientation"))) && !("true".equals(request.getAttribute("segmentvbox")))){%>
        </div>
    <%}
}
else if(request.getAttribute("containerevent") != null){%>
	<label name="<%=name%>" id="<%=name%>"
                class="<%=widgetSkin1%>"
		style="  width: 100%; text-align:<%=JSWAPUtil.getContentAlignment(widget) %>; ">
		<%=widget.getTable("text")%>
	</label>
  <%}        
else{%>

<%if(request.getAttribute("layout")!= null && request.getAttribute("layout").equals("nonpercent"))
    {%>
        <label name="<%=name%>" id="<%=name%>" style="text-align:<%=JSWAPUtil.getContentAlignment(widget) %>;"
               <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widgetSkin1%>" <%}%>   >
		<%=widget.getTable("text")%>
	</label>   
    <%}
    else{%>     
        <label name="<%=name%>" id="<%=name%>" style="width:100%; text-align:<%=JSWAPUtil.getContentAlignment(widget) %>;" 
               <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widgetSkin1%>" <%}%>        >
		<%=widget.getTable("text")%>
	</label>    
    <%}%>
<%}%>