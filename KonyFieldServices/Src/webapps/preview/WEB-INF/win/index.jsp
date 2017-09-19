<%
if(request.getAttribute("isPopup") != null) 
{%>
<jsp:include page="Popup.jsp"/>
<%
}
else
{ %>
<jsp:include page="Form.jsp"/>
<%}%>