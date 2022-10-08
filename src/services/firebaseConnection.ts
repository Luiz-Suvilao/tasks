import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD0hv6Crdk1bgvrPSClGx496CL2D_BQP8w",
    authDomain: "tarefas-web.firebaseapp.com",
    projectId: "tarefas-web",
    storageBucket: "tarefas-web.appspot.com",
    messagingSenderId: "745427196947",
    appId: "1:745427196947:web:5551f87bf84d1a6af573e6",
    measurementId: "G-D9Y1DTWG5N"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const add = async (path: string, data: Object) => {
    try {
        return  await addDoc(collection(db, path), data);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
