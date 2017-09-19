package test.java.orderexecution.forms;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormNotesListKA {
	
	public FormNotesListKA() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
	}

	public FormCreateNotesKA navigateToCreateNotes() throws Exception {
		AppElement btnOrderNotesKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_btnAddKA"));
    	btnOrderNotesKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCreateNotesKA_lblNotesHeaderKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateNotesKA_lblNotesHeaderKA"));
		if(Label.isElementVisible()){return new FormCreateNotesKA();}
		return null;
	}

	public FormOrderExecution back() throws Exception {
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_btnBackKA"));
		btnBackKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		if(Label.isElementVisible()){return new FormOrderExecution();}
		return null;
	}

	public FormNotesDetailsKA navigateToNotesDetails() throws Exception {
		Segment segNotesListKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_segNotesListKA"),OrderExecutionWidgetId.getWidgetId("tmpNotesListKA_lblNotesDescKA"));
		segNotesListKA.getElementWithIndex(0).click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmNotesDetailsKA_lblNotesHeaderKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesDetailsKA_lblNotesHeaderKA"));
		if(Label.isElementVisible()){return new FormNotesDetailsKA();}
		return null;
	}	
}
