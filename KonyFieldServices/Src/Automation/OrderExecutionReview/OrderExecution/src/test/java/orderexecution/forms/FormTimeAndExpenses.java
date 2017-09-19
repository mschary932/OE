package test.java.orderexecution.forms;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormTimeAndExpenses {
 
	
	public FormTimeAndExpenses() throws Exception{
		AppElement lblheader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
	}
	
	public FormTaskExecutionKA back() throws Exception {
		AppElement btnHeaderKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_btnHeaderKA"));
        btnHeaderKA.click();
        AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
        AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
        if(lblValue.isElementVisible()){
        	return new FormTaskExecutionKA();
        }
		return null;
	}
	public FormTimeDetailsKA navigateToTimeDetails() throws Exception{
		//AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
		Segment segDetailsKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_SegTimeExpenseKA"),OrderExecutionWidgetId.getWidgetId("tmpTimeAndExpenseKA_lblvalue1KA"));		
//		segDetailsKA.clickSegRowElementbyLabel("HOTEL");
		segDetailsKA.getElementWithIndex(0).click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeDetailsKA_lblTaskDetailsKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeDetailsKA_lblTaskDetailsKA"));
	    if(Label.isElementVisible()){ 
	    	return new FormTimeDetailsKA();
	    }	   
			return null;
		} 
	public FormAddTimeAndExpenses navigatetoAddTimeAndExpense() throws Exception{
	 AppElement BtnTimeAndExpenseAddKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_BtnTimeAndExpenseAddKA"));
	 BtnTimeAndExpenseAddKA.click();
	 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddTimeExpenseKA_lblTitleKA"));
	 AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddTimeExpenseKA_lblTitleKA"));
	 if(lblValue.isElementVisible()){
		 return new FormAddTimeAndExpenses();
	 }
		return null;
	}
	public FormOrderExecution navigateToOrderExecutionfromTimeAndExpenses() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_btnHeaderKA"));
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_btnHeaderKA"));
		btnBackKA.click();
		AppElement lblHeaderKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		boolean isVisible = lblHeaderKA.isElementVisible();
		if(isVisible){return new FormOrderExecution();}
		return null;
	}
	public void navigateBack()throws Exception{
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_btnHeaderKA"));
		btnBackKA.click();
	}
	public void clickTime() throws Exception{
		  AppElement btnTimeKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_BtnTimeKA"));
		  btnTimeKA.click();
	}
	public void clickExpense() throws Exception{
		  AppElement btnExpenseKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_BtnExpenseKA"));
		  btnExpenseKA.click();
	}
	public void clickBoth() throws Exception{
			AppElement btnBothKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_BtnBothKA"));
			btnBothKA.click();
	}
	
	public FormTimeAndExpenses addTimeItem() throws Exception{
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA"));
			FormAddTimeItem formAddTimeItem =new FormAddTimeItem();
	    	formAddTimeItem.SelectLabour(); 
	    	formAddTimeItem.selectDate();
	    	formAddTimeItem.setDuration();
	    	formAddTimeItem.ClickDone();
		
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
			if(lblValue.isElementVisible()){
			return new FormTimeAndExpenses();
		 }
			return null;
		}
	
}
	
	

