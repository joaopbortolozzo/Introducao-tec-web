
app.delete("/armarios/:id", (req, res) => {
    // Cria uma rota DELETE para excluir um armário.
    // O :id representa o ID recebido pela URL.

    // Converte o ID recebido para número.
    const id = Number(req.params.id);

    // Verifica se o ID é inválido.
    if (Number.isNaN(id)) {
        return res.status(400).json({
            mensagem: "ID inválido."
        });
    }

    // Procura a posição do armário no array pelo ID.
    const indice = armarios.findIndex((a) => a.id === id);

    // Verifica se o armário não foi encontrado.
    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Armário não encontrado."
        });
    }

    // Obtém o armário encontrado.
    const armario = armarios[indice];

    // Verifica se existem espaços ocupados no armário.
    if (armario.ocupados > 0) {
        return res.status(400).json({
            mensagem: "Não é possível excluir um armário ocupado."
        });
    }

    // Remove um elemento do array na posição indicada.
    armarios.splice(indice, 1);

    // Retorna status 200 e uma mensagem de sucesso.
    return res.status(200).json({
        mensagem: "Armário excluído com sucesso."
    });
});
