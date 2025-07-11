"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface PaginationProps {
    pageId: number;
    pages?: number;
    type?: string;
    amount: number;
}

export default function Pagination({ pageId, pages, type, amount }: PaginationProps) {
        const pageAmount = 4;

        let maxPages = 87;
        if (pages !== undefined) {
            maxPages = Math.ceil(pages / amount) + 1;
        }

        const buttonStyling = "p-2 mx-1 rounded-lg my-1"
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
        <div className={`flex justify-center items-end flex-wrap py-12`}> 
            {pageId - 1 > 0 ?  <Button variant="outline" asChild><Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={pageId - 1 > 0 ? `/page/${pageId - 1}${type ? `?type=${type}` : ''}` : ''}> <ChevronLeftIcon /></Link></Button> : ""}
            {pageId !== 1 && (pageId - pageAmount) >= 2 && <Button variant="outline" asChild><Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={`/page/1${type ? `?type=${type}` : ''}`}>1</Link></Button>}
            {pageId !== 1 && (pageId - pageAmount) >= 2 &&  <div className="mx-2 opacity-80">...</div>}
            <div className={`flex flex-row-reverse`}>
                {BackButtons.map((backButton) => {
                    return (backButton)
                })}
            </div>
            <Button variant="secondary" asChild><div className={buttonStyling}><p >{pageId}</p></div></Button>
            {ForwardButtons.map((forwardButton) => {
                    return (forwardButton)
            })}
            {pageId !== maxPages - 1 && pageId + pageAmount < maxPages - 1 && <div className="mx-2 opacity-80">...</div>}
            {pageId !== maxPages - 1 && pageId + pageAmount < maxPages - 1 && <Button variant="outline" asChild><Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={`/page/${maxPages - 1}${type ? `?type=${type}` : ''}`}>{maxPages - 1}</Link></Button>}
            {pageId + 1 < maxPages && <Button variant="outline" asChild><Link onClick={buttonClick} className={`${buttonStyling} ${loading ? loadingCSS : ""}`} href={pageId + 1 < maxPages ? `/page/${pageId + 1}${type ? `?type=${type}` : ''}` : ""}> <ChevronRightIcon /></Link></Button>}
        </div>
    );
}