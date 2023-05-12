import {loginRequest,creatEmployeesRequest,cadastroUsersRequest} from "./request.js"

export function cadastroModal(){
    const cadastroButton = document.querySelector("#button_header--cadastro")
    const modalController = document.querySelector("#cadastroModal_containner")
    const returnButton = document.querySelector("#return_homepage")
    const imgFundo = document.querySelector(".GenericSection_containnerModal")
    const secao1HP= document.querySelector(".GenericSection_containner")
    const secao2HP= document.querySelector(".empresasSection_containner")
  
    cadastroButton.addEventListener("click", function() {
        //window.location.replace('/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/src/pages/login.html')      
        modalController.showModal()
        imgFundo.classList.remove("hide")
        secao1HP.classList.add("hide")
        secao2HP.classList.add("hide")
    }) 

    returnButton.addEventListener("click", function() {
         //window.location.replace('/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/index.html')
        closeModal
        imgFundo.classList.add("hide")
        secao1HP.classList.remove("hide")
        secao2HP.classList.remove("hide")
    })


}


export function loginModal() {
    const loginButton = document.querySelector("#button_header--login")
    const modalController = document.querySelector("#loginModal_containner")
    const returnButtonLogin = document.querySelector("#return_homepage")
    const imgFundo = document.querySelector(".GenericSection_containnerModal")
    const secao1HP= document.querySelector(".GenericSection_containner")
    const secao2HP= document.querySelector(".empresasSection_containner")

    loginButton.addEventListener("click", function() {
        //window.location.replace('/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/src/pages/login.html')      
        modalController.showModal()
        imgFundo.classList.remove("hide")
        secao1HP.classList.add("hide")
        secao2HP.classList.add("hide")
    }) 

    returnButtonLogin.addEventListener("click", function() {
         //window.location.replace('/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/index.html')
        closeModal
        imgFundo.classList.add("hide")
        secao1HP.classList.remove("hide")
        secao2HP.classList.remove("hide")
    })
   
}

export async function doLogin() {
  cadastroUsersRequest()
    const inputs = document.querySelectorAll('.login_input')
    //console.log (inputs)
    const button = document.querySelector('.login_button')
    //console.log (button)
    let loginBody = {}
    let count = 0
  
    button.addEventListener('click', async (event) => {
      event.preventDefault()
  
      inputs.forEach(input => {
        if(input.value.trim() === '') {
          count++
        }
        
        loginBody[input.name] = input.value
      })
      //console.log (loginBody)
  
      if(count !== 0) {
        count = 0
        //return toast(red, 'Por favor preencha os campos necessários')
        return alert(`Falha no login`)
      } else {
        const goLogin = await loginRequest(loginBody)
        alert(`Login realizado com sucesso`)
        return goLogin
      }
    })
  }
  
 
export async function doCadastro() {
    
    const inputs = document.querySelectorAll('.cadastro_input')
    //console.log (inputs)
    const button = document.querySelector('.cadastro_button')
    //console.log (button)
    const modalCadastroController = document.querySelector("#cadastroModal_containner")
    const modalLoginController = document.querySelector("#loginModal_containner")
    let cadastroBody = {}
    let count = 0
  
    button.addEventListener('click', async (event) => {
      event.preventDefault()
      inputs.forEach(input => {
        if(input.value.trim() === '') {
          count++
        }
        
        cadastroBody[input.name] = input.value
      })
      console.log (cadastroBody)
  
      if(count !== 0) {
        count = 0
        //return toast(red, 'Por favor preencha os campos necessários')
        return alert(`Falha no cadastro`)
      } else {
  
        const goCadastro = await creatEmployeesRequest(cadastroBody)
        alert(`Cadastro realizado com sucesso`)
        return goCadastro
      }
    })
  }
  
 