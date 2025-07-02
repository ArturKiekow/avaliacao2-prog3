const path = "http://localhost:3000/carros";

export async function getCarros() {
    const response = await fetch(path);
    const clientes = await response.json();
    if (!response.ok) {
        throw new Error(clientes.error);
    }

    return clientes;
}

export async function getCarroById(id) {
    const response = await fetch(`${path}/${id}`);
    const cliente = await response.json();
    if (!response.ok) {
        throw new Error(cliente.error);
    }

    return cliente;
}

export async function createCarro(carro) {
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carro),
    });

    carro = await response.json();

    if (!response.ok) {
        throw new Error(carro.error);
    }

    return carro;
}

export async function updateCarro(id, carro) {
    const response = await fetch(`${path}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carro),
    });

    if (response.status === 204) {
        return "Carro atualizado com sucesso";
    }

    const erro = await response.json();
    throw new Error(erro.error);   
}

export async function deleteCarro(id) {
    const response = await fetch(`${path}/${id}`, {
        method: 'DELETE',
    });
    
    if (response.status === 204) {
        return "Carro excluido com sucesso";
    }

    const erro = await response.json();
    throw new Error(erro.error);   
}