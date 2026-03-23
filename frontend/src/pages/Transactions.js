import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

export default function Transactions() {
  const { user } = useAuth();
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    API.get('/transactions/history').then(({ data }) => setTxns(data));
  }, []);

  return (
    <div className="page">
      <h2>Transaction History</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>From / To</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {txns.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center', color: '#aaa' }}>No transactions yet</td></tr>
            )}
            {txns.map(t => (
              <tr key={t._id}>
                <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                <td><span className={`badge badge-${t.type}`}>{t.type}</span></td>
                <td style={{ fontWeight: 600, color: t.sender?._id === user?.id ? '#c62828' : '#2e7d32' }}>
                  {t.sender?._id === user?.id ? '−' : '+'}₹{t.amount}
                </td>
                <td>
                  {t.type === 'transfer'
                    ? (t.sender?._id === user?.id ? `To: ${t.receiver?.name}` : `From: ${t.sender?.name}`)
                    : t.type === 'deposit' ? 'Self Deposit' : 'Self Withdrawal'}
                </td>
                <td>{t.description || '—'}</td>
                <td><span className="badge badge-success">{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
