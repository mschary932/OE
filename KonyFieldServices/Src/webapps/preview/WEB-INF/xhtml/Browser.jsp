
<%@page import="com.kony.web.exception.BrowseRedirectException"%>
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
        String method = "get";
	    if(urlConfig!=null)
           {
		    url = (String)urlConfig.map.get(constants.URL);    
            }
			    if(url != null && !url.trim().equals("")) {
		if(url.indexOf("http") == -1){
			url = "http://" + url;
		}
			                    
		         
		       /*  if(urlConfig.map.get(constants.REQUEST_METHOD) != null)
		        {
		             method = (String)urlConfig.map.get(constants.REQUEST_METHOD);
		        }   */       
		        if(method.equalsIgnoreCase("post")){
		            Object dataObj = null;
		             if(widget.map.get(constants.REQUEST_DATA) != null)
		             {
		                  dataObj =  widget.map.get(constants.REQUEST_DATA);
		             }
		             if(dataObj != null && dataObj instanceof com.konylabs.vm.LuaTable ){
		                 com.konylabs.vm.LuaTable dataTable = (com.konylabs.vm.LuaTable)dataObj;
		                 java.util.Map map = dataTable.map;
	%>

	<script type="text/javascript">
							var form1 = document.createElement("form");
							form1.action = "<%=url%>";
							form1.method = "get";
							form1.id = "browser";
							document.body.appendChild(form1);
					</script>

	<%
		if(map != null){
	%>
	<script type="text/javascript">
                               var input,name,value;
                               var properties = document.getElementById("browser");
                               <%for(Object key : map.keySet()){%>
									 input = document.createElement("input");
									 name = "<%=key%>";
									 value = "<%=map.get(key)%>
		";
		input.setAttribute("name", name);
		input.setAttribute("value", value);
		input.setAttribute("type", "hidden");
		properties.appendChild(input);
	<%}%>
		
	</script>
	<%
		}
	%>
	<script type="text/javascript">
		var temp = document.getElementById("browser");
		temp.submit();
	</script>
	<%
		}
			} else {
				List<LuaTable> requestData = null;    
			    if(urlConfig.map.get(constants.REQUEST_DATA) != null)
			    {
			        LuaTable dataObj =  (LuaTable)urlConfig.map.get(constants.REQUEST_DATA);
			        requestData = dataObj.list;
				if (requestData != null
						) {
					//com.konylabs.vm.LuaTable dataTable = (com.konylabs.vm.LuaTable) dataObj;
					//java.util.Map map = dataTable.map;
					//if (map != null) 
						StringBuffer urlBuf = new StringBuffer();
						urlBuf.append(url);
						urlBuf.append("?");
						 for(LuaTable param :  requestData){                        
				               urlBuf.append(param.list.get(0));
				               urlBuf.append("=");
						urlBuf.append(param.list.get(1));
							urlBuf.append("&");
						}
						urlBuf.deleteCharAt(urlBuf.length() - 1);
						url = urlBuf.toString();
					}
				}
				//response.sendRedirect(url);
				throw new BrowseRedirectException(url);
			}
		} else {
			out.println(widget.map.get(constants.HTML_STRING));
		}
	%>
</div>