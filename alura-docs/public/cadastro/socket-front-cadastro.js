const socket = io();

function emitirCadastrarUsuario(dados) {
    socket.emit("cadastrar_usuario", dados)
};

socket.on("cadastro_sucesso", () => alert("Cadastro realizado com sucesso!"))
socket.on("cadastro_error", () => alert("Erro ao cadastrar usuário!"))
socket.on("usuario_existe", () => alert("Usuário já existe!"))

export { emitirCadastrarUsuario }