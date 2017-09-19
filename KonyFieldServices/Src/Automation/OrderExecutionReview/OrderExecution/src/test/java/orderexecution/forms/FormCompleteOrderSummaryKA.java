package test.java.orderexecution.forms;


import java.util.HashMap;
import org.kony.qa.stargate.wrappers.appy.SgElement;
import org.testng.Assert;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.AppTimePicker;
import test.java.orderexecution.OrderExecutionWidgetId;


public class FormCompleteOrderSummaryKA {
 
	FormCompleteOrderKA frmCompleteOrderKA;
	 HashMap<String,String> status ;
	 
	 public FormCompleteOrderSummaryKA() throws Exception{
		 AppElement lbl = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_lblHeaderKA"));
		 status = new HashMap<String,String>();
		 status.put("E0001","Pending");
		 status.put("E0002","Scheduled");
		 status.put("E0003","On Route");
		 status.put("E0004","Started");
		 status.put("E0005","Paused");
		 status.put("E0006","Completed");
	 }
	 
	 public String getStartDate() throws Exception {
		 AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_lblStartDateKA"));
		 return label.getText();
	 }
	 
	 public String getStartTime() throws Exception {
		 AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_lblStartTimeKA"));
		 return label.getText();
	 }
	 
	 public String getEndDate() throws Exception {
		 AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_lblEndDateKA"));
		 return label.getText();
	 }
	 
	 public String getEndTime() throws Exception {
		 AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_lblEndTimeKA"));
		 return label.getText();
	 }
	 
	 public void startDateCalendar() throws Exception {
		 AppElement startDate = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_imgStartDateKA"));
		 startDate.click();
	 }
	 
	 public void endDateCalendar() throws Exception {
		 AppElement endDate = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_imgEndDateKA"));
		 endDate.click();
	 }
	 
	 public void startTimePicker() throws Exception {
		 AppElement startTime = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_imgStartTimeKA"));
		 startTime.click();
	 }
	 
	 public void endTimePicker() throws Exception {
		 AppElement endTime = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_imgEndTimeKA"));
		 endTime.click();
	 }
	 
	 public void cancelCalendar() throws Exception {
		 AppElement cancel = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_btnCancelKA"));
		 cancel.click();
	 }
	 
	 public void cancelTimePicker() throws Exception {
		 AppElement timePicker = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_btnCancelTimeKA"));
		 timePicker.click();
	 }
		 
	 public void changeDate(int day, int month, int year) throws Exception {
		 AppCalendar calendar = new AppCalendar(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_flxCalenderKA"));
		 calendar.clickDate(day, month, year);
		 AppElement done = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_btnDoneKA"));
		 done.click();
	 }
	 
	 public void changeTime(String hours, String minutes, String periods) throws Exception {
		 AppTimePicker timePicker = new AppTimePicker(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_pickerViewKA"));
		 timePicker.setHour(hours);
		 timePicker.setMinute(minutes);
		 timePicker.setPeriod(periods);
		 //timePicker.setTime(hours,  minutes, periods);
		 AppElement done = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_btnDoneTimeKA"));
		 done.click();
	 }
	 
	 public FormCompleteOrderKA navigatetoCompleteOrderFromSummary() throws Exception{
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_btnBackKA"));
		btnBackKA.click();
		String lblValue=SgElement.getTextBy("id", OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));
		if(frmCompleteOrderKA instanceof FormCompleteOrderKA)Assert.assertEquals(lblValue,"Complete Order");	
		return new FormCompleteOrderKA();	
	 }	
	 
}