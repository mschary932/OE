package test.SAPDataHandler;


import test.dataconnector.sapconnector.SAPDataConnector;
import test.java.orderexecution.CreateWorkOrders;
import test.common.SgConfiguration;


public class CreateData {

	/**
	 * @param args
	 * @throws Exception 
	 */
	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		SgConfiguration sgconf = SgConfiguration.getInstance();
		SAPDataConnector sapDataConn = new SAPDataConnector();
		CreateWorkOrders cwo = new CreateWorkOrders();
		try
		{
		if(sgconf.getKeyValue("connector").equalsIgnoreCase("ECC"))
	    {
		sapDataConn.getSessionKey(sgconf.getKeyValue("username"), sgconf.getKeyValue("password"), sgconf.getKeyValue("SKYInstanceURL"));
		cwo.createWorkOrders(sgconf.getKeyValue("username"), sgconf.getKeyValue("password"), sgconf.getKeyValue("SKYInstanceURL"));
		}
	    else
	    {
		  cwo.createWorkOrdersCRM(sgconf.getKeyValue("SKYInstanceURL"));
		}
		}
		catch(Exception e)
		{
			System.out.println("In catch block of CreateData ");
			System.out.println(e.getMessage());
		}
}
}


