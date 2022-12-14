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