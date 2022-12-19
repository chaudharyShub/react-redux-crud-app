export const addCompanyToArray = (type, payload) => {
    return {
        type, payload
    }
}
export const updateCompanyInArray = (type, payload) => {
    return {
        type, payload
    }
}

export const addProductToArray = (type, payload) => {
    return {
        type, payload
    }
}
export const updateProductInArray = (type, payload) => {
    return {
        type, payload
    }
}

export const getCompanyDataFromLocalStorage = (functn) => {
    let companyArrayFromLocalStorage = localStorage.getItem('companies');
    if (companyArrayFromLocalStorage === null) return;
    const arr = JSON.parse(companyArrayFromLocalStorage);
    functn(addCompanyToArray('UPDATE_COMPANY', arr));
}

// React Hook "useDispatch" cannot be called at the top level.
// React Hooks must be called in a React function component or a custom React Hook function

