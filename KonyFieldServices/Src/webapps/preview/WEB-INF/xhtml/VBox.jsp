<%@page import="java.util.Stack"%>
<%@page import="com.konylabs.api.ui.KonyRichText"%>
<%@page import="com.konylabs.vm.LuaNil"%>
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
        
	List<String> childWidgets = ((LuaTable) widget.getTable(WEBConstants.CHILDREN)).list;
        String widgetSkin = "";
        if((widget.getTable(KonyServerWidget.SKIN)) != LuaNil.nil) {
            if(widget.getTable(KonyServerWidget.SKIN) instanceof String)
            {
                widgetSkin = (String)widget.getTable(KonyServerWidget.SKIN);
            }
        }
        HashMap styleMap = new HashMap();

        styleMap.put("width", "100");
        String parent = (String)widget.map.get(KonyServerWidget.PARENT);
        LuaTable parentContainer = (LuaTable)form.map.get(parent);
        if(parentContainer != null && !JSWAPUtil.getBooleanValue(parentContainer.map.get("percent")))
        	styleMap.remove("width");
        String wSkin = JSWAPUtil.getWidgetStyle(styleMap);
        String widgetAlignment = JSWAPUtil.getWidgetAlignmentStyle(widget);
        String cwt = null;
        if (widget.getTable(constants.CONTAINER_WEIGHT) != null)
        {                
                cwt = widget.getTable(constants.CONTAINER_WEIGHT) + "%";
        }
        
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
        

%>
<td style="width:<%=cwt%>;border:none;" <%=widgetAlignment%> >
<div columns="1" class="<%=widgetSkin%>" style="<%=wSkin%>" >
	<%
		for (String s : childWidgets)
		{
			childWidget = (KonyServerWidget) widget.getTable(s);
                        Boolean childVisible = JSWAPUtil.getBooleanValue(childWidget.getTable(constants.ISVISIBLE));
			if (childVisible)
			{


                            String childWidth  = "100%";
                            widgetAlignment = JSWAPUtil.getWidgetAlignmentStyle(childWidget);
                            jspFile = childWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;

                            String width = "100%";
                            request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                            %>
                            <div style=" width: <%=width%>;   border: none;" <%=widgetAlignment%> >
                              <%if( (eventExist) &&(jspFile.equalsIgnoreCase("Label.jsp") ||
                                        jspFile.equalsIgnoreCase("Image.jsp") ||jspFile.equalsIgnoreCase("Image2.jsp"))) {%>
                                    <a konywidgettype = "Kbox" eventname="<%=eventName%>event_" style="text-decoration:none;"                                   
                                            href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=bjs"+ (WAPUtilities.getKRFId(request) != null &&
                                            WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&"+eventName + "=x"+"&previousform=" + 
                                            (uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID) != null ? WAPUtilities.escapeHtml((String)uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)) : 
                                                uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)) )%>"
                                    >
                             <%}%>                                
                                     <jsp:include page="<%=jspFile%>" /> 
                                <%if( (eventExist) &&(jspFile.equalsIgnoreCase("Label.jsp") ||
                                        jspFile.equalsIgnoreCase("Image.jsp") ||jspFile.equalsIgnoreCase("Image2.jsp"))) {%>
                                </a>
                                <%}%>                                     
                            </div>
                            <%                             
                        }			
		}// end of parsing child widgets in VBox.

                 if(widget.getTable(constants.ONCLICK)!= LuaNil.nil) {
                    boxonclickeventstack.pop(); // removing onclick element
                    if(parentEventName != null)
                        request.setAttribute("eventName", parentEventName);
                 }                
	%>
</div>
</td>
<%
    
    request.setAttribute("widget.id", widgetId);
%>
<%-- populate style after cgen modification--%>
<%-- All these code changes shd happen only if widget is enabled.Add that chk --%>
<%-- get the size % property from cgen --%>