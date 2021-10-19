import { useMemo, useState, useEffect } from "react";
import { interpret } from "xstate";

const useMachine = (machine) => {
    const [current, setCurrent] = useState(machine.initialState);

    const service = useMemo(() =>
        interpret(machine)
            .onTransition(state => {
                if (state.changed) {
                    setCurrent(state);
                }
            })
            .start(),
    []);

    useEffect(() => {
        return () => service.stop();
    }, []);

    return [current, service.send];
}

export default useMachine;