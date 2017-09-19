package test.java.orderexecution.forms;

import java.util.ArrayList;
import java.util.List;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormOrdersViewsKA {
	
	AppElement lblHeaderKA;
	AppElement segRowPriority;
	AppElement segRowToday;
	AppElement segRowStatus;
	AppElement segRowNearMe;
	AppElement segRowScheduled;
	AppElement segRowStarted;
	Segment sgOrderview;
	
	public FormOrdersViewsKA() throws Exception{
		
		sgOrderview = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_segOrderViewKA"),OrderExecutionWidgetId.getWidgetId("tmpViewBodyKA_lblTaskViewKA"));

	}
	
	public void applyFilter(String filter) throws Exception {
		switch(filter){
			case "Today": 
				sgOrderview.clickSegRowElementbyLabel("Today");
				break;
			case "Priority": 
				sgOrderview.clickSegRowElementbyLabel("Priority");
				break;
			case "Status": 
				sgOrderview.clickSegRowElementbyLabel("Status");
				break;
			case "Scheduled": 
				sgOrderview.clickSegRowElementbyLabel("Scheduled");
				break;
			case "Started": 
				sgOrderview.clickSegRowElementbyLabel("Started");
				break;
			case "Near Me": 
				sgOrderview.clickSegRowElementbyLabel("Near Me");
				break;
			default:
				throw new Exception("Invalid filter: " + filter);
		}
	}
		
	public FormOrderListKA onClickDone() throws Exception{
		AppElement btnDone=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_btnOKKA"));
		btnDone.click();
		return new FormOrderListKA();
	}
		
	public void clickOnFilter(String filter) throws Exception {
		
		Segment statusFilter = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_segFilterViewKA"),OrderExecutionWidgetId.getWidgetId("tmpFilterBodyKA_lblTaskKA"));
		System.out.println("###########CLicking on the filter");
		statusFilter.clickSegRowElementbyLabel(filter);
		
	}
	
	public List<String> readAllValuesForID(String WidgetID) throws Exception{
    	List<AppElement> Labels=AppElement.getAppElements(WidgetID);
    	List<String> list=new ArrayList<String>();
		System.out.println("***************************************************************");
		System.out.println("For the ID : '"+WidgetID+"' the values are ");
		System.out.println("Count : "+Labels.size());
		for (int i = 0; i < Labels.size(); i++) {
			System.out.println(Labels.get(i).getText());
			Thread.sleep(2000);
			list.add(i, Labels.get(i).getText());
			Thread.sleep(2000);
		}
		return list;
	}
	
    public boolean verifyFilterApplied(String filter, int index) throws Exception {
    	
    	List <String> lblValues = readAllValuesForID(OrderExecutionWidgetId.getWidgetId("tmpFilterBodyKA_lblValueKA"));
		String filterApplied = lblValues.get(index);
		if(filterApplied.equals(filter))
		{
			System.out.println("************ TEST CASE PASSED ************");
			return true;
		}
		else
		{
			System.out.println("************ TEST CASE PASSED ************");
			return false;
		}	
    }
    public void clickCancel() throws Exception{
    	AppElement btnCancelKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_btnCancelKA"));
    	btnCancelKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
    }
} 