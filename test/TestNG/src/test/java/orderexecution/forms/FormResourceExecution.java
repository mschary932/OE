package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormResourceExecution {
	
	 public FormResourceExecution() throws Exception{
		 AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA"));
		 }
	
	public FormOrderResourceDetails navigateToResourceDetails() throws Exception{
		AppElement btnResourceDetails = new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_btnResorceDetailsKA"));
		btnResourceDetails.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderResourceDetailsKA_lblHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourceDetailsKA_lblHeaderKA"));
    	if(Label.isElementVisible()) 
		return new FormOrderResourceDetails();	
		return null;
	}
	
	public FormOrderResourceListKA navigateToResourceList() throws Exception{
		AppElement btnBack=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_btnBackKA"));
		btnBack.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
    	if(Label.isElementVisible()) {return new FormOrderResourceListKA();}	
		return null;
	}
	
	public FormTaskResourcesListKA navigateToTaskResourceList() throws Exception{
		AppElement btnBack=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_btnBackKA"));
		btnBack.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
    	if(Label.isElementVisible()) {return new FormTaskResourcesListKA();}	
		return null;
	}
	
	
	public FormTaskExecutionKA navigateToTaskExecution() throws Exception{
		AppElement btnBack=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_btnBackKA"));
		btnBack.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
    	if(Label.isElementVisible()) {return new FormTaskExecutionKA();}	
		return null;
	}
	
	public void clickBack() throws Exception{
		AppElement btnBack=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_btnBackKA"));
		btnBack.click();
	}

	public void clickEdit() throws Exception {
		AppElement btnEditKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_btnEditKA"));
		btnEditKA.click();
	}

	public void typeQuantity() throws Exception {
		AppElement tbxQuantityKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_tbxQuantity1KA"));
		tbxQuantityKA.type("8");
		
	}

	public void clickSave() throws Exception {
		AppElement btnSaveKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_btnSaveKA"));
		btnSaveKA.click();
	}
	
	public FormOrderImagesKA navigateToResourceImages() throws Exception {
		AppElement btnResourceImagesKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_btnResourceImagesKA"));
		btnResourceImagesKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskAttachmentKA_lblHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskAttachmentKA_lblHeaderKA"));
    	if(Label.isElementVisible()) {return new FormOrderImagesKA();}	
		return null;
	} 
 
	public FormResourceAttachment navigateToResourceAttachmentForm() throws Exception{
		  AppElement btnOrderAttachmentKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_btnAttachmentsKA"));
		  btnOrderAttachmentKA.click();
		  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
		  AppElement Label1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
		  if(Label1.isElementVisible()){return new FormResourceAttachment();}
		  return null;
	}
}
