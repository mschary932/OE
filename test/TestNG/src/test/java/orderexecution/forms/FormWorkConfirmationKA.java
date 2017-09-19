package test.java.orderexecution.forms;
import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormWorkConfirmationKA {

	FormCompleteOrderKA frmCompleteOrderKA;
	AppElement switchProblemSolved5KA;
	AppElement switchProblemSolved6KA;
	AppElement switchProblemSolved7KA;
	AppElement switchProblemSolved8KA;
	AppElement switchProblemSolved9KA;
	AppElement switchProblemSolved10KA;
	AppElement switchProblemSolved11KA;
	AppElement btnSaveKA,btnBackKA,btnCross;
	AppElement tbxProblemSolved5KA;
	AppElement tbxProblemSolved6KA;
	AppElement tbxProblemSolved7KA;
	AppElement tbxProblemSolved8KA;
	AppElement tbxProblemSolved9KA;
	AppElement tbxProblemSolved10KA;
	AppElement tbxProblemSolved11KA;
	
	 public FormWorkConfirmationKA() throws Exception{
		 AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_lblCompleteOrderCLKA"));
		 }

	public void ValidateSwitchesWorkConfirm() throws Exception {
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved5KA"));
		switchProblemSolved5KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved5KA"),true);
		switchProblemSolved5KA.click();
		Thread.sleep(5000);
		tbxProblemSolved5KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_tbxProblemSolved5KA"),true);
		tbxProblemSolved5KA.type("I am not satisfied");
		
/*		switchProblemSolved6KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved6KA"),true);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved6KA"));
		switchProblemSolved6KA.click();
		tbxProblemSolved6KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_tbxProblemSolved6KA"),true);
		tbxProblemSolved6KA.type("I am not satisfied");
		
		switchProblemSolved7KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved7KA"),true);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved7KA"));
		switchProblemSolved7KA.click();
		tbxProblemSolved7KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_tbxProblemSolved7KA"),true);
		tbxProblemSolved7KA.type("I am not satisfied");
		
		switchProblemSolved8KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved8KA"),true);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved8KA"));
		switchProblemSolved8KA.click();
		tbxProblemSolved8KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_tbxProblemSolved8KA"),true);
		tbxProblemSolved8KA.type("I am not satisfied");
		
		switchProblemSolved9KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved9KA"),true);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved9KA"));
		switchProblemSolved9KA.click();
		tbxProblemSolved9KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_tbxProblemSolved9KA"),true);
		tbxProblemSolved9KA.type("I am not satisfied");
		
		switchProblemSolved10KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved10KA"),true);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved10KA"));
		switchProblemSolved10KA.click();
		tbxProblemSolved10KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_tbxProblemSolved10KA"),true);
		tbxProblemSolved10KA.type("I am not satisfied");
		
		switchProblemSolved11KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved11KA"),true);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved11KA"));
		switchProblemSolved11KA.click();
		tbxProblemSolved11KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_tbxProblemSolved11KA"),true);
		tbxProblemSolved11KA.type("I am not satisfied");
		*/

	}
	
	 public void navigatetoCompleteOrderFromWorkConfirm() throws Exception{
		 btnSaveKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_btnSaveKA"));
		 btnSaveKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));
	 }

	public void ChangeSwitchBackTOYes() throws Exception {
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved5KA"));
		switchProblemSolved5KA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_switchProblemSolved5KA"));
//		switchProblemSolved5KA.click();
		String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_lblProblemSolvedVal5KA")).getText();
		if(lblValue.equals("No"))
			switchProblemSolved5KA.click();	
		else{
			switchProblemSolved5KA.click();	
		}
	}

	public void ClickBack() throws Exception {
		btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_btnBackKA"));
		btnBackKA.click();
	}

	public void DismissPopup() throws Exception {
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_lblOrderMessageKA"));
		btnCross = new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_CopybtnBackKA088b0c7a5e5b544"));
		btnCross.click();
		
	}
}