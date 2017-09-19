package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormMeasurementImagesKA {

	public FormMeasurementImagesKA() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskAttachmentKA_lblHeaderKA"));
	}
	
	public  FormMeasurementExecutionKA navigateBackToMeasurementExecution() throws Exception {
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskAttachmentKA_btnBackKA"));
		btnBackKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		 AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
    	 if(Label.isElementVisible()) {return new FormMeasurementExecutionKA();}	
		return null;
		}
	
}
