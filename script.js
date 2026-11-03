const lista = document.querySelector("ul");
const botao = document.querySelector(".button");
const pesquisa = document.querySelector(".search input");
const cardtitle = document.querySelector(".cardtitle");
const data = document.querySelector(".data"); 
const horas = document.querySelector(".hora");
const seletorStatus = document.querySelector(".status");


function carregarTarefas () {

    const tasksSalvadas = localStorage.getItem("tarefas");

    if (tasksSalvadas === null) {

       return [
            {
                titulo: "Trabalho 1",
                data: "2004-03-02",
                concluida: false,
                horas: 1
            },

            {
                titulo: "Trabalho 2",
                data: "2008-06-28",
                concluida: true,
                horas: 7
            },

            {
                titulo: "Trabalho 3",
                data: "2012-12-14",
                concluida: false,
                horas: 3
            }
        ];
    }

    else {
        return JSON.parse(tasksSalvadas);
    }
}

const tarefas = carregarTarefas();

renderizarTarefas(tarefas);

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas(listaDeTarefas) {
    limparLista();

    for (const tarefa of listaDeTarefas) {
        criarAnotacao(tarefa);
    }
}

function configurarConclusao(tarefa, novaConcluida, container) {

    const botaoconcluido = document.createElement("button");
    botaoconcluido.classList.add("concluir");
    
    if (tarefa.concluida) botaoconcluido.textContent = "Desmarcar Conclusão";
    else botaoconcluido.textContent = "Concluir atividade";

    botaoconcluido.addEventListener("click", function () {
        tarefa.concluida = !tarefa.concluida;
        salvarTarefas();
        if (tarefa.concluida) {
            novaConcluida.textContent = "Concluída";
            botaoconcluido.textContent = "Desmarcar Conclusão";
        }
        else {
            novaConcluida.textContent = "Pendente";
            botaoconcluido.textContent = "Concluir atividade";
        }
    })

    container.appendChild(botaoconcluido);

}

function configurarExclusao (tarefa, novoItem, container) {

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("excluir");
    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click", function() {
       const indice = tarefas.findIndex(function(item) {
            return item === tarefa;
        });

        tarefas.splice(indice, 1);

        novoItem.remove();

        salvarTarefas();
    });


    container.appendChild(botaoExcluir);

}

function configurarEdicao (tarefa, novoTitulo, novaData, novaHoras, container, containerInfo) {

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("editar");
    botaoEditar.textContent = "Editar";


    botaoEditar.addEventListener("click", function () {

        const botaoExcluir = container.querySelector(".excluir");
        const botaoConcluir = container.querySelector(".concluir");

        botaoExcluir.style.display = "none";
        botaoConcluir.style.display = "none";

        const inputs = document.createElement("div");
        inputs.classList.add("inputsEdicao");

        const inputTitulo = document.createElement("input");
        inputTitulo.classList.add("cardtitle");
        inputTitulo.value = tarefa.titulo;

        const inputData = document.createElement("input");
        inputData.classList.add("data");
        inputData.type = "date";
        inputData.value = tarefa.data;

        const inputHoras = document.createElement("input");
        inputHoras.classList.add("hora");
        inputHoras.type = "number";
        inputHoras.value = tarefa.horas;

        inputs.appendChild(inputTitulo);
        inputs.appendChild(inputData);
        inputs.appendChild(inputHoras);

        novoTitulo.after(inputs);
        novoTitulo.style.display = "none";
        containerInfo.style.display = "none";

        const botaoSalvar = document.createElement("button");
        botaoSalvar.classList.add("salvar");
        botaoSalvar.textContent = "Salvar";
        botaoEditar.replaceWith(botaoSalvar);

        const botaoCancelar = document.createElement("button");
        botaoCancelar.classList.add("cancelar");
        botaoCancelar.textContent = "Cancelar";
        container.appendChild(botaoCancelar);

        botaoCancelar.addEventListener("click", function () {
                
            inputs.remove();

            novoTitulo.style.display = "block";
            containerInfo.style.display = "flex";

            botaoExcluir.style.display = "flex";
            botaoConcluir.style.display = "flex";

            botaoCancelar.remove();
            botaoSalvar.replaceWith(botaoEditar);
        })

        botaoSalvar.addEventListener("click", function () {

            if (validacoes(inputTitulo.value, inputData.value, inputHoras.value)) {

                tarefa.titulo = inputTitulo.value;
                tarefa.data = inputData.value;
                tarefa.horas = Number(inputHoras.value);

            
                novoTitulo.textContent = tarefa.titulo;

                novaData.textContent = tarefa.data;

                novaHoras.textContent = tarefa.horas + " horas";

                inputs.remove();

                novoTitulo.style.display = "block";
                containerInfo.style.display = "flex";

                botaoExcluir.style.display = "flex";
                botaoConcluir.style.display = "flex";

                botaoCancelar.remove();
                botaoSalvar.replaceWith(botaoEditar);
                salvarTarefas();
            }
            
        })
        
    })

    
    container.appendChild(botaoEditar);
}



