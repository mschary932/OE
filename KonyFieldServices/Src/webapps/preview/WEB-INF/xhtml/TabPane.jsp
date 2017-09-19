<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Vector"%>
<%@page import="com.konylabs.api.ui.KonyTab"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>

<%@include file="common.jsp"%>

<%
	//SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
	String formid = frmId; //(String)uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);;
	String widgetid = (String)request.getAttribute(WEBConstants.WIDGET_ID);
	KonyServerWidget widgetInfo = (KonyServerWidget)((LuaTable)uiState.get(formid)).getTable(widgetid);
	Boolean isVisible =  (Boolean)widgetInfo.getTable(constants.ISVISIBLE);
        

if(isVisible){%>                                                                                     
	<jsp:include page="Tab.jsp"/>
<%}%>


