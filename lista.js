class Node {
    constructor(produto) {
        this.produto = produto;
        this.next = null;
        this.prev = null;
    }
}

class Lista {
    constructor() {
        this.head = null;
    }

    inserirProduto(produto) {
        const novoNode = new Node(produto);

        if (!this.head) {
            this.head = novoNode;
            novoNode.next = novoNode;
            novoNode.prev = novoNode;
        } else {
            const ultimo = this.head.prev;
            novoNode.next = this.head;
            novoNode.prev = ultimo;
            ultimo.next = novoNode;
            this.head.prev = novoNode;
        }

        this.exibirMensagem("Produto inserido com sucesso!");
        this.imprimirLista();
    }

    excluirProduto(nome) {
        if (!this.head) {
            this.exibirMensagem("A lista está vazia. Nenhum produto para excluir.");
            return;
        }

        let atual = this.head;
        let anterior = null;

        do {
            if (atual.produto.nome === nome) {
                if (atual === this.head && atual.next === this.head) {
                    this.head = null;
                } else {
                    anterior = atual.prev;
                    anterior.next = atual.next;
                    atual.next.prev = anterior;

                    if (atual === this.head) {
                        this.head = atual.next;
                    }
                }

                this.exibirMensagem("Produto excluído com sucesso!");
                this.imprimirLista();
                return;
            }

            atual = atual.next;
        } while (atual !== this.head);

        this.exibirMensagem("Produto não encontrado.");
    }

    buscarProduto(nome) {
        if (!this.head) {
            this.exibirMensagem("A lista está vazia. Nenhum produto para consultar.");
            return null;
        }

        let atual = this.head;

        do {
            if (atual.produto.nome === nome) {
                this.exibirProdutoEncontrado(atual.produto);
                return atual.produto;
            }

            atual = atual.next;
        } while (atual !== this.head);

        this.exibirMensagem("Produto não encontrado.");
        return null;
    }

    exibirProdutoEncontrado(produto) {
        const produtoEncontradoDiv = document.getElementById("mensagem");
        produtoEncontradoDiv.innerHTML = `Produto encontrado: ${produto.nome}, Preço: ${produto.preco}`;

        setTimeout(() => {
            produtoEncontradoDiv.innerHTML = "";
        }, 4000);
    }

    imprimirLista() {
        const listaDiv = document.getElementById("lista");
        listaDiv.innerHTML = "";

        if (!this.head) {
            this.exibirMensagem("A lista está vazia.");
            return;
        }

        let atual = this.head;

        do {
            this.exibirProduto(atual.produto);
            atual = atual.next;
        } while (atual !== this.head);
    }

    imprimirListaInvertida() {
        const listaDiv = document.getElementById("lista");
        listaDiv.innerHTML = "";

        if (!this.head) {
            this.exibirMensagem("A lista está vazia.");
            return;
        }

        let atual = this.head.prev;

        do {
            this.exibirProduto(atual.produto);
            atual = atual.prev;
        } while (atual !== this.head.prev);
    }

    exibirProduto(produto) {
        const listaDiv = document.getElementById("lista");
        const produtoDiv = document.createElement("div");
        produtoDiv.innerText = `Nome: ${produto.nome}, Preço: ${produto.preco}`;
        listaDiv.appendChild(produtoDiv);
    }

    exibirMensagem(mensagem) {
        const mensagemDiv = document.getElementById("mensagem");
        mensagemDiv.innerText = mensagem;

        setTimeout(() => {
            mensagemDiv.innerText = "";
        }, 3000);
    }
}

function inserirProduto() {
    const nome = prompt("Nome do produto:");
    const preco = parseFloat(prompt("Preço do produto:"));

    if (!isNaN(preco)) {
        const produto = { nome, preco };
        lista.inserirProduto(produto);
    } else {
        alert("Por favor, insira um preço válido.");
    }
}

function consultarProduto() {
    const nome = prompt("Nome do produto a ser consultado:");

    if (nome) {
        const produtoEncontrado = lista.buscarProduto(nome);
        if (produtoEncontrado) {
            lista.exibirProdutoEncontrado(produtoEncontrado);
        }
    } else {
        alert("Por favor, insira um nome válido.");
    }
}

function excluirProduto() {
    const nome = prompt("Nome do produto a ser excluído:");

    if (nome) {
        lista.excluirProduto(nome);
    } else {
        alert("Por favor, insira um nome válido.");
    }
}

function imprimirLista() {
    lista.imprimirLista();
}

function imprimirListaInvertida() {
    lista.imprimirListaInvertida();
}

function toggleLista() {
    const listaDiv = document.getElementById("lista");
    listaDiv.style.display = listaDiv.style.display === "none" ? "block" : "none";
}

const lista = new Lista();
