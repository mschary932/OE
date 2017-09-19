package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormReadingExecution {

	public FormReadingExecution() throws Exception {
	AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmReadingExecution_lbHeaderKA"));
	}

	public void typeValue() throws Exception {
		AppElement tbxValue = new AppElement(OrderExecutionWidgetId.getWidgetId("frmReadingExecution_tbxValue"));
		tbxValue.type("10");
	}

	public void typeNotes() throws Exception {
		AppElement tbxNote = new AppElement(OrderExecutionWidgetId.getWidgetId("frmReadingExecution_tbxNote"));
		tbxNote.type("Note");
	}

	public FormMeasurementReadings clickDone() throws Exception {
		AppElement btnDoneKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmReadingExecution_btnDoneKA"));
		btnDoneKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));    	
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
        if(Label.isElementVisible()){ return new FormMeasurementReadings();}
		return null;
	}

}
