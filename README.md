## Sistema de Clínica de Consultas

Descrição do Projeto:

Este projeto é um sistema de agendamento de consultas para uma clínica, desenvolvido em Node.js. Ele permite o cadastro de pacientes, marcação de consultas e cancelamento de consultas, tudo através de um menu interativo no terminal. Os dados são armazenados em arquivos JSON para garantir a persistência entre as execuções do programa.

## Funcionalidades

1. **Cadastrar um Paciente**

    - Solicita o nome e telefone do paciente.
    Verifica se o paciente já está cadastrado pelo número de telefone.
    Adiciona o paciente à lista de pacientes cadastrados e salva no arquivo pacientes.json.
    Marcações de Consultas.

2. **Marcar consulta - Exibe uma lista numerada de pacientes cadastrados.**
    
    - Solicita o dia, a hora e a especialidade desejada para a consulta.
    Verifica se a data e hora não estão em conflito com outros agendamentos e se não são retroativas.
    Adiciona o agendamento à lista de agendamentos e salva no arquivo agendamentos.json.

3. **Cancelamento de Consultas**

    - Exibe uma lista numerada de agendamentos existentes.
    Permite selecionar um agendamento para cancelamento.
    Remove o agendamento selecionado da lista e salva as alterações.

4. **Sair**

    - Encerra o programa, garantindo que os dados sejam salvos nos arquivos JSON.

### Estrutura do Projeto ###
    
    - index.js: Código principal do sistema.
    - data/pacientes.json: Arquivo JSON para armazenar os dados dos pacientes.
    - data/agendamentos.json: Arquivo JSON para armazenar os dados dos agendamentos.

### Design da Solução e Decisões Tomadas ###

**Persistência de Dados**

    - Optei por armazenar os dados em arquivos JSON (pacientes.json e agendamentos.json) para garantir que os dados persistam entre as execuções do programa. As funções carregarDados e salvarDados são responsáveis por ler e escrever esses arquivos, respectivamente.

**Menu Interativo**

    - Utilizei o pacote readline-sync para criar um menu interativo no terminal. Este pacote facilita a entrada de dados pelo usuário e permite uma navegação intuitiva pelas opções do sistema.

**Tratamento de Erros**

    - Cadastro de Pacientes: Verificamos se o número de telefone do paciente já está cadastrado para evitar duplicidade. Se um paciente já estiver cadastrado, uma mensagem de erro é exibida.

    - Marcações de Consultas: Verificamos se a data e hora da consulta não entram em conflito com outros agendamentos e se não são retroativas. Caso contrário, uma mensagem de erro é exibida.

    - Cancelamento de Consultas: Validamos se o índice do agendamento selecionado é válido antes de permitir o cancelamento.

**Interface de Usuário**
    - A interface de usuário é baseada em um menu de texto simples, o que facilita o uso por qualquer pessoa, mesmo sem conhecimentos técnicos. Cada funcionalidade é claramente apresentada e fácil de acessar.

### Fluxo do Programa ###

1. Início: Ao iniciar o programa, os dados dos pacientes e agendamentos são carregados dos arquivos JSON.

2. Menu Principal: O usuário é apresentado com as opções de cadastro de paciente, marcação de consultas, cancelamento de consultas e sair.

3. Funcionalidades: O programa executa a funcionalidade selecionada, garantindo o tratamento de erros e a persistência dos dados.

4. Encerramento: Ao sair, o programa salva os dados atualizados nos arquivos JSON.


### Execução do Programa ###
Para executar o programa, siga os passos abaixo:

1. Clone o repositório:

```bash
git clone https://github.com/Janielson-Anjos/sistema_clinica_de_consultas.git
```
2. Acesse o diretório do projeto:

```bash
cd sistema_clinica_de_consultas
```

3. Instale as dependências:

```bash
npm install
```
4. Execute o programa:
```bash
node index.js
```

### Conclusão ###

Este sistema de agendamento de consultas é uma solução simples e eficaz para gerenciar o cadastro de pacientes e suas consultas em uma clínica. A utilização de Node.js e JSON para persistência de dados garante flexibilidade e facilidade de manutenção. O design do menu interativo proporciona uma experiência de usuário amigável e intuitiva.