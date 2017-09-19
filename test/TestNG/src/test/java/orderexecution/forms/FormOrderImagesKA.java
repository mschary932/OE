package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormOrderImagesKA {

	public FormOrderImagesKA() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_lblHeaderKA"));
	}
	//To navigate back to order execution
	public FormOrderExecution navigateToOrderExecutionfromOrderImages() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_btnBackKA"));
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_btnBackKA"));
		btnBackKA.click();
		AppElement lblHeaderKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		boolean isVisible = lblHeaderKA.isElementVisible();
		if(isVisible){return new FormOrderExecution();}
		return null;
	}
	public void navigateBack()throws Exception{
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_btnBackKA"));
		btnBackKA.click();
	}
	public FormResourceExecution navigateToResourceExecution()throws Exception{
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_btnBackKA"));
		btnBackKA.click();
		AppElement lblHeaderKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		if (lblHeaderKA.isElementVisible()) {return new FormResourceExecution();}
		return null;
	}
}
