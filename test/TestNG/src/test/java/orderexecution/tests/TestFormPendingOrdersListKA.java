package test.java.orderexecution.tests;

import java.lang.reflect.Method;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.common.*;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormHamburgerMenuWOKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormPendingOrdersListKA;
import test.java.orderexecution.forms.FormTenantKA;



public class TestFormPendingOrdersListKA extends OrderExecutionBaseTest{

	private FormOrderListKA frmOrderListKA;
	private FormHamburgerMenuWOKA frmHamburgerMenu;
	private FormPendingOrdersListKA frmPendingOrdersList;
	
	
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
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
			}
			else
				System.out.println("TestMyOrdersForm.setupBeforeTest(): Something went worng form");
			relaunchApp();
			doLogin();
			}		
	}
	
	@Test
	public void test_Pending_orders() throws Exception{	
	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_btnAppMenuKA"));
	frmOrderListKA = new FormOrderListKA(); 
	frmHamburgerMenu=frmOrderListKA.clickAppMenu();
	frmPendingOrdersList=frmHamburgerMenu.clickAvailableOrders();
	frmPendingOrdersList.swipeSegment();
	frmPendingOrdersList.clickAccept();	
	}
	
	@Test
	public void test_navigate_myOrders() throws Exception{	
	frmHamburgerMenu=frmPendingOrdersList.clickAppMenu();
	frmOrderListKA=frmHamburgerMenu.clickMyOrders();
	
	}
}
