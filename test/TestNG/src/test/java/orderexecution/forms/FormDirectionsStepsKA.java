package test.java.orderexecution.forms;

import test.common.Alerts;
import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormDirectionsStepsKA {
	
	public FormDirectionsStepsKA() throws Exception {
    	AppElement lbl = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDirectionStepsKA_lblHeaderKA"));
	}

	public FormDirectionsKA navigateBack() throws Exception {
		AppElement btnDirection = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDirectionStepsKA_btnBackKA"));
		btnDirection.click();
		try{
    		AppElement.waitForName("OK");
			Alerts.btnClickLable("OK");
		}catch(Exception e){
			System.out.println("###No popup appeared ,so moving ahead with execution###");
		}
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmDirectionsKA_lblHeaderKA"));
		AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDirectionsKA_lblHeaderKA"));
		if (label.isElementVisible()) 
			return new FormDirectionsKA();
		return null;
	}
	
}