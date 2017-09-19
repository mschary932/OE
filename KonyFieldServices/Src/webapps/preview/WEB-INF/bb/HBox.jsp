<%@page import="java.util.Stack"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="com.kony.web.WebAlert"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="com.konylabs.vm.Function"%>
<%@page import="com.konylabs.api.ui.KonyLabel"%>


<%@include file="common.jsp"%>
<%

        Stack boxonclickeventstack = (Stack) request.getAttribute("boxonclickeventstack");
        if(boxonclickeventstack == null)
            boxonclickeventstack = new Stack();

        boolean eventExist = false;
        String eventName = "";
        String parentEventName = null;
        String parentPreOnclickJS = (String)request.getAttribute("preOnclickJS");
        String parentPostOnclickJS = (String)request.getAttribute("postOnclickJS");
        String preOnclickJS = parentPreOnclickJS;
        String postOnclickJS = parentPostOnclickJS;
        
	List<String> childWidgets = ((LuaTable) widget.map.get(WEBConstants.CHILDREN)).list;
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
        String wSkin = JSWAPUtil.getWidgetStyle(styleMap);       
        
        int columns=childWidgets.size();
        boolean percentLayout = true;
        if(widget.getTable("percent") != LuaNil.nil && ((Boolean)widget.getTable("percent") == false)){
            percentLayout = false;
        }
 
       if(!percentLayout)
        {
            columns=1;
            request.setAttribute("layout", "nonpercent");
        }
        

        //parsing props for hbox onclick
            if(request.getAttribute("eventName") != null)
                eventName = (String) request.getAttribute("eventName");
            if(request.getAttribute("eventExist") != null)
                eventExist = (Boolean) request.getAttribute("eventExist");

        if(widget.getTable(constants.ONCLICK)!=LuaNil.nil
                && !"disabled".equals(widget.map.get(WEBConstants.ENABLED))) {
            eventExist = true;
            String parentId = (String)widget.map.get(KonyServerWidget.ID);
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
<div class = "ktable <%=widgetSkin%>"  style="<%=wSkin%>"  columns=<%=columns%>
     <%if(widget.map.get(constants.BLOCKED_UI_SKIN)!= null){%> kblockinskin="<%=widget.map.get(constants.BLOCKED_UI_SKIN)%>" <% }%>
        <%if(preOnclickJS != null){ %>prejsevent="<%=preOnclickJS%>"
        <%} if(postOnclickJS != null){ %> postjsevent="<%=postOnclickJS%>" <%}%>
     <%if(eventExist){ %>
        kprogressskin="<%=widgetSkin%>" konywidgettype = "Kbox" kwttype="divParent" eventname= "<%=eventName%>"
    <% } %>
     >
	<div class ="krow kwt100 <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(widget)%>" style="width: 100%; border: none;" 
            <%if(eventExist){ %> konywidgettype = "Kbox"   <% } %>
             >
			<%
			int allChildsWidth = 0;
 			for (String s : childWidgets)
			{
				childWidget = (KonyServerWidget) widget.getTable(s);
                                Boolean childVisible = (Boolean) childWidget.getTable(constants.ISVISIBLE);
				if (childVisible)
				{

                                    jspFile = childWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;									
                                    String childwidth = childWidget.getTable(constants.CONTAINER_WEIGHT) + "%";                                    
                                    request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                                    allChildsWidth+= JSWAPUtil.getIntValue(childWidget.getTable(constants.CONTAINER_WEIGHT));
                                    if(childWidget instanceof KonyContainer) { %>

                                        <div class="kcell <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(childWidget)%>"
                                             style="width:<%=childwidth%>; border:none;"
                                               <%if(eventExist){ %> konywidgettype = "Kbox"   <% } %>
                                        >
                                             <jsp:include page="<%=jspFile%>" />
                                        </div>

                                    <% }
                                    else if (!(childWidget instanceof KonyContainer) && percentLayout)
                                    {%>
                                        <div class="kcell <%=JSWAPUtil.getWidgetAlignmentSkinForPalm(childWidget)%>"
                                             style="width:<%=childwidth%>; border:none;"
                                             <%if(eventExist){ %> konywidgettype = "Kbox"   <% } %>
                                        >
                                             <jsp:include page="<%=jspFile%>" />
                                        </div>
                                    <%
                                    }else if (!(childWidget instanceof KonyContainer) && !percentLayout) {
                                    %>
                                          <jsp:include page="<%=jspFile%>" />
                                    <% }
				}

                 }//end of parsing child widgets
                 if(allChildsWidth < 100 && percentLayout && adherePercentageStrictly){
                 %>
                 <div class="kcell" style="width:<%=100-allChildsWidth%>%; border:none;" 
                 			<%if(eventExist){ %> konywidgettype = "Kbox"   <% } %> ></div>
                 <%}
               if(widget.getTable(constants.ONCLICK)!=LuaNil.nil) {
                    boxonclickeventstack.pop(); // removing onclick element
                    if(parentEventName != null)
                        request.setAttribute("eventName", parentEventName);
               }
                if(boxonclickeventstack.isEmpty()){
                    request.removeAttribute("eventExist");
                    request.removeAttribute("eventName");
                    request.removeAttribute("boxonclickeventstack");
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
</div>
<%	
	request.removeAttribute("layout");        
    	request.setAttribute("widget.id", widgetId);
%>