import React, { cloneElement, useState } from "react";
import { Modal } from "@mui/material";

const ViewPDF = ({ children, type, url }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        {children && cloneElement(children, { onClick: showModal })}
        <Modal
          open={open}
          onClose={handleClose}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "450px",
              overflow: "auto",
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {type === "pdf" ? (
              <iframe
                src={url}
                style={{
                  width: "100%",
                  height: "400px",
                  border: "none",
                }}
                title="PDF Viewer"
              />
            ) : type === "image" ? (
              <img
                src={url}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            ) : (
              <p>Unsupported type</p>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ViewPDF;
