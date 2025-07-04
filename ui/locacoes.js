import * as locacaoService from "../services/locacaoService.js"
import * as clienteService from "../services/clienteService.js"
import * as carroService from "../services/carroService.js"

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
    dadosTabelaLocacoes.innerHTML += linha;
}

function criaLinha(locacao) {
    return `
    <tr data-id="${locacao.id}">
        <td class="id">${locacao.id}</td>
        <td class="cliente">ID: ${locacao.cliente.id} - ${locacao.cliente.nome}</td>
        <td class="carro">ID: ${locacao.carro.id} - ${locacao.carro.modelo}</td>
        <td class="data_inicio">${locacao.data_inicio}</td>
        <td class="data_fim">${locacao.data_fim}</td>
        <td class="valor_total">R$ ${locacao.valor_total}</td>
        <td class="botoesOpcoes">
            <button class="botaoAtualizar" modal="atualizar-locacao">Atualizar</button>
            <button class="botaoExcluir">Finalizar</button>
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

async function preencheModalAtualizarLocacao(locacao) {
        await preencheClientes("atualizarLocacaoClientes");
        await preencheCarrosAtualizar("atualizarLocacaoCarros", locacao.carro.id);
        
        const idLocacao = document.querySelector("#atualizarLocacaoId");
        idLocacao.value = locacao.id;
        const idCliente = document.querySelector("#atualizarLocacaoClientes");
        idCliente.value = locacao.cliente.id;
        const idCarro = document.querySelector("#atualizarLocacaoCarros");
        idCarro.value = locacao.carro.id;
        
        const dataInicio = document.querySelector("#atualizarLocacaoDataInicio");
        dataInicio.value = locacao.data_inicio;        
        const dataFim = document.querySelector("#atualizarLocacaoDataFim");
        dataFim.value = locacao.data_fim;
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
    const idCliente = parseInt(document.querySelector("#atualizarLocacaoClientes").value);
    const idCarro = parseInt(document.querySelector("#atualizarLocacaoCarros").value);
    const dataInicio = document.querySelector("#atualizarLocacaoDataInicio").value;
    const dataFim = document.querySelector("#atualizarLocacaoDataFim").value;
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

const botaoAdicionarLocacao = document.querySelector("#botaoAdicionarLocacao");
botaoAdicionarLocacao.addEventListener("click", () => {
    adicionarLocacao();
    const modal = document.getElementById(botaoAdicionarLocacao.getAttribute("modal"));
    modal.close();
});

async function adicionarLocacao() {
    const idCliente = parseInt(document.querySelector("#adicionarLocacaoClientes").value);
    const idCarro = parseInt(document.querySelector("#adicionarLocacaoCarros").value);
    
    const dataInicio = document.querySelector("#adicionarLocacaoDataInicio").value;
    const dataFim = document.querySelector("#adicionarLocacaoDataFim").value;
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

async function recuperaClientes() {
    try {
        const clientes = await clienteService.getClientes();
        return clientes;
    }catch(erro) {
        alert(erro)
    }
}

async function recuperaCarros() {
    try {
        const carros = await carroService.getCarros();
        return carros;
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

async function preencheClientes(idSelect) {
    const selectClientes = document.querySelector(`#${idSelect}`);
    limpaClientesModalLocacao(idSelect);
    const listaClientes = await recuperaClientes();

    listaClientes.forEach(cliente => {
        const option = document.createElement("option");
        option.value = cliente.id;
        option.textContent = `ID: ${cliente.id} - ${cliente.nome}`;
        selectClientes.appendChild(option);
    });
 
}

async function preencheCarros(idSelect) {
    const selectCarro = document.querySelector(`#${idSelect}`);
    limpaCarrosModalLocacao(idSelect);
    const listaCarros = await recuperaCarros();

    listaCarros.forEach(carro => {
        if (carro.disponivel){
            const option = document.createElement("option");
        option.value = carro.id;
        option.textContent = `ID: ${carro.id} - ${carro.modelo}`;
        selectCarro.appendChild(option);
        }
    });
}

async function preencheCarrosAtualizar(idSelect, idCarroAtual) {
    const selectCarro = document.querySelector(`#${idSelect}`);
    limpaCarrosModalLocacao(idSelect);
    const listaCarros = await recuperaCarros();

    listaCarros.forEach(carro => {
        if (carro.disponivel || carro.id == idCarroAtual) {
            const option = document.createElement("option");
            option.value = carro.id;
            option.textContent = `ID: ${carro.id} - ${carro.modelo}`;
            selectCarro.appendChild(option);
        }
    });
}

function limpaClientesModalLocacao(idSelect) {
    const selectCliente = document.querySelector(`#${idSelect}`);
    
    if (selectCliente.hasChildNodes) {
        while (selectCliente.firstChild){
            selectCliente.removeChild(selectCliente.firstChild);
        }
    }
}

function limpaCarrosModalLocacao(idSelect) {
    const selectIdCarro = document.querySelector(`#${idSelect}`);

    while (selectIdCarro.firstChild){
        selectIdCarro.removeChild(selectIdCarro.firstChild);
    }
}
 
const botaoAdicionar = document.querySelector(".botaoAdicionar");
botaoAdicionar.addEventListener("click", () => {
    const modalId = botaoAdicionar.getAttribute("modal");
    const modal = document.getElementById(modalId);

    preencheClientes("adicionarLocacaoClientes");
    preencheCarros("adicionarLocacaoCarros");
    modal.showModal();
});

const botoesFechar = document.querySelectorAll(".botaoFechar");
botoesFechar.forEach(botao => {
    botao.addEventListener("click", () => {
        const modal = document.getElementById(botao.getAttribute("modal"));
        modal.close();
    })
});
