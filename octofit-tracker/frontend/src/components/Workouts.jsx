import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeItems } from '../apiConfig.js';

const DIFFICULTY_BADGE = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'danger',
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API_BASE_URL is defined in apiConfig.js and points to the backend server -8000.app.github.dev/api/activities
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/workouts/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setWorkouts(normalizeItems(data));
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
        <p className="text-muted">Loading workouts…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-4">
        <div className="alert alert-danger">Failed to load workouts: {error}</div>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <div className="app-shell p-4">
        <h2 className="mb-4">Workouts</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Difficulty</th>
                <th>Est. Minutes</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-3">
                    No workouts found.
                  </td>
                </tr>
              ) : (
                workouts.map((workout) => (
                  <tr key={workout._id}>
                    <td className="fw-semibold">{workout.title}</td>
                    <td>{workout.description ?? <span className="text-muted">—</span>}</td>
                    <td>
                      <span
                        className={`badge bg-${DIFFICULTY_BADGE[workout.difficulty] ?? 'secondary'}`}
                      >
                        {workout.difficulty ?? '—'}
                      </span>
                    </td>
                    <td>{workout.estimatedMinutes}</td>
                    <td>
                      {Array.isArray(workout.tags) && workout.tags.length > 0
                        ? workout.tags.map((tag) => (
                            <span key={tag} className="badge bg-light text-dark me-1">
                              {tag}
                            </span>
                          ))
                        : <span className="text-muted">—</span>}
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

export default Workouts;
