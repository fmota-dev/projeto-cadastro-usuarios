import { useEffect, useState, useRef } from 'react';
import './style.css';
import Trash from '../../assets/trash.svg';
import api from '../../services/api';

function Home() {
	const [users, setUsers] = useState([]);

	const inputName = useRef();
	const inputAge = useRef();
	const inputEmail = useRef();

	async function createUser() {
		await api.post('/usuarios', {
			name: inputName.current.value,
			age: Number(inputAge.current.value),
			email: inputEmail.current.value,
		});
		inputName.current.value = '';
		inputAge.current.value = '';
		inputEmail.current.value = '';
		getUsers();
	}

	async function getUsers() {
		const response = await api.get('/usuarios');
		setUsers(response.data);
	}

	async function deleteUser(id) {
		await api.delete(`/usuarios/${id}`);
		getUsers();
	}

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div className="container">
			<form action="">
				<h1>Cadastro de Usuários</h1>
				<label htmlFor="name">Nome:</label>
				<input
					type="text"
					id="name"
					placeholder="Digite seu nome"
					ref={inputName}
				/>
				<label htmlFor="age">Idade:</label>
				<input
					type="number"
					id="age"
					placeholder="Digite sua idade"
					ref={inputAge}
				/>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					placeholder="Digite seu e-mail"
					ref={inputEmail}
				/>
				<button type="button" onClick={createUser}>
					Cadastrar
				</button>
			</form>

			<div className="container-cards">
				{users.map((user) => (
					<div key={user.id} className="card">
						<ul>
							<li>
								Nome: <span>{user.name}</span>
							</li>
							<li>
								Idade: <span>{user.age}</span>
							</li>
							<li>
								Email: <span>{user.email}</span>
							</li>
						</ul>
						<button onClick={() => deleteUser(user.id)}>
							<img src={Trash} alt="Excluir" />
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;
