import React, { useEffect, useState } from "react";
import GiftCardsTransactionGrid from "./GiftCardsTransactionGrid";
import TicketsTransactionGrid from "./TicketsTransactionGrid";

const AdminHome: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<
    "tickets" | "giftcards" | null
  >(() => {
    const storedComponent =
      sessionStorage.getItem("activeComponent") || "tickets";
    return storedComponent === "giftcards" ? "giftcards" : "tickets";
  });

  useEffect(() => {
    sessionStorage.setItem("activeComponent", activeComponent || "tickets");
  }, [activeComponent]);

  const handleComponentChange = (component: "tickets" | "giftcards") => {
    setActiveComponent(component);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("token");
    window.location.assign("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <a
          href="#"
          style={
            activeComponent === "tickets"
              ? styles.navButtonSelected
              : styles.navButton
          }
          onClick={() => handleComponentChange("tickets")}
        >
          Tickets
        </a>
        <a
          href="#"
          style={
            activeComponent === "giftcards"
              ? styles.navButtonSelected
              : styles.navButton
          }
          onClick={() => handleComponentChange("giftcards")}
        >
          Giftcards
        </a>
        <a href="#" style={styles.navButton} onClick={handleLogout}>
          Log out
        </a>
      </div>

      {activeComponent === "tickets" && <TicketsTransactionGrid />}
      {activeComponent === "giftcards" && <GiftCardsTransactionGrid />}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#f0f2f5",
  },
  navbar: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 30px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  navButton: {
    marginRight: "20px",
    padding: "10px 20px",
    textDecoration: "none",
    color: "#555",
    borderRadius: "4px",
    fontWeight: 500,
    transition: "background-color 0.3s, color 0.3s",
  },
  navButtonSelected: {
    marginRight: "20px",
    padding: "10px 20px",
    textDecoration: "none",
    backgroundColor: "#ffcc00",
    color: "#333",
    borderRadius: "4px",
    fontWeight: 500,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
};

export default AdminHome;
