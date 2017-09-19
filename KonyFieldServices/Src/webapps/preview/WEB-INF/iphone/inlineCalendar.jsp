<%
    String dl = widgetid+"_inline_day";
    String ml = widgetid+"_inline_month";
    String yl = widgetid+"_inline_year";
	boolean ismonthsInNumberfmt = true;
%>
<%if(formatItem.equals("dd")){%>
	<%if(ismonthsInNumberfmt){%>
		<td style="width:25%;">
	<%}else{%>
		<td style="width:14%;">
	<%}%>
            <select id="<%=dl%>"  name="<%=dl%>" konywidgettype="KcalendarInline" style="width:100%;">
                <% for (int i = 1; i <= selDate.getActualMaximum(java.util.Calendar.DAY_OF_MONTH); i++){%>
                    <option id="<%=dl%>"  name="<%=dl%>" konywidgettype="KcalendarInline"
                    <%if(i == selDate.get(java.util.Calendar.DAY_OF_MONTH))
                    {%> selected <%} %>value="<%=i%>"><%=i%></option>
                <%}%>
            </select>
        </td>
<%}else if(formatItem.equalsIgnoreCase("MM")){%>
	<%if(months[0].length() <= 2)
	{%>
        <td style="width:35%;">		
	<%}
	else
	{%>
		<td style="width:46%">
		<%ismonthsInNumberfmt = false;
		}%>
            <select id="<%=ml%>" name="<%=ml%>" konywidgettype="KcalendarInline" style="width:100%;">
                 <% for (int i = 0; i < 12 ; i++){%>
                    <option  id="<%=ml%>" name="<%=ml%>" konywidgettype="KcalendarInline"
                    <%if(i == selDate.get(java.util.Calendar.MONTH)){%> selected <%} %> value="<%=i+1%>"><%=months[i]%></option>
                <%}%>
            </select>
        </td>	
<%}else if(formatItem.equals("yyyy")){%>
        <td style="width:40%;">
            <select id="<%=yl%>" name="<%=yl%>" konywidgettype="KcalendarInline" style="width:100%;">
                <% for (int i = startDate.get(java.util.Calendar.YEAR); i <= endDate.get(java.util.Calendar.YEAR) ; i++){%>
                    <option id="<%=yl%>" name="<%=yl%>" konywidgettype="KcalendarInline"
                    <%if(i == selDate.get(java.util.Calendar.YEAR)){%> selected <%} %>  value="<%=i%>"><%=i%></option>
                <%}%>
            </select>
        </td>
<%}else if(formatItem.equals("yy")){%>
        <td style="width:40%;">
            <select id="<%=yl%>" name="<%=yl%>" konywidgettype="KcalendarInline" style="width:100%;">
                <% for (int i = startDate.get(java.util.Calendar.YEAR); i <= endDate.get(java.util.Calendar.YEAR) ; i++){%>
                    <option id="<%=yl%>" name="<%=yl%>" konywidgettype="KcalendarInline"
                    <%if(i == selDate.get(java.util.Calendar.YEAR)){%> selected <%} %>  value="<%=i%>"><%=Math.abs(i-2000)%></option>
                <%}%>
            </select>
        </td>
<%}%>
