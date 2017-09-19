
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Vector"%>
<%@page import="com.konylabs.api.ui.KonyTab"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="com.konylabs.api.util.JSONUtil" %>

<%@include file="common.jsp"%>

<%-- populate style after cgen modification--%>
<%-- All these code changes shd happen only if widget is enabled. Add that check --%>

<div style = "<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>"
   konywidgettype = "Kbrowser"
>
    <%
    LuaTable urlConfig = (LuaTable)widget.map.get(constants.REQUEST_URL_CONFIG);
    String url = null;
    if(urlConfig != null)    
    	url = (String)urlConfig.map.get(constants.URL);               
        if(url != null && !url.trim().equals("")) {
            if(!url.startsWith("http")){
                url = "http://" + url;
            }
    %>
    
    <script type="text/javascript">
            var form1 = document.createElement("form");
            form1.action = "<%=url%>";
            form1.method = "get";
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
    
    String method = (String)urlConfig.map.get(constants.REQUEST_METHOD);                            
    if("post".equals(method))
    {
        LuaTable dataObj =  (LuaTable)urlConfig.map.get(constants.REQUEST_DATA);
    	uiState.setWebTransactionVariable(WEBConstants.EXTERNAL_URL, url);
        if(requestData != null){
        	String str=JSONUtil.convertLuaTableToJSON(dataObj);
        	uiState.setWebTransactionVariable("Post_Data",str);
        }
    }
    else
    {
        if(requestData != null){
           StringBuffer urlBuf = new StringBuffer();
           urlBuf.append(url);
           urlBuf.append("?");
           
           for(LuaTable param : requestData){                        
               urlBuf.append(param.list.get(0));
               urlBuf.append("=");
               urlBuf.append(param.list.get(1));
                urlBuf.append("&");
           }
           urlBuf.deleteCharAt(urlBuf.length()-1);  
           url =  urlBuf.toString();
        }       
          
       }
    uiState.setWebTransactionVariable(WEBConstants.EXTERNAL_URL, url);
   conditions = WAPUtilities.checkForSpecialConditions(uiState);
    if (conditions != null && conditions.trim().length() != 0)
    {
        out.print(conditions+" ");
        %>
        <script type="text/javascript">
        kony.system.action.handleKonySecureCallAction('<%=conditions%>');
        </script>
        <%
        return;
    }      
        
         %>
             <script type="text/javascript">
                var temp = document.getElementById("browser");
                temp.submit();
             </script>
         <%
        }else{
            out.println(widget.map.get(constants.HTML_STRING));
        }
    %>
</div>