import './App.css';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

function App(): JSX.Element {
	return (
		<Layout>
			<Home />
		</Layout>
	);
}

export default App;
