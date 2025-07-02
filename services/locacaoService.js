const path = "http://localhost:3000/locacoes";

export async function getLocacoes() {
    const response = await fetch(path);
    const clientes = await response.json();
    if (!response.ok) {
        throw new Error(clientes.error);
    }

    return clientes;
}

export async function getLocacaoById(id) {
    const response = await fetch(`${path}/${id}`);
    const cliente = await response.json();
    if (!response.ok) {
        throw new Error(cliente.error);
    }

    return cliente;
}

export async function createLocacao(locacao) {
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(locacao),
    });

    locacao = await response.json();

    if (!response.ok) {
        throw new Error(locacao.error);
    }

    return locacao;
}

export async function updateLocacao(id, locacao) {
    const response = await fetch(`${path}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(locacao),
    });

    if (response.status === 204) {
        return "Locação atualizada com sucesso";
    }

    const erro = await response.json();
    throw new Error(erro.error);   
}

export async function deleteLocacao(id) {
    const response = await fetch(`${path}/${id}`, {
        method: 'DELETE',
    });

    if (response.status === 204) {
        return "Locação excluida com sucesso";
    }

    const erro = await response.json();
    throw new Error(erro.error);   
}