import { initializeApp } from 'firebase/app';
import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
    where,
    query,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore'

import { format } from 'date-fns';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "tarefas-web.firebaseapp.com",
    projectId: "tarefas-web",
    storageBucket: "tarefas-web.appspot.com",
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId:  process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const addTask = async (path: string, data: Object) => {
    try {
        return  await addDoc(collection(db, path), data);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export const fetchUserTasks = async (path: string, userId: string|number) => {
    const q = query(collection(db, path), where('userId', "==", userId));
    const querySnapshot = await getDocs(q);
    const taskList = [];

    querySnapshot.forEach((doc) => {
        const objectFormatted = {
            ...doc.data(),
            id: doc.id,
            formatted_created_at: format(doc.data().created_at.toDate(), 'dd MMMM yyyy'),
        };

        taskList.push(objectFormatted);
    });

    return taskList;
};

export const deleteUniqueTaskById = async (path: string, taskId: string) => {
    const docRef = doc(db, path, taskId);
    await deleteDoc(docRef);
};

export const updateTaskById = async (path: string, taskId: string, data: object) => {
    const docRef = doc(db, path, taskId);

    await updateDoc(docRef, data);
};
