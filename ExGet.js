// Rota GET /inscricoes/:id
app.get("/inscricoes/:id", (req, res) => {

    // 1) O id chega da URL como STRING. Converto para número
    //    para poder comparar com === (os ids do array são números).
    const id = Number(req.params.id);

    // 2) PERGUNTA 1: o id é válido? (antes de buscar)
    //    - Number.isInteger(id): é inteiro? ("abc" vira NaN e "2.5" não é inteiro)
    //    - id <= 0: precisa ser positivo
    //    Se for inválido, responde 400 e o return encerra a função.
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ mensagem: "ID deve ser um inteiro positivo." });
    }

    // 3) Só agora busco. find devolve o OBJETO encontrado ou undefined.
    //    (nome no singular: guarda uma inscrição só, não o array)
    const inscricao = inscricoes.find((i) => i.id === id);

    // 4) PERGUNTA 2: a inscrição existe?
    //    !inscricao é true quando find devolveu undefined.
    if (!inscricao) {
        return res.status(404).json({ mensagem: "Inscrição não encontrada." });
    }

    // 5) Passou pelas duas perguntas: devolve o objeto (não um array) com 200.
    return res.status(200).json(inscricao);
});