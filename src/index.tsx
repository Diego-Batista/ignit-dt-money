import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from "miragejs";
import {App} from './App';

createServer({
  models: {
    transition: Model
  },

  seeds(server) {
    server.db.loadData({
      transitions: [
        {
          id: 1,
          title: 'Freelance de web-site',
          type: 'deposit',
          category: 'Dev',
          amount: 7000,
          createdAt: new Date('15-05-2022 15:24:00'),
        },
        {
          id: 2,
          title: 'Mercado',
          type: 'withdraw',
          category: 'Despesas',
          amount: 1200,
          createdAt: new Date('15-05-2022 10:24:00'),
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transition');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transition', data)
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

