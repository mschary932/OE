package test.java.orderexecution.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.AppTimePicker;
import test.common.ListBox;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormAddTimeItem {
	
	public FormAddTimeItem() throws Exception{
     AppElement lblHeader =new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA"));
	}
	
  public FormAddExpenseItem Cancel() throws Exception {
	AppElement btnCancel=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_btnCancelKA"));
	  btnCancel.click();
	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddTimeExpenseKA_lblTitleKA"));
	AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddTimeExpenseKA_lblTitleKA"));
	if(lblValue.isElementVisible()){ return new FormAddExpenseItem();}
	  return null;
   } 
  
  public void SelectLabour() throws Exception{
	  AppElement listBoxExpenseTypeKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_listBoxExpenseTypeKA"));
	  listBoxExpenseTypeKA.click();
	  Thread.sleep(2000);
//	  AppElement.waitForEnable("android:id/content");
	  ListBox.selectFromListBox("STD SERVICE");
	  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA"));
	  }
  
  public void selectDate() throws Exception{
	 AppElement imgDropIconKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_imgDropIconKA"));
	 imgDropIconKA.click();
	 AppCalendar calendar = new AppCalendar(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_flxCalenderr"));
	 calendar.clickDay(28);
	 
	 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_btnDoneCalenderr"));
	 AppElement btnDoneCalenderr=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_btnDoneCalenderr"));
	 btnDoneCalenderr.click(); 
	 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA"));
  }
  
  public void  setDuration() throws Exception{
	  AppElement lblDurationKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblDurationKA"));
	  lblDurationKA.click();
	  AppTimePicker time = new AppTimePicker(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_TimePicker"));
	  time.setHour("02"); 
	  time.setMinute("10");
	  AppElement btnDone=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_btnDone"));
	  btnDone.click();
	  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA")); 
  }
  
  public FormTimeAndExpenses ClickDone() throws Exception{
	  AppElement btnCheckKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_btnCheckKA"));
	  btnCheckKA.click();
	  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));	
	  AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
	  if(lblValue.isElementVisible()){
		return new FormTimeAndExpenses();
	  }
	  return null;
  }
  public FormTimeDetailsKA navigateToExpenseDetails() throws Exception{
		Segment segDetailsKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_SegTimeExpenseKA"),OrderExecutionWidgetId.getWidgetId("tmpTimeAndExpenseKA_lblvalue1KA"));
	    segDetailsKA.getElementWithIndex(0).click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmExpenseDetailsKA_lblTaskDetailsKA"));
  	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmExpenseDetailsKA_lblTaskDetailsKA"));
	    if(Label.isElementVisible()){ 
	    	return new FormTimeDetailsKA();
	    }
	   
			return null;
		} 
  
}
