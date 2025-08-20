import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get('/events').then(res => setEvents(res.data));
  }, []);

  const bookEvent = async (eventId) => {
    try {
      await API.post('/bookings', { event_id: eventId, user_id: 1 }); // Replace with logged-in user id
      alert('Booking requested, confirmation will be sent.');
    } catch (err) {
      alert(err.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(e => (
          <li key={e.id}>
            {e.title} - {e.price} USD
            <button onClick={() => bookEvent(e.id)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
