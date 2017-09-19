package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormOrderResourceDetails {
	
	public FormOrderResourceDetails() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourceDetailsKA_lblHeaderKA"));
	}
	
	public FormResourceExecution clickBack() throws Exception{
		AppElement btnBack=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourceDetailsKA_btnBackKA"));
		btnBack.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA"));
    	if(Label.isElementVisible()) 
		return new FormResourceExecution();	
		return null;
	}
}
