<%@page import="com.kony.web.exception.BrowseRedirectException"%>
<% 
try{
    if(request.getAttribute("isPopup") != null) 
    {%>
    <jsp:include page="Popup.jsp"/>
    <%
    }
    else
    { %>
    <jsp:include page="Form.jsp"/>
    <%} 
}catch(Exception e){
    Throwable ex = e.getCause();
    while(ex.getCause() != null && ex.getCause() != ex){
        ex = ex.getCause();
    }
    if(ex instanceof BrowseRedirectException){
        response.sendRedirect(((BrowseRedirectException)ex).getUrl());
        return;
    }
    else{
        throw e;
    }
}
%>
