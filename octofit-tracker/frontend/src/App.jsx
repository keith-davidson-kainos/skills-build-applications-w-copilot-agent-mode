import { Link, Route, Routes } from 'react-router-dom';
import octofitLogo from '../../../docs/octofitapp-small.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (() => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  if (window.location.hostname.endsWith('.app.github.dev')) {
    return `https://${window.location.hostname.replace('-5173.', '-8000.')}`;
  }

  return 'http://localhost:8000';
})();

function Dashboard() {
  return (
    <main className="container py-4">
      <section className="app-shell p-4 p-md-5">
        <div className="row align-items-center g-4">
          <div className="col-md-7">
            <p className="text-uppercase text-primary fw-semibold small mb-2">OctoFit Tracker</p>
            <h1 className="display-6 fw-bold mb-3">Track activity, teams, and workout progress.</h1>
            <p className="lead text-secondary mb-4">
              A modern multi-tier foundation for authentication, activity logging, leaderboards,
              team management, and personalized workout suggestions.
            </p>
            <a className="btn btn-primary btn-lg" href={`${API_BASE_URL}/api/health`}>
              Check API Health
            </a>
          </div>
          <div className="col-md-5 text-center">
            <img className="app-logo img-fluid" src={octofitLogo} alt="OctoFit app logo" />
          </div>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">OctoFit Tracker</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;