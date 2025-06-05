let clienteid = 11;
let carroId = 111;

fetch("locadora.json").then((res) => {
    return res.json();
}).then((info)=>{
    salvaClientesNoLocalStorage(info.clientes);
    populaTabelaClientes();

    salvaCarrosNoLocalStorage(info.carros);
    populaTabelaCarros();

    salvaLocacoesNoLocalStorage(info.locacoes);
    populaTabelaLocacoes();
});

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

const botaoAtualizarCliente = document.querySelector("#botaoAtualizarCliente");
botaoAtualizarCliente.addEventListener("click", () => {
    atualizarCliente();
    let modal = document.getElementById(botaoAtualizarCliente.getAttribute("modal"));
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
    const nome = document.querySelector("#addNome").value;
    const cpf = document.querySelector("#addCpf").value;
    const telefone = document.querySelector("#addTelefone").value;
    const email = document.querySelector("#addEmail").value;

    console.log(nome, cpf, telefone, email);

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
    console.log(clientes);

    populaTabelaClientes();
    clienteid++;
}


// CARROS

function recuperaCarros() {
    return JSON.parse(window.localStorage.getItem("carros"));
}

function salvaCarrosNoLocalStorage(carros) {
    window.localStorage.removeItem("carros");
    window.localStorage.setItem("carros", JSON.stringify(carros));
}

function populaTabelaCarros(){
    limpaTabelaCarros();
    const carros = recuperaCarros();
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
    tr.dataset.id = carro.id;

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
        const modal = document.getElementById(botaoAtualizar.getAttribute("modal"));
        modal.showModal();

        const attCarroId = document.querySelector("#attCarroId");
        attCarroId.value = carro.id;
        const attCarroMarca = document.querySelector("#attCarroMarca");
        attCarroMarca.value = carro.marca;
        const attCarroModelo = document.querySelector("#attCarroModelo");
        attCarroModelo.value = carro.modelo;
        const attCarroAno = document.querySelector("#attCarroAno");
        attCarroAno.value = carro.ano;
        const attCarroPlaca = document.querySelector("#attCarroPlaca");
        attCarroPlaca.value = carro.placa;
        if (carro.disponivel){
            document.querySelector("#attCarroDisponivel").checked = true;
        } else {
            document.querySelector("#attCarroIndisponivel").checked = true;
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

const botaoAtualizarCarro = document.querySelector("#botaoAtualizarCarro");
botaoAtualizarCarro.addEventListener("click", () => {
    atualizarCarro();
    const modal = document.getElementById(botaoAtualizarCarro.getAttribute("modal"));
    modal.close();
})

function atualizarCarro() {

    let listaCarros = recuperaCarros();
    console.log(listaCarros);
    
    const attCarroId = parseInt(document.querySelector("#attCarroId").value);
    const attCarroMarca = document.querySelector("#attCarroMarca").value;
    const attCarroModelo = document.querySelector("#attCarroModelo").value;
    const attCarroAno = parseInt(document.querySelector("#attCarroAno").value);
    const attCarroPlaca = document.querySelector("#attCarroPlaca").value;
    const attCarroDisponivel = document.querySelector('input[name="attDisponibilidade"]:checked').value;

    const carroAtualizado = {
        id: attCarroId,
        marca: attCarroMarca,
        modelo: attCarroModelo,
        ano: attCarroAno,
        placa: attCarroPlaca,
        disponivel: attCarroDisponivel === "true",
    }

    const index = listaCarros.findIndex(carro => carro.id === attCarroId);
    console.log(index);
    
    listaCarros.splice(index, 1, carroAtualizado);

    console.log(listaCarros);
    
    salvaCarrosNoLocalStorage(listaCarros);

    populaTabelaCarros();
}


const botaoAdicionarCarro = document.querySelector("#botaoAdicionarCarro");
botaoAdicionarCarro.addEventListener("click", () => {
    adicionarCarro();
    const modal = document.getElementById(botaoAdicionarCarro.getAttribute("modal"));
    modal.close();
})


function adicionarCarro(){

    const carroMarca = document.querySelector("#adicionarCarroMarca").value;
    const carroModelo = document.querySelector("#adicionarCarroModelo").value;
    const carroAno = parseInt(document.querySelector("#adicionarCarroAno").value);
    const carroPlaca = document.querySelector("#adicionarCarroPlaca").value;
    const carroDisponivel = document.querySelector('input[name="adicionarDisponibilidade"]:checked').value;

    const novoCarro = {
        id: carroId,
        marca: carroMarca,
        modelo: carroModelo,
        ano: carroAno,
        placa: carroPlaca,
        disponivel: carroDisponivel === "true",
    }

    let listaCarros = recuperaCarros();

    listaCarros.push(novoCarro);

    salvaCarrosNoLocalStorage(listaCarros);

    populaTabelaCarros();
}


function excluirCarro(carroExcluir) {
    let listaCarros = recuperaCarros();

    listaCarros.splice(listaCarros.findIndex(carro => carro.id === carroExcluir.id), 1);

    salvaCarrosNoLocalStorage(listaCarros);
    populaTabelaCarros();
}


function salvaLocacoesNoLocalStorage(locacoes) {
    window.localStorage.removeItem("locacoes");
    window.localStorage.setItem("locacoes", JSON.stringify(locacoes));
}

function recuperaLocacoes() {
    return JSON.parse(window.localStorage.getItem("locacoes"));
}

function limpaTabelaLocacoes() {
    const dadosLocacoes = document.querySelector("#dadosLocacoes");

    while (dadosLocacoes.firstChild){
        dadosLocacoes.removeChild(dadosLocacoes.firstChild);
    }
}

function populaTabelaLocacoes(){
    limpaTabelaLocacoes();
    const listaLocacoes = recuperaLocacoes();

    listaLocacoes.forEach(locacao => {
        adicionaLocacaoNaTabela(locacao);  
    });
}

function adicionaLocacaoNaTabela(locacao) {

    const dadosLocacoes = document.querySelector("#dadosLocacoes");

    const tr = document.createElement("tr");
    tr.dataset.id = locacao.id;

    for (const atributo in locacao){
        const td = document.createElement("td");
        td.classList.add(atributo)
        td.appendChild(document.createTextNode(locacao[atributo]))
        tr.appendChild(td);  
    }

    const botaoAtualizar = document.createElement("button");
    botaoAtualizar.appendChild(document.createTextNode("Atualizar"));
    botaoAtualizar.classList.add("botaoAtualizar");
    botaoAtualizar.setAttribute("modal", "atualizar-carro");

/*     botaoAtualizar.addEventListener("click", () =>{
        const modal = document.getElementById(botaoAtualizar.getAttribute("modal"));
        modal.showModal();

        const attCarroId = document.querySelector("#attlocacaoId");
        attCarroId.value = carro.id;
        const attCarroMarca = document.querySelector("#attCarroMarca");
        attCarroMarca.value = carro.marca;
        const attCarroModelo = document.querySelector("#attCarroModelo");
        attCarroModelo.value = carro.modelo;
        const attCarroAno = document.querySelector("#attCarroAno");
        attCarroAno.value = carro.ano;
        const attCarroPlaca = document.querySelector("#attCarroPlaca");
        attCarroPlaca.value = carro.placa;
        if (carro.disponivel){
            document.querySelector("#attCarroDisponivel").checked = true;
        } else {
            document.querySelector("#attCarroIndisponivel").checked = true;
        } 
    });     */
    tr.appendChild(botaoAtualizar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.appendChild(document.createTextNode("Excluir"));
    botaoExcluir.classList.add("botaoExcluir");
    botaoExcluir.addEventListener("click", () => {
        excluirLocacao(locacao);
    });
    tr.appendChild(botaoExcluir);

    dadosLocacoes.appendChild(tr);
}


function excluirLocacao(locacaoExcluir) {

    let listaLocacoes = recuperaLocacoes();

    listaLocacoes.splice(listaLocacoes.findIndex(locacao => locacao.id === locacaoExcluir.id), 1);

    salvaLocacoesNoLocalStorage(listaLocacoes);
    populaTabelaLocacoes();
}
























var botoesAdicionar = document.querySelectorAll(".botaoAdicionar");

botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
        const modal = document.getElementById(botao.getAttribute("modal"));
        modal.showModal();
    })
});

var botoesFechar = document.querySelectorAll(".botaoFechar");

botoesFechar.forEach(botao => {
    botao.addEventListener("click", () => {
        const modal = document.getElementById(botao.getAttribute("modal"));
        modal.close();
    })
});


