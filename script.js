const receitas = [
  {
    nome: "Macarrão ao molho de tomate",
    emoji: "🍝",
    descricao: "Uma receita rápida, simples e saborosa para o almoço ou jantar.",
    ingredientes: [
      "250 g de macarrão",
      "2 tomates",
      "1 colher de sopa de azeite",
      "1 dente de alho",
      "Sal a gosto"
    ],
    preparo: "Cozinhe o macarrão. Prepare o molho com tomate, alho e azeite. Misture o molho ao macarrão e sirva."
  },
  {
    nome: "Panqueca de banana",
    emoji: "🥞",
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
const imagemReceita = document.querySelector(".imagem-receita");
const mensagem = document.getElementById("mensagem");

function mostrarReceita() {
  const receita = receitas[indice];

  nomeReceita.textContent = receita.nome;
  descricaoReceita.textContent = receita.descricao;
  imagemReceita.textContent = receita.emoji;
  modoPreparo.textContent = receita.preparo;

  ingredientes.innerHTML = "";

  receita.ingredientes.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ingredientes.appendChild(li);
  });

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
  mensagem.textContent = salva
    ? "Receita salva."
    : "Receita removida dos favoritos.";
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

document.getElementById("buscar").addEventListener("click", () => {
  const termo = document.getElementById("busca").value.trim().toLowerCase();

  if (!termo) {
    mensagem.textContent = "Digite o nome de uma receita.";
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
});

mostrarReceita();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}
