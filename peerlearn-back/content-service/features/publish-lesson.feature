# language: pt
Funcionalidade: Publicação de micro-aula

  Cenário: Ao publicar uma aula, os outros alunos são notificados
    Dado que os alunos inscritos são "s1,s2" e o autor é "autor"
    Quando o autor publica uma micro-aula "Docker Compose"
    Então os alunos "s1,s2" recebem uma notificação
    E o autor não recebe notificação
