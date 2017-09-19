<%@include file="common.jsp"%>
<%@page import="java.util.HashMap"%>

<%
		//SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
		String formid = frmId; //(String)uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);;
        String widgetid = (String)request.getAttribute("wid");
        String widgetRefStr = formid + "."+ widgetid;
        if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
        {
            widgetRefStr = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + widgetid;
        }
        if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
        {
            widgetRefStr = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + widgetid;
        }
        if(request.getAttribute("tabpaneid") != null)
        {
             widgetRefStr = formid +"."+request.getAttribute("tabpaneid")+"."+widget.getWidgetID();             
        }
%>
<input id="<%=widget.map.get("id")%>" type="text" format="<%=widget.map.get(constants.DATE_FORMAT)%>" name="<%=widget.map.get("id")%>"
         konywidgettype="Kcalendar"
         value="<%=uiState.getStringValue(widgetRefStr+".caltext")%>"
         dateval="<%=uiState.getStringValue(widgetRefStr+".date")%>"
         class="<%=widget.map.get("skin")%>"	style="<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>" />
