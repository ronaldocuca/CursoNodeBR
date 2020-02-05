const util = require('util');

const obterUsuario = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                id:1,
                nome: "Aladin",
                dataNascimento: new Date()
            });
        }, 1000);     
    });
};

const obterTelefone = idUsuario => {
    return new Promise( (resolver, reject) => {
        setTimeout(() => {
            return resolver({
                telefone: '119900002',
                ddd: 11
            });  
        }, 2000);
    });
}

const obterEndereco = (idUsuario, callback) => {
   setTimeout(() => {
       return callback(null, {
           rua: 'dos bobos',
           numero: 0
       });
   }, 2000);
}


const usuarioPrimose = obterUsuario();

usuarioPrimose
    .then( usuario => {
        return obterTelefone(usuario.id)
        
        .then(result => {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                }, 
                telefone: result
            }
        })
    })
    .then(resultado => {
        const obterEnderecoAsycn = util.promisify(obterEndereco);
        const endereco = obterEnderecoAsycn(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(resultado => {
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `);
        
})
.catch(function(error) {
    console.error('DEU RUIM', error);

});