
"use strict";
var regression 	= require('./regression');

module.exports = { 
'ols_estimator_test' : function(test){
	var y = [[.15],
	         [.25],
	         [.5],
	         [.35],
	         [-.18],
	         [-.3],
	         [.4],
	         [-.17],
	         [-.35],
	         [.35]];
	var A = [[1., .10 ,.40],
	         [1.,.10 ,-.02],
	         [1.,.25 ,.50],
	         [1.,.25 ,.50],
	         [1.,-.03 ,-.40],
	         [1.,.08 ,-.50],
	         [1.,.30 ,.60],
	         [1.,-.05, -.23],
	         [1.,-.25 ,-.40],
	         [1.,.15 ,.65]];
	var b = regression.olsEstimation(y,A);
	test.equal(b[0][0],-0.009283302118409553);
	test.equal(b[1][0],0.6660860367398023);
	test.equal(b[2][0],0.4485050801075223);
	test.done();
	},

'wls_estimator_test' : function(test)
{
	var y = [[.15],
	         [.25],
	         [.5],
	         [.35],
	         [-.18],
	         [-.3],
	         [.4],
	         [-.17],
	         [-.35],
	         [.35]];
	var A = [[1., .10 ,.40],
	         [1.,.10 ,-.02],
	         [1.,.25 ,.50],
	         [1.,.25 ,.50],
	         [1.,-.03 ,-.40],
	         [1.,.08 ,-.50],
	         [1.,.30 ,.60],
	         [1.,-.05, -.23],
	         [1.,-.25 ,-.40],
	         [1.,.15 ,.65]];
	// with uniform weights WLS estimation should 
	// be the same as OLS estimation;
	var b = regression.wlsEstimation(y,A,[1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0]);
	test.equal(b[0][0],-0.009283302118409553);
	test.equal(b[1][0],0.6660860367398023);
	test.equal(b[2][0],0.4485050801075223);
	// weight the mid ones more than the edge ones
	var b2 = regression.wlsEstimation(y,A,[0.5,0.5,0.5,1.0,1.0,1.0,1.0,0.5,0.5,0.5]);
	test.equal(b2[0][0],-0.008761466727384981);
	test.equal(b2[1][0],0.4967692480404766);
	test.equal(b2[2][0],0.49808204778667453);
	
	test.done();
},
'mean_test' : function(test)
{
	var V = [0,2,4,6,7];
	var m = regression.mean(V);
	test.equal(m,3.8,"Failed mean calculation test");
	test.done();
},
'population_variance_test' : function(test)
{
	var V 	= [0,2,4,6,7];
	var m 	= regression.mean(V);
	var pv 	= regression.populationVariance(V,m);
	test.equal(pv,6.56,"Failed population variance test");
	var pv2	= regression.populationVariance(V);
	test.equal(pv2,6.56,"Failed population variance test");
	test.done();
},
'sample_variance_test' : function(test)
{
	var V = [0,2,4,6,7];
	var m = regression.mean(V);
	var pv = regression.sampleVariance(V,m);
	test.equal(pv,8.2,"Failed sample variance test");
	var pv2	= regression.sampleVariance(V);
	test.equal(pv2,8.2,"Failed population variance test");
	test.done();
}
};
