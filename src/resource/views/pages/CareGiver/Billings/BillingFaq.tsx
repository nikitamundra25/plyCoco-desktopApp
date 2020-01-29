import React, { FunctionComponent, useState } from 'react';
import { Collapse } from 'reactstrap';

const BillingFaq: FunctionComponent = () => {
  const [collapse, setCollpase] = useState<number>(0);
  const [cards, setCards] = useState<number[]>([1, 2, 3]);

  const toggle = (e: any) => {
    let event = e.target.dataset.event;
    setCollpase(collapse === Number(event) ? 0 : Number(event));
  };
  return (
    <div className='faq-section'>
      <h4 className='content-title'>Billing FAQ</h4>
      <div>
        {cards.map((item: any, index: any) => {
          return (
            <div className='faq-item ' key={index}>
              <div
                className={collapse === index ? 'faq-header active' : ''}
                onClick={toggle}
                data-event={index}
              >
                Why was my invoice not created automatically?
                <span className='faq-icon '>
                  <i className='fa fa-chevron-down'></i>
                </span>
              </div>
              <Collapse isOpen={collapse === index}>
                <div className='faq-body'>
                  An invoice correction is still pending. You entered incorrect
                  working hours or the invoice had to be canceled for other
                  reasons. Before you have not corrected the times and created
                  the invoice again using the link in the email, the invoice
                  creation is suspended. Otherwise, an incorrect invoice would
                  be created again.
                </div>
              </Collapse>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BillingFaq;
