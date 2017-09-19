package test.java.orderexecution.forms;



import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormOrderDetails {

	FormOrderExecution frmOrderExecution;
	AppElement btnBackKA;
	public FormOrderDetails() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblHeaderKA"));
	}
	public FormContactDetails navigateToContactDetails() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_flxParentContactKA"));
		AppElement flxContact = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_flxParentContactKA"));
		flxContact.click();
		AppElement lblHeaderKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblHeaderKA"));
		boolean isVisible = lblHeaderKA.isElementVisible();
		if(isVisible){return new FormContactDetails();}
		return null;
	}
	public void navigateToLocationDetails() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_flxLocationKA"));
		AppElement flxLocation = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_flxLocationKA"));
		flxLocation.click();	
	}
	
	public void navigateToInstructionDetails() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_flxParentDescKA"));
		AppElement flxInstructions = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_flxParentDescKA"));
		flxInstructions.click();	
	}
	 public FormOrderExecution clicknevigatebackOrderExecution() throws Exception{
		 btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_btnBackKA"));
		 btnBackKA.click();
		AppElement isVisible=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		 if(isVisible.isElementVisible()){return new FormOrderExecution();}
			return null;
		 }
	public void navigateToOrderAsset() throws Exception {
		String lblObjectKA = "Object";
		AppElement.scrollUntilVisible(lblObjectKA);
		AppElement flxObjectKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblObjectKA"));
		flxObjectKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderAssetKA_lblOrderObjectHeaderKA"));
	}

}
