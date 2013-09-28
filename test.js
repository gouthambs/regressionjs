
"use strict";
var regression 	= require('./regression');

exports.ols_estimator_test = function(test)
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
	var b = regression.olsEstimation(y,A);
	//test.equal(b,[[-0.009283302118409553],[0.6660860367398023],[0.4485050801075223]]);
	test.equal(b[0][0],-0.009283302118409553);
	test.equal(b[1][0],0.6660860367398023);
	test.equal(b[2][0],0.4485050801075223);
	test.done();
};

exports.wls_estimator_test = function(test)
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
	var b = regression.wlsEstimation(y,A);
	
	//test.equal(b,[[-0.009283302118409553],[0.6660860367398023],[0.4485050801075223]]);
	test.equal(b[0][0],-0.003968253968253066);
	test.equal(b[1][0],2.492063492063469);
	test.equal(b[2][0], -0.23809523809523547);
	test.done();
};

