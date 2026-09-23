const API_URL = "http://localhost:3000/musicas";

const formulario = document.querySelector("#form-musica");
const campoId = document.querySelector("#musica-id");
const campoTitulo = document.querySelector("#titulo");
const campoArtista = document.querySelector("#artista");
const campoAno = document.querySelector("#ano");
const campoGenero = document.querySelector("#genero");
const tituloFormulario = document.querySelector("#titulo-formulario");
const botaoSalvar = document.querySelector("#botao-salvar");
const botaoCancelar = document.querySelector("#botao-cancelar");
const listaMusicas = document.querySelector("#lista-musicas");
const mensagem = document.querySelector("#mensagem");
const formularioBusca = document.querySelector("#form-busca");
const campoBuscaId = document.querySelector("#busca-id");

async function fazerRequisicao(url, opcoes = {}) {
  const resposta = await fetch(url, opcoes);

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.mensagem || "Não foi possível concluir a operação");
  }

  if (resposta.status === 204) {
    return null;
  }

  return resposta.json();
}

function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.classList.toggle("erro", erro);
}

function criarCartaoMusica(musica) {
  const cartao = document.createElement("article");
  cartao.className = "musica";

  const titulo = document.createElement("h3");
  titulo.textContent = musica.titulo;

  const artista = document.createElement("p");
  artista.textContent = `Artista/Banda: ${musica.artista}`;

  const ano = document.createElement("p");
  ano.textContent = `Ano: ${musica.ano ?? "Não informado"}`;

  const genero = document.createElement("p");
  genero.textContent = `Gênero: ${musica.genero ?? "Não informado"}`;

  const id = document.createElement("p");
  id.textContent = `ID: ${musica._id}`;

  const acoes = document.createElement("div");
  acoes.className = "acoes-musica";

  const botaoEditar = document.createElement("button");
  botaoEditar.type = "button";
  botaoEditar.textContent = "Editar";
  botaoEditar.addEventListener("click", () => carregarMusicaParaEdicao(musica._id));

  const botaoExcluir = document.createElement("button");
  botaoExcluir.type = "button";
  botaoExcluir.className = "perigo";
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.addEventListener("click", () => excluirMusica(musica._id));

  acoes.append(botaoEditar, botaoExcluir);
  cartao.append(titulo, artista, ano, genero, id, acoes);

  return cartao;
}

function exibirMusicas(musicas) {
  listaMusicas.innerHTML = "";

  if (musicas.length === 0) {
    mostrarMensagem("Nenhuma música cadastrada");
    return;
  }

  musicas.forEach((musica) => {
    listaMusicas.appendChild(criarCartaoMusica(musica));
  });

  mostrarMensagem(`${musicas.length} música(s) encontrada(s)`);
}

async function listarMusicas() {
  try {
    mostrarMensagem("Carregando músicas...");
    const musicas = await fazerRequisicao(API_URL);
    exibirMusicas(musicas);
  } catch (erro) {
    listaMusicas.innerHTML = "";
    mostrarMensagem(erro.message, true);
  }
}

async function buscarMusicaPorId(id) {
  const musica = await fazerRequisicao(`${API_URL}/${id}`);
  exibirMusicas([musica]);
  return musica;
}

async function salvarMusica(evento) {
  evento.preventDefault();

  const musica = {
    titulo: campoTitulo.value.trim(),
    artista: campoArtista.value.trim(),
    genero: campoGenero.value.trim()
  };

  if (campoAno.value !== "") {
    musica.ano = Number(campoAno.value);
  }

  const id = campoId.value;
  const estaEditando = Boolean(id);
  const url = estaEditando ? `${API_URL}/${id}` : API_URL;
  const metodo = estaEditando ? "PUT" : "POST";

  try {
    await fazerRequisicao(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(musica)
    });

    limparFormulario();
    mostrarMensagem(estaEditando ? "Música atualizada" : "Música cadastrada");
    await listarMusicas();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

async function carregarMusicaParaEdicao(id) {
  try {
    const musica = await fazerRequisicao(`${API_URL}/${id}`);

    campoId.value = musica._id;
    campoTitulo.value = musica.titulo;
    campoArtista.value = musica.artista;
    campoAno.value = musica.ano ?? "";
    campoGenero.value = musica.genero ?? "";

    tituloFormulario.textContent = "Editar música";
    botaoSalvar.textContent = "Salvar alterações";
    botaoCancelar.classList.remove("oculto");
    campoTitulo.focus();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

async function excluirMusica(id) {
  const confirmou = window.confirm("Deseja excluir esta música?");

  if (!confirmou) {
    return;
  }

  try {
    await fazerRequisicao(`${API_URL}/${id}`, { method: "DELETE" });
    limparFormulario();
    mostrarMensagem("Música excluída");
    await listarMusicas();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

function limparFormulario() {
  formulario.reset();
  campoId.value = "";
  tituloFormulario.textContent = "Nova música";
  botaoSalvar.textContent = "Cadastrar";
  botaoCancelar.classList.add("oculto");
}

formulario.addEventListener("submit", salvarMusica);
botaoCancelar.addEventListener("click", limparFormulario);
document.querySelector("#botao-atualizar").addEventListener("click", listarMusicas);
document.querySelector("#botao-limpar-busca").addEventListener("click", () => {
  campoBuscaId.value = "";
  listarMusicas();
});

formularioBusca.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const id = campoBuscaId.value.trim();

  if (!id) {
    mostrarMensagem("Informe um ID para realizar a busca", true);
    return;
  }

  try {
    await buscarMusicaPorId(id);
  } catch (erro) {
    listaMusicas.innerHTML = "";
    mostrarMensagem(erro.message, true);
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

listarMusicas();
