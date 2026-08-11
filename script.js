const receitas = [
  {
    nome: "Macarrão ao molho de tomate",
    emoji: "🍝",
    textoAlternativo: "Prato de macarrão com molho de tomate",
    descricao: "Uma receita rápida, simples e saborosa para o almoço ou jantar.",
    ingredientes: [
      "250 g de macarrão",
      "2 tomatoes",
      "1 colher de sopa de azeite",
      "1 dente de alho",
      "Sal a gosto"
    ],
    preparo: "Cozinhe o macarrão. Prepare o molho com tomate, alho e azeite. Misture o molho ao macarrão e sirva."
  },
  {
    nome: "Panqueca de banana",
    emoji: "🥞",
    textoAlternativo: "Pilha de panquecas com mel",
    descricao: "Uma opção rápida para o café da manhã ou lanche.",
    ingredientes: [
      "1 banana",
      "1 ovo",
      "3 colheres de sopa de aveia",
      "Canela a gosto"
    ],
    preparo: "Amasse a banana, misture os ingredientes e prepare pequenas porções em uma frigideira."
  },
  {
    nome: "Salada colorida",
    emoji: "🥗",
    textoAlternativo: "Tigela de salada verde com vegetais picados",
    descricao: "Uma salada simples, fresca e cheia de cores.",
    ingredientes: [
      "1 tomate",
      "1 cenoura",
      "Folhas de alface",
      "Milho a gosto",
      "Azeite e sal"
    ],
    preparo: "Lave e corte os ingredientes. Misture tudo em uma tigela e tempere a gosto."
  }
];

let indice = 0;
let salva = false;

const nomeReceita = document.getElementById("nome-receita");
const descricaoReceita = document.getElementById("descricao-receita");
const ingredientes = document.getElementById("ingredientes");
const modoPreparo = document.getElementById("modo-preparo");
const imagemReceita = document.getElementById("imagem-receita");
const mensagem = document.getElementById("mensagem");
const botaoSalvar = document.getElementById("salvar");

function mostrarReceita() {
  const receita = receitas[indice];

  nomeReceita.textContent = receita.nome;
  descricaoReceita.textContent = receita.descricao;
  
  // Atualiza o emoji e define a descrição acessível para o leitor de tela
  imagemReceita.textContent = receita.emoji;
  imagemReceita.setAttribute("aria-label", receita.textoAlternativo);
  
  modoPreparo.textContent = receita.preparo;

  ingredientes.innerHTML = "";
  receita.ingredientes.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ingredientes.appendChild(li);
  });

  // Reseta o estado do botão "Salvar" ao mudar de receita
  salva = false;
  botaoSalvar.setAttribute("aria-pressed", "false");
  botaoSalvar.setAttribute("aria-label", "Adicionar receita aos favoritos");
  botaoSalvar.textContent = "♡";
  
  mensagem.textContent = "";
}

document.getElementById("anterior").addEventListener("click", () => {
  indice = (indice - 1 + receitas.length) % receitas.length;
  mostrarReceita();
});

document.getElementById("proxima").addEventListener("click", () => {
  indice = (indice + 1) % receitas.length;
  mostrarReceita();
});

document.getElementById("salvar").addEventListener("click", () => {
  salva = !salva;
  
  // Modifica o estado acessível do botão dinamicamente
  if (salva) {
    botaoSalvar.setAttribute("aria-pressed", "true");
    botaoSalvar.setAttribute("aria-label", "Remover receita dos favoritos");
    botaoSalvar.textContent = "♥";
    mensagem.textContent = "Receita salva nos favoritos.";
  } else {
    botaoSalvar.setAttribute("aria-pressed", "false");
    botaoSalvar.setAttribute("aria-label", "Adicionar receita aos favoritos");
    botaoSalvar.textContent = "♡";
    mensagem.textContent = "Receita removida dos favoritos.";
  }
});

document.getElementById("compartilhar").addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: nomeReceita.textContent,
        text: descricaoReceita.textContent,
        url: window.location.href
      });
    } catch (erro) {
      // O usuário pode simplesmente cancelar o compartilhamento.
    }
  } else {
    mensagem.textContent = "O compartilhamento não está disponível neste navegador.";
  }
});

document.getElementById("buscar").addEventListener("click", executarBusca);

// Permite buscar também ao apertar a tecla "Enter" no teclado numérico/virtual
document.getElementById("busca").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    executarBusca();
  }
});

function executarBusca() {
  const termo = document.getElementById("busca").value.trim().toLowerCase();

  if (!termo) {
    mensagem.textContent = "Digite o nome de uma receita para buscar.";
    return;
  }

  const encontrada = receitas.find((receita) =>
    receita.nome.toLowerCase().includes(termo)
  );

  if (!encontrada) {
    mensagem.textContent = "Receita não encontrada.";
    return;
  }

  indice = receitas.indexOf(encontrada);
  mostrarReceita();
  mensagem.textContent = `Receita encontrada: ${encontrada.nome}.`;
}

// Inicializa a aplicação exibindo a primeira receita
mostrarReceita();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(err => console.error("SW erro:", err));
  });
}