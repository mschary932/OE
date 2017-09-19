package test.java.orderexecution.tests;

import java.lang.reflect.Method;






import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormOrdersViewsKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestMyOrdersForm  extends OrderExecutionBaseTest{
	
	FormOrderListKA frmOrderListKA;
	
	
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement el=null;
		try {
			 el = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		} catch (Exception e) {
			if (el == null){
				System.out.println("TestMyOrdersForm.setupBeforeTest(): Not on the OrderList Form");
				if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
					FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
					FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
					FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//					frmLoginKA =  new FormLogInKA();
					frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
					AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
					Assert.assertEquals(lblexpect.getText(),"My Orders");					
				}
			}
			else
				System.out.println("TestMyOrdersForm.setupBeforeTest(): Something went worng form");
			relaunchApp();
			doLogin();				
		}
	}  
		
//Tests starts here	
	@Test
	public void testNavigation() throws Exception{
		SoftAssert sa = new SoftAssert();
		//To check whether able to navigate to OrderExecution Form
		FormOrderListKA orderListForm = new FormOrderListKA();
		FormOrderExecution frmOrderExecution = orderListForm.clickWorkorder(OrderState.state);
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order Execution");
		//To check whether able to navigate back to My Orders
	    frmOrderExecution=new FormOrderExecution();
	    frmOrderListKA=frmOrderExecution.clicknavigatebackOrderLists();
	    AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
	    sa.assertEquals(lblValue1.getText(),"My Orders");
	    sa.assertAll();
	}
		
	//To test hamburger menu
	@Test
	public void testhamburgermenu() throws Exception{
	SoftAssert sa = new SoftAssert();
	FormOrderListKA frmOrderListKA=new FormOrderListKA();
	frmOrderListKA.openhamburgermenu();
	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_lblMenuWOKA"));
	AppElement lblValue2=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_lblMenuWOKA"));
	sa.assertEquals(lblValue2.getText(),"Main Menu");
	frmOrderListKA.closehamburgermenu();
	AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
	sa.assertEquals(lblValue1.getText(),"My Orders");	
	sa.assertAll();
	}
	
	@Test
	public void testFilter() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderListKA formOrderListKA=new FormOrderListKA();
		formOrderListKA.clickViewFilter();
		FormOrdersViewsKA formOrdersViewsKA=new FormOrdersViewsKA();
		formOrdersViewsKA.clickCancel();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
	    sa.assertEquals(lblValue1.getText(),"My Orders");
	    sa.assertAll();
	}
	
	@Test
	public void testDateSelection() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderListKA formOrderListKA=new FormOrderListKA();
		formOrderListKA.DateSelection();
		try{
			String lblTimeVal=new AppElement(OrderExecutionWidgetId.getWidgetId("tmpOrderListKA_lblTimeKA")).getText();
			lblTimeVal=lblTimeVal.substring(0, 2);
			System.out.println("**The value is"+lblTimeVal);
			int Timeval=Integer.parseInt(lblTimeVal);
			String btnDayval=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_btnDay0KA")).getText();
            int Dayval=Integer.parseInt(btnDayval);
			System.out.println("**The date is"+btnDayval);
			sa.assertEquals(Timeval, Dayval);
			formOrderListKA.clickViewFilter();
			FormOrdersViewsKA frmOrderViewsKA = new FormOrdersViewsKA();
			frmOrderViewsKA.applyFilter("Today");
			frmOrderViewsKA.onClickDone();
			AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		    sa.assertEquals(lblValue1.getText(),"My Orders");
		    sa.assertAll();		    
		}catch(Exception e){
			System.out.println("No Work Order Present :Verify the test case manually");
		}
	}
	
	@Test
	public void testMapNavigation() throws Exception {
		SoftAssert sa = new SoftAssert();
		FormOrderListKA formOrderListKA=new FormOrderListKA();
		formOrderListKA.navigateToMap();
		AppElement btnCurrenLocation=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_btnCurrenLocation"));
		boolean visible=btnCurrenLocation.isElementVisible();
		sa.assertEquals(visible, true);		
	    sa.assertAll();
	}
	@AfterClass(alwaysRun=true)
	public void settupAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
		try{
			FormOrderListKA formOrderListKA=new FormOrderListKA();
			formOrderListKA.navigateToOrderList();
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
