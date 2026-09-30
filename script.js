function deslocar_palavra(palavra) {
    const resultado = [];
    const etapas = [];

    for (let i = 0; i < palavra.length; i++) {
        const letra = palavra[i];
        const indice = i + 1;

        if ('A' <= letra && letra <= 'Z') {
            const proxima = String.fromCharCode(((letra.charCodeAt(0) - 65 + 1) % 26) + 65);
            resultado.push(proxima);
            etapas.push(`Etapa ${indice}: Letra '${letra}' (maiúscula) -> Próxima: '${proxima}'`);
        } else if ('a' <= letra && letra <= 'z') {
            const proxima = String.fromCharCode(((letra.charCodeAt(0) - 97 + 1) % 26) + 97);
            resultado.push(proxima);
            etapas.push(`Etapa ${indice}: Letra '${letra}' (minúscula) -> Próxima: '${proxima}'`);
        } else {
            resultado.push(letra);
            etapas.push(`Etapa ${indice}: Símbolo '${letra}' -> Mantido sem alteração`);
        }
    }

    return {
        palavraFinal: resultado.join(''),
        etapas
    };
}

function processar() {
    const input = document.getElementById('palavraInput');
    const palavra = input.value;

    if (palavra === '') {
        alert('Digite uma palavra antes de processar.');
        return;
    }

    const { palavraFinal, etapas } = deslocar_palavra(palavra);

    document.getElementById('palavraOriginal').textContent = palavra;
    document.getElementById('palavraFinal').textContent = palavraFinal;

    const container = document.getElementById('etapasContainer');
    container.innerHTML = '';

    etapas.forEach((etapa) => {
        const item = document.createElement('div');
        item.className = 'etapa';
        item.innerHTML = `<strong>${etapa.split(' -> ')[0]}</strong> -> ${etapa.split(' -> ')[1] || ''}`;
        container.appendChild(item);
    });

    document.getElementById('resultados').style.display = 'block';
}

document.getElementById('palavraInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        processar();
    }
});
