import React, { useEffect, useState, useRef } from "react";
import swal from "sweetalert";
import Spinner from "./Spinner";
const Notitem = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const a = useRef();
  const b = useRef();
  const [length, setLength] = useState(false);
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(false);

  const [currentNote, setCurrentNote] = useState({
    title: "",
    description: "",
    id: "",
  });
  useEffect(() => {
    document.title = "Notes";
    fetchnotes();
  });
  const updateNote = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;

    setCurrentNote({ ...currentNote, [name]: value });
  };

  const updatefinal = async () => {
    try {
      await fetch(`/update/${currentNote.id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: currentNote.title,
          description: currentNote.description,
          time: new Date().toLocaleString(),
        }),
      });
    } catch (error) {
      swal("Something Wen wrong");
    }
  };

  const deleteNote = async (id) => {
    try {
      const result = await fetch(`/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.status !== 200) {
        swal("Something went wrong");
      } else {
        swal("note deleted successfully");
      }
    } catch (error) {}
  };

  const fetchnotes = async () => {
    try {
      const result = await fetch("/getnote", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const fetchedData = await result.json();
      if (fetchedData.length === 0) {
        setLength(false);
      } else {
        setLength(true);

        setNotes(fetchedData);
      }
    } catch (err) {
      swal("Something Went wrong");
    }
  };

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await fetch("/addnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          time: new Date().toLocaleString(),
        }),
      });

      if (result.status !== 200) {
        setLoading(false);
        swal("Check all field");
      } else {
        swal("Your Not Added Successfully");
        setData({ title: "", description: "" });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      swal("Something wen wrong");
    }
  };
  return (
    <>
      <div className="container my-5">
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Title
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              name="title"
              value={data.title}
              onChange={handleChange}
              aria-describedby="emailHelp"
              style={{ width: "50%" }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Description
            </label>
            <textarea
              type="text"
              class="form-control"
              name="description"
              value={data.description}
              onChange={handleChange}
              id="exampleInputPassword1"
              style={{ width: "50%" }}
            />
          </div>
          {loading && <Spinner />}

          <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
            Add Note
          </button>
        </form>
      </div>
      {
        <div class="container my-3">
          <div className="row">
            {length ? (
              notes.map((element) => {
                return (
                  <div className="col-md-4 my-1" key={element._id}>
                    <div
                      class="card"
                      style={{
                        width: "18rem",
                        boxShadow: " 0 12px 16px 0 rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <div class="card-body">
                        <h6 style={{ fontSize: "11px" }}>
                          Note Created/Updated : {element.time}
                        </h6>

                        <h5 class="card-title">Title:{element.title}</h5>

                        <p class="card-text">
                          Description: {element.description}
                        </p>

                        <i
                          className="far fa-edit mx-2"
                          data-bs-toggle="modal"
                          ref={a}
                          data-bs-target="#exampleModal"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setCurrentNote({
                              title: element.title,
                              description: element.description,
                              id: element._id,
                            });
                          }}
                        ></i>

                        <div
                          class="modal fade"
                          id="exampleModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                  Update Note
                                </h5>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">
                                <div class="mb-3">
                                  <label
                                    for="exampleFormControlInput1"
                                    class="form-label"
                                  >
                                    Note Title
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="title"
                                    id="exampleFormControlInput1"
                                    onChange={updateNote}
                                    value={currentNote.title}
                                  />
                                </div>
                                <div class="mb-3">
                                  <label
                                    for="exampleFormControlTextarea1"
                                    class="form-label"
                                  >
                                    Note Description
                                  </label>
                                  <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    name="description"
                                    onChange={updateNote}
                                    rows="3"
                                    value={currentNote.description}
                                  ></textarea>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  onClick={() => {
                                    updatefinal();
                                  }}
                                >
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <i
                          className="fas fa-trash-alt mx-2"
                          style={{ cursor: "pointer" }}
                          ref={b}
                          onClick={() => {
                            deleteNote(element._id);
                            setNotes(notes);
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h3>Nothing to display Please add note</h3>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default Notitem;
