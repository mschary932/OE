package test.java.orderexecution.forms;



import test.common.AppCalendar;
import test.common.AppElement;
import test.common.ListBox;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormAddExpenseItem {

  public FormAddExpenseItem() throws Exception{
  AppElement lblHeader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_lblExpenseKA"));
  }
 
  public FormAddTimeAndExpenses Cancel() throws Exception{
	 AppElement btnCancel=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_btnCancelKA"));
	 btnCancel.click();
	 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddTimeExpenseKA_lblTitleKA"));
	 AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddTimeExpenseKA_lblTitleKA"));
	 if(lblValue.isElementVisible()){ return new FormAddTimeAndExpenses();}
	  return null;
  }
  
  public void SelectExpense() throws Exception{
	  AppElement listBoxExpenseTypeKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_listBoxExpenseTypeKA"));
	  listBoxExpenseTypeKA.click();
	  Thread.sleep(2000);
//	  AppElement.waitForEnable("android:id/content");
	  ListBox.selectFromListBox("HOTEL");
	  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_lblExpenseKA"));
  }
  
  public void selectDate() throws Exception{
		 AppElement imgDropIconKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_imgDropIconKA"));
		 imgDropIconKA.click();
		 AppCalendar calendar = new AppCalendar(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_flxCalenderr"));
		 calendar.clickDay(25);
		 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_btnDoneCalenderr"));
		 AppElement btnDoneCalenderr=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_btnDoneCalenderr"));
		 btnDoneCalenderr.click(); 
		 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_lblExpenseKA"));
	  } 
  
  public void SetAmount() throws Exception{
	 AppElement  txtFieldAmountKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_txtFieldAmountKA"));
	 txtFieldAmountKA.type("120");
	 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_lblExpenseKA"));
  }
  
 
 
 public void ClickDone() throws Exception{
	  AppElement btnCheckKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_btnCheckKA"));
	  btnCheckKA.click();
//	  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_lblExpenseKA"));
 }
 
}
