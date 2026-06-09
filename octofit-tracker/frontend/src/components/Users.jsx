import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeItems } from '../apiConfig.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/users/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUsers(normalizeItems(data));
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
        <p className="text-muted">Loading users…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-4">
        <div className="alert alert-danger">Failed to load users: {error}</div>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <div className="app-shell p-4">
        <h2 className="mb-4">Users</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-3">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {user.profileImageUrl ? (
                        <img
                          src={user.profileImageUrl}
                          alt={user.name}
                          className="rounded-circle"
                          width={36}
                          height={36}
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <span className="badge bg-secondary rounded-circle p-2">
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </td>
                    <td className="fw-semibold">{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
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

export default Users;
