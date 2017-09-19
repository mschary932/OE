package test.java.orderexecution.forms;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormCreateKA {
	
	public FormCreateKA() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateKA_lblTitleKA"));
	}

	public FormCreateMeasurementDescriptionKA clickMeasurement() throws Exception
	{
		Segment segOptionKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmCreateKA_segOptionKA"),OrderExecutionWidgetId.getWidgetId("tempCreateFormListKA_lblTaskNameKA"));
		segOptionKA.clickSegRowElementbyLabel("Measurements");
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCreateMeasurementDescriptionKA_lblCreateMeasurementKA"));    	
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateMeasurementDescriptionKA_lblCreateMeasurementKA"));
        if(Label.isElementVisible()){ return new FormCreateMeasurementDescriptionKA();}
		return null;
	} 

	public FormCreateTaskDescriptionKA clickTask() throws Exception {
		Segment segOptionKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmCreateKA_segOptionKA"),OrderExecutionWidgetId.getWidgetId("tempCreateFormListKA_lblTaskNameKA"));
		segOptionKA.clickSegRowElementbyLabel("Task");
		//AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmNewTaskKA_lblAddTaskHeaderKA"));
		Thread.sleep(3000);
		AppElement lblTaskHeader = new AppElement(OrderExecutionWidgetId.getWidgetId("frmNewTaskKA_lblAddTaskHeaderKA"));
        if(lblTaskHeader.isElementVisible()){
        	return new FormCreateTaskDescriptionKA();
        }
		return null;
	} 

}
