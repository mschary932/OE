package test.java.orderexecution.forms;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormMeasurementsKA {

	public FormMeasurementsKA() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_lblTitleKA"));
	}
	
	public  FormMeasurementExecutionKA navigateBackToMeasurementExecution() throws Exception {
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_btnBackKA"));
		btnBackKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		 AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
    	 if(Label.isElementVisible()) {return new FormMeasurementExecutionKA();}	
		return null;
		}
	
	public void clickOnViewsAndFilters() throws Exception {
		AppElement btnOptionsKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_btnOptionsKA"));
		btnOptionsKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("tmpTaskViewHeaderKA_lblHeaderTmpKA"));
		}
	
	public void clickOnCancelView() throws Exception {
		AppElement btnCancelMeasurementViewKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_btnCancelMeasurementViewKA"));
		btnCancelMeasurementViewKA.click();
		}
	
    public void clickOnApplyView() throws Exception {
		AppElement btnOkMeasurementViewKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_btnOkMeasurementViewKA"));
		btnOkMeasurementViewKA.click();
		}
	
	public  FormMeasurementReadings navigateToMeasurementReading() throws Exception {
		Segment segMeasurementPointsKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_segMeasurementPointsKA"),OrderExecutionWidgetId.getWidgetId("tmpMeasurementReadings_lblMeasurementNumberKA"));
		String lblMeasurementNumberKA = segMeasurementPointsKA.getElementWithIndex(0).getText();
		segMeasurementPointsKA.clickSegRowElementbyLabel(lblMeasurementNumberKA);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
    	if(Label.isElementVisible()) 
		return new FormMeasurementReadings();	
		return null;
		}
	
	public void doSearch(String searchText) throws Exception{
		AppElement SearchTextBox=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_tbxSearchKA"));
		SearchTextBox.typeAndClickSearch(searchText);
		Thread.sleep(5000);		
	}
	
	public boolean verifySearchResultByReadingName(String searchText) throws Exception {
		AppElement reading = new AppElement(OrderExecutionWidgetId.getWidgetId("tmpMeasurementReadings_lblMeasurementName"));
		String readingName = reading.getText();
		System.out.println(readingName+"    ********    "+searchText);
		if(readingName.contains(searchText))
			return true;
		else
			return false;
	}
	
}