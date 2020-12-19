import { Component } from "react";
import { v4 as uuid } from 'uuid';
import s from './ContactForm.module.css'

const INITIAL_STATE = {
  name: "",
  number: "",
};

export default class ContactForm extends Component {
  state = { INITIAL_STATE };

  handelChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handelFormSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { onAdd } = this.props;
    const isValidatedForm = this.validateForm();

    if (!isValidatedForm) return;

    onAdd({ id: uuid(), name, number });

    this.resetForm();
   
  };

  validateForm = () => {
    const { name, number } = this.state;
    const { onCheckUnique } = this.props;
    if (!name || !number) {
      alert("Some field is empty");
      return false;
    }
    return onCheckUnique(name);
  };

  resetForm = () => this.setState(INITIAL_STATE);

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handelFormSubmit} className={s.form}>
        Name
        <input className={s.input}
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={this.handelChangeForm}
        />
        Number
        <input className={s.input}
          type="tel"
          name="number"
          placeholder="Enter phone number"
          value={number}
          onChange={this.handelChangeForm}
        />
        <button className={s.button} type="submit">Add Contact</button>
      </form>
    );
  }
}
