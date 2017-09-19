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
import test.java.orderexecution.forms.FormBillOfMaterialKA;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderAssetKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormBillOfMaterialKA extends OrderExecutionBaseTest{

	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmBillOfMaterialKA_lblBOMHeaderKA"));
		} catch(Exception e){
			 if(ele==null){
				 if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
						FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
						FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
						FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));						
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
		FormOrderAssetKA frmOrderAsset = frmOrderExecution.navigateToOrderAsset();
		frmOrderAsset.navigateToBOM();
			 }
		}
	}
	
	@Test
	public void test_invalidBOMSearch() throws Exception{
		try{
			FormBillOfMaterialKA frmBillOfMaterial = new FormBillOfMaterialKA();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("tmpBOMKA_lblComponentIDKA"));
			String SearchText = "ABCD";
			frmBillOfMaterial.searchBOM(SearchText);
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmBillOfMaterialKA_lblNoResultMsg"));
		}catch(Exception e){
			System.out.println("*****Exception caught in invalid Search*****"+e);
		}
	}
	
	@Test
	public void test_EmptySearch() throws Exception{
		try{
			FormBillOfMaterialKA frmBillOfMaterial = new FormBillOfMaterialKA();
			String SearchText = " ";
			frmBillOfMaterial.searchBOM(SearchText);
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("tmpBOMKA_lblComponentIDKA"));
		}catch(Exception e){
			System.out.println("*****Exception caught in Empty Search*****"+e);
		}
	}
	@Test
	public void test_validBOMSearch() throws Exception{
		try{
			FormBillOfMaterialKA frmBillOfMaterial = new FormBillOfMaterialKA();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("tmpBOMKA_lblComponentIDKA"));
			AppElement ComponentId = new AppElement(OrderExecutionWidgetId.getWidgetId("tmpBOMKA_lblComponentIDKA"));
			String SearchText = ComponentId.getText();
			frmBillOfMaterial.searchBOM(SearchText);
			Assert.assertTrue(frmBillOfMaterial.verifySearchResultByComponentId(SearchText));
			frmBillOfMaterial.clickBack();
		}catch(Exception e){
			System.out.println("*****Exception caught in Valid Search*****"+e);
		}
	}
	
	@Test
	public void test_navigateFurther() throws Exception{
		try{
			FormBillOfMaterialKA frmBillOfMaterial = new FormBillOfMaterialKA();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("tmpBOMKA_lblComponentIDKA"));
			frmBillOfMaterial.clickMaterial();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmBillOfMaterialKA_flxBackToOrderObjectKA"));
			AppElement BackToOrderAsset = new AppElement(OrderExecutionWidgetId.getWidgetId("frmBillOfMaterialKA_flxBackToOrderObjectKA"));
			BackToOrderAsset.click();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("tmpBOMKA_lblComponentIDKA"));
			
		}catch(Exception e){
			System.out.println("*****Exception caught in navigate Further*****"+e);
		}
		
	}
	
	
  @AfterClass(alwaysRun=true)
  public void  setupAfterClass() throws Exception{
	  try{
	    FormBillOfMaterialKA frmBillOfMaterial=new FormBillOfMaterialKA();
	    frmBillOfMaterial.clickBack();
	    FormOrderAssetKA frmOrderAsset=new FormOrderAssetKA();
	    frmOrderAsset.navigateBackToOrderExecution();
		FormOrderExecution frmOrderExecution = new FormOrderExecution();	
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		if(frmOrderExecution instanceof FormOrderExecution)Assert.assertEquals(lblValue.getText(),"Order Execution");
	  }catch(Exception e){
			relaunchApp();
			if(doLogin()){
				System.out.println("Login is successful***");
			}
	  }
  }
	
}
