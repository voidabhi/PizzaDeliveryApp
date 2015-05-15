
/************************************************************************
 * Implementation code for procedure - 'procedure1'
 *
 *
 * @return - invocationResult
 */
 
 var selectAllNotificationsQuery = "select * from notifications";
 
var procedure1Statement = WL.Server.createSQLStatement(selectAllNotificationsQuery);
function procedure1(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
		parameters : [param]
	});
}

/************************************************************************
 * Implementation code for procedure - 'procedure2'
 *
 *
 * @return - invocationResult
 */
 
function procedure2(param) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "storedProcedure2",
		parameters : [param]
	});
}

var procedure3Statement = WL.Server.createSQLStatement("select * from notifications where nid=?");
function procedure3(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure3Statement,
		parameters : [param]
	});
}

