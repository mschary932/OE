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
import test.java.orderexecution.forms.FormAddExpenseItem;
import test.java.orderexecution.forms.FormAddTimeAndExpenses;
import test.java.orderexecution.forms.FormAddTimeItem;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTaskExecutionKA;
import test.java.orderexecution.forms.FormTenantKA;
import test.java.orderexecution.forms.FormTimeAndExpenses;

public class TestFormAddTimeExpenses extends OrderExecutionBaseTest{

	 @BeforeMethod
	 public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {		 
		 AppElement ele=null;
		 try{
			 ele=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddTimeExpenseKA_lblTitleKA"));
		 }catch(Exception e){
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
            frmOrderExecution.navigateToTaskExecution();
            FormTaskExecutionKA frmTaskExecutionKA=new FormTaskExecutionKA();
            frmTaskExecutionKA.navigateToTimeExpenses();
            FormTimeAndExpenses formTimeAndExpenses=new FormTimeAndExpenses();
            formTimeAndExpenses.navigatetoAddTimeAndExpense();  
			 }
		 }
	 }
	@Test
	public void navigateToAddTime() throws Exception{
	   FormAddTimeAndExpenses formAddTimeAndExpenses=new FormAddTimeAndExpenses();
	   formAddTimeAndExpenses.navigateToAddTime();
	   String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA")).getText();
	   Assert.assertEquals(lblValue,"Add Time Item");
	   FormAddTimeItem formAddTimeItem=new FormAddTimeItem();
	   formAddTimeItem.Cancel();
	   String lblvalue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddTimeExpenseKA_lblTitleKA")).getText();
	   Assert.assertEquals(lblvalue,"Add");
	}
	 
	@Test
	public void navigateToAddExpense() throws Exception{
		FormAddTimeAndExpenses formAddTimeAndExpenses=new FormAddTimeAndExpenses();
		formAddTimeAndExpenses.navigateToAddExpenses();
		String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditExpenseItemKA_lblExpenseKA")).getText();
		Assert.assertEquals(lblValue,"Add Expense Item");
	    FormAddExpenseItem formAddExpenseItem=new FormAddExpenseItem();
	    formAddExpenseItem.Cancel();
	    String lblvalue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddTimeExpenseKA_lblTitleKA")).getText();
	    Assert.assertEquals(lblvalue, "Add");
	}
	
  @AfterClass
  public void setupAfterClass() throws Exception{
		 try{
	     FormAddTimeAndExpenses  formAddTimeAndExpenses=new FormAddTimeAndExpenses();
	     formAddTimeAndExpenses.back();
		 FormTimeAndExpenses  formTimeAndExpenses=new FormTimeAndExpenses();
		 formTimeAndExpenses.back();
		 FormTaskExecutionKA formTaskExecutionKA=new FormTaskExecutionKA();
		 formTaskExecutionKA.clickBack();
		 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
	     }
		 catch(Exception e){
			relaunchApp();
			if(doLogin()){
				System.out.println("Login is successful***");
			}
	   }
	 }
}
