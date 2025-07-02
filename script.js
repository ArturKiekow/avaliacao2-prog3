import * as carroService from "./services/carroService.js"
import * as clienteService from "./services/clienteService.js"
import * as locacaoService from "./services/locacaoService.js"
var botoesAdicionar = document.querySelectorAll(".botaoAdicionar");

botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
        const modalId = botao.getAttribute("modal");
        const modal = document.getElementById(modalId);

/*         if (modalId === "adicionar-locacao"){
            preencheIdsCliente("adicionarLocacaoIdCliente");
            preencheIdsCarro("adicionarLocacaoIdCarro");
        } */
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