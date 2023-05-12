import {companiesRequest,NewDepartmentRequest,cadastroUsersRequest,departmentsForCompanyRequest,allDepartments} from "./request.js"
allDepartments()


// function autentication(){
//     const token = localStorage.getItem("loginToken")
//     const acessLevel = localStorage.getItem("loginToken")
    
//     if(!token){
//         location.replace("/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/index.html")
//     } else {
//         location.replace("/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/src/pages/userPage.html")
//     }
     
// }

// autentication()

export async function companiesRenderFilter() {

    const companiesInforms = await companiesRequest()
   
    const select = document.querySelector("#empresas_filter")
    
    companiesInforms.forEach(companie => {
        const option = document.createElement("option")
        option.value = companie.id
        option.innerText = companie.name
        //console.log(option)
        select.append(option)
    });
}


export async function allDepartmentsRender() {

   const select = document.querySelector("#empresas_filter")
    //console.log(select)

    const ul = document.createElement("ul")
    ul.classList.add("ul_container") 

    const divSection= document.querySelector(".departamentosEmpresaSelect_divRender")
    divSection.innerHTML = ''

    const companiesInforms = await companiesRequest()
    //console.log(companiesInforms)
    const allDepartmentsList = JSON.parse(localStorage.getItem('allDepartments')) 

    allDepartmentsList.forEach(department => {
        //console.log(allDepartmentsList)
        //console.log(department)
        
        const nomeDepartamento = document.createElement("h2")
        nomeDepartamento.innerText = department.name

        const descricaoDepartamento = document.createElement("p")
        descricaoDepartamento.innerText = department.description

        const nomeEmpresa = document.createElement("p")
        const companyId = department.company_id.toString()
        //console.log(companyId)
        const empresa =  companiesInforms.find(element =>element.id==companyId)
        //console.log(empresa)
        nomeEmpresa.innerText=empresa.name

        const eyeImg = document.createElement("img")
        eyeImg.src = "../assets/img/olho.svg"
        eyeImg.id = "eyeImg_allDepartmentsRender"
        eyeImg.classList.add("eyeImg") 

        const wastImg = document.createElement("img")
        wastImg.src = "../assets/img/lixeiro.svg"
        wastImg.id = "wastImg_allDepartmentsRender"
        wastImg.classList.add("wastImg") 

        const pencilImg = document.createElement("img")
        pencilImg.src = "../assets/img/lapis.svg"
        pencilImg.id = "pencilImg_allDepartmentsRender"
        pencilImg.classList.add("pencilImg") 

        const div = document.createElement('div')
        div.classList.add("divDepartamentos") 
        div.append(nomeDepartamento,descricaoDepartamento,nomeEmpresa,eyeImg,wastImg,pencilImg)

        const li = document.createElement("li")
        li.classList.add("li_container") 
        li.append(div)
        ul.appendChild(li)
    });

    divSection.append(ul)
    //console.log(divSection)
    return divSection
}

allDepartmentsRender()

export async function departamentoEmpresasFilter() {

    const categorias = await companiesRequest()
    //console.log(categorias)
    const select = document.querySelector("#empresas_filter")
    //console.log(select)

    const ul = document.createElement("ul")
    ul.classList.add("ul_container") 

    const divSection= document.querySelector(".departamentosEmpresaSelect_divRender")
    divSection.innerHTML = ''

    allDepartmentsRender()
    companiesRenderFilter()

        select.addEventListener("change", async function() {
            ul.innerHTML=""
            const value = select.value
            const valueNumber = value.toString()
            console.log(valueNumber)

            if (select.value == "Selecionar Empresas" ) {
                await allDepartmentsRender()
            } else {
                divSection.innerHTML = ''
                const setorFilter = await departmentsForCompanyRequest(valueNumber)
                console.log (await departmentsForCompanyRequest(valueNumber))

                const name = document.createElement("p")
                name.innerText = setorFilter.name

                //console.log(name)

                const departamentosPorEmpresa = setorFilter.departments

                if (departamentosPorEmpresa.length===0) {

                    const semDepartamentos = document.createElement("p")
                    semDepartamentos.innerHTML = "Não há departamentos cadastrados nessa empresa"
                    semDepartamentos.id="semDetartamento_mensage"
                    ul.append(semDepartamentos)

                } else{
                    departamentosPorEmpresa.forEach(departamento => {
        
                        const nameDepartment = document.createElement("h2")
                        nameDepartment.innerText = departamento.name
        
    
                        const descriçãoDepartamento = document.createElement("p")
                        descriçãoDepartamento.innerHTML = departamento.description
    
                        const eyeImg = document.createElement("img")
                        eyeImg.src = "../assets/img/olho.svg"
                        eyeImg.classList.add("eyeImg") 
                
                        const wastImg = document.createElement("img")
                        wastImg.src = "../assets/img/lixeiro.svg"
                        wastImg.classList.add("wastImg") 
                
                        const pencilImg = document.createElement("img")
                        pencilImg.src = "../assets/img/lapis.svg"
                        pencilImg.classList.add("pencilImg") 
                
                        const div = document.createElement('div')
                        div.classList.add("divDepartamentos") 
                        div.append(nameDepartment,descriçãoDepartamento,name,eyeImg,wastImg,pencilImg)
                
                        const li = document.createElement("li")
                        li.classList.add("li_container") 
                        li.append(div)
                        ul.appendChild(li)
                    });
                }
                
                
            }
            divSection.append(ul)
            console.log(divSection)
            return divSection
        })
            
}

