package test.java.orderexecution.forms;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormDateFilterKA {

	public FormDateFilterKA() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_lblHeaderKA"));
	}
	
	
    //To navigate to orders-views form
    public FormOrdersViewsKA navigateToOrdersViews() throws Exception{
    	AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_btnBackKA"));
    	btnBackKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
    	//Label.isElementVisible();
		//boolean isVisble = SgElement.isElementVisible("id", OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblHeaderKA"));
		if(Label.isElementVisible()) 
		return new FormOrdersViewsKA();	
		return null;
    }
    
    public void clickOnApply() throws Exception {
    	
    	AppElement btnApplyKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_btnListKA"));
    	btnApplyKA.click();
    	System.out.println("FormDateFilterKA : CLick Apply BUtton");
    	
    }
    
    public void clickOnCancel() throws Exception {
    	
    	AppElement btnCancelKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_btnBackKA"));
    	btnCancelKA.click();
    	System.out.println("FormDateFilterKA : CLick Cancel BUtton");
    	
    }
    
    public void clickOnClearFilter() throws Exception {
    	
    	AppElement btnClearFilter = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_btnClearFiltersKA"));
    	btnClearFilter.click();
    	System.out.println("FormDateFilterKA : CLick Clear Filter BUtton");
    	
    }
    
    public void applyFilter(String filter) throws Exception {
		Segment statusFilter = new Segment(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_segDateFilterKA"),OrderExecutionWidgetId.getWidgetId("tmpDateFIlterKA_lblTaskViewKA"));
		System.out.println("Clicking####################");
		statusFilter.clickSegRowElementbyLabel(filter);
		System.out.println("#######FormDateFilterKA : Filter Applied");
    	
    }
    

}
