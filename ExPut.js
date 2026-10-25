app.put("/armarios/:id", (req, res) => {
    // Recebe o ID do armário pela URL e converte para número.
    const id = Number(req.params.id);

    // Valida se o ID é um número válido.
    if (Number.isNaN(id)){
        return res.status(400).json({mensagem: "ID inválido."})
    }

    // Procura o armário pelo ID no array armarios.
    const armario = armarios.find((d) => d.id === id);

    // Se não encontrar o armário, retorna 404.
    if(!armario){
        return res.status(404).json({mensagem: "Armário não está ativo."})
    }

    // Verifica se o armário está ativo.
    if (armario.ativo !== true){
        return res.status(400).jason({mensagen: "Armário está ativo."})
    }

    // Recebe somente os campos que podem ser editados.
    // Outros campos enviados pelo cliente são ignorados.
    const {local, capacidade} = req.body;

    // Verifica se local é uma string.
    if (typeof local != "string"){
        return res.status(400).json({mensagem: "local deve ser uma string."});
    }

    // Remove os espaços do início e do final do local.
    const localLimpo = local.trim();

    // Verifica se o local tem pelo menos 2 caracteres.
    if(localLimpo.legth <2){
        return res.status(400).json({mensagem: "Local deve ter pelo menos 2 caracteres."})
    }

    // Verifica se capacidade é um número inteiro entre 1 e 20.
    if (
        typeof capacidade !== "number" ||
        !Number.isInteger(capacidade) ||
        capacidade < 1 ||
        capacidade > 20 
    ) {
        return res.status(400).json({mensagem: "Capacidade deve ser um número interio de 1 a 20."});
    }

    // Verifica se a capacidade não é menor que a quantidade ocupada.
    if (capacidade < armario.ocupados){
        return res.status(400).json({mensagem: "Capacidade não pode ser menor que os espaços encontrados."})
    }

    // Somente depois de todas as validações, atualiza os campos.
    armario.local = localLimpo;
    armario.capacidade = capacidade;

    // Retorna status 200 e o armário atualizado.
    return res.status(200).json(armario);

});


