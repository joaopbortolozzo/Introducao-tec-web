app.delete("/armarios/:id", (req, res) => {

    // Converte o ID recebido para número.
    const id = Number(req.params.id)

    // Verifica se o ID é inválido.
    if (Number.isNaN(id)){
        return res.status(400).json({mensagem: "ID inválido."});
    }

    // Procura o armário pelo ID.
    const armario = armarios.find((a) => a.id === id);

    // Verifica se o armário não existe.
    if(!armario){
        return res.status(404).json({mensagem: "Armário não encontrado."})
    }

    // Verifica se o armário possui espaços ocupados.
    if(armario.ocupados > 0){
        return res.status(400).json({mensagem: "Não é possível destivar um armário válido."})
    }

    // Altera somente o campo ativo para false.
    // Não remove o objeto do array.
    armario.ativo = false;

    // Retorna status 200 e a mensagem junto com o armário.
    return res.status(200).json({mensagem: "Armário desativado com sucesso."})


});