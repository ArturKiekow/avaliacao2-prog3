import * as locacaoService from "../services/locacaoService.js"

async function recuperaLocacoes() {
    try{
        const locacoes = await locacaoService.getLocacoes();
        console.log(locacoes);
    } catch (error) {
        alert(error.message);
    }
}

function limpaTabelaLocacoes() {
    const dadosLocacoes = document.querySelector("#dadosLocacoes");

    while (dadosLocacoes.firstChild){
        dadosLocacoes.removeChild(dadosLocacoes.firstChild);
    }
}

async function populaTabelaLocacoes(){



    try{
        limpaTabelaLocacoes();
        const listaLocacoes = await locacaoService.getLocacoes();

        listaLocacoes.forEach(locacao => {
            adicionaLocacaoNaTabela(locacao);
        });
    } catch (error) {
        alert(error.message);
    }
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

async function atualizarLocacao() {
    const idLocacao = parseInt(document.querySelector("#atualizarLocacaoId").value);
    const idCliente = parseInt(document.querySelector("#atualizarLocacaoIdCliente").value);
    const idCarro = parseInt(document.querySelector("#atualizarLocacaoIdCarro").value);
    const dataInicio = inverteData(document.querySelector("#atualizarLocacaoDataInicio").value);
    const dataFim = inverteData(document.querySelector("#atualizarLocacaoDataFim").value);
    const valorTotal = parseFloat(document.querySelector("#atualizarLocacaoValorTotal").value);

    const locacaoAtualizada = {
        cliente_id: idCliente,
        carro_id: idCarro,
        data_inicio: dataInicio,
        data_fim: dataFim,
        valor_total: valorTotal,
    }

    try {
        const response = await locacaoService.updateLocacao(idLocacao, locacaoAtualizada);
        alert(response);
        populaTabelaLocacoes();
    } catch (erro) {
        alert(erro);
    }

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

async function adicionarLocacao() {
    const idCliente = parseInt(document.querySelector("#adicionarLocacaoIdCliente").value);
    const idCarro = parseInt(document.querySelector("#adicionarLocacaoIdCarro").value);
    const dataInicio = inverteData(document.querySelector("#adicionarLocacaoDataInicio").value);
    const dataFim = inverteData(document.querySelector("#adicionarLocacaoDataFim").value);
    const valorTotal = parseFloat(document.querySelector("#adicionarLocacaoValorTotal").value);

    const locacao = {
        cliente_id: idCliente,
        carro_id: idCarro,
        data_inicio: dataInicio,
        data_fim: dataFim,
        valor_total: valorTotal,
    }

    try {
        const newLocacao = await locacaoService.createLocacao(locacao);
        alert(`Locação id:${newLocacao.id} criada com sucesso`)
        populaTabelaLocacoes();
    }catch (erro) {
        alert(erro);
    }

    
}


function excluirLocacao(id) {
    try {
        const response = locacaoService.deleteLocacao(id);
        populaTabelaLocacoes();
    }catch(erro) {
        alert(erro)
    }
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
})
