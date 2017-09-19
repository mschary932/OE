package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormOrderImagePreviewKA {
	
	public FormOrderImagePreviewKA() throws Exception {
		AppElement lbl = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskAttachmentImageKA_lblHeaderKA"));
	}
	
	public FormOrderImagesKA navigateBack() throws Exception {
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_btnBackKA"));
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_btnBackKA"));
		btnBackKA.click();
		AppElement lblHeaderKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_lblHeaderKA"));
		boolean isVisible = lblHeaderKA.isElementVisible();
		if(isVisible){return new FormOrderImagesKA();}
		return null;
	}
	
}
