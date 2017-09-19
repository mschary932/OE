package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormOrderAttachments {
	
	AppElement btnBackKA;
	public FormOrderAttachments() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
	}
	
	//To navigate back toorderExecution
	public FormOrderExecution clicknevigatebackOrderExecution() throws Exception{
		btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_btnBackKA"));
		btnBackKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		AppElement isVisble=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA")); 
		if(isVisble.isElementVisible()) 
		return new FormOrderExecution();
		return null;
	 }
	public void navigateBack() throws Exception{
		btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_btnBackKA"));
		btnBackKA.click();
	}
	public boolean clickAttachment() throws Exception{
		boolean flag;
		try{
			flag = true;
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("tmpOrderAttachmentsKA_lblDocmtNameKA"));
		AppElement attachmentLabel = new AppElement(OrderExecutionWidgetId.getWidgetId("tmpOrderAttachmentsKA_lblDocmtNameKA"));
		attachmentLabel.click();
		}
		catch(Exception e){
			System.out.println("No any attachment found for this order.");
			flag = false;
		}
		return flag;
	}
}
