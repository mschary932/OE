package test.java.orderexecution.tests;

import java.lang.reflect.Method;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.common.AppElement;
import test.java.orderexecution.forms.FormBillOfMaterialKA;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderAssetKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormOrderAssetKA extends OrderExecutionBaseTest {
	
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderObjectKA_lblOrderObjectHeaderKA"));
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
				frmOrderExecution.navigateToOrderAsset();
			 }
		}	  
	}	
	//To Navigate to Order  Asset
	@Test
	public void test_navigateToBillOfMaterial() throws Exception{
		try{
			FormOrderAssetKA frmOrderAsset =new FormOrderAssetKA();
			FormBillOfMaterialKA frmBillOfMaterial = frmOrderAsset.navigateToBOM();
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmBillOfMaterialKA_lblBOMHeaderKA"));
			if(frmBillOfMaterial instanceof FormBillOfMaterialKA)Assert.assertEquals(lblValue.getText(),"Bill of material");
			
			//To NavigateBack to OrderAsset
			frmBillOfMaterial = new FormBillOfMaterialKA();
			frmBillOfMaterial.navigateBackToOrderAsset();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderAssetKA_lblOrderObjectHeaderKA"));
		    AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAssetKA_lblOrderObjectHeaderKA"));
			if(frmOrderAsset instanceof FormOrderAssetKA)Assert.assertEquals(lblValue1.getText(),"Order Asset");
		}catch(Exception e){
			System.out.println("****Last test case failed****");
		}

}
 @AfterClass(alwaysRun=true)
 public void setupAfterClass() throws Exception{
	 try{
		FormOrderAssetKA orderAssetForm=new FormOrderAssetKA();
		orderAssetForm.navigateBackToOrderExecution();
		FormOrderExecution frmOrderExecution=new FormOrderExecution();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		AppElement lblValue2=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		if(frmOrderExecution instanceof FormOrderExecution)Assert.assertEquals(lblValue2.getText(),"Order Execution"); 	
	 }catch(Exception e){
			relaunchApp();
			if(doLogin()){
				System.out.println("Login is successful***");
			}
	 }
 }
	
}
