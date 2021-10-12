import firebase from "../FirebaseWork"

export default function MyAccount(){

    const uuid = firebase.auth().currentUser.uid;
    return(
        <div>
            Account Section
        </div>
    )
}