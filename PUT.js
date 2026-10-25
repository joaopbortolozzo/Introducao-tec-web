
app.put("/api/demandas/:id", (request, response) => {
    // Cria uma rota PUT para atualizar uma demanda existente.
    // O :id representa o ID da demanda recebido pela URL.

    // Converte o ID recebido para número.
    const id = Number(request.params.id);

    // Verifica se o ID é inválido.
    if (Number.isNaN(id)) {
        return response.status(400).json({
            valido: false,
            erro: "ID inválido."
        });
    }

    // Procura a demanda pelo ID informado.
    const demanda = demandas.find((d) => d.id === id);

    // Verifica se a demanda existe.
    if (!demanda) {
        return response.status(404).json({
            valido: false,
            erro: "Demanda não encontrada."
        });
    }

    // Recebe os novos dados enviados no corpo da requisição.
    const { titulo, descricao } = request.body;

    // Verifica se os campos obrigatórios foram preenchidos.
    if (
        typeof titulo !== "string" ||
        titulo.trim() === "" ||
        typeof descricao !== "string" ||
        descricao.trim() === ""
    ) {
        return response.status(400).json({
            valido: false,
            erro: "Título e descrição são obrigatórios."
        });
    }

    // Atualiza os dados da demanda encontrada.
    demanda.titulo = titulo.trim();
    demanda.descricao = descricao.trim();

    // Retorna status 200 (sucesso) e a demanda atualizada.
    return response.status(200).json({
        valido: true,
        demanda
    });
});
