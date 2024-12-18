import {Tooltip} from "react-tooltip";
import {SvgWarningIcon} from "../icons/SvgWarningIcon.tsx";

export function ErrorTooltip({message}: { message: string | undefined }) {
    if (!message) {
        return null;
    }
    return (
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content={message}
            data-tooltip-variant="error"
            data-tooltip-place="top"
        >
            <SvgWarningIcon/>
            <Tooltip id="my-tooltip" className="tooltip" positionStrategy="fixed"/>
        </a>
    );
}