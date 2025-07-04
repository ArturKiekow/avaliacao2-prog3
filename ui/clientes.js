import * as clienteService from "../services/clienteService.js"

const dadosTabelaClientes = document.querySelector("#dadosClientes");
await populaTabelaClientes();

async function populaTabelaClientes(){
    limpaTabelaClientes();
    try {
        const clientes = await clienteService.getClientes();   
        clientes.forEach(cliente => {
            adicionaClienteNaTabela(cliente);
        }); 
    } catch(erro) {
        alert(erro);
    }

}

function limpaTabelaClientes(){
    while (dadosTabelaClientes.firstChild) {
        dadosTabelaClientes.removeChild(dadosTabelaClientes.firstChild);    
    }
}

function adicionaClienteNaTabela(cliente){
    const linha = criaLinha(cliente);
    dadosTabelaClientes.innerHTML += linha;
}

function criaLinha(cliente){
    return `
    <tr data-id="${cliente.id}">
        <td class="id">${cliente.id}</td>
        <td class="nome">${cliente.nome}</td>
        <td class="cpf">${cliente.cpf}</td>
        <td class="telefone">${cliente.telefone}</td>
        <td class="email">${cliente.email}</td>
        <td class="botoesOpcoes">
            <button class="botaoAtualizar" modal="atualizar-cliente">Atualizar</button>
            <button class="botaoExcluir">Excluir</button>
        </td>
    </tr>
    `
}

dadosTabelaClientes.addEventListener("click", async (event) => {
    const elemento = event.target;
    const clienteId = elemento.closest("tr").dataset.id;

    if (elemento.classList.contains("botaoAtualizar")){
        const cliente = await getCliente(clienteId);
        preencheModalAtualizarCliente(cliente);
        const modal = document.getElementById(elemento.getAttribute("modal"));   
        modal.showModal();
    }
    
    if (elemento.classList.contains("botaoExcluir")){
        if (confirm(`Tem certeza que deseja excluir o cliente com id:${clienteId}`)){
            await excluirCliente(clienteId);
            populaTabelaClientes();
        }
    }
});

function preencheModalAtualizarCliente(cliente) {
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
}

const botaoAtualizarCliente = document.querySelector("#botaoAtualizarCliente");
botaoAtualizarCliente.addEventListener("click", async () => {
    await atualizarCliente();
    populaTabelaClientes()
    const modal = document.getElementById(botaoAtualizarCliente.getAttribute("modal"));
    modal.close();
});

async function atualizarCliente() {
    try {
        const cliente = pegaDadosModalAtualizarCliente();
        const response = await clienteService.updateCliente(cliente.id, cliente);
        alert(response);
    } catch (erro) {
        alert(erro);
    } 
}

function pegaDadosModalAtualizarCliente() {
    const attId = parseInt(document.querySelector("#atualizarClienteId").value, 10);
    const attNome = document.querySelector("#atualizarClienteNome").value;
    const attCpf = document.querySelector("#atualizarClienteCpf").value;
    const attTelefone = document.querySelector("#atualizarClienteTelefone").value;
    const attEmail = document.querySelector("#atualizarClienteEmail").value;

    const clienteAtualizado = {
        id: attId,
        nome: attNome,
        cpf: attCpf,
        telefone: attTelefone,
        email: attEmail,
    }
    
    return clienteAtualizado;
}

const botaoAdicionarCliente = document.querySelector("#botaoAdicionarCliente");
botaoAdicionarCliente.addEventListener("click", () => {
    adicionarCliente();
    const modal = document.getElementById(botaoAdicionarCliente.getAttribute("modal"));
    modal.close();
});

async function adicionarCliente(){
    try {
        const cliente = pegaDadosModalAdicionarCliente();
        const newCliente = await clienteService.createCliente(cliente);
        populaTabelaClientes();
        alert(`Cliente id:${newCliente.id} adicionado com sucesso`);
    } catch(erro) {
        alert(erro);
    }
}

function pegaDadosModalAdicionarCliente() {
    const nome = document.querySelector("#adicionarClienteNome").value;
    const cpf = document.querySelector("#adicionarClienteCpf").value;
    const telefone = document.querySelector("#adicionarClienteTelefone").value;
    const email = document.querySelector("#adicionarClienteEmail").value;

    const cliente = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        email: email,
    }

    return cliente;
}

async function getCliente(id) {
    try {
        const cliente = clienteService.getClienteById(id);
        return cliente;
    } catch (erro) {
        alert(erro);
    }
}

async function excluirCliente(id){
    try {
        const response = await clienteService.deleteCliente(id);
        alert(response);
    } catch (erro) {
        alert(erro);
    }
}

const botaoAdicionar = document.querySelector(".botaoAdicionar");
botaoAdicionar.addEventListener("click", () => {
    const modalId = botaoAdicionar.getAttribute("modal");
    const modal = document.getElementById(modalId);
    modal.showModal();
});

const botoesFechar = document.querySelectorAll(".botaoFechar");
botoesFechar.forEach(botao => {
    botao.addEventListener("click", () => {
        const modal = document.getElementById(botao.getAttribute("modal"));
        modal.close();
    })
});