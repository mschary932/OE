package test.java.orderexecution.tests;

import java.lang.reflect.Method;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormCompleteOrderKA;
import test.java.orderexecution.forms.FormCompleteOrderSummaryKA;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormCompleteOrderSummary extends OrderExecutionBaseTest{
     
	@BeforeMethod(alwaysRun=true)	
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_lblHeaderKA"));
		} catch(Exception e) {			 
			if(ele == null) {
				if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
					FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
					FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
					FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));						
					FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
					AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
					Assert.assertEquals(lblexpect.getText(),"My Orders");					
				}
				try {                                        
					if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"))).getText().equalsIgnoreCase("My Orders")) {
						FormOrderListKA formOrderListKA = new FormOrderListKA();
						formOrderListKA.clickWorkorder(OrderState.stateAsStarted);
						//FormOrderExecution orderexecution = new FormOrderExecution();
						//orderexecution.clickOnRoute();
						//orderexecution.clickStart();
					}
				} catch(Exception ex) {
					System.out.println("*****Its not relaunched*****");
				}
			 	FormOrderExecution orderexecution = new FormOrderExecution();
			 	//orderexecution.clickOnRoute();
			 	//orderexecution.clickStart();
			 	orderexecution.clickComplete();
			 	FormCompleteOrderKA frmCompleteOrderKA = new FormCompleteOrderKA();
			 	frmCompleteOrderKA.onClickSummary();
			}
		}
	}	
	
	@Test
	public void testChangeStartDate() throws Exception {
		String expectedValue, afterValue;
		expectedValue = "05/03/2017";
		FormCompleteOrderSummaryKA frmCompleteOrderSummaryKA = new FormCompleteOrderSummaryKA();
		frmCompleteOrderSummaryKA.startDateCalendar();
		frmCompleteOrderSummaryKA.changeDate(5, 3, 2017);
		afterValue = frmCompleteOrderSummaryKA.getStartDate();
		Assert.assertEquals(afterValue, expectedValue);
	}
	
	@Test 
	public void testChangeEndDate() throws Exception {
		String expectedValue, afterValue;
		expectedValue = "06/03/2017";
		FormCompleteOrderSummaryKA frmCompleteOrderSummaryKA = new FormCompleteOrderSummaryKA();
		frmCompleteOrderSummaryKA.endDateCalendar();
		frmCompleteOrderSummaryKA.changeDate(6, 3, 2017);
		afterValue = frmCompleteOrderSummaryKA.getEndDate();
		Assert.assertEquals(afterValue, expectedValue);
	}
	
	@Test
	public void testChangeStartTime() throws Exception {
		String expectedValue, afterValue;
		expectedValue = "01:00 AM";
		FormCompleteOrderSummaryKA frmCompleteOrderSummaryKA = new FormCompleteOrderSummaryKA();
		frmCompleteOrderSummaryKA.startTimePicker();
		frmCompleteOrderSummaryKA.changeTime("1", "00", "AM");
		afterValue = frmCompleteOrderSummaryKA.getStartTime();
		Assert.assertEquals(afterValue, expectedValue);
	}
	
	@Test
	public void testChangeEndTime() throws Exception {
		String expectedValue, afterValue;
		expectedValue = "01:00 AM";
		FormCompleteOrderSummaryKA frmCompleteOrderSummaryKA = new FormCompleteOrderSummaryKA();
		frmCompleteOrderSummaryKA.endTimePicker();
		frmCompleteOrderSummaryKA.changeTime("1", "00", "AM");
		afterValue = frmCompleteOrderSummaryKA.getEndTime();
		Assert.assertEquals(afterValue, expectedValue);
	}
	
	@Test
	public void testCancelChangeStartDate() throws Exception {
		String beforeValue, afterValue;
		FormCompleteOrderSummaryKA frmCompleteOrderSummaryKA = new FormCompleteOrderSummaryKA();
		beforeValue = frmCompleteOrderSummaryKA.getStartDate();
		frmCompleteOrderSummaryKA.startDateCalendar();
		frmCompleteOrderSummaryKA.cancelCalendar();
		afterValue = frmCompleteOrderSummaryKA.getStartDate();
		Assert.assertEquals(afterValue, beforeValue);
	}
	
	@Test
	public void testCancelChangeEndDate() throws Exception {
		String beforeValue, afterValue;
		FormCompleteOrderSummaryKA frmCompleteOrderSummaryKA = new FormCompleteOrderSummaryKA();
		beforeValue = frmCompleteOrderSummaryKA.getEndDate();
		frmCompleteOrderSummaryKA.endDateCalendar();
		frmCompleteOrderSummaryKA.cancelCalendar();
		afterValue = frmCompleteOrderSummaryKA.getEndDate();
		Assert.assertEquals(afterValue, beforeValue);
	}
	
	@Test
	public void testCancelChangeStartTime() throws Exception {
		String beforeValue, afterValue;
		FormCompleteOrderSummaryKA frmCompleteOrderSummaryKA = new FormCompleteOrderSummaryKA();
		beforeValue = frmCompleteOrderSummaryKA.getStartTime();
		frmCompleteOrderSummaryKA.startTimePicker();
		frmCompleteOrderSummaryKA.cancelTimePicker();
		afterValue = frmCompleteOrderSummaryKA.getStartTime();
		Assert.assertEquals(afterValue, beforeValue);
	}
	
	@Test
	public void testCancelChangeEndTime() throws Exception {
		String beforeValue, afterValue;
		FormCompleteOrderSummaryKA frmCompleteOrderSummaryKA = new FormCompleteOrderSummaryKA();
		beforeValue = frmCompleteOrderSummaryKA.getEndTime();
		frmCompleteOrderSummaryKA.endTimePicker();
		frmCompleteOrderSummaryKA.cancelTimePicker();
		afterValue = frmCompleteOrderSummaryKA.getEndTime();
		Assert.assertEquals(afterValue, beforeValue);
	}
	
	@AfterClass(alwaysRun=true)
	public void navigateToCompleteOrder() throws Exception {
		FormCompleteOrderSummaryKA formCompleteOrderSummaryKA = new FormCompleteOrderSummaryKA();
		formCompleteOrderSummaryKA.navigatetoCompleteOrderFromSummary();
		AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));
		String actual = label.getText();
		Assert.assertEquals(actual, "Complete Order");
	}
	
	
}