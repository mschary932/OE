package test.java.orderexecution.forms;
import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormOrderCompleteCheckListKA {

	FormCompleteOrderKA frmCompleteOrderKA;
	AppElement switchProblemSolved5KA;
	AppElement switchProblemSolved6KA;
	AppElement switchProblemSolved7KA;
	AppElement switchProblemSolved8KA;
	AppElement switchProblemSolved9KA;
	AppElement switchProblemSolved10KA;
	AppElement switchProblemSolved11KA;
	AppElement btnSaveKA;
	AppElement tbxProblemSolved5KA;
	AppElement tbxProblemSolved6KA;
	AppElement tbxProblemSolved7KA;
	AppElement tbxProblemSolved8KA;
	AppElement tbxProblemSolved9KA;
	AppElement tbxProblemSolved10KA;
	AppElement tbxProblemSolved11KA;
	
	 public FormOrderCompleteCheckListKA() throws Exception{
		 AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_lblCompleteOrderCLKA"));
		 }

	public void ValidateSwitchesCheckList() throws Exception {
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved5KA"));
		switchProblemSolved5KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved5KA"),true);
		switchProblemSolved5KA.click();
		tbxProblemSolved5KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_tbxProblemSolved5KA"),true);
		tbxProblemSolved5KA.type("I am not satisfied");
		
/*		switchProblemSolved6KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved6KA"),true);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved6KA"));
		switchProblemSolved6KA.click();
		tbxProblemSolved6KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_tbxProblemSolved6KA"),true);
		tbxProblemSolved6KA.type("I am not satisfied");
		
		switchProblemSolved7KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved7KA"),true);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved7KA"));
		switchProblemSolved7KA.click();
		tbxProblemSolved7KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_tbxProblemSolved7KA"),true);
		tbxProblemSolved7KA.type("I am not satisfied");
		
		switchProblemSolved8KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved8KA"),true);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved8KA"));
		switchProblemSolved8KA.click();
		tbxProblemSolved8KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_tbxProblemSolved8KA"),true);
		tbxProblemSolved8KA.type("I am not satisfied");
		
		switchProblemSolved9KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved9KA"),true);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved9KA"));
		switchProblemSolved9KA.click();
		tbxProblemSolved9KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_tbxProblemSolved9KA"),true);
		tbxProblemSolved9KA.type("I am not satisfied");
		
		switchProblemSolved10KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved10KA"),true);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved10KA"));
		switchProblemSolved10KA.click();
		tbxProblemSolved10KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_tbxProblemSolved10KA"),true);
		tbxProblemSolved10KA.type("I am not satisfied");
		
		switchProblemSolved11KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved11KA"),true);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_switchProblemSolved11KA"));
		switchProblemSolved11KA.click();
		tbxProblemSolved11KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_tbxProblemSolved11KA"),true);
		tbxProblemSolved11KA.type("I am not satisfied");
		*/

	}
	
 public void navigatetoCompleteOrderFromCheckList() throws Exception{
	 btnSaveKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderCompleteCheckListKA_btnSaveKA"));
	 btnSaveKA.click();
	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));
 }
}