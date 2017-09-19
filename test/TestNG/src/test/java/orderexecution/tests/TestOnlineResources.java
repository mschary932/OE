package test.java.orderexecution.tests;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOnlineResources;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormOrderResourceListKA;
import test.java.orderexecution.forms.FormResourceExecution;
import test.java.orderexecution.forms.FormTaskExecutionKA;
import test.java.orderexecution.forms.FormTaskResourcesListKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestOnlineResources extends OrderExecutionBaseTest{
	
	FormOrderExecution frmOrderExecution;
	FormOrderListKA frmOrderListKA;
	FormOrderResourceListKA frmOrderResourcesListKA;
	FormResourceExecution frmResourceExecution;

	@BeforeClass(alwaysRun=true)
	public void setupBeforeTest() throws Exception {
		AppElement ele = null;
		try {
			ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_lblMainHeaderKA"));
		} catch(Exception e){
			if(ele==null){
				if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
					FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
					FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
					FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//					frmLoginKA =  new FormLogInKA();//							
					FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
					AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
					Assert.assertEquals(lblexpect.getText(),"My Orders");					
				}
				try{
					if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"))).getText().equalsIgnoreCase("My Orders")){
							FormOrderListKA frmOrderListKA=new FormOrderListKA();
						frmOrderListKA.clickWorkorder(OrderState.state);
							AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
							FormOrderExecution formOrderExecution=new FormOrderExecution();
						formOrderExecution.navigateToTaskExecution();
							FormTaskExecutionKA formTaskExecutionKA=new FormTaskExecutionKA();
						formTaskExecutionKA.clickResourcesList();
					}else if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"))).getText().equalsIgnoreCase("Order Execution")){
//						frmOrderExecutionKA_lblHeaderKA
						FormOrderExecution formOrderExecution=new FormOrderExecution();
						formOrderExecution.navigateToTaskExecution();
							FormTaskExecutionKA formTaskExecutionKA=new FormTaskExecutionKA();
						formTaskExecutionKA.clickResourcesList();
					}
				}catch(Exception ex){
					if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"))).getText().equalsIgnoreCase("Order Execution")){
//						frmOrderExecutionKA_lblHeaderKA
						FormOrderExecution formOrderExecution=new FormOrderExecution();
						formOrderExecution.navigateToTaskExecution();
							FormTaskExecutionKA formTaskExecutionKA=new FormTaskExecutionKA();
						formTaskExecutionKA.clickResourcesList();
					}
					System.out.println("*****Its not relaunch*****");
				}
			}else {
				System.out.println("TestOrderResourceList.setupBeforeTest(): Something went wrong form");
			}
		}
	}
	
	@Test
	public void test_ApplyGlobalSearch() throws Exception{
		FormOnlineResources formOnlineResources=new FormOnlineResources();
		String WidgetId="frmTaskResourcesListKA_lblMainHeaderKA";
		formOnlineResources.WaitForAppElement(WidgetId,2);
		formOnlineResources.applyGlobalView();
	}
	
	@Test
	public void test_PerformGlobalSearch() throws Exception{
		FormTaskResourcesListKA formTaskResourcesListKA=new FormTaskResourcesListKA();
		formTaskResourcesListKA.doSearch("hammer");
	}
	
	@Test
	public void test_RaisePurchaseRequest() throws Exception{
		FormOnlineResources formOnlineResources=new FormOnlineResources();
		String WidgetId="frmStockLocationListKA_lblTitleKA";
//		formOnlineResources.navigateToStockListScreen();
		//Manual Navigation not required for a Resource with unique name
		formOnlineResources.WaitForAppElement(WidgetId,7);
		formOnlineResources.raisePurchaseRequestFromStockListScreen();
	}
	
	@Test
	public void test_navigateToResourceExecutionScreen() throws Exception{
		FormOnlineResources formOnlineResources=new FormOnlineResources();
		String WidgetId="frmStockLocationListKA_lblTitleKA";
		formOnlineResources.WaitForAppElement(WidgetId,2);
		formOnlineResources.navigateToResourceExecutionScreen();
	}
	
	@Test
	public void test_RaisePurchaseRequestResourceExecution() throws Exception{
		FormOnlineResources formOnlineResources=new FormOnlineResources();
		String WidgetId="frmResourceExecutionKA_lblHeaderKA";
		formOnlineResources.WaitForAppElement(WidgetId,2);
		formOnlineResources.raisePurchaseRequest();
	}
	
	@Test
	public void test_navigateBackToStockList() throws Exception{
		FormOnlineResources formOnlineResources=new FormOnlineResources();
		String WidgetId="frmResourceExecutionKA_lblHeaderKA";
		formOnlineResources.WaitForAppElement(WidgetId,2);
		formOnlineResources.navigateBackToStockListScreen();
	}
	
	@Test
	public void test_navigateBackToTaskResourcesScreen() throws Exception{
		FormOnlineResources formOnlineResources=new FormOnlineResources();
		String WidgetId="frmStockLocationListKA_lblTitleKA";
		formOnlineResources.WaitForAppElement(WidgetId,2);
		formOnlineResources.navigateBackToStockListScreen();
	}
	
	@Test
	public void test_navigateToStockList() throws Exception{
		FormOnlineResources formOnlineResources=new FormOnlineResources();
		String WidgetId="frmTaskResourcesListKA_lblMainHeaderKA";
		formOnlineResources.WaitForAppElement(WidgetId,7);
		formOnlineResources.navigateToStockListScreen();
	}
	
	@Test
	public void test_navigateToStockDetailsScreen() throws Exception{
		FormOnlineResources formOnlineResources=new FormOnlineResources();
		String WidgetId="frmStockLocationListKA_lblTitleKA";
		formOnlineResources.WaitForAppElement(WidgetId,2);
		formOnlineResources.navigateToStockDetailsScreen();
	}
	
	@Test
	public void test_TransferRequest() throws Exception{
		FormOnlineResources formOnlineResources=new FormOnlineResources();
		String WidgetId="frmStockLocationDetailsKA_lblHeaderKA";
		formOnlineResources.WaitForAppElement(WidgetId,2);
		formOnlineResources.raiseTransferRequest();
	}
	
	@AfterClass(alwaysRun=true)
	public void setupAfterClass() throws Exception{
		try{
			FormTaskResourcesListKA frmTaskResourcesListKA=new FormTaskResourcesListKA();
		    frmTaskResourcesListKA.clickBack();
			FormTaskExecutionKA frmTaskExecutionKA=new FormTaskExecutionKA();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
			if(frmTaskExecutionKA instanceof FormTaskExecutionKA)Assert.assertEquals(lblValue.getText(),"Task Execution");	
			frmTaskExecutionKA.clickBack();
			FormOrderExecution frmOrderExecution=new FormOrderExecution();
	    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			if(frmOrderExecution instanceof FormOrderExecution)
				Assert.assertEquals(Label.getText(),"Order Execution");	
		}catch(Exception e){
			relaunchApp();
			if(doLogin()){
				System.out.println("Login is successful***");
			}
		}
	}
}
