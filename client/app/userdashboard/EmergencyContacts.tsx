import React from 'react';
import { FaPlus } from "react-icons/fa";

const EmergencyContacts: React.FC = () => {
  const contacts = [
    {
      name: 'Dr. Anindya Koley',
      relation: 'Primary Doctor',
      phone: '+91 123456789'
    },
    {
      name: 'Aniket Patra',
      relation: 'Emergency Contact',
      phone: '+91 767672752'
    },
    {
      name: 'City Hospital',
      relation: 'Nearest Hospital',
      phone: '+91 000000000'
    },
    {
      name: 'Emergency Services',
      relation: '911',
      phone: '911'
    }
  ];

  // const handleAddContact = () => {
  //   // Handle adding new emergency contact logic here
  //   console.log('Add new emergency contact clicked');
  // };

  return (
    <div className="card">
      <h2>Emergency Contacts</h2>
      <div>
        {contacts.map((contact, index) => (
          <div key={index} className="contact-item">
            <div>
              <div className="contact-name">{contact.name}</div>
              <div className="contact-relation">{contact.relation}</div>
            </div>
            <div className="contact-phone">{contact.phone}</div>
          </div>
        ))}
        
        <div className='contact-item'>
          <div>
            <div className='contact-name'> 
              Add Emergency Contact
            </div>
          </div>
          <div className='contact-phone'>
            <FaPlus className="add-contact-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;