
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
<%if (request.getAttribute("layout") != null && request.getAttribute("layout").equals("nonpercent")) {%>
    <select <%if(widget.getTable(KonyServerWidget.ENABLED)!= null){ %><%=widget.getTable(KonyServerWidget.ENABLED)%> <% } %>
        style = " padding: 0px; "	class = "<%=widget.map.get(KonyServerWidget.SKIN)%>"
             konywidgettype = "Kcombobox"    name="<%=name%>"	id="<%=name%>"   
              <%=widget.map.get(WEBConstants.ENABLED) %> 
              >  
    <% } else {%>
    <select <%if(widget.getTable(KonyServerWidget.ENABLED)!= null){ %><%=widget.getTable(KonyServerWidget.ENABLED)%> <% } %>
           style = "width: 98%; padding: 0px;" class = "<%=widget.map.get(KonyServerWidget.SKIN)%>"
         konywidgettype = "Kcombobox"    name="<%=name%>"	id="<%=name%>"  
          <%=widget.map.get(WEBConstants.ENABLED) %> 
          >     
<% }%>
<%
        Object keysobj = widget.map.get("_keys");
        Object valuesobj = widget.map.get("_values");
        if (keysobj != null && valuesobj!=null )
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
                <option konywidgettype="Kcombobox" name="<%=name%>" id="<%=name%>" <%=selected%> value="<%=i%>"><%=val%>
                </option>
	<%
            }
        }
    %>
</select>