import {Tooltip} from "react-tooltip";
import {WarningIcon} from "../../../AAAcomponents/assets/WarningIcon.tsx";

export function ErrorTooltip({message}: { message: string | undefined }) {
    return (

        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content={message}
            data-tooltip-variant="error"
            data-tooltip-place="top"
        >
            <WarningIcon/>
            <Tooltip id="my-tooltip" className="tooltip" positionStrategy="fixed"/>
        </a>
    );
}