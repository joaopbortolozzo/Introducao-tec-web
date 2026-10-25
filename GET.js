
app.get("/api/demandas/:id", (request, response) => {
    // Cria uma rota GET para consultar uma demanda específica.
    // O :id é um parâmetro que será recebido pela URL.

    // Converte o ID recebido na URL para um número.
    const id = Number(request.params.id);

    // Procura no array demandas uma demanda cujo ID seja igual ao informado.
    // O find() retorna a demanda encontrada ou undefined se não encontrar.
    const demanda = demandas.find((d) => d.id === id);

    // Verifica se a demanda não foi encontrada.
    if (!demanda) {

        // Retorna o status HTTP 404 (não encontrado)
        // e envia um JSON informando que a demanda não existe.
        response.status(404).json({
            valido: false,
            erro: "Demanda não encontrada."
        });

        // Encerra a execução para não continuar o código.
        return;
    }

    // Se a demanda foi encontrada, retorna o status HTTP 200 (sucesso)
    // e envia um JSON com a confirmação e os dados da demanda.
    response.status(200).json({
        valido: true,
        demanda
    });
});