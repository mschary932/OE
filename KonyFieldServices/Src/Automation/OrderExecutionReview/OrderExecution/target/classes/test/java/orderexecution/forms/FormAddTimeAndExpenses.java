package test.java.orderexecution.forms;


import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormAddTimeAndExpenses {
    
	public  FormAddTimeAndExpenses() throws Exception{
		AppElement lblheader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddTimeExpenseKA_lblTitleKA"));
	}
  	
	public FormTimeAndExpenses back() throws Exception{
	 AppElement btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddTimeExpenseKA_btnBackKA"));
	 btnBackKA.click();
	 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
	 AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
	 if(lblValue.isElementVisible()){return new FormTimeAndExpenses();  }
		return null;
	}
	public FormAddTimeItem navigateToAddTime() throws Exception{
	AppElement flexTimeKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddTimeExpenseKA_flexTimeKA"));
	flexTimeKA.click();
	Thread.sleep(2000);
	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA"));
	AppElement lblValue= new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA"));
	if(lblValue.isElementVisible()){return new FormAddTimeItem(); }
		return null;
	}
 public FormAddExpenseItem navigateToAddExpenses() throws Exception{
	 AppElement flexExpenseKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddTimeExpenseKA_flexExpenseKA"));
	 flexExpenseKA.click();
	 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_lblExpenseKA"));
	 AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_lblExpenseKA"));
	 if(lblValue.isElementVisible()){return new FormAddExpenseItem();    }
	 return null;
	 
 }
 	
	
}
