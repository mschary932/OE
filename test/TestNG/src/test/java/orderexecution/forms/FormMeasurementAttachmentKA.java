package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormMeasurementAttachmentKA {

	public FormMeasurementAttachmentKA() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
	}
	
	public  FormMeasurementExecutionKA navigateBackToMeasurementExecution() throws Exception {
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_btnBackKA"));
		btnBackKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		 AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
    	 if(Label.isElementVisible()) {return new FormMeasurementExecutionKA();}	
		return null;
		}
	
}