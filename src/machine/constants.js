const STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
};

const ACTIONS = {
    CLICK: 'click',
    PAYMENT_RECEIVED: 'paymentReceived',
    PAYMENT_FAILED: 'paymentFailed',
    RETRY: 'retry'
};

module.exports = {
    STATES,
    ACTIONS
}