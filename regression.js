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
	var median  = function(V)
	{
		var sorted_V 	= V.slice(0);
		sorted_V.sort(function(a,b){ return a-b;})
		var len			= sorted_V.length;
		var rem			= (len%2);
		var medn		= (rem)? sorted_V[(len-1)/2] : 0.5*(sorted_V[len/2] + sorted_V[len/2-1]);
		return medn;
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
		var len 	 = V.length;
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
	var regressionFunction = function(b)
	{
		return function(x)
		{
			return  numeric.dot(x,b)[0];
		};
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
	var wlsEstimation = function(Y,X,weights)
	{
		var nrows	= X.length; 	// number of observations
		var W 		= numeric.identity(nrows);
		if (weights instanceof Array)
		{
			for (var i=0; i<nrows; ++i)
			{
				W[i][i] = weights[i];	
			}
		}else if (typeof weights == 'function')
		{
			for (var i=0; i<nrows; ++i)
			{
				W[i][i]		= weights(X[i]);
			}
		}
		var X_tran	= numeric.transpose(X);
		var nr_mat 	= numeric.dot(X_tran,numeric.dot(W,Y));
		var dr_mat	= numeric.inv(numeric.dot(X_tran,numeric.dot(W,X)));
		var b		= numeric.dot(dr_mat,nr_mat);
		return b;
	};
	// function used in robust estimation
	function weightFunction(res,sig)
	{
		var len = res.length;
		var wts = new Array(len);
		var k = 4.685*sig;
		for (var i=0; i<len; ++i)
		{
			var ek 	= res[i]/k;
			wts[i] 	= (Math.abs(ek) <=1 ) ? ( (1.-(ek*ek))*(1.-(ek*ek)) ) : 0.0 ;
		}
		return wts;
	}
	var robustEstimation = function(Y,X,WFunc)
	{
		var X_tran 		= numeric.transpose(X);
		var nrows		= X.length;
		var ncols		= X[0].length; // number of independent vars
		var W 			= numeric.identity(nrows);
		var err			= 1000;
		var tol 		= 1e-4;
		var MAX_ITER	= 10;
		var b_old		= new Array(ncols);
		for(var i=0; i<ncols; ++i) { b_old[i] = 0.;}
		for(var i=0; (i<MAX_ITER) && (err>tol); ++i)
		{
			var nr_mat 	= numeric.dot(X_tran,numeric.dot(W,Y));
			var tmp 	= numeric.dot(X_tran,numeric.dot(W,X));
			var dr_mat	= numeric.inv(tmp);
			var b		= numeric.dot(dr_mat,nr_mat);
			var func	= regressionFunction(b);
			var resdl	= new Array(nrows);
			for (var j  = 0 ; j<nrows; ++j) { resdl[j] = Y[j] - func(X[j]); }
			var MAR		= median(resdl);
			var sig		= MAR/0.6745;// this is sigma 
			var wt		= weightFunction(resdl,sig);
			for (var j=0 ; j<nrows; ++j) { W[j][j] = wt[j]; }
			err			= 0;
			for(var j=0; j<ncols; ++j) { err += (b_old[j] - b[j][0])*(b_old[j] - b[j][0]);}
			for(var j=0; j<ncols; ++j) { b_old[j] = b[j][0];}
		}
		return b;
	};
	// all the exports here
	// basic stat functions
	export_var.mean		 				= mean;
	export_var.median					= median;
	export_var.populationVariance		= populationVariance;
	export_var.sampleVariance			= sampleVariance;
	
	// regression module
	export_var.olsEstimation 			= olsEstimation;
	export_var.wlsEstimation 			= wlsEstimation;
	export_var.robustEstimation			= robustEstimation;
	export_var.regressionFunction		= regressionFunction;
}(regression));

