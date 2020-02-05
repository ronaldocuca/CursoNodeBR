// importamos um modulo do nodejs
const util = require('util');
const obterEnderecoAsycn = util.promisify(obterEndereco);

/** Obter um usuario */
const obterUsuario = () => {
    // quando der algum problema --> reject(erro)
    // quando sucess ==> resolve()
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(function() {
            // return reject(new Error("DEU RUIM DE VERDADE"));
            return resolve({
                id:1,
                nome: "Aladin",
                dataNascimento: new Date()
            });
    
        }, 1000);
        
    });
   
}

/**Obter o numero de telefone de um usuario a partir do seu ID */
function obterTelefone(idUsuario) {
    // quando der algum problema --> reject(erro)
    // quando sucess ==> resolve()
    return new Promise(function resolverPromise(resolver, reject) {
        setTimeout(function() {
            return resolver({
                telefone: '119900002',
                ddd: 11
            });
    
        }, 2000);
    });

   

}

/**Obter o endereco do usuario pelo Id */
function obterEndereco(idUsuario, callback) {
   setTimeout(() => {
       return callback(null, {
           rua: 'dos bobos',
           numero: 0
       });

   }, 2000);
}





main();
async function  main() {
    try {
        console.time('medida-promise');
        const usuario = await  obterUsuario();
        // const telefone = await  obterTelefone(usuario.id);
        // const endereco = await  obterEnderecoAsycn(usuario.id);

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsycn(usuario.id)
        ]);

        const endereco = resultado[1];
        const telefone = resultado[0];

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereço: ${endereco.rua}, ${endereco.numero}
        `);

        console.timeEnd('medida-promise')
        
        
    } catch (error) {
        console.error('Deu ruim', error);
    }
}