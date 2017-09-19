<%@page import="com.konylabs.api.ui.KonyCalendar"%>
<%@include file="common.jsp"%>
<%@page import="java.util.HashMap"%>
<%@page import="org.json.JSONArray"%>
<%@page import="com.konylabs.vm.LuaNil" %>

<%

        //SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
		String formid = frmId; //(String)uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);;
        String widgetid = (String)request.getAttribute("wid");
        String widgetRefStr = formid + "."+ widgetid;

        String calMode = (String)widget.map.get(constants.VIEW_TYPE);
        String calformat  = (String)widget.map.get(constants.DATE_FORMAT);
        String calid =   (String)widget.map.get("id");

        String monthFormatList = "1,2,3,4,5,6,7,8,9,10,11,12";

        HashMap styleMap = new HashMap();
        styleMap.put("margin", JSWAPUtil.getWidgetMargin(widget));
        styleMap.put("padding", JSWAPUtil.getWidgetPadding(widget));
        styleMap.put("width", JSWAPUtil.adjustedWeightForMarginandPadding(widget, "100"));
        String wSkin = JSWAPUtil.getWidgetStyle(styleMap);
        String placeHolder = "";
        KonyCalendar calendarWidget = (KonyCalendar)widget;
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
             widgetRefStr = request.getAttribute("tabpaneid")+"."+widget.getWidgetID();
             widgetRefStr = frmId +"."+widgetRefStr;
        }
%>

