
app.post("/inscricoes", (req, res) => {
    // Recebe os dados enviados no corpo da requisição.
    // Ignora campos extras, inclusive um eventual ID enviado pelo cliente.
    const { nome, oficina, vagas } = req.body;

    // Remove os espaços do início e do final do nome,
    // mas somente se nome for uma string.
    if (typeof nome !== "string") {
        return res.status(400).json({
            erro: "Nome deve ser uma string."
        });
    }

    const nomeLimpo = nome.trim();

    // Verifica se o nome tem pelo menos 3 caracteres.
    if (nomeLimpo.length < 3) {
        return res.status(400).json({
            erro: "Nome deve ter pelo menos 3 caracteres."
        });
    }

    // Verifica se a oficina é exatamente "escrita" ou "fotografia".
    if (oficina !== "escrita" && oficina !== "fotografia") {
        return res.status(400).json({
            erro: "Oficina inválida."
        });
    }

    // Verifica se vagas é um número inteiro entre 1 e 3.
    // O typeof também impede aceitar strings numéricas, como "2".
    if (
        typeof vagas !== "number" ||
        !Number.isInteger(vagas) ||
        vagas < 1 ||
        vagas > 3
    ) {
        return res.status(400).json({
            erro: "Vagas deve ser um número inteiro de 1 a 3."
        });
    }

    // Soma as vagas já reservadas para a oficina escolhida.
    const totalReservado = inscricoes
        .filter((i) => i.oficina === oficina)
        .reduce((soma, i) => soma + i.vagas, 0);

    // Verifica se a nova inscrição ultrapassaria o limite da oficina.
    if (totalReservado + vagas > limites[oficina]) {
        return res.status(400).json({
            erro: "Limite de vagas da oficina ultrapassado."
        });
    }

    // Cria o objeto da nova inscrição usando o próximo ID disponível.
    const novaInscricao = {
        id: proximoId,
        nome: nomeLimpo,
        oficina,
        vagas
    };

    // Adiciona a inscrição ao array.
    inscricoes.push(novaInscricao);

    // Incrementa o contador somente depois de todas as validações.
    proximoId++;

    // Retorna 201 (Created) e o objeto criado.
    return res.status(201).json(novaInscricao);
});


