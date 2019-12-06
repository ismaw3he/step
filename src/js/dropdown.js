const burger=document.querySelector('.navigation__burger');
const dropDownMenu=document.querySelector('.navbar__menu');

burger.addEventListener('click',(event)=>{
    if(dropDownMenu.classList.contains("menu--dropdown")){
        dropDownMenu.classList.remove("menu--dropdown");
    }
    else{
        dropDownMenu.classList.add("menu--dropdown");
    }
});