const tabelaClientes = document.querySelector("#tabelaCLientes");
let id = 1;

fetch("locadora.json").then((res) => {
    return res.json();
}).then((info)=>{
    populaTabelaClientes(info.clientes);
    populaTabelaCarros(info.carros);
    populaTabelaLocacoes(info.locacoes);

    const botoesExcluir = document.querySelectorAll(".botaoExcluir");

    botoesExcluir.forEach(botao => {
        botao.addEventListener("click", () => {
            const idCliente = botao.closest("tr").dataset.id;
            console.log(idCliente);
            
            
        })
        
    })

});

function adicionaClienteNaTabela(cliente){
    const tr = document.createElement('tr');
    tr.dataset.id = cliente.id;

    for (const atributo in cliente){
        const td = document.createElement("td");
        td.setAttribute("class", atributo);
        td.appendChild(document.createTextNode(cliente[atributo]))
        tr.appendChild(td);      
    }
    
    const botaoAtualizar = document.createElement("button");
    botaoAtualizar.appendChild(document.createTextNode("Atualizar"));
    botaoAtualizar.classList.add("botaoAtualizar");    
    tr.appendChild(botaoAtualizar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.appendChild(document.createTextNode("Excluir"));
    botaoExcluir.classList.add("botaoExcluir");
    tr.appendChild(botaoExcluir);

    tabelaClientes.appendChild(tr);
    id++;
}


function populaTabelaClientes(clientes){

    clientes.forEach(cliente => {
        adicionaClienteNaTabela(cliente);
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

var botoesFechar = document.querySelectorAll(".botaoFechar");

botoesFechar.forEach(botao => {
    botao.addEventListener("click", () => {
        const modalId = botao.getAttribute("modal");
        const modal = document.getElementById(modalId);
        modal.close();
    })
});


const botaoAdicionarCliente = document.querySelector("#botaoAdicionarCliente");

botaoAdicionarCliente.addEventListener("click", adicionarCliente);


function adicionarCliente(){
    const nome = document.querySelector("#nome").value;
    const cpf = document.querySelector("#cpf").value;
    const telefone = document.querySelector("#telefone").value;
    const email = document.querySelector("#email").value;

    console.log(nome, cpf, telefone, email);
    
    const cliente = {
        id: id,
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        email: email,
    }

    adicionaClienteNaTabela(cliente);
}


