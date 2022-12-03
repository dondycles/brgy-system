import { auth, db } from "../utils/firebase";
import { ref, get, child } from "firebase/database";
import { useEffect } from "react";

export default function Admin() {
  var num = 0;

  var tbody = document.getElementById("tbody");

  function addItemsToTable(brgyId) {
    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");

    td1.innerHTML = ++num;
    td2.innerHTML = brgyId;

    trow.appendChild(td1);
    trow.appendChild(td2);

    tbody.appendChild(trow);
  }

  function addAllItemsToTable(requests) {
    tbody.innerHTML = "";

    requests.forEach((element) => {
      addItemsToTable(element.brgyId);
    });
  }

  function prepareTheData() {
    const dbRef = ref(db);

    get(child(dbRef, "requests")).then((snapshot) => {
      var reqs = [];

      snapshot.forEach((childSnapshop) => {
        reqs.push(childSnapshop.val());
      });

      addAllItemsToTable(reqs);
    });
  }

  window.onload = prepareTheData();

  return (
    <>
      <div className=" bg-bgColor fixed top-0 bottom-0 left-0 right-0 -z-10 flex">
        <div className=" p-[20px] bg-gradient-to-r from-white  to-accentColor h-[500px] w-[1000px] m-auto rounded-xl">
          <div className="text-center font-extrabold text-2xl ">
            REQUEST HISTORY
          </div>
          <table>
            <thead>
              <th>NO.</th>
              <th>NAME</th>
              <th>REQUEST</th>
              <th>DATE</th>
            </thead>
            <tbody id={"tbody"}></tbody>
          </table>
        </div>
      </div>
    </>
  );
}
