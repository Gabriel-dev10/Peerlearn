-- Cria um banco PostgreSQL isolado por microsserviço.
-- Executado automaticamente pelo container na primeira inicialização.

CREATE DATABASE peerlearn_auth;
CREATE DATABASE peerlearn_content;
CREATE DATABASE peerlearn_reputation;

GRANT ALL PRIVILEGES ON DATABASE peerlearn_auth TO peerlearn;
GRANT ALL PRIVILEGES ON DATABASE peerlearn_content TO peerlearn;
GRANT ALL PRIVILEGES ON DATABASE peerlearn_reputation TO peerlearn;
