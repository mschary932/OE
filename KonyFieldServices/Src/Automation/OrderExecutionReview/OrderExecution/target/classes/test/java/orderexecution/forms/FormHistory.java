package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormHistory {

	public FormHistory() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHistory_lblTitleKA"));
	}
	
	public void navigateBackToMeasurementReadings() throws Exception {
		AppElement btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHistory_btnBackKA"));;
		btnBackKA.click();	
	}

}
