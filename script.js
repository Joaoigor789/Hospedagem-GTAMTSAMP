const btnRegistrar = document.getElementById('btnRegistrar');
const btnLogin = document.getElementById('btnLogin');
const formCadastro = document.getElementById('formCadastro');
const formLogin = document.getElementById('formLogin');
const secPlanos = document.getElementById('secPlanos');
const secContato = document.getElementById('secContato');
const secSobre = document.getElementById('secSobre');
const formRegistro = document.getElementById('formRegistro');
const formLoginForm = document.getElementById('formLoginForm');
const msgResposta = document.getElementById('msgResposta');
const msgLogin = document.getElementById('msgLogin');

function esconderSecoes() {
  secPlanos.style.display = 'none';
  secContato.style.display = 'none';
  secSobre.style.display = 'none';
}

function mostrarSecoes() {
  secPlanos.style.display = 'block';
  secContato.style.display = 'block';
  secSobre.style.display = 'block';
}

btnRegistrar.addEventListener('click', () => {
  if (formCadastro.style.display === 'none' || formCadastro.style.display === '') {
    formCadastro.style.display = 'block';
    btnRegistrar.textContent = 'Fechar Cadastro';
    btnLogin.textContent = 'Login';

    formLogin.style.display = 'none';
    msgLogin.textContent = '';

    esconderSecoes();
    formCadastro.scrollIntoView({behavior: 'smooth'});
  } else {
    formCadastro.style.display = 'none';
    btnRegistrar.textContent = 'Registrar';
    mostrarSecoes();
    msgResposta.textContent = '';
  }
});

btnLogin.addEventListener('click', () => {
  if (formLogin.style.display === 'none' || formLogin.style.display === '') {
    formLogin.style.display = 'block';
    btnLogin.textContent = 'Fechar Login';
    btnRegistrar.textContent = 'Registrar';

    formCadastro.style.display = 'none';
    msgResposta.textContent = '';

    esconderSecoes();
    formLogin.scrollIntoView({behavior: 'smooth'});
  } else {
    formLogin.style.display = 'none';
    btnLogin.textContent = 'Login';
    mostrarSecoes();
    msgLogin.textContent = '';
  }
});

// Envio do formulário de registro
formRegistro.addEventListener('submit', async (e) => {
  e.preventDefault();
  msgResposta.style.color = '#00ff99';
  msgResposta.textContent = 'Enviando...';

  const data = {
    usuario: formRegistro.usuario.value.trim(),
    senha: formRegistro.senha.value,
    primeiroNome: formRegistro.primeiroNome.value.trim(),
    ultimoNome: formRegistro.ultimoNome.value.trim(),
    endereco: formRegistro.endereco.value.trim(),
    cidade: formRegistro.cidade.value.trim(),
    estado: formRegistro.estado.value.trim(),
    pais: formRegistro.pais.value,
    cep: formRegistro.cep.value.trim(),
    telefoneResidencial: formRegistro.telefoneResidencial.value.trim(),
    celular: formRegistro.celular.value.trim(),
    emailPrimario: formRegistro.emailPrimario.value.trim(),
    emailSecundario: formRegistro.emailSecundario.value.trim()
  };

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.success) {
      msgResposta.style.color = '#00ff99';
      msgResposta.textContent = 'Cadastro realizado com sucesso!';
      formRegistro.reset();
    } else {
      msgResposta.style.color = '#ff5555';
      msgResposta.textContent = 'Erro: ' + (res.message || 'Falha ao cadastrar');
    }
  } catch (error) {
    msgResposta.style.color = '#ff5555';
    msgResposta.textContent = 'Erro de conexão.';
  }
});

// Envio do formulário de login
formLoginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    usuario: formLoginForm.usuario.value.trim(),
    senha: formLoginForm.senha.value
  };

  msgLogin.style.color = '#00ff99';
  msgLogin.textContent = 'Conectando...';

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    const res = await response.json();

    if(res.success){
      if(res.redirect){
        window.location.href = res.redirect;
      } else {
        msgLogin.style.color = '#00ff99';
        msgLogin.textContent = 'Login realizado com sucesso!';
        formLoginForm.reset();
      }
    } else {
      msgLogin.style.color = '#ff5555';
      msgLogin.textContent = 'Erro: ' + (res.message || 'Usuário ou senha inválidos');
    }
  } catch (error) {
    msgLogin.style.color = '#ff5555';
    msgLogin.textContent = 'Erro de conexão.';
  }
});
