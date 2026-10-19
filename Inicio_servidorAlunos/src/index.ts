import express, {Request, Response} from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

type CursoAluno = "Engenharia de Software" | "Sistemas de Informação"; 

type SituacaoAluno = "Ativo" | "Trancado" | "Formado" | "Inativo";

interface Aluno {
    ra: number;
    nome: string;
    email: string;
    curso: CursoAluno;
    semestre: number;
    situacao: SituacaoAluno;
}

let alunos:Aluno[] = [
    {
        ra: 1,
        nome: "João da Silva",
        email: "joão@aluno.edu.br",
        curso: "Engenharia de Software",
        semestre: 2,
        situacao: "Ativo"
    },
    {
        ra: 2,
        nome: "Maria dos Santos",
        email: "maria@aluno.edu.br",
        curso: "Engenharia de Software",
        semestre: 8,
        situacao: "Formado" 
    }
];

app.listen(PORT, () => {
    console.log(`Servidor ativo na porta ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/alunos", (req: Request, res:Response) => {
    return res.status(200).json(alunos);
});

app.get("/alunos/:ra", (req:Request, res:Response) => {
    const ra = Number(req.params.ra);
    const aluno = alunos.find((item) => item.ra === ra);

    if(!aluno) {
        return res.status(404).json({mensagem: "Aluno não encontrado."});
    }

    return res.status(200).json(aluno);
});

app.post("/aluno", (req: Request, res:Response) => {
    const {ra, nome, email, curso, semestre} = req.body;

    //validações
    if(!ra || !nome || !email || !curso || !semestre) {
        return res.status(404).json({mensagem:"Campos obrigatórios"});
    }

    const novoAluno: Aluno = {
        ra,nome,email,curso,semestre, situacao: "Ativo"
    };

    alunos.push(novoAluno);
    return res.status(201).json(novoAluno);
});

app.put("/alunos/:ra", (req: Request, res: Response) => {
    const ra = Number(req.params.ra);
    const aluno = alunos.find((item) => item.ra === ra);

    if(!aluno) {
        return res.status(404).json({mensagem: "Aluno não encontrado!"});
    }

    const {nome, email, curso, semestre, situacao} = req.body;

    //Validações
    if(!nome || !email || !curso || !semestre || !situacao) {
        return res.status(400).json({mensagem: "Todos os campos são obrigatórios"});
    }

    aluno.nome = nome;
    aluno.email = email;
    aluno.curso = curso;
    aluno.semestre = semestre;
    aluno.situacao = situacao;

    return res.status(200).json(aluno);
});

app.delete("/alunos/:ra", (req:Request, res:Response) => {
    const ra = Number(req.params.ra);
    let aluno  = alunos.find((item) => item.ra === ra);

    if(!aluno) {
        return res.status(404).json({mensagem:"Aluno não encontrado"});
    }
        
    aluno.situacao = "Inativo";
    

    return res.status(200).json({
        mensasgem: "Aluno inativado com sucesso!",
        aluno
    });
});