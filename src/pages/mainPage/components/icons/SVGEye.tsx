interface Props {
    onClick: () => void;
}

export function SVGEye({onClick}: Props) {

    return (
        <svg onClick={onClick} className='svgEye' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M10.28 8.03994C9.19003 8.42994 9 10.5199 9 12.0399C9 13.5599 9.19003 15.5999 10.28 16.0399C11.37 16.4799 16 13.7499 16 12.0399C16 10.3299 11.44 7.61994 10.28 8.03994Z"
                    stroke="#ffffff"></path>
                <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#ffffff"></path>
            </g>
        </svg>)
}










