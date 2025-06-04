let id = 11;

fetch("locadora.json").then((res) => {
    return res.json();
}).then((info)=>{

    populaTabelaCarros(info.carros);
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
    let clientes = recuperaClientes();
    
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
    
    const botaoAtualizar = document.createElement("button");
    botaoAtualizar.appendChild(document.createTextNode("Atualizar"));
    botaoAtualizar.classList.add("botaoAtualizar");

    botaoAtualizar.addEventListener("click", () =>{
        const modal = document.querySelector("#atualizar-cliente");   
        modal.showModal();
        const attId = document.querySelector("#attId");
        attId.value = cliente.id;
        const attNome = document.querySelector("#attNome");
        attNome.value = cliente.nome;
        const attCpf = document.querySelector("#attCpf");
        attCpf.value = cliente.cpf;
        const attTelefone = document.querySelector("#attTelefone");
        attTelefone.value = cliente.telefone;
        const attEmail = document.querySelector("#attEmail");
        attEmail.value = cliente.email;
    });    
    tr.appendChild(botaoAtualizar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.appendChild(document.createTextNode("Excluir"));
    botaoExcluir.classList.add("botaoExcluir");
    botaoExcluir.addEventListener("click", () => {
        excluirCliente(cliente);
    });
    tr.appendChild(botaoExcluir);

    dadosClientes.appendChild(tr);
}

const botaoAtualizar = document.querySelector("#botaoAtualizarCliente");
botaoAtualizar.addEventListener("click", () => {
    atualizarCliente();
    let modalId = botaoAtualizar.getAttribute("modal");
    let modal = document.getElementById(modalId);
    modal.close();
});

function atualizarCliente() {
    let listaClientes = recuperaClientes();
    console.log(listaClientes);

    const attId = parseInt(document.querySelector("#attId").value, 10);
    const attNome = document.querySelector("#attNome").value;
    const attCpf = document.querySelector("#attCpf").value;
    const attTelefone = document.querySelector("#attTelefone").value;
    const attEmail = document.querySelector("#attEmail").value;

    let clienteAtualizado = {
        id: attId,
        nome: attNome,
        cpf: attCpf,
        telefone: attTelefone,
        email: attEmail,
    }

    const index = listaClientes.findIndex(cliente => cliente.id === attId);
    listaClientes.splice(index, 1, clienteAtualizado);

    salvaClientesLocalStorage(listaClientes);
    populaTabelaClientes();
}


function excluirCliente(cliente){
    let clientes = recuperaClientes();

    clientes.splice(clientes.findIndex(x => x.id === cliente.id), 1);

    salvaClientesLocalStorage(clientes);
    populaTabelaClientes();
}


// CARROS

function populaTabelaCarros(carros){
    console.log(carros);
    limpaTabelaCarros();

     
    
    carros.forEach(carro => {
        adicionaCarroNaTabela(carro)
    });    
}

function limpaTabelaCarros(){
    const dadosCarros = document.querySelector("#dadosCarros");

    while(dadosCarros.firstChild){
        dadosCarros.removeChild(dadosCarros.firstChild)
    }
}


function adicionaCarroNaTabela(carro) {

    const dadosCarros = document.querySelector("#dadosCarros");

    const tr = document.createElement("tr");

    for (const atributo in carro){
        const td = document.createElement("td");
        td.classList.add(atributo)
        td.appendChild(document.createTextNode(carro[atributo]))
        tr.appendChild(td);  
    }

    const botaoAtualizar = document.createElement("button");
    botaoAtualizar.appendChild(document.createTextNode("Atualizar"));
    botaoAtualizar.classList.add("botaoAtualizar");
    botaoAtualizar.setAttribute("modal", "atualizar-carro");

    botaoAtualizar.addEventListener("click", () =>{
        const modalId = botaoAtualizar.getAttribute("modal");
        const modal = document.getElementById(modalId);
        modal.showModal();

        const inputs = modal.querySelectorAll("input");
        let i = 0;
        for (const atributo in carro){
            inputs[i].value = carro[atributo];
            console.log(inputs[i], carro[atributo]);
            i++;
        }


    });    
    tr.appendChild(botaoAtualizar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.appendChild(document.createTextNode("Excluir"));
    botaoExcluir.classList.add("botaoExcluir");
    botaoExcluir.addEventListener("click", () => {
        excluirCarro(carro);
    });
    tr.appendChild(botaoExcluir);



    dadosCarros.appendChild(tr);
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

botaoAdicionarCliente.addEventListener("click", () => {
    adicionarCliente();
    const modalId = botaoAdicionarCliente.getAttribute("modal");
    const modal = document.getElementById(modalId);
    modal.close();
});

function adicionarCliente(){
    const nome = document.querySelector("#addNome").value;
    const cpf = document.querySelector("#addCpf").value;
    const telefone = document.querySelector("#addTelefone").value;
    const email = document.querySelector("#addEmail").value;

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
