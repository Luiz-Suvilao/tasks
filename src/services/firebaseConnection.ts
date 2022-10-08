import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyD0hv6Crdk1bgvrPSClGx496CL2D_BQP8w",
    authDomain: "tarefas-web.firebaseapp.com",
    projectId: "tarefas-web",
    storageBucket: "tarefas-web.appspot.com",
    messagingSenderId: "745427196947",
    appId: "1:745427196947:web:5551f87bf84d1a6af573e6",
    measurementId: "G-D9Y1DTWG5N"
};

if (!firebase.getApps().length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
