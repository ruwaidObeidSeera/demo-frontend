import { useRef, useEffect, useState } from "react";

const endPoint = "https://jsonplaceholder.typicode.com/todos";

const users = [
  { name: "Bill Gates", age: "30" },
  { name: "Jeff Bezos", age: "30" },
  { name: "Elon musk", age: "30" },
];

async function fetchJSONData() {
  const response = await fetch(endPoint);
  return response.json();
}

async function postUser(data = {}) {
  const response = await fetch(endPoint, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function deleteUserAPI(data = {}) {
  const response = await fetch(endPoint, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

function UsersList() {
  const dialogRef = useRef();
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchJSONData().then((response) => setList(response));
  }, []);

  const openAddUserDialog = () => {
    console.log("Open Add User Dialog");
    dialogRef.current?.showModal();
  };

  const addUser = (e) => {
    console.log("Add user");
    e.preventDefault();
    const name = e.target.name.value;
    const age = e.target.age.value;

    const body = {
      name,
      age,
    };
    postUser(body);
    dialogRef.current?.close();
  };
  const deleteUser = (id) => {
    const body = {
      id,
    };
    deleteUserAPI(body);
  };

  return (
    <>
      <div className="container">
        <div className="w-100">
          <div className="title-container">
            <span className="title">Users </span>
            <button className="add-btn button-3" onClick={openAddUserDialog}>
              Add user
            </button>
          </div>
          <div className="cards-container">
            {list?.map((item) => {
              return (
                <>
                  <div className="card">
                    <button
                      className="button-delete"
                      onClick={() => deleteUser(item.id)}
                    >
                      Delete
                    </button>
                    <div className="content-container">
                      <div>
                        <b>Name:</b> <span>{item.name}</span>
                      </div>
                      <div>
                        <b>Age:</b>
                        <span data-testid="item-price">{item.age}</span>
                      </div>
                    </div>
                  </div>
                </>
              );
            }) ?? <div>No Result Found</div>}
          </div>
        </div>
      </div>

      <dialog ref={dialogRef}>
        <form onSubmit={addUser}>
          <p>
            <label>
              Name:
              <input name="name" />
            </label>
          </p>
          <p>
            <label>
              Age:
              <input name="age" />
            </label>
          </p>
          <div>
            <button
              value="cancel"
              className="button-delete"
              formmethod="dialog"
            >
              Cancel
            </button>
            <button id="confirmBtn" className="button-3" value="default">
              Confirm
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default UsersList;
