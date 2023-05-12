import { toast } from "./toast.js"

const token = JSON.parse(localStorage.getItem('loginToken')) || ""
const baseUrl="http://localhost:3333/"
const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
}

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