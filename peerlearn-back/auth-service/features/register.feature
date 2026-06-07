# language: pt
Funcionalidade: Registro de novo usuário

  Cenário: Novo usuário se registra com sucesso
    Dado que sou um novo usuário com o email "ana@uni.edu"
    Quando me registro com a senha "senha123"
    Então minha conta é criada com o papel "student"

  Cenário: Registro com email já existente
    Dado que já existe um usuário com o email "ana@uni.edu"
    Quando tento me registrar novamente com o email "ana@uni.edu"
    Então recebo um erro informando que o email já está em uso
