const form = document.querySelector("#cadastro1");
const cadastroBtn = document.querySelector("#CadastroBtn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelector("#nome").value
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#senha").value;

    try {
        const res = await fetch("http://localhost:3000/api/usuarios",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        if (res.ok) {
            alert("CADASTRO REALIZADO COM SUCESSO!");
            window.location.href = "./telaLogin.html";
        } else {
            const data = await res.json();
            alert(data.message || "Erro ao cadastrar");
        }
    } catch (error) {
        alert("Erro na requisição: " + error.message);
    }
});

