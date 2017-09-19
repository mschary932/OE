package test.java.orderexecution.tests;

import java.lang.reflect.Method;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.common.Alerts;
import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormHamburgerMenuWOKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormSettingsKA;
import test.java.orderexecution.forms.FormTenantKA;




public class TestFormSettingsKA extends OrderExecutionBaseTest{


	
	
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception{
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_lblTaskDetailsKA"));
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
				FormOrderListKA frmOrderListKA=new FormOrderListKA();
				frmOrderListKA.clickAppMenu();
				FormHamburgerMenuWOKA frmHamburgerMenu=new FormHamburgerMenuWOKA();
				frmHamburgerMenu.clickSettings();
			}
			}
	}
	
	
	@Test
	public void testBack() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormSettingsKA frmSettings=new FormSettingsKA();
		frmSettings.clickAppMenu();
		FormHamburgerMenuWOKA frmHamburgerMenu=new FormHamburgerMenuWOKA();
		frmHamburgerMenu.clickMyOrders();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		AppElement lblHeaderKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		sa.assertEquals(lblHeaderKA.getText(),"My Orders");
		FormOrderListKA frmOrderListKA=new FormOrderListKA();
		frmOrderListKA.clickAppMenu();
		frmHamburgerMenu.clickSettings();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_lblTaskDetailsKA"));
		sa.assertEquals(lblValue1.getText(),"Settings");	
		sa.assertAll();
	}
	
	@Test
	public void test_reset_database_validate_alert() throws Exception{	
		SoftAssert sa = new SoftAssert();
		FormSettingsKA frmSettings=new FormSettingsKA();
		frmSettings.clickStart();
		sa.assertTrue(Alerts.validateAlertMsg("Do you want to delete this data and download again?"));
		Alerts.declineAlert();
		sa.assertAll();
	}
	
	@Test
	public void test_settings_start_reset_database() throws Exception {
		SoftAssert sa = new SoftAssert();
		FormSettingsKA frmSettings=new FormSettingsKA();
		frmSettings.clickStart();
		Alerts.acceptAlert();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"),180);
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
	    sa.assertEquals(lblValue.getText(),"My Orders");	  
		FormOrderListKA frmOrderListKA=new FormOrderListKA();
		frmOrderListKA.clickAppMenu();
		FormHamburgerMenuWOKA frmHamburgerMenu=new FormHamburgerMenuWOKA();
		frmHamburgerMenu.clickSettings();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_lblTaskDetailsKA"));
		sa.assertEquals(lblValue1.getText(),"Settings");	
		sa.assertAll();
	}
	
	@Test
	public void test_settings_notification() throws Exception{	
		SoftAssert sa = new SoftAssert();
		FormSettingsKA frmSettings=new FormSettingsKA();
		frmSettings.swipeNotification();
//		sa.assertTrue(true);
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_lblTaskDetailsKA"));
		sa.assertEquals(lblValue1.getText(),"Settings");	
		sa.assertAll();
	}
	
	@Test
	public void test_App_Maintenance_validate_alert_header() throws Exception{	
		SoftAssert sa = new SoftAssert();
//		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_btnAppMenuKA"));
		FormSettingsKA frmSettings=new FormSettingsKA();
		frmSettings.clickPerformance();
		sa.assertTrue(Alerts.validateAlertMsg("Continue"));
		Alerts.declineAlert();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_lblTaskDetailsKA"));
		sa.assertEquals(lblValue1.getText(),"Settings");	
		sa.assertAll();
    }
	
	@Test
	public void test_Offline_Reset_Database() throws Exception {
		SoftAssert sa = new SoftAssert();
		FormSettingsKA frmSettings=new FormSettingsKA();
		frmSettings.enable_disable_Wifi("Off");
		frmSettings.clickStart();
		sa.assertTrue(Alerts.validateAlertMsg("No Internet Connection"));
		Alerts.btnClickLable("OK");
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_lblTaskDetailsKA"));
		sa.assertEquals(lblValue1.getText(),"Settings");	
		sa.assertAll();
	}
	
	@Test
	public void test_start_App_Maintenance() throws Exception {
		SoftAssert sa = new SoftAssert();
//		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_btnAppMenuKA"));
		FormSettingsKA frmSettings=new FormSettingsKA();
		frmSettings.clickPerformance();
		Alerts.acceptAlert();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_lblTaskDetailsKA"));
		sa.assertEquals(lblValue1.getText(),"Settings");	
		sa.assertAll();
		//Different behaviour in iPhone & Android
	}
	
	@AfterClass(alwaysRun=true)
	public void setupAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
		try{
		FormSettingsKA frmSettings=new FormSettingsKA();
		frmSettings.clickAppMenu();
		FormHamburgerMenuWOKA frmHamburgerMenu=new FormHamburgerMenuWOKA();
		frmHamburgerMenu.clickMyOrders();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
	    sa.assertEquals(lblValue.getText(),"My Orders");
	    sa.assertAll();
		}catch(Exception e){
			relaunchApp();
			if(doLogin()){
				System.out.println("Login is successful***");
			}
		}
	}
}