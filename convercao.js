async function convert() {
    const fromCurrency = document.getElementById("fromCurrency").value.toUpperCase();
    const toCurrency = document.getElementById("toCurrency").value.toUpperCase();
    const amount = document.getElementById("amount").value;

    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Por favor, insira uma quantia válida.");
        return;
    }

    if (fromCurrency.length !== 3 || toCurrency.length !== 3) {
        alert("Por favor, insira códigos de moeda válidos (ex: USD, EUR).");
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/5ccbc1ed01f06095972dbdb2/latest/${fromCurrency}`);
        const data = await response.json();

        if (data.result === "success") {
            const rate = data.conversion_rates[toCurrency];
            if (rate) {
                const convertedAmount = (amount * rate).toFixed(2);
                document.getElementById("result").innerText = `Resultado: ${convertedAmount} ${toCurrency}`;
            } else {
                alert("Taxa de câmbio não encontrada para a moeda selecionada.");
            }
        } else {
            alert(`Erro ao buscar taxas de câmbio: ${data['error-type']}`);
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
}