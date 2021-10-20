import { useState } from 'react';
import { useMachine } from '@xstate/react';
import '../styles/form.scss';
import paymentFormMachineDefinition from '../machine/state-machine-definition';


const PaymentForm = () => {
    const [machine, send] = useMachine(paymentFormMachineDefinition);
    const [form, updateForm] = useState({ name: "", card: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        send({ type: 'CLICK', data: { ...form } });
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>State Machine Payment Form</h2>
                <p>Current state: {machine.value}</p>
                <p>Number of retries: {machine.context.retries}</p>
            </div>

            {/* {machine.matches("error") ? (
                <div className="alert error">
                    {machine.context.msg
                    ? machine.context.msg
                    : "Oh no! No error message."}
                </div>
                ) : null
            } */}

            <div className="form-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="NameOnCard">Name on card</label>
                        <input id="NameOnCard" className="form-control" type="text"
                            value={form.name} onChange={(e) => updateForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="CreditCardNumber">Card number</label>
                        <input id="CreditCardNumber" className="null card-image form-control" type="text"
                            value={form.card} onChange={(e) => updateForm({ ...form, card: e.target.value })} />
                    </div>
                    <button id="PayButton" className="btn btn-block btn-success submit-button" type="submit">
                        <span className="submit-button-lock" />
                        <span className="align-middle">Pay Now</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PaymentForm;