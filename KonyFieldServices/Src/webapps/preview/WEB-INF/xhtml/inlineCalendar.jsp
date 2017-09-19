<%
    String dl = widgetid+"_inline_day";
    String ml = widgetid+"_inline_month";
    String yl = widgetid+"_inline_year";
%>
<%if(formatItem.equals("dd")){%>
	<td>
            <select id="<%=dl%>"  name="<%=dl%>" konywidgettype="KcalendarInline">
                <% for (int i = 1; i <= selDate.getActualMaximum(java.util.Calendar.DAY_OF_MONTH); i++){%>
                    <option id="<%=dl%>"  name="<%=dl%>" konywidgettype="KcalendarInline"
                    <%if(i == selDate.get(java.util.Calendar.DAY_OF_MONTH))
                    {%> selected <%} %>value="<%=i%>"><%=i%></option>
                <%}%>
            </select>
        </td>
<%}else if(formatItem.equalsIgnoreCase("mm")){%>
        <td>
            <select id="<%=ml%>" name="<%=ml%>" konywidgettype="KcalendarInline">
                 <% for (int i = 0; i < 12 ; i++){%>
                    <option  id="<%=ml%>" name="<%=ml%>" konywidgettype="KcalendarInline"
                    <%if(i == selDate.get(java.util.Calendar.MONTH)){%> selected <%} %> value="<%=i+1%>"><%=months[i]%></option>
                <%}%>
            </select>
        </td>
<%}else if(formatItem.equals("yyyy")){%>
        <td>
            <select id="<%=yl%>" name="<%=yl%>" konywidgettype="KcalendarInline">
                <% for (int i = startDate.get(java.util.Calendar.YEAR); i <= endDate.get(java.util.Calendar.YEAR) ; i++){%>
                    <option id="<%=yl%>" name="<%=yl%>" konywidgettype="KcalendarInline"
                    <%if(i == selDate.get(java.util.Calendar.YEAR)){%> selected <%} %>  value="<%=i%>"><%=i%></option>
                <%}%>
            </select>
        </td>
<%}else if(formatItem.equals("yy")){%>
        <td>
            <select id="<%=yl%>" name="<%=yl%>" konywidgettype="KcalendarInline">
                <% for (int i = startDate.get(java.util.Calendar.YEAR); i <= endDate.get(java.util.Calendar.YEAR) ; i++){%>
                    <option id="<%=yl%>" name="<%=yl%>" konywidgettype="KcalendarInline"
                    <%if(i == selDate.get(java.util.Calendar.YEAR)){%> selected <%} %>  value="<%=i%>"><%=Math.abs(i-2000)%></option>
                <%}%>
            </select>
        </td>
<%}%>
