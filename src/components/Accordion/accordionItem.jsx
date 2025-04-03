import React, { useState } from 'react'

import AccordionHeader from "./accordionHeader"
import AccordionBody from "./accordionBody"

const accordionItem = ({category, items, headerImage}) => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    const openAccordion = () => {
        setAccordionOpen(!accordionOpen)
    };

    return (
        <div className='mb-2'>
            <AccordionHeader category={category} clickEvent={openAccordion} isOpen={accordionOpen} image={headerImage}/>
            <AccordionBody isOpen={accordionOpen} items={items}/>
        </div>
    )
}

export default accordionItem