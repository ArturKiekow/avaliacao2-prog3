import * as carroService from "../services/carroService.js"

const dadosTabelaCarros = document.querySelector("#dadosCarros");
await populaTabelaCarros();

async function populaTabelaCarros(){
    limpaTabelaCarros();
    try {
        const carros = await carroService.getCarros();
        carros.forEach(carro => {
            adicionaCarroNaTabela(carro)
        });    
    }catch (erro) { 
        alert(erro)
    }
}

function limpaTabelaCarros(){
    while(dadosTabelaCarros.firstChild){
        dadosTabelaCarros.removeChild(dadosTabelaCarros.firstChild)
    }
}

function adicionaCarroNaTabela(carro) {
    const linha = criaLinha(carro);
    dadosTabelaCarros.innerHTML += linha;
}

function criaLinha(carro){
    return `
    <tr data-id="${carro.id}">
        <td class="id">${carro.id}</td>
        <td class="marca">${carro.marca}</td>
        <td class="modelo">${carro.modelo}</td>
        <td class="ano">${carro.ano}</td>
        <td class="placa">${carro.placa}</td>
        <td class="disponivel">${carro.disponivel ? "Sim" : "Não"}</td>
        <td class="botoesOpcoes">
            <button class="botaoAtualizar" modal="atualizar-carro">Atualizar</button>
            <button class="botaoExcluir">Excluir</button>
        </td>
    </tr>
    `
}

dadosTabelaCarros.addEventListener("click", async (event) =>{
    const elemento = event.target;
    const carroId = elemento.closest("tr").dataset.id;

    if (elemento.classList.contains("botaoAtualizar")){
        const carro = await getCarro(carroId);
        preencheModalAtualizarCarro(carro);
        const modal = document.getElementById(elemento.getAttribute("modal"));
        modal.showModal();
    }

    if (elemento.classList.contains("botaoExcluir")){
        if(confirm(`Tem certeza que deseja excluir o carro com id:${carroId}`)){
            await excluirCarro(carroId);
            populaTabelaCarros();
        }
    }
})

function preencheModalAtualizarCarro(carro){
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
}

const botaoAtualizarCarro = document.querySelector("#botaoAtualizarCarro");
botaoAtualizarCarro.addEventListener("click", async () => {
    await atualizarCarro();
    populaTabelaCarros();
    const modal = document.getElementById(botaoAtualizarCarro.getAttribute("modal"));
    modal.close();
})

async function atualizarCarro() {
    try {
        const carro = pegaDadosModalAtualizarCarro();
        const response = await carroService.updateCarro(carro.id, carro);
        alert(response);
    } catch (erro) {
        alert(erro);
    } 
}

function pegaDadosModalAtualizarCarro() {

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

    return carroAtualizado;
}


const botaoAdicionarCarro = document.querySelector("#botaoAdicionarCarro");
botaoAdicionarCarro.addEventListener("click", () => {
    adicionarCarro();
    const modal = document.getElementById(botaoAdicionarCarro.getAttribute("modal"));
    modal.close();
})


async function adicionarCarro(){
    try {
        const carro = pegaDadosModalAdicionarCarro();
        const newCarro = await carroService.createCarro(carro);
        populaTabelaCarros();
        alert(`Carro id:${newCarro.id} adicionado com sucesso`);
    }catch (erro){
        alert(erro);
    }
    
}

function pegaDadosModalAdicionarCarro() {
    const carroMarca = document.querySelector("#adicionarCarroMarca").value;
    const carroModelo = document.querySelector("#adicionarCarroModelo").value;
    const carroAno = parseInt(document.querySelector("#adicionarCarroAno").value);
    const carroPlaca = document.querySelector("#adicionarCarroPlaca").value;
    const carroDisponivel = document.querySelector('input[name="adicionarDisponibilidade"]:checked').value;

    const carro = {
        marca: carroMarca,
        modelo: carroModelo,
        ano: carroAno,
        placa: carroPlaca,
        disponivel: carroDisponivel === "true",
    }

    return carro;
}

async function getCarro(id) {
    try {
        const carro = await carroService.getCarroById(id);
        return carro;
    }catch (erro) {
        alert(erro);
    }
}


async function excluirCarro(id) {
    try {
        const response = await carroService.deleteCarro(id);
        alert(response);
    }catch (erro) {
        alert(erro);
    }
}
