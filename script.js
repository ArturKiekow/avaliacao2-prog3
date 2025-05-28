
let arquivo = fetch("locadora.json").then((res) => {
    return res.json();
}).then((info)=>{
    populaTabelaClientes(info.clientes);
    populaTabelaCarros(info.carros);
    populaTabelaLocacoes(info.locacoes)
});


function populaTabelaClientes(clientes){
    const tabelaClientes = document.querySelector("#tabelaCLientes");

     clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.setAttribute("id", cliente.id)
        
        for (const atributo in cliente){
            const td = document.createElement("td");
            td.setAttribute("class", atributo);
            td.appendChild(document.createTextNode(cliente[atributo]))
            tr.appendChild(td);      
        }

        const botaoAtualizar = document.createElement("button");
        botaoAtualizar.appendChild(document.createTextNode("Atualizar"));
        botaoAtualizar.setAttribute("class", "botaoAtualizar");
        tr.appendChild(botaoAtualizar);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.appendChild(document.createTextNode("Excluir"));
        botaoExcluir.setAttribute("class", "botaoExcluir");
        tr.appendChild(botaoExcluir);
        tabelaClientes.appendChild(tr);
    }); 

}
function populaTabelaCarros(carros){
    //console.log("CARROS");
    //console.log(carros);
}
function populaTabelaLocacoes(locacoes){
    //console.log("Locacoes");
    //console.log(locacoes);
}

var botoesAdicionar = document.querySelectorAll(".botaoAdicionar");

botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
        const modalId = botao.getAttribute("modal");
        const modal = document.getElementById(modalId);
        modal.showModal();
    })
});



document.querySelector("#adicionar-clientes").showModal();
