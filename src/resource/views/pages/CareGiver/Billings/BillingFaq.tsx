import React, { FunctionComponent, useState } from 'react';
import { Collapse } from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';

const BillingFaq: FunctionComponent = () => {
  const [collapse, setCollpase] = useState<number>(0);
  const [cards, setCards] = useState<number[]>([1, 2, 3]);

  const toggle = (e: any) => {
    let event = e.target.dataset.event;
    setCollpase(collapse === Number(event) ? 0 : Number(event));
  };
  return (
    <div className='faq-section'>
      <h4 className='content-title'>{languageTranslation("BILLING_FAQ")} </h4>
      <div>
        {cards.map((item: any, index: any) => {
          return (
            <div className='faq-item ' key={index}>
              <div
                className={collapse === index ? 'faq-header active' : ''}
                onClick={toggle}
                data-event={index}
              >
                {languageTranslation("WHY_INVOICE_NOT_CREATED_AUTO")}
                <span className='faq-icon '>
                  <i className='fa fa-chevron-down'></i>
                </span>
              </div>
              <Collapse isOpen={collapse === index}>
                <div className='faq-body'>
                 {languageTranslation("INVOICE_CORRECTION_IS_PENDING")}
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
