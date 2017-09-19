<%@include file="common.jsp"%>



<%
// need to write util jsp which convert skin attribute to rgb or #value where it is required.

            String widgetMargin = "";
            if(widget.getTable(KonyServerWidget.MARGIN) != null && !(widget.getTable(KonyServerWidget.MARGIN) instanceof com.konylabs.vm.LuaNil))
                widgetMargin = JSWAPUtil.getWidgetMargin(widget);

            String width = JSWAPUtil.adjustedWeightForMargin(widget, "100");
%>

<hr class="<%=widget.getTable(KonyServerWidget.SKIN)%>" style="height:<%=widget.getTable(KonyServerWidget.THICKNESS)%>px; margin: <%=widgetMargin%>;
    padding: <%=JSWAPUtil.getWidgetPadding(widget) %>; width:<%=width%>; " noshade />
