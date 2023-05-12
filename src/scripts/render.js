import {categoriesRequest} from "./request.js"
import {companiesRequest} from "./request.js"
import {categoriesRequestFilter} from "./request.js"

export async function categoriesRender() {

    const categorias = await categoriesRequest()
    const select = document.querySelector("#categories_filter")

    categorias.forEach(categoria => {
        const option = document.createElement("option")
        option.value = categoria.id
        option.innerText = categoria.name
        //console.log(option)
        select.append(option)
    });
}


export async function companiesRender() {
    const divSection= document.querySelector("#listEmpresas_constainer")
    divSection.innerHTML = ''
    const categorias = await categoriesRequest()
    const companiesInforms = await companiesRequest()
    //console.log(companiesInforms)
    const ul = document.createElement("ul")
    ul.classList.add("ul_empresas") 

    companiesInforms.forEach(companie => {
        
        const name = document.createElement("h2")
        name.innerText = companie.name
        name.id = companie.category_id

        const categoria = document.createElement("button")
        const setor =  categorias.find(element =>element.id==name.id)
        categoria.innerHTML = setor.name

        const li = document.createElement("li")
        li.classList.add("li_empresas") 
        li.append(name,categoria)
        ul.appendChild(li)
    });

    divSection.append(ul)
    //console.log(divSection)
    return divSection
}

export async function categoriesRenderFilter() {

    const select = document.querySelector("#categories_filter")
    //console.log(select)

    const ul = document.createElement("ul")
    ul.classList.add("ul_empresas") 

    const divSection= document.querySelector("#listEmpresas_constainer")
    divSection.innerHTML = ''

    companiesRender() 

        select.addEventListener("change", async function() {
            ul.innerHTML=""
            const value = select.value
            //console.log(value)

            if (value == "Selecionar Setor" ) {
                await companiesRender()
            } else {
                divSection.innerHTML = ''
                const categorias = await categoriesRequest()
                //console.log(categorias)

                const empresaPorCategoria =  categorias.find(element =>element.id==value)
                //console.log(empresaPorCategoria)

                const nameCategoria = empresaPorCategoria.name
               // console.log(nameCategoria)

                const setorFilter = await categoriesRequestFilter(nameCategoria)
                //console.log (await categoriesRequestFilter(nameCategoria))

                
                setorFilter.forEach(companie => {
        
                    const name = document.createElement("h2")
                    name.innerText = companie.name
                    name.id = value

                    const categoria = document.createElement("button")
                    categoria.innerHTML = nameCategoria

                    const li = document.createElement("li")
                    li.classList.add("li_empresas") 
                    li.append(name,categoria)
                    ul.appendChild(li)
                });
            }
            divSection.append(ul)
            console.log(divSection)
            return divSection
        })
            
}
    


