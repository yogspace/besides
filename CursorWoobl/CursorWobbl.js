

let mousePositions=[];
//let mpTimer=0;

function calculatePos(){

    let position={
        x:mouseX,
        y:mouseY
    };

  //  mpTimer++;
 //   if(mpTimer>100){
//mousePositions.unshift(); 
//mpTimer=0;

 //   }
    mousePositions.push(position);
    

}





  
  function draw() { 
    background(0,0,0);
    //make the ellipse follow your mouse 
    //ellipse(mousePositions[0].x,mousePositions[0].y,20,20);
        ellipse(0,0,20,20);

    calculatePos();
    console.log(mousePositions);
  }