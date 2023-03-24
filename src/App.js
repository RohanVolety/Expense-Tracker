import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
function App() {
  const [name, setName] = useState('');
  const [datetime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, [])

  async function getTransactions(e) {
    e.preventDefault();
    const { data } = await axios.get('https://expense-tracker-bice-tau.vercel.app/api/transactions')
    setTransactions(data);
  }

  const addNewTransction = async (e) => {
    e.preventDefault();
    const url = 'https://expense-tracker-bice-tau.vercel.app/api/transaction';
    const price = parseInt(name);
    const { data } = await axios.post(url, { name, price, description, datetime }); 
    
  }
  // parseInt(name);
 
  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }

  return (
    <main>
      <div>
        <h1>Rs {balance}</h1>
        <form>
          <div className="basic">
            <input type="text"
              value={name}
              onChange={ev => setName(ev.target.value)}
              placeholder={'+2000 New TV'} />

            <input value={datetime}
              onChange={ev => setDateTime(ev.target.value)}
              type="datetime-local"
              />
          </div>
          <div className="description">
            <input type="text"
              value={description}
              onChange={ev => setDescription(ev.target.value)}
              placeholder={'Description'} />
          </div>
          <button onClick={addNewTransction}>Add New Transaction</button>
          <button onClick={getTransactions}>Get Transactions</button>
        </form>
      </div>
      <div className='transctions'>
        {
          transactions.length > 0 && transactions.map((transaction,index) => (
            <div key={index} className='transction'>
              <div className="left">
                <div className="name">{transaction.name.substring(transaction.name.indexOf(' ') + 1)}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
              
                <div className={"price " +((transaction.price < 0) ? 'red' : 'green')}>Rs{transaction.price}</div>
                <div className="datetime">{moment(transaction.datetime).format('MMMM Do YYYY, h:mm:ss a')}</div>
              </div>
            </div>
            )
          )}
      </div>
    </main>
  );
}

export default App;
