let id = 11;

fetch("locadora.json").then((res) => {
    return res.json();
}).then((info)=>{

    //populaTabelaCarros(info.carros);
    //populaTabelaLocacoes(info.locacoes);

    salvaClientesLocalStorage(info.clientes);
    populaTabelaClientes(info.clientes);
});

function salvaClientesLocalStorage(clientes){
    window.localStorage.removeItem("clientes")
    window.localStorage.setItem("clientes", JSON.stringify(clientes));
}

function recuperaClientes(){
    return JSON.parse(window.localStorage.getItem("clientes"));
}

function populaTabelaClientes(){
    limpaTabelaClientes();
    let clientes = JSON.parse(window.localStorage.getItem("clientes"));
    
    clientes.forEach(cliente => {
        adicionaClienteNaTabela(cliente);
    }); 
}

function limpaTabelaClientes(){
    const tabelaClientes = document.querySelector("#tabelaCLientes");

    while (tabelaClientes.firstChild) {
        tabelaClientes.removeChild(tabelaClientes.firstChild);    
    }
}

function adicionaClienteNaTabela(cliente){
    const tabelaClientes = document.querySelector("#tabelaCLientes");
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
    //botaoAtualizar.addEventListener("click", atualizarcliente);    
    tr.appendChild(botaoAtualizar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.appendChild(document.createTextNode("Excluir"));
    botaoExcluir.classList.add("botaoExcluir");
    //botaoExcluir.addEventListener("click", excluirCliente)
    tr.appendChild(botaoExcluir);

    tabelaClientes.appendChild(tr);
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

    let clientes = recuperaClientes();

    const cliente = {
        id: id,
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        email: email,
    }

    clientes.push(cliente);

    salvaClientesLocalStorage(clientes)
    console.log(clientes);

    populaTabelaClientes();
    id++;
}


