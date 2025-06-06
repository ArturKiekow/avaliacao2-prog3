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

//CLIENTES
let clienteid = 11;
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


// CARROS

let carroId = 111;
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

    const td = document.createElement("td");
    td.classList.add("botoesOpcoes");

    const botaoAtualizar = document.createElement("button");
    botaoAtualizar.appendChild(document.createTextNode("Atualizar"));
    botaoAtualizar.classList.add("botaoAtualizar");
    botaoAtualizar.setAttribute("modal", "atualizar-carro");

    botaoAtualizar.addEventListener("click", () =>{
        const modal = document.getElementById(botaoAtualizar.getAttribute("modal"));
        modal.showModal();

        const attCarroId = document.querySelector("#atualizarCarroId");
        attCarroId.value = carro.id;
        const attCarroMarca = document.querySelector("#atualizarCarroMarca");
        attCarroMarca.value = carro.marca;
        const attCarroModelo = document.querySelector("#atualizarCarroModelo");
        attCarroModelo.value = carro.modelo;
        const attCarroAno = document.querySelector("#atualizarCarroAno");
        attCarroAno.value = carro.ano;
        const attCarroPlaca = document.querySelector("#atualizarCarroPlaca");
        attCarroPlaca.value = carro.placa;
        if (carro.disponivel){
            document.querySelector("#atualizarCarroDisponivel").checked = true;
        } else {
            document.querySelector("#atualizarCarroIndisponivel").checked = true;
        } 
    });    
    td.appendChild(botaoAtualizar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.appendChild(document.createTextNode("Excluir"));
    botaoExcluir.classList.add("botaoExcluir");
    botaoExcluir.addEventListener("click", () => {
        excluirCarro(carro);
    });
    td.appendChild(botaoExcluir);
    tr.appendChild(td);
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
    
    const attCarroId = parseInt(document.querySelector("#atualizarCarroId").value);
    const attCarroMarca = document.querySelector("#atualizarCarroMarca").value;
    const attCarroModelo = document.querySelector("#atualizarCarroModelo").value;
    const attCarroAno = parseInt(document.querySelector("#atualizarCarroAno").value);
    const attCarroPlaca = document.querySelector("#atualizarCarroPlaca").value;
    const attCarroDisponivel = document.querySelector('input[name="atualizarDisponibilidade"]:checked').value;

    const carroAtualizado = {
        id: attCarroId,
        marca: attCarroMarca,
        modelo: attCarroModelo,
        ano: attCarroAno,
        placa: attCarroPlaca,
        disponivel: attCarroDisponivel === "true",
    }

    const index = listaCarros.findIndex(carro => carro.id === attCarroId);
    
    listaCarros.splice(index, 1, carroAtualizado);
    
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

    carroId++;
}


function excluirCarro(carroExcluir) {
    let listaCarros = recuperaCarros();

    listaCarros.splice(listaCarros.findIndex(carro => carro.id === carroExcluir.id), 1);

    salvaCarrosNoLocalStorage(listaCarros);
    populaTabelaCarros();
}



//LOCACOES

let locacaoId = 1016;

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
        td.classList.add(atributo);
        td.appendChild(document.createTextNode(locacao[atributo]));
        tr.appendChild(td);  
    }

    const td = document.createElement("td");
    td.classList.add("botoesOpcoes");
    const botaoAtualizar = document.createElement("button");
    botaoAtualizar.appendChild(document.createTextNode("Atualizar"));
    botaoAtualizar.classList.add("botaoAtualizar");
    botaoAtualizar.setAttribute("modal", "atualizar-locacao");

    botaoAtualizar.addEventListener("click", () =>{
        const modal = document.getElementById(botaoAtualizar.getAttribute("modal"));
        modal.showModal();

        preencheIdsCliente("atualizarLocacaoIdCliente");
        preencheIdsCarro("atualizarLocacaoIdCarro");
        
        const idLocacao = document.querySelector("#atualizarLocacaoId");
        idLocacao.value = locacao.id;
        const idCliente = document.querySelector("#atualizarLocacaoIdCliente");
        idCliente.value = locacao.cliente_id;
        const idCarro = document.querySelector("#atualizarLocacaoIdCarro");
        idCarro.value = locacao.carro_id;
        const dataInicio = document.querySelector("#atualizarLocacaoDataInicio");
        dataInicio.value = inverteData(locacao.data_inicio);
        const dataFim = document.querySelector("#atualizarLocacaoDataFim");
        dataFim.value = inverteData(locacao.data_fim);
        const valorTotal = document.querySelector("#atualizarLocacaoValorTotal");
        valorTotal.value = locacao.valor_total;
    });    
    td.appendChild(botaoAtualizar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.appendChild(document.createTextNode("Excluir"));
    botaoExcluir.classList.add("botaoExcluir");
    botaoExcluir.addEventListener("click", () => {
        excluirLocacao(locacao);
    });
    td.appendChild(botaoExcluir);
    tr.appendChild(td);
    dadosLocacoes.appendChild(tr);
}

const botaoAtualizarLocacao = document.querySelector("#botaoAtualizarLocacao");
botaoAtualizarLocacao.addEventListener("click", ()  => {

    atualizarLocacao();
    const modal = document.getElementById(botaoAtualizarLocacao.getAttribute("modal"));
    modal.close();

});

