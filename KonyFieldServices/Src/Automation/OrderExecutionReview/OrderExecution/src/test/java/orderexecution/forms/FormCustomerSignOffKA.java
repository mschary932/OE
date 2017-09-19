package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormCustomerSignOffKA {

FormCompleteOrderKA	frmCompleteOrderKA;
AppElement switchProblemSolved1KA;
AppElement tbxProblemSolved2KA;
AppElement btnDoneKA,btnBackKA,btnCross;

	public FormCustomerSignOffKA() throws Exception{
	 AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCustomerSignOffKA_lblCustomerSignOffKA"));
	 }

	public void ValidateswitchProblemSolved1KA() throws Exception {
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCustomerSignOffKA_switchProblemSolved1KA"));
		switchProblemSolved1KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCustomerSignOffKA_switchProblemSolved1KA"));
//		switchProblemSolved1KA.swipeLeft(90);
		switchProblemSolved1KA.click();
	}
	public void type()throws Exception{
		tbxProblemSolved2KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCustomerSignOffKA_tbxProblemSolved2KA"));
		tbxProblemSolved2KA.type("My work is done");	
	}
 public void navigatetoCompleteOrderFromCustomerSign() throws Exception{
	 btnDoneKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCustomerSignOffKA_btnDoneKA"));
	 btnDoneKA.click();
 }

public void clickBack() throws Exception {
	btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCustomerSignOffKA_btnCloseKA"));
	btnBackKA.click();
	
}

public void DismissPopup() throws Exception {
	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCustomerSignOffKA_lblOrderMessageKA"));
	btnCross = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCustomerSignOffKA_CopybtnBackKA088b0c7a5e5b544"));
	btnCross.click();
	
}
}