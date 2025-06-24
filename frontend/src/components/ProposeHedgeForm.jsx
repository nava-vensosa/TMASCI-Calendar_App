import React from 'react';
import { Formik, Form, Field } from 'formik';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const initialValues = {
  title: '',
  description: '',
  teamMembers: '',
  date: '',
  time: '',
};

const ProposeHedgeForm = ({ onClose }) => (
  <Modal
    isOpen={true}
    onRequestClose={onClose}
    className="modal"
    overlayClassName="ReactModal__Overlay"
    contentLabel="Propose a Hedge"
  >
    <h2>Propose a Hedge</h2>
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        // For now, just log the values
        alert('Hedge proposed!\n' + JSON.stringify(values, null, 2));
        resetForm();
        onClose();
      }}
    >
      {() => (
        <Form>
          <label htmlFor="title">Title of the Hedge:</label>
          <Field id="title" name="title" placeholder="Enter title" />

          <label htmlFor="description">Brief Description of the Hedge:</label>
          <Field
            id="description"
            name="description"
            as="textarea"
            placeholder="Enter description"
          />

          <label htmlFor="teamMembers">Critical Team Members:</label>
          <Field
            id="teamMembers"
            name="teamMembers"
            placeholder="e.g. Alice, Bob"
          />

          <label htmlFor="date">Date:</label>
          <Field id="date" name="date" type="date" />

          <label htmlFor="time">Time:</label>
          <Field id="time" name="time" type="time" />

          <div style={{ marginTop: '1em' }}>
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose} style={{ marginLeft: '1em' }}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
);