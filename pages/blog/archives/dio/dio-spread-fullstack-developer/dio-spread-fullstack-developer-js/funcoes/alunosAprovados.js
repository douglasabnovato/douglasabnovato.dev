const alunos = [
	{
		nome: 'João',
		nota: 5,
		turma: '1B',
	},
	{
		nome: 'Sofia',
		nota: 9,
		turma: '1B',
	},
	{
		nome: 'Paulo',
		nota: 6,
		turma: '2C',
	},
	{
		nome: 'Pedro',
		nota: 9,
		turma: '1B',
	},
	{
		nome: 'Maria',
		nota: 6,
		turma: '2C',
	}
];

function alunosAprovados(sala, media){

    let aprovados = [];

    for(let i = 0; i < sala.length; i++){
        let { nota, nome } = sala[i];

        if(nota >= media){
            aprovados.push(nome) 
        }
    }

    return aprovados;
}

console.log(alunosAprovados(alunos, 7))

