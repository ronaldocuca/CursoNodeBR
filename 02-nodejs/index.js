/**
 * Obter um usuario
 */

function obterUsuario(callback) {
  setTimeout(function() {
    return callback(null, {
      id: 1,
      nome: "Aladin",
      dataNascimento: new Date()
    });
  }, 1000);
}

/**
 * Obter o numero de telefone de um usuario a partir do seu ID
 */
function obterTelefone(idUsuario, callback) {
  setTimeout(function() {
    return callback(null, {
      telefone: "119900002",
      ddd: 11
    });
  }, 2000);
}

/**
 * Obter o endereco do usuario pelo Id
 */
function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: 0
    });
  }, 2000);
}

obterUsuario(function resolverUsuario(error, usuario) {
  if (error) {
    console.error("DEU RUIM em USUARIO", error);
    return;
  }

  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error("DEU RUIM em TELEFONE", error1);
      return;
    }

    obterEndereco(usuario.id, function(error2, endereco) {
      if (error2) {
        console.error("DEU RUIM em ENDEREÇO", error2);
        return;
      }

      console.log(`
                Nome: ${usuario.nome},
                Endereço: ${endereco.rua},${endereco.numero}
                Telefone: (${telefone.ddd})${telefone.telefone}
             `);
    });
  });
});

//  const telefone = obterTelefone(usuario.id);
//  console.log('usuario', usuario);
//  console.log('telefone', telefone);
