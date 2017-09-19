package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;


public class FormCreateTaskDescriptionKA {

	public FormCreateTaskDescriptionKA() throws Exception {
		AppElement label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmNewTaskKA_lblAddTaskHeaderKA"));
	}

	public void enterTaskDescription() throws Exception {
		AppElement txtAreaDescriptionKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmNewTaskKA_txtAreaTaskDescriptionKA"));
		txtAreaDescriptionKA.type("New Task description.");
	}

	public FormOrderExecution clickDone() throws Exception
	{
		AppElement btnDoneKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmNewTaskKA_btnAddKA"));
		btnDoneKA.click();
		Thread.sleep(3000);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));    	
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
        if(Label.isElementVisible()){ 
        	return new FormOrderExecution();
        }
		return null;
	}

}
