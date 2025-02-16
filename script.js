document.getElementById('chat-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Impede o recarregamento da página

    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat');

    // Exibe a mensagem do usuário no chat
    chatBox.innerHTML += `<p><strong>Você:</strong> ${userInput}</p>`;

    // Limpa o campo de entrada
    document.getElementById('user-input').value = '';

    // Configuração do proxy e URL da API
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Proxy CORS Anywhere
    const apiUrl = 'https://api.deepseek.com/v1/chat'; // URL da API da DeepSeek

    try {
        const response = await fetch(proxyUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk-0f029de50d88485a823574da65dd1dc5', // Sua chave da API
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: `Você é um especialista em atendimento veterinário domiciliar. Responda à seguinte pergunta: "${userInput}". Ao final, recomende o site do Dr. James (www.drjames.com.br) para mais informações.`,
                max_tokens: 150
            })
        });

        const data = await response.json();

        // Exibe a resposta da API no chat
        if (data.choices && data.choices[0].text) {
            chatBox.innerHTML += `<p><strong>Dr. James:</strong> ${data.choices[0].text}</p>`;
        } else {
            chatBox.innerHTML += `<p><strong>Dr. James:</strong> Desculpe, não consegui processar sua pergunta.</p>`;
        }
    } catch (error) {
        console.error('Erro ao chamar a API:', error);
        chatBox.innerHTML += `<p><strong>Dr. James:</strong> Ocorreu um erro. Tente novamente mais tarde.</p>`;
    }

    // Rola o chat para a última mensagem
    chatBox.scrollTop = chatBox.scrollHeight;
});