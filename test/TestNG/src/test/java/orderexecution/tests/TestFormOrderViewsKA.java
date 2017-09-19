package test.java.orderexecution.tests;

import java.lang.reflect.Method;



import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormOrdersViewsKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormOrderViewsKA extends OrderExecutionBaseTest{
	
	FormOrderListKA frmOrderListKA;
	FormOrdersViewsKA frmOrdersViewsKA;
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
				frmOrderListKA = new FormOrderListKA();
				frmOrdersViewsKA = frmOrderListKA.clickOrderViews();
				AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
			
			}
				else
				System.out.println("TestFormOrderViewsKA.setupBeforeTest(): Something went wrong form");
			}

	}
	
	@Test
	public void testStatusView() throws Exception{
		FormOrdersViewsKA frmOrderViewsKA = new FormOrdersViewsKA();
		frmOrderViewsKA.applyFilter("Status");
		frmOrderViewsKA.onClickDone();
		
		
	}
	@Test
	public void testPriorityView() throws Exception{
		FormOrdersViewsKA frmOrderViewsKA = new FormOrdersViewsKA();
		frmOrderViewsKA.applyFilter("Priority");
		frmOrderViewsKA.onClickDone();
		
		
	}
	@Test
	public void testNearMeView() throws Exception{
		FormOrdersViewsKA frmOrderViewsKA = new FormOrdersViewsKA();
		frmOrderViewsKA.applyFilter("Near Me");
		frmOrderViewsKA.onClickDone();
		
		
	}
	@Test
	public void testScheduledView() throws Exception{
		FormOrdersViewsKA frmOrderViewsKA = new FormOrdersViewsKA();
		frmOrderViewsKA.applyFilter("Scheduled");
		frmOrderViewsKA.onClickDone();
		
		
	}
	@Test
	public void testStartedView() throws Exception{
		FormOrdersViewsKA frmOrderViewsKA = new FormOrdersViewsKA();
		frmOrderViewsKA.applyFilter("Started");
		frmOrderViewsKA.onClickDone();
		
		
	}
	@Test
	public void testTodayView() throws Exception{
		FormOrdersViewsKA frmOrderViewsKA = new FormOrdersViewsKA();
		frmOrderViewsKA.applyFilter("Today");
		frmOrderViewsKA.onClickDone();
		
		
	}

}
