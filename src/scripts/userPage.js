import {employeesDetailsRequest} from "./request.js"
import {doLogin} from "./modal.js"
employeesDetailsRequest()
doLogin()

function autentication(){
    const token = localStorage.getItem("loginToken")
    
    if(!token){
        
        location.replace("/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/index.html")
       
    }
} 

autentication()

export async function userDetailsRender(){
  
    const sectionUserDetails = document.querySelector(".userDetails")
    const sectionCompanieDetails= document.querySelector(".companieDetails")

    const name = document.createElement("h1")
    const nameUser = JSON.parse(localStorage.getItem('loginName'))
    //console.log(nameUser.toLowerCase())
    name.innerText= "Antônio Ferreira"

    const email = document.createElement("p")
    const emailUser = JSON.parse(localStorage.getItem('loginEmail'))
    email.innerText = "af@mail.com"

    sectionUserDetails.append(name,email)

    const company =JSON.parse(localStorage.getItem('loginCompany'))
    const department =JSON.parse(localStorage.getItem('loginDepartment'))

    if(company === null) {
        const div = document.createElement("div")
        div.id="div_newUser"
        const userCompany = document.createElement("p")
        userCompany.innerText = "Você ainda não foi contratado"
        div.append(userCompany)     
        sectionCompanieDetails.append(div)
        return sectionCompanieDetails
    } else {
        const div = document.createElement("div")
        div.id="div_newUser"
        const userCompany = document.createElement("h1")
        userCompany.innerText = company 
        const userDepart = document.createElement("p")
        userCompany.innerText = department
        div.append(userCompany,userDepart)   
        sectionCompanieDetails.append(div)
        return sectionCompanieDetails
    }

    return sectionUserDetails
}
userDetailsRender()

export async function logout() {
    const userLogoutButton = document.querySelector("#button_header--logout")
    userLogoutButton.addEventListener('click', async () => {
    localStorage.clear();
    window.location.replace('/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/index.html')
     })
}
logout()