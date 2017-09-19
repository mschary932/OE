
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Vector"%>
<%@page import="com.konylabs.api.ui.KonyTab"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="java.util.HashMap"%>

<%@include file="common.jsp"%>

<%
        String name = widget.getWidgetID();
        if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
        {
            name = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + name;
        }
        if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
        {
            name = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + name;
        }
        if(request.getAttribute("tabpaneid") != null)
        {
             name = frmId +"." +request.getAttribute("tabpaneid")+"."+name;
        }
%>
    <%if(request.getAttribute("layout")!= null && request.getAttribute("layout").equals("nonpercent"))
    {%>
        <select <%if(widget.getTable(KonyServerWidget.ENABLED)!= LuaNil.nil){ %><%=widget.getTable(KonyServerWidget.ENABLED)%> <% } %>
            <%if(widget.map.get(KonyServerWidget.MULTIPLE) != null && !(widget.map.get(KonyServerWidget.MULTIPLE).toString()).equals("false")){%> multiple <%}%>
        style = "padding: 0px;"
	class = "<%=widget.getTable(KonyServerWidget.SKIN)%>"    konywidgettype = "Klistbox"    name="<%=name%>"	id="<%=name%>"        
        <% if(widget.getTable(constants.ONSELECTION) != LuaNil.nil && request.getAttribute("isPopup") == null) {%>
            event = "yes" 	<% } else { %>	event = ""	<% } %>   
             <%=widget.map.get(WEBConstants.ENABLED) %> 
             >
    <%}
    else{%>
        <select <%if(widget.getTable(KonyServerWidget.ENABLED)!= LuaNil.nil){ %><%=widget.getTable(KonyServerWidget.ENABLED)%> <% } %>
            <%if(widget.map.get(KonyServerWidget.MULTIPLE) != null && !(widget.map.get(KonyServerWidget.MULTIPLE).toString()).equals("false")){%> multiple <%}%>
            style = "width: 98%; padding: 0px;"
	class = "<%=widget.map.get(KonyServerWidget.SKIN)%>"    konywidgettype = "Klistbox"  name="<%=name%>"	id="<%=name%>"        
        <% if(widget.getTable(constants.ONSELECTION) != LuaNil.nil && request.getAttribute("isPopup") == null) {%>
            event = "yes" 	<% } else { %>	event = ""	<% } %>      
             <%=widget.map.get(WEBConstants.ENABLED) %> 
             >
    <%}%>

<%
        Object keysobj = widget.map.get("_keys");
        Object valuesobj = widget.map.get("_values");
        if (valuesobj != null && keysobj != null)
        {
            java.util.Vector keys = (java.util.Vector) keysobj;
            java.util.Vector values = (java.util.Vector) valuesobj;
            java.util.Vector selkey = new java.util.Vector();
            keysobj =   widget.map.get(constants.SELECTEDKEY);
            Object selectedkeys = widget.map.get(constants.SELECTEDKEYS);
            
            if (keysobj != null)
            {
                    selkey.add(0, keysobj) ;                    
            }
            else
            {    
                selkey = (java.util.Vector)selectedkeys; 
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
                <option konywidgettype="Klistbox" name="<%=name%>" id="<%=name%>" <%=selected%> value="<%=i%>"><%=val%>
                </option>
	<%
            }
        }
    %>
</select>