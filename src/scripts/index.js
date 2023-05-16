import {categoriesRender,categoriesRenderFilter} from "./render.js"
import {loginModal,cadastroModal,doLogin,doCadastro} from "./modal.js"

function autentication(){
const token = localStorage.getItem("loginToken")
const acessLevel = localStorage.getItem("loginLevel")

if(token){
    if(acessLevel == true) {
        location.replace("/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/src/pages/adminPage.html")
    }else{
        location.replace("/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/src/pages/userPage.html")
    }
}
}
autentication()

categoriesRender()
categoriesRenderFilter()
loginModal()
cadastroModal()
doLogin()
doCadastro()


