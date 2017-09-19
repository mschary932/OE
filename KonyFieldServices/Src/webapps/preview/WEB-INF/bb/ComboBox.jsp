
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Vector"%>
<%@page import="com.konylabs.api.ui.KonyTab"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>

<%@include file="common.jsp"%>

<%
        String name = widget.getWidgetID();
        if(request.getAttribute("tabpaneid") != null)
        {
             name = frmId +"." +request.getAttribute("tabpaneid")+"."+name;
        }
%>
<%if (request.getAttribute("layout") != null && request.getAttribute("layout").equals("nonpercent")) {%>
    <select <%if(widget.getTable(KonyServerWidget.ENABLED)!= null){ %><%=widget.getTable(KonyServerWidget.ENABLED)%> <% } %>
            style = "<%=JSWAPUtil.getWidgetStyleInfo(widget, false)%> " class = "kheight <%=widget.getTable(KonyServerWidget.SKIN)%>"
            konywidgettype = "Kcombobox"    name="<%=name%>"	id="<%=name%>"
            <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
            <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
            <%if(widget.map.get(constants.BLOCKED_UI_SKIN)!= null){%> kblockinskin="<%=widget.map.get(constants.BLOCKED_UI_SKIN)%>" <% }%>
            <% if (widget.getTable(constants.ONSELECTION) != LuaNil.nil) {%>
                event = "yes" 	<% } else {%>	event = ""<% }%>   
                <%=widget.map.get(WEBConstants.ENABLED) %>         
    >
    <% } else {%>
    <select <%if(widget.getTable(KonyServerWidget.ENABLED)!= LuaNil.nil){ %><%=widget.getTable(KonyServerWidget.ENABLED)%> <% } %>
            style = "<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%> " class = "kheight <%=widget.getTable(KonyServerWidget.SKIN)%>"
            konywidgettype = "Kcombobox"    name="<%=name%>"	id="<%=name%>"
            <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
            <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
            <%if(widget.map.get(constants.BLOCKED_UI_SKIN)!= null){%> kblockinskin="<%=widget.map.get(constants.BLOCKED_UI_SKIN)%>" <% }%>            
            <% if (widget.getTable(constants.ONSELECTION) != LuaNil.nil) {%>
                event = "yes" 	<% } else {%>	event = ""<% }%>     
                <%=widget.map.get(WEBConstants.ENABLED) %>       
    >
<% }%>

<%
        Object keysobj = widget.map.get("_keys");
        Object valuesobj = widget.map.get("_values");
        if (keysobj != null && valuesobj != com.konylabs.vm.LuaNil.nil && keysobj != com.konylabs.vm.LuaNil.nil && valuesobj!=null )
        {
            java.util.Vector keys = (java.util.Vector) keysobj;
            java.util.Vector values = (java.util.Vector) valuesobj;
            java.util.Vector selkey = null;
            keysobj =   widget.map.get(constants.SELECTEDKEYS);
            if (keysobj != null)
            {
                    selkey = (java.util.Vector) keysobj;
            }


           for(int i=0; i<keys.size(); i++)
            {
                String key = (String) keys.elementAt(i);
                String val = (String) values.elementAt(i);
                                String selected = "";
                if (selkey != null)
                    selected = ( selkey.contains( key )) ? "selected" : "";
                else if (selkey == null)
                    selected = (i == 0) ? "selected" : "";
                else
                    selected = "";
                %>
                 <option <% if(widget.map.get(constants.ONSELECTION) != LuaNil.nil && request.getAttribute("isPopup") == null) {%> event="yes" <% } else { %>
		event="" <% } %> konywidgettype="Kcombobox" name="<%=name%>" id="<%=name%>" <%=selected%> value="<%=i%>"><%=val%>
	</option>
	<%
            }
        }
    %>
</select>