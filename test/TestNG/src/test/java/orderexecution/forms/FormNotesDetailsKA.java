package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormNotesDetailsKA {
	
	public FormNotesDetailsKA() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
	}

	public FormNotesListKA back() throws Exception {
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesDetailsKA_btnBackKA"));
		btnBackKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
		if(Label.isElementVisible()){return new FormNotesListKA();}
		return null;
	}

}
