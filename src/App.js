import { useState, useEffect } from "react";
import moment from "moment-timezone";
import { AnimateOnChange, animations } from "react-animation";
import styles from "./App.module.css";

function App() {
    const [days, setDays] = useState("");
    const [hours, setHours] = useState("");
    const [mins, setMins] = useState("");
    const [secs, setSecs] = useState("");
    const [timesUp, setTimesUp] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        var endDate = moment("01/01/2021 00:00:00", "DD/MM/YYYY hh:mm:ss")
            .locale("pt-br")
            .tz("America/Maceio")
            .valueOf();

        setInterval(() => {
            let now = moment().locale("pt-br").tz("America/Maceio").valueOf();
            let t = endDate - now;

            if (t >= 0) {
                let countdownDays = Math.floor(t / (1000 * 60 * 60 * 24));
                let countdownHours = Math.floor(
                    (t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                let countdownMins = Math.floor(
                    (t % (1000 * 60 * 60)) / (1000 * 60)
                );
                let countdownSecs = Math.floor((t % (1000 * 60)) / 1000);

                setDays(countdownDays);
                setHours(countdownHours);
                setMins(countdownMins);
                setSecs(countdownSecs);
            } else {
                setTimesUp(true);
                const list = [
                    "maravilhoso.",
                    "incrível.",
                    "mais fácil.",
                    "divertido.",
                    "produtivo.",
                    "magnífico.",
                    "inesquecível.",
                    "saudável.",
                ];
                const choice = Math.floor(Math.random() * list.length);
                setText(list[choice]);
            }
        }, 1000);
    }, [timesUp, days, hours, mins, secs]);

    return (
        <main className={styles.content}>
            {timesUp === false ? (
                <div>
                    {secs <= 10 && mins === 0 && hours === 0 ? (
                        <AnimateOnChange>
                            <h2 className={styles.tenth}>{secs}</h2>
                        </AnimateOnChange>
                    ) : (
                        <h2 className={styles.countdown}>
                            Restam{" "}
                            <AnimateOnChange>
                                <strong>{days}</strong>
                            </AnimateOnChange>{" "}
                            dias e{" "}
                            <AnimateOnChange>
                                <strong>
                                    {hours}:{mins}:{secs}
                                </strong>
                            </AnimateOnChange>{" "}
                            horas!
                        </h2>
                    )}
                </div>
            ) : (
                <div className={styles.endAnimation}>
                    <h2
                        className={styles.title}
                        style={{ animation: animations.popIn }}
                    >
                        Feliz ano novo!
                    </h2>
                    <div className={styles.dynamicText}>
                        <h2>Que 2021 seja&nbsp;</h2>
                        <h2>
                            <AnimateOnChange>
                                <strong className={styles.text}>{text}</strong>
                            </AnimateOnChange>
                        </h2>
                    </div>
                </div>
            )}
        </main>
    );
}

export default App;
