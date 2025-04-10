import React, { useState } from 'react'

import AccordionHeader from "./accordionHeader"
import AccordionBody from "./accordionBody"

const accordionItem = ({category, items, headerStyle, headerOpenStyle, headerClosedStyle, blockStyle, headerImage}) => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    const openAccordion = () => {
        setAccordionOpen(!accordionOpen)
    };

    return (
        <div className='mb-2'>
            <AccordionHeader 
                category={category} 
                clickEvent={openAccordion} 
                isOpen={accordionOpen} 
                style={headerStyle} 
                openStyle={headerOpenStyle}
                closedStyle={headerClosedStyle}
                image={headerImage}
            />
            <AccordionBody style={blockStyle} isOpen={accordionOpen} items={items}/>
        </div>
    )
}

export default accordionItem