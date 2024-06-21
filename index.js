const fs = require('fs');
const readline = require('readline-sync');

function carregarDados(informacoes) {
    try {
        const data = fs.readFileSync(informacoes, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function salvarDados(informacoes, dados) {
    fs.writeFileSync(informacoes, JSON.stringify(dados, null, 2), 'utf8');
}

let pacientes = carregarDados('./data/pacientes.json');
let agendamentos = carregarDados('./data/agendamentos.json');

function menuPrincipal() {
    console.log('\n=== Sistema de Clínica de Consultas ===');
    console.log('1. Cadastrar um paciente');
    console.log('2. Marcações de consultas');
    console.log('3. Cancelamento de consultas');
    console.log('4. Sair');
    const escolha = readline.question('Escolha uma opção: ');

    switch (escolha) {
        case '1':
            cadastrarPaciente();
            break;
        case '2':
            marcarConsulta();
            break;
        case '3':
            cancelarConsulta();
            break;
        case '4':
            console.log('Encerrando o programa...');
            salvarDados('./data/pacientes.json', pacientes);
            salvarDados('./data/agendamentos.json', agendamentos);
            process.exit(0);
        default:
            console.log('Opção inválida!');
            menuPrincipal();
    }
}

function cadastrarPaciente() {
    const nome = readline.question('Nome do paciente: ');
    const telefone = readline.question('Telefone do paciente: ');

    const pacienteExistente = pacientes.find(p => p.telefone === telefone);
    if (pacienteExistente) {
        console.log('Paciente já cadastrado!');
    } else {
        pacientes.push({ nome, telefone });
        console.log('Paciente cadastrado com sucesso!');
    }
    menuPrincipal();
}

function marcarConsulta() {
    if (pacientes.length === 0) {
        console.log('Nenhum paciente cadastrado!');
        return menuPrincipal();
    }
    console.clear();
    console.log('\n=== Pacientes Cadastrados ===');
    pacientes.forEach((paciente, index) => {
        console.log(`${index + 1}. ${paciente.nome} - ${paciente.telefone}`);
    });

    const pacienteIndex = readline.questionInt('Escolha o número do paciente: ') - 1;
    if (pacienteIndex < 0 || pacienteIndex >= pacientes.length) {
        console.log('Número de paciente inválido!');
        return menuPrincipal();
    }

    const dia = readline.question('Dia da consulta (YYYY-MM-DD): ');
    const hora = readline.question('Hora da consulta (HH:MM): ');
    const especialidade = readline.question('Especialidade desejada: ');

    const dataConsulta = new Date(`${dia}T${hora}:00`);
    const agora = new Date();

    if (dataConsulta <= agora) {
        console.log('Consultas não podem ser marcadas antes da data atual!');
        return menuPrincipal();
    }

    const conflito = agendamentos.find(a => a.dia === dia && a.hora === hora);
    if (conflito) {
        console.log('Horário já agendado!');
        return menuPrincipal();
    }

    agendamentos.push({
        paciente: pacientes[pacienteIndex].nome,
        dia,
        hora,
        especialidade
    });

    console.log('Consulta agendada com sucesso!');
    menuPrincipal();
}

function cancelarConsulta() {
    if (agendamentos.length === 0) {
        console.log('Nenhuma consulta agendada!');
        return menuPrincipal();
    }
    console.clear();
    console.log('\n=== Consultas Agendadas ===');
    agendamentos.forEach((agendamento, index) => {
        console.log(`${index + 1}. ${agendamento.paciente} - ${agendamento.dia} ${agendamento.hora} (${agendamento.especialidade})`);
    });

    const agendamentoIndex = readline.questionInt('Escolha o número da consulta para cancelar: ') - 1;
    if (agendamentoIndex < 0 || agendamentoIndex >= agendamentos.length) {
        console.log('Número de consulta inválido!');
        return menuPrincipal();
    }

    const consulta = agendamentos[agendamentoIndex];
    console.log(`Consulta agendada para ${consulta.dia} ${consulta.hora} (${consulta.especialidade})`);
    const confirmacao = readline.question('Tem certeza que deseja cancelar esta consulta? (s/n): ');

    if (confirmacao.toLowerCase() === 's') {
        agendamentos.splice(agendamentoIndex, 1);
        console.log('Consulta cancelada com sucesso!');
    } else {
        console.log('Cancelamento abortado.');
    }

    menuPrincipal();
}


menuPrincipal();