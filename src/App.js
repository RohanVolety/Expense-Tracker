import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [name,setName]=useState('');
  const [datetime,setDateTime]=useState('');
  const [description,setDescription]=useState('');
  const[transactions,setTransactions]=useState('');
  useEffect(()=>{
    getTransactions().then(setTransactions);
    
  },[])
  async function getTransactions(){
    const url=process.env.REACT_APP_API_URL+'/transactions';
    const response = await fetch(url).then(response);
    return await response.json();
  }
  function addNewTransction(ev){
    ev.preventDefault();
    const url=process.env.REACT_APP_API_URL+'/transaction';
  //console.log(url);
  const price=name.split(' ')[0];
    fetch(url,{
      method:'POST',
      Headers:{'Context-type':'application/json'},
      body:JSON.stringify({
       name:name.substring(price.length+1),
        price,
       description,
        datetime,
      
      })
    }).then(response=>{
        response.json().then(json=>{
          setName('');
          setDateTime('');
          setDescription('');
          console.log('result',json);
        });
      });
    
  }
let balance=0;
for(const transaction of transactions){
  balance+=transaction.price;
}

  return (
    <main>
    <div>
      <h1>Rs{balance}</h1>
      <form onSubmit={addNewTransction}>
        <div className='basic'>
        <input type="text"
        value={name} 
        onChange={ev=>setName(ev.target.value)}
        placeholder={'+200 new tv'} />
        
        <input value={datetime}
        onChange={ev=>setDateTime(ev.target.value)}
        type="datetime-local"/>
        </div>
        <div className='description'>
        <input type="text" 
        value={description}
        onChange={ev=>setDescription(ev.target.value)}
        placeholder={'description'}/>
        </div>
        <button> Add new Transction</button>
       
      </form>
       </div>
      
      
      <div className='transctions'>
        {transactions.length>0 && transactions.map(transaction=>(
             <div className='transction'>
        <div className='left'>
          <div className='name'>{transaction.name} tv</div>
          <div className='description'>{transaction.description}</div>
          </div>
          <div className='right'>
            <div className={"price" + ((transaction.price<0)?'red':'green')}>$500</div>
            <div className='datetime'> 2021-01-01</div>
            </div>
        </div>
       
        ))}
       </div>
   
    </main>
  );
}

export default App;