function atualizarLocacao() {
    const idLocacao = parseInt(document.querySelector("#atualizarLocacaoId").value);
    const idCliente = parseInt(document.querySelector("#atualizarLocacaoIdCliente").value);
    const idCarro = parseInt(document.querySelector("#atualizarLocacaoIdCarro").value);
    const dataInicio = inverteData(document.querySelector("#atualizarLocacaoDataInicio").value);
    const dataFim = inverteData(document.querySelector("#atualizarLocacaoDataFim").value);
    const valorTotal = parseFloat(document.querySelector("#atualizarLocacaoValorTotal").value);

    const locacaoAtualizada = {
        id: idLocacao,
        cliente_id: idCliente,
        carro_id: idCarro,
        data_inicio: dataInicio,
        data_fim: dataFim,
        valor_total: valorTotal,
    }

    let listaLocacoes = recuperaLocacoes();

    const index = listaLocacoes.findIndex(locacao => locacao.id === idLocacao);

    listaLocacoes.splice(index, 1, locacaoAtualizada);

    salvaLocacoesNoLocalStorage(listaLocacoes);

    populaTabelaLocacoes();
}

function inverteData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}-${mes}-${ano}`; 
}

const botaoAdicionarLocacao = document.querySelector("#botaoAdicionarLocacao");
botaoAdicionarLocacao.addEventListener("click", () => {
    adicionarLocacao();
    const modal = document.getElementById(botaoAdicionarLocacao.getAttribute("modal"));
    modal.close();
});

function adicionarLocacao() {
    const idCliente = parseInt(document.querySelector("#adicionarLocacaoIdCliente").value);
    const idCarro = parseInt(document.querySelector("#adicionarLocacaoIdCarro").value);
    const dataInicio = inverteData(document.querySelector("#adicionarLocacaoDataInicio").value);
    const dataFim = inverteData(document.querySelector("#adicionarLocacaoDataFim").value);
    const valorTotal = parseFloat(document.querySelector("#adicionarLocacaoValorTotal").value);

    const locacao = {
        id: locacaoId,
        cliente_id: idCliente,
        carro_id: idCarro,
        data_inicio: dataInicio,
        data_fim: dataFim,
        valor_total: valorTotal,
    }

    let listaLocacoes = recuperaLocacoes();

    listaLocacoes.push(locacao);

    salvaLocacoesNoLocalStorage(listaLocacoes);

    populaTabelaLocacoes();

    locacaoId++;
}


function excluirLocacao(locacaoExcluir) {

    let listaLocacoes = recuperaLocacoes();

    listaLocacoes.splice(listaLocacoes.findIndex(locacao => locacao.id === locacaoExcluir.id), 1);

    salvaLocacoesNoLocalStorage(listaLocacoes);
    populaTabelaLocacoes();
}

function preencheIdsCliente(idSelect) {
    const selectIdCliente = document.querySelector(`#${idSelect}`);
    limpaIdsClientesModalAdicionarLocacao(idSelect);
    const listaClientes = recuperaClientes();

    let listaIdClientes = [];
    listaClientes.forEach(cliente => {
        listaIdClientes.push(cliente.id);
    });

    listaIdClientes.forEach(id => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = id;
        selectIdCliente.appendChild(option);
    });
    
}

function preencheIdsCarro(idSelect) {
    const selectIdCarro = document.querySelector(`#${idSelect}`);
    limpaIdsCarrosModalAdicionarLocacao(idSelect);
    const listaCarros = recuperaCarros();

    let listaIdCarro = [];
    listaCarros.forEach(carro => {
        listaIdCarro.push(carro.id);
    });

    listaIdCarro.forEach(id => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = id;
        selectIdCarro.appendChild(option);
    });
    
}

function limpaIdsClientesModalAdicionarLocacao(idSelect) {
    const selectIdCliente = document.querySelector(`#${idSelect}`);

    while (selectIdCliente.firstChild){
        selectIdCliente.removeChild(selectIdCliente.firstChild);
    }
}

function limpaIdsCarrosModalAdicionarLocacao(idSelect) {
    const selectIdCarro = document.querySelector(`#${idSelect}`);

    while (selectIdCarro.firstChild){
        selectIdCarro.removeChild(selectIdCarro.firstChild);
    }
}
var botoesAdicionar = document.querySelectorAll(".botaoAdicionar");

botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
        const modalId = botao.getAttribute("modal");
        const modal = document.getElementById(modalId);

        if (modalId === "adicionar-locacao"){
            preencheIdsCliente("adicionarLocacaoIdCliente");
            preencheIdsCarro("adicionarLocacaoIdCarro");
        }
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


//MODAIS

var botoesAdicionar = document.querySelectorAll(".botaoAdicionar");

botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
        const modalId = botao.getAttribute("modal");
        const modal = document.getElementById(modalId);

        if (modalId === "adicionar-locacao"){
            preencheIdsCliente("adicionarLocacaoIdCliente");
            preencheIdsCarro("adicionarLocacaoIdCarro");
        }
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