departamentoEmpresasFilter()

export async function logout() {

    const userLogoutButton = document.querySelector("#button_header--logout")
    userLogoutButton.addEventListener('click', async () => {
    localStorage.clear();
    window.location.replace('/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/index.html')
     })
}
logout()

export async function cadastroUsersRender(){
    const request = await cadastroUsersRequest()
    //console.log(request)
    const cadastroUsersSection = document.querySelector(".cadastroUsers_divRender")
    const ul = document.createElement("ul")
    ul.id = "ul_cadastroUsersRender"
    const cadastroUsersResponse = JSON.parse(localStorage.getItem('cadastroUsersResponse')) 
    //console.log(cadastroUsersResponse)
    const companiesInforms = await companiesRequest()

    cadastroUsersResponse.forEach(responseObject => {
        const name = responseObject.name
        //console.log(name)
        const userName = document.createElement('h2')
        userName.innerText = name 

        const companyId = responseObject.company_id
        //console.log(companyId)
        const IdCompany = document.createElement('p')

        if (companyId === null) {
            IdCompany.innerText = "Usuário ainda não contratado"
        } else {
            const empresa =  companiesInforms.find(element =>element.id==companyId)
            IdCompany.innerText = empresa
        }

        const wastImg = document.createElement("img")
        wastImg.src = "../assets/img/lixeiro.svg"
        wastImg.id = "wastImg_cadastroUsersRender"
        wastImg.classList.add("wastImg_cadastroUsersRender") 

        const pencilImg = document.createElement("img")
        pencilImg.src = "../assets/img/lapis.svg"
        pencilImg.id = "pencilImg_cadastroUsersRender"
        pencilImg.classList.add("pencilImg_cadastroUsersRender") 

        const div = document.createElement('div')
        div.append(userName,IdCompany,pencilImg,wastImg )
        const li = document.createElement("li")
        li.id = "li_cadastroUsersRender"
        li.append(div)
        ul.appendChild(li)
    })
    cadastroUsersSection.appendChild(ul)
    //console.log(cadastroUsersSection)
    return cadastroUsersSection
    }

cadastroUsersRender()

export async function criarDepartamento(){

    const modalDepartCriar = document.querySelector(".modalDepartamento_criar")
    const spanCriarDepart = document.querySelector(".divCriar_span")
    const spanClose = document.querySelector(".spanClose")
    const companiesInforms = await companiesRequest()
    //console.log(companiesInforms)
    const criarSelect = document.querySelector("#criarDepartamento_select")
    //console.log(criarSelect)
    const inputs = document.querySelectorAll('.genericCSS_Modal>div>input')
    const button = document.querySelector('.genericCSS_Modal>div>button')
    let NewDepartmentBody = {}
    let count = 0
  

    spanCriarDepart.addEventListener("click", async function() {
        modalDepartCriar.showModal()
    })

    // spanClose.addEventListener("click", async function() {
    //     //console.log("oi")
    //     modalDepartCriar.closeModal()
    // })
        
    companiesInforms.forEach(companie => {
        //console.log(companie)
        const option = document.createElement("option")
        option.value = companie.id
        option.innerText = companie.name
        //console.log(option)
        criarSelect.appendChild(option)
    })

   

    criarSelect.addEventListener("change", async function() {
        const company_id = criarSelect.value
        const company_idNumber = company_id.toString()
        NewDepartmentBody["company_id"] = company_idNumber
    })

    button.addEventListener('click', async (event) => {
      event.preventDefault()
  
      inputs.forEach(input => {
        if(input.value.trim() === '') {
          count++
        }
        
        NewDepartmentBody[input.name] = input.value
      })
      console.log (NewDepartmentBody)
  
      if(count !== 0) {
        count = 0
        return alert(`Falha no cadasatro do novo departamento`)
      } else {
        const newDepart = await NewDepartmentRequest(NewDepartmentBody)
        alert(`Novo departamento cadastrado com sucesso`)
        return newDepart
      }
    })
  }

  criarDepartamento()

export async function deletarDepartamento(){
    const modalDeparDeletar = document.querySelectorAll(".modalDepartamento_deletar")
    const deleteImgDepart = document.querySelectorAll("#wastImg")
    console.log(deleteImgDepart)

    deleteImgDepart.forEach(img => {
    console.log(deleteImgDepart)

        img.addEventListener("click", function (e) {
            modalDeparDeletar.showModal()
        })
    })

}
deletarDepartamento()






// }





// const modalDepartVisualizar = document.querySelectorAll(".modalDepartamento_visualizar")
// const modalDepartEditar = document.querySelectorAll(".modalDepartamento_editar")


// const visualizarImgDepart = document.querySelectorAll(".eyeImg") 
// console.log(visualizarImgDepart )

// const editarImgDepart = document.querySelectorAll(".pencilImg") 


// for ( let i=0; i<buttons.length; i++) {
//     let button = buttons[i]

//     button.addEventListener("click", function (e) {
//         modalController.innerHTML=""   
//         const postModal = findPost(array, e.target.dataset.postId)
//         const  modalCard = postCardsModal(postModal) 
//         modalController.appendChild(modalCard)
//         modalController.showModal()
//         closeModal()
//     })

// }
// }