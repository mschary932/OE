
<%@page import="java.util.Stack"%>
<%@page import="com.konylabs.api.ui.KonyRichText"%>
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
        String preOnclickJS = parentPreOnclickJS;
                
	List<String> childWidgets = ((LuaTable) widget.getTable(WEBConstants.CHILDREN)).list;
        String widgetSkin = "";
        if((widget.getTable(KonyServerWidget.SKIN)) != null &&  widget.getTable(KonyServerWidget.SKIN) != com.konylabs.vm.LuaNil.nil) {
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
        
        String widgetalign =  JSWAPUtil.getWidgetAlignmentStyle(widget);

        int columns=childWidgets.size();
        if(!JSWAPUtil.getBooleanValue(widget.getTable("percent")))
        {
            columns=1;
            request.setAttribute("layout", "nonpercent");
         }
        
        String bcollapse = widget.getTable(constants.BRDR_COLLAPSE).toString();

        //parsing props for hbox onclick
        if(request.getAttribute("eventName") != null)
            eventName = (String) request.getAttribute("eventName");
        if(request.getAttribute("eventExist") != null)
            eventExist = (Boolean)request.getAttribute("eventExist");

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
       
%>

<table columns=<%=columns%> class="<%=widgetSkin%>"
	style="<%=wSkin%>;<%="true".equals(bcollapse) ? "border-collapse:collapse;" : ""%>" 
	<%if(preOnclickJS != null){ %> prejsevent="<%=preOnclickJS%>"> <%} %> >
	<tr style="width: 100%; border: none;" <%=widgetalign%>>

		<%if(JSWAPUtil.getBooleanValue(widget.getTable("percent")))
          {
				int allChildsWidth = 0;
                for (String s : childWidgets)
                {
                	childWidget = (KonyServerWidget) widget.map.get(s);
                    if(childWidget == null)
                    	childWidget = (KonyServerWidget)form.map.get(s);
                    Boolean childVisible = JSWAPUtil.getBooleanValue(childWidget.getTable(constants.ISVISIBLE));
                    if (childVisible)
                    {
                        jspFile = childWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;
                        allChildsWidth+= JSWAPUtil.getIntValue(childWidget.getTable(constants.CONTAINER_WEIGHT));
                        if(childWidget instanceof KonyContainer)
                        {
                            request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                         %>
		<jsp:include page="<%=jspFile%>" />
		<%
                        }
                        else
                        {

                            String childWidgetMargin = "0%";
                            String childwidth = childWidget.getTable(constants.CONTAINER_WEIGHT) + "%";

                            if (!("Phone.jsp".equals(jspFile)) && !(childWidget instanceof KonyLabel) && !(childWidget instanceof KonyRichText)
                                    && !(childWidget.map.get("wType").equals("Link")) && childWidget.map.get(KonyServerWidget.MARGIN) != LuaNil.nil) {
                                childWidgetMargin = JSWAPUtil.getWidgetMargin(childWidget);
                            }
                            request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());

                        %>
		<td
			style="width:<%=childwidth%>; padding:<%=childWidgetMargin%>;border:none;"
			<%=JSWAPUtil.getWidgetAlignmentStyle(childWidget)%>>
			<%if( (eventExist) &&(jspFile.equalsIgnoreCase("Label.jsp") ||
                                    jspFile.equalsIgnoreCase("Image.jsp") ||jspFile.equalsIgnoreCase("Image2.jsp"))) {%>
									<a konywidgettype="Kbox" eventname="<%=eventName%>event_"
									style="text-decoration: none;" <%if(preOnclickJS != null){ %>
									prejsevent="<%=preOnclickJS%>" <%}%>
									href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=bjs"+ (WAPUtilities.getKRFId(request) != null &&
                                    WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&"+eventName + "event=x"+"&previousform=" + 
                                    (uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID) != null ? WAPUtilities.escapeHtml((String)uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)) : 
                                        uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)) )%>">
				<%}%> <jsp:include page="<%=jspFile%>" /> <%if( (eventExist) &&(jspFile.equalsIgnoreCase("Label.jsp") ||
                                    jspFile.equalsIgnoreCase("Image.jsp") ||jspFile.equalsIgnoreCase("Image2.jsp"))) {%>
		</a> <%}%>
		</td>
		<%
                     }
                }
            }
                if(allChildsWidth < 100 && adherePercentageStrictly){ %>
                <td	style="width:<%=100-allChildsWidth%>%"></td>
                <%
                }
         }
        else {
            //non percent hbox
                 KonyServerWidget fChild = null;
                 KonyServerWidget lChild = null;
                 String chk = "false";
                 if (childWidgets.size() > 0) {
                     //String firstChild = childWidgets.get(0);
                     fChild = (KonyServerWidget) widget.getTable(childWidgets.get(0));
                     lChild = (KonyServerWidget) widget.getTable(childWidgets.get(childWidgets.size()-1));
                 }
        
                 for (int i = 0; i < childWidgets.size(); i++)
                    {
                     childWidget = (KonyServerWidget) widget.map.get(childWidgets.get(i).toString());
                     KonyServerWidget nextchildWidget = null;
                     if(childWidgets.size() > i+1)
                        nextchildWidget = (KonyServerWidget) widget.map.get(childWidgets.get(i + 1).toString());
                     if (!(fChild instanceof KonyContainer) && (i == 0))
                         {
                             %>
		<td>
			<%
                        }

                     Boolean childVisible = JSWAPUtil.getBooleanValue(childWidget.getTable(constants.ISVISIBLE));
                       if (childVisible)
                           {
                               jspFile = childWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;
                               if (jspFile.equals("Button.jsp")) {
                                  if(childWidget.getTable(KonyServerWidget.IMAGE)!= LuaNil.nil) {
                                       jspFile = "Phone.jsp";
                                       childWidget.map.put("wType", "Phone");
                                   }
                               }
                               request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                               if (!(childWidget instanceof KonyContainer))
                               {
                                    %> <%if( (eventExist) &&(jspFile.equalsIgnoreCase("Label.jsp") ||
                                    jspFile.equalsIgnoreCase("Image.jsp") ||jspFile.equalsIgnoreCase("Image2.jsp"))) {%>
									<a konywidgettype="Kbox" eventname="<%=eventName%>event_"
									style="text-decoration: none;" <%if(preOnclickJS != null){ %>
									prejsevent="<%=preOnclickJS%>" <%} %>
									href="<%=response.encodeURL(apppath+"?formid="+frmId+"&cat=bjs"+ (WAPUtilities.getKRFId(request) != null &&
                                    WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+WAPUtilities.getKRFId(request) : "" ) +"&"+eventName + "event=x"+"&previousform=" + 
                                    (uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID) != null ? WAPUtilities.escapeHtml((String)uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)) : 
                                        uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID)) )%>">
				<%}%> <jsp:include page="<%=jspFile%>" /> <%if( (eventExist) &&(jspFile.equalsIgnoreCase("Label.jsp") ||
                                    jspFile.equalsIgnoreCase("Image.jsp") ||jspFile.equalsIgnoreCase("Image2.jsp"))) {%>
		</a> <%}%> <%

                               }
                               else
                               {
                                      if (!(fChild instanceof KonyContainer)) {
                                      %>
		</td>
		<%
                                      }
                                      %>
		<jsp:include page="<%=jspFile%>" />
		<%
                                       if (!(fChild instanceof KonyContainer))
                                       {
                                      %>
		<td>
			<%
                                       }
                                       else if ((childWidget instanceof KonyContainer) && (childWidgets.size() > i + 1)
                                                  && !(nextchildWidget instanceof KonyContainer))
                                       {
                                      %>
		
		<td>
			<%
                                       }
                                 }
                         }
 
                 }  //end of parsing non percennt hbox childrens.
                if (!(lChild instanceof KonyContainer))
                     {
                        %>
		</td>
		<%
                    }
          }
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
        %>

	</tr>
</table>
<%	
	request.removeAttribute("layout");
	request.setAttribute("widget.id", widgetId);
%>