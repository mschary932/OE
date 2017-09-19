package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormOrderHistoryKA {
	
	public FormOrderHistoryKA() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderHistoryKA_lblHeaderKA"));
	}
	//To navigate back to order execution
	 public FormOrderExecution clicknevigatebackOrderExecutionfromHistory() throws Exception{
	        AppElement btnHeaderKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderHistoryKA_btnHeaderKA"));
			btnHeaderKA.click();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			AppElement label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			//boolean isVisble = SgElement.isElementVisible("id", OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
			if(label.isElementVisible()) 
			return new FormOrderExecution();
			return null;
		 }
	public void navigateToCompleteOrder() throws Exception{
		 AppElement btnHeaderKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderHistoryKA_btnHeaderKA"));
		btnHeaderKA.click();
		
	}
}
