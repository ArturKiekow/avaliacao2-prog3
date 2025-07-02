import * as carroService from "../services/carroService.js"
populaTabelaCarros();
function recuperaCarros() {
    return JSON.parse(window.localStorage.getItem("carros"));
}

function salvaCarrosNoLocalStorage(carros) {
    window.localStorage.removeItem("carros");
    window.localStorage.setItem("carros", JSON.stringify(carros));
}

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
        excluirCarro(carro.id);
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

async function atualizarCarro() {

    const attCarroId = parseInt(document.querySelector("#atualizarCarroId").value);
    const attCarroMarca = document.querySelector("#atualizarCarroMarca").value;
    const attCarroModelo = document.querySelector("#atualizarCarroModelo").value;
    const attCarroAno = parseInt(document.querySelector("#atualizarCarroAno").value);
    const attCarroPlaca = document.querySelector("#atualizarCarroPlaca").value;
    const attCarroDisponivel = document.querySelector('input[name="atualizarDisponibilidade"]:checked').value;

    const carroAtualizado = {
        marca: attCarroMarca,
        modelo: attCarroModelo,
        ano: attCarroAno,
        placa: attCarroPlaca,
        disponivel: attCarroDisponivel === "true",
    }

    try {
        const response = await carroService.updateCarro(attCarroId, carroAtualizado);
        populaTabelaCarros();
        alert(response);
    }catch (erro){
        alert(erro);
    }
}


const botaoAdicionarCarro = document.querySelector("#botaoAdicionarCarro");
botaoAdicionarCarro.addEventListener("click", () => {
    adicionarCarro();
    console.log("aaaa");
    
    const modal = document.getElementById(botaoAdicionarCarro.getAttribute("modal"));
    modal.close();
})


async function adicionarCarro(){

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

    try {
        const newCarro = await carroService.createCarro(carro);
        populaTabelaCarros();
        alert(`Carro id:${newCarro.id} adicionado com sucesso`);
    }catch (erro){
        alert(erro);
    }
    
}


async function excluirCarro(id) {
    try {
        const response = await carroService.deleteCarro(id);
        populaTabelaCarros();
        alert(response);
    }catch (erro) {
        alert(erro);
    }
}
