package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;


public class FormCreateMeasurementDescriptionKA {

	public FormCreateMeasurementDescriptionKA() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateMeasurementKA_lblCreateMeasurementKA"));
	}

	public void enterDescription() throws Exception
	{
		AppElement txtAreaNotesValueKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateMeasurementDescriptionKA_txtAreaNotesValueKA"));
		txtAreaNotesValueKA.type("New Measurement Task");
	}

	public FormCreateMeasurementKA clickDone() throws Exception
	{
		AppElement btnDoneKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateMeasurementDescriptionKA_btnDoneKA"));
		btnDoneKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCreateMeasurementKA_lblCreateMeasurementKA"));    	
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateMeasurementKA_lblCreateMeasurementKA"));
        if(Label.isElementVisible()){ return new FormCreateMeasurementKA();}
		return null;
	}

}
