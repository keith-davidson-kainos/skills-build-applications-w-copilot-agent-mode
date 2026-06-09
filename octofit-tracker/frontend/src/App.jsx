import { Link, NavLink, Route, Routes } from 'react-router-dom';
import octofitLogo from '../../../docs/octofitapp-small.png';
import { API_BASE_URL } from './apiConfig.js';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

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
            <div className="d-flex flex-wrap gap-2">
              <Link className="btn btn-primary btn-lg" to="/activities">Get Started</Link>
              <a className="btn btn-outline-secondary btn-lg" href={`${API_BASE_URL}/api/health`} target="_blank" rel="noreferrer">
                Check API Health
              </a>
            </div>
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
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </>
  );
}

export default App;