package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormCreateNotesKA {
	
	public FormCreateNotesKA() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
	}

	public void type() throws Exception {
		AppElement tbxTitleValueKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateNotesKA_tbxTitleValueKA"));
		tbxTitleValueKA.typeAndClickNext("New Note Title");
		AppElement txtAreaNotesValueKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateNotesKA_txtAreaNotesValueKA"));
		txtAreaNotesValueKA.type("New Note");
	}

	public FormNotesListKA done() throws Exception {
		AppElement btnDoneKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateNotesKA_btnDoneKA"));
		btnDoneKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
		if(Label.isElementVisible()){return new FormNotesListKA();}
		return null;
	}

	public FormNotesListKA cancel() throws Exception {
		AppElement btnCancelKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateNotesKA_btnCancelKA"));
		btnCancelKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
		if(Label.isElementVisible()){return new FormNotesListKA();}
		return null;
	}

}
