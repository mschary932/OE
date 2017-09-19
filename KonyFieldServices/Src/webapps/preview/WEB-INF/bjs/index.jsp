<%@page import="com.kony.web.util.WAPUtilities"%>
<%@page import="com.konylabs.api.StandardLib"%>
<%@page import="com.kony.log.adapter.LogFactory"%>
<%@page import="com.kony.log.adapter.Logger"%>
<%! 
Logger logger = LogFactory.getLogger(StandardLib.class);
%>

<%
WAPUtilities util = new WAPUtilities();
logger.debug(util.getRequestHeadersJSON(request));

if(request.getAttribute("isPopup") != null) 
{%>
<jsp:include page="Popup.jsp"/>
<%
}
else
{ %>
<jsp:include page="Form.jsp"/>
<%}%>