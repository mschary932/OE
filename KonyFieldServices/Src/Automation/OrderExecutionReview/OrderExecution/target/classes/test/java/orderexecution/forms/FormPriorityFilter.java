package test.java.orderexecution.forms;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormPriorityFilter {

	 public FormPriorityFilter() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_flxHeaderBodyKA"));
	}
	 
	 public void ClickStatus(int index) throws Exception{
		 Segment segPriority=new Segment(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_segDateFilterKA"),OrderExecutionWidgetId.getWidgetId("tmpViewBodyKA_lblTaskViewKA"));
		 segPriority.getElementWithIndex(index).click();
		 
	 }
	 
	public void clickDone() throws Exception{
		AppElement btnListKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_btnListKA"));
		btnListKA.click();
	}
	public void clickBack() throws Exception {
		AppElement btnBackKA =new AppElement(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_btnBackKA"));
		btnBackKA.click();
	}

	public void clickOnClearFilter() throws Exception {
    	
    	AppElement btnClearFilter = new AppElement(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_btnClearFiltersKA"));
    	btnClearFilter.click();
    	System.out.println("FormStatusFilterKA : CLick Clear Filter BUtton");
    	
    }
    
}
