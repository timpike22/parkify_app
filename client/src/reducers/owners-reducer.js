import { ownerConstants } from '../constants';

export function owners(state = {}, action) {
    switch (action.type) {
        case ownerConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case ownerConstants.GETALL_SUCCESS:
            return {
                items: action.owners
            };
        case ownerConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case ownerConstants.DELETE_REQUEST:
            // add 'deleting:true' property to owner being deleted
            return {
                ...state,
                items: state.items.map(owner =>
                    owner.id === action.id
                        ? { ...owner, deleting: true }
                        : owner
                )
            };
        case ownerConstants.DELETE_SUCCESS:
            // remove deleted owner from state
            return {
                items: state.items.filter(owner => owner.id !== action.id)
            };
        case ownerConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to owner 
            return {
                ...state,
                items: state.items.map(owner => {
                    if (owner.id === action.id) {
                        // make copy of owner without 'deleting:true' property
                        const { deleting, ...ownerCopy } = owner;
                        // return copy of owner with 'deleteError:[error]' property
                        return { ...ownerCopy, deleteError: action.error };
                    }

                    return owner;
                })
            };
        default:
            return state
    }
}