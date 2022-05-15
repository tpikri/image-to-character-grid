class PixelEngine {

	constructor(tWidth, tHeight, txChars){
		this.data = [];
		this.width  = tWidth;
		this.height = tHeight;
		this.xChars = this.getClosestFactor(tWidth, txChars);
		//alert(this.xChars);
	}
	
	calc(data){
		this.data = data;
		return this.imgDataToGrid(this.width, this.height, this.xChars);
	}

	imgDataToGrid(width, height, xChars){
		let yChars = height*xChars/width;
		
		let pieceWidth = width/xChars;
		let pieceHeight = height/yChars;
		
		let grid = [];
		
		let bwMax = 0, bwMin = 255;
		
		let xi, yi = 0;
		for (let y = 0; y < (height-pieceHeight); y+=pieceHeight){
			grid[yi] = [];
			xi = 0;
			for (let x = 0; x < (width-pieceWidth); x+=pieceWidth){

				grid[yi][xi] = this.squareToPixel(x, y, pieceWidth, pieceHeight, width);
				
				if (grid[yi][xi].bw>bwMax) bwMax = grid[yi][xi].bw;
				else if (grid[yi][xi].bw<bwMin) bwMin = grid[yi][xi].bw;
				xi++;
			}
			yi++;
		}
		
		return {grid: grid, bwMin: bwMin, bwMax: bwMax};
	}

	squareToPixel(x, y, sqWidth, sqHeight, dataWidth){
		let sumR = 0, sumG = 0, sumB = 0;
		let pixCount = 0;
		
		//console.log(x+" "+y+" "+sqWidth+" "+sqHeight+" "+dataWidth);
		
		for (let yi = 0; yi < sqHeight; yi++) {
			for (let xi = 0; xi < sqWidth; xi++) {
				
				let i = ((dataWidth*(yi+y)) + (xi+x))*4;
				sumR += this.data[i];
				sumG += this.data[i+1];
				sumB += this.data[i+2];
				pixCount++;
				
			}
		}
		
		return {
			r: Math.round(sumR/pixCount), 
			g: Math.round(sumG/pixCount), 
			b: Math.round(sumB/pixCount), 
			bw: Math.round((sumR+sumG+sumB)/(3*pixCount))
		};
	}

	getFactors(integer){
	  let factors = [],
	  quotient = 0;

	  for(let i = 1; i <= integer; i++){
	    quotient = integer/i;

	    if(quotient === Math.floor(quotient)){
	      factors.push(i); 
	    }
	  }
	  return factors;
	}

	getClosestFactor(n, closeTo){
		let f = this.getFactors(n);
		
		let min = n, minV = n;
		
		for (let i = 0; i<f.length; i++)
			if (Math.abs(f[i]-closeTo) < min) {
				min = Math.abs(f[i]-closeTo);
				minV = f[i];
			}
			
		return minV;
	}

}