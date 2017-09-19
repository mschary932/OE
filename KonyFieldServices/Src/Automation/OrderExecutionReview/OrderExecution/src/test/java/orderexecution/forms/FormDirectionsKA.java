package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormDirectionsKA {
	
	public FormDirectionsKA() throws Exception {
    	AppElement lbl = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDirectionsKA_lblHeaderKA"));
	}
	
	public FormDirectionsStepsKA navigateToDirectionSteps() throws Exception {
		AppElement btnDirection = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDirectionsKA_btnDirectionSteps1KA"));
		btnDirection.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmDirectionStepsKA_lblHeaderKA"));
		AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDirectionStepsKA_lblHeaderKA"));
		if (label.isElementVisible()) 
			return new FormDirectionsStepsKA();
		return null;
	}
	
	public FormOrderExecution navigateBack() throws Exception {
		AppElement btnDirection = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDirectionsKA_btnBackKA"));
		btnDirection.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		if (label.isElementVisible()) 
			return new FormOrderExecution();
		return null;
	}
	
}