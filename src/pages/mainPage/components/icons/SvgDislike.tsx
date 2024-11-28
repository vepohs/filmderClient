type SvgDislikeProps = {
    onClick: () => void; // Gestionnaire de clic
};
export function SvgDislike({ onClick }: SvgDislikeProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svgDislike" onClick={onClick} >

            <g id="SVGRepo_iconCarrier">
                <path d="M19 5L5 19M5.00001 5L19 19" stroke="#ff0000" strokeWidth="3.4" strokeLinecap="round"
                      strokeLinejoin="round"></path>
            </g>
        </svg>
    );
}