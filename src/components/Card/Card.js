import React,{useState,useReducer} from 'react';

function Card () {
  
    const [balance, setBalance] = useState(10000);

    const [amountstate, setAmountstate] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
          amount:'',
        }
    )

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
          availableDenominations: [1,2,5,10,20,50,100,200,500,2000],
        dispensedNotes: [],
        }
      )

  // handles change in form input field
  const handleChange = fieldName => event => {
    setAmountstate({ [fieldName]: event.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    calculate(amountstate.amount);
  }

  const calculate = (amount) => {
    let remainingAmount = +amount;
    let currentDenominationIndex = state.availableDenominations.length - 1;
    const dispensedNotes = [];
    while (remainingAmount) {
        const numberOfNotes = Math.floor(remainingAmount / state.availableDenominations[currentDenominationIndex]);
        if (numberOfNotes > 0) {
            remainingAmount = remainingAmount % state.availableDenominations[currentDenominationIndex];
        }
        dispensedNotes.push({
            denomination: state.availableDenominations[currentDenominationIndex],
            numberOfNotes,
        })
        --currentDenominationIndex;
    }
    setState({ dispensedNotes: dispensedNotes.reverse() });
}

  const [totalNotes, setTotalNotes] = useState(0);

  const [dispensedNotesContent, setDispensedNotesContent] = useState('');


  const notes =() => {
    const { dispensedNotes } = state.dispensedNotes;
    let totalNotes = 0;
    let dispensedNotesContent;
    if (dispensedNotes.length) {
      setDispensedNotesContent(dispensedNotes.map((value) => {
        setTotalNotes(totalNotes += value.numberOfNotes);
        return (<div className="ListItem" key={value.denomination}>{`${value.numberOfNotes} notes of Rs ${value.denomination}`}</div>)
      }))
    }

    }

    return (
      <>
        <section className="sec-head">
            <h1>
                Account balance = {balance}
            </h1>
        </section>
        <section>
          <div className="atm-section">
            <div className="paper">
              <h2>Welcome to ATM</h2>
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <label htmlFor="amount">Enter the Amount</label>
                <input
                  id="amount"
                  label="Enter the Amount"
                  value={amountstate.amount}
                  onChange={handleChange('amount')}
                  margin="normal"
                  type="number"
                  name="amount"
                />
                <div>
                  <button
                    type="submit" className="pri-color"
                  >
                    Get Money
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="notes-sec">
            {state.dispensedNotes.length !== 0 && <div className="paper">
              <h4>You will get the following amount</h4>
              {state.dispensedNotes.length ? notes : <div></div>}
              <div>{dispensedNotesContent}</div>
              <h4 className="total-dis">Total notes dispensed: {totalNotes}</h4>
            </div>}
          </div>
        </section>
      </>
    );
}

export default Card;