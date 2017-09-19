package test.java.orderexecution.forms;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormStatusFilterKA {
	
	public FormStatusFilterKA() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_lblHeaderKA"));
	}
	
    //To navigate to orders-views form
    public FormOrdersViewsKA navigateToOrdersViews() throws Exception{
    	AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_btnBackKA"));
    	btnBackKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
		if(Label.isElementVisible()) 
		return new FormOrdersViewsKA();	
		return null;
    }
    
    public void clickOnApply() throws Exception {
    	
    	AppElement btnApplyKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_btnListKA"));
    	btnApplyKA.click();
    	System.out.println("FormStatusFilterKA : CLick Apply BUtton");
    	
    }
    
    public void clickOnCancel() throws Exception {
    	
    	AppElement btnCancelKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_btnBackKA"));
    	btnCancelKA.click();
    	System.out.println("FormStatusFilterKA : CLick Cancel BUtton");
    	
    }
    
    public void clickOnClearFilter() throws Exception {
    	
    	AppElement btnClearFilter = new AppElement(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_btnClearFiltersKA"));
    	btnClearFilter.click();
    	System.out.println("FormStatusFilterKA : CLick Clear Filter BUtton");
    	
    }
    
    public void applyFilter(String filter) throws Exception {
    	
    	Segment statusFilter = new Segment(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_segDateFilterKA"),OrderExecutionWidgetId.getWidgetId("tmpViewBodyKA_lblTaskViewKA"));
		statusFilter.clickSegRowElementbyLabel(filter);
		System.out.println("FormStatusFilterKA : Filter Applied");
    	
    }
        

}
