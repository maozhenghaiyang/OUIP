export default {
    namespace : 'connector',

    state : {
        connectors: [],
    },

    effects : {
        *list({
            payload,
        }, {call, put}) {
            const response = yield call(fakeAccountLogin, payload);
            yield put({type: 'changeLoginStatus', payload: response});
            // Login successfully
            if (response.status === 'ok') {
                reloadAuthorized();
                yield put(routerRedux.push('/'));
            }
        },

        reducers: {
            changeLoginStatus(state, {payload}) {
                setAuthority(payload.currentAuthority);
                return {
                    ...state,
                    status: payload.status,
                    type: payload.type,
                };
            },
        },
    },
}