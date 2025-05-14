function init(){
    if(Modernizr.hasJquery){
        console.log("jquery Loaded");
    }else{
        console.log("Error Loading Jquery");
    }
}

init();