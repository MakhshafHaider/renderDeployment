import React from "react";
import Form from "react-bootstrap/Form";

export default function InputField({ title, value, onChange, as, type }) {
  return (
    <div>
      <Form.Group className="mb-3" >
        <Form.Label>{title}</Form.Label>
        <Form.Control
          type={type}
          as={as}
          value={value}
          onChange={onChange}
          className="form-control-lg"
        />
      </Form.Group>
    </div>
  );
}
