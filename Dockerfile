# Usar a imagem oficial do PostgreSQL
FROM postgres:15

# Configurar variáveis de ambiente padrão (substitua pelos valores desejados)
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD='1234'
ENV POSTGRES_DB='teste_rlv_tecnologia'

# Expor a porta padrão do PostgreSQL
EXPOSE 5432

# O comando padrão para iniciar o PostgreSQL
CMD ["postgres"]
