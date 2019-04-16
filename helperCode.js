<div className={`always ${isOverdue(loan) ? 'yes' : 'no'}`}>


const amountDecimal = ((expense.amount % 1).toFixed(2))*100
console.log(amountDecimal)
const amountWhole = Math.floor(expense.amount)
console.log(amountWhole)

£ {amountWhole}.<span className = 'decimal'>{amountDecimal}</span>

£&thinsp;{sterling.toFixed(2)}

<CreateProfile
  onFirstNameChange={this.firstNameChange}
  onHide={close}
  show={this.state.showModal}
/>
and then in the CreateProfile component you can either do

const CreateProfile = ({onFirstNameChange, onHide, show }) => {...}
with destructuring it will assign the matching property names/values to the passed in variables. The names just have to match with the properties

or just do

const CreateProfile = (props) => {...}
and in each place call props.onHide or whatever prop you are trying to access.






chart colors
--blue: #007bff;
    --indigo: #6610f2;
    --purple: #6f42c1;
    --pink: #e83e8c;
    --red: #dc3545;
    --orange: #fd7e14;
    --yellow: #ffc107;
    --green: #28a745;
    --teal: #20c997;
    --cyan: #17a2b8;
    --white: #fff;
    --gray: #6c757d;
    --gray-dark: #343a40;
    --primary: #007bff;
    --secondary: #6c757d;
    --success: #28a745;
    --info: #17a2b8;
    --warning: #ffc107;
    --danger: #dc3545;
    --light: #f8f9fa;
    --dark: #343a40;








Modal

class MyVerticallyCenteredModal extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false };
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <ButtonToolbar>
        <Button
          variant="primary"
          onClick={() => this.setState({ modalShow: true })}
        >
          Launch vertically centered modal
        </Button>

        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={modalClose}
        />
      </ButtonToolbar>
    );
  }
}

render(<App />);
