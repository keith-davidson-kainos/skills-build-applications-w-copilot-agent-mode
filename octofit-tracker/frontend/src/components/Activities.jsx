import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeItems } from '../apiConfig.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/activities/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setActivities(normalizeItems(data));
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
        <p className="text-muted">Loading activities…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-4">
        <div className="alert alert-danger">Failed to load activities: {error}</div>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <div className="app-shell p-4">
        <h2 className="mb-4">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Activity Type</th>
                <th>Duration (min)</th>
                <th>Calories Burned</th>
                <th>Completed At</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-3">
                    No activities found.
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity._id}>
                    <td>{activity.user?.name ?? activity.user ?? '—'}</td>
                    <td>{activity.activityType}</td>
                    <td>{activity.durationMinutes}</td>
                    <td>{activity.caloriesBurned ?? 0}</td>
                    <td>
                      {activity.completedAt
                        ? new Date(activity.completedAt).toLocaleString()
                        : '—'}
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

export default Activities;
