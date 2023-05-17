import { toast } from "./toast.js"

const token = JSON.parse(localStorage.getItem('loginToken')) || ""
const baseUrl="http://localhost:3333/"
const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
}

// 1.Listar todas as categorias/setores

export async function categoriesRequest() {
    const categories = await fetch ( `${baseUrl}categories/readAll`, {
        method:"GET",
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            localStorage.setItem('setores',JSON.stringify(response))
            //console.log(response)
            return response
        } else {
            localStorage.removeItem('setores')
            throw new Error("falha")
        }
    })
    .catch (Error =>{
        console.log(Error)
    })
    return categories
}

//2.Listar empresas por categorias/setores

export async function categoriesRequestFilter(category_name) {
    const categories = await fetch ( `${baseUrl}companies/readByCategory/${category_name}`, {
        method:"GET",
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            localStorage.setItem('setor',JSON.stringify(response))
            //console.log(response)
            return response
        } else {
            localStorage.removeItem('setor')
            throw new Error("falha")
        }
    })
    .catch (Error =>{
        console.log(Error)
    })
    return categories
}

//3.Listar empresas as empresas e suas categorias/setores

export async function companiesRequest() {
    const categories = await fetch ( `${baseUrl}companies/readAll`, {
        method:"GET",
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            localStorage.setItem('companies',JSON.stringify(response))
            //console.log(response)
            return response
        } else {
            localStorage.removeItem('companies')
            throw new Error("falha")
        }
    })
    .catch (Error =>{
        console.log(Error)
    })
    return categories
}

//4.Criar cadastro

export async function creatEmployeesRequest(cadastroBody) {
    const cadastroWay = await fetch ( `${baseUrl}employees/create`, {
        method:"POST",
        headers:requestHeaders,
        body:JSON.stringify(cadastroBody)
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            console.log(response)
            localStorage.setItem('cadastroName',JSON.stringify(response.name))
            localStorage.setItem('cadastroId',JSON.stringify(response.id))
            localStorage.setItem('cadastroEmail',JSON.stringify(response.email))

            return response
        } else {
            const response = await res.json()
            localStorage.removeItem('cadastroName')
            localStorage.removeItem('cadastroId')
            localStorage.removeItem('cadastroEmail')
            throw new Error(`${response.message}`)
        }
    })
    .catch (Error =>{
        console.log(Error)
    })
    console.log(cadastroWay)
    return cadastroWay
    
}

//5.Faze login

export async function loginRequest(loginBody) {
    const loginWay = await fetch ( `${baseUrl}auth/login`, {
        method:"POST",
        headers:requestHeaders,
        body:JSON.stringify(loginBody)
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            console.log(response)
            localStorage.setItem('loginToken',JSON.stringify(response.authToken))
            localStorage.setItem('loginLevel',JSON.stringify(response.isAdm))
            if(response.isAdm === true){
                window.location.replace('/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/src/pages/adminPage.html')
                
            } else {
                window.location.replace('/Kenzie-Academy-Brasil-Developers-m2-projetoFinal-frotend-empresas.natfresou/src/pages/userPage.html')   
            }
            return response
        } else {
            const response = await res.json()
            localStorage.removeItem('loginToken')
            localStorage.removeItem('loginLevel')
            throw new Error(`${response.message}`)
        }
    })
    .catch (Error =>{
        console.log(Error)
    })
    console.log(loginWay)
    return loginWay
    
}

// const loginBodyTeste = {
//     "email": "admin@mail.com",
//     "password":"123456"
// }

// const teste = await loginRequest (loginBodyTeste)

// console.log(teste)

//6.Rota responsavel por mostrar as informações do usuário logado

export async function employeesDetailsRequest() {
    const employeeDetails = await fetch ( `${baseUrl}employees/profile`, {
        method:"GET",
        headers:requestHeaders
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            //console.log(response)
            localStorage.setItem('loginName',JSON.stringify(response.name))
            localStorage.setItem('loginEmail',JSON.stringify(response.email))
            localStorage.setItem('loginCompany',JSON.stringify(response.company_id))
            localStorage.setItem('loginDepartment',JSON.stringify(response.department_id))
            //console.log(response)
            return response
        } else {
            const response = await res.json()
            throw new Error(`${response.message}`)
        }
    })
    .catch (Error =>{
        console.log(Error)
    })
    //console.log(employeeDetails)
    return employeeDetails
}

//7. Listar todos os usuários cadastrados

export async function cadastroUsersRequest() {
    const cadastroUsers = await fetch ( `${baseUrl}employees/readAll`, {
        method:"GET",
        headers:requestHeaders
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            localStorage.setItem('cadastroUsersResponse',JSON.stringify(response))
            //console.log(response)
            return response
        } else {
            const response = await res.json()
            localStorage.removeItem('cadastroUsersResponse')
            throw new Error(`${response.message}`)
        }
    })
    .catch (Error =>{
        console.log(Error)
    })
    //console.log(cadastroUsers)
    return cadastroUsers
}

cadastroUsersRequest()

//8. Listar os departamentos por empresa

export async function departmentsForCompanyRequest(company_id) {
    const departmentsForCompany = await fetch ( `${baseUrl}companies/readById/${company_id}`, {
        method:"GET",
        headers:requestHeaders
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            localStorage.setItem('department',JSON.stringify(response))
            //console.log(response)
            return response
        } else {
            const response = await res.json()
            localStorage.removeItem('department')
            throw new Error(`${response.message}`)
        }
    })
    .catch (Error =>{
        console.log(Error)
    })
    //console.log(departmentsForCompany)
    return departmentsForCompany
}
//9. Listar todos os departamentos cadastrados

