package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormMeasurementReadings {

	public FormMeasurementReadings() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
	}
	
	public  FormMeasurementsKA navigateBackToMeasurements() throws Exception {
		clickBack();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_lblTitleKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_lblTitleKA"));
    	if(Label.isElementVisible()) {return new FormMeasurementsKA();}	
		return null;
		}
	
	public  FormMeasurementExecutionKA navigateBackToMeasurementExecution() throws Exception {
		clickBack();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
    	if(Label.isElementVisible()) {return new FormMeasurementExecutionKA();}	
		return null;
		}
	
	public  void clickBack() throws Exception {
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_btnBackKA"));
		btnBackKA.click();
		}

	public FormHistory navigateToHistory() throws Exception {
		AppElement btnHistory = new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_btnTaskDetailsKA"));
		btnHistory.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmHistory_lblTitleKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHistory_lblTitleKA"));
    	if(Label.isElementVisible()) {return new FormHistory();}	
		return null;
	}
	
	public FormReadingExecution addNewReading() throws Exception {
		AppElement btnAddReadingKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_btnAddReadingKA"));
		btnAddReadingKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmReadingExecution_lbHeaderKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmReadingExecution_lbHeaderKA"));
    	if(Label.isElementVisible()) {return new FormReadingExecution();}	
		return null;
	}
}
