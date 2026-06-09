import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeItems } from '../apiConfig.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API_BASE_URL is defined in apiConfig.js and points to the backend server -8000.app.github.dev/api/activities
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/teams/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTeams(normalizeItems(data));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="container py-4">
        <p className="text-muted">Loading teams…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-4">
        <div className="alert alert-danger">Failed to load teams: {error}</div>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <div className="app-shell p-4">
        <h2 className="mb-4">Teams</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-muted py-3">
                    No teams found.
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr key={team._id}>
                    <td className="fw-semibold">{team.name}</td>
                    <td>{team.description ?? <span className="text-muted">—</span>}</td>
                    <td>
                      <span className="badge bg-secondary">
                        {Array.isArray(team.members) ? team.members.length : 0}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Teams;
