document.addEventListener("DOMContentLoaded",function(){
    document.querySelector(".dark").addEventListener("click",function(){
        document.body.setAttribute("data-bs-theme","dark");
    
    });
    document.querySelector(".light").addEventListener("click",function(){
        document.body.setAttribute("data-bs-theme","light");
    
    });
    


});