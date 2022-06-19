import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

//alterar documento
const washingtonRef = doc(db, "cities", "DC");
var status = "";
// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  status: status,
  updated_at: serverTimestamp()
});