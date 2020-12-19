import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { Component } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './listItems.css';

const componseStyle = {
  backgroundColor: '#4195D1',
  width: '65%',
  textAlign: 'center',
  padding: '0.2rem 0rem',
  margin: '1rem auto',
}
const history = useHistory();

const handleLogout = () => {
  localStorage.clear()
}

// export const mainListItems = (
//   <div >
//     <div >
//       <Link to="/compose">
//         <ListItem button style={componseStyle} >
//           <ListItemText primary="Compose" />
//         </ListItem>
//       </Link>
//     </div>
//     <div style={{ marginLeft: '1rem' }}>
//       <Link to="/inbox">
//         <ListItem button>
//           <ListItemText primary="Inbox" />
//         </ListItem>
//       </Link>
//       <Link to="/contact">
//         <ListItem button>
//           <ListItemText primary="Contact" />
//         </ListItem>
//       </Link>

//       <Link to="/sent">
//         <ListItem button>
//           <ListItemText primary="Sent" />
//         </ListItem>
//       </Link>

//       <Link to="/customers">
//         <ListItem button>
//           <ListItemText primary="Company/Customers" />
//         </ListItem>
//       </Link>

//       <Accordion defaultActiveKey="1">
//         <Accordion.Toggle as={Button} variant="link" eventKey="0">
//           <ListItem button >
//             <ListItemText id="setting" primary="Setting" />
//           </ListItem>
//         </Accordion.Toggle>
//         <Accordion.Collapse eventKey="0">
//           <div style={{ marginLeft: '1rem' }}>

//             <Link to="/profile">
//               <ListItem button>
//                 <ListItemText primary="Profile" />
//               </ListItem>
//             </Link>


//             <Link to="/privacy">
//               <ListItem button>
//                 <ListItemText primary="Privacy" />
//               </ListItem>
//             </Link>


//             <Link to="/team">
//               <ListItem button>
//                 <ListItemText primary="Team" />
//               </ListItem>
//             </Link>


//             <ListItem button>
//               <ListItemText primary="Email Signature" />
//             </ListItem>

//             <Link to="/companydetails">
//               <ListItem button>
//                 <ListItemText primary="Company Details" />
//               </ListItem>
//             </Link>

//           </div>
//         </Accordion.Collapse>
//       </Accordion>

//       <ListItem button>
//         <ListItemText primary="Ticket" />
//       </ListItem>
//       <ListItem button>
//         <ListItemText primary="Dashboard" />
//       </ListItem>
//       <ListItem button>
//         <ListItemText onclick={handleLogout} primary="Log Out" />
//       </ListItem>
//     </div>

//   </div>
// );



class listItems extends Component {
  render() {
    return (
      <div >
    <div >
      <Link to="/compose">
        <ListItem button style={componseStyle} >
          <ListItemText primary="Compose" />
        </ListItem>
      </Link>
    </div>
    <div style={{ marginLeft: '1rem' }}>
      <Link to="/inbox">
        <ListItem button>
          <ListItemText primary="Inbox" />
        </ListItem>
      </Link>
      <Link to="/contact">
        <ListItem button>
          <ListItemText primary="Contact" />
        </ListItem>
      </Link>

      <Link to="/sent">
        <ListItem button>
          <ListItemText primary="Sent" />
        </ListItem>
      </Link>

      <Link to="/customers">
        <ListItem button>
          <ListItemText primary="Company/Customers" />
        </ListItem>
      </Link>

      <Accordion defaultActiveKey="1">
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          <ListItem button >
            <ListItemText id="setting" primary="Setting" />
          </ListItem>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <div style={{ marginLeft: '1rem' }}>

            <Link to="/profile">
              <ListItem button>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>


            <Link to="/privacy">
              <ListItem button>
                <ListItemText primary="Privacy" />
              </ListItem>
            </Link>


            <Link to="/team">
              <ListItem button>
                <ListItemText primary="Team" />
              </ListItem>
            </Link>


            <ListItem button>
              <ListItemText primary="Email Signature" />
            </ListItem>

            <Link to="/companydetails">
              <ListItem button>
                <ListItemText primary="Company Details" />
              </ListItem>
            </Link>

          </div>
        </Accordion.Collapse>
      </Accordion>

      <ListItem button>
        <ListItemText primary="Ticket" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemText onclick={handleLogout} primary="Log Out" />
      </ListItem>
    </div>

  </div>
    );
  }
}

export default listItems;