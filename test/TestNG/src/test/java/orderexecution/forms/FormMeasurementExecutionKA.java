package test.java.orderexecution.forms;



import test.common.AppElement;
import test.common.Segment;

import test.java.orderexecution.OrderExecutionWidgetId;

public class FormMeasurementExecutionKA {
	public FormMeasurementExecutionKA() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
	}

	
	   //To navigate to Measurements
    public FormMeasurementsKA navigateToMeasurements() throws Exception {
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		AppElement btmMeasurementKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_btmMeasurementKA"));
		btmMeasurementKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_lblTitleKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_lblTitleKA"));
    	if(Label.isElementVisible()) {return new FormMeasurementsKA();}	
		return null;
	} 
    
    //To navigate to Measurement Attachment
    public FormMeasurementAttachmentKA navigateToMeasurementAttachment() throws Exception {
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		AppElement btnMeasurementKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_btnAttachmentsKA"));
		btnMeasurementKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
    	if(Label.isElementVisible()) {return new FormMeasurementAttachmentKA();}	
		return null;
	} 
    
    //To navigate to Measurement images
    public FormMeasurementImagesKA navigateToMeasurementimages() throws Exception {
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		AppElement btnMeasurementKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_btnImagesKA"));
		btnMeasurementKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskAttachmentKA_lblHeaderKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskAttachmentKA_lblHeaderKA"));
    	if(Label.isElementVisible()) {return new FormMeasurementImagesKA();}	
		return null;
	}
    
    
    
    
    
    //Navigate Back to OrderExecution
    public FormOrderExecution navigateBackToOrderExecution() throws Exception {
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_btnBackKA"));
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_btnBackKA"));
		btnBackKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
    	if(Label.isElementVisible()) {return new FormOrderExecution();}	
		return null;
	}
	
  //To click  start
    public void clickStart() throws Exception{
		AppElement btnHoldKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_btnHoldKA"));;
		btnHoldKA.click();
		AppSpecificFunctions.handleSync();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_btnHoldKA"));
	}


	public void clickComplete() throws Exception {
		AppElement btnHoldKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_btnHoldKA"));;
		btnHoldKA.click();	
		AppSpecificFunctions.handleSync();
		}


	public FormMeasurementReadings navigateToMeasurementReadings() throws Exception {
		Segment segMeasurementPointsKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_segMeasurementKA"),OrderExecutionWidgetId.getWidgetId("tmpMeasurementExecutionWithAddRemoveKA_lblMeasurementPointNameKA"));
		String lblMeasurementPointNameKA = segMeasurementPointsKA.getElementWithIndex(0).getText();
		segMeasurementPointsKA.clickSegRowElementbyLabel(lblMeasurementPointNameKA);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
    	if(Label.isElementVisible()) 
		return new FormMeasurementReadings();	
		return null;
		}
	
	
}
