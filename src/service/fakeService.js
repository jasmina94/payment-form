const fakePaymentService = {
    pay: function () {
        const dice = Math.random() < 0.5;
        if (dice) {
            const paymentId = Math.floor(Math.random() * 100);
            return Promise.resolve(JSON.stringify({ message: `\tSuccessful payment. Payment ID: ${paymentId}.` }));
        } else {
            return Promise.reject(new Error('\tError occured while getting data'));
        }
    }
}

export default fakePaymentService;