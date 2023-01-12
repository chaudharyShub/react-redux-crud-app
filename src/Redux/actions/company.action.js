import { getDocs,collection } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { GET_COMPANY, GET_COMPANY_ERROR } from "./Types";


export  async function fetchCompany(id) {
    // return async (dispatch) => {
        try {
            const companies = await getDocs(collection(db, 'company'))
            // console.log('companies',companies.docs);
            const companies2 = companies.docs.map(doc => {
                return {
                    data: doc.data(),
                    id: doc.id
                }
            });
            console.log(companies2);
           
            // dispatch({ type:GET_COMPANY , payload: companies2 });
        } catch (error) {
            console.log(error)
            // dispatch({ type: GET_COMPANY_ERROR, payload: 'No item found' });
        }

    // }
}

