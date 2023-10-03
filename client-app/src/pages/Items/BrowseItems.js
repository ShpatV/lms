import React from "react";
import Item from "./Item.js"; // Import the generic Item component
import PropTypes from "prop-types";
import "../../components/styles/getCourses.css";
import SessionService from "../../services/SessionService.js";

const BrowseItems = ({ items }) => {
  // const [itemsList, setItemsList] = useState(items);
  const sessionService = new SessionService();

  // const handleDelete = (itemId) => {
  //   const updatedItems = itemsList.filter((item) => item.id !== itemId);
  //   setItemsList(updatedItems);
  // };

  // const handleEdit = (itemId) => {
  //   const updatedItems = itemsList.filter((item) => item.id !== itemId);
  //   setItemsList(updatedItems);
  // };

  const handleDeleteSession = async (sessionId) => {
    try {
      await sessionService.deleteSession(sessionId);
      window.location.reload();
      console.log("Session deleted successfully");
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className="container">
      <div className="container-fluid d-flex flex-column gap-5">
        {items.map((item) => (
          <Item
            key={item.id || item.session_id}
            item={item}
            onDelete={handleDeleteSession}
          />
        ))}
      </div>
    </div>
  );
};

BrowseItems.propTypes = {
  items: PropTypes.array.isRequired,
};

export default BrowseItems;
