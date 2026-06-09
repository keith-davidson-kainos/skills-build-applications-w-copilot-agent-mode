import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeItems } from '../apiConfig.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API_BASE_URL is defined in apiConfig.js and points to the backend server -8000.app.github.dev/api/leaderboard
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/leaderboard/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setEntries(normalizeItems(data));
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
        <p className="text-muted">Loading leaderboard…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-4">
        <div className="alert alert-danger">Failed to load leaderboard: {error}</div>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <div className="app-shell p-4">
        <h2 className="mb-4">Leaderboard</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-3">
                    No leaderboard entries found.
                  </td>
                </tr>
              ) : (
                entries.map((entry, index) => (
                  <tr key={entry._id}>
                    <td>
                      <span className="fw-semibold">{entry.rank ?? index + 1}</span>
                    </td>
                    <td>{entry.user?.name ?? entry.user ?? '—'}</td>
                    <td>{entry.team?.name ?? entry.team ?? '—'}</td>
                    <td>{entry.score}</td>
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

export default Leaderboard;
