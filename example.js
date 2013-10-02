"use strict";
var regression 	= require('./regression');
var numeric		= require('numeric');

function ols_regression_example()
{
	// Y constructed as y = 2.*x_1+ 3.0 * x_2
	var X = [[1.,2.],[4.,6.],[5.,8.],[9.,2.]];
	var Y = [[8.],[26.],[34.],[24.]];
	var b = regression.olsEstimation(Y,X);
	console.log("The regression equation is : ",b[0][0],"x_1 + ",b[1][0],"x_2" );
}
function wls_regression_example()
{
	// Y constructed as y = 2.*x_1+ 3.0 * x_2 except for last
	// point; we give less weight to the last observation;
	var X = [[1.,2.],[4.,6.],[5.,8.],[9.,2.]];
	var Y = [[8.],[26.],[34.],[28.]];
	var b = regression.wlsEstimation(Y,X,[1.,1.,1.,0.000001]);
	console.log("The regression equation is : ",b[0][0],"x_1 + ",b[1][0],"x_2" );
}
function iterative_regression_example()
{
	// Y constructed as y = 2.*x_1+ 3.0 * x_2 except for last
	// point; we give less weight to the last observation;

	var X = [[1.,2.],[4.,6.],[5.,8.],[9.,2.],[5.,7.],[6.,2.],[4.,3.],[8.,10.],[7.,20.]];
	var Y = [[8.],[26.],[34.],[24.],[31.],[18.],[17.],[46.],[0.]];
	var W = [1.,1.,1.,1.,1.,1.,1.,1.,1.];
	/*for(var i=0; i<10; ++i)
	{
		console.log("W is ",W);
		var b 	= regression.wlsEstimation(Y,X,W);
		for (var j = 0; j<W.length; ++j)
		{
			var func = regression.regressionFunction(b);
			W[j] = 1.0/Math.max(0.001,Math.abs(Y[j][0]-func(X[j])  ) );
			
			//console.log(Y[j][0],func(X[j]),Math.abs(Y[j][0]-func(X[j]) ),Math.max(0.001,Math.abs(Y[j][0]-func(X[j])  ) ),W[j]);
		}
		
		console.log(i,b);
	}
	
	console.log("The regression equation is : ",b[0][0],"x_1 + ",b[1][0],"x_2" );*/
	var b = regression.robustEstimation(Y,X);
	console.log(b);
}



function main()
{
	//ols_regression_example();
	//wls_regression_example();
	iterative_regression_example();
};

main();