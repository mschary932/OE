package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormTaskDetailsKA {

	public FormTaskDetailsKA() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblTaskDetailsKA"));
	}
	
	public FormTaskExecutionKA clickBack() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_btnBackKA"));
		AppElement btnBack = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_btnBackKA"));;
		btnBack.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
    	if(Label.isElementVisible()) {return new FormTaskExecutionKA();}	
		return null;
	}

	public FormDescriptionDetailsKA clickInstruction() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_flexContainerInfoKA"));
		AppElement flxInfo = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_flexContainerInfoKA"));;
		flxInfo.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmDescriptionDetailsKA_lblHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmDescriptionDetailsKA_lblHeaderKA"));
    	if(Label.isElementVisible()) {return new FormDescriptionDetailsKA();}	
		return null;
	}

}
