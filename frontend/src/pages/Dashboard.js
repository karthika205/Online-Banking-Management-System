import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [modal, setModal] = useState('');
  const [form, setForm] = useState({ amount: '', description: '', accountNumber: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const refreshBalance = async () => {
    const { data } = await API.get('/users/profile');
    setUser(prev => ({ ...prev, balance: data.balance }));
    localStorage.setItem('user', JSON.stringify({ ...user, balance: data.balance }));
  };

  useEffect(() => { refreshBalance(); }, []);

  const handleAction = async (e) => {
    e.preventDefault();
    setMsg(''); setError('');
    try {
      let res;
      if (modal === 'deposit')   res = await API.post('/transactions/deposit',  { amount: form.amount, description: form.description });
      if (modal === 'withdraw')  res = await API.post('/transactions/withdraw', { amount: form.amount, description: form.description });
      if (modal === 'transfer')  res = await API.post('/transactions/transfer', { amount: form.amount, description: form.description, accountNumber: form.accountNumber });
      setMsg(res.data.message);
      setUser(prev => ({ ...prev, balance: res.data.balance }));
      localStorage.setItem('user', JSON.stringify({ ...user, balance: res.data.balance }));
      setForm({ amount: '', description: '', accountNumber: '' });
      setTimeout(() => { setModal(''); setMsg(''); }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="page">
      <h2>Welcome, {user?.name} 👋</h2>
      <div className="cards-grid">
        <div className="card">
          <h4>Account Balance</h4>
          <div className="amount">₹{user?.balance?.toFixed(2)}</div>
          <div className="label">Available Balance</div>
        </div>
        <div className="card">
          <h4>Account Number</h4>
          <div className="amount" style={{ fontSize: '1.2rem' }}>{user?.accountNumber}</div>
          <div className="label">Your Account ID</div>
        </div>
        <div className="card">
          <h4>Account Type</h4>
          <div className="amount" style={{ fontSize: '1.2rem', textTransform: 'capitalize' }}>{user?.role}</div>
          <div className="label">Account Role</div>
        </div>
      </div>

      <div className="actions">
        <button className="btn-action btn-deposit"  onClick={() => setModal('deposit')}>+ Deposit</button>
        <button className="btn-action btn-withdraw" onClick={() => setModal('withdraw')}>− Withdraw</button>
        <button className="btn-action btn-transfer" onClick={() => setModal('transfer')}>⇄ Transfer</button>
      </div>

      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{modal.charAt(0).toUpperCase() + modal.slice(1)}</h3>
            {msg   && <p className="success">{msg}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleAction}>
              <div className="form-group">
                <label>Amount (₹)</label>
                <input type="number" min="1" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required />
              </div>
              {modal === 'transfer' && (
                <div className="form-group">
                  <label>Receiver Account Number</label>
                  <input value={form.accountNumber} onChange={e => setForm({...form, accountNumber: e.target.value})} required />
                </div>
              )}
              <div className="form-group">
                <label>Description (optional)</label>
                <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <div className="modal-btns">
                <button type="button" className="btn-cancel" onClick={() => setModal('')}>Cancel</button>
                <button type="submit" className="btn-submit">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
