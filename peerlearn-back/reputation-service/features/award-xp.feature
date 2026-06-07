# language: pt
Funcionalidade: Concessão de XP

  Cenário: Aluno ganha XP ao publicar uma aula
    Dado que o aluno "u1" não possui XP
    Quando ele publica uma micro-aula
    Então ele recebe 50 pontos de XP
    E seu total de XP passa a ser 50

  Cenário: XP acumula entre ações
    Dado que o aluno "u1" já possui 50 de XP por uma aula publicada
    Quando ele deixa um comentário
    Então seu total de XP passa a ser 60
