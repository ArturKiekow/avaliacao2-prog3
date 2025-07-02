const path = "http://localhost:3000/clientes";

export async function getClientes() {
    const response = await fetch(path);
    const clientes = await response.json();
    if (!response.ok) {
        throw new Error(clientes.error);
    }

    return clientes;
}

export async function getClienteById(id) {
    const response = await fetch(`${path}/${id}`);
    const cliente = await response.json();
    if (!response.ok) {
        throw new Error(cliente.error);
    }

    return cliente;
}

export async function createCliente(cliente) {
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
    });

    cliente = await response.json();

    if (!response.ok) {
        throw new Error(cliente.error);
    }

    return cliente;
}

export async function updateCliente(id, cliente) {
    const response = await fetch(`${path}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
    });

    if (response.status === 204) {
        return "Cliente atualizado com sucesso";
    }

    const erro = await response.json();
    throw new Error(erro.error);   
}

export async function deleteCliente(id) {
    const response = await fetch(`${path}/${id}`, {
        method: 'DELETE',
    });

    if (response.status === 204) {
        return "Cliente excluido com sucesso";
    }

    const erro = await response.json();
    throw new Error(erro.error);   
}