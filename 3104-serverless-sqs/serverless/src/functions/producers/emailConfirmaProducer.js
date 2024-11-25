const { client } = require('../../../config/clientSQS');
const { SendMessageCommand } = require('@aws-sdk/client-sqs');
const crypto = require('crypto');

module.exports.emailConfirmaProducer = async (objAluno) => {
  const input = {
    QueueUrl: process.env.SQS_QUEUE_EMAIL_CONFIRMA_URL,
    MessageBody: JSON.stringify(objAluno),
    DelaySeconds: 0,
    MessageDeduplicationId: crypto.randomUUID(),
    MessageGroupId: 'email', // as filas FIFO usando esse ID para ordenar as mensagens
  };

  try {
    const command = new SendMessageCommand(input);
    const mensagem = await client.send(command);
    console.log('mensagem email enviada com sucesso', mensagem.MessageId);
    return mensagem;

  } catch (erro) {
    console.log(erro);
  }
};