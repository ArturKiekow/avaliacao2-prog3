document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch("header.html");
        if (!res.ok) {
            throw new Error("Erro ao carregar o header");
        }
        const html = await res.text();
        const header = document.querySelector("#header");
        header.innerHTML = html;
    } catch (erro) {
        console.log(erro);
    }
});