function criarAnotacao (tarefa) {
    
    const novoItem = document.createElement("li");
    
    const novoTitulo = document.createElement("h4");

    const novaData = document.createElement("p");
    const rotuloData = document.createElement("span");
    
    const novaConcluida = document.createElement("p");
    const rotuloConcluida = document.createElement("span");

    const novaHoras = document.createElement("p");
    const rotuloHoras = document.createElement("span");
    
    novoTitulo.textContent = tarefa.titulo;

    novaData.textContent = tarefa.data;
    rotuloData.textContent = "📅 Data";

    if (tarefa.concluida) {
        novaConcluida.textContent = "Concluída";
    } else {
        novaConcluida.textContent = "Pendente";
    }
    rotuloConcluida.textContent = "🎯 Estado"

    novaHoras.textContent = tarefa.horas + " horas";
    rotuloHoras.textContent = "⏱️ Horas"

    novoItem.appendChild(novoTitulo);

    const dataInfos = document.createElement("div");
    dataInfos.classList.add("dataInfos");

    dataInfos.appendChild(rotuloData);
    dataInfos.appendChild(novaData);

    const conclusaoInfos = document.createElement("div");
    conclusaoInfos.classList.add("conclusaoInfos");

    conclusaoInfos.appendChild(rotuloConcluida);
    conclusaoInfos.appendChild(novaConcluida);

    const horasInfos = document.createElement("div");
    horasInfos.classList.add("horasInfos");

    horasInfos.appendChild(rotuloHoras);
    horasInfos.appendChild(novaHoras);

    const containerInfo = document.createElement("div");
    containerInfo.classList.add("task-info");

    containerInfo.appendChild(dataInfos);
    containerInfo.appendChild(conclusaoInfos);
    containerInfo.appendChild(horasInfos);

    novoItem.appendChild(containerInfo);

    const container = document.createElement("div");
    container.classList.add("task-buttons");
    novoItem.appendChild(container);

    configurarConclusao(tarefa, novaConcluida, container);
    configurarExclusao(tarefa, novoItem, container);
    configurarEdicao(tarefa, novoTitulo, novaData, novaHoras, container, containerInfo);

    lista.appendChild(novoItem);
    
}

function validacoes (titulo, data, horas) {

    if (titulo.trim() === "") {
        alert("Digite um título para tarefa!");
        return false;
    }

    if (data.trim() === "") {
        alert("Digite uma data para tarefa!");
        return false;
    }

    if (horas === "" || Number(horas) < 1) {
        alert("Digite quantas horas foram submetidas para tarefa!");
        return false;
    }

    return true;

}

function novoCard () {

    if (validacoes(cardtitle.value, data.value, horas.value)) {

        const concluida = seletorStatus.value === "true";

        const novaTarefa = {
            titulo: cardtitle.value,
            data: data.value,
            concluida: concluida,
            horas: Number(horas.value)
        };

        tarefas.push(novaTarefa);
        salvarTarefas();
        criarAnotacao(novaTarefa);

        cardtitle.value = "";

        data.value = "";

        horas.value = "";

    }

}

function limparLista() {
    lista.innerHTML = "";
}

function pesquisarTarefas() {
    const tarefasFiltradas = tarefas.filter (function(tarefa) {
        return tarefa.titulo.trim().toLowerCase().includes(pesquisa.value.trim().toLowerCase());
    });

    renderizarTarefas(tarefasFiltradas);
}


pesquisa.addEventListener("input", pesquisarTarefas);


botao.addEventListener("click", novoCard);