<% if(calMode.equals("normal")) { %>
<table>
    <tr>
    <td>
        <input id="<%=widget.getTable("id")%>" type="text" format="<%=calformat%>" name="<%=widget.getTable("id")%>"
         konywidgettype="Kcalendar"
         value="<%=uiState.getStringValue(widgetRefStr+".caltext")%>"
         placeholder = "<%=placeHolder%>"
         dateval="<%=uiState.getStringValue(widgetRefStr+".date")%>"
            class="<%=widget.getTable("skin")%>" style="<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>"
            <%=widget.map.get(WEBConstants.ENABLED) %>
	/>
    </td>
    </tr>
</table>



<% } else if(calMode.equals("inline")) { %>

<% String calinlinemode= widgetid +"_inlinemode"; %>

<input id="<%=calinlinemode%>" type="hidden" format="<%=calformat%>" name="<%=widgetid%>" konywidgettype="Kcalendar"
       value="<%=uiState.getStringValue(widgetRefStr+".caltext")%>" placeholder = "<%=placeHolder%>"
dateval="<%=uiState.getStringValue(widgetRefStr+".date")%>" 
<%=widget.map.get(WEBConstants.ENABLED) %>
/>
<table id="<%=widgetid%>_calendar" cols="3" style="width:100%" class="<%=widget.getTable(KonyServerWidget.SKIN)%>">
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
<% } else if(calMode.equals("popup")) { %>
        <%

                String titleOnPopup = "";
                if(widget.map.get(constants.TITLE_ONPOPUP) != null && !(widget.map.get(constants.TITLE_ONPOPUP) instanceof LuaNil))
                    titleOnPopup = (String) widget.map.get(constants.TITLE_ONPOPUP);
		String startDateStr = "";
		String endDateStr = "";
                //Suma:Sep26,2011 Added support for calendar internationalization
                String monthsStr = "";
                String weekDaysStr = "";
                String daysStr = "";

                //Suma:Dec12,2011 Added support for calendar dates enable and disable
                String calendarenableddatesStr = null;
                String enabledStartDateStr = null;
		String enabledEndDateStr = null;
		String calendarskinfordatesStr = null;
                String calendarskinStr = null;
                String enabledisableflagStr = null;
                String calendarskindatesStr = null;
                String mtdlistStr = null;

		Object dateObj = uiState.get(widgetRefStr+".startdate");

		if(dateObj != null && !(dateObj instanceof com.konylabs.vm.LuaNil)){
		    if(dateObj instanceof com.konylabs.vm.LuaTable){
		        startDateStr = com.konylabs.api.util.JSONUtil.convertLuaTableToJSON((com.konylabs.vm.LuaTable)dateObj);
		    }else if(dateObj instanceof String){
		        startDateStr = (String)dateObj;
		    }
		}

		dateObj = uiState.get(widgetRefStr+".enddate");

		if(dateObj != null && !(dateObj instanceof com.konylabs.vm.LuaNil)){
		    if(dateObj instanceof com.konylabs.vm.LuaTable){
		        endDateStr = com.konylabs.api.util.JSONUtil.convertLuaTableToJSON((com.konylabs.vm.LuaTable)dateObj);
		    }else if(dateObj instanceof String){
		        endDateStr = (String)dateObj;
		    }
		}

                //Suma:Sep26,2011 Added support for calendar internationalization
                Object monthsObj = uiState.get(widgetRefStr+".months");

		if(monthsObj != null && !(monthsObj instanceof com.konylabs.vm.LuaNil)){
		    if(monthsObj instanceof com.konylabs.vm.LuaTable){
		        monthsStr = com.konylabs.api.util.JSONUtil.convertLuaTableToJSON((com.konylabs.vm.LuaTable)monthsObj);
		    }else if(monthsObj instanceof String){
		        monthsStr = com.konylabs.api.util.JSONUtil.getJSONString(monthsObj.toString());
		    }
		}

                //Suma:Sep26,2011 Added support for calendar internationalization
                Object weekdaysObj = uiState.get(widgetRefStr+".weekdays");

		if(weekdaysObj != null && !(weekdaysObj instanceof com.konylabs.vm.LuaNil)){
		    if(weekdaysObj instanceof com.konylabs.vm.LuaTable){
		        weekDaysStr = com.konylabs.api.util.JSONUtil.convertLuaTableToJSON((com.konylabs.vm.LuaTable)weekdaysObj);
		    }else if(weekdaysObj instanceof String){
		        weekDaysStr = com.konylabs.api.util.JSONUtil.getJSONString(weekdaysObj.toString());
		    }
		}

                //Suma:Sep26,2011 Added support for calendar internationalization
                Object daysObj = uiState.get(widgetRefStr+".days");

		if(daysObj != null && !(daysObj instanceof com.konylabs.vm.LuaNil)){
		    if(daysObj instanceof com.konylabs.vm.LuaTable){
		        daysStr = com.konylabs.api.util.JSONUtil.convertLuaTableToJSON((com.konylabs.vm.LuaTable)daysObj);
		    }else if(daysObj instanceof String){
		        daysStr = com.konylabs.api.util.JSONUtil.getJSONString(daysObj.toString());
		    }
		}

                //Suma:Dec12,2011 Added support for calendar dates enable and disable
                Object calendarenableddatesObj = uiState.get(widgetRefStr+".calendarenableddates");

		if(calendarenableddatesObj != null && !(calendarenableddatesObj instanceof com.konylabs.vm.LuaNil)){
		    if(calendarenableddatesObj instanceof com.konylabs.vm.LuaTable){
		        calendarenableddatesStr = com.konylabs.api.util.JSONUtil.convertLuaTableToJSON((com.konylabs.vm.LuaTable)calendarenableddatesObj);
		    }
		}

                Object enabledstartdateObj = uiState.get(widgetRefStr+".enabledstartdate");

		if(enabledstartdateObj != null && !(enabledstartdateObj instanceof com.konylabs.vm.LuaNil)){
		    if(enabledstartdateObj instanceof com.konylabs.vm.LuaTable){
		        enabledStartDateStr = com.konylabs.api.util.JSONUtil.convertLuaTableToJSON((com.konylabs.vm.LuaTable)enabledstartdateObj);
		    }else if(enabledstartdateObj instanceof String){
		        enabledStartDateStr = (String)enabledstartdateObj;
		    }
		}

		Object enabledenddateObj = uiState.get(widgetRefStr+".enabledenddate");

		if(enabledenddateObj != null && !(enabledenddateObj instanceof com.konylabs.vm.LuaNil)){
		    if(enabledenddateObj instanceof com.konylabs.vm.LuaTable){
		        enabledEndDateStr = com.konylabs.api.util.JSONUtil.convertLuaTableToJSON((com.konylabs.vm.LuaTable)enabledenddateObj);
		    }else if(enabledenddateObj instanceof String){
		        enabledEndDateStr = (String)enabledenddateObj;
		    }
		}

                 Object calendarskinObj = uiState.get(widgetRefStr+".calendarskin");

		if(calendarskinObj != null && !(calendarskinObj instanceof com.konylabs.vm.LuaNil)){
                     if(calendarskinObj instanceof String){
		        calendarskinStr = (String)calendarskinObj;
		    }
		}

	    Object calendarskinfordatesObj = uiState.get(widgetRefStr+".calendarskinfordates");
        
        if(calendarskinfordatesObj != null && !(calendarskinfordatesObj instanceof com.konylabs.vm.LuaNil)){
                     if(calendarskinfordatesObj instanceof String){
                calendarskinfordatesStr = (String)calendarskinfordatesObj;
            }
        }
		
		Object enabledisableflagObj = uiState.get(widgetRefStr+".enabledisableflag");

		if(enabledisableflagObj != null && !(enabledisableflagObj instanceof com.konylabs.vm.LuaNil)){
                 if(enabledisableflagObj instanceof Boolean){
		        enabledisableflagStr = enabledisableflagObj.toString();
		    }
		}
                
                 Object mtdlistObj = uiState.get(widgetRefStr+".mtdlist");
                     if(mtdlistObj != null && !(mtdlistObj instanceof com.konylabs.vm.LuaNil)){
                        mtdlistStr = (String)mtdlistObj;
                     }

                //Suma:Dec12,2011 Added support for calendar dates enable and disable
                Object calendarskindatesObj = uiState.get(widgetRefStr+".calendarskindates");

		if(calendarskindatesObj != null && !(calendarskindatesObj instanceof com.konylabs.vm.LuaNil)){
		    if(calendarskindatesObj instanceof com.konylabs.vm.LuaTable){
		        calendarskindatesStr = com.konylabs.api.util.JSONUtil.convertLuaTableToJSON((com.konylabs.vm.LuaTable)calendarskindatesObj);
		    }
		}

		%>
                <div  id="Div_<%=widgetid%>" konywidgettype="Kcalendar" style="vertical-align: middle; text-align:left; line-height: 28px;min-height: 28px;"
                class="<%=widget.getTable(KonyServerWidget.SKIN)%> kheight" name="calBody"><input id="<%=widgetid%>" 
                                  align="left" size="12" type="text"   maxlength="10"
                    style="border: none; -webkit-appearance: none;background-color: transparent;  width: 100%;
                    text-align:<%=JSWAPUtil.getContentAlignment(widget) %>;" readonly=""
                    format="<%=calendarWidget.getFormat()%>" name="<%=widgetid%>" 
                    <%if(!"".equals(placeHolder)) {%>placeholder = "<%=placeHolder%>" <%} %>
                    value="<%=uiState.getStringValue(widgetRefStr+".date")%>"
                    dateval="<%=uiState.getStringValue(widgetRefStr+".date")%>"
                    konywidgettype="Kcalendar"                    
                    <%=widget.map.get(WEBConstants.ENABLED) %>
                    /><img  align="right" style="vertical-align: middle; float: right; "
                      onload = "kony.widgets.Calendar.setCalElementStyle(this.parentNode,true)" 
                    id = "show<%=widgetid%>"
                    konywidgettype="Kcalendar"
                    title="<%=titleOnPopup%>"                    
                    <%if(widget.map.get(constants.CLDR_TCON) != null && widget.map.get(constants.CLDR_TCON) != LuaNil.nil){%>
                        src=<%=imgpath + widget.map.get(constants.CLDR_TCON)%>
                    <%}else {%>
                        src=<%=imgpath + "konycalendar.png"%>
                    <%}%>
                    startdate="<%=startDateStr%>"    enddate="<%=endDateStr%>"

                    <%if(uiState.get(widgetRefStr+".months") != null) { %>
                        months=<%=monthsStr%>
                    <%}%>
                    <%if(uiState.get(widgetRefStr+".weekdays") != null) { %>
                        weekdays=<%=weekDaysStr%>
                    <%}%>
                     <%if(uiState.get(widgetRefStr+".days") != null) { %>
                        days=<%=daysStr%>
                    <%}%>
                    <%if(uiState.get(widgetRefStr+".calendarenableddates") != null) { %>
                        calendarenableddates=<%=calendarenableddatesStr%>
                    <%}%>
                    <%if(uiState.get(widgetRefStr+".calendarskin") != null) { %>
                        calendarskin="<%=calendarskinStr%>"
                    <%}%>
                    <%if(uiState.get(widgetRefStr+".enabledisableflag") != null) { %>
                        enabledisableflag=<%=enabledisableflagStr%>
                    <%}%>
                    <%if(uiState.get(widgetRefStr+".enabledstartdate") != null) { %>
                        enabledstartdate=<%=enabledStartDateStr%>
                    <%}%>
                    <%if(uiState.get(widgetRefStr+".enabledenddate") != null) { %>
                        enabledenddate=<%=enabledEndDateStr%>
                    <%}%>
                    <%if(uiState.get(widgetRefStr+".calendarskindates") != null) { %>
                        calendarskindates=<%=calendarskindatesStr%>
                    <%}%>
                    <%if(uiState.get(widgetRefStr+".calendarskinfordates") != null) { %>
                        calendarskinfordates="<%=calendarskinfordatesStr%>"
                    <%}%>
                    <%if(uiState.get(widgetRefStr+".mtdlist") != null) { %>
                         mtdlist=<%=mtdlistStr%>
                    <%}%> 
                    alt="Calendar" 
                    <%=widget.map.get(WEBConstants.ENABLED) %>
                    />
                </div>
                    

<% } %>