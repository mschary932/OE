
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Vector"%>
<%@page import="com.konylabs.api.ui.KonyTab"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>

<%@include file="common.jsp"%>

<%-- populate style after cgen modification--%>
<%-- All these code changes shd happen only if widget is enabled.Add that chk --%>

<div style="<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>"
	konywidgettype="Kbrowser">
	<%
		LuaTable urlConfig = (LuaTable)widget.map.get(constants.REQUEST_URL_CONFIG);
        String url=null;
        String method=null;
	if(urlConfig!=null)
{
	     method=(String)urlConfig.map.get(constants.REQUEST_METHOD);
		    url = (String)urlConfig.map.get(constants.URL);    

}

		   if(url != null && !url.trim().equals("")) {
			   
			if(url.indexOf("http") == -1){
		url = "http://" + url;

			}
	%>

	<script type="text/javascript">
			var form1 = document.createElement("form");
			form1.method ="<%=method%>";
			form1.id = "browser";
			document.body.appendChild(form1);
	</script>

	<%
		List<LuaTable> requestData = null;    
			    if(urlConfig.map.get(constants.REQUEST_DATA) != null)
			    {
			        LuaTable dataObj =  (LuaTable)urlConfig.map.get(constants.REQUEST_DATA);
			        requestData = dataObj.list;
			    }
		if(requestData!=null ){
			if(method != null && !"".equals(method.trim())){
		
				if (requestData != null) {
					for (LuaTable params : requestData) {
	%>
	<script type="text/javascript">
									 var input = document.createElement("input");
									 var name = "<%=params.list.get(0)%>";
									 var value = "<%=params.list.get(1)%>";
		                             input.setAttribute("name", name);
		                              input.setAttribute("value", value);
		input.setAttribute("type", "hidden");
		
		form1.appendChild(input);
	</script>
	<%
		}
			   }
			
		}
			}
	%>
	<script type="text/javascript">
	form1.action = "<%=url%>";
		form1.submit();
	</script>
	<%
		} else {
			out.println(widget.map.get(constants.HTML_STRING));
		}
	%>
</div>