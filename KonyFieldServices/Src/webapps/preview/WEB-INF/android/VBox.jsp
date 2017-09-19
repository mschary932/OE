<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="java.util.Stack"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="com.kony.web.WebAlert"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.konylabs.vm.Function"%>
<%@page import="com.konylabs.api.ui.KonyLabel"%>

<%@include file="common.jsp"%>
<%
        Stack boxonclickeventstack = new Stack();
        Boolean eventExist = false;
        String eventName = "";
        String parentEventName = null;
        String parentPreOnclickJS = (String)request.getAttribute("preOnclickJS");
        String parentPostOnclickJS = (String)request.getAttribute("postOnclickJS");
        String preOnclickJS = parentPreOnclickJS;
        String postOnclickJS = parentPostOnclickJS;
        
	List<String> childWidgets = ((LuaTable) widget.getTable(WEBConstants.CHILDREN)).list;
        String widgetSkin = "";
        if((widget.getTable(KonyServerWidget.SKIN)) != LuaNil.nil) {
            if(widget.getTable(KonyServerWidget.SKIN) instanceof String)
            {
                widgetSkin = (String)widget.getTable(KonyServerWidget.SKIN);
            }
        }
        HashMap styleMap = new HashMap();
        styleMap.put("margin", JSWAPUtil.getWidgetMargin(widget));
        styleMap.put("padding", JSWAPUtil.getWidgetPadding(widget));
        styleMap.put("width", JSWAPUtil.adjustedWeightForMargin(widget, "100"));
        String parent = (String)widget.map.get(KonyServerWidget.PARENT);
        LuaTable parentContainer = (LuaTable)form.map.get(parent);
        if(parentContainer != null && !JSWAPUtil.getBooleanValue(parentContainer.map.get("percent")))
        	styleMap.remove("width");
        String wSkin = JSWAPUtil.getWidgetStyle(styleMap);
        String widgetAlignment = JSWAPUtil.getWidgetAlignmentSkinForPalm(widget);
        String cwt = widget.getTable(constants.CONTAINER_WEIGHT) + "%";
        
        if(request.getAttribute("boxonclickeventstack")!= null)
            boxonclickeventstack = (Stack) request.getAttribute("boxonclickeventstack");
            if(request.getAttribute("eventName") != null)
                eventName = (String) request.getAttribute("eventName");
            if(request.getAttribute("eventExist") != null)
                eventExist = (Boolean) request.getAttribute("eventExist");
        //parsing props for vbox onclick
        if(widget.getTable(constants.ONCLICK)!=LuaNil.nil
                && !"disabled".equals(widget.map.get(WEBConstants.ENABLED))) {
            eventExist = true;
            String parentId = (String)widget.getTable(KonyServerWidget.ID);
            boxonclickeventstack.push(parentId);
            eventName = widget.getWidgetID()+"event_";
            if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
            {
                eventName = "app.headers."+eventName;
            }
            if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
            {
                eventName = "app.footers."+eventName;
            }
            request.setAttribute("boxonclickeventstack", boxonclickeventstack);
            if(request.getAttribute("eventName") != null)
               parentEventName= (String) request.getAttribute("eventName");
            request.setAttribute("eventName", eventName);
            request.setAttribute("eventExist", eventExist);
         }
        if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil )
        {
        	preOnclickJS = (String)widget.map.get(constants.PRE_ONCLICK_JS);
        	request.setAttribute("preOnclickJS", preOnclickJS);
        }
        if(widget.map.get(constants.POST_ONCLCICK_JS) != null && widget.map.get(constants.POST_ONCLCICK_JS) != LuaNil.nil)
        {
        	postOnclickJS = (String)widget.map.get(constants.POST_ONCLCICK_JS);
        	request.setAttribute("postOnclickJS", postOnclickJS);
        }

%>

<div  columns="1" class=" ktable <%=widgetSkin%>" style="<%=wSkin%>"
     <%if(widget.map.get(constants.BLOCKED_UI_SKIN)!= null){%> kblockinskin="<%=widget.map.get(constants.BLOCKED_UI_SKIN)%>" <% }%>
      <%if(preOnclickJS != null){ %>prejsevent="<%=preOnclickJS%>"
        <%} if(postOnclickJS != null){ %> postjsevent="<%=postOnclickJS%>" <%}%>
      <%if(eventExist){ %>
        kprogressskin="<%=widgetSkin%>" konywidgettype = "Kbox" kwttype="divParent" eventname= "<%=eventName%>"
    <% } %>
 >
	<%
		for (String s : childWidgets)
		{
			childWidget = (KonyServerWidget) widget.getTable(s);
			Boolean childVisible = (Boolean) childWidget.getTable(constants.ISVISIBLE);                        
                        String childWidth  = "100%";
                        widgetAlignment = JSWAPUtil.getWidgetAlignmentStyle(childWidget); 
			jspFile = childWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;
			request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
			if (childVisible)
			{
				if (!(childWidget instanceof KonyContainer))
				{				
                            %>
                                	<div class="krow" style="width: 100%; border: none;"
                                        <%if(eventExist){ %> konywidgettype = "Kbox"   <% } %>  >
                                            <div class="kcell <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(childWidget)%> " style="width: <%=childWidth%>;  border: none;"
                                             <%if(eventExist){ %> konywidgettype = "Kbox"   <% } %> >
                                                <jsp:include page="<%=jspFile%>" />
                                            </div>
                                        </div>

                                    <%
				} else {
                                    %>
                                    <div class="krow" style="width: 100%; border: none;" <%=widgetAlignment%>
                                     <%if(eventExist){ %> konywidgettype = "Kbox"   <% } %>  >
                                            <div class="kcell" <%if(eventExist){ %> konywidgettype = "Kbox"   <% } %> > 
                                                <jsp:include page="<%=jspFile%>" />
                                            </div>
                                    </div>
                                    <%
                                }			
                        }
                }//end of parsing child widgets in vbox.

                 if(widget.getTable(constants.ONCLICK)!= LuaNil.nil) {
                    boxonclickeventstack.pop(); // removing onclick element       
                    if(parentEventName != null)
                        request.setAttribute("eventName", parentEventName);
                 }
                 if(parentPreOnclickJS != null)
                 	request.setAttribute("preOnclickJS", parentPreOnclickJS);
                 else
                 	request.removeAttribute("preOnclickJS");
                 if(parentPostOnclickJS != null)
                 	request.setAttribute("postOnclickJS", parentPostOnclickJS);
                 else
                 	request.removeAttribute("postOnclickJS");
                %>  	
</div>
<%      
    request.setAttribute("widget.id", widgetId);
%>
<%-- populate style after cgen modification--%>
<%-- All these code changes shd happen only if widget is enabled.Add that chk --%>
<%-- get the size % property from cgen --%>