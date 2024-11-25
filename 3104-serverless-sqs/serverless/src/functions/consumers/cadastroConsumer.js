const { cadastrarAlunos } = require('../cadastroAluno/cadastrarAlunos');

module.exports.cadastroConsumer = async (evento) => {
  console.log('DADOS EVENTO DO CONSUMER', evento);

  try {
    const { body } = evento.Records[0];
    return cadastrarAlunos(body);
  } catch (error) {
    console.error('falha no envio para cadastro');
    throw error;
  }
};
