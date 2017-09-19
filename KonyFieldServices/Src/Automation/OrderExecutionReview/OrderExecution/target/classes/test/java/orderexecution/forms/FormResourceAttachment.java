package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormResourceAttachment {
	
	AppElement btnBackKA;
	public FormResourceAttachment() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
	}
	
	//To navigate back toorderExecution
	public FormResourceExecution clicknevigatebackResourceExecution() throws Exception{
		btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_btnBackKA"));
		btnBackKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA"));
		AppElement isVisble=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA")); 
		if(isVisble.isElementVisible())
		return new FormResourceExecution();
		return null;
	 }
	public void navigateBack() throws Exception{
		btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_btnBackKA"));
		btnBackKA.click();
	}
}
