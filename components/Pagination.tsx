"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

interface PaginationProps {
    pageId: number;
    pages?: number;
    type?: string;
}

export default function Pagination({ pageId, pages, type }: PaginationProps) {
        const pageAmount = 3;

        let maxPages = 87;
        if (pages !== undefined) {
            maxPages = Math.ceil(pages / 15) + 1;
        }
        const gap = 3;
        const buttonStyling = "p-2 mx-1 rounded-lg"
        const [loading, setLoading] = useState(false);
        const loadingCSS = "pointer-events-none opacity-60"

        const buttonClick = () => {
            const previousUrl = window.location.href;
            setLoading(true);
            
            // Use setTimeout to check URL after navigation
                const newUrl = window.location.href;
                if (previousUrl !== newUrl) {
                    setLoading(false);
                }
        }

        console.log('page d is ', (pageId - pageAmount));


        function GenerateBackButtons () {
            const BackButtonsArray = [];
            for (let step = 0; step < pageAmount; step++) {
                const calculation = pageId - 1 - step;
                if (calculation > 0) {
                    BackButtonsArray.push(<Button variant="outline" key={step} asChild><Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={`/page/${calculation}${type ? `?type=${type}` : ''}`} >{calculation}</Link></Button>);
                }
                // Runs 5 times, with values of step 0 through 4.
              }
              return BackButtonsArray;
        }

        function GeneratForwardButtons () {
            const ForwardButtonsArray = [];
            for (let step = 0; step < pageAmount; step++) {
                const calculation = pageId + 1 + step;
                if (pageId + step + 1 < maxPages) {
                    ForwardButtonsArray.push(<Button variant="outline" key={step} asChild><Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={`/page/${calculation}${type ? `?type=${type}` : ''}`} >{calculation}</Link></Button>);
                }
                // Runs 5 times, with values of step 0 through 4.
              }
              return ForwardButtonsArray;
        }

        const BackButtons = GenerateBackButtons();
        const ForwardButtons = GeneratForwardButtons();


        return (
        <div className={`flex justify-center flex-wrap mt-4 gap-${gap}`}> 
            {pageId !== 1 && (pageId - pageAmount) >= 2 && <Button variant="outline" asChild><Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={`/page/1${type ? `?type=${type}` : ''}`}>First</Link></Button>}
            {pageId - 1 > 0 ?  <Button variant="outline" asChild><Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={pageId - 1 > 0 ? `/page/${pageId - 1}${type ? `?type=${type}` : ''}` : ''}>Back</Link></Button> : ""}
            <div className={`flex gap-${gap} flex-row-reverse`}>
                {BackButtons.map((backButton) => {
                    return (backButton)
                })}
            </div>
            <Button variant="secondary" asChild><div className={buttonStyling}><p >{pageId}</p></div></Button>
            {ForwardButtons.map((forwardButton) => {
                    return (forwardButton)
            })}
            {pageId + 1 < maxPages && <Button variant="outline" asChild><Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={pageId + 1 < maxPages ? `/page/${pageId + 1}${type ? `?type=${type}` : ''}` : ""}>Next</Link></Button>}
            {pageId !== maxPages - 1 && <Button variant="outline" asChild><Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={`/page/${maxPages - 1}${type ? `?type=${type}` : ''}`}>Last</Link></Button>}
        </div>
    );
}