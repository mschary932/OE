package test.java.orderexecution.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.AppTimePicker;
import test.common.ListBox;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormEditTimeItem {
	public FormEditTimeItem() throws Exception{
	     AppElement lblHeader =new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA"));
		}
	public void SelectLabour() throws Exception{
		  AppElement listBoxExpenseTypeKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_listBoxExpenseTypeKA"));
		  listBoxExpenseTypeKA.click();
		  Thread.sleep(2000);
		  //listBoxExpenseTypeKA.type("");
//		  AppElement.waitForEnable("android:id/content");
		  ListBox.selectFromListBox("STD SERVICE");
		  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA"));
		  }
	  
	  public void selectDate() throws Exception{
		 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_flxCalenderViewKA"));
		 AppElement flxCalenderViewKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_flxCalenderViewKA"));
		 flxCalenderViewKA.click(); 
		 AppCalendar calendar = new AppCalendar(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_flxCalenderr"));
		 calendar.clickDay(5);
		 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_btnDoneCalenderr"));
		 AppElement btnDoneCalenderr=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_btnDoneCalenderr"));
		 btnDoneCalenderr.click(); 
		 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA"));
	  }
	  
	  public void  setDuration() throws Exception{
		  AppElement flxDurationViewKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_flxDurationViewKA"));
		  flxDurationViewKA.click();
		  AppTimePicker time = new AppTimePicker(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_TimePicker"));
		  time.setHour("05"); 
		  time.setMinute("10");
		  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_btnDone"));
		  AppElement btnDone=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_btnDone"));
		  btnDone.click();
		  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA")); 
	  }
	  
	  public void ClickDone() throws Exception{
		  AppElement btnCheckKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_btnCheckKA"));
		  btnCheckKA.click();
		  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
	  }
	  
	  public void ClickDoneinEdit() throws Exception{
		  AppElement btnCheckKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_btnCheckKA"));
		  btnCheckKA.click();
		  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmExpenseDetailsKA_lblTaskDetailsKA"));
	  }
	  

}
