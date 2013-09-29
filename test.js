
"use strict";
var regression 	= require('./regression');
var numeric		= require('numeric');
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
module.exports = { 
'ols_estimator_test' : function(test){
	
	var b = regression.olsEstimation(y,A);
	test.equal(b[0][0],-0.009283302118409553);
	test.equal(b[1][0],0.6660860367398023);
	test.equal(b[2][0],0.4485050801075223);
	test.done();
	},

'wls_estimator_test' : function(test)
{
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
	// test a case where weights is a callback function
	var b3 = regression.wlsEstimation(y,A,function(X){return 1.0;});
	test.equal(b3[0][0],-0.009283302118409553);
	test.equal(b3[1][0],0.6660860367398023);
	test.equal(b3[2][0],0.4485050801075223);
	// gaussian weighted funciton
	test.done();
},
'regression_function_test' : function(test)
{
	var b 	= regression.olsEstimation(y,A);
	var reg	= regression.regressionFunction(b);
	// expected result
	var res = [0.23672733359857961,0.04835519995342023,0.3814907471203022,0.3814907471203022,
	           -0.20866791526361256,-0.18024895923298653,0.45964555696804454,-0.1457437723801298,
	           -0.3552068433463691,0.38215790546245026];
	for (var i=0; i<y.length; ++i)
	{
		test.equal(reg(A[i]),res[i]);
	}
	// chose a weight that is skewed to the point of query
	var res2 = [0.2127459907748312,0.06355423416622437,0.3912205727555972,0.3912205727555972,
	            -0.22147779843902343,-0.22775683865138063,0.4683277999602843,-0.13917120204723066,
	            -0.34439193769359133,0.3252712707428404];
	for (var i=0; i<y.length; ++i)
	{
		var b2	= regression.wlsEstimation(y,A,
				function(x)
				{
					var diff = numeric.sub(A[i],x);
					var val = numeric.norm2Squared(diff);
					return Math.exp(-val/.5);
				});
		var reg2	= regression.regressionFunction(b2);
		test.equal(reg2(A[i]),res2[i]);
	}
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
