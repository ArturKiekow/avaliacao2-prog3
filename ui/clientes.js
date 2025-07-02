import * as clienteService from "../services/clienteService.js"

function salvaClientesNoLocalStorage(clientes){
    window.localStorage.removeItem("clientes")
    window.localStorage.setItem("clientes", JSON.stringify(clientes));
}

function recuperaClientes(){
    return JSON.parse(window.localStorage.getItem("clientes"));
}

function populaTabelaClientes(){
    limpaTabelaClientes();
    const clientes = recuperaClientes();
    
    clientes.forEach(cliente => {
        adicionaClienteNaTabela(cliente);
    }); 
}

function limpaTabelaClientes(){
    const dadosClientes = document.querySelector("#dadosClientes");

    while (dadosClientes.firstChild) {
        dadosClientes.removeChild(dadosClientes.firstChild);    
    }
}

function adicionaClienteNaTabela(cliente){
    const dadosClientes = document.querySelector("#dadosClientes");
    const tr = document.createElement('tr');
    tr.dataset.id = cliente.id;

    for (const atributo in cliente){
        const td = document.createElement("td");
        td.classList.add(atributo);
        td.appendChild(document.createTextNode(cliente[atributo]))
        tr.appendChild(td);      
    }
    const td = document.createElement("td");
    td.classList.add("botoesOpcoes");

    const botaoAtualizar = document.createElement("button");
    botaoAtualizar.appendChild(document.createTextNode("Atualizar"));
    botaoAtualizar.classList.add("botaoAtualizar");

    botaoAtualizar.addEventListener("click", () =>{
        const modal = document.querySelector("#atualizar-cliente");   
        modal.showModal();
        const attId = document.querySelector("#atualizarClienteId");
        attId.value = cliente.id;
        const attNome = document.querySelector("#atualizarClienteNome");
        attNome.value = cliente.nome;
        const attCpf = document.querySelector("#atualizarClienteCpf");
        attCpf.value = cliente.cpf;
        const attTelefone = document.querySelector("#atualizarClienteTelefone");
        attTelefone.value = cliente.telefone;
        const attEmail = document.querySelector("#atualizarClienteEmail");
        attEmail.value = cliente.email;
    });    
    td.appendChild(botaoAtualizar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.appendChild(document.createTextNode("Excluir"));
    botaoExcluir.classList.add("botaoExcluir");
    botaoExcluir.addEventListener("click", () => {
        excluirCliente(cliente);
    });
    td.appendChild(botaoExcluir);

    tr.appendChild(td)
    dadosClientes.appendChild(tr);
}

const botaoAtualizarCliente = document.querySelector("#botaoAtualizarCliente");
botaoAtualizarCliente.addEventListener("click", () => {
    atualizarCliente();
    let modal = document.getElementById(botaoAtualizarCliente.getAttribute("modal"));
    modal.close();
});

function atualizarCliente() {
    let listaClientes = recuperaClientes();

    const attId = parseInt(document.querySelector("#atualizarClienteId").value, 10);
    const attNome = document.querySelector("#atualizarClienteNome").value;
    const attCpf = document.querySelector("#atualizarClienteCpf").value;
    const attTelefone = document.querySelector("#atualizarClienteTelefone").value;
    const attEmail = document.querySelector("#atualizarClienteEmail").value;

    let clienteAtualizado = {
        id: attId,
        nome: attNome,
        cpf: attCpf,
        telefone: attTelefone,
        email: attEmail,
    }

    const index = listaClientes.findIndex(cliente => cliente.id === attId);
    listaClientes.splice(index, 1, clienteAtualizado);

    salvaClientesNoLocalStorage(listaClientes);
    populaTabelaClientes();
}


function excluirCliente(cliente){
    let clientes = recuperaClientes();

    clientes.splice(clientes.findIndex(x => x.id === cliente.id), 1);

    salvaClientesNoLocalStorage(clientes);
    populaTabelaClientes();
}

const botaoAdicionarCliente = document.querySelector("#botaoAdicionarCliente");

botaoAdicionarCliente.addEventListener("click", () => {
    adicionarCliente();
    const modal = document.getElementById(botaoAdicionarCliente.getAttribute("modal"));
    modal.close();
});

function adicionarCliente(){
    const nome = document.querySelector("#adicionarClienteNome").value;
    const cpf = document.querySelector("#adicionarClienteCpf").value;
    const telefone = document.querySelector("#adicionarClienteTelefone").value;
    const email = document.querySelector("#adicionarClienteEmail").value;

    let clientes = recuperaClientes();

    const cliente = {
        id: clienteid,
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        email: email,
    }

    clientes.push(cliente);

    salvaClientesNoLocalStorage(clientes)

    populaTabelaClientes();
    clienteid++;
}
