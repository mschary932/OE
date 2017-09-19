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


public class TestFormTaskResourcesListKA extends OrderExecutionBaseTest{	
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_lblMainHeaderKA"));
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
					   FormOrderListKA formOrderListKA=new FormOrderListKA();
					   formOrderListKA.clickWorkorder(OrderState.state);
				   }				   
				 }catch(Exception ex){
				System.out.println("*****Its not relaunch*****");
			}
				 FormOrderExecution frmOrderExecution = new FormOrderExecution();
				 if(!frmOrderExecution.getStatus().equalsIgnoreCase("STARTED")){
				    frmOrderExecution.clickOnRoute();
					frmOrderExecution.clickStart();
				 }
				frmOrderExecution.navigateOnlyToTaskExecution();
				FormTaskExecutionKA frmTaskExecutionKA = new FormTaskExecutionKA();
				try{
				   if((AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnHoldKA")))){
					   frmTaskExecutionKA.clickStart();
				   } 
				}catch(Exception e1){
					   System.out.println("****Task is Already Started****");
				}				
				Thread.sleep(3000);
				frmTaskExecutionKA.clickResourcesList();
			}
			else {
				System.out.println("TestTaskResourceList.setupBeforeTest(): Something went wrong form");
				
			}
		}
	}
	
		
		@Test
		public void test_navigate_to_task_execution() throws Exception {
			SoftAssert sa = new SoftAssert();
			AppSpecificFunctions.handleSync();
			FormTaskResourcesListKA frmTaskResourcesListKA = new FormTaskResourcesListKA();
			frmTaskResourcesListKA.clickBack();
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
			sa.assertEquals(lblValue.getText(),"Task Execution");
			FormTaskExecutionKA frmTaskExecutionKA = new FormTaskExecutionKA();	
			frmTaskExecutionKA.clickResourcesList();
			AppElement lblHeader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_lblMainHeaderKA"));
			sa.assertEquals(lblHeader.getText(),"Task Resources");
			sa.assertAll();
		}
		
		@Test
		public void test_navigate_to_views() throws Exception {
			SoftAssert sa = new SoftAssert();
			AppSpecificFunctions.handleSync();
			FormTaskResourcesListKA frmTaskResourcesListKA = new FormTaskResourcesListKA();
			frmTaskResourcesListKA.clickViews();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
			AppElement lblHeader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
			sa.assertTrue(lblHeader.getText().equals("Resources - Views & Filters"));
			frmTaskResourcesListKA.applyView("Local");
			AppElement lblHeader1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_lblMainHeaderKA"));
			sa.assertEquals(lblHeader1.getText(),"Task Resources");
			sa.assertAll();
		}
		
		@Test
		public void test_tick_button_functionality() throws Exception {
			SoftAssert sa = new SoftAssert();
			AppSpecificFunctions.handleSync();
			FormTaskResourcesListKA frmTaskResourcesListKA = new FormTaskResourcesListKA();	
			frmTaskResourcesListKA.clickViews();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
			AppElement lblHeader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
			sa.assertTrue(lblHeader.getText().equals("Resources - Views & Filters"));
			frmTaskResourcesListKA.applyView("In Task");
			AppElement lblHeader1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_lblMainHeaderKA"));
			sa.assertEquals(lblHeader1.getText(),"Task Resources");
			sa.assertAll();
		}
		
		@Test
		public void test_navigate_to_resource_execution() throws Exception {
			SoftAssert sa = new SoftAssert();
			AppSpecificFunctions.handleSync();
			FormTaskResourcesListKA frmTaskResourcesListKA = new FormTaskResourcesListKA();
			frmTaskResourcesListKA.navigatetoResourceExecution();
			AppElement lblHeader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA"));
			sa.assertEquals(lblHeader.getText(),"Resource Execution");
			FormResourceExecution frmResourceExecution = new FormResourceExecution();	
			frmResourceExecution.clickBack();
			AppElement lblValue = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_lblMainHeaderKA"));
			sa.assertTrue(lblValue.getText().equals("Task Resources"));
			sa.assertAll();
		}
		
		@Test
		public void test_edit_functionality() throws Exception {
			SoftAssert sa = new SoftAssert();
			AppSpecificFunctions.handleSync();
			FormTaskResourcesListKA frmTaskResourcesListKA = new FormTaskResourcesListKA();	
		    int qtyBeforeEdit = frmTaskResourcesListKA.readQty();
		    frmTaskResourcesListKA.editTask();
			frmTaskResourcesListKA.IncreaseQty();
			Thread.sleep(2000);
			frmTaskResourcesListKA.saveQty();
			int qtyAfterEdit = frmTaskResourcesListKA.readQty();
			sa.assertTrue(qtyAfterEdit-qtyBeforeEdit == 1);
			sa.assertAll();
		}
		
		@Test
		public void test_search_by_resource_name() throws Exception {
			SoftAssert sa = new SoftAssert();
			AppSpecificFunctions.handleSync();
			FormTaskResourcesListKA frmTaskResourcesListKA = new FormTaskResourcesListKA();
			AppElement ResourceName = new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"), OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_lblTypeKA")).getElementWithIndex(0);
			String Resource = ResourceName.getText();
			frmTaskResourcesListKA.doSearch(Resource);
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_lblMainHeaderKA"));
			sa.assertTrue(frmTaskResourcesListKA.verifySearchResultByResourceName(Resource));
			sa.assertAll();
		}
		
		@Test
		public void test_search_by_resource_code() throws Exception {
			SoftAssert sa = new SoftAssert();
			AppSpecificFunctions.handleSync();
			FormTaskResourcesListKA frmTaskResourcesListKA = new FormTaskResourcesListKA();
			AppElement ResourceName = new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"), OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_lblCodeKA")).getElementWithIndex(0);
			String Resource = ResourceName.getText();
	     	if(Resource.substring(Resource.length()-3,Resource.length()).equals("..."))
			     Resource = (Resource.substring(0, 6));
			frmTaskResourcesListKA.doSearch(Resource);
			sa.assertTrue(frmTaskResourcesListKA.verifySearchResultByResouceCode(Resource));
			sa.assertAll();
		}
		
		
		
		@Test
		public void test_do_search_offline() throws Exception {
			SoftAssert sa = new SoftAssert();
			AppSpecificFunctions.handleSync();
			FormTaskResourcesListKA frmTaskResourcesListKA = new FormTaskResourcesListKA();
			frmTaskResourcesListKA.enable_disable_Wifi("off");
			AppElement ResourceName = new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"), OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_lblTypeKA")).getElementWithIndex(0);
			String Resource = ResourceName.getText();
			frmTaskResourcesListKA.doSearch(Resource);			
			sa.assertTrue(frmTaskResourcesListKA.verifySearchResultByResourceName(Resource));
			frmTaskResourcesListKA.enable_disable_Wifi("on");
			sa.assertAll();					
		}
 
		@Test
	   public void test_checkbox() throws Exception{	
			SoftAssert sa = new SoftAssert();
			AppSpecificFunctions.handleSync();
			AppElement btnConssumedKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"), OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_btnConssumedKA")).getElementWithIndex(0);
	        btnConssumedKA.click();
	        AppElement lblHeader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_lblMainHeaderKA"));
			sa.assertEquals(lblHeader.getText(),"Task Resources");
			sa.assertAll();
		}
		
		@AfterClass(alwaysRun=true)
		public void  setupAfterClass() throws Exception{
			SoftAssert sa = new SoftAssert();
			try{
			FormTaskResourcesListKA frmTaskResourcesListKA=new FormTaskResourcesListKA();
		    frmTaskResourcesListKA.clickBack();
			FormTaskExecutionKA frmTaskExecutionKA=new FormTaskExecutionKA();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
			sa.assertEquals(lblValue.getText(),"Task Execution");	
			frmTaskExecutionKA.clickBack();
			FormOrderExecution frmOrderExecution=new FormOrderExecution();
			frmOrderExecution.clicknavigatebackOrderLists();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
			AppElement lblHeader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
			sa.assertEquals(lblHeader.getText(),"My Orders");
			sa.assertAll();
		}catch(Exception e){
			relaunchApp();
			if(doLogin()){
				System.out.println("Login is successful***");
			}
		}
		}		
}
