
app.post("/demandas/:id/comentarios", (req, res) => {
  // Cria uma rota POST para adicionar um comentário a uma demanda.
  // O :id representa o ID da demanda recebido pela URL.

  // Converte o ID recebido pela URL para um número.
  const id = Number(req.params.id);

  // Verifica se o ID não é um número válido.
  if (Number.isNaN(id)) {
    // Retorna o status 400 (requisição inválida) e uma mensagem de erro.
    return res.status(400).json({ erro: "ID inválido" });
  }

  // Procura, no array demandas, uma demanda com o ID informado.
  const demanda = demandas.find((d) => d.id === id);

  // Verifica se a demanda não foi encontrada.
  if (!demanda) {
    // Retorna o status 404 (recurso não encontrado).
    return res.status(404).json({ erro: "Demanda não encontrada" });
  }

  // Extrai os campos autor e texto do corpo da requisição.
  const { autor, texto } = req.body;

  // Verifica se autor ou texto estão ausentes,
  // se texto não é uma string ou se contém apenas espaços.
  if (
    !autor ||
    !texto ||
    typeof texto !== "string" ||
    texto.trim() === ""
  ) {
    // Retorna o status 400 informando que os campos são obrigatórios.
    return res.status(400).json({
      erro: "Os campos 'autor' e 'texto' são obrigatórios"
    });
  }

  // Cria um novo objeto do tipo Comentario.
  const novo: Comentario = {
    // Atribui o próximo ID ao comentário e incrementa o contador.
    id: proximoIdComentario++,

    // Associa o comentário à demanda encontrada.
    demandaId: id,

    // Armazena o autor do comentário.
    autor,

    // Armazena o texto sem espaços extras no início ou no final.
    texto: texto.trim(),

    // Registra a data e a hora atuais no formato ISO.
    criadoEm: new Date().toISOString(),
  };

  // Adiciona o novo comentário ao array comentarios.
  comentarios.push(novo);

  // Retorna o status 201 (recurso criado) e os dados do comentário.
  return res.status(201).json(novo);
});
