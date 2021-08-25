import React,{useReducer} from 'react';
import Navbar from './components/Navbar/Navbar';
import Card from './components/Card/Card';


function App() {

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      availableDenominations: [1,2,5,10,20,50,100,200,500,2000],
		  dispensedNotes: [],
    }
  )

  const handleSubmit = (amount) => {
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

  return (
    <div>
    <Navbar />
    <br/>
    <br/>
    <Card />
    </div>
  );
}

export default App;
