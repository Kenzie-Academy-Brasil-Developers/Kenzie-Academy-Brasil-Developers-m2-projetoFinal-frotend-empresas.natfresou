import {companiesRequest,NewDepartmentRequest,cadastroUsersRequest,departmentsForCompanyRequest,allDepartments,userRemove,departmentRemove,UserEdit,departamentoEdit,funcionariosParaContratar,contratarNewFuncionario} from "./request.js"
allDepartments()
cadastroUsersRequest()

//Proteção de rota de page adiministrador

function autentication(){
    const token = localStorage.getItem("loginToken")
    const acessLevel = JSON.parse(localStorage.getItem("loginLevel"))
    
    if(!token){
        location.replace("/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/index.html")
    } else {
        if(acessLevel==false) {
            location.replace("/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/src/pages/user.html")
        }
    }   
}

autentication()

//Renderizar filtro por empresa

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

//Renderizar todos os departamentos

export async function allDepartmentsRender() {

    const modalDepartVisualizar = document.querySelector(".modalDepartamento_visualizar")
    const modalDepartEditar = document.querySelector(".modalDepartamento_editar")
    const modalDeparDeletar = document.querySelector(".modalDepartamento_deletar")

    const closeDepartVisualizar = document.querySelector(".spanClose_VisualizarDepart")
    const closeDepartEditar = document.querySelector(".spanClose_EditDepart")
    const closeDeparDeletar = document.querySelector(".spanClose_dellDepart")

    const ul = document.createElement("ul")
    ul.classList.add("ul_container") 

    const divSection= document.querySelector(".departamentosEmpresaSelect_divRender")
    //divSection.innerHTML = ''
   ul.innerHTML=""

    const companiesInforms = await companiesRequest()
    //console.log(companiesInforms)
    const allDepartmentsList = JSON.parse(localStorage.getItem('allDepartments')) 

    allDepartmentsList.forEach(department => {
        //console.log(allDepartmentsList)
        //console.log(department)
        
        const nomeDepartamento = document.createElement("h2")
        nomeDepartamento.innerText = department.name

        const idDepartamento = department.id

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

        eyeImg.addEventListener("click", function() {
            modalDepartVisualizar.showModal()
            localStorage.setItem('idDepartamentoVisualizar',JSON.stringify(idDepartamento))
            localStorage.setItem('nameDepartamentoVisualizar',JSON.stringify(department.name))
            localStorage.setItem('descriptionDepartamentoVisualizar',JSON.stringify(department.description))
        })

        closeDepartVisualizar.addEventListener("click", async function() {
            modalDepartVisualizar.close()
        })

        const wastImg = document.createElement("img")
        wastImg.src = "../assets/img/lixeiro.svg"
        wastImg.id = "wastImg_allDepartmentsRender"
        wastImg.classList.add("wastImg") 
        
        wastImg.addEventListener("click", function() {
            modalDeparDeletar.showModal()
            localStorage.setItem('idDepartamentoWaste',JSON.stringify(idDepartamento))
        })

        closeDeparDeletar.addEventListener("click", async function() {
            modalDeparDeletar.close()
        })

        const pencilImg = document.createElement("img")
        pencilImg.src = "../assets/img/lapis.svg"
        pencilImg.id = "pencilImg_allDepartmentsRender"
        pencilImg.classList.add("pencilImg") 

        pencilImg.addEventListener("click", function() {
            modalDepartEditar.showModal()
            localStorage.setItem('idDepartamentoEdit',JSON.stringify(idDepartamento))
            localStorage.setItem('nameDepartamentoEdit',JSON.stringify(department.name))
            localStorage.setItem('descriptionDepartamentoEdit',JSON.stringify(department.description))
            // console.log(idDepartamento)
            // console.log(department.name)
            // console.log(department.description)
        })

        closeDepartEditar.addEventListener("click", async function() {
            modalDepartEditar.close()
        })
        
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

//Renderizar departamentos por empresa

function departamentoEmpresasFilter() {

    const modalDepartVisualizar = document.querySelector(".modalDepartamento_visualizar")
    const modalDepartEditar = document.querySelector(".modalDepartamento_editar")
    const modalDeparDeletar = document.querySelector(".modalDepartamento_deletar")
    const select = document.querySelector("#empresas_filter")
    //console.log(select)

    const ul = document.createElement("ul")
    ul.classList.add("ul_container") 

    const divSection= document.querySelector(".departamentosEmpresaSelect_divRender")
    divSection.innerHTML = ''

   
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
            //console.log (await departmentsForCompanyRequest(valueNumber))

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
                console.log(departamento)
                const nameDepartment = document.createElement("h2")
                nameDepartment.innerText = departamento.name

                // const idDepartamento = departamento.id
                // console.log(idDepartamento)

        
                const descriçãoDepartamento = document.createElement("p")
                descriçãoDepartamento.innerHTML = departamento.description

                const eyeImg = document.createElement("img")
                eyeImg.src = "../assets/img/olho.svg"
                eyeImg.classList.add("eyeImg") 

                eyeImg.addEventListener("click", function() {
                    modalDepartVisualizar.showModal()
                })
        
                const wastImg = document.createElement("img")
                wastImg.src = "../assets/img/lixeiro.svg"
                wastImg.classList.add("wastImg") 

                // wastImg.addEventListener("click", function() {
                //     modalDeparDeletar.showModal()
                //     localStorage.setItem('idDepartamento',JSON.stringify(idDepartamento))
                // })
        
                const pencilImg = document.createElement("img")
                pencilImg.src = "../assets/img/lapis.svg"
                pencilImg.classList.add("pencilImg") 

                pencilImg.addEventListener("click", function() {
                    modalDepartEditar.showModal()
                })
        
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

//Logout page administrador

export async function logout() {

    const userLogoutButton = document.querySelector("#button_header--logout")
    userLogoutButton.addEventListener('click', async () => {
    localStorage.clear();
    window.location.replace('/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/index.html')
     })
}
logout()

//Renderizar usuários cadastrados

export async function cadastroUsersRender(){

    const modalCadastroEditar = document.querySelector(".modalUser_editar")
    const modalCadastroDeletar = document.querySelector(".modalUser_deletar")
    const closeDellUser = document. querySelector(".spanClose_dellUser")
    const closeEditUser = document.querySelector(".spanClose_editUser")
    const cadastroUsersSection = document.querySelector(".cadastroUsers_divRender")
    const ul = document.createElement("ul")
    ul.id = "ul_cadastroUsersRender"
    cadastroUsersSection.innerHTML=""
    ul.innerHTML=""
    const cadastroUsersResponse = JSON.parse(localStorage.getItem('cadastroUsersResponse')) 
    console.log(cadastroUsersResponse)
    const companiesInforms = await companiesRequest()

    cadastroUsersResponse.forEach(responseObject => {
        const name = responseObject.name
        //console.log(name)
        const userName = document.createElement('h2')
        userName.innerText = name 

        const funcionario_ID = responseObject.id
        //console.log(name) 

        const companyId = responseObject.company_id
        //console.log(companyId)
        const IdCompany = document.createElement('p')

        if (companyId === null) {
            IdCompany.innerText = "Usuário ainda não contratado"
        } else {
            const empresa =  companiesInforms.find(element =>element.id==companyId)
            console.log(empresa)
            IdCompany.innerText = empresa.name
        }

        const wastImg = document.createElement("img")
        wastImg.src = "../assets/img/lixeiro.svg"
        wastImg.id = "wastImg_cadastroUsersRender"
        wastImg.classList.add("wastImg_cadastroUsersRender") 

        wastImg.addEventListener("click", function() {
            modalCadastroDeletar.showModal()
            localStorage.setItem('funcionarioDemitir_id',JSON.stringify(funcionario_ID))
            localStorage.setItem('funcionarioDemitir_nome',JSON.stringify(name))
        })

        closeDellUser.addEventListener("click", async function() {
            modalCadastroDeletar.close()
        })

        const pencilImg = document.createElement("img")
        pencilImg.src = "../assets/img/lapis.svg"
        pencilImg.id = "pencilImg_cadastroUsersRender"
        pencilImg.classList.add("pencilImg_cadastroUsersRender") 

        pencilImg.addEventListener("click", function() {
            modalCadastroEditar.showModal()
            localStorage.setItem('funcionarioEditar_id',JSON.stringify(funcionario_ID))
        })
        
        closeEditUser.addEventListener("click", async function() {
            modalCadastroEditar.close()
        })
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

//Criar novo departamento

export async function criarDepartamento(){

    const modalDepartCriar = document.querySelector(".modalDepartamento_criar")
    const spanCriarDepart = document.querySelector(".divCriar_span")
    const spanClose = document.querySelector(".spanClose")
    //console.log(spanClose)
    const companiesInforms = await companiesRequest()
    //console.log(companiesInforms)
    const criarSelect = document.querySelector("#criarDepartamento_select")
    //console.log(criarSelect)
    const inputs = document.querySelectorAll('.input_criarDepart')
    const button = document.querySelector('.genericCSS_Modal>div>button')
    let NewDepartmentBody = {}
    let count = 0


    spanCriarDepart.addEventListener("click", async function() {
        modalDepartCriar.showModal()
    })

    spanClose.addEventListener("click", async function() {
        modalDepartCriar.close()
    })

    companiesInforms.forEach(companie => {
        //console.log(companie)
        const option = document.createElement("option")
        option.value = companie.id
        option.innerText = companie.name
        //console.log(option)
        criarSelect.appendChild(option)
    })



    criarSelect.addEventListener("click", async function() {
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
      console.log (inputs)

      if(count !== 0) {
        count = 0
        return alert(`Falha no cadasatro do novo departamento`)
      } else {
        const newDepart = await NewDepartmentRequest(NewDepartmentBody)
        alert(`Novo departamento cadastrado com sucesso`)
        allDepartmentsRender()
        return newDepart
      }
    })

  }

  criarDepartamento()

  //deletar usuário

  export async function deletarUser(){

    const deletarButton = document.querySelector(".user_deletar")


    deletarButton.addEventListener("click", async function() {

        const userDeletId = JSON.parse(localStorage.getItem('funcionarioDemitir_id')) 
        const userDeletIdString =userDeletId.toString()
        console.log(userDeletIdString)
        //const userDeletName = JSON.parse(localStorage.getItem('funcionarioDemitir_nome')) 
        const usuarioDeleter =  await userRemove(userDeletIdString)
        cadastroUsersRender()
        window.location.reload()
        return usuarioDeleter
    })
    
}

deletarUser()

//editar usuário

export async function editarUser(){

    const editarButton = document.querySelector("#user_editarButton")
    const inputs = document.querySelectorAll(".userEditar_input")
    //console.log (inputs)
    let editBody = {}
    let count = 0

    editarButton.addEventListener("click", async function() {

        const userEditId = JSON.parse(localStorage.getItem('funcionarioEditar_id')) 
        const userEditIdString = userEditId.toString()
        console.log(userEditIdString)

        inputs.forEach(input => {
            if(input.value.trim() === '') {
              count++
            }
            editBody[input.name] = input.value
          })

        if(count !== 0) {
            count = 0
            return alert(`Falha na Edição dos dados do usuário`)
            } else {
            const editarUser = await UserEdit(userEditId,editBody)
            alert(`Edição dos dados do usuário concluída com sucesso`)
            window.location.reload(true)
            cadastroUsersRender()
            return editarUser
        }
       
    })
}

editarUser()

//deletar departamento

export async function deletarDepartamento(){

    const deletarButton = document.querySelector("#Departamento_deletar")

    deletarButton.addEventListener("click", async function() {

        const departamentoDeletId = JSON.parse(localStorage.getItem('idDepartamentoWaste')) 
        const departamentoDeletIdString = departamentoDeletId.toString()
        console.log(departamentoDeletIdString)
        const departamentoDeleter =  await departmentRemove(departamentoDeletIdString)
        return departamentoDeleter
    })
}

deletarDepartamento()

export async function editarDepartamento(){

    const editarButton = document.querySelector("#Departamento_editarButton")
    const inputs = document.querySelector("#Departamento_editarInput")
    //console.log (inputs)
    const departamentoEditId = JSON.parse(localStorage.getItem('idDepartamentoEdit')) 
    //const departamentoEditIdString= departamentoEditId.toString()
    //console.log(departamentoEditIdString)
    const departamentoEditName = JSON.parse(localStorage.getItem('nameDepartamentoEdit')) 
    const departamentoEditDescription = JSON.parse(localStorage.getItem('descriptionDepartamentoEdit'))
    //inputs.value = departamentoEditDescription

    let editBody = {}

    editarButton.addEventListener("click", async function() {

        editBody.description=inputs.value
        editBody.name = departamentoEditName
        const editarDepart = await departamentoEdit(departamentoEditIdString,editBody)
        console.log(editarDepart)
        return editarDepart
    })

}

editarDepartamento()


export async function newUserContratar() {

   const newUserList = await funcionariosParaContratar()
   const departamento = JSON.parse(localStorage.getItem('idDepartamentoVisualizar')) 
   console.log(departamento)
   const select = document.querySelector("#select_users")
   const button = document.querySelector("#contratarButton") 
   console.log(button)
   const objeto={}
   
    objeto.department_id=departamento 
    console.log(objeto)
    
    newUserList.forEach(user => {
        const option = document.createElement("option")
        option.value = user.id
        option.innerText = user.name
        console.log(option)
        select.append(option)
    });

    button.addEventListener("click", async function() {

        const userContratar = select.value
        const userContratarString = userContratar.toString()
        console.log(userContratarString)

        if (select.value == "Selecionar Usuário para Contratação") {
            alert("Selecione um usuário")
        } else {
            const setorFilter = await contratarNewFuncionario(userContratarString, objeto)
            console.log (setorFilter)
        }
    })  

}
newUserContratar()

// export async function newUserFilter() {

//     const newUserList = await funcionariosParaContratar()
//     const contratarButton = document.querySelector("#contratarButton")
//     const select = document.querySelector("#select_users")
    
//     newUserList.forEach(user => {
//         const option = document.createElement("option")
//         option.value = user.id
//         option.innerText = user.name
//         console.log(option)
//         select.append(option)
//     });
// }
// newUserContratar()