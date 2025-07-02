"use client";

import Link from "next/link";
import { useState } from "react";

interface PaginationProps {
    pageId: number;
    pages?: number;
    type?: string;
}

export default function Pagination({ pageId, pages, type }: PaginationProps) {
        console.log('pokemon page length ? ', pages)
        console.log("type is ", type);
        const pageAmount = 4;

        let maxPages = 87;
        if (pages !== undefined) {
            maxPages = Math.ceil(pages / 15) + 1;
        }
        console.log('maxPages ', maxPages) 
        const gap = 3;
        const buttonStyling = "p-2 mx-1 rounded-lg border border-neutral-100/20"
        const buttonDisabled = "opacity-40 cursor-not-allowed"
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


        function GenerateBackButtons () {
            const BackButtonsArray = [];
            for (let step = 0; step < pageAmount; step++) {
                const calculation = pageId - 1 - step;
                if (calculation > 0) {
                    BackButtonsArray.push(<Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={`/page/${calculation}${type ? `?type=${type}` : ''}`} key={step}>{calculation}</Link>);
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
                    ForwardButtonsArray.push(<Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={`/page/${calculation}${type ? `?type=${type}` : ''}`} key={step}>{calculation}</Link>);
                }
                // Runs 5 times, with values of step 0 through 4.
              }
              return ForwardButtonsArray;
        }

        const BackButtons = GenerateBackButtons();
        const ForwardButtons = GeneratForwardButtons();


        return (
        <div className={`flex justify-center mt-4 gap-${gap}`}> 
            {pageId !== 1 && <Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={`/page/1${type ? `?type=${type}` : ''}`}>First</Link>}
            <Link onClick={buttonClick} className={`${buttonStyling}  ${pageId - 1 > 0 ? "" : buttonDisabled} ${loading ? loadingCSS : ""}`} href={pageId - 1 > 0 ? `/page/${pageId - 1}${type ? `?type=${type}` : ''}` : ''}>Back</Link>
            <div className={`flex gap-${gap} flex-row-reverse`}>
                {BackButtons.map((backButton) => {
                    return (backButton)
                })}
            </div>
            <div className={buttonStyling}><p className="text-green-500">{pageId}</p></div>
            {ForwardButtons.map((forwardButton) => {
                    return (forwardButton)
            })}
            <Link onClick={buttonClick} className={`${buttonStyling} ${pageId + 1 < maxPages ? "" : buttonDisabled} ${loading ? loadingCSS : ""}`} href={pageId + 1 < maxPages ? `/page/${pageId + 1}${type ? `?type=${type}` : ''}` : ""}>Next</Link>
            {pageId !== maxPages - 1 && <Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={`/page/${maxPages - 1}${type ? `?type=${type}` : ''}`}>Last</Link>}
        </div>
    );
}