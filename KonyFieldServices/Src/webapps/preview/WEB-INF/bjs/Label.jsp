<%@include file="common.jsp"%>
<%@page import="com.konylabs.vm.LuaNil"%>

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
        boolean defaultSelection = false;
        if(request.getAttribute("dfltSelection")!=null && (Boolean)request.getAttribute("dfltSelection"))
            {
                defaultSelection = true;                
            }
        else
        {
            if(widget.getTable(constants.RENDER_AS_ANCHOR) != null && widget.getTable(constants.RENDER_AS_ANCHOR) != LuaNil.nil)
            {
                if("true".equals(widget.getTable(constants.RENDER_AS_ANCHOR).toString()))
                    defaultSelection = true;   
                
            }
        }
        request.removeAttribute("dfltSelection");
        String widgetSkin1 = "";
        if (request.getAttribute("widgetSkin1") != null) {
              widgetSkin1 = (String)request.getAttribute("widgetSkin1"); 
        }else {
            if (widget.map.get(KonyServerWidget.SKIN) != null) {
               widgetSkin1 = (String) widget.map.get(KonyServerWidget.SKIN);
            }
        }
%>
<%if(request.getAttribute("segmentid") != null)
{

    if("nonpercent".equals(request.getAttribute("seglayout")))
    {
        style = JSWAPUtil.getWidgetStyleInfo(widget, false) ;
    }
    else{
        style = JSWAPUtil.getWidgetStyleInfo(widget, true);
    }  

    if(request.getAttribute("eventExist") != null && request.getAttribute("eventExist").equals("true"))
    {%>     
       <div class="<%=widgetSkin1%>"
            style="<%=style%>" >
                <a konywidgettype = "Ksegment" class=<%=widget.map.get(KonyServerWidget.SKIN)%> 
               <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
			     	disabled = "true "
			     <% }else{  %>   
			     	<%=widget.map.get(WEBConstants.ENABLED) %>
			     	<%} %>
                style="display:block;text-decoration:none;text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>"
                href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=bjs"+ (WAPUtilities.getKRFId(request) != null && 
                WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) 
                +"&node="+request.getAttribute("node.no")+"&rowid="+request.getAttribute("segmentrow")+"&"+
                request.getAttribute("segmentid")+"."+request.getAttribute("segmentrow")+"."+request.getAttribute("eventName")+
                ".Ksegment=x"+
                        (request.getAttribute("sectionId") != null ? "&sectionid=" +request.getAttribute("sectionId"):""))%>"
                         <%if(request.getAttribute("preOnclickJS") != null){ %>prejsevent="<%=request.getAttribute("preOnclickJS")%>" <%} %>
                <%if(request.getAttribute("segPostOnclickJS") != null){ %>prejsevent="<%=request.getAttribute("segPostOnclickJS")%>" <%} %>
                >
                     <%=request.getAttribute("widgetDataText1")%>
                </a>
        </div>        
    <%}
    else if(defaultSelection )
    {
    %>
       <div class="<%=widgetSkin1%>"
            style="<%=style%>" >
                <a konywidgettype = "Ksegment" class="<%=widgetSkin1%>"
                <%if(request.getAttribute("isCellClickable1") != null && request.getAttribute("isCellClickable1") != LuaNil.nil && request.getAttribute("isCellClickable1").equals(false)){%>
			     	disabled = "true "
			     <% }else{  %>   
			     	<%=widget.map.get(WEBConstants.ENABLED) %>
			     	<%} %>
                style="display:block;text-decoration:none;text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>"
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

    else 
    {%>
    <div class="<%=widgetSkin1%>"
        style="<%=style%>" >
           <label name="<%=name%>" id="<%=name%>" class="<%=widgetSkin1%>"
                    style=" border : none;width: 100%; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>; ">
                 <%=request.getAttribute("widgetDataText1")%>
            </label>
    </div>
    <%}
}       
else
{%>

<%if("nonpercent".equals(request.getAttribute("layout")))
    {%>
     <div    class="<%=widgetSkin1%>"
                                                                   style="<%=JSWAPUtil.getWidgetStyleInfo(widget, false)%>">
        <label name="<%=name%>" id="<%=name%>" <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> 
        class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
               style=" border: none; text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>" >
		<%=widget.map.get(KonyServerWidget.TEXT)%>
	</label>
     </div>
    <%}
    else{%>
     <div     class="<%=widgetSkin1%>"
                                                                    style="<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>  ">
        <label name="<%=name%>" id="<%=name%>"
               <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
               style=" border:none;width:100%;text-align:<%=widget.map.get(constants.CONTENT_ALIGNMENT)%>" >
		<%=widget.map.get(KonyServerWidget.TEXT)%>
	</label>
    </div>
    <%}%>

<%}%>