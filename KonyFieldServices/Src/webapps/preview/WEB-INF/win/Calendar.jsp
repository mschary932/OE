<%@include file="common.jsp"%>
<%@page import="java.util.HashMap"%>

<%

        		//SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation] 
        		String formid = frmId; //(String)uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);;
        String widgetid = (String)request.getAttribute("wid");
        String widgetRefStr = formid + "."+ widgetid;

        String calMode = (String)widget.getTable(constants.VIEW_TYPE);
        String calformat  = (String)widget.getTable(constants.DATE_FORMAT);
        String calid =   (String)widget.getTable("id");

        String monthFormatList = "1,2,3,4,5,6,7,8,9,10,11,12";
        
        HashMap styleMap = new HashMap();
        styleMap.put("margin", JSWAPUtil.getWidgetMargin(widget));
        styleMap.put("padding", JSWAPUtil.getWidgetPadding(widget));
        styleMap.put("width", JSWAPUtil.adjustedWeightForMarginandPadding(widget, "100"));
        String wSkin = JSWAPUtil.getWidgetStyle(styleMap);
        
        String placeHolder = "";
        if(widget.map.get("placeholder") != null && !(widget.map.get("placeholder") instanceof LuaNil))
            placeHolder = (String) widget.map.get("placeholder");
        else
            placeHolder = calformat;

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

<% if("normal".equals(calMode)) { %>
<table>
    <tr>
    <td>
        <input id="<%=widget.getTable("id")%>" type="text" format="<%=calformat%>" name="<%=widget.getTable("id")%>"
         konywidgettype="Kcalendar"
         value="<%=uiState.getStringValue(widgetRefStr+".caltext")%>"
         placeholder = "<%=placeHolder%>"
         dateval="<%=uiState.getStringValue(widgetRefStr+".date")%>"
            class="<%=widget.getTable("skin")%>" style="<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>"
	/>
    </td>
    </tr>
</table>



<% } else if("inline".equals(calMode)) { %>

<% String calinlinemode= widgetid +"_inlinemode"; %>

<input id="<%=calinlinemode%>" type="hidden" format="<%=calformat%>" name="<%=widgetid%>" konywidgettype="Kcalendar" 
       value="<%=uiState.getStringValue(widgetRefStr+".caltext")%>"
dateval="<%=uiState.getStringValue(widgetRefStr+".date")%>" />
<table id="<%=widgetid%>_calendar" cols="3" style="width:100%">
<tr>
	<%
        String selectedDate = uiState.getStringValue(widgetRefStr+".date");
        String startDateStr = "{01,01,1900}";
		String endDateStr = "{31,12,2050}";
        java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("{dd,MM,yyyy}");
        java.util.Calendar startDate = new java.util.GregorianCalendar();
        java.util.Calendar endDate = new java.util.GregorianCalendar();
        java.util.Calendar selDate = new java.util.GregorianCalendar();

		Object dateObj = uiState.get(widgetRefStr+".startdate");

		if(dateObj != null && !(dateObj instanceof com.konylabs.vm.LuaNil)){
		    if(dateObj instanceof com.konylabs.vm.LuaTable){
		        startDateStr = com.konylabs.api.util.JSONUtil.convertLuaTableToJSON((com.konylabs.vm.LuaTable)dateObj);
		        format = new java.text.SimpleDateFormat("[dd,MM,yyyy]");
		    }else if(dateObj instanceof String){
		        startDateStr = (String)dateObj;
		    }
		}
        startDate.setTime(format.parse(startDateStr));

		format = new java.text.SimpleDateFormat("{dd,MM,yyyy}");
		dateObj = uiState.get(widgetRefStr+".enddate");
		if(dateObj != null && !(dateObj instanceof com.konylabs.vm.LuaNil)){
		    if(dateObj instanceof com.konylabs.vm.LuaTable){
		        endDateStr = com.konylabs.api.util.JSONUtil.convertLuaTableToJSON((com.konylabs.vm.LuaTable)dateObj);
		        format = new java.text.SimpleDateFormat("[dd,MM,yyyy]");
		    }else if(dateObj instanceof String){
		        endDateStr = (String)dateObj;
		    }
		}
        endDate.setTime(format.parse(endDateStr));

        if(selectedDate == null || selectedDate.equals("nil") || "".equals(selectedDate.trim())){
            selDate = startDate;
        }else{
        	java.text.SimpleDateFormat formater = new java.text.SimpleDateFormat(uiState.getStringValue(widgetRefStr+".javaformat"));
        	selDate.setTime(formater.parse(selectedDate));
        }
        //Suma:Sep26,2011 Added support for calendar internationalization
        String[] months = monthFormatList.split(",");
        Object monthsObj = uiState.get(widgetRefStr+".months");
        if(monthsObj != null && !(monthsObj instanceof com.konylabs.vm.LuaNil))
        {
            if(monthsObj instanceof com.konylabs.vm.LuaTable){
               months = WAPUtilities.getJSONArray((com.konylabs.vm.LuaTable)monthsObj);
            }
            else if(monthsObj instanceof String){
	      months = WAPUtilities.getJSONArray(monthsObj);
            }
        }
    %>
    <%
    String [] formatList = calformat.split("/");
    for(int j=0;j<formatList.length;j++) {
        String formatItem = formatList[j];%>
        <%@include file="inlineCalendar.jsp" %>
      <%  }%>
 </tr>
</table>

<% } %>