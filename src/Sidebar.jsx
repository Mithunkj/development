import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import { IoIosArrowBack } from "react-icons/io";

function Sidebar() {
  const [show, setShow] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [dropdowns, setDropdowns] = useState([{ id: 1, value: "" }]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let array = [
    { label: "Add schema to segment", value: "" },
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const handleAddSchema = () => {
    setDropdowns([...dropdowns, { id: dropdowns.length + 1, value: "" }]);
  };

  const handleSave = () => {
    console.log({
      segment_name: segmentName,
      schema: schemas,
    });
  };

  return (
    <>
      <Button className="m-5" variant="outline-primary" onClick={handleShow}>
        Save segment
      </Button>

      <Offcanvas show={show} placement={"end"} onHide={handleClose}>
        <Offcanvas.Header
          style={{ backgroundColor: "#3ab0c0", color: "#fff" }}
          closeButton
        >
          <Offcanvas.Title>
            <IoIosArrowBack className="text-light" /> Saving Segment
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className="fw-semibold">Enter the Name of the Segment</p>
          <input
            type="text"
            placeholder="Name of the segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            className="form-control"
          />
          <p className="fw-semibold mt-3">
            To save the segment, you need to add the schema to build the querry
          </p>

          {dropdowns.map((dropdown, index) => (
            <Form.Select
              className="form-control mt-2"
              key={index}
              value={dropdown.value}
              onChange={(e) => {
                const newDropdowns = [...dropdowns];
                newDropdowns[index].value = e.target.value;
                setDropdowns(newDropdowns);
                setSchemas([
                  ...schemas,
                  {
                    [e.target.value]:
                      e.target.options[e.target.selectedIndex].text,
                  },
                ]);
              }}
            >
              {array.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Select>
          ))}
          <a
            className="btn mt-2"
            style={{ color: "#42b897" }}
            onClick={handleAddSchema}
          >
            + Add new schema
          </a>
        </Offcanvas.Body>
        <div className="d-flex gap-3 p-3">
          <button
            className="btn text-light"
            style={{ backgroundColor: "#42b897" }}
            onClick={handleSave}
          >
            Save the segment
          </button>
          <button className="btn text-danger" onClick={handleClose}>
            Cancal
          </button>
        </div>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
