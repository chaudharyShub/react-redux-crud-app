import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';


export const getCompanyAndProductArray = (func, collectionName, type, setLoading) => {
    getDocs(collection(db, collectionName))
        .then(res => {
            const array = res.docs.map(doc => {
                return {
                    data: doc.data(),
                    id: doc.id
                }
            });
            func({ type: type, payload: array });
            setLoading(false);
        })
        // .catch(err => console.log(err));
        .catch(() => '');
}

export const notify = (msg) => toast.error(msg);

