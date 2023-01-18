import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";


export const getCompanyAndProductArray = (dispatch, collectionName, type, setLoading) => {
    getDocs(collection(db, collectionName))
        .then(res => {
            const array = res.docs.map(doc => {
                return {
                    data: doc.data(),
                    id: doc.id
                }
            });
            dispatch({ type: type, payload: array });
            setLoading && setLoading(false);
        })
        .catch((err) => console.log("err", err));
}

