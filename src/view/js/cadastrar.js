const form = document.querySelector("#cadastro1");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    try {
        const res = await fetch("http://localhost:3000/api/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        if (res.ok) {
            alert("CADASTRO REALIZADO COM SUCESSO!");
            window.location.href = "telaCadastro.html";
        } else {
            const data = await res.json();
            alert(data.message || "Erro ao fazer login");
        }
    } catch (error) {
        alert("Erro na requisição: " + error.message);
    }
});

