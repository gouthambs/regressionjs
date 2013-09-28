/**
 * Scope: Multiple linear regression; Different estimation methods such
 * as ordinary least squares, weighted least squares and generalized least 
 * squares 
 */
 
"use strict";
var numeric = require('numeric');
var regression = (typeof exports === "undefined") ? (function regression() {}) : (module.exports);

(function(export_var){
	// solving for the vector b in multiple linear 
	// regression equation Y= b*X + e
	var ols_estimator = function(Y,X)
	{
		var X_tran 	= numeric.transpose(X);
		var nr_mat 	= numeric.dot(X_tran,Y);
		var dr_mat 	= numeric.inv(numeric.dot(X_tran,X));
		var b		= numeric.dot(dr_mat,nr_mat);
		return b;
	};
	
	// all the exports here
	export_var.ols_estimator = ols_estimator;
	
}(regression));



 
 