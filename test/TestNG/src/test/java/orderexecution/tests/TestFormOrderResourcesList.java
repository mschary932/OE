package test.java.orderexecution.tests;

import java.lang.reflect.Method;





import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.*;

public class TestFormOrderResourcesList extends OrderExecutionBaseTest{
	
	
	public TestFormOrderResourcesList() throws Exception{
		
	}
    
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
		} catch(Exception e){
			 if(ele==null){
				 if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
						FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
						FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
						FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//						frmLoginKA =  new FormLogInKA();//							
						FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
						AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
						Assert.assertEquals(lblexpect.getText(),"My Orders");					
					}
			try{
			   if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"))).getText().equalsIgnoreCase("My Orders")){
			   FormOrderListKA frmOrderListKA=new FormOrderListKA();
			   frmOrderListKA.clickWorkorder(OrderState.state);
			   AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			 }
			}catch(Exception ex){
				System.out.println("*****Its not relaunch*****");
			}
				 FormOrderExecution frmOrderExecution = new FormOrderExecution();
				 if(!frmOrderExecution.getStatus().equalsIgnoreCase("STARTED")){
				    frmOrderExecution.clickOnRoute();
					frmOrderExecution.clickStart();
				 }
				frmOrderExecution.navigateToOrderResource();
			}
				else {
				System.out.println("TestOrderResourceList.setupBeforeTest(): Something went wrong form");
				
			}
		}
	}
	
	FormOrderExecution frmOrderExecution;
	FormOrderListKA frmOrderListKA;
	FormOrderResourceListKA frmOrderResourcesListKA;
	FormResourceExecution frmResourceExecution;
	

	@Test
	public void test_navigate_to_order_execution() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmOrderResourcesListKA = new FormOrderResourceListKA();
		frmOrderExecution = frmOrderResourcesListKA.clickBack();
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order Execution");
		frmOrderExecution.navigateToOrderResource();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
		sa.assertEquals(lblValue1.getText(),"Order Resources");
		sa.assertAll();
	}
	
	@Test
	public void test_navigate_to_resources_execution() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmOrderResourcesListKA = new FormOrderResourceListKA();
		frmResourceExecution = frmOrderResourcesListKA.navigateToResourceExecution();
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Resource Execution");
		frmResourceExecution.clickBack();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
		sa.assertEquals(lblValue1.getText(),"Order Resources");
		sa.assertAll();		
	}
		
	@Test
	public void test_search_by_resource_code() throws Exception {
		SoftAssert sa = new SoftAssert();
		frmOrderResourcesListKA = new FormOrderResourceListKA();
		AppElement ResourceName = new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"), OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_lblCodeKA")).getElementWithIndex(0);
		String Resource = ResourceName.getText();
     	if(Resource.substring(Resource.length()-3,Resource.length()).equals("..."))
		   Resource = (Resource.substring(0, 6));
		System.out.println("*************"+Resource);
     	frmOrderResourcesListKA.doSearch(Resource);
		sa.assertTrue(frmOrderResourcesListKA.verifySearchResultByResouceCode(Resource));
		sa.assertAll();
	}
	
	@Test
	public void test_search_by_resource_name() throws Exception {
		SoftAssert sa = new SoftAssert();
		frmOrderResourcesListKA = new FormOrderResourceListKA();
		AppElement ResourceName = new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"), OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_lblTypeKA")).getElementWithIndex(0);
		String Resource = ResourceName.getText();
		frmOrderResourcesListKA.doSearch(Resource);
		sa.assertTrue(frmOrderResourcesListKA.verifySearchResultByResourceName(Resource));
		sa.assertAll();
	}
	@Test
	public void test_edit_functionality() throws Exception {
		SoftAssert sa = new SoftAssert();
		frmOrderResourcesListKA = new FormOrderResourceListKA();	
//	    int qtyBeforeEdit = frmOrderResourcesListKA.readQty();
	    frmOrderResourcesListKA.editOrder();
	    frmOrderResourcesListKA.IncreaseQty();
		Thread.sleep(2000);
		frmOrderResourcesListKA.saveQty();		
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
		sa.assertEquals(lblValue1.getText(),"Order Resources");
		sa.assertAll();
	}
	@Test
	public void test_navigate_to_views() throws Exception {
		SoftAssert sa = new SoftAssert();
		frmOrderResourcesListKA = new FormOrderResourceListKA();
		frmOrderResourcesListKA.clickOnViewsAndFilters();
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeader1KA"));
		sa.assertEquals(lblValue.getText(),"Resources - Views & Filters");	   
		frmOrderResourcesListKA.clickOnCancelView();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
		sa.assertEquals(lblValue1.getText(),"Order Resources");
		sa.assertAll();
	}
	
	@Test
	public void test_do_search_offline() throws Exception {
		SoftAssert sa = new SoftAssert();
		frmOrderResourcesListKA = new FormOrderResourceListKA();
		frmOrderResourcesListKA.enable_disable_Wifi("off");
		frmOrderResourcesListKA.clickOnSearch();
		AppElement ResourceName = new AppElement(OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_lblTypeKA"));
		String Resource = ResourceName.getText();
		frmOrderResourcesListKA.doSearch(Resource);
		sa.assertTrue(frmOrderResourcesListKA.verifySearchResultByResourceName(Resource));
		frmOrderResourcesListKA.enable_disable_Wifi("on");
		sa.assertAll();		
	}
	
	@Test
	public void test_basic_info_in_resource_row() throws Exception {
		SoftAssert sa = new SoftAssert();
		frmOrderResourcesListKA = new FormOrderResourceListKA();
		frmOrderResourcesListKA.clickOnViewsAndFilters();
		frmOrderResourcesListKA.selectView("Local");
		Thread.sleep(3000);
		frmOrderResourcesListKA.clickOnApplyView();	
		Thread.sleep(3000);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
		sa.assertEquals(lbl.getText(),"Order Resources");
		sa.assertTrue(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_btnBackKA")));
		sa.assertAll();
		}
	
	@AfterClass(alwaysRun=true)
	public void setupAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
		try{
		FormOrderResourceListKA frmOrderResourceListKA=new FormOrderResourceListKA();
		frmOrderResourceListKA.clickBack();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		FormOrderExecution frmOrderExecution=new FormOrderExecution();
	    frmOrderExecution.clicknavigatebackOrderLists();
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
