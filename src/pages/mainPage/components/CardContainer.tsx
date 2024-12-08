import { useState } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence
} from "framer-motion";

function Card(props) {
    const [exitX, setExitX] = useState(0);

    const x = useMotionValue(0);
    const scale = useTransform(x, [-150, 0, 150], [1.1, 1, 1.1]);
    const rotate = useTransform(x, [-500, 0, 500], [-45, 0, 45], {
        clamp: false
    });

    const variantsFrontCard = {
        animate: { scale: 1, y: 0, opacity: 1 },
        exit: (custom) => ({
            x: custom,
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.4 }
        })
    };

    function handleDragEnd(_, info) {
        if (info.offset.x < -100) {
            setExitX(-250);
            props.setIndex(props.index + 1);
            props.onSwipe("dislike");
        }
        if (info.offset.x > 100) {
            setExitX(250);
            props.setIndex(props.index + 1);
            props.onSwipe("like");
        }
    }

    return (
        <motion.div
            className="cardContainer"
            style={{
                x,
                rotate,
                cursor: "grab"
            }}
            whileTap={{ cursor: "grabbing" }}
            drag={props.drag}
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
                    backgroundImage: `url(${props.backgroundImage})`, // Utilisation correcte des backticks
                    backgroundSize: "contain", // Assure que l'image est entièrement visible
                    backgroundRepeat: "no-repeat", // Évite la répétition de l'image
                    backgroundPosition: "center", // Centre l'image dans l'élément
                }}
            />
        </motion.div>
    );
}

export function CardContainer(props) {
    const [index, setIndex] = useState(0);

    return (
        <motion.div className="draggableContainer">
            <AnimatePresence initial={false}>
                <Card
                    backgroundImage={props.backgroundImage2}
                />
                <Card
                    onSwipe={props.onSwipe}
                    key={index}
                    frontCard={true}
                    index={index}
                    setIndex={setIndex}
                    drag="x"
                    backgroundImage={props.backgroundImage1}
                />

            </AnimatePresence>
        </motion.div>
    );
}