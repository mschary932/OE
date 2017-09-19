package test.SAPDataHandler;
import test.common.SgConfiguration;
import test.dataconnector.sapconnector.SAPDataConnector;
import test.java.orderexecution.DeleteWorkOrders;


public class DeleteData {

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		SgConfiguration sgconf = SgConfiguration.getInstance();
		SAPDataConnector sapDataConn = new SAPDataConnector();
		DeleteWorkOrders delwo = new DeleteWorkOrders();
		sapDataConn.getSessionKey(sgconf.getKeyValue("username"), sgconf.getKeyValue("password"), sgconf.getKeyValue("SKYInstanceURL"));
		delwo.deleteWorkOrders(sgconf.getKeyValue("username"), sgconf.getKeyValue("password"), sgconf.getKeyValue("SKYInstanceURL"));	 
	}

}
