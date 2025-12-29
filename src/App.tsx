import { useSpotify } from './hooks/useSpotify';
import Player from './components/Player';

function App() {
  const { token, login } = useSpotify();

  return (
    <div className="App">
      {!token ? (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
            <button 
                onClick={login}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
            >
                Connect with Spotify
            </button>
        </div>
      ) : (
        <Player token={token} />
      )}
    </div>
  );
}

export default App;
