package test.java.orderexecution.tests;
import java.lang.reflect.Method;





import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;




import test.common.AppCalendar;
import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.forms.*;


public class TestFormDateFilterKA extends OrderExecutionBaseTest{

	
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
		} catch (Exception e) {
			if (ele == null){
				if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
					FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
					FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
					FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));						
					FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
					AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
					Assert.assertEquals(lblexpect.getText(),"My Orders");					
				}
				frmOrderListKA = new FormOrderListKA();
				frmOrdersViewsKA = frmOrderListKA.clickOrderViews();
				AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
			}
				else
				System.out.println("TestDateFilter.setupBeforeTest(): Something went wrong form");
			}

	}

	
	FormDateFilterKA frmDateFilterKA;
	FormOrderListKA frmOrderListKA;
	FormOrdersViewsKA frmOrdersViewsKA;
	
	//To check navigation to orderDetails by clicking on cancel
	@Test
	public void test_cancel_filter() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrdersViewsKA frmOrdersViewsKA = new FormOrdersViewsKA();
		frmOrdersViewsKA.clickOnFilter("Date");
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_lblHeaderKA"));
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_lblHeaderKA"));
		sa.assertTrue(lblValue.getText().equals("Date - Filter"));		
		frmDateFilterKA = new FormDateFilterKA();
		frmDateFilterKA.clickOnCancel();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
		sa.assertTrue(lblValue1.getText().equals("My Orders - Views & Filters"));
		sa.assertAll();		
	}
	
	@Test
	public void test_click_select_date() throws Exception {		
		SoftAssert sa = new SoftAssert();
		System.out.println("******** Testing Select Date Filter ************");
		frmOrdersViewsKA = new FormOrdersViewsKA();
		frmOrdersViewsKA.clickOnFilter("Date");
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_lblHeaderKA"));
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_lblHeaderKA"));
		sa.assertTrue(lblValue.getText().equals("Date - Filter"));		
		System.out.println("CLicking on Select Date");
		frmDateFilterKA = new FormDateFilterKA();
		frmDateFilterKA.applyFilter("Select Date");		
		Thread.sleep(5000);
		AppCalendar calendar = new AppCalendar(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_calenderKA"));
		calendar.clickDay(5);
		Thread.sleep(5000);
		frmDateFilterKA.clickOnApply();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
		sa.assertTrue(lblValue1.getText().equals("My Orders - Views & Filters"));
		sa.assertAll();			
	}

	
	@Test
	public void test_click_today_filter() throws Exception {
		SoftAssert sa = new SoftAssert();
		frmOrdersViewsKA = new FormOrdersViewsKA();
		frmOrdersViewsKA.clickOnFilter("Date");
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_lblHeaderKA"));
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_lblHeaderKA"));
		sa.assertTrue(lblValue.getText().equals("Date - Filter"));		
		frmDateFilterKA = new FormDateFilterKA();
		frmDateFilterKA.applyFilter("Today");
		Thread.sleep(5000);
		frmDateFilterKA.clickOnApply();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
		sa.assertTrue(lblValue1.getText().equals("My Orders - Views & Filters"));
//		frmOrdersViewsKA = new FormOrdersViewsKA();
//		frmOrdersViewsKA.onClickDone();
//		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
//		AppElement lblValue2=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
//		sa.assertEquals(lblValue1.getText(),"My Orders");
		sa.assertAll();
	}
	
	@Test
	public void test_clear_filter() throws Exception {
		SoftAssert sa = new SoftAssert();
		frmOrdersViewsKA = new FormOrdersViewsKA();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
		frmOrdersViewsKA = new FormOrdersViewsKA();
		frmOrdersViewsKA.clickOnFilter("Date");
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_lblHeaderKA"));
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmDateFilterKA_lblHeaderKA"));
		sa.assertTrue(lblValue.getText().equals("Date - Filter"));	
		frmDateFilterKA = new FormDateFilterKA();
		frmDateFilterKA.clickOnClearFilter();
		frmDateFilterKA.clickOnApply();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
		sa.assertTrue(lblValue1.getText().equals("My Orders - Views & Filters"));
		sa.assertAll();		
	}
	
	@AfterClass(alwaysRun=true)
	public void setupAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
		try{		
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
			frmOrdersViewsKA = new FormOrdersViewsKA();
			frmOrdersViewsKA.clickCancel();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));		
			AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		    sa.assertEquals(lblValue1.getText(),"My Orders");
		    sa.assertAll();
		}catch(Exception e){
			relaunchApp();
			if(doLogin()){
				System.out.println("Login is successful***");
			}
		}
	}


}
