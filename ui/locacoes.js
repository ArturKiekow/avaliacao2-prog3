import * as locacaoService from "../services/locacaoService.js"

const dadosTabelaLocacoes = document.querySelector("#dadosLocacoes");
populaTabelaLocacoes();

async function populaTabelaLocacoes(){
    try{
        limpaTabelaLocacoes();
        const listaLocacoes = await locacaoService.getLocacoes();
        listaLocacoes.forEach(locacao => {
            adicionaLocacaoNaTabela(locacao);
        });
    } catch (erro) {
        alert(erro);
    }
}

function limpaTabelaLocacoes() {
    while (dadosTabelaLocacoes.firstChild){
        dadosTabelaLocacoes.removeChild(dadosTabelaLocacoes.firstChild);
    }
}

function adicionaLocacaoNaTabela(locacao) {
    const linha = criaLinha(locacao);
    console.log(locacao);
    
    dadosTabelaLocacoes.innerHTML += linha;
}

function criaLinha(locacao) {
    return `
    <tr data-id="${locacao.id}">
        <td class="id">${locacao.id}</td>
        <td class="cliente">${locacao.cliente.id}</td>
        <td class="carro">${locacao.carro.id}</td>
        <td class="data_inicio">${locacao.data_inicio}</td>
        <td class="data_fim">${locacao.data_fim}</td>
        <td class="valor_total">${locacao.valor_total}</td>
        <td class="botoesOpcoes">
            <button class="botaoAtualizar" modal="atualizar-locacao">Atualizar</button>
            <button class="botaoExcluir">Excluir</button>
        </td>
    </tr>
    `
}

dadosTabelaLocacoes.addEventListener("click", async (event) =>{
    const elemento = event.target;
    const locacaoId = elemento.closest("tr").dataset.id;

    if (elemento.classList.contains("botaoAtualizar")){
        const locacao = await getLocacao(locacaoId);
        preencheModalAtualizarLocacao(locacao);
        const modal = document.getElementById(elemento.getAttribute("modal"));
        modal.showModal();
    }

    if (elemento.classList.contains("botaoExcluir")){
        if(confirm(`Tem certeza que deseja excluir a locação com id:${locacaoId}`)){
            await excluirLocacao(locacaoId);
            populaTabelaLocacoes();
        }
    }
});

function preencheModalAtualizarLocacao(locacao) {
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

async function getLocacao(id) {
    try {
        const locacao = await locacaoService.getLocacaoById(id);
        return locacao;
    }catch(erro) {
        alert(erro)
    }
}

async function excluirLocacao(id) {
    try {
        const response = await locacaoService.deleteLocacao(id);
        alert(response);
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
