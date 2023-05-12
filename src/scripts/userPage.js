import {employeesDetailsRequest} from "./request.js"
employeesDetailsRequest()

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
    name.innerText= nameUser

    const email = document.createElement("p")
    const emailUser = JSON.parse(localStorage.getItem('loginEmail'))
    email.innerText = emailUser

    sectionUserDetails.append(name,email)

    const company =JSON.parse(localStorage.getItem('loginCompany'))

    if(company === null) {
        const div = document.createElement("div")
        div.id="div_newUser"
        const userCompany = document.createElement("p")
        userCompany.innerText = "Você ainda não foi contratado"
        div.append(userCompany)     
        sectionCompanieDetails.append(div)
        return sectionCompanieDetails
    } else {
        alert("já cadastrado")
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