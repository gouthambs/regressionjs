/**
 * Scope: Multiple linear regression; Different estimation methods such
 * as ordinary least squares, weighted least squares and generalized least 
 * squares 
 */
 
"use strict";
var numeric = require('numeric');
var regression = (typeof exports === "undefined") ? (function regression() {}) : (module.exports);

(function(export_var){
	var mean = function(V)
	{
		var len = V.length;
		var val = 0.0;
		for (var i=0; i<len; ++i){  val += V[i]; }
		return val*1./len;
	};
	var populationVariance = function(V,mean_val)
	{
		var len 	= V.length;
		var val 	= 0.0;
		mean_val 	= (typeof mean_val == "undefined") ? (mean(V)) : mean_val; 
		for (var i=0; i<len; ++i){  val += (V[i]-mean_val)*(V[i]-mean_val); }
		return val*1./len;
	};
	var sampleVariance = function(V,mean_val)
	{
		var len 	= V.length;
		var variance = 0.0;
		if (len!=1)
		{
			var val 	= 0.0;
			mean_val 	= (typeof mean_val == "undefined") ? (mean(V)) : mean_val;
			for (var i=0; i<len; ++i){  val += (V[i]-mean_val)*(V[i]-mean_val); }
			variance 	= val*1./(len-1);
		}
		return variance;
	};
	
	// solving for the vector b in multiple linear 
	// regression equation Y= b*X + e
	var olsEstimation = function(Y,X)
	{
		
		var X_tran 	= numeric.transpose(X);
		var nr_mat 	= numeric.dot(X_tran,Y);
		var dr_mat 	= numeric.inv(numeric.dot(X_tran,X));
		var b		= numeric.dot(dr_mat,nr_mat);
		return b;
	};
	
	// weighted least squares estimator
	var wlsEstimation = function(Y,X)
	{
		var ncols	= X[0].length; 	// number of regression variables
		var W 		= numeric.identity(ncols);
		var X_tran	= numeric.transpose(X);
		var varfunc = sampleVariance;
		for (var i=0; i<ncols; ++i)
		{
			var avg		= mean(X_tran[i]);
			var varnc	= varfunc(X_tran[i],avg);
			W[i][i] 	= (varnc !=0.0) ? (1.0/(varnc)) : 1.0;	
		}
		var X_tran 	= numeric.transpose(X);
		var nr_mat 	= numeric.dot(X_tran,numeric.dot(W,Y));
		var dr_mat	= numeric.inv(numeric.dot(X_tran,numeric.dot(W,X)));
		var b		= numeric.dot(dr_mat,nr_mat);
		return b;
	};
	
	// all the exports here
	// basic stat functions
	export_var.mean		 				= mean;
	export_var.populationVariance		= populationVariance;
	export_var.sampleVariance			= sampleVariance;
	
	// regression module
	export_var.olsEstimation 			= olsEstimation;
	export_var.wlsEstimation 			= wlsEstimation;
	
}(regression));