export async function allDepartments() {
    const allDepartmentsList = await fetch (`${baseUrl}departments/readAll`, {
        method:"GET",
        headers:requestHeaders
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            localStorage.setItem('allDepartments',JSON.stringify(response))
            //console.log(response)
            return response
        } else {
            const response = await res.json()
            localStorage.removeItem('allDepartments')
            throw new Error(`${response.message}`)
        }
    })
    .catch (Error =>{
        console.log(Error)
    })
    //console.log(allDepartmentsList )
    return allDepartmentsList 
}

//10. Criar departamento

export async function NewDepartmentRequest(NewDepartmentBody) {
    const newDepartment = await fetch ( `${baseUrl}departments/create`, {
        method:"POST",
        headers:requestHeaders,
        body:JSON.stringify(NewDepartmentBody)
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            localStorage.setItem('newDepartment',JSON.stringify(response))
            //console.log(response)
            return response
        } else {
            const response = await res.json()
            localStorage.removeItem('newDepartment')
            throw new Error(`${response.message}`)
        }
    })
    .catch (Error =>{
        console.log(Error)
    })
    //console.log(cadastroUsers)
    return newDepartment
}

// 11. deletar usuário

export async function userRemove(userRemove_id) {
    console.log(userRemove_id)
    const userDelete = await fetch (`${baseUrl}employees/deleteEmployee/${userRemove_id}`, {
        method:"DELETE",
        headers:requestHeaders,
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            alert("Usuário demitido com sucesso")
            console.log(response)
            return response
        } else {
            const response = await res.json()
            alert(`${response.message}`)
        }
    })

console.log(userDelete)
    return userDelete
}

// 12. deletar departamento

export async function departmentRemove(departmentRemove_UUID) {

    const userDelete = await fetch (`${baseUrl}departments/delete/${departmentRemove_UUID}`, {
        method:"DELETE",
        headers:requestHeaders,
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            alert("Departamento excluido com sucesso")
            console.log(response)
            return response
        } else {
            const response = await res.json()
            alert(`${response.message}`)
        }
    })

console.log(userDelete)
    return userDelete
}

// 13. editar usuário

export async function UserEdit(employee_UUID,editBody) {

    const newInformUser = await fetch (`${baseUrl}employees/updateEmployee/${employee_UUID}`, {
        method:"PATCH",
        headers:requestHeaders,
        body:JSON.stringify(editBody)
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
           // console.log(response)
            return response
        } else {
            const response = await res.json()
            alert(`${response.message}`)
        }
    })

//console.log(newInformUser)
    return newInformUser
}

// 14.editar departamento

export async function departamentoEdit(departamento_UUID,editBody) {

    const newInformDepart = await fetch (`${baseUrl}departments/update/${departamento_UUID}`, {
        method:"PATCH",
        headers:requestHeaders,
        body:JSON.stringify(editBody)
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            console.log(response)
            alert(`Edição da descrição do departamento realizada com sucesso`)
            return response
        } else {
            const response = await res.json()
            alert(`${response.message}`)
        }
    })

console.log(newInformDepart)
    return newInformDepart
}

//15. Listar funcionários ainda não contratados

export async function funcionariosParaContratar() {
    const funcionarios = await fetch (`${baseUrl}employees/outOfWork`, {
        method:"GET",
        headers:requestHeaders
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            localStorage.setItem('newfuncionarios',JSON.stringify(response))
            //console.log(response)
            return response
        } else {
            const response = await res.json()
            localStorage.removeItem('newfuncionarios')
            throw new Error(`${response.message}`)
        }
    })
    .catch (Error =>{
        console.log(Error)
    })
    //console.log(allDepartmentsList )
    return funcionarios 
}

// 16. Contratar funcionário

export async function contratarFuncionario(newFuncionario_UUID,departamento_id) {

    const contratarFuncionario = await fetch (`${baseUrl}employees/hireEmployee/${newFuncionario_UUID}`, {
        method:"PATCH",
        headers:requestHeaders,
        body:JSON.stringify(departamento_id)
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            alert("Funcionário contratado com sucesso")
            console.log(response)
            return response
        } else {
            const response = await res.json()
            alert(`${response.message}`)
        }
    })

console.log(contratarFuncionario)
    return contratarFuncionario
}
// 17. Demitir funcionario de um departamento
export async function demitirFuncionario(newFuncionario_UUID,departamento_id) {

    const demitirFuncionario = await fetch (`${baseUrl}employees/dismissEmployee/${newFuncionario_UUID}`, {
        method:"PATCH",
        headers:requestHeaders,
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            alert("Funcionário demitido com sucesso")
            console.log(response)
            return response
        } else {
            const response = await res.json()
            alert(`${response.message}`)
        }
    })

console.log(demitirFuncionario)
    return demitirFuncionario
}

// 18. Listar departamento pelo ID
export async function dadosDepartamento(departamento_id) {

    const departamento = await fetch (`${baseUrl}departments/readById/${departamento_id}`, {
        method:"PATCH",
        headers:requestHeaders,
    })
    .then( async(res)=>{
        if(res.ok) {
            const response = await res.json()
            console.log(response)
            return response
        } else {
            const response = await res.json()
            alert(`${response.message}`)
        }
    })

console.log(departamento)
    return departamento
}