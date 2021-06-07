const  previousBtn  =  document.getElementById('previousBtn');
const  nextBtn  =  document.getElementById('nextBtn');
const  finishBtn  =  document.getElementById('finishBtn');
const  content  =  document.getElementById('content');
const  bullets  =  [...document.querySelectorAll('.bullet')];
const progress = [...document.querySelectorAll('.progress-line')];
const  steps  =  [...document.querySelectorAll('.step')];
var contentText = [
	"스텝 1입니당",
	"스텝 2입니당",
	"스텝 3입니당",
	"스텝 4입니당",
	"스텝 5입니당"
]

const MAX_STEPS = 5;
let currentStep = 1;

content.innerText  =  `${contentText[currentStep-1]}`;
function goSteps(i){
	currentStep = i+1;
		for(var j = 0; j < i+1; j++){
			if(bullets[j].classList.contains('completed')){
				continue;
			}
			bullets[j].classList.add('completed');
			if(j<4){
				if(progress[j].classList.contains('disabled') == true){
					progress[j].classList.remove('disabled');
					
				}
			}
			
		}
		for(var k = currentStep;k <= 4; k++){
			if(bullets[k].classList.contains('completed')){
				bullets[k].classList.remove('completed');
				if(k<4){
					if(progress[k].classList.contains('disabled')==false){
						progress[k].classList.add('disabled');
						
					}
				}
				
				
			}
		}
		console.log(currentStep);
		content.innerText  =  `${contentText[currentStep-1]}`;
}
//for(var i = 0;i<5;i++){
//	bullets[i].addEventListener('click', function(){
//		goSteps(i);
//	})
//}

	//bullets[0].addEventListener('click', () => {
	//	currentStep = 0+1;
	//	for(var j = 0; j < i+1; j++){
	//		if(bullets[j].classList.contains('completed')){
	//			continue;
	//		}
	//		bullets[j].classList.add('completed');
	//		console.log(currentStep);
	//	}
	//	for(var k = j + 1;k <= 4; k++){
	//		if(bullets[k].classList.contains('completed')){
	//			bullets[k].classList.remove('completed');
	//		}
	//	}
	//});
