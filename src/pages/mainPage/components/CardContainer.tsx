import { useState } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence
} from "framer-motion";

interface CardContainerProps {
    firstBackgroundImage: string;
    secondBackgroundImage?: string;
    onClick?: () => void;
    onSwipe: (like: boolean) => void;
}
interface CardProps {
    backgroundImage: string;
    onSwipe?: (like: boolean) => void;
    onClick?: () => void;
    index?: number;
    setIndex?: (index: number) => void;
    drag?: "x" | "y" | boolean;
}


function Card({
                  backgroundImage,
                  onClick,
                  onSwipe,
                  index,
                  setIndex,
                  drag
              }: CardProps) {
    const [exitX, setExitX] = useState(0);

    const x = useMotionValue(0);
    const scale = useTransform(x, [-150, 0, 150], [1.1, 1, 1.1]);
    const rotate = useTransform(x, [-500, 0, 500], [-45, 0, 45], {
        clamp: false
    });

    const variantsFrontCard = {
        animate: { scale: 1, y: 0, opacity: 1 },
        exit: (custom: number) => ({
            x: custom,
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.4 }
        })
    };

    function handleDragEnd(_: any, info: any) {
        if (info.offset.x < -100) {
            setExitX(-250);
            setIndex?.(index! + 1);
            onSwipe?.(false);
        }
        if (info.offset.x > 100) {
            setExitX(250);
            setIndex?.(index! + 1);
            onSwipe?.(true);
        }
    }

    return (
        <motion.div
            onClick={onClick}
            className="cardContainer"
            style={{
                x,
                rotate,
                cursor: "grab"
            }}
            whileTap={{ cursor: "grabbing" }}
            drag={drag}
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            onDragEnd={handleDragEnd}
            variants={variantsFrontCard}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={exitX}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
        >
            <motion.div
                className="card"
                style={{
                    scale,
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "contain",
                    boxShadow: "0px 0px 5px 5px rgba(0,0, 0, 0.3)"

                }}
            />
        </motion.div>
    );
}


export function CardContainer({
                                  onSwipe,
                                  onClick,
                                  firstBackgroundImage,
                                  secondBackgroundImage
                              }: CardContainerProps) {
    const [index, setIndex] = useState(0);

    return (
        <motion.div className="draggableContainer">
            <AnimatePresence initial={false}>
                {secondBackgroundImage && (
                    <Card backgroundImage={secondBackgroundImage} />
                )}
                <Card
                    onClick={onClick}
                    onSwipe={onSwipe}
                    key={index}
                    index={index}
                    setIndex={setIndex}
                    drag="x"
                    backgroundImage={firstBackgroundImage}
                />
            </AnimatePresence>
        </motion.div>
    );
}
