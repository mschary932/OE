package test.java.orderexecution;

import java.io.IOException;

import test.common.WidgetID;

public class OrderExecutionWidgetId {
	static WidgetID widgetIds;
	
	public OrderExecutionWidgetId() throws IOException{
		widgetIds = new WidgetID("widgetid.properties");
		System.out.println("*************"+widgetIds+"*********************");
	}
	
	public static String getWidgetId(String key) throws Exception{
		if(widgetIds==null)
			widgetIds = new WidgetID("widgetid.properties");
		return widgetIds.getWidgetId(key);
	}

}
