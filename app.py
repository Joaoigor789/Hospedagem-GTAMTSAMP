from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import hashlib
import os

app = Flask(__name__)
DB_NAME = 'banco.db'

def criar_tabela():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        primeiro_nome TEXT NOT NULL,
        ultimo_nome TEXT NOT NULL,
        endereco TEXT,
        cidade TEXT,
        estado TEXT,
        pais TEXT,
        cep TEXT,
        telefone_residencial TEXT,
        celular TEXT,
        email_primario TEXT NOT NULL,
        email_secundario TEXT
    )
    ''')
    conn.commit()
    conn.close()

def hash_senha(senha):
    return hashlib.sha256(senha.encode('utf-8')).hexdigest()

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/styles.css')
def css():
    return send_from_directory('.', 'styles.css')

@app.route('/script.js')
def js():
    return send_from_directory('.', 'script.js')

@app.route('/client/<path:path>')
def send_client(path):
    return send_from_directory('client', path)

@app.route('/register', methods=['POST'])
def register():
    dados = request.get_json()
    if not dados:
        return jsonify(success=False, message="Nenhum dado recebido")

    try:
        usuario = dados['usuario']
        senha = hash_senha(dados['senha'])
        primeiro_nome = dados['primeiroNome']
        ultimo_nome = dados['ultimoNome']
        endereco = dados.get('endereco', '')
        cidade = dados.get('cidade', '')
        estado = dados.get('estado', '')
        pais = dados.get('pais', '')
        cep = dados.get('cep', '')
        telefone_residencial = dados.get('telefoneResidencial', '')
        celular = dados.get('celular', '')
        email_primario = dados['emailPrimario']
        email_secundario = dados.get('emailSecundario', '')

        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()

        cursor.execute('''
        INSERT INTO usuarios (
            usuario, senha, primeiro_nome, ultimo_nome, endereco, cidade, estado, pais, cep,
            telefone_residencial, celular, email_primario, email_secundario
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            usuario, senha, primeiro_nome, ultimo_nome, endereco, cidade, estado, pais, cep,
            telefone_residencial, celular, email_primario, email_secundario
        ))

        conn.commit()
        conn.close()
        return jsonify(success=True)
    except sqlite3.IntegrityError:
        return jsonify(success=False, message="Usuário já existe")
    except Exception as e:
        return jsonify(success=False, message=str(e))

@app.route('/login', methods=['POST'])
def login():
    dados = request.get_json()
    if not dados:
        return jsonify(success=False, message="Nenhum dado recebido")

    usuario = dados.get('usuario')
    senha = dados.get('senha')

    if not usuario or not senha:
        return jsonify(success=False, message="Usuário e senha são obrigatórios")

    senha_hash = hash_senha(senha)

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE usuario = ? AND senha = ?", (usuario, senha_hash))
    user = cursor.fetchone()
    conn.close()

    if user:
        # Redireciona para área do cliente
        return jsonify(success=True, redirect="/client/areadoclient.html")
    else:
        return jsonify(success=False, message="Usuário ou senha inválidos")

if __name__ == '__main__':
    if not os.path.exists(DB_NAME):
        criar_tabela()
    app.run(debug=True)
