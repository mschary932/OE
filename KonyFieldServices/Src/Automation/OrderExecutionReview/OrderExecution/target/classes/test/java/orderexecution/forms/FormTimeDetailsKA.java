package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormTimeDetailsKA {
	public FormTimeDetailsKA() throws Exception{
	
		AppElement lblheader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeDetailsKA_lblTaskDetailsKA"));
	}

public FormEditTimeItem clickOnEdit() throws Exception{
	AppElement btnEdit=new AppElement(OrderExecutionWidgetId.getWidgetId("frmExpenseDetailsKA_btnEditKA"));
	btnEdit.click();
	Thread.sleep(5000);
	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA"),20);
	AppElement Label1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA"));
	if(Label1.isElementVisible()){return new FormEditTimeItem();}
	return null;

}

public FormTimeAndExpenses back() throws Exception {
	AppElement btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmExpenseDetailsKA_btnBackKA"));
	btnBackKA.click();
    AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
    AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
    if(lblValue.isElementVisible()){
    	return new FormTimeAndExpenses();
    }
	return null;
}

public void clickOnRemove()  throws Exception{
	AppElement btnRemove=new AppElement(OrderExecutionWidgetId.getWidgetId("frmExpenseDetailsKA_btnRemoveKA"));
	btnRemove.click();
	Thread.sleep(10000);
	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
}
	
	
}


