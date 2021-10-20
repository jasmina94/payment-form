import { createMachine, assign } from "xstate";
import { STATES } from "./constants";
import fakePaymentService from '../service/fakeService';

const paymentFormMachineDefinition = createMachine({
    initial: STATES.IDLE,
    context: {
        msg: "",
        retries: 0
    },
    states: {
        idle: {
            on: {
                CLICK: [
                    {
                        target: STATES.LOADING,
                        cond: (ctx, event) => event.data.name !== "" && event.data.card !== ""
                    },
                    {
                        target: STATES.ERROR
                    }
                ]
            }
        },
        loading: {
            invoke: {
                id: "doPayment",
                src: () => fakePaymentService.pay(),
                onDone: {
                    target: STATES.SUCCESS,
                    actions: assign({ msg: (ctx, event) => event.data })
                },
                onError: {
                    target: STATES.ERROR,
                    actions: assign({ msg: (ctx, event) => event.data })
                }
            }
        },
        error: {
            on: {
                CLICK: {
                    target: STATES.LOADING,
                    actions: assign({ retries: (ctx, event) => ctx.retries + 1}),
                    cond: (ctx, event) => event.data.name !== "" && event.data.card !== ""
                }
            }
        },
        success: {
            type: "final"
        }
    }
});

export default paymentFormMachineDefinition;