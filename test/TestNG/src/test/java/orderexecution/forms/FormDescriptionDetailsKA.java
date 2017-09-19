package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormDescriptionDetailsKA {

	public FormDescriptionDetailsKA() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmDescriptionDetailsKA_lblHeaderKA"));
	}

	public FormTaskDetailsKA clickBack() throws Exception {
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmDescriptionDetailsKA_btnBackKA"));
		AppElement btnBack = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDescriptionDetailsKA_btnBackKA"));;
		btnBack.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblTaskDetailsKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblTaskDetailsKA"));
    	if(Label.isElementVisible()) {return new FormTaskDetailsKA();}	
		return null;
	}
}
