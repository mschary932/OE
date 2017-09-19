package test.java.orderexecution.forms;


import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormCompleteOrderAcceptanceKA {

FormCompleteOrderKA	frmCompleteOrderKA;
AppElement switchProblemSolved1KA;
AppElement tbxProblemSolved2KA;
AppElement btnDoneKA;

	public FormCompleteOrderAcceptanceKA() throws Exception{
	 AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderAcceptanceKA_lblCompleteOrderKA"));
	 }

	public void ValidateswitchProblemSolved1KA() throws Exception {
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderAcceptanceKA_switchProblemSolved1KA"));
		switchProblemSolved1KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderAcceptanceKA_switchProblemSolved1KA"));
		switchProblemSolved1KA.swipeLeft(90);	
	}
	public void type()throws Exception{
		tbxProblemSolved2KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderAcceptanceKA_tbxProblemSolved2KA"));
		tbxProblemSolved2KA.type("My work is done");	
	}
 public void navigatetoCompleteOrderFromAcceptance() throws Exception{
	 btnDoneKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderAcceptanceKA_btnDoneKA"));
	 btnDoneKA.click();
 }
}