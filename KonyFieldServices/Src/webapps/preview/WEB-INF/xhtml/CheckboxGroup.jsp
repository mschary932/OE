<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.kony.web.util.JSWAPUtil"%>

<%@include file="common.jsp"%>

<%
        // widget margin is in above td as padding
        String orientation = (String) widget.map.get(constants.ITEM_ORIENTATION);
        String widgetSkin = "";
        if((widget.getTable(KonyServerWidget.SKIN)) != null &&  widget.getTable(KonyServerWidget.SKIN) != com.konylabs.vm.LuaNil.nil) {
            widgetSkin = (String)widget.getTable(KonyServerWidget.SKIN);
        }
				

        HashMap skinAttr = new HashMap();      
        String parentSkin = JSWAPUtil.getWidgetStyle(skinAttr);
        String eventName = widget.getWidgetID()+"check_box_event";
        String name = widget.getWidgetID();
        if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
        {
            eventName = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + eventName;
        }
        if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
        {
            eventName = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + eventName;
        }
        if(request.getAttribute("tabpaneid") != null)
        {
             eventName = request.getAttribute("tabpaneid")+"."+widget.getWidgetID()+"check_box_event";
             eventName = frmId +"."+eventName;
             name = frmId +"." +request.getAttribute("tabpaneid")+"."+name;
        }

%>

<input type="hidden" name="<%=eventName%>" value=""/>
    <%
        Object choiceKeysObj = widget.map.get("_keys");
        Object choiceValuesObj = widget.map.get("_values");
        if (choiceKeysObj != null && choiceValuesObj != com.konylabs.vm.LuaNil.nil && choiceKeysObj != com.konylabs.vm.LuaNil.nil && choiceValuesObj!=null )
        {
            java.util.Vector choiceKeys = (java.util.Vector) choiceKeysObj;
            java.util.Vector choiceValues = (java.util.Vector) choiceValuesObj;
            java.util.Vector selKeys = null;
            choiceKeysObj =  widget.map.get(constants.SELECTEDKEYS);
            if (choiceKeysObj != null)
            {
                selKeys = (java.util.Vector) choiceKeysObj;
            }
            %>
            <%if ("vertical".equals(orientation)){%>
                <div style = "<%=parentSkin%>" align="left">
            <%}else{%>
                <div style = "<%=parentSkin%>">
                    <p mode="wrap">
            <%}%>
            <%
           for(int i=0; i<choiceKeys.size(); i++)
            {
                String selKey = (String) choiceKeys.elementAt(i);
                String selVal = (String) choiceValues.elementAt(i);
                String selected = "";
                if (selKeys != null)
                    selected = (selKeys.contains(selKey)) ? "checked" : "";
                else if (selKey == null)
                    selected = (i == 0) ? "checked" : "";
                else
                    selected = "";
                %>

                <label class="<%=widgetSkin%>" style = "width: 100%; padding:0px;">
                <input  style="text-align:left; vertical-align: middle;" type="checkbox" <%=selected%> value="<%=i%>" <%=widget.getTable(KonyServerWidget.ENABLED)%>
                        name ="<%=name%>" id ="<%=name%>"
                        konywidgettype = "Kcheckboxgroup"
                        <% if(widget.map.get(constants.ONSELECTION) != LuaNil.nil && request.getAttribute("isPopup") == null) {%>
                            event = "yes"
                        <% } else { %>
                            event = ""
                        <% } %>
                         <%=widget.map.get(WEBConstants.ENABLED) %> 
                />
                        <%=selVal%>
                </label>
                <%if ("vertical".equals(orientation)){%>
                    <br/>
                <%} else{%>
                    &nbsp;
                <%}%>
            <%
            }%>

            <%if ("vertical".equals(orientation)){%>
                </div>
            <%}else{%>
                </p>
                </div>
            <%}%>
        <%}
    %>

