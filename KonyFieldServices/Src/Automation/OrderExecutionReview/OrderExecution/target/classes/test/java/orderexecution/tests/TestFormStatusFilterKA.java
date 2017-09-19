package test.java.orderexecution.tests;
import java.lang.reflect.Method;



import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.common.Alerts;
import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.forms.*;

public class TestFormStatusFilterKA extends OrderExecutionBaseTest{	
		
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_lblHeaderKA"));
		} catch (Exception e) {
			if (ele == null){
				if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
					FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
					FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
					FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//					frmLoginKA =  new FormLogInKA();//							
					FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
					AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
					Assert.assertEquals(lblexpect.getText(),"My Orders");					
				}
				FormOrderListKA frmOrderListKA = new FormOrderListKA();
			    frmOrderListKA.clickOrderViews();
				AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
			
			}
				else
				System.out.println("TestFormOrderViewsKA.setupBeforeTest(): Something went wrong form");
			}

	}

	
		@Test
		public void testback() throws Exception{
			FormOrdersViewsKA frmOrdersViewsKA = new FormOrdersViewsKA();
			frmOrdersViewsKA.clickOnFilter("Status");
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_lblHeaderKA"));
			FormStatusFilterKA frmStatusFilterKA = new FormStatusFilterKA();
			frmStatusFilterKA.clickOnCancel();
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
			Assert.assertTrue(lblValue.getText().equals("My Orders - Views & Filters"));
			frmOrdersViewsKA.clickCancel();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		}
		
		@Test
		public void test_apply_no_filter() throws Exception {
			
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
			FormOrdersViewsKA frmOrdersViewsKA = new FormOrdersViewsKA();
			frmOrdersViewsKA.clickOnFilter("Status");
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_lblHeaderKA"));
			FormStatusFilterKA frmStatusFilterKA = new FormStatusFilterKA();
			frmStatusFilterKA.clickOnApply();
			Assert.assertTrue(Alerts.validateAlertMsg("Select at least one filter"));
			Alerts.btnClickLable("OK");
			frmStatusFilterKA.clickOnCancel();
			frmOrdersViewsKA.clickCancel();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		
		}
		
		@Test
		public void testCompletedFilter() throws Exception {

			FormOrdersViewsKA frmOrdersViewsKA = new FormOrdersViewsKA();
			frmOrdersViewsKA.clickOnFilter("Status");
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_lblHeaderKA"));
			FormStatusFilterKA frmStatusFilterKA = new FormStatusFilterKA();
			frmStatusFilterKA.applyFilter("Completed");
			frmStatusFilterKA.clickOnApply();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
		//	Assert.assertTrue(frmOrdersViewsKA.verifyFilterApplied("Completed",1));
			frmOrdersViewsKA.clickCancel();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		
		}
		
		@Test
		public void test_clear_filter() throws Exception {
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
			FormOrdersViewsKA frmOrdersViewsKA = new FormOrdersViewsKA();
			frmOrdersViewsKA.clickOnFilter("Status");
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_lblHeaderKA"));
			FormStatusFilterKA frmStatusFilterKA = new FormStatusFilterKA();
			frmStatusFilterKA.clickOnClearFilter();
			frmStatusFilterKA.clickOnCancel();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
			frmOrdersViewsKA.clickCancel();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
					
		}

}
