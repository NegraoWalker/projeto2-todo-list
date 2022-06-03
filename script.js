/*Vamos simular em primeiro momento um banco de dados que vai receber as tarefas digitadas pela user e no final integrar isso com o localStorage */
/*let banco = [
    {"tarefa": "Estudar JS", "status": ""},
    {"tarefa": "Passar no mercado", "status": "checked"}
] */

const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [] // Função para pegar do banco de dados dentro do localStorage
const setBanco = (banco) => localStorage.setItem("todoList", JSON.stringify(banco)) //Função para atualizar o banco de dados dentro do localStorage

//O localStorage só recebe dados no formato de string. Assim temos que transformar nosso banco que é um array de objetos em string para enviar e para receber tranformamos de volta para array de objetos JSON.

/*Base de código que tenho que criar dinamicamente para adicionar uma nova tarefa: */
/* <label class="todo-item">
    <input type="checkbox">
        <div>Teste item 1</div>
    <input type="button" value="x">
</label> */

const criarItem = (tarefa, status, indice) => { //Função para adicionar uma tarefa dinamicamente, eu recebo a tarefa pelo user digitado no campo input e recebo o status do check box para saber se o user clicou e também o indice da tarefa do banco de dados para verificar em qual elemento eu cliquei
    const item = document.createElement("label")
    item.classList.add("todo-item")
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div> 
        <input type="button" value="x" data-indice=${indice}>
    `

    document.getElementById("todoList").appendChild(item) //Adicionando ao elemento pai(div do index.html) os elementos HTML criados acima como filhos
}

const limparTarefas = () => { //Função utilizada para que a exibição na tela não seja duplicada quando chamar a função atualizarTela
    const todoList = document.getElementById("todoList") //Seleciono a div do index.html
    while (todoList.firstChild) { //Verifico se tiver a tarefa1 adicionada por exemplo
        todoList.removeChild(todoList.lastChild) //Vou remover a duplicidade
    }
}

const atualizarTela = () => { //Função que verifica o nosso banco de dados e atualiza a tela com as novas tarefas
    limparTarefas()
    const banco = getBanco()
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice)) //Percorro meu banco de dados através do laço e pego cada tarefa adicionada do banco e mando para função criar item. E como parâmetros para a exibição passo o nome da tarefa e o status da mesma e o indice do array(para verificar em qual elemento HTML eu cliquei com a função clickItem)

}

const inserirItem = (event) => {
    const tecla = event.key //Capturando a tecla que foi apertada
    const texto = event.target.value //Capturando o valor do texto digitado no input antes do enter
    if (tecla === "Enter") { //Verificando se a tecla apertada no evento é enter
        const banco = getBanco()
        banco.push({ "tarefa": texto, "status": "" }) //Vou atualizar meu banco adicionando o texto digitado e o status
        setBanco(banco)
        atualizarTela() // Depois dou um atualizarTela para mostrar as modificações
        event.target.value = ""//Limpando o texto que ficou após apertar enter no input de adicionar tarefa
    }
}

const removerItem = (indice) => {
    const banco = getBanco()
    banco.splice(indice, 1) //Utilizo o método splice para remover a tarefa do banco armazenada a partir do indice passado e soment ela por isso o 1
    setBanco(banco)
    atualizarTela()
}

const atualizarItem = (indice) => {
    const banco = getBanco()
    banco[indice].status = banco[indice].status === "" ? "checked" : "" //Passo o indice para o banco de dados para selecionar a tarefa respectiva armazenada e verifico se o status está checked se estiver vira vazio e senão fica marcado
    setBanco(banco)
    atualizarTela() // Atualizo a tela
}

const clickItem = (event) => {
    const elemento = event.target //Capturo o elemento clicado
    if (elemento.type === "button") { //Verifico se o elemento é o botão x
        const indice = elemento.dataset.indice //Eu capturo o indice do elemento clicado atráves da propriedade do DOM dataset. Esse indice é o criado pela data-indice=${indice} dae eu passo apenas .nome-criado que no caso é indice
        removerItem(indice) //Passo o indice do elemento HTMl clicado para que a função removerItem remova a tarefa do banco de dados e atualize na tela
    } else if (elemento.type === "checkbox") { //Verifica se foi clicado no checkbox de marcação de tarefa
        const indice = elemento.dataset.indice
        atualizarItem(indice)//Passo o indice do elemento HTML clicado para a função atualizar item que atualizará o status da tarefa como checked
    }
}


document.getElementById("new-item").addEventListener("keypress", inserirItem) //Evento criado para capturar novas tarefas para a atualização do banco de dados
document.getElementById("todoList").addEventListener("click", clickItem) //Evento criado para capturar qual a tarefa clicada pelo user, isso para podermos indetificar e atualizar o banco de dados o status e também pra depois remover a tarefa




atualizarTela()