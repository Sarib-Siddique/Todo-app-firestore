import { auth, db } from "../config.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  } else {
    window.location = "../login-page/login.html";
  }
});

// let getElement = document.querySelector(".user-email");
// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   getElement.innerHTML = doc.data().username;
// });

const btn = document.querySelector(".logout-btn-1");

btn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "../login-page/login.html";
      console.log("logout succesfully");
    })
    .catch((error) => {
      console.log(error);
    });
});

var input = document.getElementById("todoInput");
var ulParent = document.getElementById("ulParent");
const addBtn = document.querySelector("#addBtn");
const delAllBtn = document.querySelector("#delete-all");
const todoCollection = collection(db, "todos");

addBtn.addEventListener("click", addTodo);

window.addEventListener("load", getTodos);

async function getTodos() {
  try {
    const arr = [];
    const querySnapshot = await getDocs(todoCollection);
    querySnapshot.forEach(function (doc) {
      const todoValue = doc.data().todo;
      createUI(todoValue, doc.id);
      // arr.push({
      //     id: doc.id,
      //     todo: doc.data()
      // })
    });
    // console.log("array", arr)
  } catch (error) {
    console.log(error.message, "error");
    alert(error.message);
  }
}

async function addTodo() {
  try {
    if (!input.value) {
      alert("ENTER TODO VALUEs");
      return;
    }
    const data = {
      todo: input.value,
    };
    const docRef = await addDoc(todoCollection, data);
    console.log("Document written with ID: ", docRef.id);
    createUI(input.value, docRef.id);
    input.value = "";
  } catch (error) {
    console.log("error", error.message);
    alert(error.message);
  }
}

async function editTodo(el) {
  // console.log("editTodo()", el.target.parentNode.parentNode.
  //     firstChild.nodeValue)
  try {
    var li = el.target.parentNode.parentNode;
    var placeHolder = li.firstChild.nodeValue;
    var editValue = prompt("Edit Todo", placeHolder);
    console.log(li.id, "id");
    const updateData = await updateDoc(doc(db, "todos", li.id), {
      todo: editValue,
    });

    console.log("editValue", editValue);
    li.firstChild.nodeValue = editValue;
  } catch (error) {
    console.log("error", error.message);
    alert(error.message);
  }
}

function deleteTodo(elem) {
  elem.target.parentNode.parentNode.remove();
}

function createUI(todoValue, id) {
  //create LI
  var liElement = document.createElement("li");
  liElement.id = id;
  liElement.innerHTML = todoValue;
  liElement.className =
    "list-group-item d-flex align-items-center justify-content-between";

  var div = document.createElement("div");
  var editBtn = document.createElement("button");
  var deleteBtn = document.createElement("button");
  editBtn.innerHTML = "EDIT";
  editBtn.addEventListener("click", editTodo);

  deleteBtn.innerHTML = "DELETE";
  deleteBtn.addEventListener("click", deleteTodo);

  editBtn.className = "btn btn-info";
  deleteBtn.className = "btn btn-danger";

  div.appendChild(editBtn);
  div.appendChild(deleteBtn);

  liElement.appendChild(div);
  ulParent.appendChild(liElement);
}

delAllBtn.addEventListener("click", async () => {
  const colRef = collection(db, "todos");
  const querySnapshot = await getDocs(colRef);
  const deleteOps = [];
  querySnapshot.forEach((doc) => {
    deleteOps.push(deleteDoc(doc.ref));
  });
  await Promise.all(deleteOps);
  ulParent.innerHTML = "";
});
