$KI.math = {

	pi: Math.PI,

	random: function () {
		
		return (Math.random());
		/*var result = Math.random();
	
		if (0 === args.length) {
			return result;
		} else if (1 === args.length) {
			args[0] -= 0;
			if (isNaN(args[0])) {
				throw new Error("Invalid argument to math.random");
			}
	
			result = Math.floor(result * args[0]) + 1;
		} else if (2 === args.length) {
			args[0] -= 0; args[1] -= 0;
			if (isNaN(args[0]) || isNaN(args[1])) {
				throw new Error("Invalid argument(s) to math.random");
			}
	
			result = Math.floor(result * (args[1] - args[0] + 1)) + args[0];
		} else {
			throw new Error("Invalid number of arguments to math.random");
		}
	
		return result;*/
	},
	
	/*
	randomseed: function (args) {
		return null;
	},
	*/

	randomseed: function (num) {
		pseudoRandomArray = [];
	
		if (isNaN(num))
			throw new Error("Invalid argument to math.randomseed");
		
		if(!pseudoRandomArray[num])
		{
			pseudoRandomArray[num] = Math.random();
		}
		return pseudoRandomArray[num];
	},

	tointeger: function (num) {
		
	
		num -= 0;
		if (isNaN(num)) {
			throw new Error("Invalid argument to math.tointeger");
		}
	
		return Math.floor(num);
	},
	
	pow: function (num1, num2) {
		
		num1 -= 0;
		num2 -= 0;
		
		if (isNaN(num1) || isNaN(num2)) {
			throw new Error("Invalid argument(s) to math.pow");
		}
	
		return Math.pow(num1, num2);
	},

	findExtreme: function(extreme, args) {
		if (args.length < 2) {
			throw new Error((extreme ? "math.max" : "math.min") + " needs atleast two arguments");
		}
	
		var result = args[0] - 0;
		if (isNaN(result)) {
			throw new Error("Invalid argument to " + (extreme ? "math.max" : "math.min"));
		}
	
		for (var i = 1; i < args.length; i++) {
			args[i] -= 0;
			if (isNaN(args[i])) {
				throw new Error("Invalid argument to " + (extreme ? "math.max" : "math.min"));
			}
	
			if (extreme) {
				if (result < args[i]) {
					result = args[i];
				}
			} else {
				if (result > args[i]) {
					result = args[i];
				}
			}
		}
	
		return result;
	},

	min: function () {
		return $KI.math.findExtreme(false, arguments);
	},

	max: function () {
		return $KI.math.findExtreme(true, arguments);
	},

	sqrt: function (num) {
		
		num -= 0;
		if (isNaN(num)) {
			throw new Error("Invalid argument to math.sqrt");
		}
		var result = Math.sqrt(num);
		return isNaN(result) ? "nan" : result;
	}
}
